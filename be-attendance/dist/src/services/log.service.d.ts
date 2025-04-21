import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILogging, LoggingInstance } from '@interfaces/logging.interface';
import { LoggingMessageDto } from '@dtos/log/logging-message.dto';
export declare class LogService implements ILogging {
    private readonly configService;
    constructor(configService: ConfigService);
    getLoggingMessage(loggingMessageDto: LoggingMessageDto): string;
    getLogginProperty(context: ExecutionContext): LoggingInstance;
}
