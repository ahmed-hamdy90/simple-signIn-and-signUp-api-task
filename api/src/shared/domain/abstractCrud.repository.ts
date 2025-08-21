import { BaseEntity } from "./base.entity";
import { Document } from 'mongoose';

/**
 * The Basic Abstrcat class for any Repository for Crud Operations
 */
export abstract class AbstractCrudRepository<T extends BaseEntity> {

    /**
     * Search for list of Entities throw given Criteria
     * @param {Object} criteria criteria Object which use for search
     * @param {number} offset offset number which search will begin from it
     * @param {number} limit limit number which total number will return searched list
     */
    public abstract findBy(criteria: {}, offset?: number, limit?: number): Promise<T[]>;

    /**
     * Creation a new Entity class
     * @param {BaseEntity} T Given entity instance whih need to create
     */
    public abstract create(entity: T): Promise<boolean>;

    /**
     * Getting the Latest inserted Entity to get its Id
     */
    public abstract getLatestInsertedId(): Promise<number | null>;

    /**
     * Convert Given Mongoose Document to Domain Entity
     * @param {Document} document given document will convert
     */
    protected abstract toEntity(document: Document): T;

    /**
     * Convert Given Entity to ready for Mongoose Document
     * @param {BaseEntity} entity 
     */
    protected abstract toPresistance(entity: T): Object; 
}