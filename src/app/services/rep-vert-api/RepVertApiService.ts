import { PostLike } from './../../shared/PostLike.model';
import { PostComment } from './../../shared/PostComment.model';
import { Review } from './../../shared/Review.model';
import { Notification } from './../../shared/notification.model';
import { User } from './../../shared/user.model';
import { Participation } from './../../shared/participation.model';
import { Covoiturage } from './../../shared/Communauty.model';
import { Category } from './../../shared/category.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Report } from 'src/app/shared/Report.model';
import { Discussion } from 'src/app/shared/Discussion.model';
import { Post } from 'src/app/shared/Post.model';
import { PostCategory } from 'src/app/shared/PostCategory.model';
import { Cart } from 'src/app/shared/Cart.model';
import { Product } from 'src/app/shared/Product.model';
import { Order } from 'src/app/shared/Order.model';
import { ServiceOfferUser } from 'src/app/shared/ServiceOfferUser.model';
import { DiscussionQuote } from 'src/app/shared/DiscussionQuote.model';
import { ServiceOfferCategory } from 'src/app/shared/ServiceOffetCategory.model';
import { Activity } from 'src/app/shared/activity.model';



@Injectable({
  providedIn: 'root'
})
export class RepVertApiService {
  currentYear=new Date().getFullYear();
  currentMonth=new Date().getMonth();
  headers = new HttpHeaders().set('Content-Type', 'application/json');   base_url: string;
    base_url_local: string;
 base_url_local_api:string;
    url:string = 'https://www.repertoirevert.org/api/depense';
    urlTotalco2perweek:string = 'https://www.repertoirevert.org/api/co2emissionperweek';
    constructor(public http: HttpClient) {
        this.base_url = "https://symfony.repertoirevert.org/api/";	
        this.base_url_local = "https://www.repertoirevert.org/rest/";	
        this.base_url_local_api = "https://www.repertoirevert.org/api/";	
	      //this.base_url = "https://repertoirevert.org/api/";	
    }

    
    fetchAllProducts() {
	      return this.http.get(this.base_url_local + "product");
    };

    fetchProduct(id: any) {
	      return this.http.get(this.base_url + "product/" + id);
    };

    searchProductsByName(search: string) {
	      return this.http.get(this.base_url + "product/search/name/" + search.toLowerCase());
    };

    
    searchProductsByAddress(search: string) {
	      return this.http.get(this.base_url + "product/search/address/" + search.toLowerCase());
    };
    
    fetchAllProductsFromCompanyByName(name: string) {
	      return this.http.get(this.base_url + "product/fromcompany/name/" + name.toLowerCase());
    };
    
    fetchAllProductsFromCompany(id) {
	      return this.http.get(this.base_url_local + "product/fromcompany/id/" + id);
    };

    //
    // Méthodes pour les entreprises
    //
    
    fetchAllCompanies() {
	      return this.http.get(this.base_url_local + "company");
    };
    fetchallCompaniesProducts() {
      return this.http.get(this.base_url_local + "Companyproducts");
  };
    fetchCompany(id){
	      return this.http.get(this.base_url_local + "company/" + id);
    };
    
    searchCompaniesByName(search: string) {
	      return this.http.get(this.base_url + "company/search/name/" + search.toLowerCase());
    };

    searchCompaniesByAddress(search: string) {
	      return this.http.get(this.base_url + "company/search/address/" + search.toLowerCase());
    };

    searchCompaniesByNameAndByAddress(name: string, search: string) {
	      return this.http.get(this.base_url + "company/search/" + name + "/" + search.toLowerCase());
    };

    searchCompaniesByCategory(id: number) {
	      return this.http.get(this.base_url + "company/search/category/" + id);
    }

    searchCompaniesBySubcategoryName(name: string) {
	      return this.http.get(this.base_url + "company/search/subcategory/name/" + name.toLowerCase());
    }
    
    searchCompaniesBySubcategoryId(id: number) {
	      return this.http.get(this.base_url + "company/search/subcategory/id/" + id);
    }

    //
    // Méthodes pour les catégoriesanyrec
    //

    fetchAllCategories() {
	      return this.http.get(this.base_url_local + "category");
        /*.subscribe(res => {
          console.log(res);
        });*/
    }

