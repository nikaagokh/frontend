import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { OverlayService } from './services/overlay.service';
import { SocketService } from './services/socket.service';
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';


export const urlI = 'http://localhost:3000/api/uploads/producta/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public url:string = ''
  title = 'frontend';
  hide:boolean = false;
  unreadMessages:number | null = null;
  chatOpened:boolean = false;
  public admin:boolean = false;
  public audio:HTMLAudioElement;
  public routes:string[] = ['/product', '/cart'];
  public mobsize:boolean = false;
  public chatUp:boolean = false;
  @ViewChild('chatmob', {static:true, read:ElementRef})
  private els:ElementRef<HTMLElement>;
  constructor(
    private overlay:OverlayService,
    private socket:SocketService,
    private httpService:HttpService,
    private authService:AuthService,
    private router:Router,
    private breakpoint:BreakpointObserver,
    private rend:Renderer2) {
      this.breakpoint.observe(['(min-width:992px)']).subscribe((state:BreakpointState) => {
        if(state.matches) {
          this.mobsize = false;
        } else {
          this.mobsize = true;
        }
      })
      this.audio = new Audio("../assets/push.wav");
    }
  ngOnInit():void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e:NavigationEnd) => {
      const url = e.url;
      const secondSlashIndex = url.indexOf('/', 1);
      let route:string;
      if (secondSlashIndex !== -1) {
        route = url.substring(0, secondSlashIndex);
      }
      else {
        route = url;
      }
      console.log(route)
      
      if(this.routes.includes(route) && this.mobsize) {
        this.chatUp = true;
      } else {
        this.chatUp = false;
      } 
    })
    this.url = urlI;
    this.socket.initSocket();
    this.socket.handleAuthStateChange();
    
    this.overlay.chatOpened$.subscribe(x => {
      this.unreadMessages = null;
    })
    
    this.httpService.getMessagesIfAvailable().subscribe((x:any) => {
      if(x.count > 0) {
        this.unreadMessages = x.count;
      } else {
        this.unreadMessages = null;
      }
    })
   
    this.socket.getMessages().subscribe(x => {
      
      //es chedavs xolme xandaxan klientze, xan midis sms xan ara
      console.log(this.overlay.getOpen())
      if(this.overlay.getOpen()) {
        this.unreadMessages = null;
      } else {
        this.handleSoundIncome()
        this.unreadMessages = 1;
      }
    })
    
    //this.httpService.getFavoritedProducts().subscribe()
    //this.httpService.getImage().subscribe(console.log)
  }
  openChat():void {
    this.overlay.openChat();
  }
  isVisible(val:boolean) {
    //this.hide = val;
  }
  
  handleSoundIncome() {
    this.audio.play()
  }

}
