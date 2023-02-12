import {
    Button,
    Center,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Text,
    Link,
    VStack,
    useToast,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpSchema } from '@app/validators/Auth';
import { InferType } from 'yup';
import { useCreateAccount } from '@app/hooks/Auth';
import { Loading } from '@app/components/Auth';
import { Toast } from '@app/components/Toast';

type SignUpForm = InferType<typeof SignUpSchema>;

const SignUp = () => {
    const {
        register: createAccountRegister,
        handleSubmit: createAccountHandleSubmit,
        formState: { errors: createAccountErrors },
    } = useForm<SignUpForm>({
        mode: 'onSubmit',
        resolver: yupResolver(SignUpSchema),
    });

    const toast = useToast();
    const { isLoading, mutateAsync } = useCreateAccount();

    const signUp = async (data: SignUpForm) => {
        try {
            await mutateAsync({
                email: data.email,
                password: data.password,
            });
        } catch (err: any) {
            toast({
                position: 'top-right',
                duration: 5000,
                render: () => <Toast title="Error" description={err.message} status="error" />,
            });
        }
    };

    return !isLoading ? (
        <form
            onSubmit={createAccountHandleSubmit(signUp)}
            style={{
                width: '100%',
            }}
        >
            <VStack alignItems="flex-start" width="100%" gap="10px">
                <FormControl isInvalid={!!createAccountErrors.email}>
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
                        {...createAccountRegister('email')}
                    />
                    <FormErrorMessage textTransform="capitalize">
                        {createAccountErrors.email?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!createAccountErrors.password}>
                    <FormLabel textColor="white" fontFamily="Poppins" fontWeight="regular">
                        Password
                    </FormLabel>
                    <Input
                        disabled={isLoading}
                        variant="solid"
                        background="#151418"
                        padding="15px"
                        type="password"
                        border="1px solid rgba(255,255,255,0.1)"
                        borderRadius="4px"
                        placeholder="********"
                        textColor="white"
                        {...createAccountRegister('password')}
                    />
                    <FormErrorMessage textTransform="capitalize">
                        {createAccountErrors.password?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!createAccountErrors.confirmPassword}>
                    <FormLabel textColor="white" fontFamily="Poppins" fontWeight="regular">
                        Confirm Password
                    </FormLabel>
                    <Input
                        disabled={isLoading}
                        variant="solid"
                        background="#151418"
                        padding="15px"
                        type="password"
                        border="1px solid rgba(255,255,255,0.1)"
                        borderRadius="4px"
                        placeholder="********"
                        textColor="white"
                        {...createAccountRegister('confirmPassword')}
                    />
                    <FormErrorMessage textTransform="capitalize">
                        {createAccountErrors.confirmPassword?.message}
                    </FormErrorMessage>
                </FormControl>
                <Checkbox
                    textColor="white"
                    fontSize="16px"
                    disabled={isLoading}
                    iconColor="#432170"
                    {...createAccountRegister('accept')}
                >
                    I agree to Privacy Policy
                </Checkbox>
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
                    Sign Up
                </Button>
                <Center width="100%">
                    <Text textColor="white">
                        Already have an account? <Link href="login">Login</Link>{' '}
                    </Text>
                </Center>
            </VStack>
        </form>
    ) : (
        <Loading />
    );
};
export { SignUp };
