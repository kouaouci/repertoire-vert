import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';
@Component({
  selector: 'app-company-catgories',
  templateUrl: './company-catgories.page.html',
  styleUrls: ['./company-catgories.page.scss'],
})
export class CompanyCatgoriesPage implements OnInit {
  userInformations:any = []; 
  companyId:any;
  categories:any;
  filterTerm: string; 
  slideOptions = {
    direction: 'vertical',
  };
  constructor(public auth:AuthService,private repVertAPI:RepVertApiService,public toastController: ToastController) { }

  ngOnInit() {
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
      this.companyId=this.userInformations.id
      this.PopulatCats()
    
    });
    
 
  }
  PopulatCats(){
    this.repVertAPI.getCategoriesByCompany(this.companyId).subscribe(data =>{  
      this.categories =data;
      console.log('categories from this company: ',this.categories);
  
     
     // this.idparticipant=  localStorage.getItem('idparticipant');
    });
    
  }
  deleteCategory(id) {
    this.repVertAPI.deleteCategoryService(id).subscribe(data=>{
      this.presentToast()
      console.log(data)
    })
    this.PopulatCats()
  }
   async presentToast() {
    const toast = await this.toastController.create({
      message: 'Catégorie supprimée.',
      duration: 2000
    });
    toast.present();
  }
}