    fetchCategoriesProducts(id:any) {
      return this.http.get(this.base_url_local + "productsByCategory/"+id);
  }
    fetchCategory(id) {
      return this.http.get<Category>(`${this.base_url_local+"category/"}${id}`);
      
    }

    fetchAllSubcategoryFromCategory(id: number) {
	      return this.http.get(this.base_url + "category/" + id + "/subcategory");
    }

    fetchSubcategoryFromCategory(idCat: number, idSub: number) {
	      return this.http.get(this.base_url + "category/" + idCat + "/subcategory/" + idSub);
    }


 //
    // Méthodes pour les communautés
    //
    getParticipationbyUser(id){
      return this.http.get(this.base_url_local + "getpartByUser/" + id);
  };
    handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }

    addCov(cov: Covoiturage): Observable<any> {
      const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
      return this.http.post<Covoiturage>(`${this.base_url_local_api}communauty`, cov, {headers:headers})
        .pipe(
          catchError(this.handleError<Covoiturage>('Added cov'))
        );
    }

    updateCov(cov: Covoiturage,id): Observable<any> {
      return this.http.put<Covoiturage>(`${this.base_url_local}updatecovoiturage/`+id, cov, {headers: this.headers})
        .pipe(
          catchError(this.handleError<Covoiturage>('Updated'))
        );
    }
    ParticipateCov(idcovoiturage:string, idparticipant:number){

    
    
      var res = JSON.stringify({ idcovoiturage: idcovoiturage, idparticipant: idparticipant});
    
      let params = res;
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(`${this.base_url_local}communauty/participate`, params, {headers: headers});
    }
  
    fetchCov(id){
      return this.http.get(this.base_url_local + "communauty/" + id);
  };
  fetchAllCovsByUser(id) {
    return this.http.get(this.base_url_local + "getcovByUser/" + id);
  };
    fetchCovParticipants(id) {
    return this.http.get(this.base_url_local + "covoiturage/" + id);
  };
fetchAllCovs() {
  return this.http.get(this.base_url_local + "communauty");
};
searchCsearchCovsByDate(departureDate: Date,destinationDate:Date) {
  return this.http.get(this.base_url + "communauty/search/bydate/" + departureDate.toISOString()+destinationDate.toISOString());
};
DeleteCov(id) {
  return this.http.delete(this.base_url_local + "deletecovoiturage/" + id);
};

searchCsearchCovsBydepDate(departureDate: Date) {
  return this.http.get(this.base_url + "communauty/search/bydepdate/" + departureDate.toISOString());
}
participateCov(cov:Covoiturage) {
  var res = JSON.stringify({ cov: cov });
  let params = res;
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
 // let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.post(this.base_url_local_api+"participerCov/"+cov, params, {headers: headers});
};
InviteAFriendteCov(friend:User,cov:Covoiturage) {
  var res = JSON.stringify({cov:cov, friend: friend });
  let params = res;

  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
 // let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.post(this.base_url_local_api+"inviteFriendCov/"+cov+"/"+friend, params, {headers: headers});
};
deleteCovParticipation(id:number) {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
   return this.http.delete(this.base_url_local_api + "deletecovParticipation/" + id,{headers:headers});
 }
 updateNbPlace(id:any) {
  var res = JSON.stringify({ id: id });
  let params = res;
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
 // let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.put(this.base_url_local_api+"updateGroupSize/"+id, params, {headers: headers});
}

 AcceptCovParticipation(id:number) {
  var res = JSON.stringify({ id: id });
  let params = res;
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
 // let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.put(this.base_url_local_api+"acceptCovParticipation/"+id, params, {headers: headers});
 }

 getInviCovbyParticipant(id) {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api + "getInvitCovByParticipant/" + id,{headers:headers});
};
//depense co2
send(steps:number, calories:number, distance:number,geo:string,co2:number,transporttype:string,reason:string){
    var res = JSON.stringify({ steps: steps, calories: calories,distance:distance, geo:geo,co2:co2,transporttype:transporttype,reason:reason });

    let params = res;
    const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    return this.http.post(this.url, params, {headers: headers});
  }

  calculateco2EmissionPerWeek(totalco2:number){
    var res = JSON.stringify({ totalco2: totalco2});
    let params = res;
    const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    return this.http.post(this.urlTotalco2perweek, params, {headers: headers});
  }
  getTotalco2EmissonPerweekByUser() {
    const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    return this.http.get(this.base_url_local_api + "getTotalco2perweekbyUser", {headers:headers});
  };
  updateCovPrivacy(dep: Activity,id): Observable<any> {
    const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    return this.http.put<Activity>(`${this.base_url_local_api}updatecovPrivacy/`+id, dep, {headers:headers})
      .pipe(
        catchError(this.handleError<Activity>('Updated'))
      );
  }
    fetchDepenseDetails(id) {
    return this.http.get(this.base_url_local + "getdepensedetails/" + id);
  };

  fetchAllDepense() {
    return this.http.get(this.base_url_local + "getdepense");
  };

  fetchDepenseByMonth(id) {
    const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    return this.http.get(this.base_url_local_api + "depense/getpermonth/"+this.currentYear+"/"+this.currentMonth+"/"+id,{headers: headers});
  };
  fetchDepenseByWeek(id) {
    const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    return this.http.get(this.base_url_local_api + "depense/getperWeek/"+id,{headers: headers});
  };
  fetchDepByUser(id) {
    const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    return this.http.get(this.base_url_local_api + "getdepbyuser/"+id,{headers: headers});
  };
  //Social network
  fetchUsers() {
    const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    return this.http.get(this.base_url_local_api + "getUsers",{headers: headers});
  };
