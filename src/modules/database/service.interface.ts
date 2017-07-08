import { IEntity, EntityType } from '../data/entity.interface';

export interface Service<T> {
    seed(): void;

    add(entity: T): Promise<T>;
    getAll(): Promise<T[]>;
    get(id: number): Promise<T>;
    update(entity: T): Promise<T>;
    remove(entity: T): Promise<T>;
}

export interface IService {
    name: EntityType;
    seed(): void;
    
    add(entity: IEntity): Promise<IEntity>;
    getAll(): Promise<IEntity[]>;
    get(id: number): Promise<IEntity>;
    update(entity: IEntity): Promise<IEntity>;
    remove(entity: IEntity): Promise<IEntity>;
}