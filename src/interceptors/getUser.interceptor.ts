import{
    UseInterceptors,
    NestInterceptor,
    CallHandler,
    ExecutionContext
    } from'@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstructor{
    new (...args:any[]):{};
}
export function Serialize(dto:ClassConstructor){
    return UseInterceptors(new GetUserInterceptor(dto));
}
 export class GetUserInterceptor implements NestInterceptor{
    constructor(private dto:any){

    }

    intercept(context: ExecutionContext, handler: CallHandler):Observable<any> {
        console.log('Before...');
        return handler.handle().pipe(
            map((data)=> {
                return plainToClass(this.dto, data,{
                    excludeExtraneousValues:true
                })
            }
        ));
    }
 }