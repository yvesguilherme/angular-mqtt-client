import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { ExemploDeComponenteComponent } from './shared/components/exemplo-de-componente/exemplo-de-componente.component';
import { ExponentialStrengthExamplePipe } from './shared/pipes/exponential-strength-example.pipe';
import { ExampleDirectiveDirective } from './shared/directives/example-directive.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ExemploDeComponenteComponent,
    ExponentialStrengthExamplePipe,
    ExampleDirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
