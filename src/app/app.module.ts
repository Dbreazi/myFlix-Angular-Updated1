import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // Add this for API requests
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FetchApiDataService } from './fetch-api-data.service';
import { AppRoutingModule } from './app-routing.module'; // Import the API service

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule  // Add HttpClientModule for making API requests
  ],
  providers: [FetchApiDataService],  // Register the service
  bootstrap: [AppComponent]
})
export class AppModule { }
