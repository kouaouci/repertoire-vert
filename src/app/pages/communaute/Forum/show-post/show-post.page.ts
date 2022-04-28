import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AlertController, IonContent, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ForumService } from 'src/app/services/forum/forum.service';
import { Post } from 'src/app/shared/Post.model';
import { DatePipe } from '@angular/common';
import { KebabMenuComponent } from 'src/app/components/kebab-menu/kebab-menu.component';
import { PostComment } from 'src/app/shared/PostComment.model';
import { ReportModalComponent } from 'src/app/components/report-modal/report-modal.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/shared/user.model';
import { AlertService } from 'src/app/services/alerts/alert.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.page.html',
  styleUrls: ['./show-post.page.scss'],
})
export class ShowPostPage implements OnInit {

  @ViewChild('content') private content: IonContent;

  post: Post;

  replyText: string = '';

  comments: PostComment[] = [];
  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required),
  });

  // Date time
  date: any;
  time: any;

  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private forumService: ForumService,
    public datepipe: DatePipe,
    public popoverController: PopoverController,
    public alertController: AlertController,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private alertService: AlertService,
    public fb: FormBuilder,
    public toastController: ToastController) {
  }

  ngOnInit() {
    // Get post details from DB
    this.getPostInfo();
  }


  ionViewDidEnter() { }


  getPostInfo() {
    // Post id
    const id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.forumService.getPostFromDB(id).then(result => {
      this.post = result;
      this.getDateInfo();
    })
  }


  getDateInfo() {
    // Date time information
    this.date = this.datepipe.transform(this.post.createdAt, 'dd-MM-yyyy');
    this.time = this.datepipe.transform(this.post.createdAt, 'HH:mm');
  }

  addComment(valid: boolean) {

    let userId = this.authService.getAuthenticatedUser().id;

    if (valid) {
      let postComment: PostComment = {
        post: this.post.id,
        creator: userId
      };

      // Set comment content and reply to comment, if any
      postComment.comment = this.replyText + this.commentForm.value.comment;
      
      // Add comment to DB
      this.forumService.addComment(postComment).then( newComment => {
        if (newComment) {

          // Set creator for new comment
          newComment.creator = this.authService.getAuthenticatedUser();

          // Add new comment to post comments
          this.post.comments.push(newComment);

          // Reset form input and reply text, if any
          this.commentForm.controls['comment'].setValue('');
          this.replyText = '';
        }
      });
    }
  }


  deleteComment(id: number) {

    // Find comment and remove from comments
    let index = this.post.comments.findIndex(comment => {
      return comment.id === id;
    });

    this.post.comments.splice(index, 1);
  }


  replyComment(comment: PostComment) {
    let commentCreator = comment.creator as User;
    let str: string = "Réponse à @" + commentCreator.username + "\n";
    str += "\n" + '"' + comment.comment + '"\n\n';
    str += "--------------------------------\n\n";
    this.replyText = str;
    this.content.scrollToBottom(200);
  }


  reportPost() {
    //this.presentReportModal();
  }


  deletePost() {
    const userId = this.authService.getAuthenticatedUser().id;
    if (this.post.creator.id === userId) {
      this.forumService.deletePost(this.post.id);
    }
  }


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: KebabMenuComponent,
      componentProps: {
        creatorId: this.post.creator.id,
        report: () => { 
          this.presentReportModal();
          popover.dismiss();
        },
        delete: () => {
          this.alertService.presentAlertConfirm(
            "confirmation",
            "deletePostConfirm",
            () => { this.deletePost(); }
          );
          popover.dismiss();
        }
      },
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }


  async presentReportModal() {
    const modal = await this.modalController.create({
      component: ReportModalComponent,
      componentProps: {
        entity: 'post',
        entityId: this.post.id,
        close: () => {
          this.modalController.dismiss();
        }
      },
      cssClass: 'custom-modal'
    });
    return await modal.present();
  }
}
