/**
 * The root module of the Angular application.
 * Configures components, imports necessary Angular modules, and sets up routing.
 */

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FetchApiDataService } from './fetch-api-data.service';
import { RouterModule, Routes } from '@angular/router';

// Angular Material Modules for UI components
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custom Components
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GenreDialogComponent } from './genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from './director-dialog/director-dialog.component';
import { MovieDetailsDialogComponent } from './movie-details-dialog/movie-details-dialog.component';

/**
 * Application routes for navigation.
 * - '/welcome' loads the WelcomePageComponent
 * - '/movies' loads the MovieCardComponent
 * - '/profile' loads the UserProfileComponent
 * - Redirects to '/welcome' by default
 */
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileComponent,
    GenreDialogComponent, 
    DirectorDialogComponent,
    MovieDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes), // Configures the app routes
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule
  ],
  providers: [FetchApiDataService], // Registers the API service globally
  bootstrap: [AppComponent] // Bootstraps the root AppComponent
})
export class AppModule { }
