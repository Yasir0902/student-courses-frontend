import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { GraphqlService, Student } from '../../services/graphql.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  name: string = '';

  constructor(private graphqlService: GraphqlService, private snackBar: MatSnackBar) {}

  addStudent(): void {
    if (this.name.trim() === '') {
      this.snackBar.open('Name cannot be empty.', 'Close', { duration: 3000, panelClass: ['snack-bar-error'] });
      return;
    }

    this.graphqlService.addStudent(this.name).subscribe({
      next: (student: Student) => {
        this.snackBar.open(`Student "${student.name}" added successfully with ID ${student.id}.`, 'Close', { duration: 3000, panelClass: ['snack-bar-success'] });
        this.name = '';
      },
      error: (err: any) => {
        this.snackBar.open(`Error: ${err.message}`, 'Close', { duration: 3000, panelClass: ['snack-bar-error'] });
      }
    });
  }
}
