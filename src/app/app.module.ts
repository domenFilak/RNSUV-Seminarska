import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';

import { HttpClientModule } from '@angular/common/http';
import { AdminGuard } from './guards/admin.guard';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    HttpClientModule
    
  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
