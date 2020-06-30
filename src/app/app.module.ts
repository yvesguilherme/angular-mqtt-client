import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { ExemploDeComponenteComponent } from './shared/components/exemplo-de-componente/exemplo-de-componente.component';
import { ExponentialStrengthPipe } from './shared/pipes/exponential-strength.pipe';
import { ExponentialStrengthExamplePipe } from './shared/pipes/exponential-strength-example.pipe';
import { ExampleDirectiveDirective } from './shared/directives/example-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ExemploDeComponenteComponent,
    ExponentialStrengthPipe,
    ExponentialStrengthExamplePipe,
    ExampleDirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
