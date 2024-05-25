import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private base_url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getData(filter: any = null) {
    // return fetch(`${this.base_url}/employee${filter ? '?' + filter : ''}`)
    return fetch(`${this.base_url}/employee`)
      .then((res) => res.json())
      .then((data) => {
        if (filter.userName) {
          data = data.filter((item: any) =>
            item.userName.toLowerCase().includes(filter.userName.toLowerCase())
          );
        }
        if (filter.firstName) {
          data = data.filter((item: any) =>
            item.firstName
              .toLowerCase()
              .includes(filter.firstName.toLowerCase())
          );
        }
        if (filter.email) {
          data = data.filter((item: any) =>
            item.email.toLowerCase().includes(filter.email.toLowerCase())
          );
        }
        return data.reverse();
      })
      .catch((err) => console.error(err));
  }

  getOne(id: any) {
    return fetch(`${this.base_url}/employee/${id}`)
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }

  delete(id: any) {
    return this.http.delete(`${this.base_url}/employee/${id}`);
  }

  create(body: any) {
    return this.http.post(`${this.base_url}/employee`, body);
  }

  update(body: any) {
    return this.http.put(`${this.base_url}/employee/${body.id}`, body);
  }

  login(data: any) {
    return fetch(
      `${this.base_url}/login?userName=${data.userName}&password=${data.password}`
    )
      .then((res) => res.json())
      .then((result) => {
        result = result.filter(
          (item: any) =>
            item.userName.toLowerCase().includes(data.userName.toLowerCase()) &&
            item.password.toLowerCase().includes(data.password.toLowerCase())
        );
        console.log(result);
        if (result[0]?.token) {
          localStorage.setItem('token', result[0].token);
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.error('Login error:', err);
        return false;
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return localStorage.getItem('token');
  }
}
