import { Component, NgZone, OnInit } from "@angular/core";
import {
  AlertController,
  LoadingController,
  MenuController,
  NavController,
  NavParams,
  ToastController,
} from "@ionic/angular";
import { Storage } from "@ionic/storage";

import { HomePage } from "../home/home.page";
import { User } from "../../shared/user.model";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { AuthService } from "src/app/services/auth/auth.service";
import { Md5 } from "ts-md5";
import { AlertService } from "src/app/services/alerts/alert.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  // Afficher la page login ou création de compte
  isLogin: boolean = true;

  // Show / hide passwords
  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;

  // For loading spinner
  isLoading: boolean = false;

  // Informations du formulaire login / inscription
  authForm = new FormGroup({
    username: new FormControl("", Validators.required),
    firstname: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    dateBirth: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    motDePasse: new FormControl("", Validators.required),
    motDePasseConfirm: new FormControl("", Validators.required),
  });

  // Nouveau user
  user: User = {};

  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    // Vérifier l'url --> login / inscription
    if (this.router.url === "/login") {
      this.isLogin = true;
      this.authForm.controls["username"].clearValidators();
      this.authForm.controls["lastname"].clearValidators();
      this.authForm.controls["firstname"].clearValidators();
      this.authForm.controls["city"].clearValidators();
      this.authForm.controls["dateBirth"].clearValidators();
      this.authForm.controls["motDePasseConfirm"].clearValidators();
    } else {
      this.isLogin = false;
    }
  }

  onSubmit() {
    if (this.isLogin) {
      this.handleLogin();
    } else {
      this.handleRegister();
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowPasswordConfirm() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }

  handleLogin() {
    if (this.authForm.valid) {
      // Start loading spinner
      this.isLoading = true;

      this.user.email = this.authForm.value.email.trim();
      const password = this.authForm.value.motDePasse.trim();

      // Check credentials
      this.checkCredentials(password);
    } else {
      // Champs non complétés
      this.alertService.presentAlert("error", "fillAllFields");
    }
  }

  checkCredentials(password: string) {
    this.authService.verifyAuth(this.user.email, password).then(
      (result) => {
        // Result contains repertoire vert id, or -1 if failed auth
        if (result !== -1) {
          // Auth successful
          // Fetch user info from DB
          this.getUserInfo(result);
        } else {
          // Auth failed

          this.alertService.presentAlert("error", "incorrectPassword");
          // Stop loading spinner
          this.isLoading = false;
        }
      },
      (error) => {
        // Stop loading spinner
        this.isLoading = false;

        // Server error
        console.log(error);
        this.alertService.presentAlert("error", "errorOccurred");
      }
    );
  }

  getUserInfo(id: number) {
    this.authService.getUser(id).subscribe(
      (response) => {
        // Authenticate user
        this.authService.authenticateUser(response);

        // Navigate to homepage
        this.router.navigate(["/"]);

        // Stop loading spinner
        this.isLoading = false;
      },
      (error) => {
        // Stop loading spinner
        this.isLoading = false;

        console.log(error);
        this.alertService.presentAlert("error", "errorOccurred");
      }
    );
  }

  handleRegister() {
    if (this.authForm.valid) {
      this.user.username = this.authForm.value.username.trim();
      this.user.email = this.authForm.value.email.trim();
      this.user.firstname = this.authForm.value.firstname.trim();
      this.user.lastname = this.authForm.value.lastname.trim();
      this.user.city = this.authForm.value.city.trim();
      this.user.dateBirth = this.authForm.value.dateBirth.trim();
      this.user.password = this.authForm.value.motDePasse.trim();
      this.user.role = "ROLE_USER";
      this.user.url = "https://www.repertoirevert.org";
      const passwordConfirm = this.authForm.value.motDePasseConfirm.trim();

      // Check passwords match
      if (this.user.password !== passwordConfirm) {
        this.alertService.presentAlert("error", "passwordsNotMatch");
      } else {
        this.register();
      }
    } else {
      this.alertService.presentAlert("error", "fillAllFields");
    }
  }

  register() {
    // Start loading spinner
    this.isLoading = true;

    // Start registration
    this.authService
      .register(
        this.user.username,
        this.user.email,
        this.user.password,
        this.user.password
      )
      .subscribe(
        (response) => {
          // Registration success
          if (response.hasOwnProperty("id")) {
            this.user.gaeaUserId = response.id;
            // Add user to Repertoire Vert DB
            this.registerToRepVertDB();
          } else {
            // Registration failed
            // Stop loading spinner
            this.isLoading = false;
            this.alertService.presentAlert("error", response.message);
          }
        },
        (error) => {
          // Stop loading spinner
          this.isLoading = false;
          this.alertService.presentAlert("error", "errorOccurred");
        }
      );
  }

  registerToRepVertDB() {
    // Hash password
    const hashedPassword = Md5.hashStr(this.user.password);
    this.user.password = hashedPassword;

    this.authService.registerToRepVertDB(this.user).subscribe(
      (response) => {
        // Stop loading spinner
        this.isLoading = false;

        // Set new user id
        this.user.id = response.repVertId;

        // Authenticate user
        this.authService.authenticateUser(this.user);

        // Authenticate user
        /* this.authService.loginUser(
        this.user.gaeaUserId, 
        this.user.username,
        this.user.firstname,
        this.user.lastname,
        response.token, 
        response.repVertId);*/
        this.router.navigate(["/"]);
      },
      (error) => {
        // Stop loading spinner
        this.isLoading = false;
        this.alertService.presentAlert("error", "errorOccurred");
      }
    );
  }
}
