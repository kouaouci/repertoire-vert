import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ForumService } from 'src/app/services/forum/forum.service';
import { Category } from 'src/app/shared/category.model';
import { Post } from 'src/app/shared/Post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit, OnDestroy {

  postForm: FormGroup;

  categories: Category[];
  categorySub: Subscription;

  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private forumService: ForumService,
    private categoriesService: CategoriesService,
    public alertController: AlertController,
    public router: Router,
    public fb: FormBuilder,
    public toastController: ToastController) {
    this.postForm = this.fb.group({
      title: [null, Validators.required],
      category: [null, Validators.required],
      body: [null, Validators.required],
    });
  }

  ngOnInit() {
    // Get categories
    this.categories = this.categoriesService.getAllCategories();

    // Subscribe to category updates
    this.categorySub = this.categoriesService.getCategoriesUpdateListener().subscribe(categories => {
      this.categories = categories;
    });
  }

  ionViewWillEnter() {
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.categorySub.unsubscribe();
  }

  handleForm() {
    if (this.postForm.valid) {
      // Start spinner
      this.isLoading = true;

      // Get user id
      let userId = this.authService.getAuthenticatedUser().id;

      // New post
      let post: Post = {
        creator: userId,
        title: this.postForm.value.title.trim(),
        body: this.postForm.value.body.trim(),
        category: this.postForm.get('category').value
      };

      // Add post
      this.forumService.addPost(post);
      this.isLoading = false;
    }
  }
}
