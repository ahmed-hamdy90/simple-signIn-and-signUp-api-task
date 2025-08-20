import { BaseEntity } from "../domain/base.entity";
import { BasicDto } from "../dto/base.dto";

/**
 * The basic abstrict Class for any Service for Crud operations
 */
export abstract class AbstractCrudService<T extends BasicDto, V extends BaseEntity> {

    /**
     * Getting one Entity data using given ID value
     * @param {Number} id entity's unique identifier 
     */
    public abstract find(id: number): Promise<T>;

    /**
     * Search for list of Entities data through given Criteria
     * @param {Object} criteria criteria Object which use for search
     * @param {number} offset offset number which search will begin from it
     * @param {number} limit limit number which total number will return searched list
     */
    public abstract findBy(criteria: {}, offset?: number, limit?: number): Promise<T[]>;

    /**
     * Creation a new Dto class
     * @param {BasicDto} T Given Dto instance whih need to create
     */
    public abstract create(dto: T): Promise<boolean>;

    /**
     * Convert Given Entity instance To Dto instance to be used for operations
     * @param {BaseEntity} V entity instance will convert
     */
    protected abstract toDto(entity: V) : T;

    /**
     * Convert Given Entity instance To Dto instance to be used for operations
     * @param {BasicDto} T dto instance will convert
     */
    protected abstract toEntity(dto: T) : V;
}