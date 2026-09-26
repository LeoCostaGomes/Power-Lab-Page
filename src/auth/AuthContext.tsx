import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { usersApi } from "../api/Users";
import type { ApiUser } from "../api/UsersTypes";

const STORAGE_KEY = "powerlab.auth";
// O README diz que o token expira em 1 hora (padrão) — usamos essa
// estimativa pra não continuar tentando usar um token já vencido.
const TOKEN_LIFETIME_MS = 60 * 60 * 1000;

interface StoredSession {
    token: string;
    user: ApiUser;
    expiresAt: number;
}

// Sinaliza um caso específico: a conta foi criada com sucesso, mas o
// login automático logo em seguida falhou (rede instável, rate limit,
// etc.). Tratado separado de "cadastro falhou" na tela de Cadastro.
export class PostRegisterLoginError extends Error {
    constructor() {
        super(
            "Sua conta foi criada, mas não foi possível entrar automaticamente. Faça login.",
        );
        this.name = "PostRegisterLoginError";
    }
}

interface AuthContextValue {
    user: ApiUser | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (
        name: string,
        email: string,
        password: string,
    ) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredSession(): StoredSession | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
        const parsed = JSON.parse(raw) as StoredSession;
        if (!parsed.token || !parsed.user || !parsed.expiresAt) return null;
        if (parsed.expiresAt <= Date.now()) return null;
        return parsed;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    // Lê o localStorage direto na primeira renderização (app 100% client-side,
    // sem SSR) — evita qualquer flash de "deslogado" antes de checar.
    const [session, setSession] = useState<StoredSession | null>(() =>
        readStoredSession(),
    );

    const persistSession = useCallback((next: StoredSession | null) => {
        setSession(next);

        if (next) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    // Desloga sozinho quando o token vence, sem esperar uma chamada à API
    // falhar com 401.
    useEffect(() => {
        if (!session) return;

        const remainingMs = session.expiresAt - Date.now();

        if (remainingMs <= 0) {
            persistSession(null);
            return;
        }

        const timeoutId = setTimeout(() => {
            persistSession(null);
        }, remainingMs);

        return () => clearTimeout(timeoutId);
    }, [session, persistSession]);

    const login = useCallback(
        async (email: string, password: string) => {
            const { token, user } = await usersApi.login({ email, password });

            persistSession({
                token,
                user,
                expiresAt: Date.now() + TOKEN_LIFETIME_MS,
            });
        },
        [persistSession],
    );

    const register = useCallback(
        async (name: string, email: string, password: string) => {
            await usersApi.register({ name, email, password });

            try {
                await login(email, password);
            } catch {
                // A conta já existe nesse ponto — só o login automático
                // que falhou.
                throw new PostRegisterLoginError();
            }
        },
        [login],
    );

    const logout = useCallback(() => {
        persistSession(null);
    }, [persistSession]);

    const value = useMemo<AuthContextValue>(
        () => ({
            user: session?.user ?? null,
            token: session?.token ?? null,
            isAuthenticated: session !== null,
            login,
            register,
            logout,
        }),
        [session, login, register, logout],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth precisa ser usado dentro de um AuthProvider.");
    }
    return context;
}