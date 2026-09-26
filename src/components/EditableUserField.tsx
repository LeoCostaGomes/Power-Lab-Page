import { useState, type KeyboardEvent } from "react";

type Mode = "idle" | "verify" | "edit";

interface EditableUserFieldProps {
    field: string;
    label: string;
    displayValue: string;
    inputType: "text" | "email" | "password";
    newValueLabel: string;
    saveButtonLabel: string;
    // Quando true, exige confirmar a senha atual (modo "verify") antes de
    // liberar o campo de edição — usado por E-mail e Senha.
    requiresPassword: boolean;
    onVerifyPassword?: (currentPassword: string) => Promise<void>;
    onSave: (newValue: string) => Promise<void>;
}

export default function EditableUserField({
    field,
    label,
    displayValue,
    inputType,
    newValueLabel,
    saveButtonLabel,
    requiresPassword,
    onVerifyPassword,
    onSave,
}: EditableUserFieldProps) {
    const [mode, setMode] = useState<Mode>("idle");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newValue, setNewValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function reset() {
        setMode("idle");
        setCurrentPassword("");
        setNewValue("");
        setError(null);
        setIsSubmitting(false);
    }

    function startEditing() {
        setError(null);
        // Nome pula direto pra edição; E-mail/Senha passam por "verify" antes.
        setMode(requiresPassword ? "verify" : "edit");
    }

    async function handleConfirm() {
        if (mode === "verify") {
            if (!currentPassword.trim() || !onVerifyPassword) return;

            setError(null);
            setIsSubmitting(true);
            try {
                await onVerifyPassword(currentPassword);
                setCurrentPassword("");
                setMode("edit");
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Não foi possível confirmar a senha.",
                );
            } finally {
                setIsSubmitting(false);
            }
            return;
        }

        if (!newValue.trim()) return;

        setError(null);
        setIsSubmitting(true);
        try {
            await onSave(newValue.trim());
            reset();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Não foi possível salvar.",
            );
            setIsSubmitting(false);
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleConfirm();
        }
    }

    const confirmLabel = mode === "verify" ? "Confirmar" : saveButtonLabel;

    return (
        <div className="detail-row" data-field={field}>
            <div className="detail-info">
                <span className="detail-label">{label}</span>

                {mode === "idle" && (
                    <div className="detail-value">{displayValue}</div>
                )}

                {mode === "verify" && (
                    <div className="detail-edit-form">
                        <label htmlFor={`${field}-current-password`}>
                            Confirme sua senha atual:
                        </label>
                        <input
                            type="password"
                            id={`${field}-current-password`}
                            className="current-password-input"
                            value={currentPassword}
                            onChange={(event) =>
                                setCurrentPassword(event.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                        {error && <p className="field-error">{error}</p>}
                    </div>
                )}

                {mode === "edit" && (
                    <div className="detail-edit-form">
                        <label htmlFor={`${field}-new-value`}>
                            {newValueLabel}
                        </label>
                        <input
                            type={inputType}
                            id={`${field}-new-value`}
                            className="detail-input"
                            value={newValue}
                            onChange={(event) =>
                                setNewValue(event.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                        {error && <p className="field-error">{error}</p>}
                    </div>
                )}
            </div>

            <div className="detail-actions">
                {mode === "idle" ? (
                    <button
                        type="button"
                        className="edit-btn"
                        onClick={startEditing}
                    >
                        Alterar
                    </button>
                ) : (
                    // Só existe no DOM depois que "Alterar" é clicado — o
                    // Cancelar não fica visível antes disso.
                    <div className="edit-confirm-actions">
                        <button
                            type="button"
                            className={
                                mode === "verify"
                                    ? "confirm-password-btn"
                                    : "save-btn"
                            }
                            onClick={handleConfirm}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Enviando..." : confirmLabel}
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
                )}
            </div>
        </div>
    );
}