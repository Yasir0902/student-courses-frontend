import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Student {
  id: number;
  name: string;
  courses: Course[];
}

export interface Course {
  id: number;
  name: string;
  students: Student[];
}

export interface StudentCourse {
  id: number;
  student: Student;
  course: Course;
}

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  getAllStudents(): Observable<Student[]> {
    return this.apollo.query<{ allStudents: Student[] }>({
      query: gql`
        query {
          allStudents {
            id
            name
            courses {
              id
              name
            }
          }
        }
      `
    }).pipe(
      map(result => {
        if (!result.data || !result.data.allStudents) {
          throw new Error('No students data returned');
        }
        return result.data.allStudents;
      })
    );
  }

  getAllCourses(): Observable<Course[]> {
    return this.apollo.query<{ allCourses: Course[] }>({
      query: gql`
        query {
          allCourses {
            id
            name
            students {
              id
              name
            }
          }
        }
      `
    }).pipe(
      map(result => {
        if (!result.data || !result.data.allCourses) {
          throw new Error('No courses data returned');
        }
        return result.data.allCourses;
      })
    );
  }

  addStudent(name: string): Observable<Student> {
    return this.apollo.mutate<{ addStudent: Student }>({
      mutation: gql`
        mutation($name: String!) {
          addStudent(name: $name) {
            id
            name
          }
        }
      `,
      variables: {
        name
      },
      refetchQueries: [{
        query: gql`
          query {
            allStudents {
              id
              name
              courses {
                id
                name
              }
            }
          }
        `
      }]
    }).pipe(
      map(result => {
        if (!result.data || !result.data.addStudent) {
          throw new Error('Failed to add student');
        }
        return result.data.addStudent;
      })
    );
  }

  addCourse(name: string): Observable<Course> {
    return this.apollo.mutate<{ addCourse: Course }>({
      mutation: gql`
        mutation($name: String!) {
          addCourse(name: $name) {
            id
            name
          }
        }
      `,
      variables: {
        name
      },
      refetchQueries: [{
        query: gql`
          query {
            allCourses {
              id
              name
              students {
                id
                name
              }
            }
          }
        `
      }]
    }).pipe(
      map(result => {
        if (!result.data || !result.data.addCourse) {
          throw new Error('Failed to add course');
        }
        return result.data.addCourse;
      })
    );
  }

  addStudentCourse(studentId: number, courseId: number): Observable<StudentCourse> {
    return this.apollo.mutate<{ addStudentCourse: StudentCourse }>({
      mutation: gql`
        mutation($studentId: ID!, $courseId: ID!) {
          addStudentCourse(studentId: $studentId, courseId: $courseId) {
            id
            student {
              id
              name
            }
            course {
              id
              name
            }
          }
        }
      `,
      variables: {
        studentId,
        courseId
      },
      refetchQueries: [{
        query: gql`
          query {
            allStudents {
              id
              name
              courses {
                id
                name
              }
            }
            allCourses {
              id
              name
              students {
                id
                name
              }
            }
          }
        `
      }]
    }).pipe(
      map(result => {
        if (!result.data || !result.data.addStudentCourse) {
          throw new Error('Failed to link student and course');
        }
        return result.data.addStudentCourse;
      })
    );
  }
}
