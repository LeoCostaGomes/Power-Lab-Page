import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { getAuthErrorMessage } from "../auth/AuthErrors";
import { useBodyClass } from "../hooks/UseBodyClass";
import "./Auth.css";

export default function Login() {
    useBodyClass("no-header");

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Mensagem informativa vinda da tela de Cadastro (ex.: conta criada,
    // mas o login automático falhou) — ver PostRegisterLoginError.
    const infoMessage = (location.state as { infoMessage?: string } | null)
        ?.infoMessage;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await login(email, password);
            navigate("/", { replace: true });
        } catch (err) {
            setError(getAuthErrorMessage(err, "login"));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="AuthPage">
            <div className="Form">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>

                    {infoMessage && !error && (
                        <p className="form-info">{infoMessage}</p>
                    )}
                    {error && <p className="form-error">{error}</p>}

                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Entrando..." : "Entrar"}
                    </button>
                    <button
                        type="button"
                        className="secondary-btn"
                        onClick={() => navigate("/cadastro")}
                    >
                        Ainda não tenho conta
                    </button>
                </form>
            </div>
        </main>
    );
}