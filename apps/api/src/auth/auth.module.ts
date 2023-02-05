import { Module, DynamicModule } from '@nestjs/common';
import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';
import { SupertokensService } from './supertokens/supertokens.service';

@Module({
    providers: [SupertokensService],
    exports: [],
    controllers: [],
    imports: [],
})
export class AuthModule {
    static forRoot({
        connectionURI,
        apiKey,
        appInfo,
        googleClientId,
        googleClientSecret,
        DashboardApiKey,
    }: AuthModuleConfig): DynamicModule {
        return {
            providers: [
                {
                    useValue: {
                        appInfo,
                        connectionURI,
                        apiKey,
                        googleClientId,
                        googleClientSecret,
                        DashboardApiKey,
                    },
                    provide: ConfigInjectionToken,
                },
                SupertokensService,
            ],
            exports: [],
            imports: [],
            module: AuthModule,
        };
    }
}
