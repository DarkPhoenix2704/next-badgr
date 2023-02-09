import React, { createContext, useState, useEffect, useMemo } from 'react';
import Session from 'supertokens-web-js/recipe/session';
import { signUp } from 'supertokens-web-js/recipe/emailpassword';
import { useRouter } from 'next/router';
import {
    isEmailVerified,
    sendVerificationEmail,
    verifyEmail,
} from 'supertokens-web-js/recipe/emailverification';
import { useToast } from '@chakra-ui/react';
import { Child, User } from '@app/types';
import api from '@app/api';
import { Toast } from '@app/components/Toast';

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
    const toast = useToast();

    const router = useRouter();

    const fetchUser = async () => {
        let status = true;
        try {
            const { data } = await api.get('/profile');
            if (data.success && data.data) {
                setUser(data.data);
            } else {
                status = false;
            }
        } catch (err) {
            status = false;
        }
        return status;
    };

    useEffect(() => {
        const checkUser = async () => {
            setIsUserLoading(true);
            const session = await Session.doesSessionExist();
            if (session) {
                setProgress(1);
                const emailStatus = await isEmailVerified();
                if (emailStatus.status === 'OK' && emailStatus.isVerified) {
                    setProgress(2);
                    const status = await fetchUser();
                    if (status) {
                        router.push('/');
                    } else if (router.pathname !== '/auth') {
                        router.push('/auth');
                    }
                } else {
                    setProgress(1);
                    if (router.pathname !== '/auth') {
                        router.push('/auth');
                    }
                }
            } else {
                setProgress(0);
                if (router.pathname !== '/auth') {
                    router.push('/auth');
                }
            }
            setIsUserLoading(false);
        };
        checkUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            if (response.status === 'FIELD_ERROR') {
                response.formFields.forEach((formField) => {
                    if (formField.id === 'email') {
                        toast({
                            position: 'top-right',
                            duration: 5000,
                            render: () => (
                                <Toast title="Error" description={formField.error} status="error" />
                            ),
                        });
                    } else if (formField.id === 'password') {
                        toast({
                            position: 'top-right',
                            duration: 5000,
                            render: () => (
                                <Toast title="Error" description={formField.error} status="error" />
                            ),
                        });
                    }
                });
            } else if (response.status === 'OK') {
                await sendVerificationEmail();
            }
        } catch (err: any) {
            toast({
                position: 'top-right',
                duration: 5000,
                render: () => <Toast title="Error" description={err.message} status="error" />,
            });
        } finally {
            setIsUserLoading(false);
        }
    };
    // eslint-disable-next-line consistent-return
    const resendEmail = async () => {
        setIsUserLoading(true);
        try {
            const response = await sendVerificationEmail();
            if (response.status === 'EMAIL_ALREADY_VERIFIED_ERROR') {
                toast({
                    position: 'top-right',
                    duration: 5000,
                    render: () => (
                        <Toast title="Error" description="Email already verified" status="error" />
                    ),
                });
                setProgress(2);
            } else if (response.status === 'OK') {
                toast({
                    position: 'top-right',
                    duration: 5000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="Verification email sent"
                            status="success"
                        />
                    ),
                });
                setProgress(1);
            }
        } catch (err: any) {
            toast({
                position: 'top-right',
                duration: 5000,
                render: () => (
                    <Toast title="Error" description="Oops Something went wrong" status="error" />
                ),
            });
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
        setIsUserLoading(true);
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
        } finally {
            setIsUserLoading(false);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user, isUserLoading, progress],
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
