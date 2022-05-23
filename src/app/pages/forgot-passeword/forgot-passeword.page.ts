import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ForgotPasswordService } from "src/app/services/forgot-password.service";
import { ToastController } from "@ionic/angular";
import { async } from "rxjs/internal/scheduler/async";
@Component({
  selector: "app-forgot-passeword",
  templateUrl: "./forgot-passeword.page.html",
  styleUrls: ["./forgot-passeword.page.scss"],
})
export class ForgotPassewordPage implements OnInit {
  emailHasSend: boolean;
  sendEmailForm = this.fb.group({
    email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("[A-Za-z0-9.%-]+@[A-Za-z0-9.%-]+.[a-z]{2,3}"),
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private toastController: ToastController
  ) {
    this.emailHasSend = false;
  }

  ngOnInit() {}

  sendEmail() {
    console.log(this.sendEmailForm.value);
    let formData = new FormData();
    formData.append("_email", this.sendEmailForm.value.email);
    this.forgotPasswordService.preresetPassword(formData).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: "Votre compte à été crée avec succès",
          duration: 3500,
          color: "gaea-green-deep",
          position: "bottom",
          animated: true,
        });
        toast.present();

        //console.log("Email sent");
      },
      error: async (_error) => {
        const toast = await this.toastController.create({
          message:
            "Un problème est survenue lors de la connexion au serveur veuillez réesayer",
          duration: 3500,
          position: "bottom",
          animated: true,
          color: "danger",
        });
        toast.present();
      },
    });
  }
}
