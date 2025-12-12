import { Injectable, Session } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from "util";


@Injectable()
export class AuthService{
     scrypt = promisify(_scrypt);
    constructor(private usersService: UsersService) {}
     
    async signup(email: string, password: string){
        const user =await  this.usersService.findUsersByEmail(email);
        if(user){
            throw new Error('Email in use');
        }
        //Hashing the password
        const salt=randomBytes(8).toString('hex');
        const hash =(await this.scrypt(password,salt,32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');
        //create new USer
        console.log('Creating user with hashed password:', result);
        const userCreated=this.usersService.createUser(email,result);
        return userCreated;
    }

    async signin(email:string,password:string){
        //Find the user by email
        const user =await  this.usersService.findUsersByEmail(email);
        if(!user){
            throw new Error('User not found');
        }
        const [salt,storedHash]=user.password.split('.');
        const hash= (await this.scrypt(password,salt,32)) as Buffer;
        if(storedHash!==hash.toString('hex')){
            throw new Error('Invalid password');
        }
        return user;
    }

}