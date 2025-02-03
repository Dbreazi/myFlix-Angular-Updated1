/**
 * Root component of the myFlix Angular application.
 * Handles core functionalities such as user authentication status and logout actions.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root', // The custom HTML tag representing this component in the app
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * The title of the application, displayed in the app UI where applicable.
   */
  title = 'myFlix-Angular-client';

  /**
   * Initializes the AppComponent with Angular's Router service.
   * @param router - Injected Angular Router for navigation control.
   */
  constructor(private router: Router) {}

  /**
   * Checks if the user is currently logged in.
   * It verifies the presence of an authentication token in localStorage.
   * 
   * @returns A boolean value: `true` if the user is logged in, `false` otherwise.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Logs out the current user by clearing the local storage.
   * After clearing the stored session data, it redirects the user to the welcome page.
   */
  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
