import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { PostRegisterLoginError, useAuth } from "../auth/AuthContext";
import { getAuthErrorMessage } from "../auth/AuthErrors";
import { useBodyClass } from "../hooks/UseBodyClass";
import "./Auth.css";

export default function Cadastro() {
    useBodyClass("no-header");

    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await register(name, email, password);
            navigate("/", { replace: true });
        } catch (err) {
            if (err instanceof PostRegisterLoginError) {
                // A conta foi criada — só o login automático falhou. Manda
                // pro login com um aviso em vez de um erro assustador.
                navigate("/login", {
                    replace: true,
                    state: { infoMessage: err.message },
                });
                return;
            }

            setError(getAuthErrorMessage(err, "register"));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="AuthPage">
            <div className="Form">
                <form onSubmit={handleSubmit}>
                    <h2>Cadastro</h2>

                    {error && <p className="form-error">{error}</p>}

                    <label htmlFor="usuario">Nome de Usuário:</label>
                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />

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
                        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                    </button>
                    <button
                        type="button"
                        className="secondary-btn"
                        onClick={() => navigate("/login")}
                    >
                        Já tenho uma conta
                    </button>
                </form>
            </div>
        </main>
    );
}