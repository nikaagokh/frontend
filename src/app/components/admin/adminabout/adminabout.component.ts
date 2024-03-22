import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-adminabout',
  templateUrl: './adminabout.component.html',
  styleUrls: ['./adminabout.component.css']
})
export class AdminaboutComponent {
  public user:User;
  public loaded:boolean = false;
  constructor(private httpService:HttpService) {}
  ngOnInit():void {
    this.httpService.getUserInformation().subscribe(x => {
      this.user = x;
      this.loaded = true;
    })
  }
}
