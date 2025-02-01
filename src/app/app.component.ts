import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(private router: Router) {}

  logoutUser(): void {
    localStorage.clear(); // Clears user data and token
    this.router.navigate(['welcome']); // Redirects to the welcome page
  }
}
