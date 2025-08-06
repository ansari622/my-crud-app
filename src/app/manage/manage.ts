import { Component } from '@angular/core';
import { User } from '../service/user';
import { userInt } from '../interfaces/userInt';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage',
  imports: [CommonModule],
  templateUrl: './manage.html',
  styleUrl: './manage.css'
})
export class Manage {

   users: any[] = [];

  constructor(private userService: User) {}

  ngOnInit() {
    this.fetchUsers();
  }
 fetchUsers() {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }
  editUser(userId:userInt){
alert('delted')
  }

  deleteUser(userId:userInt){

  }
}
