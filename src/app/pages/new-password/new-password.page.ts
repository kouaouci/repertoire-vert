import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { ForgotPasswordService } from "src/app/services/forgot-password.service";
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from "@angular/router";
import { Md5 } from "ts-md5";
import { AuthService } from "src/app/services/auth/auth.service";
import * as shajs from "sha.js";

@Component({
  selector: "app-new-password",
  templateUrl: "./new-password.page.html",
  styleUrls: ["./new-password.page.scss"],
})
export class NewPasswordPage implements OnInit {
  token: string;
  newPassewordEmailForm: FormGroup;

  passwordConfirm: any;
  formBuilder: any;
  user: any;
  isLoading: boolean;

  //base_url_local_api: string;

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private toastController: ToastController,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.newPassewordEmailForm = this.fb.group({
      password: ["", [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ["", [Validators.required, Validators.minLength(8)]],
      token: ["", [Validators.required, Validators.minLength(8)]],
      text: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    //Récupération du secuCode qui se trouve sur la route (= url) + check du secuCode
    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.token = params.get("token");
      },
    });
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
    });
  }

  submitForm() {
    // check si les deux mot de passe sont identiques

    if (
      this.newPassewordEmailForm.controls["password"].value ===
      this.newPassewordEmailForm.controls["passwordConfirm"].value
    ) {
      console.log(this.newPassewordEmailForm.controls["password"].value);

      this.newPassewordEmailForm.controls["token"].setValue(this.token);
      //this.newPassewordEmailForm.controls["text"].value;
      //console.log(this.newPassewordEmailForm.controls["text"].value);

      console.log(this.token);
      //Hasher le mot de passe
      const hashedPassword = this.authService.encryptPassword(
        this.newPassewordEmailForm.controls["password"].value
      );

      //   this.newPassewordEmailForm.controls["password"].setValue(hashedPassword);
      const hashedPasswordConfirm = this.authService.encryptPassword(
        this.newPassewordEmailForm.controls["passwordConfirm"].value
      );

      //   this.newPassewordEmailForm.controls["passwordConfirm"].setValue(
      //     hashedPasswordConfirm
      //   );

      //set du token dans le form

      this.forgotPasswordService
        .sendNewPasswordMail(
          hashedPassword,

          this.newPassewordEmailForm.controls["token"].value
        )

        .subscribe({
          next: async () => {
            console.log(this.newPassewordEmailForm.controls["password"].value);
            console.log(this.token);
            const toast = await this.toastController.create({
              message: "Votre mot à  été réintialiser  avec succès",
              duration: 3500,
              color: "gaea-green-deep",
              position: "bottom",
              animated: true,
            });
            toast.present();
            console.log(this.newPassewordEmailForm.controls["password"].value);
            this.router.navigate(["/login"]);
          },
        });

      //this.router.navigate(["/login"]);
    } else {
      async () => {
        const toast = await this.toastController.create({
          message: "Les mots de passe ne correspondent pas",
          duration: 3500,
          color: "danger",

          position: "bottom",
          animated: true,
        });
        toast.present();
      };
    }
  }
}
