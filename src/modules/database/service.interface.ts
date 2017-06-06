import { IEntity } from '../base/entity.interface';

export interface Service<T> {
    add(entity: T): Promise<T>;
    getAll(): Promise<T[]>;
    get(id: number): Promise<T>;
    update(entity: T): Promise<T>;
    remove(entity: T): Promise<T>;
}

export interface IService {
    add(entity: IEntity): Promise<IEntity>;
    getAll(): Promise<IEntity[]>;
    get(id: number): Promise<IEntity>;
    update(entity: IEntity): Promise<IEntity>;
    remove(entity: IEntity): Promise<IEntity>;
}