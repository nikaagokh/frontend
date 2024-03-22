import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Message } from '../messageswrappermob/messageswrappermob.component';
import { HttpService } from 'src/app/services/http.service';
import { FocusMonitor } from '@angular/cdk/a11y';
import { SocketService } from 'src/app/services/socket.service';
import { FormControl } from '@angular/forms';
import { Subject, catchError, timer } from 'rxjs';

@Component({
  selector: 'app-messagesmob',
  templateUrl: './messagesmob.component.html',
  styleUrls: ['./messagesmob.component.css']
})
export class MessagesmobComponent {
  @Input() submessage:Message;
  private conversationId:number;
  private personId:number;
  public audio:HTMLAudioElement;
  public messages:any = [];
  public count:number;
  public fc:FormControl = new FormControl('');
  public firstCall:boolean = false;
  public offset:number = 0;
  public auth:boolean = false;
  public typing:boolean = false;
  public loaded:boolean = false;
  @ViewChild('chatcontainer', {read:ElementRef})
  private chadcont:ElementRef<HTMLDivElement>;
  @ViewChild('inp') input:ElementRef<HTMLInputElement>;
  private closed = new Subject<boolean>();
  public closed$ = this.closed.asObservable();
  private output = new Subject<any>();
  public output$ = this.output.asObservable();
  constructor(
    private socketService:SocketService,
    private httpService:HttpService,
    private focus:FocusMonitor) {
    this.audio = new Audio("../assets/push.wav");
  }
  ngOnInit():void {
    this.personId = this.submessage.personId;
    this.conversationId = this.submessage.conversationId;
    this.httpService.addSeen(this.conversationId).subscribe(x => {
      console.log(x)
    });
    this.httpService.getMessagesInConversation(this.conversationId).subscribe((x:any) => {
      this.messages = x.result;
      this.count = x.count;
      this.loaded = true;
      this.scrollBottom()
    })

    this.socketService.getMessages().subscribe((x:any) => {
      if(this.conversationId !== x.conversation.id) {
        return;
      }
      this.handleSoundIncome();
      const lm = this.messages[this.messages.length-1].messages;
      if(lm[lm.length-1].sent === x.message.sent) {
        lm[lm.length-1].last = false;
      }
    
      x.message.last = true;
      this.messages[this.messages.length - 1].messages.push(x.message);
      this.fc.setValue('');
      this.scrollBottom();
      
    })
  }

  handleKeyDown(ev:KeyboardEvent) {
    if(ev.key === 'Enter') {
      const message = this.fc.value;
      console.log(message)
      const obj = {message, conversationId:this.conversationId};
      console.log(obj)
      this.socketService.sendMessage(obj).subscribe(x => {
        console.log(message)
        this.output.next({message:message, conversationId:this.conversationId});
        const lm = this.messages[this.messages.length-1].messages;
        if(lm[lm.length-1].sent === true) {
          lm[lm.length-1].last = false;
        }
    
        x.message.last = true;
        this.messages[this.messages.length - 1].messages.push(x.message);
        this.fc.setValue('');
        this.scrollBottom();
      
      });
    }
  }


  handleClick() {
    const obj = {message:this.fc.value, conversationId:this.conversationId};
    const message = this.fc.value;
    this.socketService.sendMessage(obj).subscribe(x => {
      this.output.next({message, conversationId:this.conversationId});
      const lm = this.messages[this.messages.length-1].messages;
        if(lm[lm.length-1].sent === true) {
          lm[lm.length-1].last = false;
        }
    
        x.message.last = true;
        this.messages[this.messages.length - 1].messages.push(x.message);
        this.fc.setValue('');
        this.scrollBottom();
    });
   }

    scrollBottom() {
      if(this.chadcont) {
       timer(100).subscribe(_ => {
         this.chadcont.nativeElement.scrollTo({
           top: this.chadcont.nativeElement.scrollHeight,
           behavior:'instant'
         });
       })
     }
     }
   
     ngAfterViewInit() {
       this.scrollBottom();
       this.focus.monitor(this.input).subscribe(x => {
        if(x) {
          this.fc.valueChanges.subscribe(x => {
            if(this.fc.value !== '') {
              this.socketService.manageTyping(true, this.personId)
            } else {
              this.socketService.manageTyping(false, this.personId)
            }
          })
        } else {
          this.socketService.manageTyping(false, this.personId)
        }
       })
     }
     handleSoundIncome():void {
      this.audio.play();
    }

    loadMore(val) {
      if(this.firstCall) {
        this.firstCall = false;
        return;
      }
      if(val) {
        this.offset++;
        this.socketService.getMore(this.offset, this.conversationId).pipe(
          catchError(err => [])
        ).subscribe(messages => {
           const lm = messages[0].messages;
           const lm2 =this.messages[0].messages;
          //this.messages[0].messages = messages.concat(this.messages[0].messages);
          
          if(lm[0].id !== lm2[0].id) {
            this.messages = messages;
            this.chadcont.nativeElement.scrollTo({
              top: this.chadcont.nativeElement.scrollTop + 500,
              behavior:'instant'
            });
          }/* 
          else if(lm[0].id === lm2[0].id) {
            this.chadcont.nativeElement.scrollTo({
              top:this.chadcont.nativeElement.scrollTop + 5,
              behavior:'smooth'
            })
          }
          */
         
                    
          
        })
      }
    }
    
    back():void {
      this.closed.next(false)
    }

    close():void {
      this.closed.next(true);
    }
    
  }

