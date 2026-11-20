// Cache em memória, por módulo (singleton) — cada recurso é buscado da
// API no máximo uma vez por sessão, mesmo que o usuário abra/feche vários
// itens ou troque de categoria repetidamente. É isso que evita bater no
// limite de requisições do back-end (60/min) ao navegar pela Wiki.
export interface ResourceCache<T> {
    getAll: () => Promise<T[]>;
    getById: (
        id: number | string,
        idOf: (item: T) => number | string,
    ) => Promise<T | undefined>;
    // Força buscar de novo na próxima chamada. Não é usado hoje, mas fica
    // pronto pra quando precisar atualizar os dados sem recarregar a página.
    invalidate: () => void;
}

export function createResourceCache<T>(
    fetcher: () => Promise<T[]>,
): ResourceCache<T> {
    let promise: Promise<T[]> | null = null;

    function getAll(): Promise<T[]> {
        if (!promise) {
            promise = fetcher().catch((error: unknown) => {
                // A falha não fica guardada — a próxima chamada tenta de
                // novo em vez de repetir o mesmo erro pra sempre.
                promise = null;
                throw error;
            });
        }
        return promise;
    }

    async function getById(
        id: number | string,
        idOf: (item: T) => number | string,
    ): Promise<T | undefined> {
        const items = await getAll();
        return items.find((item) => String(idOf(item)) === String(id));
    }

    function invalidate(): void {
        promise = null;
    }

    return { getAll, getById, invalidate };
}