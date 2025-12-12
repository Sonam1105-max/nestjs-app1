import{
    UseInterceptors,
    NestInterceptor,
    CallHandler,
    ExecutionContext,
    Injectable
    }
    from'@nestjs/common';

import { UsersService } from '../users.service';
import { Observable } from 'rxjs';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
    constructor(private usersService:UsersService){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request= context.switchToHttp().getRequest();
        const {userId}=request.session||{};
        if(userId){
            const user=this.usersService.findUSerById(userId);
            request.currentUser=user;
        }
        return next.handle();
    }
}