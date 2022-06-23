import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedComponentsModule } from "src/app/components/shared-components.module";
import { IonicModule } from "@ionic/angular";
import { ForgotPassewordPageRoutingModule } from "./forgot-passeword-routing.module";

import { ForgotPassewordPage } from "./forgot-passeword.page";
import { ErrorMessageComponent } from "src/app/components/error-message/error-message.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPassewordPageRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
  ],
  declarations: [ForgotPassewordPage],
})
export class ForgotPassewordPageModule {}
