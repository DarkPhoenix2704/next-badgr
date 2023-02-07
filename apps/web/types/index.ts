export type Child = {
    children: React.ReactNode;
};

export type User = {
    id: string;
    authid: string;
    name: string;
    email: string;
    avatar?: string;

    createdAt: Date;
    updatedAt: Date;
};
