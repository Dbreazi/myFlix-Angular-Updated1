import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';

/**
 * The `MovieCardComponent` handles the display of movies and manages interactions 
 * such as viewing movie details, genres, directors, and toggling favorite movies.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  /** List of all movies fetched from the API */
  movies: any[] = [];
  /** List of user's favorite movie IDs */
  favoriteMovies: string[] = [];
  /** Currently logged-in user's username */
  user: string | null = localStorage.getItem('user');

  /**
   * Constructor to inject necessary services.
   * @param fetchApiData Service to handle API calls
   * @param dialog Service for opening Angular Material dialogs
   * @param snackBar Service for showing snack bar notifications
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that triggers on component initialization.
   * Fetches movies and user's favorite movies.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Opens a dialog to display genre details.
   * @param genre The genre information to display
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: { genre },
      width: '450px',
      maxHeight: '90vh'
    });
  }
  
  /**
   * Opens a dialog to display director details.
   * @param director The director information to display
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { director },
      width: '450px',
      maxHeight: '90vh'
    });
  }
  
  /**
   * Opens a dialog to display detailed information about a movie.
   * @param movie The movie information to display
   */
  openMovieDetailsDialog(movie: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: { movie },
      width: '450px',
      maxHeight: '90vh'
    });
  }
  
  /**
   * Fetches all movies from the API and stores them in the `movies` array.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  /**
   * Retrieves the user's favorite movies and stores their IDs.
   */
  getFavoriteMovies(): void {
    if (!this.user) return;
    this.fetchApiData.getUser(this.user).subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies || [];
    });
  }

  /**
   * Checks if a given movie is in the user's list of favorites.
   * @param movieId The ID of the movie to check
   * @returns `true` if the movie is a favorite, `false` otherwise
   */
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  /**
   * Toggles a movie as a favorite. Adds to favorites if not present, removes if already a favorite.
   * @param movieId The ID of the movie to toggle
   */
  toggleFavorite(movieId: string): void {
    if (!this.user) return;

    if (this.isFavorite(movieId)) {
      this.fetchApiData.removeMovieFromFavorites(this.user, movieId).subscribe(() => {
        this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId);
        this.snackBar.open('Movie removed from favorites', 'OK', { duration: 2000 });
      });
    } else {
      this.fetchApiData.addMovieToFavorites(this.user, movieId).subscribe(() => {
        this.favoriteMovies.push(movieId);
        this.snackBar.open('Movie added to favorites!', 'OK', { duration: 2000 });
      });
    }
  }
}
