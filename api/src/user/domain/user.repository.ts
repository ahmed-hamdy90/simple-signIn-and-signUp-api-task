import { AbstractCrudRepository } from "src/shared/domain/abstractCrud.repository";
import { UserEntity } from "./User.entity";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InvalidParameterError } from "src/shared/Error/InvalidParameterError";
import { UserDocument } from "src/database/mongodb/document/user.document";

/**
 * User Repository Class implementation
 */
@Injectable()
export class UserRepository extends AbstractCrudRepository<UserEntity> {

    /**
     * UserRepository constructor
     * @param {Model} userModel user mongoose Model instance 
     */
    constructor (
        @InjectModel(UserDocument.name) private readonly userModel: Model<UserDocument>
    ) {
        super();
    }

    /**
     * @inheritdoc
     */
    public async findBy(criteria: {}, offset: number = 0, limit: number = 50): Promise<UserEntity[]> {

        if (criteria === undefined || typeof criteria !== "object") {
            new InvalidParameterError('Invalid given criteria to search with');
        }

        // TODO: use offset and limit with-in
        const result = await this.userModel.find(criteria);

        const entities: UserEntity[] = [];

        if (result && Array.isArray(result)) {
            result.forEach(document => {
                entities.push(this.toEntity(document));
            });
        }

        return entities;
    }

    /**
     * @inheritdoc
     */
    public async create(entity: UserEntity): Promise<boolean> {
        let result = false;

        const document = new this.userModel(this.toPresistance(entity));

        try {
            await document.save();
            result = true;
        } catch (error) {
            result = false;
            console.error(error);
        }

        return result;
    }

    /**
     * @inheritdoc
     */
    public async getLatestInsertedId(): Promise<number | null> {
        let latestInsertedId: number|null = null;

        const latestDocument: UserDocument | null =
            await this.userModel.findOne()
                .sort({_id: -1});

        if (latestDocument) {
            const latestEntity = this.toEntity(latestDocument);
            latestInsertedId = latestEntity.id;
        }

        return latestInsertedId;
    }

    /**
     * @inheritdoc
     */
    protected toEntity(document: UserDocument): UserEntity {
        const user = new UserEntity();
        user.id = document.userId;
        user.name = document.name;
        user.email = document.email;
        user.hashedPassword = document.password;
        user.isDeleted = document.isDeleted;

        return user;
    }

    /**
     * @inheritdoc
     */
    protected toPresistance(entity: UserEntity): Object {
        return {
            userId: entity.id,
            name: entity.name,
            email: entity.email,
            password: entity.hashedPassword,
            isDeleted: entity.isDeleted
        }
    }
}