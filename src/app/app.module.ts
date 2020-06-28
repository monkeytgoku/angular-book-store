import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from './store/store.module';

const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    StoreModule,
    AdminModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    HttpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
