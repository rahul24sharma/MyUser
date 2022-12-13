import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3000/comments';
  constructor(private http: HttpClient) { }


  getUsers(){
    return this.http.get<User[]>(this.baseUrl);
  }

  postUsers(user:User){
    return this.http.post<User>(this.baseUrl, user);
  }

  deleteUsers(id: number){
    return this.http.delete(this.baseUrl + '/'+ id);
  }
}
