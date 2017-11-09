//Angular module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//App component
import { AppComponent } from './app.component';

//Providers
import { AuthenticationService } from './providers/authentication.service';
import { BlogService } from './providers/blog.service';

//Routing
import { Routing } from './app.routes';

//Pages
import { FrontComponent } from './frontend/front.component';
import { HeaderComponent } from './frontend/header/header.component';
import { FooterComponent } from './frontend/footer/footer.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontComponent,
    AdminComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    Routing
  ],
  providers: [AuthenticationService, BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
