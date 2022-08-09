import { observable, action, makeObservable } from "mobx";
import {
  IStudent,
  IExchangeStudent,
  studentData,
} from './datasets/students';


class StudentStore {
  students = studentData;

  updateStudent (data: IStudent) {

  }

  deleteStudent (studentId: number) {

  }

  constructor() {
    makeObservable(this, {
      students: observable,
      updateStudent: action,
      deleteStudent: action,
    });
  }
}

export default StudentStore;
