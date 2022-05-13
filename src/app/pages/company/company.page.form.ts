import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";

export class CompanyPageForm {
  private formBuilder: FormBuilder;


  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  createCompanyForm(): FormGroup {
    return this.formBuilder.group(
      {
        gaeaUserId: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        username: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})"),
          ],
        ],
        passwordConfirm: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})"),
          ],
        ],
        email: [
          "",
          [
            Validators.required,
            Validators.email,
            Validators.pattern("[A-Za-z0-9.%-]+@[A-Za-z0-9.%-]+.[a-z]{2,3}"),
          ],
        ],
        emailConfirm: [
          "",
          [
            Validators.required,
            Validators.email,
            Validators.pattern("[A-Za-z0-9.%-]+@[A-Za-z0-9.%-]+.[a-z]{2,3}"),
          ],
        ],
        name: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ],
        ],
        socialreason: [
          "",
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        street: ["", [Validators.minLength(8), Validators.maxLength(254)]],
        postcode: ["", [Validators.minLength(3), Validators.maxLength(254)]],
        region: ["", [Validators.minLength(3), Validators.maxLength(254)]],
        city: ["", [Validators.minLength(3), Validators.maxLength(254)]],
        country: ["", [Validators.minLength(3), Validators.maxLength(254)]],
        phone: ["", [Validators.minLength(10), Validators.maxLength(20)]],
        urlwebsite: ["", [Validators.minLength(3), Validators.maxLength(254)]],
        urlfacebook: ["", [Validators.minLength(3), Validators.maxLength(254)]],
        urllinkedin: ["", [Validators.minLength(3), Validators.maxLength(254)]],
        urltwitter: ["", [Validators.minLength(3), Validators.maxLength(254)]],
        startingdate: ["", [Validators.required]],
        certification: ["", [Validators.required]],
        influencezone: ["", [Validators.required]],
        categories: ["", [Validators.required]],
        wantevaluation: ["", [Validators.required]],
        description: ["", [Validators.minLength(3), Validators.maxLength(508)]],
        vision: ["", [Validators.minLength(3), Validators.maxLength(508)]],
        image: [""],
      },
      {validators: [this.checkPassword, this.checkEmail],}
    );
   
  }

  checkPassword: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const password = group.get("password")!.value;
    const passwordConfirm = group.get("passwordConfirm")!.value;
    return password === passwordConfirm ? null : { passwordsNotEquals: true };
  };
  checkEmail: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const email = group.get("email")!.value;
    const emailConfirm = group.get("emailConfirm")!.value;
    return email === emailConfirm ? null : { emailsNotEquals: true };
  };

}
