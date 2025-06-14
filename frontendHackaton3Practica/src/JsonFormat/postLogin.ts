export interface PostLogin {

    token: string;
    user: {
        id: number;
        name: string;
    };
}