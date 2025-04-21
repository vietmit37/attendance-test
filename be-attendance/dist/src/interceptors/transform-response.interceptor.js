"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformResponseInterceptor = exports.Response = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const operators_1 = require("rxjs/operators");
class Response {
    statusCode;
    message;
    data;
}
exports.Response = Response;
let TransformResponseInterceptor = class TransformResponseInterceptor extends common_1.ClassSerializerInterceptor {
    intercept(context, call$) {
        return call$.handle().pipe((0, operators_1.map)(async (data) => {
            return {
                statusCode: context.switchToHttp().getResponse().statusCode,
                message: data.message,
                data: (0, class_transformer_1.instanceToPlain)(data.result),
            };
        }));
    }
};
exports.TransformResponseInterceptor = TransformResponseInterceptor;
exports.TransformResponseInterceptor = TransformResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformResponseInterceptor);
//# sourceMappingURL=transform-response.interceptor.js.map