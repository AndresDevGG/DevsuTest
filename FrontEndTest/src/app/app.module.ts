import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonComponentsModule } from './components/common-components/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { productRoot } from './store/product/product-state.index';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([
      productRoot.ProductEffects,
    ]),
    StoreModule.forRoot({
      productState: productRoot.ProductReducer,
    }),
    ToastrModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    CommonComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
