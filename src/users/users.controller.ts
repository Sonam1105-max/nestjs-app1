import { Controller, Post, Get, Body, Param, Delete, Put, UseInterceptors } from '@nestjs/common';
import { CreateUser } from './dtos/createuser.dto';
import { UsersService } from './users.service';
import { GetUserInterceptor } from 'src/interceptors/getUser.interceptor';
import { User } from './user.entity';
import {UserDto} from 'src/users/dtos/user.dto';
import { Serialize } from 'src/interceptors/getUser.interceptor';

@Controller('users')
@Serialize(UserDto)
export class UsersController {

    constructor(public UserService: UsersService){}
    @Post('createUser')
    createUser(@Body() body: CreateUser) {
       this.UserService.createUser(body.email, body.password);
        
    }

 
    @Get('getUser')
    getUser() {
        console.log('Inside getUser method');
        return this.UserService.findAllUsers();
    }

    @Get('getUserById/:id')
    getUserById(@Param('id') id: number) {
        return this.UserService.findUSerById(id);
    }
    @Put('updateUser/:id')
    updateUser(@Param('id') id: number, @Body() body: Partial<CreateUser>) {
        return this.UserService.updateUser(id, body);
    }

    @Delete('removeUser/:id')
    removeUser(@Param('id') id: number) {
        return this.UserService.removeUser(id);
    }

}
