import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UiLayoutDefaultComponent } from './shared/ui/ui-layout-default/ui-layout-default.component';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { LOCATION_INITIALIZED } from '@angular/common';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function appInitializerFactory(
  translate: TranslateService,
  injector: Injector,
) {
  return () =>
    new Promise((resolve) => {
      const locationInitialized = injector.get(
        LOCATION_INITIALIZED,
        Promise.resolve(null),
      );
      locationInitialized.then(() => {
        const langToSet = 'en';
        translate.setDefaultLang('en');
        translate.use(langToSet).subscribe(
          () => {
            console.info(`Successfully initialized '${langToSet}' language.'`);
          },
          () => {
            console.error(
              `Problem with '${langToSet}' language initialization.'`,
            );
          },
          () => {
            resolve(null);
          },
        );
      });
    });
}

@NgModule({
  declarations: [AppComponent, HomeComponent, UiLayoutDefaultComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AutoCompleteModule,
    ChipModule,
    CardModule,
    TagModule,
    DropdownModule,
    TooltipModule,
    PanelModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
