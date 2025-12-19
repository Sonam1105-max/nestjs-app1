import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptor/currentUser.interceptor';
import { CurrentUserMiddleware } from './middleware/currentUser.middleware';
// import { ethers } from 'ethers';
// import { JsonRpcProvider } from 'node_modules/ethers/lib.esm';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers:[UsersService,AuthService
    ],
    exports: [UsersService],
})
export class UsersModule {
    //  httpProvider = new JsonRpcProvider('http://localhost:8545');
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CurrentUserMiddleware).forRoutes('*');
    }
}
