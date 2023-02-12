import { Child } from '@app/types';
import { VStack, Image, Box } from '@chakra-ui/react';
import { Navbar } from '@app/components/Navbar';

const MainLayout = ({ children }: Child) => (
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
        <Box
            position="absolute"
            top="213px"
            zIndex="0"
            width="250px"
            height="250px"
            background="#432170"
            filter="blur(250px)"
        />
        <Navbar />
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

export { MainLayout };
