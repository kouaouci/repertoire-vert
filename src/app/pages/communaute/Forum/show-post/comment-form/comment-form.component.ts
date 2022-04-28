import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumService } from 'src/app/services/forum/forum.service';
import { PostComment } from 'src/app/shared/PostComment.model';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  @Output() newCommentEvent = new EventEmitter<boolean>();

  @Input() postId: number;
  @Input() commentForm: FormGroup;

  constructor(
    private forumService: ForumService
  ) { }

  ngOnInit() {
  }
  
  handleSubmit() {
    if (this.commentForm.valid) {
      this.newCommentEvent.emit(true);
    } else {
      this.newCommentEvent.emit(false);
    }
  }
}
