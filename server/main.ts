import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
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

  // app.setGlobalPrefix('/flip-a-tonie/europe-west1/graphql')

  return app;
}

