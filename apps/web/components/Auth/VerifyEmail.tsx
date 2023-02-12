import { useEmailVerification, useVerifyToken } from '@app/hooks/Auth';
import { VStack, Button, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Toast } from '@app/components/Toast';

const VerifyEmail = () => {
    const { query } = useRouter();
    const toast = useToast();

    const { isLoading: isEmailSending, mutateAsync: resendEmail } = useEmailVerification();
    const { isLoading: isVerifying, mutateAsync: verifyToken } = useVerifyToken();

    useEffect(() => {
        if (!query?.token) return;
        (async () => {
            try {
                await verifyToken();
            } catch (err: any) {
                toast({
                    position: 'top-right',
                    render: () => <Toast title="Error" description={err.message} status="error" />,
                });
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const sendEmail = async () => {
        try {
            await resendEmail();
        } catch (err: any) {
            toast({
                position: 'top-right',
                render: () => (
                    <Toast
                        title="Error"
                        description="Something went wrong. Please try again."
                        status="error"
                    />
                ),
            });
        }
    };

    return (
        <VStack width="100%" spacing="15px">
            <Text fontSize="lg" fontWeight="semibold" color="white">
                Verify your email
            </Text>
            <Text color="white" fontWeight="400" fontSize="sm">
                We have sent you an email with a link to verify your email address. Please check
                your inbox and click on the link to verify your email address.
            </Text>
            <Button
                disabled={isEmailSending || isVerifying}
                isLoading={isEmailSending || isVerifying}
                width="100%"
                color="white"
                background="#432170"
                _hover={{
                    background: '#432170',
                }}
                _active={{
                    background: '#432170',
                }}
                height="45px"
                borderRadius="4px"
                boxShadow=" 0px 0px 5px -3px #432170"
                onClick={() => sendEmail()}
            >
                {isEmailSending ? 'Sending email...' : null}
                {isVerifying ? 'Verifying...' : null}
                {!isEmailSending && !isVerifying ? 'Resend email' : null}
            </Button>
        </VStack>
    );
};
export { VerifyEmail };
