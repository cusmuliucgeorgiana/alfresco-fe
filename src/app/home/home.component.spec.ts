import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserService} from '../services/user.service';
import {Entry} from '../models/entry.model';
import {User} from '../models/user';
import {of} from 'rxjs';
import {Entries} from '../models/entries.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let entry: Entry;
  const usersList: Entries = {
    entries: [
      {
        entry: {
          lastName: 'Beecher',
          userStatus: 'Helping to design the look and feel of the new web site',
          jobTitle: 'Graphic Designer',
          statusUpdatedAt: '2011-02-15T20:20:13.432+0000',
          mobile: '0112211001100',
          emailNotificationsEnabled: true,
          description: 'Alice is a demo user for the sample Alfresco Team site.',
          telephone: '0112211001100',
          enabled: false,
          firstName: 'Alice',
          skypeId: 'abeecher',
          avatarId: '198500fc-1e99-4f5f-8926-248cea433366',
          location: 'Tilbury, UK',
          company: {
            organization: 'Moresby, Garland and Wedge',
            address1: '200 Butterwick Street',
            address2: 'Tilbury',
            address3: 'UK',
            postcode: 'ALF1 SAM1'
          },
          id: 'abeecher',
          email: 'abeecher@example.com'
        }
      },
      {
        entry: {
          lastName: null,
          userStatus: null,
          jobTitle: null,
          statusUpdatedAt: null,
          mobile: null,
          emailNotificationsEnabled: true,
          description: null,
          telephone: null,
          enabled: true,
          firstName: 'Administrator',
          skypeId: null,
          avatarId: null,
          location: null,
          company: {
            organization: null,
            address1: null,
            address2: null,
            address3: null,
            postcode: null
          },
          id: 'admin',
          email: 'admin@alfresco.com'
        }
      },
      {
        entry: {
          lastName: null,
          userStatus: null,
          jobTitle: null,
          statusUpdatedAt: null,
          mobile: null,
          emailNotificationsEnabled: true,
          description: null,
          telephone: null,
          enabled: false,
          firstName: 'Guest',
          skypeId: null,
          avatarId: null,
          location: null,
          company: {
            organization: null,
            address1: null,
            address2: null,
            address3: null,
            postcode: null
          },
          id: 'guest',
          email: null
        }
      },
      {
        entry: {
          lastName: 'Jackson',
          userStatus: 'Working on a new web design for the corporate site',
          jobTitle: 'Web Site Manager',
          statusUpdatedAt: '2011-02-15T20:13:09.649+0000',
          mobile: '012211331100',
          emailNotificationsEnabled: true,
          description: 'Mike is a demo user for the sample Alfresco Team site.',
          telephone: '012211331100',
          enabled: false,
          firstName: 'Mike',
          skypeId: 'mjackson',
          avatarId: '3fbde500-298b-4e80-ae50-e65a5cbc2c4d',
          location: 'Threepwood, UK',
          company: {
            organization: 'Green Energy',
            address1: '100 Cavendish Street',
            address2: 'Threepwood',
            address3: 'UK',
            postcode: 'ALF1 SAM1'
          },
          id: 'mjackson',
          email: 'mjackson@example.com'
        }
      }]
  };
  const userServiceMock = {
    getAll: jasmine.createSpy('getAll').and.returnValue(of(usersList)),

  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MatIconModule,
        MatChipsModule,
        BrowserAnimationsModule,
      ], providers: [
        {provide: UserService, useValue: userServiceMock},
      ],

    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should call getUserDetails', fakeAsync(() => {
    component.getUserDetails();
    tick();
    fixture.detectChanges();

    expect(component.entry).toEqual(usersList.entries);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('user is Guest', () => {
    entry = new Entry();
    entry.entry = new User();
    entry.entry.firstName = 'Guest';

    expect(component.isGuestChip(entry)).toBeFalsy();
  });

  it('user is not Guest', () => {
    entry = new Entry();
    entry.entry = new User();
    entry.entry.firstName = 'Administrator';

    expect(component.isGuestChip(entry)).toBeTruthy();
  });
});
