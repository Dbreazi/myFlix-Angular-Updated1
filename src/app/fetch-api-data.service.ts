/**
 * Service responsible for API calls related to user and movie data.
 * Handles HTTP requests using Angular's HttpClient module.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const apiUrl = 'https://strobeapp-583fefccfb94.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  /**
   * Registers a new user.
   * @param userDetails - Object containing user registration details.
   * @returns Observable with the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + '/users', userDetails, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(catchError(this.handleError));
  }  

  /**
   * Logs in an existing user.
   * @param userDetails - Object containing user login credentials.
   * @returns Observable with the API response.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + '/login', userDetails, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(catchError(this.handleError));
  }

  /**
   * Retrieves all movies from the API.
   * @returns Observable with an array of movies.
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves a specific movie by title.
   * @param title - The movie's title.
   * @returns Observable with the movie data.
   */
  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/movies/${title}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves information about a director by name.
   * @param name - Director's name.
   * @returns Observable with the director data.
   */
  public getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/directors/${name}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves information about a genre by name.
   * @param name - Genre name.
   * @returns Observable with the genre data.
   */
  public getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/genres/${name}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves user information by username.
   * @param username - The user's username.
   * @returns Observable with the user data.
   */
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/users/${username}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves a user's favorite movies.
   * @param username - The user's username.
   * @returns Observable with an array of favorite movies.
   */
  public getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/users/${username}/movies`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Adds a movie to the user's favorites.
   * @param username - The user's username.
   * @param movieId - The ID of the movie to add.
   * @returns Observable with the API response.
   */
  public addMovieToFavorites(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `/users/${username}/movies/${movieId}`, {}, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Removes a movie from the user's favorites.
   * @param username - The user's username.
   * @param movieId - The ID of the movie to remove.
   * @returns Observable with the API response.
   */
  public removeMovieFromFavorites(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `/users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(catchError(this.handleError));
  }

  /**
   * Updates user information.
   * @param username - The user's username.
   * @param userDetails - Object containing updated user details.
   * @returns Observable with the updated user data.
   */
  public editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `/users/${username}`, userDetails, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Deletes a user account.
   * @param username - The user's username.
   * @returns Observable with the API response.
   */
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `/users/${username}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(catchError(this.handleError));
  }

  /**
   * Extracts response data from API calls.
   * @param res - The response object.
   * @returns Extracted data or an empty object.
   */
  private extractResponseData(res: any): any {
    return res || {};
  }

  /**
   * Handles API errors.
   * @param error - The error response.
   * @returns An observable error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, Error body is: ${error.error}`);
    }
    return throwError('Something went wrong; please try again later.');
  }
}
