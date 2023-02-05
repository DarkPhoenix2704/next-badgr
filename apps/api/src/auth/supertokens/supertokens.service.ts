import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword';
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
                ThirdPartyEmailPassword.init({
                    providers: [
                        ThirdPartyEmailPassword.Google({
                            clientId: this.config.googleClientId,
                            clientSecret: this.config.googleClientSecret,
                        }),
                    ],
                }),
                Session.init(),
            ],
        });
    }
}
