import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AppService } from './app.service';
import { AppHttpInterceptorService } from './http-interceptor.service';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { CreateAccountComponent } from './create-account/create-account.component';

const routes: Routes = [
  {
    path: '**',
    redirectTo: '/play',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileEditorComponent,
    LoginComponent,
    TaskListComponent,
    TaskDetailsComponent,
    CreateAccountComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'Csrf-Token',
      headerName: 'Csrf-Token',
    }),
    RouterModule.forRoot(routes),
    AppRoutingModule
  ],
  providers: [
    AppService,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptorService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
