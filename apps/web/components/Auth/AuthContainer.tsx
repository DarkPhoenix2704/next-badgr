import { Child } from '@app/types';
import { VStack } from '@chakra-ui/react';

const AuthContainer = ({ children }: Child) => (
    <VStack
        width={{
            base: '95%',
            md: '40%',
        }}
        height="100%"
        alignItems="center"
        justifyContent="center"
        padding="20px"
        borderRadius="10px"
        border="1px solid #432170"
        boxShadow=" 0px 0px 15px -3px #432170"
        backgroundColor="#19181e"
    >
        {children}
    </VStack>
);
export { AuthContainer };
