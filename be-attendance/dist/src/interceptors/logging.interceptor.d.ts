import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LogService } from '@services/log.service';
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly logService;
    constructor(logService: LogService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
