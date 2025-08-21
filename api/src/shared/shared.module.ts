import { Module } from '@nestjs/common';
import { EncryptionService } from './service/encryption.service';

@Module({
    exports: [EncryptionService],
    providers: [EncryptionService]
})
export class SharedModule {}
