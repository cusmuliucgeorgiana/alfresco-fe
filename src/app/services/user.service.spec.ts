import {inject, TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../models/user";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../../environments/environment";

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule,
    ],
    providers: [
      UserService,
    ],
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
  it(
    'should get users',
    inject([HttpTestingController, UserService],
      (httpMock: HttpTestingController, userService: UserService) => {
        userService.getAll().subscribe(users => {
          expect(users.entries.length).toBe(4);
        });
        const request = httpMock.expectOne( `${environment.apiUrl}/alfresco/users`);
        expect(request.request.method).toBe('GET');
      }));
});
