import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { GraphqlService, Student, Course, StudentCourse } from '../../services/graphql.service';

@Component({
  selector: 'app-link-student-course',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './link-student-course.component.html',
  styleUrls: ['./link-student-course.component.css']
})
export class LinkStudentCourseComponent implements OnInit {
  students: Student[] = [];
  courses: Course[] = [];
  selectedStudentId: number | null = null;
  selectedCourseId: number | null = null;

  constructor(private graphqlService: GraphqlService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.graphqlService.getAllStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
      },
      error: (err: any) => {
        this.snackBar.open(`Error fetching students: ${err.message}`, 'Close', { duration: 3000, panelClass: ['snack-bar-error'] });
      }
    });

    this.graphqlService.getAllCourses().subscribe({
      next: (data: Course[]) => {
        this.courses = data;
      },
      error: (err: any) => {
        this.snackBar.open(`Error fetching courses: ${err.message}`, 'Close', { duration: 3000, panelClass: ['snack-bar-error'] });
      }
    });
  }

  linkStudentCourse(): void {
    if (this.selectedStudentId === null || this.selectedCourseId === null) {
      this.snackBar.open('Please select both a student and a course.', 'Close', { duration: 3000, panelClass: ['snack-bar-error'] });
      return;
    }

    this.graphqlService.addStudentCourse(this.selectedStudentId, this.selectedCourseId).subscribe({
      next: (link: StudentCourse) => {
        this.snackBar.open(`Linked "${link.student.name}" to "${link.course.name}" successfully.`, 'Close', { duration: 3000, panelClass: ['snack-bar-success'] });
        this.selectedStudentId = null;
        this.selectedCourseId = null;
      },
      error: (err: any) => {
        this.snackBar.open(`Error: ${err.message}`, 'Close', { duration: 3000, panelClass: ['snack-bar-error'] });
      }
    });
  }
}
