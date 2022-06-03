import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { ForgotPasswordService } from "src/app/services/forgot-password.service";
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from "@angular/router";
@Component({
  selector: "app-new-password",
  templateUrl: "./new-password.page.html",
  styleUrls: ["./new-password.page.scss"],
})
export class NewPasswordPage implements OnInit {
  passwordReinitialization: boolean;
  token: boolean;
  secuToken: any;

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
    this.secuToken = "";
  }

  ngOnInit(): void {
    //Récupération du secuCode qui se trouve sur la route (= url) + check du secuCode
    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.secuToken = params.get("token");
        //this.token = this.secuToken;
      },
    });
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        this.passwordReinitialization = false;
      }
    });
  }

  get password() {
    return this.newPassewordEmailForm.get("password");
  }
  submitForm() {
    // check si les deux mot de passe sont identiques
    if (
      this.newPassewordEmailForm.controls["password"].value ===
      this.newPassewordEmailForm.controls["passwordConfirm"].value
    ) {
      this.newPassewordEmailForm.controls["token"].setValue(this.token);

      //set du token dans le form

      this.forgotPasswordService
        .sendNewPasswordMail(this.newPassewordEmailForm.value)
        .subscribe({
          next: async () => {
            this.passwordReinitialization = true;
            const toast = await this.toastController.create({
              message: "Votre mot à  été réintialiser  avec succès",
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
