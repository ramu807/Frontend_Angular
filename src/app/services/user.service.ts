import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private uri: string = 'http://localhost:5000/api/v1/employees/';
  private url: string = `${this.uri}`;
  private upersons: User[] = [];
  

  constructor(private http: HttpClient) { }

  getUsersFromData(): Observable<User[]> {
    return  this.http.get<User[]>('http://localhost:5000/api/v1/employees');
  }

  addUser(user: User) {
   
    user.designation = 'fullstackdevloper';
    user.email = 'ramu900k@gmail.com';
    user.is_deleted = 0;
    user.organization = 'tcs';
    user.phone = '5465465465';
    user.status = 1;
    user.salary= 654654;
    return this.http.post<string>(this.url, user);
    this.upersons.push(user);

  }
  updateUser(user: User,users: User[]): Observable<string>{
    const index = users.findIndex(u => user.id === u.id);
    const url = `${this.url}/${user.id}`;
    user.designation = 'fullstackdevloper';
    user.email = 'ramu900k@gmail.com';
    user.is_deleted = 0;
    user.organization = 'tcs';
    user.phone = '5465465465';
    user.status = 1;
    user.salary= 654654;
    user.updated_at = new Date();
    user.created_at = new Date();
    return this.http.put<string>(url, user);
    this.upersons[index] = user;
  }
  deleteUser(user: User): Observable<string>{
    const url = `${this.url}/${user.id}`;
    return this.http.delete<string>(url);
  }

}
