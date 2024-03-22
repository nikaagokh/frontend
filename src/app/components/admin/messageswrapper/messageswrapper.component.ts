import { Component, Input } from '@angular/core';
import { url } from '../../searchdesktop/searchdesktop.component';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-messageswrapper',
  templateUrl: './messageswrapper.component.html',
  styleUrls: ['./messageswrapper.component.css']
})
export class MessageswrapperComponent {
  public conversations:any = [];
  public url:string;
  public active:number = 0;
  public audio:HTMLAudioElement;
  public loaded:boolean = false;
  constructor(
    private httpService:HttpService,
    private authService:AuthService,
    private socketService:SocketService) {
      this.active = Number(localStorage.getItem('active')) ? Number(localStorage.getItem('active')) : 0;
      this.audio = new Audio("../assets/push.wav");
    }
  ngOnInit():void {
    this.httpService.getAllConversations().subscribe(x => {
      this.conversations = x;
      this.loaded = true;
    })

    this.socketService.getAdminTyping().subscribe(x => {
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
     
      //const obj = this.conversations.splice(index,1)[0];
      /*
      if(this.active === 0 && this.conversations[this.active].id !== x.conversation.id) {
        this.conversations.splice(1,0, obj)
      } else if(this.conversations[this.active].id === x.conversation.id) {

      }
      else {
        this.conversations.unshift(obj)
      }
      */
    })
    this.socketService.getConversations().subscribe((x:any) => {
      console.log(x);
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
    this.httpService.addSeen(this.conversations[this.active].id).subscribe(x => {
      console.log(x)
    })
  }
  getIfSeen(item:any) {
    if(item.seen) {
      return ''
    } else {
      return 1
    }
  }

  messageChange(val:any) {
    const index = this.conversations.findIndex(obj => obj.id === val.id);
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
}
