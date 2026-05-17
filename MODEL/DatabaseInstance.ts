import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('School.db');

export default db;
