import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { MainModule } from './modules/main/main.module';

export async function bootstrap(adapter?: ExpressAdapter) {
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
