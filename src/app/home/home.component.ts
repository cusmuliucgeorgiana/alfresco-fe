import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Entry} from "../models/entry.model";
import {UserConstants} from "../utils/constants";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  selectable: boolean = true;
  enabled: boolean = true;
  entry: Array<Entry>;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUserDetails();
  }

  /**
   * populate the component with all the data from service
   */
  getUserDetails(): void {
    this.userService.getAll().subscribe(users => {
      this.entry = users.entries;
    });
  }

  /**
   * The function will delete the selected chip
   * @param user represents the entity and contains all the details about it
   */
  remove(user: Entry): void {
    const index = this.entry.indexOf(user);

    if (index >= 0) {
      this.entry.splice(index, 1);
    }
  }

  /**
   * Check the first name to be Guest in order to keep the color gray and
   * cannot be deleted
   * @param user represents the entity and contains all the details about it
   */
  isGuestChip(user: Entry): boolean {
    if (user.entry.firstName == UserConstants.FIRST_NAME)
      return !this.enabled;
    return this.enabled;
  }
}
