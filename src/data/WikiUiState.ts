// Guarda a última categoria da Wiki selecionada, em memória (dura a
// sessão — não sobrevive a um recarregamento de página). Assim, ao voltar
// de um item pra Wiki, a categoria continua a mesma de antes.
let lastActiveCategoryId: string | null = null;

export function getLastActiveCategoryId(): string | null {
    return lastActiveCategoryId;
}

export function setLastActiveCategoryId(categoryId: string): void {
    lastActiveCategoryId = categoryId;
}