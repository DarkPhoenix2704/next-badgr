import { Heading, HStack, Text, VStack } from '@chakra-ui/react';

const AuthCard = ({ title, description, isActive }: AuthCardProps) => (
    <HStack
        width={{
            base: '95%',
            md: '400px',
        }}
        paddingInline="20px"
        paddingBlock="15px"
        borderRadius="10px"
        border={isActive ? ' 0.5px solid #432170  ' : '0.5px solid rgba(255,255,255,0.2)'}
        background="#201A26"
        transition="all 0.3s ease-in-out"
        boxShadow={isActive ? ' 0px 0px 10px -3px #432170' : 'none'}
        cursor="pointer"
    >
        <VStack alignItems="flex-start">
            <Heading textColor="white" fontFamily="Poppins" fontWeight="semibold" fontSize="18px">
                {title}
            </Heading>
            <Text
                fontFamily="Poppins"
                fontWeight="regular"
                textColor="#CECECE"
                noOfLines={isActive ? 2 : 1}
                style={{
                    marginTop: '5px',
                }}
            >
                {description}
            </Text>
        </VStack>
    </HStack>
);

export interface AuthCardProps {
    title: string;
    description: string;
    isActive: boolean;
}
export { AuthCard };
