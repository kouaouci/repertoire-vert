import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Post } from 'src/app/shared/Post.model';
import { PostComment } from 'src/app/shared/PostComment.model';
import { PostCommentLike } from 'src/app/shared/PostCommentLike.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  API_URL = environment.url + 'api/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService) { }


  getUserId() {
    // Return id of current connected user
    return localStorage.getItem('repVertId');
  }


  initializePosts() {
    this.http.get<any>(this.API_URL + 'posts').subscribe(
      response => {

        if (response.code === 200) {
          // Clear posts
          this.posts = [];

          // For each post, add creator username, then push to posts
          response.content.forEach(p => {
            let post: Post = p[0];
            post.nbComments = p.nbComments;
            this.posts.push(post);
          });

          //this.posts = response.content;
          this.postsUpdated.next([...this.posts]);
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  getPost(id: number): Post {
    return this.posts.find(post => {
      return post.id === id;
    });
  }


  getPostFromDB(id: number): Promise<Post> {
    return new Promise((resolve, reject) => {
      this.http.get<{ code: number, message: string, content: any }>
        (this.API_URL + 'posts/' + id).subscribe(
          response => {

            if (response.code === 200) {
              // Get post, add creator id and username
              let post: Post = response.content[0];
              resolve(post);
            }
          },
          error => {
            console.log(error);
            reject();
          }
        )
    });
  }


  getPostIndex(id: number): number {
    return this.posts.findIndex(post => {
      return post.id === id;
    });
  }


  getPosts(): Post[] {
    return [...this.posts];
  }


  getPostsUpdateListener() {
    // Return observable for components interested in cart changes
    return this.postsUpdated.asObservable();
  }


  addPost(post: Post): void {
    // Add new post to DB
    this.http.post<{ code: number, message: string, content: Post, username: string }>
      (this.API_URL + 'posts', post).subscribe(
        response => {
          if (response.code === 201) {

            // Get post and add creator
            let post = response.content;
            post.creator = this.authService.getAuthenticatedUser();

            // Add new post to posts
            this.posts.unshift(response.content);
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(['/tabs/home-forum']);
          } else {
            this.alertService.presentAlert("error", "errorOccurred");
          }
        },
        error => {
          this.alertService.presentAlert("error", "errorOccurred");
        }
      );
  }


  deletePost(postId: number): void {
    // Add new post to DB
    this.http.delete<{ code: number, message: string }>
      (this.API_URL + 'posts/' + postId).subscribe(
        response => {
          if (response.code === 200) {
            // Remove post from posts
            this.posts.splice(this.getPostIndex(postId), 1);
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(['/tabs/home-forum']);
          } else {
            this.alertService.presentAlert("error", "errorOccurred");
          }
        },
        error => {
          this.alertService.presentAlert("error", "errorOccurred");
        }
      );
  }


  getComments(postId: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      // Get post comments
      this.http.get<{ code: number, message: string, comments: any[] }>
        (this.API_URL + 'posts/' + postId + '/comments').subscribe(
          response => {

            if (response.code === 200) {
              let comments = [];

              response.comments.forEach(c => {
                let comment: PostComment = {
                  id: c[0].id,
                  creator: c.creatorId,
                  username: c.username,
                  createdAt: c[0].createdAt,
                  comment: c[0].comment,
                  postCommentLikes: c[0].postCommentLikes
                }
                comments.push(comment);
              });
              resolve(comments);
            } else {
              resolve([]);
            }
          },
          error => {
            console.log(error);
            reject();
          }
        )
    })
  }


  addComment(postComment: PostComment): Promise<PostComment> {

    return new Promise((resolve, reject) => {
      // Add comment to post
      this.http.post<{ code: number, message: string, commentId: number, username: string }>
        (this.API_URL + 'posts/' + postComment.post + '/comments', postComment).subscribe(
          response => {

            if (response.code === 201) {
              // Set new comment info
              postComment.id = response.commentId;
              postComment.username = response.username;
              postComment.createdAt = new Date();
              postComment.postCommentLikes = [];

              // Increment number of comments for this post
              if (this.posts[this.getPostIndex(postComment.post)] !== undefined) {
                this.posts[this.getPostIndex(postComment.post)].nbComments++;
                this.postsUpdated.next([...this.posts]);
              }
              resolve(postComment);
            } else {
              this.alertService.presentAlert("error", "errorOccurred");
              reject();
            }
          },
          error => {
            this.alertService.presentAlert("error", "errorOccurred");
            reject();
          }
        );
    });
  }


  deleteComment(commentId: number, postId: number): Promise<boolean> {

    return new Promise((resolve, reject) => {
      // Add comment to post
      this.http.delete<{ code: number, message: string }>
        (this.API_URL + 'posts/' + postId + '/comments/' + commentId).subscribe(
          response => {

            if (response.code === 200) {
              // Decrease number of comment for this post
              if (this.posts[this.getPostIndex(postId)] !== undefined) {
                this.posts[this.getPostIndex(postId)].nbComments--;
                this.postsUpdated.next([...this.posts]);
              }
              resolve(true);
            } else {
              this.alertService.presentAlert("error", "errorOccurred");
              resolve(false);
            }
          },
          error => {
            this.alertService.presentAlert("error", "errorOccurred");
            reject();
          }
        );
    });
  };


  getLikes(commentId: number, postId: number): Promise<PostCommentLike[]> {
    return new Promise((resolve, reject) => {
      this.http.get<{ code: number, message: string, likes: any }>
        (this.API_URL + 'posts/' + postId + '/comments/' + commentId + '/likes').subscribe(
          response => {
            if (response.code === 200) {
              let likes = [];
              response.likes.forEach(l => {
                let like: PostCommentLike = l[0];
                like.creator = l.creatorId;
                likes.push(like);
              });
              resolve(likes);
            }
          },
          error => {
            console.log(error);
            reject();
          }
        )
    });
  }


  likeOrDislikeComment(postCommentLike: PostCommentLike, postId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.post<{ code: number, message: string, likeId: number }>
        (this.API_URL + 'posts/' + postId + '/comments/' + postCommentLike.comment + '/likes', postCommentLike).subscribe(
          response => {
            if (response.code === 201) {
              resolve(response.likeId);
            } else {
              resolve(-1);
            }
          },
          error => {
            console.log(error);
            reject();
          }
        )
    });
  }


  unlikeOrUndislikeComment(postCommentLikeId: number, postCommentId: number, postId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.delete<{ code: number, message: string, likeId: number }>
        (this.API_URL + 'posts/' + postId + '/comments/' + postCommentId + '/likes/' + postCommentLikeId).subscribe(
          response => {
            if (response.code === 200) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          error => {
            console.log(error);
            reject();
          }
        )
    });
  }


  switchLikeOrDislike(postCommentLikeId: number, postCommentId: number, postId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.put<{ code: number, message: string }>
        (this.API_URL + 'posts/' + postId + '/comments/' + postCommentId + '/likes/' + postCommentLikeId, {}).subscribe(
          response => {
            if (response.code === 200) {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          error => {
            console.log(error);
            reject();
          }
        )
    });
  }
}
