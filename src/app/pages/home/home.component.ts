import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Post, PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  posts: Post[] = [];
post: any;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe(
      (posts) => {
        this.posts = posts;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  trackByPostTitle(index: number, post: Post): string {
    return post.title;
  }

  trackByCategory(index: number, category: string): string {
    return category;
  }
}
