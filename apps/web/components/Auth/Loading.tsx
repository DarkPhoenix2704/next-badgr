import { Spinner, VStack } from '@chakra-ui/react';

const Loading = () => (
    <VStack width="100%" spacing="15px">
        <Spinner size="lg" color="white" />
    </VStack>
);

export { Loading };
