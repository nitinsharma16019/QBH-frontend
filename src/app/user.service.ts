import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, userResponse } from './models/user.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:3000'
  users:any[]=[];
  editId: any;
  deleteId:any;
  userForm!:FormGroup;
  constructor(private http:HttpClient) { }
  
 getUsers(){
  this.http.get(`${this.apiUrl}/users`).subscribe((res:any)=>{
    this.users = res.users;
  })
}

  async createUser(user:User):Promise<User | void>{
    const a = await this.http.post<User>(`${this.apiUrl}/users`,user).toPromise();
    return a;
  }

  async updateUser(id:number,user:User):Promise<User | void>{
    const a = await this.http.put<User>(`${this.apiUrl}/users/${id}`,user).toPromise();
    return a;
  }

  async deleteUser(id:number):Promise<User | void>{
    const a = await this.http.delete<User>(`${this.apiUrl}/users/${id}`).toPromise();
    return a;
  }

  generatePdf(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pdf/generate`, {});
  }

  downloadPdf(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/pdf/download/${id}`, { responseType: 'blob' });
  }

  PdfsList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pdf/list`);
  }
}
