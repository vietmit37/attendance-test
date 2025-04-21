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
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const typeorm_1 = require("typeorm");
const log_service_1 = require("../services/log.service");
let LoggingInterceptor = class LoggingInterceptor {
    logService;
    constructor(logService) {
        this.logService = logService;
    }
    intercept(context, next) {
        const start = Date.now();
        const properties = this.logService.getLogginProperty(context);
        const { method, statusCode, url, className, username } = properties;
        const logger = new common_1.Logger(className);
        return next.handle().pipe((0, operators_1.tap)((data) => {
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
            logger.log(loggingMessage);
        }), (0, operators_1.catchError)((error) => {
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
            if (error instanceof common_1.HttpException) {
                if (status === 204) {
                    logger.warn(loggingMessage);
                }
                if (status === 400 ||
                    status === 403 ||
                    status === 404 ||
                    status === 406) {
                    logger.error(loggingMessage);
                }
                if (status === 500) {
                    logger.error(loggingMessage);
                }
            }
            if (error instanceof TypeError) {
                logger.error(loggingMessage);
            }
            if (error instanceof typeorm_1.QueryFailedError) {
                logger.error(loggingMessage);
            }
            throw error;
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_service_1.LogService])
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map