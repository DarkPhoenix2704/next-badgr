import api from '@app/api';
import { useMutation } from 'react-query';

export const useCreateProfile = () =>
    useMutation(async (profileDto: { name: string; email: string; id: string }) => {
        const { data } = await api.post('/profile', profileDto);
        return data.data;
    });
