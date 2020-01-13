import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Entries} from "../models/entries.model";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  /**
   * get all the information about users
   */
  getAll() {
    return this.http.get<Entries>(`${environment.apiUrl}/alfresco/users`);
  }
}
