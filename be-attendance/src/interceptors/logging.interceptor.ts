import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';
import { LogService } from '@services/log.service';

// global interceptor provide in app.module.ts
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly logService: LogService, // private readonly promMetricService: PromMetricService,
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const properties = this.logService.getLogginProperty(context);
    const { method, statusCode, url, className, username } = properties;
    const logger = new Logger(className);

    return next.handle().pipe(
      tap((data) => {
        const { message } = data;
        const duration = Date.now() - start;
        const loggingMessage = this.logService.getLoggingMessage({
          method,
          status: statusCode,
          url,
          message,
          duration,
          username,
        });
        // this.promMetricService.doSummary(
        //   start,
        //   url,
        //   method,
        //   statusCode,
        //   loggingMessage,
        //   username,
        // );
        // this.promMetricService.doCounter(
        //   url,
        //   method,
        //   statusCode,
        //   loggingMessage,
        //   username,
        // );
        logger.log(loggingMessage);
        // this.logService.writeLogToDB(LogLevel.INFO, loggingMessage, username);
      }),
      catchError((error) => {
        const status = error && error?.getStatus ? error.getStatus() : 500;
        const { message } = error;
        const duration = Date.now() - start;

        const loggingMessage = this.logService.getLoggingMessage({
          method,
          status,
          url,
          message: message || 'Lỗi server',
          duration,
        });
        // this.promMetricService.doSummary(
        //   start,
        //   url,
        //   method,
        //   statusCode,
        //   loggingMessage,
        //   username,
        // );
        // this.promMetricService.doCounter(
        //   url,
        //   method,
        //   statusCode,
        //   loggingMessage,
        //   username,
        // );
        if (error instanceof HttpException) {
          if (status === 204) {
            logger.warn(loggingMessage);
            // this.logService.writeLogToDB(
            //   LogLevel.WARNING,
            //   loggingMessage,
            //   username,
            // );
          }

          if (
            status === 400 ||
            status === 403 ||
            status === 404 ||
            status === 406
          ) {
            logger.error(loggingMessage);
            // this.logService.writeLogToDB(
            //   LogLevel.ERROR,
            //   loggingMessage,
            //   username,
            // );
          }

          if (status === 500) {
            logger.error(loggingMessage);
            // this.logService.writeLogToDB(
            //   LogLevel.ERROR,
            //   loggingMessage,
            //   username,
            // );
          }
        }

        if (error instanceof TypeError) {
          logger.error(loggingMessage);
          // this.logService.writeLogToDB(
          //   LogLevel.ERROR,
          //   loggingMessage,
          //   username,
          // );
        }

        if (error instanceof QueryFailedError) {
          logger.error(loggingMessage);
          // this.logService.writeLogToDB(
          //   LogLevel.ERROR,
          //   loggingMessage,
          //   username,
          // );
        }
        throw error;
      }),
    );
  }
}
