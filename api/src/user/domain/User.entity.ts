import { BaseEntity } from "src/shared/domain/base.entity";

/**
 * User Entity Class as simple Anemic Domin Entity
 */
export class UserEntity implements BaseEntity {

    /**
     * Unique Identifier
     */
    id: number;

    /**
     * Username
     */
    name: string;

    /**
     * user's email
     */
    email: string;

    /**
     * email's password
     */
    hashedPassword: string;

    /**
     * Flag determine wether the user still exists or had been delete (apply soft delete)
     */
    isDeleted?: boolean = false;
}