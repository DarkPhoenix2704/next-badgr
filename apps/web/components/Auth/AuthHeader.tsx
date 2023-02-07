import { Heading, HStack, VStack, Text, Image } from '@chakra-ui/react';

const AuthHeader = ({ step, title }: AuthHeaderProps) => (
    <HStack width="100%" justifyContent="space-between" paddingBlock="1rem" zIndex={1}>
        <VStack alignItems="flex-start">
            <Text
                transition="all 0.3s ease-in"
                fontSize="16px"
                fontFamily="Poppins"
                fontWeight="light"
                textColor="#FFFFFF"
            >
                Step {step} of 3
            </Text>
            <Heading
                transition="all 0.3s ease-in"
                fontSize="32px"
                fontFamily="Poppins"
                fontWeight="semibold"
                textColor="white"
                style={{
                    marginTop: '5px',
                }}
            >
                {title}
            </Heading>
        </VStack>
        <Image
            src="/images/logo.png"
            display={{
                base: 'none',
                md: 'block',
            }}
        />
    </HStack>
);

export interface AuthHeaderProps {
    step: number;
    title: string;
}

export { AuthHeader };
