import { Controller, Get, UseGuards, Request, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-strategy.guard';
import { JwtAuthGuard } from './jwt-strategy.guard';
import { Public } from './auth.decorator';
import { UsersService } from 'src/users/users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private userService: UsersService) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @Public()
    validateUser(@Request() req) {
        console.log(req.user);
        return this.authService.login(req.user);
    }

    @Get('profile')
    @Serialize(UserDto)
    @UseGuards(JwtAuthGuard)
    getProfile(@Headers('authorization') authorization: string) {
        const token = authorization.replace('Bearer ', '');
        const decodedToken = jwt.verify(token, jwtConstants.secret);
        return decodedToken;
    }

    @Post('signup')
    @Public()
    signUp(@Body() body: CreateUserDto) {
        return this.authService.signUp(body);
    }
}
