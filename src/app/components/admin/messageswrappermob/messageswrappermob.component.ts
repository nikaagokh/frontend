import { Component, ElementRef, Input, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { SocketService } from 'src/app/services/socket.service';

export type Message = {
  conversationId:number;
  personId:number;
  person:string;
}

@Component({
  selector: 'app-messageswrappermob',
  templateUrl: './messageswrappermob.component.html',
  styleUrls: ['./messageswrappermob.component.css']
})
export class MessageswrappermobComponent {
  @Input() mess:any;
  private closed = new Subject<void>();
  public closed$ = this.closed.asObservable();
  private message = new Subject<Message>();
  public message$ = this.message.asObservable();
  public conversations:any = [];
  public url:string;
  public active:number = 0;
  public audio:HTMLAudioElement;
  public loaded:boolean = false;
  @ViewChild('minimessages', {read:ElementRef, static:true})
  private el:ElementRef;
  constructor(
    private httpService:HttpService,
    private socketService:SocketService,
    private rend:Renderer2
  ) {
      this.active = Number(localStorage.getItem('active')) ? Number(localStorage.getItem('active')) : 0;
      console.log(this.active)
      this.audio = new Audio("../assets/push.wav");
  }

  ngOnChanges(simpleChanges:SimpleChanges) {
    const value = simpleChanges['mess'].currentValue;
    console.log(value);
  }

  
  ngOnInit():void {
    const parent = (this.el.nativeElement as HTMLElement).parentElement.parentElement;
    this.rend.setStyle(parent, 'max-height', 'unset');
    this.rend.setStyle(parent, 'border-radius', '0.75rem 0.75rem 0 0')
    this.httpService.getAllConversations().subscribe(x => {
      this.conversations = x;
      
      this.loaded = true;
      console.log(this.conversations[this.active].id)
      console.log(this.conversations)
      
    })
    this.socketService.getConversations().subscribe((x:any) => {
      console.log(x);
    })
    this.socketService.getMessages().subscribe((x:any) => {
      console.log(x)
      this.handleSoundIncome();
      const convId = x.conversation.id;
      const message = x.conversation.content;
      const lastTime = x.conversation.lastTime;
      const sent = false;
      const person = x.conversation.person;
      const personId = x.conversation.personId;
      const index = this.conversations.findIndex(obj => obj.id === convId);
      if(index === -1) {
        return;
      }
      this.conversations[index].message = message;
      this.conversations[index].lastTime = lastTime;
      this.conversations[index].sent = false;
      
      if(this.conversations[this.active].id !== x.conversation.id && !x.conversation.seen) {
        const index = this.conversations.findIndex(obj => obj.id === x.conversation.id);
        this.conversations[index].seen = false;
      } else if(this.conversations[this.active].id === x.conversation.id) {
        this.conversations[index].seen = true;
      }
    })
  }

  handleSoundIncome():void {
    this.audio.play();
  }

  getUser(val:boolean) {
    if(val) {
      return 'თქვენ: '
    } else {
      return 'ის: '
    }
  }

  changeConversation(val:number) {
    this.active = val;
    localStorage.setItem('active', `${val}`)
    this.conversations[this.active].seen = true;
    const message:Message = {conversationId:this.conversations[this.active].id, personId:this.conversations[this.active].personId, person:this.conversations[this.active].person};
    this.message.next(message);
  }

  getIfSeen(item:any) {
    if(item.seen) {
      return ''
    } else {
      return 1
    }
  }

  messageChange(val:any) {
    
    const index = this.conversations.findIndex(obj => obj.id === val.conversationId);
    this.conversations[index].message = val.message;
    this.conversations[index].sent = true;
    this.conversations[index].lastTime = this.formatedTime();
    this.conversations[index].last = this.formatedDate();
    this.conversations[index].seen = true;
    const obj = this.conversations.splice(index,1)[0];
    this.conversations.unshift(obj)
    localStorage.setItem('active', '0');
    this.active = 0;
  }

  private formatedTime() {
    const dateUtc = new Date();
    const today = new Date(dateUtc.getTime() - dateUtc.getTimezoneOffset() * 60 * 1000);
    return today.toISOString().substring(11,16);
  }
  private formatedDate() {
    const dateUtc = new Date();
    const today = new Date(dateUtc.getTime() - dateUtc.getTimezoneOffset() * 60 * 1000);
    var components = today.toISOString().substring(0,10).split('-')
    return components[2] + "." + components[1] + "." + components[0];
  }

  close():void {
    this.closed.next();
  }
}
