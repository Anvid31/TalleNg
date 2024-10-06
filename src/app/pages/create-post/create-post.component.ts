import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Post, PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  post: Post = {
    Id: '',
    title: '',
    content: '',
    image: '',
    categories: [],
  };
  newCategory = '';

  constructor(private postService: PostService, private router: Router) {}

  trackByCategory(index: number, category: string): string {
    return category;
  }

  addCategory() {
    if (this.newCategory.trim()) {
      this.post.categories.push(this.newCategory.trim());
      this.newCategory = '';
    }
  }

  removeCategory(category: string) {
    this.post.categories = this.post.categories.filter((c) => c !== category);
  }

  onSubmit() {
    // Verificación de la validez del formulario
    if (this.post.title && this.post.content) {
      this.postService.createPost(this.post).subscribe(
        (createdPost) => {
          console.log('Post creado:', createdPost);
          this.router.navigate(['/']); // envio al inicio después de crear el post
        },
        (error) => {
          console.error('Error al crear el post:', error);
        }
      );
    } else {
      console.error('Formulario no válido:', this.post);
    }
  }
}
