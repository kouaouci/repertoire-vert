import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { KebabMenuComponent } from 'src/app/components/kebab-menu/kebab-menu.component';
import { ReportModalComponent } from 'src/app/components/report-modal/report-modal.component';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ForumService } from 'src/app/services/forum/forum.service';
import { PostComment } from 'src/app/shared/PostComment.model';
import { PostCommentLike } from 'src/app/shared/PostCommentLike.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit, OnChanges {

  @Output() replyEvent = new EventEmitter<PostComment>();
  @Output() deleteEvent = new EventEmitter<number>();

  @Input() comment: PostComment;

  postId: number;

  creator: User;

  liked: boolean = false;
  disliked: boolean = false;

  nbLikes: number = 0;
  nbDislikes: number = 0;

  // Date time
  date: any;
  time: any;

  constructor(
    private authService: AuthService,
    public datepipe: DatePipe,
    private forumService: ForumService,
    private route: ActivatedRoute,
    public alertService: AlertService,
    public modalController: ModalController,
    public popoverController: PopoverController,) { }


  ngOnInit() {
    // Date time information
    this.date = this.datepipe.transform(this.comment?.createdAt, 'dd-MM-yyyy');
    this.time = this.datepipe.transform(this.comment?.createdAt, 'HH:mm');

    // Get post id
    this.postId = parseInt(this.route.snapshot.paramMap.get('id'));

    // Get number of likes and dislikes
    this.comment.postCommentLikes.forEach(like => {
      if (like.type === 'like') {
        this.nbLikes++;
      } else {
        this.nbDislikes++;
      }
    })

    // Check if user liked or disliked comment already
    let index = this.comment.postCommentLikes.findIndex(like => {
      let creator = like.creator as User;
      return creator.id === this.getUserId();
    });

    if (index !== -1) {
      if (this.comment.postCommentLikes[index].type === 'like') {
        this.liked = true;
      } else {
        this.disliked = true;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.comment) {
      this.creator = this.comment.creator as User;
    }
  }

  getUserId() {
    return this.authService.getAuthenticatedUser().id;
  }


  handleClick(type: string) {
    if (type === 'like') {
      
      if (this.liked) {
        // Unlike comment
        this.unlikeOrUndislikeComment('like');
      } else if (this.disliked) {
        // Switch dislike to like
        this.switchLikeOrDislike('like');
      }
      else {
        // Like comment
        this.likeOrDislikeComment('like');
      }
    } else {
      if (this.disliked) {
        // Undislike comment
        this.unlikeOrUndislikeComment('dislike');
      } else if (this.liked) {
        // Switch like to dislike
        this.switchLikeOrDislike('dislike');
      }
      else {
        // Dislike comment
        this.likeOrDislikeComment('dislike');
      }
    }
  }


  handleReply() {
    this.replyEvent.emit(this.comment);
  }


  deleteComment() {
    const userId = this.authService.getAuthenticatedUser().id;

    if (this.creator.id === userId) {
      this.forumService.deleteComment(this.comment.id, this.postId).then(result => {
        if (result) {
          this.deleteEvent.emit(this.comment.id);
        }
      });
    }
  }


  likeOrDislikeComment(type: string) {
    let postCommentLike: PostCommentLike = {
      creator: this.getUserId(),
      comment: this.comment.id,
      type: type
    }
    
    this.forumService.likeOrDislikeComment(postCommentLike, this.postId).then(
      result => {
        if (result === -1) {
          this.alertService.presentAlert("error", "errorOccurred");
        } else {
          postCommentLike.id = result;
          postCommentLike.creator = {
            id: this.getUserId()
          }
          this.comment.postCommentLikes.push(postCommentLike);

          // Set liked or disliked to true and update counters
          if (type === 'like') {
            this.liked = true;
            this.nbLikes++;
          } else {
            this.disliked = true;
            this.nbDislikes++;
          }
        }
      }
    ).catch(error => {
      this.alertService.presentAlert("error", "errorOccurred");
    });
  }


  unlikeOrUndislikeComment(type: string) {
    // Get Post comment like index
    const index = this.comment.postCommentLikes.findIndex(like => {
      let creator = like.creator as User;
      return creator.id === this.getUserId();
    });
    if (index !== -1) {
      this.forumService.unlikeOrUndislikeComment(this.comment.postCommentLikes[index].id, this.comment.id, this.postId).then(
        result => {
          
          if (result) {
            // Remove like or dislike from comment likes
            this.comment.postCommentLikes.splice(index, 1);

            // Set liked or disliked to false and update counters
            if (type === 'like') {
              this.liked = false;
              this.nbLikes--;
            } else {
              this.disliked = false;
              this.nbDislikes--;
            }
          } else {
            this.alertService.presentAlert("error", "errorOccurred");
          }
        }
      ).catch(error => {
        this.alertService.presentAlert("error", "errorOccurred");
      })
    }
  }


  switchLikeOrDislike (type: string) {
    // Get Post comment like index
    const index = this.comment.postCommentLikes.findIndex(like => {
      let creator = like.creator as User;
      return creator.id === this.getUserId();
    });

    if (index !== -1) {
      this.forumService.switchLikeOrDislike(this.comment.postCommentLikes[index].id, this.comment.id, this.postId).then(
        result => {
          
          if (result) {
            // Set liked or disliked to false and update counters
            if (type === 'like') {
              this.liked = true;
              this.disliked = false;
              this.nbLikes++;
              this.nbDislikes--;
            } else {
              this.disliked = true;
              this.liked = false;
              this.nbDislikes++;
              this.nbLikes--;
            }
          } else {
            this.alertService.presentAlert("error", "errorOccurred");
          }
        }
      ).catch(error => {
        this.alertService.presentAlert("error", "errorOccurred");
      })
    }
  }


  async presentPopover(ev: any) {

    let creator = this.comment.creator as User;

    const popover = await this.popoverController.create({
      component: KebabMenuComponent,
      componentProps: {
        creatorId: creator.id,
        report: () => { 
          this.presentReportModal();
          popover.dismiss();
        },
        delete: () => {
          this.alertService.presentAlertConfirm(
            "confirmation", 
            "deleteCommentConfirm", 
            () => {this.deleteComment()
          });
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
        entity: 'comment',
        entityId: this.comment.id,
        close: () => {
          this.modalController.dismiss();
        }
      },
      cssClass: 'report-modal'
    });
    return await modal.present();
  }
}
