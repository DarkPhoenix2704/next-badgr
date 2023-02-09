import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                DATABASE_URL: Joi.string().required(),
                SUPERTOKENS_CONNECTION_URI: Joi.string().required(),
                SUPERTOKENS_API_KEY: Joi.string().required(),
                SUPERTOKENS_APP_NAME: Joi.string().required(),
                SUPERTOKENS_API_DOMAIN: Joi.string().required(),
                SUPERTOKENS_WEBSITE_DOMAIN: Joi.string().required(),
                GOOGLE_CLIENT_ID: Joi.string().required(),
                GOOGLE_CLIENT_SECRET: Joi.string().required(),
                DASHBOARD_API_KEY: Joi.string().required(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
        AuthModule.forRoot({
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI as string,
            apiKey: process.env.SUPERTOKENS_API_KEY as string,
            appInfo: {
                appName: process.env.SUPERTOKENS_APP_NAME as string,
                apiDomain: process.env.SUPERTOKENS_API_DOMAIN as string,
                websiteDomain: process.env.SUPERTOKENS_WEBSITE_DOMAIN as string,
            },
            googleClientId: process.env.GOOGLE_CLIENT_ID as string,
            googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            DashboardApiKey: process.env.DASHBOARD_API_KEY as string,
        }),
        PrismaModule,
        ProfileModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
