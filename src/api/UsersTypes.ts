export interface ApiUser {
    id: number;
    name: string;
    email: string;
}

export interface ApiLoginResponse {
    token: string;
    user: ApiUser;
}