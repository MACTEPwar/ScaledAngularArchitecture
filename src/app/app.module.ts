import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
// import { SharedModule } from './shared/shared.module';
import { LayoutModule } from '@layout/layout.module';
import { ViewsModule } from '@views/views.module';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
// import { JwtInterceptor } from '@core/interceptors/jwt.iterceptor';

import { AppComponent } from './app.component';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CoreModule,
    // SharedModule,
    LayoutModule,
    ViewsModule,
    AppRoutingModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
