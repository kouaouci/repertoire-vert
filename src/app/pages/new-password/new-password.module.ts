import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthGuard } from "src/app/services/auth/auth.guard";
import { IonicModule } from "@ionic/angular";
import { AuthGuardService } from "src/app/services/auth.guard.service";
import { NewPasswordPageRoutingModule } from "./new-password-routing.module";
import { NewPasswordPage } from "./new-password.page";
import { SharedComponentsModule } from "src/app/components/shared-components.module";
import { ErrorMessageComponent } from "src/app/components/error-message/error-message.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPasswordPageRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
  ],
  declarations: [NewPasswordPage],
})
export class NewPasswordPageModule {}