fetchUserProfileWithFriends(id){

    return this.http.get(this.base_url_local+ "userprofile/"+id);
}
fetchUserProfileWithFriendsList(id){

  return this.http.get(this.base_url_local+ "getFriendsList/"+id);
}
fetchUserDetails(id){

  return this.http.get(this.base_url_local+ "getuserdetails/"+id);
}

fetchFriendsRequestsbyUser(id){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "getFriendsRequests/"+id,{headers: headers});
}
  sendFriendRequest(friend:User) {
    var res = JSON.stringify({ friend: friend });
    let params = res;

    const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
   // let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(this.base_url_local_api+"addFriend/"+friend, params, {headers: headers});
  };

  acceptFriendRequest(friend:User) { 
    var res = JSON.stringify({ friend: friend });
    let params = res;
    const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
   // let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.put(this.base_url_local_api+"acceptFriend/"+friend, params, {headers: headers});
  }
  //Notifications
 
sendNotification(friend:User,content:string,url:string) {
  var res = JSON.stringify({content:content, friend: friend,url:url });
  let params = res;

  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
 // let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.post(this.base_url_local_api+"addNotificationAfterParticipation/"+friend, params, {headers: headers});
};


sendNotificationafterRefusing(friend:User,content:string,url:string) {
  var res = JSON.stringify({content:content, friend: friend,url:url });
  let params = res;

  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
 // let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.post(this.base_url_local_api+"sendNotifAfterRefuse/"+friend, params, {headers: headers});
};
getNotificationByUser(id) {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api + "getNotifByUser/"+id,{headers: headers});
};

UpdateNotificationStatus(id:number) {
 var res = JSON.stringify({ id: id });
  let params = res;
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
 // let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.put(this.base_url_local_api+"updateNotifStatus/"+id, params, {headers: headers});
}


//ActivitiesDisplay

getActivitiesDisplay(id) {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api + "getActivitiesDisplay/"+id,{headers: headers});
}
UpdateActivitiesDisplay(id:number) {
  var res = JSON.stringify({ id: id });
   let params = res;
   const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  // let headers = new HttpHeaders().set('Content-Type','application/json');
   return this.http.put(this.base_url_local_api+"updateActivityDisplayStatus/"+id, params, {headers: headers});
 }

 addActivityDisplay(test) {
  var res = JSON.stringify({test:test });
  let params = res;
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.post(this.base_url_local_api+"addActivityDisplay",params, {headers: headers});
 }


 updateUserStatus(id:string) {
  var res = JSON.stringify({ id: id });
   let params = res;
   const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  //let headers = new HttpHeaders().set('Content-Type','application/json');
   return this.http.put(this.base_url_local_api+"UpdateUserStatus/"+id, params, {headers: headers});
 }
 fetchConnectedUsers(id){
  return this.http.get(this.base_url_local+ "getConnectedFriends/"+id);
}



