import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import helmet from 'helmet';
import { MainModule } from './modules/main/main.module';
// import * as firebase from './core/firebase';
// import * as mongodb from './mongodb';

export async function bootstrap(adapter?: ExpressAdapter) {
  //
  // await firebase.bootstrap();
  // await mongodb.bootstrap();

  const app = adapter
    ? await NestFactory.create(MainModule, adapter)
    : await NestFactory.create(MainModule);

  app.setGlobalPrefix('api');
  // app.use(helmet());
  app.enableCors({
    origin: '*',
    exposedHeaders: ['Location']
  });

  return app;
}

