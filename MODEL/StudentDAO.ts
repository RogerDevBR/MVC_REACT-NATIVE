import { Student } from './Student';
import { GenericDAO } from './GenericDAO';

export default class StudentDAO extends GenericDAO<Student, string> {
    protected getCreateSql(): string {
        return 'CREATE TABLE STUDENT (MATRICULA VARCHAR(10) ' +
            'PRIMARY KEY, NOME VARCHAR(20), REGISTRO INTEGER)';
    }
    protected getTableName(): string { return 'STUDENT'; }
    protected getInsertSql(): string { return 'INSERT INTO STUDENT VALUES (?, ?, ?)'; }
    protected getInsertParams(entity: Student): any[] {
        const creation = new Date();
        return [entity.matricula, entity.nome, creation.getTime()];
    }
    protected getUpdateSql(): string { return 'UPDATE STUDENT SET NOME = ? WHERE MATRICULA = ?'; }
    protected getUpdateParams(entity: Student): any[] {
        return [entity.nome, entity.matricula];
    }
    protected getDeleteSql(): string { return 'DELETE FROM STUDENT WHERE MATRICULA = ?'; }
    protected getSelectAllSql(): string { return 'SELECT * FROM STUDENT'; }
    protected getSelectOneSql(): string { return 'SELECT * FROM STUDENT WHERE MATRICULA = ?'; }
    protected getEntity(row: any): Student {
        const creation = new Date(row.REGISTRO);
        return new Student(row.MATRICULA, row.NOME, creation);
    }
}
