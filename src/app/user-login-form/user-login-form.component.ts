import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * The `UserLoginFormComponent` handles user login functionality.
 * It provides a form for users to input their credentials and handles authentication logic.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /**
   * Holds user input data for login.
   * @property {string} Username - The username entered by the user.
   * @property {string} Password - The password entered by the user.
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Constructor to inject necessary services.
   * @param fetchApiData Service to handle API calls
   * @param dialogRef Reference to the login dialog
   * @param snackBar Service for showing snack bar notifications
   * @param router Angular Router for navigation
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router  
  ) { }

  /**
   * Lifecycle hook that triggers on component initialization.
   */
  ngOnInit(): void { }

  /**
   * Handles the user login process.
   * Sends login credentials to the API, stores the returned token and user data in `localStorage`,
   * and navigates to the movies page upon successful login.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      console.log('User logged in:', response);
  
      // Store user data & token in localStorage
      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);
  
      // Redirect to Movies page before refreshing
      this.router.navigate(['movies']).then(() => {
        window.location.reload(); 
      });
  
      // Close dialog
      this.dialogRef.close();
  
      // Show success message
      this.snackBar.open('Login successful!', 'OK', {
        duration: 2000
      });
    }, (error) => {
      console.error('Login failed:', error);
      this.snackBar.open('Invalid username or password', 'OK', {
        duration: 2000
      });
    });
  }
}
