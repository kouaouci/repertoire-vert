import { CallNumber } from "@ionic-native/call-number/ngx";
import { EmailProvider } from "src/app/services/emailProvider";
import { LocationTrackerProvider } from "./services/location-tracker/location-tracker";
import { SuperTabsModule } from "@ionic-super-tabs/angular";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Storage, IonicStorageModule } from "@ionic/storage";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { JwtInterceptor, JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { BackgroundGeolocation } from "@ionic-native/background-geolocation/ngx";
import { DeviceMotion } from "@ionic-native/device-motion/ngx";
import { DatePipe } from "@angular/common";
import { Stripe } from "@ionic-native/stripe/ngx";
import { EmailComposer } from "@ionic-native/email-composer/ngx";
import { NgxPaginationModule } from "ngx-pagination";
import { SharedComponentsModule } from "./components/shared-components.module";
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { WelcomeSlideComponent } from "./pages/welcome/welcome-slide/welcome-slide.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ForgotPassewordPageModule } from "./pages/forgot-passeword/forgot-passeword.module";
export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get("token");
    },
    whitelistedDomains: ["https://www.repertoirevert.org"],
  };
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, WelcomeComponent, WelcomeSlideComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    NgxPaginationModule,
    IonicStorageModule.forRoot({
      driverOrder: ["localstorage"],
    }),
    HttpClientModule,
    SuperTabsModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage],
      },
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    ForgotPassewordPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Geolocation,
    BackgroundGeolocation,
    NativeStorage,
    DeviceMotion,
    NgxPaginationModule,
    EmailComposer,
    EmailProvider,
    CallNumber,
    DatePipe,
    Stripe,
    LocationTrackerProvider,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
