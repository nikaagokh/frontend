import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  public user:User;
  public loaded:boolean = false;
  constructor(private httpService:HttpService) {}
  ngOnInit():void {
    this.httpService.getUserInformation().subscribe(x => {
      this.user = x;
      console.log(this.user)
      this.loaded = true;
    })
  }
}
