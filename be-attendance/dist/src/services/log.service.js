"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let LogService = class LogService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    getLoggingMessage(loggingMessageDto) {
        const { method, status, url, message, duration } = loggingMessageDto;
        return `[Method]: ${method} - [Status code]: ${status} - [URL]: ${url} - [Message]: ${message} - [Duration]: ${duration}ms [username]: ${loggingMessageDto?.username} - [role]: ${loggingMessageDto?.role}`;
    }
    getLogginProperty(context) {
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
};
exports.LogService = LogService;
exports.LogService = LogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LogService);
//# sourceMappingURL=log.service.js.map