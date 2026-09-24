// Wrapper genérico de chamadas à API. Usado pelos endpoints da Wiki e,
// futuramente, pelos de usuário/login (cadastro, autenticação, etc.).

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

interface ApiRequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: unknown;
    // Token de autenticação (ver README: Authorization: Bearer <token>).
    token?: string;
}

// Formato de erro padrão da API: { "error": "mensagem" }.
interface ApiErrorBody {
    error?: string;
}

export async function apiRequest<TResponse>(
    path: string,
    { method = "GET", body, token }: ApiRequestOptions = {},
): Promise<TResponse> {
    const headers: Record<string, string> = {
        Accept: "application/json",
    };

    if (body !== undefined) {
        headers["Content-Type"] = "application/json";
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let response: Response;

    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            method,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });
    } catch {
        throw new ApiError(
            0,
            "Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.",
        );
    }

    const text = await response.text();
    let data: unknown = null;

    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            data = null;
        }
    }

    if (!response.ok) {
        const errorBody = data as ApiErrorBody | null;
        const message =
            errorBody?.error ?? `Erro inesperado (${response.status}).`;

        throw new ApiError(response.status, message);
    }

    return data as TResponse;
}