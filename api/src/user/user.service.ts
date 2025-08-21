import { Injectable } from '@nestjs/common';
import { InvalidParameterError } from 'src/shared/Error/invalidParameterError';
import { NotFoundUserError } from 'src/shared/Error/notFoundUserError';
import { AbstractCrudService } from 'src/shared/service/abstractCrud.service';
import { EncryptionService } from 'src/shared/service/encryption.service';
import { UserEntity } from './domain/User.entity';
import { UserRepository } from './domain/user.repository';
import { CreationUserDto } from './dto/creationUserDto';
import { UserDto } from './dto/userDto';

/**
 * User Service Class implementation
 */
@Injectable()
export class UserService extends AbstractCrudService<UserDto, UserEntity> {

    /**
     * UserService constructor
     * @param {UserRepository} userRepository user repository instance
     */
    constructor(private readonly userRepository: UserRepository, private readonly encryptionService: EncryptionService) {
        super();
    }

    /**
     * @inheritdoc
     */
    public async find(id: number): Promise<UserDto> {
        if (!id || isNaN(id)) {
            throw new InvalidParameterError('Invalid given User ID');
        }

        let result: UserEntity[];
        let user: UserDto;

        try {
            result = await this.userRepository.findBy({userId: id}, 0, 1);
        } catch (error) {
            console.error(error);
            result = [];
        }

        // Make sure this User exists And is not Deleted (TODO: Active User or not)
        if (result.length === 0 || result[0].isDeleted) {
            throw new NotFoundUserError('Given User ID not exists');
        }

        user = this.toDto(result[0]);

        return user;

    }

    /**
     * @inheritdoc
     */
    public async findBy(criteria: {}, offset: number = 0, limit: number = 50): Promise<UserDto[]> {

        if (criteria === undefined || typeof criteria !== "object") {
            throw new InvalidParameterError('Invalid given criteria to search with');
        }

        let result: UserEntity[] | null = [];

        try {
            result = await this.userRepository.findBy(criteria, offset, limit);
        } catch (error) {
            console.error(error);
            result = null;
        }

        let users: UserDto[] = [];
        if (result && result.length !== 0) {
            result.filter(entity => !entity.isDeleted)
                  .forEach(entity => users.push(this.toDto(entity)));
        }

        return users;
    }
    
    /**
     * @inheritdoc
     */
    public async create(dto: CreationUserDto): Promise<boolean> {
        if (dto === undefined || dto === null) {
            throw new InvalidParameterError('Invalid given User Dto Instance');
        }

        // Getting the latest ID to define new one
        let newUserId = 1;
        let latestInsertedId: number|null;
        latestInsertedId = await this.userRepository.getLatestInsertedId();
        if (latestInsertedId) {
            newUserId = latestInsertedId + 1;
        }

        // Convert given Dto instance to Domain Entity
        let newUserEntity = this.toEntity(dto);
        newUserEntity.id = newUserId;
        newUserEntity.hashedPassword = this.encryptionService.generateSHA256HashForText(dto.password);
        
        // Call to create action
        return await this.userRepository.create(newUserEntity);
    }

    /**
     * Search for User using his given email Plus Validate given password with stored password
     * if he already exists - the sign-in process validation
     * @param {string} email given email value will need search for
     * @param {string} plainPassword given plain password value will be validate
     */
    public async findByEmailAndValidteUserPassword(email: string, plainPassword: string): Promise<UserDto> {
        let result: UserEntity[];
        let user: UserDto;

        try {
            result = await this.userRepository.findBy({email: email}, 0, 1);
        } catch (error) {
            console.error(error);
            result = [];
        }

        // Make sure this User exists And is not Deleted (TODO: Active User or not)
        if (result.length === 0 || result[0].isDeleted) {
            throw new NotFoundUserError('Given User ID not exists');
        }

        // Also Validate Given Password with stored hased Password
        const authortizedUserEntity: UserEntity = result[0];
        if (this.encryptionService.generateSHA256HashForText(plainPassword) !== authortizedUserEntity.hashedPassword) {
            throw new NotFoundUserError('Invalid Password for Given User');
        }

        return this.toDto(authortizedUserEntity);
    }

    /**
     * @inheritdoc
     */
    protected toDto(entity: UserEntity): UserDto {
        let userDto = new UserDto();
        userDto.id = entity.id;
        userDto.name = entity.name;
        userDto.email = entity.email;

        return userDto;
    }
    
    /**
     * @inheritdoc
     */
    protected toEntity(dto: UserDto): UserEntity {
        let userEntity = new UserEntity();
        userEntity.id = dto.id ?? 0;
        userEntity.name = dto.name;
        userEntity.email = dto.email;

        return userEntity;
    }
}
