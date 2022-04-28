import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';


@Injectable()
export class EmailProvider {

  constructor(private _EMAIL: EmailComposer) { }




  /**
   *
   * @public
   * @method sendMail
   * @param to    			{string}    The primary e-mail address
   * @param cc    			{string}    The carbon copy e-mail address
   * @param bcc   			{string}    The blank carbon copy e-mail address
   * @param subject        {string}    The subject for the e-mail message
   * @param body           {string}    The message content
   *
   */
  sendEmail(to: string,
    cc: string,
    bcc: string,
    subject: string,
    body: string): void {
    // Use the plugin isAvailable method to check whether
    // the user has configured an email account

    let email: any = {
      app: 'mailto',
      to: to,
      cc: cc,
      bcc: bcc,
      subject: subject,
      body: body
    };

    // Open the device e-mail client and create
    // a new e-mail message populated with the
    // object containing our message data
    this._EMAIL.open(email);

    // this._EMAIL.isAvailable('mailto')
    //   .then((available: boolean) => {

    //     // Check that plugin has been granted access permissions to
    //     // user's e-mail account
    //     this._EMAIL.hasPermission()
    //       .then((isPermitted: boolean) => {

    //         // Define an object containing the
    //         // keys/values for populating the device
    //         // default mail fields when a new message
    //         // is created

    //       })
    //       .catch((error: any) => {
    //         console.log('No access permission granted');
    //         console.dir(error);
    //       });
    //   })
    //   .catch((error: any) => {
    //     console.log('User does not appear to have device e-mail account');
    //     console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    //   });
  }

}