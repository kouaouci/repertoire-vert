import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/Post.model';

@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.scss']
})
export class ForumPostComponent implements OnInit {

  @Input() post: Post;

  // To style last post of list
  @Input() last: boolean; 

  // Number of comments
  nbComments: number = 0;

  // Date time
  date: any;
  time: any;

  constructor(public datepipe: DatePipe) { }

  ngOnInit() {
    this.date = this.datepipe.transform(this.post.createdAt, 'dd-MM-yyyy');
    this.time = this.datepipe.transform(this.post.createdAt, 'HH:mm');

    if (this.post.nbComments !== undefined) {
      this.nbComments = this.post.nbComments;
    }
  }

}
