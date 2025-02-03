import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * The `MovieDetailsDialogComponent` displays detailed information about a specific movie.
 * It is presented as a dialog when the user selects a movie for more details.
 */
@Component({
  selector: 'app-movie-details-dialog',
  templateUrl: './movie-details-dialog.component.html',
  styleUrls: ['./movie-details-dialog.component.scss']
})
export class MovieDetailsDialogComponent {
  /**
   * Constructor to inject movie data into the dialog.
   * @param data The movie data passed when opening the dialog, including title, description, genre, director, etc.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
