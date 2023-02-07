import { Child } from '@app/types';
import { Image, VStack } from '@chakra-ui/react';

const AuthLayout = ({ children }: Child) => (
    <VStack minHeight="100vh" backgroundColor="#0A0510">
        <Image
            src="/animations/initial-dot.svg"
            width="100vw"
            height="100vh"
            zIndex={0}
            alt="logo"
            objectFit="cover"
            position="absolute"
        />
        <VStack
            width="100vw"
            paddingBlock="16px"
            paddingInline={{
                base: '16px',
                md: '32px',
                lg: '64px',
            }}
        >
            {children}
        </VStack>
    </VStack>
);

export { AuthLayout };
