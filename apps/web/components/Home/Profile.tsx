import { useFetchProfile } from '@app/hooks/Profile';
import { HStack, Image, VStack, Heading, Text } from '@chakra-ui/react';

const Profile = ({ slug, isEditable }: ProfileProps) => {
    const { data } = useFetchProfile({ slug });

    return (
        <HStack width="100%" padding="2rem" background="#271d30" borderRadius="10px">
            <Image
                height="200px"
                width="200px"
                src={data?.avatar || '/images/avatar.svg'}
                alt="Avatar"
            />
            <VStack alignItems="flex-start">
                <Heading textColor="white">@{data?.id}</Heading>
                <Text
                    fontSize="22px"
                    textColor="rgb(210,210,210)"
                    style={{
                        marginTop: '2px',
                    }}
                >
                    {data?.name}
                </Text>
                <Text
                    display={isEditable ? 'block' : 'none'}
                    fontSize="22px"
                    textColor="rgb(210,210,210)"
                    style={{
                        marginTop: '2px',
                    }}
                >
                    {data?.name}
                </Text>
            </VStack>
        </HStack>
    );
};

interface ProfileProps {
    slug: string;
    isEditable: boolean;
}

export { Profile };
