import { apiRequest } from "./Client";
import type { ApiLoginResponse, ApiUser } from "./UsersTypes";

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

interface LoginPayload {
    email: string;
    password: string;
}

export const usersApi = {
    // /users/post não devolve token — só cria a conta. Quem chama isso
    // precisa fazer login em seguida pra abrir a sessão (ver AuthContext).
    register: (payload: RegisterPayload) =>
        apiRequest<unknown>("/users/post", { method: "POST", body: payload }),

    login: (payload: LoginPayload) =>
        apiRequest<ApiLoginResponse>("/users/login", {
            method: "POST",
            body: payload,
        }),

    // Abaixo: rotas autenticadas, ainda não usadas pela UI — ficam prontas
    // pra quando existir uma tela de perfil/conta.
    getById: (id: number | string, token: string) =>
        apiRequest<ApiUser>(`/users/get/${id}`, { token }),

    update: (
        id: number | string,
        token: string,
        payload: Partial<RegisterPayload>,
    ) =>
        apiRequest<ApiUser>(`/users/put/${id}`, {
            method: "PUT",
            body: payload,
            token,
        }),

    remove: (id: number | string, token: string) =>
        apiRequest<unknown>(`/users/delete/${id}`, {
            method: "DELETE",
            token,
        }),
};