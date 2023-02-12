import { MainLayout } from '@app/layout';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => (
    <>
        <h1>Home</h1>
        <p>Home page</p>
    </>
);

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;
export default Home;
