import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AutoCompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
