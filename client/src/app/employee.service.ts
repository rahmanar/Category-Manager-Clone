import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  //get employee
  async get(url: string) {
    try {
      const resp = await this.http.get(url).toPromise();
      return resp;
    } catch (e) {
      return null;
    }
  }

  //post employee
  async post(url: string, data?: any) 
  {
    try 
    {
      const resp = await this.http.post(url, data, { headers: {},}).toPromise();
      return resp;
    } catch (e) {
      return null;
    }
  }

  //delete employee
  delete(_id:any){
   return this.http.delete('http://localhost:5000/store' + `/${_id}`).toPromise();
  }

  //update employee
  async put(url: string, data?: any) 
  {
    try 
    {
      const resp = await this.http.put(url, data, { headers: {},
       }).toPromise();
      return resp;
    } catch (e) {
      return null;
    }
  }

  //update employee
  // updateEmployee(_id:any, body:any) {
  //   return this.http.post(`http://localhost:5000/updateEmployee/${_id}`, body);
  //   }
}
