import { useMutation } from 'react-query';
import { verifyEmail } from 'supertokens-web-js/recipe/emailverification';

export const useVerifyToken = () =>
    useMutation(async () => {
        const res = await verifyEmail();
        if (res.status === 'EMAIL_VERIFICATION_INVALID_TOKEN_ERROR') {
            throw new Error('Invalid token');
        } else if (res.status === 'OK') {
            return res;
        } else {
            throw new Error('Something went wrong');
        }
    });
