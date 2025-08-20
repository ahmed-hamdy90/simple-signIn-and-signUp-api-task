import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

/**
 * Encryption Service class include all operations for encrypt data
 */
@Injectable()
export class EncryptionService {

    /**
     * Geenrate SHA256 Hash value for Text
     * @param {string} text Given Text will need to convert
     * @returns {string} generated hash text
     */
    public generateSHA256HashForText(text: string): string {
        return crypto.createHash('sha256').update(text).digest('hex');
    }
}