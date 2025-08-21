import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './domain/user.repository';
import { DatabaseModule } from 'src/database/database.module';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    DatabaseModule,
    SharedModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
