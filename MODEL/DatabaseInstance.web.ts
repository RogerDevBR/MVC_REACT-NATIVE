type Row = Record<string, any>;

type WebDbApi = {
    runAsync: (sql: string, params?: any[]) => Promise<void>;
    getAllAsync: <T = Row>(sql: string, params?: any[]) => Promise<T[]>;
    getFirstAsync: <T = Row>(sql: string, params?: any[]) => Promise<T | null>;
    getFirstSync: <T = Row>(sql: string, params?: any[]) => T | null;
    execSync: (sql: string) => void;
};

type StorageShape = {
    tables: Record<string, Row[]>;
};

const STORAGE_KEY = 'mvc_app_web_db';

function readState(): StorageShape {
    if (typeof localStorage === 'undefined') {
        return { tables: {} };
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return { tables: {} };
    }

    try {
        return JSON.parse(raw) as StorageShape;
    } catch {
        return { tables: {} };
    }
}

function writeState(state: StorageShape): void {
    if (typeof localStorage === 'undefined') {
        return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getTableFromCreate(sql: string): string {
    const match = sql.match(/CREATE\s+TABLE\s+([A-Z0-9_]+)/i);
    return match?.[1]?.toUpperCase() ?? '';
}

function ensureTable(tableName: string): void {
    if (!tableName) return;
    const state = readState();
    if (!state.tables[tableName]) {
        state.tables[tableName] = [];
        writeState(state);
    }
}

const webDb: WebDbApi = {
    async runAsync(sql: string, params: any[] = []): Promise<void> {
        const normalized = sql.trim().toUpperCase();
        const state = readState();

        if (normalized.startsWith('INSERT INTO STUDENT')) {
            const [MATRICULA, NOME, REGISTRO] = params;
            if (!state.tables.STUDENT) {
                state.tables.STUDENT = [];
            }
            state.tables.STUDENT.push({ MATRICULA, NOME, REGISTRO });
            writeState(state);
            return;
        }

        if (normalized.startsWith('UPDATE STUDENT SET NOME = ? WHERE MATRICULA = ?')) {
            const [NOME, MATRICULA] = params;
            const rows = state.tables.STUDENT ?? [];
            const idx = rows.findIndex(row => row.MATRICULA === MATRICULA);
            if (idx >= 0) {
                rows[idx] = { ...rows[idx], NOME };
                state.tables.STUDENT = rows;
                writeState(state);
            }
            return;
        }

        if (normalized.startsWith('DELETE FROM STUDENT WHERE MATRICULA = ?')) {
            const [MATRICULA] = params;
            const rows = state.tables.STUDENT ?? [];
            state.tables.STUDENT = rows.filter(row => row.MATRICULA !== MATRICULA);
            writeState(state);
            return;
        }
    },

    async getAllAsync<T = Row>(sql: string): Promise<T[]> {
        const normalized = sql.trim().toUpperCase();
        const state = readState();

        if (normalized.startsWith('SELECT * FROM STUDENT')) {
            return [...(state.tables.STUDENT ?? [])] as T[];
        }

        return [];
    },

    async getFirstAsync<T = Row>(sql: string, params: any[] = []): Promise<T | null> {
        const normalized = sql.trim().toUpperCase();
        const state = readState();

        if (normalized.startsWith('SELECT * FROM STUDENT WHERE MATRICULA = ?')) {
            const [MATRICULA] = params;
            const row = (state.tables.STUDENT ?? []).find(item => item.MATRICULA === MATRICULA);
            return (row as T) ?? null;
        }

        return null;
    },

    getFirstSync<T = Row>(sql: string, params: any[] = []): T | null {
        const normalized = sql.trim().toUpperCase();

        if (normalized.includes('FROM SQLITE_MASTER') && params.length > 0) {
            const tableName = String(params[0]).toUpperCase();
            const state = readState();
            if (state.tables[tableName]) {
                return { name: tableName } as T;
            }
            return null;
        }

        return null;
    },

    execSync(sql: string): void {
        const tableName = getTableFromCreate(sql);
        ensureTable(tableName);
    },
};

export default webDb;