//Star rating
getUserRating(id){
  return this.http.get(this.base_url_local+ "calculateAvgReviews/"+id);
}

RateUser(owner: User, rate:Review): Observable<any> {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.post<Review>(`${this.base_url_local_api}RateUser/`+owner,rate, {headers:headers})
    .pipe(
      catchError(this.handleError<Review>('RateUser cov'))
    );
}

//author
ReportUser(owner: User, report:Report): Observable<any> {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.post<Review>(`${this.base_url_local_api}ReportUser/`+owner,report, {headers:headers})
    .pipe(
      catchError(this.handleError<Review>('RateUser co'))
    );
}
getReportsByUser(id){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "getReportsByUser/"+id, {headers:headers});
}
getReportedByUser(id){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "getReportedByUser/"+id, {headers:headers});
}
//discussion 
SendMessagetoUser(recipient: User, discussion:Discussion): Observable<any> {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.post<Review>(`${this.base_url_local_api}sendMessage/`+recipient,discussion, {headers:headers})
    .pipe(
      catchError(this.handleError<Review>('Message not sent'))
    );
}

getDiscussionBetweenUsers(id:User, recipient:User){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "getDiscussionByUser/"+id+"/"+recipient, {headers:headers});
}
getDiscussionBetweenUsersv2(id:User){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "getMessageByRecipient/"+id, {headers:headers});
}

//Forum

addPostToForum(idCat:PostCategory,post: Post): Observable<any> {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.post<Covoiturage>(`${this.base_url_local_api}addPost/`+idCat, post, {headers:headers})
    .pipe(
      catchError(this.handleError<Covoiturage>('Added Post failed'))
    );
}
getForumPosts(){
  return this.http.get(this.base_url_local+ "forumPosts");
}
getForumCats(){
  return this.http.get(this.base_url_local+ "getCatsForum");
}
getOnePost(id){
  return this.http.get(this.base_url_local+ "getOnePost/"+id);
}
getCommentsbyPost(id){
  return this.http.get(this.base_url_local+ "getCommentsByPost/"+id);
}
getLikesByPost(id){
  return this.http.get(this.base_url_local+ "getLikesByPost/"+id);
}
addCommentToPost(idPost:string,comment: PostComment): Observable<any> {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.post<PostComment>(`${this.base_url_local_api}addCommentToPost/`+idPost, comment, {headers:headers})
    .pipe(
      catchError(this.handleError<PostComment>('Added Post failed'))
    );
}
addLikeToPost(idPost:string): Observable<any> {
  
  var res = JSON.stringify({ idPost: idPost });
 // alert("json sent: " + res);
  let params = res;

  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
 // let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.post(this.base_url_local_api+"addLikeToPost/"+idPost, params, {headers: headers});
}
getPostByVat(id){
  return this.http.get(this.base_url_local+ "postByCat/"+id);
}

//shop
getShopProducts(){
  return this.http.get(this.base_url_local+ "shopProducts");
}

addProductByCompany(product:any,idCat:any,idComp:any): Observable<any> {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.post<Product>(`${this.base_url_local_api}addProductCompany/`+idCat+"/"+idComp,product, {headers:headers})
    .pipe(
      catchError(this.handleError<Product>('Product added successfully'))
    );
}

addProductToCart(idProd:string) {
 // alert("Product: "+idProd+"User");

  var res = JSON.stringify({ idProd: idProd });
 // alert("json sent: " + res);
  let params = res;

  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
 // let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.post(this.base_url_local_api+"addProductToCart/"+idProd, params, {headers: headers});
}
getCartByUser(id){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "getCartByUser/"+id, {headers:headers});
}
getCompanyProducts(id){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "productsByCompany/"+id, {headers:headers});
}
deleteProductFromCompany( id:any): Observable<any> {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.delete<Product>(`${this.base_url_local_api}deleteFromCart/`+id, {headers:headers})
    .pipe(
      catchError(this.handleError<Cart>('Faild deleting item'))
    );
}
 addOrder(order: Order): Observable<any> {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.post<Covoiturage>(`${this.base_url_local_api}addOrder`, order, {headers:headers})
    .pipe(
      catchError(this.handleError<Covoiturage>('Added Post failed'))
    );
}
getOrdersbyUser(){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "userorders", {headers:headers});
}
getSingleProduct(id){
  return this.http.get(this.base_url_local+ "getOneProduct/"+id);
}

