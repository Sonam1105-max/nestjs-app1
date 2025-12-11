import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUser } from './dtos/createuser.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    createUser(email: string, password: string) {
        const user = this.userRepository.create({ email, password });
        return this.userRepository.save(user);
    }

    findAllUsers(){
        return this.userRepository.find();
    }

    findUSerById(id: number){
        return this.userRepository.findOneBy({id});
    }

   async updateUser(id: number, attrs: Partial<User>){
        const user =await this.userRepository.findOneBy({id});
        if(!user){
            throw new NotFoundException('User not found');
        }
        Object.assign(user,attrs);
        return this.userRepository.save(user);
    }

    async removeUser(id: number) {
         const user =await this.userRepository.findOneBy({id});
        if(!user){
            throw new NotFoundException('User not found');
        }
        return this.userRepository.remove(user);
    }
}
