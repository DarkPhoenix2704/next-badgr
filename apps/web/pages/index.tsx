import { Profile } from '@app/components/Home';
import { MainLayout } from '@app/layout';
import { VStack } from '@chakra-ui/react';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => (
    <VStack width="100%" zIndex={1}>
        <Profile />
    </VStack>
);

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;
export default Home;
