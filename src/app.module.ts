import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ReportsController } from './reports/reports.controller';
import { UsersService } from './users/users.service';
import { ReportsService } from './reports/reports.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/user.entity';
import { Report } from './reports/reports.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './users/interceptor/currentUser.interceptor';


@Module({

  imports: [UsersModule, ReportsModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [User, Report],
    synchronize: true,
  })],
  //exports:[UsersService, ReportsService],
  // controllers: [AppController, UsersController, ReportsController],
  providers: [
  {
    provide: APP_INTERCEPTOR,
    useClass: CurrentUserInterceptor,
  },
]
})
export class AppModule {}
