import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
        private jwtService: JwtService) { }

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findUser(username);
        if(!user){
            throw new NotFoundException('user not found !!!')
        }
        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('bad password');
        }
        return user;
    }

    async login(user: any) {
        const payload = {sub: user.id,email: user.email, phone: user.phone,address: user.address};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async signUp(createUserDto: CreateUserDto) {
        const salt = randomBytes(8).toString('hex');

        // Hash the salt and the password together
        const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer;

        // Join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');
        createUserDto.password = result;

        // Create a new user and save it
        const user = await this.usersService.createUser(createUserDto);
        return user;
    }

}
