import { GenericDAO } from '../MODEL/GenericDAO';

export default abstract class GenericController<T, K> {
    protected dao: GenericDAO<T, K>;
    protected abstract setDAO(): void;

    constructor(dao: GenericDAO<T, K>) {
        this.dao = dao;
    }

    public async include(entity: T): Promise<boolean> {
        try {
            await this.dao.include(entity);
            return true;
        } catch (error) {
            return false;
        }
    }

    public async alter(entity: T | null): Promise<boolean> {
        if (entity === null) {
            return false;
        }
        try {
            await this.dao.alter(entity);
            return true;
        } catch (error) {
            return false;
        }
    }

    public async exclude(key: K): Promise<boolean> {
        try {
            await this.dao.exclude(key);
            return true;
        } catch (error) {
            return false;
        }
    }

    public getAll(useReturn: (collection: T[]) => void): void {
        this.dao.getAll(collection => useReturn(collection));
    }

    public get(key: K, useReturn: (entity: T | null) => void): void {
        this.dao.get(key, entity => useReturn(entity));
    }
}
