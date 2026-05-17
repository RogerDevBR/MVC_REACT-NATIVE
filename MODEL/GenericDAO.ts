import db from './DatabaseInstance';

export abstract class GenericDAO<T, K> {
    protected abstract getCreateSql(): string;
    protected abstract getTableName(): string;
    protected abstract getInsertSql(): string;
    protected abstract getInsertParams(entity: T): any[];
    protected abstract getUpdateSql(): string;
    protected abstract getUpdateParams(entity: T): any[];
    protected abstract getDeleteSql(): string;
    protected abstract getSelectAllSql(): string;
    protected abstract getSelectOneSql(): string;
    protected abstract getEntity(row: any): T;

    public async include(entity: T): Promise<void> {
        await db.runAsync(this.getInsertSql(), this.getInsertParams(entity));
    }

    public async alter(entity: T): Promise<void> {
        await db.runAsync(this.getUpdateSql(), this.getUpdateParams(entity));
    }

    public async exclude(key: K): Promise<void> {
        await db.runAsync(this.getDeleteSql(), [key as any]);
    }

    public getAll(useReturn: (collection: T[]) => void): void {
        db.getAllAsync<any>(this.getSelectAllSql()).then(rows => {
            const retorno = rows.map(row => this.getEntity(row));
            useReturn(retorno);
        });
    }

    public get(key: K, useReturn: (entity: T | null) => void): void {
        db.getFirstAsync<any>(this.getSelectOneSql(), [key as any]).then(row => {
            useReturn(row ? this.getEntity(row) : null);
        });
    }

    constructor() {
        // Verifica se a tabela existe de forma síncrona e a cria se necessário
        const row = db.getFirstSync<any>(
            'SELECT name FROM sqlite_master WHERE type="table" AND name = ?',
            [this.getTableName()]
        );
        if (!row) {
            db.execSync(this.getCreateSql());
        }
    }
}
