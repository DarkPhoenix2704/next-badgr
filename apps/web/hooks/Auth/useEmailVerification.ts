import { useMutation } from 'react-query';
import { sendVerificationEmail } from 'supertokens-web-js/recipe/emailverification';

export const useEmailVerification = () =>
    useMutation(() => sendVerificationEmail(), {
        onSuccess: (response) => {
            if (response.status === 'EMAIL_ALREADY_VERIFIED_ERROR') {
                throw new Error('Email already verified');
            }
        },
    });
