import { useState, type KeyboardEvent } from "react";

type Mode = "idle" | "verify" | "confirm";

interface DeleteAccountButtonProps {
    onVerifyPassword: (currentPassword: string) => Promise<void>;
    onConfirmDelete: () => Promise<void>;
}

export default function DeleteAccountButton({
    onVerifyPassword,
    onConfirmDelete,
}: DeleteAccountButtonProps) {
    const [mode, setMode] = useState<Mode>("idle");
    const [currentPassword, setCurrentPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function reset() {
        setMode("idle");
        setCurrentPassword("");
        setError(null);
        setIsSubmitting(false);
    }

    async function handleVerify() {
        if (!currentPassword.trim()) return;

        setError(null);
        setIsSubmitting(true);
        try {
            await onVerifyPassword(currentPassword);
            setCurrentPassword("");
            setMode("confirm");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Não foi possível confirmar a senha.",
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDelete() {
        setError(null);
        setIsSubmitting(true);
        try {
            await onConfirmDelete();
            // Se der certo, quem chama já navega pra outra página — não
            // há mais nada aqui pra resetar.
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Não foi possível excluir a conta.",
            );
            setIsSubmitting(false);
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleVerify();
        }
    }

    return (
        <div className="danger-zone">
            {mode === "idle" && (
                <button
                    type="button"
                    className="delete-account-btn"
                    onClick={() => setMode("verify")}
                >
                    Excluir Usuário
                </button>
            )}

            {mode === "verify" && (
                <div className="danger-zone-step">
                    <label htmlFor="delete-current-password">
                        Confirme sua senha atual:
                    </label>
                    <input
                        type="password"
                        id="delete-current-password"
                        className="current-password-input"
                        value={currentPassword}
                        onChange={(event) =>
                            setCurrentPassword(event.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                    {error && <p className="field-error">{error}</p>}

                    <div className="danger-zone-actions">
                        <button
                            type="button"
                            className="confirm-password-btn"
                            onClick={handleVerify}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Enviando..." : "Confirmar"}
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={reset}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {mode === "confirm" && (
                <div className="danger-zone-step">
                    <p className="danger-zone-warning">
                        Tem certeza que deseja excluir permanentemente seu
                        usuário?
                    </p>
                    {error && <p className="field-error">{error}</p>}

                    <div className="danger-zone-actions">
                        <button
                            type="button"
                            className="delete-confirm-btn"
                            onClick={handleDelete}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Excluindo..." : "Sim, excluir"}
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={reset}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}