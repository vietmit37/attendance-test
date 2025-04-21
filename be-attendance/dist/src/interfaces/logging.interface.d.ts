import { ExecutionContext } from '@nestjs/common';
import { LoggingMessageDto } from '@dtos/log/logging-message.dto';
export interface LoggingInstance {
    className: string;
    url: string;
    method: string;
    statusCode: number;
    username?: string;
}
export interface ILogging {
    getLoggingMessage(loggingMessageDto: LoggingMessageDto): string;
    getLogginProperty(context: ExecutionContext): LoggingInstance;
}
