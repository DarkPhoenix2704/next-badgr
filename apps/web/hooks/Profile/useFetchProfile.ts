import api from '@app/api';
import { useQuery } from 'react-query';

const useFetchProfile = ({ slug }: { slug: string }) =>
    useQuery({
        queryKey: ['slug', slug],
        queryFn: async () => {
            const { data } = await api.get(`/profile/${slug}`);
            return data.data;
        },
    });

export { useFetchProfile };
