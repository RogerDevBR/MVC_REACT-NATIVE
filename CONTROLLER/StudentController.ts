import { Student } from '../MODEL/Student';
import StudentDAO from '../MODEL/StudentDAO';
import GenericController from './GenericController';

export default class StudentController extends GenericController<Student, string> {
    protected setDAO(): void {
        this.dao = new StudentDAO();
    }

    constructor() {
        super(new StudentDAO());
    }
}
