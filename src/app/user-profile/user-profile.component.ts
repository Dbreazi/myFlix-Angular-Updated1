import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * The `UserProfileComponent` allows users to view and manage their profile information,
 * including updating personal details, managing favorite movies, and deleting their account.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {}; // Holds user information
  favoriteMovies: any[] = []; // Stores the user's favorite movies
  updatedUser: any = {}; // Holds updated user info for editing

  /**
   * Constructor to inject necessary services for API calls, notifications, and routing.
   * @param fetchApiData Service for fetching user and movie data from the API.
   * @param snackBar Service for displaying success/error messages.
   * @param router Angular Router for navigating between views.
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that initializes the component by fetching the current user data.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Retrieves the logged-in user's data from the API and updates the local user object.
   * Also initializes the updatedUser object for editing purposes.
   */
  getUser(): void {
    const username = localStorage.getItem('user');
    if (!username) return;

    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser = {
        Username: resp.Username,
        Email: resp.Email,
        Birthday: resp.Birthday,
        Password: '' // Allows user to change password if needed
      };
      this.getFavoriteMovies();
    });
  }

  /**
   * Retrieves the list of favorite movies for the current user.
   */
  getFavoriteMovies(): void {
    const username = localStorage.getItem('user');
    if (!username) return;

    this.fetchApiData.getUser(username).subscribe((user: any) => {
      this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
        this.favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie._id));
      });
    });
  }

  /**
   * Updates the user's profile information using data from the `updatedUser` object.
   * Displays success or error messages based on the API response.
   */
  updateUser(): void {
    const username = localStorage.getItem('user');
    if (!username) return;

    if (!this.updatedUser.Password) {
      delete this.updatedUser.Password;
    }

    this.fetchApiData.editUser(username, this.updatedUser).subscribe(
      (resp: any) => {
        this.snackBar.open('Profile updated successfully', 'OK', { duration: 2000 });
        this.user = resp;
        localStorage.setItem('user', resp.Username);
        this.updatedUser.Password = ''; // Reset password field after update
      },
      (error) => {
        console.error('Update failed:', error);
        this.snackBar.open('Profile update failed', 'OK', { duration: 2000 });
      }
    );
  }

  /**
   * Deletes the user's account after confirmation.
   * Clears local storage and redirects to the welcome page upon successful deletion.
   */
  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      const username = localStorage.getItem('user');
      if (!username) return;

      this.fetchApiData.deleteUser(username).subscribe(
        () => {
          this.snackBar.open('Account deleted', 'OK', { duration: 2000 });
          localStorage.clear();
          this.router.navigate(['welcome']);
        },
        (error: any) => {
          console.error('Delete failed:', error);
          this.snackBar.open('Account deletion failed', 'OK', { duration: 2000 });
        }
      );
    }
  }

  /**
   * Removes a movie from the user's list of favorite movies.
   * @param movieId The ID of the movie to be removed from favorites.
   */
  removeFromFavorites(movieId: string): void {
    const username = localStorage.getItem('user');
    if (!username) return;

    this.fetchApiData.removeMovieFromFavorites(username, movieId).subscribe(() => {
      this.favoriteMovies = this.favoriteMovies.filter(movie => movie._id !== movieId);
      this.snackBar.open('Movie removed from favorites', 'OK', { duration: 2000 });
    });
  }
}
