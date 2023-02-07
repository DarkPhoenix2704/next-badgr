import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailVerification from 'supertokens-web-js/recipe/emailverification';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword';

const initAuth = () => {
    SuperTokens.init({
        appInfo: {
            apiDomain: process.env.NEXT_PUBLIC_API_DOMAIN as string,
            appName: process.env.NEXT_PUBLIC_SUPERTOKENS_APP_NAME as string,
        },
        recipeList: [Session.init(), EmailVerification.init(), EmailPassword.init()],
    });
};

export default initAuth;
