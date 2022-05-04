import { AuthService } from 'src/app/services/auth.service';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';

@Component({
  selector: 'app-discussion-chat',
  templateUrl: './discussion-chat.page.html',
  styleUrls: ['./discussion-chat.page.scss'],
})
export class DiscussionChatPage implements OnInit {
  userInformations:any = []; 
  userId:any;
  numberOfReports:any;
  messages;
  recipientMessages;
  cardColor:any;
  MessageForm: FormGroup;
  @Input()
  id: any;
  @Input()
  firstname: any;
  @Input()
  lastname: any;
  @Input()
  username: any;
  constructor(public fb: FormBuilder,public modalController: ModalController, private repVertAPI:RepVertApiService,public auth:AuthService, public toastController:ToastController, private zone: NgZone) { 
    this.MessageForm = this.fb.group({
      message:[null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
     ])]

    });
  
  }

  ngOnInit() {
  }
  onFormSubmit(id) {
    if (!this.MessageForm.valid) {
      return false;
    } else {
      this.repVertAPI.SendMessagetoUser(id,this.MessageForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            this.presentToast();
            this.getDiscussion();
            this.getRecipientMessages()
            console.log(res)
            this.MessageForm.reset();
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
  ionViewDidEnter(){
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
      this.getDiscussion()
      this.getRecipientMessages()
    
    });
    
 
  }
  doRefresh(event) {
    this.getDiscussion();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
  getDiscussion(){
  
    this.repVertAPI.getDiscussionBetweenUsers(this.userId,this.id).subscribe(data =>{
      // console.log('detalles: ',result);
      this.messages =  data;
      console.log("loaded")
      console.log( this.messages)


    });
  }
  
  getRecipientMessages(){
  
    this.repVertAPI.getDiscussionBetweenUsers(this.id,this.userId).subscribe(data =>{
      // console.log('detalles: ',result);
      this.recipientMessages =  data;
      console.log("loaded")
      console.log( this.recipientMessages)


    });
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
