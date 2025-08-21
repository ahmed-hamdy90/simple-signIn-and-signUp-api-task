import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGurad } from './gurad/auth.gurad';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('Auth_Secert'),
        signOptions: {
          expiresIn: configService.get<string>('Auth_Expires_Time')
        }
      }) 
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGurad],
  exports: [AuthService, AuthGurad]
})
export class AuthModule {}
