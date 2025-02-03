import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

/**
 * The `WelcomePageComponent` serves as the landing page for the myFlix app.
 * It provides options for users to either register a new account or log in to an existing one.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  /**
   * Constructor to inject the Angular Material Dialog service.
   * @param dialog Service used to open modal dialogs for registration and login forms.
   */
  constructor(public dialog: MatDialog) {}

  /**
   * Opens the user registration dialog when the "Register" button is clicked.
   * Displays the `UserRegistrationFormComponent` in a modal window.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '400px'
    });
  }

  /**
   * Opens the user login dialog when the "Login" button is clicked.
   * Displays the `UserLoginFormComponent` in a modal window.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '400px'
    });
  }
}
