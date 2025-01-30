import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // This function handles user login
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      console.log('User logged in:', response);

      // ✅ Store user data & token in localStorage properly
      localStorage.setItem('user', JSON.stringify(response.user)); // Store full user object
      localStorage.setItem('token', response.token); // Store token

      // Close dialog & show success message
      this.dialogRef.close();
      this.snackBar.open('Login successful!', 'OK', {
        duration: 2000
      });
    }, (error) => {
      console.error('Login failed:', error);

      // Show user-friendly error message
      this.snackBar.open('Invalid username or password', 'OK', {
        duration: 2000
      });
    });
  }
}
