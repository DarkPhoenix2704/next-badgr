import { useAuth } from '@app/hooks';
import { VStack, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const VerifyEmail = () => {
    const { query } = useRouter();
    const { resendEmail, verifyUser } = useAuth();
    const [verifying, setVerifying] = useState(false);

    useEffect(() => {
        if (!query?.token) return;
        setVerifying(true);
        verifyUser();
        setVerifying(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

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
                disabled={verifying}
                isLoading={verifying}
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
                onClick={() => resendEmail()}
            >
                {verifying ? 'Verifying...' : 'Resend Email'}
            </Button>
        </VStack>
    );
};
export { VerifyEmail };
