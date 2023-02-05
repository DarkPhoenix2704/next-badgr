import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                DATABASE_URL: Joi.string().required(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
        PrismaModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
