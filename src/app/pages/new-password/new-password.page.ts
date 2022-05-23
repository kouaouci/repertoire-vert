import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { ForgotPasswordService } from "src/app/services/forgot-password.service";
import { ErrorMessageComponent } from "src/app/components/error-message/error-message.component";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-new-password",
  templateUrl: "./new-password.page.html",
  styleUrls: ["./new-password.page.scss"],
})
export class NewPasswordPage implements OnInit {
  passwordReinitialization: boolean;
  secuCodeValid: boolean;

  newPassewordEmailForm = this.fb.group({
    password: [null, [Validators.required, Validators.minLength(8)]],
    passwordConfirm: [null, [Validators.required, Validators.minLength(8)]],
    token: [null, [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private toastController: ToastController,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.passwordReinitialization = false;
    this.secuCodeValid = false;
    e;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.token) {
        this.secuCodeValid = true;
        this.passwordReinitialization = true;
      }
    });
  }
  submitForm() {
    let formData = new FormData();
    // check si les deux mot de passe sont identiques
    if (
      this.newPassewordEmailForm.controls["password"].value ===
      this.newPassewordEmailForm.controls["passwordConfirm"].value
    ) {
      formData.append(
        "_password",
        this.newPassewordEmailForm.controls["password"].value
      );
      //set du token dans le form
      formData.append(
        "_token",
        this.newPassewordEmailForm.controls["token"].value
      );
      this.forgotPasswordService
        .sendNewPasswordMail(this.newPassewordEmailForm.value)
        .subscribe({
          next: async () => {
            const toast = await this.toastController.create({
              message: "Votre compte à été crée avec succès",
              duration: 3500,
              color: "gaea-green-deep",
              position: "bottom",
              animated: true,
            });
            toast.present();
            this.router.navigate(["/login"]);
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
}
