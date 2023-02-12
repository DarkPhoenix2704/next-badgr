import { HStack, Text, Icon } from '@chakra-ui/react';
import { MenuIcon } from '@iconicicons/react';

const Navbar = () => (
    <HStack
        padding={{
            base: '16px 16px',
            md: '32px 32px',
        }}
        width="100%"
        height="64px"
        justifyContent="space-between"
        alignItems="center"
    >
        <Text color="white" fontSize="24px" fontWeight="bold">
            NextBadgr
        </Text>
        <HStack
            spacing="32px"
            display={{
                base: 'none',
                md: 'flex',
            }}
        >
            <Text color="white" fontSize="16px" fontWeight="regular">
                Home
            </Text>
            <Text color="white" fontSize="16px" fontWeight="regular">
                Blog
            </Text>
            <Text color="white" fontSize="16px" fontWeight="regular">
                Organisations
            </Text>
            <Text color="white" fontSize="16px" fontWeight="regular">
                Profile
            </Text>
        </HStack>
        <Icon
            display={{
                base: 'block',
                md: 'none',
            }}
            as={MenuIcon}
            width="30px"
            height="30px"
            textColor="white"
        />
    </HStack>
);
export { Navbar };
