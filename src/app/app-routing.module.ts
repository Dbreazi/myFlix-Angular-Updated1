import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Defines the application's main routing module.
 * Handles navigation between different views.
 */
const routes: Routes = []; // We'll add routes later

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Initializes the router with the defined routes
  exports: [RouterModule] // Makes RouterModule available throughout the app
})
export class AppRoutingModule { }