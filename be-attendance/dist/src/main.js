"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const chalk_1 = __importDefault(require("chalk"));
const express_1 = require("express");
require("reflect-metadata");
require("source-map-support");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix('api');
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    const allowedOrigins = ['*'];
    app.enableCors({
        origin: (origin, callback) => {
            if (allowedOrigins[0].startsWith('*')) {
                return callback(null, true);
            }
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                console.info(msg, origin);
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 200,
        credentials: true,
        allowedHeaders: 'Content-Type, Accept, Authorization, Allow-Access-Control-Headers, accessToken , userToken',
        exposedHeaders: ['Content-Disposition, Access-Control-Allow-Origin'],
    });
    app.listen(configService.get('PORT') || 4000).then(() => {
        console.info(chalk_1.default.bold.blue(`App listen on portssss ${configService.get('PORT')}`));
    });
}
bootstrap();
//# sourceMappingURL=main.js.map