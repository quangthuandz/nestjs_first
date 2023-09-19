import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,Headers, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { jwtConstants } from 'src/auth/constants';
import * as jwt from 'jsonwebtoken';
import { SubjectsService } from 'src/subjects/subjects.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService,
        private subjectsService: SubjectsService){}

    @Post('create')
    createUser(@Body() body: CreateUserDto){
        return this.usersService.createUser(body);
    }

    @Get()
    @Serialize(UserDto)
    getAllUsers(){
        return this.usersService.findAll();
    }

    @Patch('update/:id')
    updateUser(@Param('id',ParseIntPipe) id: number,@Body() body:UpdateUserDto){
        return this.usersService.updateUser(id,body);
    }

    @Delete('delete/:id')
    deleteUser(@Param('id') id:number){
        return this.usersService.deleteUser(id);
    }

    @Post('registersubject/:subjectId')
    async registerSubject(@Param('subjectId') subjectId: number,@Headers('authorization') authorization: string){
        const subject = await this.subjectsService.findOne(subjectId)
        if(!subject){
            throw new NotFoundException('Not found subject')
        }
        const token = authorization.replace('Bearer ', '');
        console.log(token);
        const decodedToken = jwt.verify(token, jwtConstants.secret);
        const userId = decodedToken.sub as string;
        console.log('id '+ userId);
        return this.usersService.createUserSubject(parseInt(userId),subjectId,10);
    }
}
