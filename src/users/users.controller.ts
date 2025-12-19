import { Controller, Post, Get, Body, Param, Delete, Put, UseInterceptors, Session, UseGuards } from '@nestjs/common';
import { CreateUser } from './dtos/createuser.dto';
import { UsersService } from './users.service';
import { GetUserInterceptor } from 'src/interceptors/getUser.interceptor';
import { User } from './user.entity';
import {UserDto} from 'src/users/dtos/user.dto';
import { Serialize } from 'src/interceptors/getUser.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/currentUser.decorator';
import { CurrentUserInterceptor } from './interceptor/currentUser.interceptor';
import { UserGuard } from './guards/userGuard.guard';
import { ethers} from 'ethers';


@Controller('users')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {

    constructor(public UserService: UsersService,
        public authService: AuthService
    ){
        
    }
   
    @Post('createUser')
    async createUser(@Body() body: CreateUser, @Session() session:any) {

       const user= await  this.authService.signup(body.email, body.password);
       session.userId=user.id;
       return user;
        
    }
    @Post('signIn')
    async signIn(@Body() body: CreateUser, @Session() session:any) {
        const user= await  this.authService.signin(body.email, body.password);
        session.userId=user.id;
        return user;
    }
    @Get('whoAmI')
    @UseGuards(UserGuard)
    whoAmI(@CurrentUser() user:User){
        // if(session.userId===null || session.userId===undefined){
        //     return null;
        // }
        return user;
    }
    @Post('signout')
    signOut(@Session() session:any){
        session.userId=null;
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

    @Get('getUserByEmail/:email')
    getUserByEmail(@Param('email') email: string) {
        return this.UserService.findUsersByEmail(email);
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
