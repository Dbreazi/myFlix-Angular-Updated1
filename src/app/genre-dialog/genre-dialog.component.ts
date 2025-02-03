import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * The `GenreDialogComponent` is responsible for displaying details about a movie genre.
 * It is opened as a dialog window when a user selects a genre.
 */
@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent {
  /**
   * Constructor to inject data passed into the dialog.
   * @param data The genre data passed when opening the dialog, including name and description.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
