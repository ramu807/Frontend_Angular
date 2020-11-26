import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  users: User[];
  userForm: boolean;
  isNewUser: boolean;
  newUser: User;
  editUserForm: boolean;
  editedUser: any = {};
  response: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    
    this.users = this.getallusers();
  }

  getallusers() {
    this.userService.getUsersFromData().subscribe(data => {
      this.users = data;
    });
    return this.users;
  }
  showEditUserForm(user: User) {
    if (!user) {
      this.userForm = false;
      return;
    }
    this.editUserForm = true;
    this.editedUser = user;
  }

  showAddUserForm() {
    // resets form if edited user
    if (this.users.length) {
      this.newUser = new User();
    }
    this.userForm = true;
    this.isNewUser = true;

  }

  saveUser(user: User) {
    if (this.isNewUser) {
      // add a new user
      this.userService.addUser(user).subscribe(data => {
        this.response = data
      });
    }
    alert('sucessfully added');
    this.users = this.getallusers();
    this.userForm = false;
  }

  updateUser() {
    this.userService.updateUser(this.editedUser,this.users).subscribe(data => {
      this.response = data;
    });
    alert('sucessfully updated');
    this.editUserForm = false;
    this.editedUser = {};
  }

  removeUser(user: User) {
    this.userService.deleteUser(user).subscribe(data => {
      this.response = data;
    });
    alert('sucessfully deleted');
    this.users = this.getallusers();
  }

  cancelEdits() {
    this.editedUser = {};
    this.editUserForm = false;
  }

  cancelNewUser() {
    this.newUser = new User();
    this.userForm = false;
  }

}
