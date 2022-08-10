import { observable, action, computed, makeObservable } from "mobx";
import {
  IStudent,
  IExchangeStudent,
  studentData,
} from './datasets/students';


class StudentStore {
  students = studentData;

  // if editedStudent is set, modal is shown
  editedStudent: IStudent | null = null;

  // exchangeStudents cannot be edited
  setEditedStudent (data: IStudent | null) {
    this.editedStudent = data;
  }

  // if toDeleteStudent is set, dialog is shown
  toDeleteStudent: IStudent | null = null;

  // exchangeStudents cannot be deleted
  setToDeleteStudent (data: IStudent | null) {
    this.toDeleteStudent = data;
  }

  updateStudent (
    name: string,
    classroom: string,
    birthdate: string,
    // type 'Gender' in students.ts is not exported. I guess for a reason?
    gender: any,
  ) {
    if (!this.editedStudent) return;

    let item = this.students.find(student => {
      if ('id' in student) {
        return student.id == this.editedStudent?.id
      }
      return null;
    });

    if (item) {
      item.name = name;
      item.class = classroom;
      item.birthdate = birthdate;
      item.gender = gender;
    }
  }

  deleteStudent (toDeleteStudent: IStudent) {
    this.students = this.students.filter(student => {
      if ('id' in student) {
        return student.id != toDeleteStudent.id;
      }
      return true;
    });
  }

  filterString:string = '';

  updateFilterString (text: string) {
    this.filterString = text;
  }

  showFilterDropdown:boolean = false;

  setShowFilterDropdown (flag:boolean) {
    this.showFilterDropdown = flag;
  }

  get availableClasses() {
    return this.students
      .map(student => student.class)
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
  }

  get filteredList() {
    return this.students.filter(
      (student:IStudent | IExchangeStudent) => {
        if (!this.filterString) return true;
        let hasMatch:boolean = (
          student.name.toLowerCase().indexOf(
            this.filterString.toLowerCase()
          ) != -1
          ||
          student.class.toLowerCase().indexOf(
            this.filterString.toLowerCase()
          ) != -1
        )
        return hasMatch;
      }
    );
  }

  constructor() {
    makeObservable(this, {
      students: observable,
      editedStudent: observable,
      setEditedStudent: action,
      toDeleteStudent: observable,
      setToDeleteStudent: action,
      updateStudent: action,
      deleteStudent: action,
      availableClasses: computed,
      filterString: observable,
      updateFilterString: action,
      showFilterDropdown: observable,
      setShowFilterDropdown: action,
    });
  }
}

export default StudentStore;
