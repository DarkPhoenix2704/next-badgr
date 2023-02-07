import EmailPassword from 'supertokens-node/recipe/emailpassword';
import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailVerification from 'supertokens-node/recipe/emailverification';
import Dashboard from 'supertokens-node/recipe/dashboard';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
    constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
        supertokens.init({
            appInfo: config.appInfo,
            supertokens: {
                connectionURI: config.connectionURI,
                apiKey: config.apiKey,
            },
            recipeList: [
                Dashboard.init({
                    apiKey: this.config.DashboardApiKey,
                }),
                EmailPassword.init(),
                EmailVerification.init({
                    mode: 'REQUIRED',
                    emailDelivery: {
                        override: (originalImplementation) => ({
                            ...originalImplementation,
                            sendEmail(input) {
                                return originalImplementation.sendEmail({
                                    ...input,
                                    emailVerifyLink: input.emailVerifyLink.replace(
                                        'http://localhost:3000/auth/verify-email?',
                                        'http://localhost:3000/auth?verify-email=true&',
                                    ),
                                });
                            },
                        }),
                    },
                }),
                Session.init(),
            ],
        });
    }
}
