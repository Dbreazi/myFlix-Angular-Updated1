import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * The `DirectorDialogComponent` displays information about a movie director.
 * It is presented as a dialog when the user selects a director from the movie details.
 */
@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss']
})
export class DirectorDialogComponent {
  /**
   * Constructor to inject the director data into the dialog.
   * @param data The director data passed when opening the dialog, including name, biography, and birthdate.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
