import { useAuth, useCreateProfile } from '@app/hooks/Auth';
import { ProfileSchema } from '@app/validators/Auth';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { InferType } from 'yup';
import { Toast } from '@app/components/Toast';
import { User } from '@app/types';

type ProfileForm = InferType<typeof ProfileSchema>;

const Profile = () => {
    const { setUser } = useAuth();
    const router = useRouter();
    const toast = useToast();
    const { isLoading, mutateAsync } = useCreateProfile();

    const saveProfile = async (profileData: ProfileForm) => {
        try {
            const user = (await mutateAsync(profileData)) as User;
            setUser(user);
            router.push('/');
        } catch (err) {
            toast({
                position: 'top-right',
                render: () => (
                    <Toast
                        title="Error"
                        description="Something went wrong. Please try again."
                        status="error"
                    />
                ),
            });
        }
    };
    const {
        register: profileRegister,
        handleSubmit: profileHandleSubmit,
        formState: { errors: profileErrors },
    } = useForm<ProfileForm>({
        mode: 'onSubmit',
        resolver: yupResolver(ProfileSchema),
    });

    return (
        <form onSubmit={profileHandleSubmit(saveProfile)} style={{ width: '100%' }}>
            <VStack alignItems="flex-start" width="100%" spacing="15px">
                <FormControl isInvalid={!!profileErrors.name}>
                    <FormLabel textColor="white" fontFamily="Poppins" fontWeight="regular">
                        Full Name
                    </FormLabel>
                    <Input
                        disabled={isLoading}
                        variant="solid"
                        background="#151418"
                        padding="15px"
                        type="name"
                        border="1px solid rgba(255,255,255,0.1)"
                        borderRadius="4px"
                        placeholder="John Doe"
                        textColor="white"
                        {...profileRegister('name')}
                    />
                    <FormErrorMessage textTransform="capitalize">
                        {profileErrors.name?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!profileErrors.email}>
                    <FormLabel textColor="white" fontFamily="Poppins" fontWeight="regular">
                        Email
                    </FormLabel>
                    <Input
                        disabled={isLoading}
                        variant="solid"
                        background="#151418"
                        padding="15px"
                        type="email"
                        border="1px solid rgba(255,255,255,0.1)"
                        borderRadius="4px"
                        placeholder="johndoe@gmail.com"
                        textColor="white"
                        {...profileRegister('email')}
                    />
                    <FormErrorMessage textTransform="capitalize">
                        {profileErrors.email?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!profileErrors.id}>
                    <FormLabel textColor="white" fontFamily="Poppins" fontWeight="regular">
                        Slug
                    </FormLabel>
                    <Input
                        disabled={isLoading}
                        variant="solid"
                        background="#151418"
                        padding="15px"
                        type="username"
                        border="1px solid rgba(255,255,255,0.1)"
                        borderRadius="4px"
                        placeholder="DarkPhoenix2704"
                        textColor="white"
                        {...profileRegister('id')}
                    />
                    <FormErrorMessage textTransform="capitalize">
                        {profileErrors.id?.message}
                    </FormErrorMessage>
                </FormControl>
                <Button
                    isLoading={isLoading}
                    type="submit"
                    width="100%"
                    color="white"
                    background="rgba(255,255,255,0.1)"
                    height="45px"
                    borderRadius="4px"
                    boxShadow=" 0px 0px 5px -3px #432170"
                    _hover={{
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    _active={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    Complete Profile
                </Button>
            </VStack>
        </form>
    );
};

export { Profile };
