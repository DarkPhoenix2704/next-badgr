import React, { createContext, useState, useEffect, useMemo } from 'react';
import Session from 'supertokens-web-js/recipe/session';
import { signUp } from 'supertokens-web-js/recipe/emailpassword';
import { Child, User } from '@app/types';
import {
    isEmailVerified,
    sendVerificationEmail,
    verifyEmail,
} from 'supertokens-web-js/recipe/emailverification';

interface Prop {
    user: User | null;
    isUserLoading: boolean;
    setUser: React.Dispatch<User | null>;
    createAccount: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    progress: number;
    verifyUser: () => Promise<void>;
    resendEmail: () => Promise<void>;
    setProgress: React.Dispatch<number>;
}

export const AuthContext = createContext({} as Prop);

export const AuthProvider = ({ children }: Child) => {
    const [user, setUser] = useState<User | null>(null);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    const fetchUser = async () => ({} as User);

    useEffect(() => {
        const checkUser = async () => {
            setIsUserLoading(true);
            const session = await Session.doesSessionExist();
            if (session) {
                setProgress(1);
                const emailStatus = await isEmailVerified();
                if (emailStatus.status === 'OK' && emailStatus.isVerified) {
                    setProgress(2);
                    if (fetchUser) {
                        setUser(await fetchUser());
                    } else {
                        setProgress(2);
                    }
                } else {
                    setProgress(1);
                }
            } else {
                setProgress(0);
            }
            setIsUserLoading(false);
        };
        checkUser();
    }, []);

    // eslint-disable-next-line consistent-return
    const createAccount = async (email: string, password: string) => {
        setIsUserLoading(true);
        try {
            const response = await signUp({
                formFields: [
                    {
                        id: 'email',
                        value: email,
                    },
                    {
                        id: 'password',
                        value: password,
                    },
                ],
            });
            if (response.status === 'OK') {
                await sendVerificationEmail();
                setProgress(1);
                return response;
            }
        } catch (err: any) {
            return err;
        } finally {
            setIsUserLoading(false);
        }
    };
    // eslint-disable-next-line consistent-return
    const resendEmail = async () => {
        setIsUserLoading(true);
        try {
            const response = await sendVerificationEmail();
            if (response.status === 'OK') {
                return response;
            }
        } catch (err: any) {
            return err;
        } finally {
            setIsUserLoading(false);
        }
    };

    const logout = async () => {
        setIsUserLoading(true);
        await Session.signOut();
        setUser(null);
        setIsUserLoading(false);
    };

    const verifyUser = async () => {
        try {
            const verify = await verifyEmail();
            if (verify.status === 'EMAIL_VERIFICATION_INVALID_TOKEN_ERROR') {
                throw new Error('Invalid token');
            } else {
                setProgress(2);
                return true;
            }
        } catch (err: any) {
            return err;
        }
    };

    const value = useMemo(
        () => ({
            user,
            isUserLoading,
            setUser,
            createAccount,
            logout,
            setProgress,
            progress,
            verifyUser,
            resendEmail,
        }),
        [user, isUserLoading, progress],
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
