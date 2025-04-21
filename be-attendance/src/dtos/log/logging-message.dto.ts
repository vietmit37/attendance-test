export class LoggingMessageDto {
  method: string;
  status: number;
  url: string;
  message: string;
  duration: number;
  username?: string;
  role?: string;
}
