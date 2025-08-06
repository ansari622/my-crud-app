import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { userInt } from '../interfaces/userInt';
import { User } from '../service/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {
  users: userInt[] = [];
  selectedUser: userInt|undefined;

  constructor(private userService: User , private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((data: userInt[]) => {
      this.users = data;
      console.log('Users loaded', this.users);
    });
  }

  deleteUser(id: string) {
  const confirmDelete = window.confirm("Are you sure you want to delete?");
  if (confirmDelete) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        console.log('Deleted ID:', id);
        this.getUsers();
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      }
    });
  }
}
updateUser(id: string){
  this.userService.getuserUpdate(id).subscribe((data:userInt) =>{
    console.log(id)
    this.selectedUser= data
  })
  this.router.navigate(['/form', id]);
}

}
