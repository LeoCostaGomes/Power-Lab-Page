import { useNavigate } from "react-router";
import { ApiError } from "../api/Client";
import { usersApi } from "../api/Users";
import { useAuth } from "../auth/AuthContext";
import { getAuthErrorMessage } from "../auth/AuthErrors";
import DeleteAccountButton from "../components/DeleteAccountButton";
import EditableUserField from "../components/EditableUserField";
import NavBar from "../components/NavBar";
import "./UserDetails.css";

type UserPatch = Partial<{ name: string; email: string; password: string }>;

export default function UserDetails() {
    const { user, token, login, updateUser, logout } = useAuth();
    const navigate = useNavigate();

    // O RequireAuth já impede chegar aqui deslogado — isso é só uma
    // proteção de tipos (user/token nunca deveriam ser null neste ponto).
    if (!user || !token) {
        return null;
    }

    async function verifyPassword(currentPassword: string) {
        try {
            // Não existe uma rota só de "verificar senha" — logar de novo
            // com o e-mail atual é a forma de confirmar a senha (e de
            // quebra renova o token).
            await login(user!.email, currentPassword);
        } catch (err) {
            throw new Error(getAuthErrorMessage(err, "verify"));
        }
    }

    async function saveField(patch: UserPatch) {
        try {
            await usersApi.update(user!.id, token!, patch);

            if (patch.name !== undefined || patch.email !== undefined) {
                updateUser(patch);
            }
        } catch (err) {
            if (err instanceof ApiError && err.status === 401) {
                logout();
                navigate("/login");
            }
            throw new Error(getAuthErrorMessage(err, "update"));
        }
    }

    async function handleDeleteAccount() {
        try {
            await usersApi.remove(user!.id, token!);
            // Conta excluída — desloga e manda pro login, de onde dá pra
            // criar uma conta nova ou entrar com outra já existente.
            logout();
            navigate("/login", { replace: true });
        } catch (err) {
            if (err instanceof ApiError && err.status === 401) {
                logout();
                navigate("/login");
            }
            throw new Error(getAuthErrorMessage(err, "update"));
        }
    }

    return (
        <>
            <NavBar />

            <main>
                <section className="ContentBox UserDetails">
                    <h2>Detalhes do Usuário</h2>

                    <EditableUserField
                        field="nome"
                        label="Nome"
                        displayValue={user.name}
                        inputType="text"
                        newValueLabel="Novo nome:"
                        saveButtonLabel="Salvar"
                        requiresPassword={false}
                        onSave={(newValue) => saveField({ name: newValue })}
                    />

                    <EditableUserField
                        field="email"
                        label="E-mail"
                        displayValue={user.email}
                        inputType="email"
                        newValueLabel="Novo e-mail:"
                        saveButtonLabel="Salvar Novo E-mail"
                        requiresPassword
                        onVerifyPassword={verifyPassword}
                        onSave={(newValue) => saveField({ email: newValue })}
                    />

                    <EditableUserField
                        field="senha"
                        label="Senha"
                        displayValue="********"
                        inputType="password"
                        newValueLabel="Nova senha:"
                        saveButtonLabel="Salvar Nova Senha"
                        requiresPassword
                        onVerifyPassword={verifyPassword}
                        onSave={(newValue) =>
                            saveField({ password: newValue })
                        }
                    />

                    <DeleteAccountButton
                        onVerifyPassword={verifyPassword}
                        onConfirmDelete={handleDeleteAccount}
                    />
                </section>
            </main>
        </>
    );
}