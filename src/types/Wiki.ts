// Uma categoria da Wiki (o que aparece na navegação lateral).
export interface WikiCategory {
    id: string;
    label: string;
    // Id do ícone dentro de public/icons.svg (ex.: "raquete" -> "#raquete").
    // Categorias sem ícone usam variant "list".
    icon?: string;
    // "grid": cards com imagem, um por categoria com ícone (Raquetes, Ultimate, etc.).
    // "list": cards largos com nome + descrição, usados nas categorias sem ícone
    // (Modos de Jogo, Objetivos de Partida, Versões do Jogo).
    variant: "grid" | "list";
}

// Um item dentro de uma categoria (ex.: a raquete "Clássica", o modo "Campanha").
// Estrutura pensada para já vir pronta a receber os dados da API.
export interface WikiItem {
    id: string;
    name: string;
    // Usado nos cards de grade (categorias com ícone).
    imageUrl?: string;
    // Usado nos cards de lista (categorias sem ícone).
    description?: string;
}