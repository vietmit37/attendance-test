import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import chalk from 'chalk';
import { json, urlencoded } from 'express';
import 'reflect-metadata';
import 'source-map-support';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const allowedOrigins = ['*'];

  app.enableCors({
    origin: (origin, callback) => {
      if (allowedOrigins[0].startsWith('*')) {
        return callback(null, true);
      }
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        console.info(msg, origin);
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Content-Type, Accept, Authorization, Allow-Access-Control-Headers, accessToken , userToken',
    exposedHeaders: ['Content-Disposition, Access-Control-Allow-Origin'],
  });

  app.listen(configService.get('PORT') || 4000).then(() => {
    console.info(
      chalk.bold.blue(`App listen on portssss ${configService.get('PORT')}`),
    );
  });
}
bootstrap();
