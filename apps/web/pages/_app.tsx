import React, { ReactNode } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { NextPage } from 'next';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import initAuth from '@app/auth';
import { theme } from '@app/theme';
import { AuthProvider } from '@app/contexts';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    if (typeof window !== 'undefined') {
        initAuth();
    }

    const getLayout = Component.getLayout ?? ((page) => page);
    const queryClient = new QueryClient();

    return (
        <>
            <Head>
                <title>Next Badgr</title>
            </Head>
            <ChakraProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
                </QueryClientProvider>
            </ChakraProvider>
        </>
    );
};
export default MyApp;
