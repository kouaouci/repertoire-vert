import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-quote-request',
  templateUrl: './quote-request.page.html',
  styleUrls: ['./quote-request.page.scss'],
})
export class QuoteRequestPage implements OnInit {
  quotes:any;
  comments:any;
  likes:any;
  CompanyId:any;
  numberOfQuotes:any;
  userInformations:any = []; 
    constructor(private repVertAPI:RepVertApiService, private zone: NgZone, private route:ActivatedRoute,
      public toastController:ToastController,private authProvider:AuthService) {
 
     }
  
    ngOnInit() {
      this.authProvider.profile().subscribe(data =>{
        // console.log('detalles: ',result);
        this.userInformations =  data;
        console.log("loaded")
        console.log( this.userInformations)
        console.log( this.userInformations);
        console.log( this.userInformations.id);
        localStorage.setItem('userid', this.userInformations.id )
        this.repVertAPI.getQuotesFromUsersByCompany(this.userInformations.id).subscribe(data =>{  
          this.quotes =data
          console.log('Quotes: ',this.quotes)
          this.numberOfQuotes=Object.keys(this.quotes).length
      
        })
     
      })
      
    
    }
    doRefresh(event) {
      this.getSingleService();
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 1000);
    }

  getSingleService(){

    this.repVertAPI.getQuotesFromUsersByCompany(this.userInformations.id).subscribe(data =>{  
      this.quotes =data
      console.log('Quotes: ',this.quotes)
    
  
    })
 
  }



  
  }
  