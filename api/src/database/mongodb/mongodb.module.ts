import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument } from './document/user.document';
import { UserSchema } from './schema/user.schema';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: `mongodb://${configService.get<string>('MongoDB_Server')}:${configService.get<number>('MongoDB_PORT')}/${configService.get<string>('MongoDB_Name')}`,
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            { name: UserDocument.name, schema: UserSchema }
        ])
    ],
    exports: [
        MongooseModule.forFeature([
            { name: UserDocument.name, schema: UserSchema }
        ])
    ]
})
export class MongodbModule {}
