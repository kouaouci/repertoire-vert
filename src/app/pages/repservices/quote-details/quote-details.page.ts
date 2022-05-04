import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import {EmailComposer, EmailComposerOptions} from "@ionic-native/email-composer/ngx";
@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.page.html',
  styleUrls: ['./quote-details.page.scss'],
})
export class QuoteDetailsPage implements OnInit {
  quotedetails:any;
  questions:any;
  messagess:any
  comments:any;
  likes:any;
  CompanyId:any;
  DevisForm:FormGroup;
  userInformations:any = []; 
  userId:any;
  serviceId:any
  user:any;
    constructor(private repVertAPI:RepVertApiService, private zone: NgZone, private route:ActivatedRoute, public fb: FormBuilder,
      public toastController:ToastController, public auth:AuthService,private emailComposer: EmailComposer) {
      this.DevisForm = this.fb.group({
        question:[null,Validators.required]
  
      });
     }
  
    ngOnInit() {
    
    }
    ionViewDidEnter(){
      this.getQuoteDetails()
      this.loadUser()
    
    }
    loadUser()
  {
    this.auth.profile().subscribe(data =>{
      // console.log('detalles: ',result);
      this.userInformations =  data;
      console.log("loaded")
      console.log( this.userInformations)
      console.log( this.userInformations);
      console.log( this.userInformations.id);
      this.userId=this.userInformations.id
      this.getQuoteDetails()
    
    });
    
 
  }
  getQuoteDetails(){
    let id = this.route.snapshot.paramMap.get('id');
    this.repVertAPI.getQuoteDetails(id).subscribe(data =>{  
      this.quotedetails =data
      console.log('Quote details: ',this.quotedetails)
     // this.userId=this.quotedetails[0].company.id;
      this.serviceId=this.quotedetails[0].id;
      this.user=this.quotedetails[0].user.id
      this.repVertAPI.getDiscussionQuote(this.serviceId,this.userId).subscribe(data =>{  
        this.questions =data
        console.log('Quote messages: ',this.questions)
     
      })
      this.repVertAPI.getDiscussionQuoteRec(this.serviceId,this.userId).subscribe(data =>{  
        this.messagess =data
        console.log('Quote messages other: ',this.messagess)
     
      })
    })
 
  }
 

  onFormSubmit(id) {
    if (!this.DevisForm.valid) {
      return false;
    } else {
      this.repVertAPI.sendQuestion(this.user,this.DevisForm.value,this.serviceId)
        .subscribe((res) => {
          this.zone.run(() => {
            this.presentToast();
            this.repVertAPI.getDiscussionQuote(this.serviceId,this.userId).subscribe(data =>{  
              this.questions =data
              console.log('Quote messages: ',this.questions)
           
            })
            this.repVertAPI.getDiscussionQuoteRec(this.serviceId,this.userId).subscribe(data =>{  
              this.messagess =data
              console.log('Quote messages other: ',this.messagess)
           
            })
            //this.getDiscussion();
           // this.getRecipientMessages()
            console.log(res)
            this.DevisForm.reset();
          })
        });
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Message envoyé',
      duration: 2000
    });
    toast.present();
  }
  private get isEmailClientConfigured(): Promise<boolean> {
    return this.emailComposer.isAvailable();
  }
   /**
   * Tries to open an email client and populate the fields.
   */
    intentToSend() {
      if (this.isEmailClientConfigured) {
        const email: EmailComposerOptions = {
          to:  this.user=this.quotedetails[0].user.email,
          isHtml: true
        };
        this.emailComposer.open(email);
      } else {
        console.log('Could not find an email configured.');
      }
    }
 
  }
  