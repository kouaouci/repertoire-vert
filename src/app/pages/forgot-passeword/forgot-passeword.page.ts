import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ForgotPasswordService } from "src/app/services/forgot-password.service";
import { ToastController } from "@ionic/angular";

import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-forgot-passeword",
  templateUrl: "./forgot-passeword.page.html",
  styleUrls: ["./forgot-passeword.page.scss"],
})
export class ForgotPassewordPage implements OnInit {
  url: string = "https://www.repertoirevert.org/";
  email: string;
  token: string;

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
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.email = "";
    this.token = "";
  }

  ngOnInit() {}

  sendEmail() {
    this.forgotPasswordService
      .preresetPassword(this.url, this.sendEmailForm.get("email").value)

      .subscribe({
        next: async () => {
          const toast = await this.toastController.create({
            message: "un mail avec un lien établi a été envoyé à votre adresse",
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
