import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userInt } from '../interfaces/userInt';

@Injectable({
  providedIn: 'root'
})
export class User {
  url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<userInt[]> {
    return this.http.get<userInt[]>(this.url);
  }
  saveUsers(user: userInt): Observable<userInt> {
    return this.http.post<userInt>(this.url, user);
  }
  addUser(user: userInt): Observable<userInt> {
    return this.http.post<userInt>(this.url, user);
  }
  getAllUsers(): Observable<userInt[]> {
    return this.http.get<userInt[]>(this.url);
  }
  deleteUser(id: string): Observable<userInt> {
    return this.http.delete<userInt>(`${this.url}/${id}`);
  }
  getuserUpdate(id: string): Observable<userInt> {
    return this.http.get<userInt>(`${this.url}/${id}`);
  }
  updateUser(id: string, data: userInt): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

}
