import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { LinkStudentCourseComponent } from './components/link-student-course/link-student-course.component';

export const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentListComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'link', component: LinkStudentCourseComponent },
  { path: '**', redirectTo: '/students' }
];
