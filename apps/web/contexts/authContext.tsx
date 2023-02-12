import React, { createContext, useState, useEffect, useMemo } from 'react';
import Session from 'supertokens-web-js/recipe/session';
import { useRouter } from 'next/router';
import { isEmailVerified } from 'supertokens-web-js/recipe/emailverification';
import { Child, User } from '@app/types';
import api from '@app/api';

interface Prop {
    user: User | null;
    isUserLoading: boolean;
    setUser: React.Dispatch<User | null>;
    logout: () => Promise<void>;
    progress: number;
    setProgress: React.Dispatch<number>;
}

export const AuthContext = createContext({} as Prop);

export const AuthProvider = ({ children }: Child) => {
    const [user, setUser] = useState<User | null>(null);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [progress, setProgress] = useState(0);

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

    const logout = async () => {
        setIsUserLoading(true);
        await Session.signOut();
        setUser(null);
        setIsUserLoading(false);
    };

    const value = useMemo(
        () => ({
            user,
            isUserLoading,
            setUser,
            logout,
            setProgress,
            progress,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user, isUserLoading, progress],
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
