import { useMutation } from 'react-query';
import { signUp } from 'supertokens-web-js/recipe/emailpassword';
import { sendVerificationEmail } from 'supertokens-web-js/recipe/emailverification';

export const useCreateAccount = () =>
    useMutation(
        async (data: { email: string; password: string }) => {
            const res = await signUp({
                formFields: [
                    {
                        id: 'email',
                        value: data.email,
                    },
                    {
                        id: 'password',
                        value: data.password,
                    },
                ],
            });
            if (res.status === 'FIELD_ERROR') {
                res.formFields.forEach((field) => {
                    if (field.id === 'email') {
                        throw new Error('Email already exists');
                    } else if (field.id === 'password') {
                        throw new Error('Password is too weak');
                    }
                });
            }
            return res;
        },
        {
            onSuccess: (result) => {
                if (result.status === 'OK') {
                    sendVerificationEmail();
                }
            },
        },
    );
