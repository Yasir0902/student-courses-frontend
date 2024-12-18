import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { GraphqlService, Course } from '../../services/graphql.service';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  name: string = '';

  constructor(private graphqlService: GraphqlService, private snackBar: MatSnackBar) {}

  addCourse(): void {
    if (this.name.trim() === '') {
      this.snackBar.open('Name cannot be empty.', 'Close', { duration: 3000, panelClass: ['snack-bar-error'] });
      return;
    }

    this.graphqlService.addCourse(this.name).subscribe({
      next: (course: Course) => {
        this.snackBar.open(`Course "${course.name}" added successfully with ID ${course.id}.`, 'Close', { duration: 3000, panelClass: ['snack-bar-success'] });
        this.name = '';
      },
      error: (err: any) => {
        this.snackBar.open(`Error: ${err.message}`, 'Close', { duration: 3000, panelClass: ['snack-bar-error'] });
      }
    });
  }
}