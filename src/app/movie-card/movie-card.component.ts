import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: string[] = [];
  user: string | null = localStorage.getItem('user');

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: { genre },
      width: '450px',
      maxHeight: '90vh'
    });
  }
  
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { director },
      width: '450px',
      maxHeight: '90vh'
    });
  }
  
  openMovieDetailsDialog(movie: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: { movie },
      width: '450px',
      maxHeight: '90vh'
    });
  }
  
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  getFavoriteMovies(): void {
    if (!this.user) return;
    this.fetchApiData.getUser(this.user).subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies || [];
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

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
