import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, catchError, debounceTime, timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';
import { MessageContainer } from '../chat/chat.component';
import { HttpService } from 'src/app/services/http.service';
import { ActionsService } from 'src/app/services/actions.service';

@Component({
  selector: 'app-chatmob',
  templateUrl: './chatmob.component.html',
  styleUrls: ['./chatmob.component.css']
})
export class ChatmobComponent {
  @ViewChild('chatcontainer', {read:ElementRef, static:true})
  private chadcont:ElementRef<HTMLDivElement>;
  private subj:Subject<void> = new Subject<void>();
  public subj$:Observable<void> = this.subj.asObservable();
  public visible:boolean = false;
  public toaster:boolean = false;
  public send:boolean = true;
  public message:boolean = true;
  public fc:FormControl;
  public typing:boolean = false;
  public messages:Array<MessageContainer> = [];
  public socketAuth:Observable<boolean>;
  public auth:boolean;
  public audio:HTMLAudioElement;
  public offset:number = 0;
  private firstCall:boolean = true;
  public mobsize:boolean = false;
  public numberFC:FormControl = new FormControl('');
  private authed:Subject<boolean> = new Subject<boolean>();
  public authed$:Observable<boolean> = this.authed.asObservable();
  public conversationId:number;
  public seen:boolean = false;
  public online:boolean = true;
  @ViewChild('chatmob', {read:ElementRef})
  private el:ElementRef<any>;
  public loaded:boolean = false;
  constructor(
    private socketService:SocketService,
    private authService:AuthService,
    private httpService:HttpService,
    private rend:Renderer2,
    private actionService:ActionsService) {
      this.audio = new Audio("../assets/push.wav");
    }
  ngOnInit():void {
    
    const parent = (this.chadcont.nativeElement as HTMLElement).parentElement.parentElement;
    this.rend.setStyle(parent, 'max-height', 'unset');
    this.rend.setStyle(parent, 'padding', 'unset')
    this.rend.setStyle(parent, 'border-radius', '0.75rem 0.75rem 0 0')
    this.httpService.getNotSeenMessages().subscribe((x:any) => {
      const messages = this.messages[this.messages.length-1].messages.reverse().map((mess) => {
        console.log(mess)
      })
      if(x.count > 0) {
        
        this.seen = true;
      } else {
        this.seen = false;
      }
    })
    this.authService.isAuthenticated().subscribe(auth => {
      this.auth = auth;
    })
    this.socketService.openChat().subscribe(chat => {
      this.messages = chat.message;
      this.conversationId = chat.conversation.id;
    });
    this.fc = new FormControl('');
    this.visible = true;
    this.fc.valueChanges.subscribe((x:string) => {
      if(x.length !== 0) {
        this.message = false;
      } else {
        this.message = true;
      }
    })
    this.socketService.getTypings().subscribe((x:any) => {
      this.typing = x;
      const scrl = (this.chadcont.nativeElement.scrollHeight- (this.chadcont.nativeElement.scrollTop + this.chadcont.nativeElement.clientHeight));
      
      if(this.typing && scrl <100) {
        this.scrollBottom()
      }
    })



    this.socketService.getMessages().subscribe((x:any) => {
      
      this.handleSoundIncome();
      console.log(x)
      const lm = this.messages[this.messages.length-1].messages;

      if(lm[lm.length-1].sent === x.message.sent) {
        lm[lm.length-1].last = false;
      }
    
      x.message.last = true;
      this.messages[this.messages.length - 1].messages.push(x.message);
      this.fc.setValue('');
      this.scrollBottom();
      
    })

    this.socketService.openChat().subscribe(chat => {
      console.log(chat)
      this.messages = chat.message;
      this.conversationId = chat.conversation.id;
      this.online = chat.online;
      this.httpService.addSeen(this.conversationId).subscribe(x => {
        console.log(x)
      }) 
    });
    this.socketService.isOnline().pipe(
      debounceTime(2000),
    ).subscribe((x:any) => {
      this.online = x.online;
      console.log(x)
    })
    this.authService.isAuthenticated().subscribe(auth => {
      this.auth = auth;
    })
    this.fc = new FormControl('');
    this.visible = true;
    this.fc.valueChanges.subscribe((x:string) => {
      if(x.length !== 0) {
        this.message = false;
      } else {
        this.message = true;
      }
    })
    this.socketService.getTypings().subscribe((x:any) => {
      this.typing = x;
      const scrl = (this.chadcont.nativeElement.scrollHeight- (this.chadcont.nativeElement.scrollTop + this.chadcont.nativeElement.clientHeight));
      if(this.typing && scrl <100) {
        this.scrollBottom()
      }
    })
      
    
  }
  
  loadMore(val:any):void {
    if(this.firstCall) {
      this.firstCall = false;
      return;
    }
    if(val) {
      this.offset++;
      this.socketService.getMore(this.offset, this.conversationId).pipe(
        catchError(err => {
          return [];
        }),
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
        /*
        this.messages[0].messages = messages.concat(this.messages[0].messages);
        this.chadcont.nativeElement.scrollTo({
          top: this.chadcont.nativeElement.scrollTop + 400,
          behavior:'instant'
        });
        */
      })
    }
  }
  handleSoundIncome():void {
    this.audio.play();
  }

  register() {
    this.authed.next(false)
  }
  authorization() {
    this.authed.next(true)
  }
  updateToken() {
    /*
    this.authService.login().subscribe({
      next: tokens => console.log(tokens),
      error: err => console.log(err), 
    })
    console.log(this.authService.isAuthenticated())
    this.socketService.updateToken();
    */
  }
  
  clicked():void {
    console.log(1)
    this.subj.next();
  }
  closed():void {
    console.log(123)
    this.subj.next();
  }
  handleKeyDown(ev:KeyboardEvent) {
    if(ev.key === 'Enter') {
      const message = (ev.target as HTMLInputElement).value;
      const obj = {message, conversationId:this.conversationId};
      this.socketService.sendMessage(obj).subscribe(x => {
        const lm = this.messages[this.messages.length-1].messages;

      if(lm[lm.length-1]?.sent === x.message?.sent) {
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
    this.socketService.sendMessage(obj).subscribe(x => {

      const lm = this.messages[this.messages.length-1].messages;

      if(lm[lm.length-1].sent === x.message.sent) {
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
    this.socketService.addTyping(typing, this.conversationId)
  }

  scrollBottom() {
   if(this.chadcont) {
    timer(150).subscribe(_ => {
      this.chadcont.nativeElement.scrollTo({
        top: this.chadcont.nativeElement.scrollHeight,
        behavior:'instant'
      });
    })
  }
  }

  ngAfterViewInit() {
    this.scrollBottom();
  }
}
