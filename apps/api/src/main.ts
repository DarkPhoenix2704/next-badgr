import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const fastify = new FastifyAdapter({
        logger: true,
    });
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastify);

    const config = new DocumentBuilder()
        .setTitle('Next Badger APIs')
        .setDescription('APIs provided by Next Badger')
        .setVersion('0.0.1')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    await app.listen(
        (process.env.PORT as string) || 3001,
        (process.env.HOST as string) || '0.0.0.0',
    );
}
bootstrap();
