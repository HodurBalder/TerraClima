// utils/methods.ts
import Moment from 'moment';
import Crypto from 'crypto';
import Cryptr from 'cryptr';
import Bcrypt from 'bcrypt';
import { useRuntimeConfig } from '#imports';

class Methods {
  private getSalt(): string {
    
    const config = useRuntimeConfig();
    return config.cryptSalt || 'default-salt-change-in-production';
  }

  public tokenExpired(): Date {
    return Moment().add(16, 'days').toDate();
  }

  public bcryptHash(value: string, saltRounds: number = 7): string {
    return Bcrypt.hashSync(value, saltRounds);
  }

  public bcryptCompare(value: string, hash: string): boolean {
    return Bcrypt.compareSync(value, hash);
  }

  public stringCryptr(value: string): string {
    const cryptr = new Cryptr(this.getSalt());
    return cryptr.encrypt(value);
  }

  public stringDecrypt(value: string): string {
    const cryptr = new Cryptr(this.getSalt());
    return cryptr.decrypt(value);
  }

  public stringCompare(value: string, hash: string): boolean {
    const encryptedValue = this.stringCryptr(value);
    return encryptedValue === hash;
  }

  public cryptoHash(length: number = 16): string {
    const hash = Crypto.createHash('sha256');
    
    hash.update(`${this.getSalt()}_${new Date().toISOString()}`);
    return hash.digest('hex').slice(0, length).toUpperCase();
  }

  public generateToken(userId: string): string {
    const timestamp = new Date().getTime().toString();
    const hash = Crypto.createHash('sha256');
    hash.update(`${userId}_${timestamp}_${this.getSalt()}`);
    return hash.digest('hex');
  }
}

export default new Methods();