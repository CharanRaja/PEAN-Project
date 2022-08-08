import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userList: any;

  constructor(private eventsService: EventService) { }

  ngOnInit(): void {
    this.eventsService.getUserList().subscribe((res: any) => {
      this.userList = res
    }, (error) => {
      alert(error);
    })
  }

}
