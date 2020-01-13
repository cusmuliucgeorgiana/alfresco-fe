import { Component } from '@angular/core';
import {User} from "./models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'acs-fe';

  constructor() {}
}
