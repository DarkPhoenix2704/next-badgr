import { MainLayout } from '@app/layout';
import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Profile as ProfileComponent } from '@app/components/Home';
import { useAuth } from '@app/hooks/Auth';
import { NextPageWithLayout } from './_app';

const Profile: NextPageWithLayout = () => {
    const router = useRouter();
    const { user } = useAuth();
    const slug = router.query.slug as string;
    return (
        <VStack width="100%" zIndex="1" borderRadius="10px">
            <ProfileComponent slug={slug} isEditable={user?.id === slug} />
        </VStack>
    );
};

Profile.getLayout = (page) => <MainLayout> {page} </MainLayout>;
export default Profile;
