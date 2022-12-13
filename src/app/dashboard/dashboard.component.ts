import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() user: User;
  @Output() onRemoveUser = new EventEmitter<number>();
  @Output() onEditUser = new EventEmitter<number>();

  constructor(){ 
    this.user = {
      username:'',
      password:'',
      email:'',
      games:'',
      company:'',
    };
  }

  ngOnInit(): void {
    console.log(this.user);
  }

  deleteUserClicked(){
    this.onRemoveUser.emit(this.user.id)
  }

  editUserClicked(){
    this.onEditUser.emit(this.user.id);
  }
 
    
}


