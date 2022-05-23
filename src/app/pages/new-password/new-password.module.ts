import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthGuard } from "src/app/services/auth/auth.guard";
import { IonicModule } from "@ionic/angular";
import { AuthGuardService } from "src/app/services/auth.guard.service";
import { NewPasswordPageRoutingModule } from "./new-password-routing.module";

import { NewPasswordPage } from "./new-password.page";
import { ErrorMessageComponent } from "../../components/error-message/error-message.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPasswordPageRoutingModule,
  ],
  declarations: [
    NewPasswordPage,
    ErrorMessageComponent,
    AuthGuard,
    AuthGuardService,
  ],
})
export class NewPasswordPageModule {}
