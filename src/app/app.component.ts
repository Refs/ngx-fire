import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Post } from './state/posts/post.model';
import * as PostActions from './state/posts/post.actions';

interface AppState {
  post: Post;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  post$: Observable<Post>;

  post: Post;

  text: string;

  private tagStateSubscription: Subscription;

  constructor(private store: Store<AppState>) {
    this.post$ = this.store.pipe(
      select('post')
    );
  }

  ngOnInit() {
    this.tagStateSubscription = this.post$.subscribe(
      (state) => {
        this.post = state;
      }
    );
  }

  ngOnDestroy() {
    this.tagStateSubscription.unsubscribe();
  }

  editText() {
    this.store.dispatch(new PostActions.EditText(this.text) );
  }

  resetPost() {
    this.store.dispatch(new PostActions.Reset());
  }

  upvote() {
    this.store.dispatch(new PostActions.Upvote());
  }

  downvote() {
    this.store.dispatch(new PostActions.Downvote());
  }
}


