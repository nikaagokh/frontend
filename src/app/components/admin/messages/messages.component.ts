import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, timer } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { SocketService } from 'src/app/services/socket.service';

export const MESSAGES = 30;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  public messages:any = [];
  @Input() conversationId:number;
  @Input() personId:number;
  @Output() messageChanged = new EventEmitter();
  public fc = new FormControl('');
  public auth:boolean = true;
  public typing:boolean = false;
  @ViewChild('chatcontainer', {read:ElementRef})
  private chadcont:ElementRef<HTMLDivElement>;
  public audio:HTMLAudioElement;
  public firstCall:boolean =true;
  public offset:number = 0;
  public count:number = 0;
  public focused:boolean = false;
  @ViewChild('inp') input:ElementRef<HTMLInputElement>;
  constructor(
    private socketService:SocketService,
    private httpService:HttpService,
    private focus:FocusMonitor) {
    this.audio = new Audio("../assets/push.wav");
  }
  ngOnChanges(simpleChanges:SimpleChanges) {
    const convId = Number(simpleChanges['conversationId'].currentValue);
    this.conversationId = convId
    console.log(this.conversationId)
    this.httpService.getMessagesInConversation(convId).subscribe((x:any) => {
      this.messages = x.result;
      this.count = x.count;
      console.log(this.messages)
      this.scrollBottom()
      
    })
  }
  ngOnInit() {
    
    /*
    this.socketService.getTypings().subscribe((x:any) => {
      this.typing = x;
      const scrl = (this.chadcont.nativeElement.scrollHeight- (this.chadcont.nativeElement.scrollTop + this.chadcont.nativeElement.clientHeight));
      if(this.typing && scrl <100) {
        this.scrollBottom()
      }
    })
    */
   /*
    this.socketService.getAdminTyping().subscribe((x:any) => {
      console.log(x);
      console.log(this.conversationId)
      if(this.conversationId = x.conversationId) {
        console.log(1234)
        this.typing = x.typing;
        console.log(this.typing)
        const scrl = (this.chadcont.nativeElement.scrollHeight- (this.chadcont.nativeElement.scrollTop + this.chadcont.nativeElement.clientHeight));
         if(this.typing && scrl <100) {
        this.scrollBottom()
      }
      }

    })
    */

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
  handleKeyDown(ev:KeyboardEvent) {
    if(ev.key === 'Enter') {
      console.log(1);
      //const message = (ev.target as HTMLInputElement).value;
      const message = this.fc.value;
    
      const obj = {message, conversationId:this.conversationId};
      this.socketService.sendMessage(obj).subscribe(x => {
        this.messageChanged.emit({message, id:this.conversationId})
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
      this.messageChanged.emit({message, id:this.conversationId})
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

  manageTyping(typing:boolean) {
    console.log(typing)
    /*
    if(typing) {
      this.socketService.manageTyping(true);
    } else {
      this.socketService.manageTyping(false)
    }
    */
    
    //this.socketService.manageTyping(typing)
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
  mergeArrays(arr1, arr2) {
    // Merge arrays into a single array
    const mergedArray = [...arr1, ...arr2];
    console.log(mergedArray)

    // Create an object to store merged data grouped by date
    const mergedObject = {};

    // Iterate through the merged array
    mergedArray.forEach(item => {
        const date = item.date;
        const data = item.messages;

        // Check if the date exists in the merged object
        if (date in mergedObject) {
            // If the date exists, push data to the existing array
            mergedObject[date].push(...data);
        } else {
            // If the date doesn't exist, create a new array with the data
            mergedObject[date] = [...data];
        }
    });

    console.log(mergedObject)
  }

}
