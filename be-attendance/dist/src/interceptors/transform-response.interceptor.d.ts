import { CallHandler, ClassSerializerInterceptor, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class Response<T> {
    statusCode: number;
    message: string;
    data: T;
}
export declare class TransformResponseInterceptor<T> extends ClassSerializerInterceptor implements NestInterceptor<T, Promise<Response<T>>> {
    intercept(context: ExecutionContext, call$: CallHandler): Observable<Promise<Response<T>>>;
}
