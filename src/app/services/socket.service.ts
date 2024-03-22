import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { AuthService, JWT_ACCESS_TOKEN } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket!:Socket;
  private socketAuth:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public socketAuth$ = this.socketAuth.asObservable();
  constructor(
    private http:HttpClient,
    private authService:AuthService) { }


  
    isOnline() {
      let observable = new Observable(observer => {
        this.socket.on("online", (data:any) => {
          observer.next(data);
          console.log(data)
        })
        return () => {this.socket.disconnect()}
      })
      return observable
    }
    
  getTypings() {
    let observable = new Observable(observer => {
      this.socket.on("typing", (data:boolean) => {
        observer.next(data);
      })
      return () => {this.socket.disconnect()};
    })
    return observable;
  }

  getConversations() {
    let observable = new Observable(observer => {
      this.socket.on("conversation", (data:any) => {
        observer.next(data);
      })
      return () => {this.socket.disconnect()}
    })
    return observable;
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on("onMessage", (data) => {
        observer.next(data);
        
      })
      return () => {this.socket.disconnect()};
    })
    return observable.pipe(
      map((val) => {
        console.log(val);
        return val;
      })
    )
  }
  
  initSocket() {
    const token = localStorage.getItem(JWT_ACCESS_TOKEN) ? localStorage.getItem(JWT_ACCESS_TOKEN) : '';

    this.socket = io('http://localhost:3000', {
      query: {
        token: token
      }
     
    });
    console.log('init')
    this.socket.on("connect", () => {
      this.socketAuth.next(true);
    })
    this.socket.on("connect_error", (err) => {
      this.socketAuth.next(false);
    })
    this.socket.on("disconnect", (reason) => {
      this.socketAuth.next(false);
    })
    
  }

  closeConnection() {
    if(this.socket) {
      this.socket.close();
    }
  }

  reconnectSocket() {
    this.socket.io.opts.query = {token: localStorage.getItem(JWT_ACCESS_TOKEN)};
    this.socket.disconnect();
    this.socket.connect();
    
  }
  

  handleAuthStateChange() {
    this.authService.authStateChange.subscribe(logged => {
      if(logged) {
        this.reconnectSocket();
      } else {
        this.closeConnection();
      }
    })
    /*
   this.authService.isAuthenticated().subscribe(logged => {
    if(logged) {
      this.reconnectSocket();
    } else {
      this.closeConnection();
    }
   })
   */
  }

  getSeenInf() {
    let observable = new Observable(observer => {
      this.socket.on("seen", (data:any) => {
        console.log(data);
        observer.next(data);
      })
      return () => {this.socket.disconnect()}
    })
    return observable;
  }

  getAdminTyping() {
    let observable = new Observable(observer => {
      this.socket.on("typing-admin", (data) => {
        observer.next(data);
        console.log(data)
      })
      return () => {this.socket.disconnect()};
    })
    return observable;
  }

  sendMessage(obj) {
    console.log(1)
    return this.http.post('/api/chat/create', {
      content:obj.message,
      conversationId:obj.conversationId
    }).pipe(
      catchError((err) => this.handleError(err))
    )
    
  }

  handleError(err:HttpErrorResponse) {
    console.log('error happended')
    return [];
  }

  addTyping(typing:boolean, conversationId:number) {
    console.log(1);
    this.socket.emit("typing-admin", {typing, conversationId})
  }
  
  manageTyping(typing:boolean, personId:number):void {
    this.socket.emit("typing", {typing, personId})
  }
  openChat():Observable<any> {
    return this.http.get('/api/chat/conversation').pipe(
        catchError(err => this.handleError(err))
      )
    }

    getMore(offset:number, conversationId:number) {
      return this.http.get(`/api/chat/more/${conversationId}`, {
        params: {
          offset
        }
      }).pipe(
        catchError(err => [])
      )
    }
}
