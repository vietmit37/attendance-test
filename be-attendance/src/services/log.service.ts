import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { LoggingMessageDto } from '@dtos/log/logging-message.dto';
// import { LogEntity } from '@entities/log.entity';
// import { LogLevel } from '@enums/log-level.enum';
import { ILogging, LoggingInstance } from '@interfaces/logging.interface';
import { LoggingMessageDto } from '@dtos/log/logging-message.dto';

@Injectable()
export class LogService implements ILogging {
  constructor(
    // @InjectRepository(LogEntity)
    // private readonly logRepository: Repository<LogEntity>,
    private readonly configService: ConfigService,
  ) {}

  getLoggingMessage(loggingMessageDto: LoggingMessageDto): string {
    const { method, status, url, message, duration } = loggingMessageDto;
    return `[Method]: ${method} - [Status code]: ${status} - [URL]: ${url} - [Message]: ${message} - [Duration]: ${duration}ms [username]: ${loggingMessageDto?.username} - [role]: ${loggingMessageDto?.role}`;
  }

  getLogginProperty(context: ExecutionContext): LoggingInstance {
    const { url, method, user } = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();

    return {
      className: context.getClass()?.name || 'unknown',
      url,
      method,
      statusCode,
      username: user?.username,
    };
  }
}

//   async writeLogToDB(
//     logLevel: LogLevel,
//     message: string,
//     username?: string,
//     role?: string,
//   ): Promise<any> {
//     const data = this.logRepository.create({
//       logLevel,
//       message,
//       username,
//       role,
//     });
//     const isLoggingEnabled = this.configService.get('IS_LOGGING_ENABLED');
//     if (isLoggingEnabled) {
//       await this.logRepository.save(data);
//     }
//     return data;
//   }
// }