deleteFromCart( id:any): Observable<any> {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.delete<Cart>(`${this.base_url_local_api}deleteFromCart/`+id, {headers:headers})
    .pipe(
      catchError(this.handleError<Cart>('Faild deleting item'))
    );
}

//Favorite

addProductToFavoriteList(idProduct:string): Observable<any> {
  
  var res = JSON.stringify({ idProduct: idProduct });
 // alert("json sent: " + res);
  let params = res;

  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
 // let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.post(this.base_url_local_api+"addProductToFavorite/"+idProduct, params, {headers: headers});
}
addCompanyToFavoriteList(idCompany:string): Observable<any> {
  var res = JSON.stringify({ idCompany: idCompany });
 // alert("json sent: " + res);
  let params = res;

  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
 // let headers = new HttpHeaders().set('Content-Type','application/json');
  return this.http.post(this.base_url_local_api+"addCompanyToFavorite/"+idCompany, params, {headers: headers});
}
getFavoriteCompaniessByUser(id){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "getFavoritecompaniesByUser/"+id,{headers: headers});
}

getFavoriteProductsByUser(id){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "getFavoriteProductsByUser/"+id,{headers: headers});
}


//services

getServicesOffersFromCompanies(){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "GetAllservices",{headers: headers});
}

getServicesOffersFromCompaniesDetail(id){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "getServicesDetails/"+id,{headers: headers});
}
getDevisCostfromCompany(idCompany:string,idUser:string, serviceofferuser:ServiceOfferUser): Observable<any> {
  
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.post<ServiceOfferUser>(this.base_url_local_api+"getServiceCostDevis/"+idCompany+"/"+idUser, serviceofferuser, {headers:headers})
    .pipe(
      catchError(this.handleError<ServiceOfferUser>('Added Service cost failed'))
    );
}
getServicesCats(){
  return this.http.get(this.base_url_local+ "getCatsServices");
}
getServicesByCats(id){
  return this.http.get(this.base_url_local+ "offerByCategory/"+id);
}

getQuotesFromUsersByCompany(id){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "getQuotesByCompany/"+id,{headers: headers});
}
getQuoteDetails(id){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "getQuoteDetails/"+id,{headers: headers});
}
sendQuestion(recipient: User, question:DiscussionQuote,service:ServiceOfferUser): Observable<any> {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.post<DiscussionQuote>(`${this.base_url_local_api}sendQUestion/`+recipient+"/"+service,question, {headers:headers})
    .pipe(
      catchError(this.handleError<DiscussionQuote>('Message not sent'))
    );
}



getDiscussionQuote(id:string, user:User){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "getDiscussionQuote/"+id+"/"+user, {headers:headers});
}

getDiscussionQuoteRec(id:string, user:User){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "getDiscussionQuoteByRec/"+user+"/"+id, {headers:headers});
}

getQuoteDemandByUser(user:User){
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.get(this.base_url_local_api+ "quotedemandbyUser/"+user, {headers:headers});
}


addServiceByCompany(service:any,idCat:any): Observable<any> {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.post<DiscussionQuote>(`${this.base_url_local_api}addService/`+idCat,service, {headers:headers})
    .pipe(
      catchError(this.handleError<DiscussionQuote>('Service added successfully'))
    );
}

getOfferedServicesByCompany(id:any){
  return this.http.get(this.base_url_local+ "getOfferedServicesByCompany/"+id);
}
addServiceCategory(category:ServiceOfferCategory): Observable<any> {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.post<ServiceOfferCategory>(`${this.base_url_local_api}addCategoryForService`,category, {headers:headers})
    .pipe(
      catchError(this.handleError<ServiceOfferCategory>('Categorie Created '))
    );
}


getCategoriesByCompany(id:any){

  return this.http.get(this.base_url_local+ "getCategoriesByCompany/"+id);
}

deleteCategoryService(id) {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.delete(this.base_url_local_api + "deleteCategoryService/" + id);
}

deleteServicebyComp(id) {
  const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
  return this.http.delete(this.base_url_local_api + "deleteServiceByComp/" + id,{headers:headers});
}



}
