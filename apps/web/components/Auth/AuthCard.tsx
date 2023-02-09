import { Heading, HStack, Text, VStack, Image } from '@chakra-ui/react';

const AuthCard = ({ step, progress }: AuthCardProps) => {
    const isCompleted = () => {
        if (step.step < progress) return 'COMPLETE' as const;
        if (step.step === progress) return 'PENDING' as const;
        if (step.step > progress) return 'INCOMPLETE' as const;
        return 'INCOMPLETE' as const;
    };
    return (
        <HStack
            width={{
                base: '95%',
                md: '400px',
            }}
            paddingInline="20px"
            paddingBlock="15px"
            borderRadius="10px"
            border={
                isCompleted() === 'PENDING'
                    ? ' 0.5px solid #432170  '
                    : '0.5px solid rgba(255,255,255,0.2)'
            }
            background="#201A26"
            transition="all 0.3s ease-in-out"
            alignItems="flex-start"
            boxShadow={isCompleted() === 'PENDING' ? ' 0px 0px 10px -3px #432170' : 'none'}
            cursor="pointer"
        >
            {isCompleted() === 'COMPLETE' ? (
                <Image height="22px" width="22px" src="/indicators/completed.svg" />
            ) : null}
            {isCompleted() === 'PENDING' ? (
                <Image height="22px" width="22px" src="/indicators/pending.svg" />
            ) : null}
            {isCompleted() === 'INCOMPLETE' ? (
                <Image height="22px" width="22px" src="/indicators/incomplete.svg" />
            ) : null}
            <VStack alignItems="flex-start">
                <Heading
                    textColor="white"
                    fontFamily="Poppins"
                    fontWeight="semibold"
                    fontSize="18px"
                >
                    {step.title}
                </Heading>
                <Text
                    fontFamily="Poppins"
                    fontWeight="regular"
                    textColor="#CECECE"
                    noOfLines={isCompleted() === 'PENDING' ? 2 : 1}
                    style={{
                        marginTop: '5px',
                    }}
                >
                    {step.description}
                </Text>
            </VStack>
        </HStack>
    );
};
export interface AuthCardProps {
    step: {
        title: string;
        description: string;
        step: number;
    };
    progress: number;
}
export { AuthCard };
