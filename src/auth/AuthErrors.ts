import { ApiError } from "../api/Client";

// Mapeia os códigos de status documentados no README pra mensagens
// específicas de login/cadastro. Quando o texto que a própria API manda
// já é claro o bastante (ex.: 429, que já vem com a mensagem certa), a
// gente só repassa error.message.
export function getAuthErrorMessage(
    error: unknown,
    kind: "login" | "register",
): string {
    if (error instanceof ApiError) {
        switch (error.status) {
            case 400:
                return "Preencha todos os campos corretamente.";
            case 401:
                return kind === "login"
                    ? "E-mail ou senha incorretos."
                    : error.message;
            case 409:
                return "Esse e-mail já está cadastrado. Tente fazer login.";
            case 429:
                return (
                    error.message ||
                    "Muitas tentativas. Tente novamente em instantes."
                );
            default:
                return error.message;
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Não foi possível completar a operação. Tente novamente.";
}