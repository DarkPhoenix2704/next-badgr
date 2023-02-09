import React from 'react';
import { HStack, Text, VStack } from '@chakra-ui/react';

const Toast = ({ title, status, description }: ToastProps) => {
    const color = () => {
        switch (status) {
            case 'info':
                return '#9171f1';
            case 'warning':
                return '#e26f1e';
            case 'success':
                return '#33a48e';
            case 'loading':
                return '#00b5d8';
            case 'error':
                return '#f3523b';
            default:
                return '#00b5d8';
        }
    };
    return (
        <HStack
            border="1px solid rgba(255,255,255,0.2)"
            borderRadius="10px"
            boxShadow="0px 0px 2px rgba(255,255,255,0.2)"
            width="300px"
            background="#0a0410"
            padding="20px"
        >
            <VStack width="100%" alignItems="flex-start">
                <Text fontWeight="semibold" textColor={color()}>
                    {title}
                </Text>
                <Text
                    textColor="#655d7a"
                    style={{
                        marginTop: '5px',
                    }}
                >
                    {description}
                </Text>
            </VStack>
        </HStack>
    );
};
interface ToastProps {
    title: string;
    description: string;
    status: 'info' | 'warning' | 'success' | 'loading' | 'error';
}

export { Toast };
