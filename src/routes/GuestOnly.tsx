import { Navigate, Outlet } from "react-router";
import { useAuth } from "../auth/AuthContext";

// Envolve rotas que só fazem sentido pra quem NÃO está logado (Login,
// Cadastro) — manda quem já tem sessão de volta pra Tela Inicial.
export default function GuestOnly() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}