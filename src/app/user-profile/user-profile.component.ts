import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];
  updatedUser: any = {}; // Holds updated user info

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const username = localStorage.getItem('user');
    if (!username) return;

    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser = {
        Username: resp.Username,
        Email: resp.Email,
        Birthday: resp.Birthday,
        Password: '' // Allows user to change password, if needed
      };
      this.getFavoriteMovies();
    });
  }

  getFavoriteMovies(): void {
    if (!this.user || !this.user.FavoriteMovies) return;
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      this.favoriteMovies = movies.filter(movie => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  updateUser(): void {
    const username = localStorage.getItem('user');
    if (!username) return;

    if (!this.updatedUser.Password) {
      delete this.updatedUser.Password;
    }

    this.fetchApiData.editUser(username, this.updatedUser).subscribe((resp: any) => {
      this.snackBar.open('Profile updated successfully', 'OK', { duration: 2000 });
      this.user = resp;
      localStorage.setItem('user', resp.Username);
      this.updatedUser.Password = ''; // Reset password field after update
    }, (error) => {
      console.error('Update failed:', error);
      this.snackBar.open('Profile update failed', 'OK', { duration: 2000 });
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      const username = localStorage.getItem('user');
      if (!username) return;

      this.fetchApiData.deleteUser(username).subscribe(() => {
        this.snackBar.open('Account deleted', 'OK', { duration: 2000 });
        localStorage.clear();
        this.router.navigate(['welcome']);
      }, (error: any) => {
        console.error('Delete failed:', error);
        this.snackBar.open('Account deletion failed', 'OK', { duration: 2000 });
      });      
    }
  }

  removeFromFavorites(movieId: string): void {
    const username = localStorage.getItem('user');
    if (!username) return;

    this.fetchApiData.removeMovieFromFavorites(username, movieId).subscribe(() => {
      this.favoriteMovies = this.favoriteMovies.filter(movie => movie._id !== movieId);
      this.snackBar.open('Movie removed from favorites', 'OK', { duration: 2000 });
    });
  }
}
