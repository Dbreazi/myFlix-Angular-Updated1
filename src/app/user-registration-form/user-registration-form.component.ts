import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The `UserRegistrationFormComponent` handles new user registration.
 * It provides a form for users to enter their registration details and submits them to the API.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  
  /**
   * Holds user registration data.
   * @property {string} Username - The username entered by the user.
   * @property {string} Password - The password entered by the user.
   * @property {string} Email - The email address entered by the user.
   * @property {string} Birthday - The user's date of birth.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructor to inject necessary services.
   * @param fetchApiData Service to handle API calls
   * @param dialogRef Reference to the registration dialog
   * @param snackBar Service for showing snack bar notifications
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that triggers on component initialization.
   */
  ngOnInit(): void {}

  /**
   * Handles the user registration process.
   * Sends user registration data to the API. On success, closes the dialog and shows a success message.
   * Displays an error message if the registration fails.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        console.log('User registered:', result); 
        this.dialogRef.close(); 
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000
        });
      },
      (error) => {
        console.log('Error registering user:', error); 
        this.snackBar.open(error.error, 'OK', {
          duration: 2000
        });
      }
    );
  }
}
