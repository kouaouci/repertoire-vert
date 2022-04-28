import { DiscussionChatPage } from './../discussion-chat/discussion-chat.page';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  users:any;
  profile:any;
  profilee:any;
  idFriend;
  buttonText="Ajouter"
  friends:any;
   counter = 0;
  friendId:any;
  userId:any;
   ids = [];
   x:any;
   userInformations:any = []; 
   @Input() isAccepted: boolean;
   filterTerm: string;
    constructor( private repVertAPI: RepVertApiService,public alertController: AlertController,
      public toastController: ToastController,private authProvider:AuthService,
      public modalController: ModalController,public loadingController: LoadingController) { }
  
    ngOnInit() {

      
      
    }
    ionViewDidEnter(){
      this.presentLoading()
    }
    async presentLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration: 3000
      });
      await loading.present();
      this.getConnectedFriends()
      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
    }
  getConnectedFriends(){
     this.authProvider.profile().subscribe(data =>{
      // console.log('detalles: ',result);
      this.userInformations =  data;
      console.log("loaded")
      console.log( this.userInformations);
      console.log( this.userInformations.id);
      localStorage.setItem('userid', this.userInformations.id );
     // let id= localStorage.getItem('userid');
      this.repVertAPI.fetchConnectedUsers(this.userInformations.id).subscribe(data =>{  
        this.friends =data;
        console.log('Friends: ',data); 
  
        for( this.x = 0; this.x < this.friends.length; this.x++) {
          
          this.friendId  = this.friends[this.x].friend.id;
          this.userId  = this.friends[this.x].user.id;
          console.log("IDs"+this.friendId);
          console.log("IDUSER"+this.userId);
      }
      
   
        console.log('FriendsID: ',data);
      });
      this.getFriends()
      this.getFriendss()
    });
  
  }
    doRefresh(event) {
      this.getConnectedFriends();
  
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 1000);
    }
  
    async openChatDiscussion(id,username) {
     const modal = await this.modalController.create({
    component: DiscussionChatPage,
    cssClass: 'my-custom-class',
    animated:true,
    showBackdrop:true,
    swipeToClose: true,
    componentProps: {
      'id': id,
      'username': username
    
    }
  });
  return await modal.present();
  
  }
  
  getFriends(){
    
    this.repVertAPI.fetchUserProfileWithFriends(this.userInformations.id).subscribe(data =>{  
      this.profile =data;
      console.log('UserProfile: ',data);
    
    });
  }
  getFriendss(){
    
    this.repVertAPI.fetchUserProfileWithFriendsList(this.userInformations.id).subscribe(data =>{  
      this.profilee =data;
      console.log('UserProfile: ',data);
    
    });
  }
}