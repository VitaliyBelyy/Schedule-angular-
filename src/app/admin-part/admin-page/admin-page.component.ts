import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from "../user.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: 'admin-page.component.html',
  styleUrls: ['admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {

  @Output() logout: EventEmitter<any> = new EventEmitter();

  username: string;

  constructor( private userService: UserService ) { }

  ngOnInit() {
    this.username = this.userService.getUsername();
  }

  onOut(event: any) {
    event.preventDefault();
    this.logout.emit();
  }

}
