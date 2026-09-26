import { Navigate, Outlet } from "react-router";
import { useAuth } from "../auth/AuthContext";

// Envolve rotas que só usuários logados podem acessar (Tela Inicial, Wiki).
export default function RequireAuth() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}