import {
    AuthCard,
    AuthContainer,
    AuthHeader,
    Loading,
    Profile,
    SignUp,
    VerifyEmail,
} from '@app/components/Auth';
import { useAuth } from '@app/hooks';
import { AuthLayout } from '@app/layout';
import { Flex, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextPageWithLayout } from './_app';

const Steps = [
    {
        step: 1,
        title: 'Create an Account',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
    {
        step: 2,
        title: 'Verify your Email',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
    {
        step: 3,
        title: 'Complete your Profile',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
];

const AuthPage: NextPageWithLayout = () => {
    const router = useRouter();

    const { progress, setProgress, isUserLoading } = useAuth();

    useEffect(() => {
        if (router.query.verifyEmail === 'true') {
            setProgress(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query]);

    return (
        <VStack width="100%" zIndex={1}>
            <AuthHeader step={Steps[progress].step} title={Steps[progress].title} />
            <Flex
                flexDirection={{
                    base: 'column',
                    md: 'row',
                }}
                width="100%"
                gap="12px"
                alignItems="center"
                justifyContent="space-between"
            >
                <VStack gap="12px">
                    {Steps.map((step) => (
                        <AuthCard
                            key={step.step}
                            title={step.title}
                            isActive={step.step === Steps[progress].step}
                            description={step.description}
                        />
                    ))}
                </VStack>
                <AuthContainer>
                    {isUserLoading ? <Loading /> : null}
                    {!isUserLoading && progress === 0 ? <SignUp /> : null}
                    {!isUserLoading && progress === 1 ? <VerifyEmail /> : null}
                    {!isUserLoading && progress === 2 ? <Profile /> : null}
                </AuthContainer>
            </Flex>
        </VStack>
    );
};

AuthPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
export default AuthPage;
