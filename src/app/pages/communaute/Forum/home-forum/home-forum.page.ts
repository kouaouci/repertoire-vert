import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { Post } from 'src/app/shared/Post.model';
import { ForumService } from 'src/app/services/forum/forum.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home-forum',
  templateUrl: './home-forum.page.html',
  styleUrls: ['./home-forum.page.scss'],
})
export class HomeForumPage implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  filterTerm: string;

  isLoggedIn: boolean;
  authListenerSubs: Subscription;

  posts: Post[] = [];
  postSub: Subscription;

  currentPage = 1;
  postsDisplayed = [];
  showButton = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private forumService: ForumService,
    public loadingController: LoadingController) { }


  ngOnInit() {

    // Vérifier si connecté
    this.isLoggedIn = this.authService.getIsAuth();

    // Ajouter un listener sur le statut de l'authentification
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      });

    // Initialize posts
    this.forumService.initializePosts();

    // Subscribe to posts updates
    this.postSub = this.forumService.getPostsUpdateListener().subscribe(posts => {
      this.posts = posts;
    });
  }


  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }


  handleSearch(search: string) {
    this.currentPage = 1;
    this.postsDisplayed = this.posts;
    this.filterTerm = search;
    this.showButton = false;
  }

  doRefresh(event) {
    this.forumService.initializePosts();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
