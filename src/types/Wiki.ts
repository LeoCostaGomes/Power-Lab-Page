// Uma categoria da Wiki (o que aparece na navegação lateral).
export interface WikiCategory {
    id: string;
    label: string;
    // Id do ícone dentro de public/icons.svg (ex.: "paddle" -> "#paddle").
    // Categorias sem ícone usam variant "list".
    icon?: string;
    // "grid": cards com imagem, um por categoria com ícone (Raquetes, Ultimate, etc.).
    // "list": cards largos com nome + descrição, usados nas categorias sem ícone
    // (Modos de Jogo, Objetivos de Partida, Versões do Jogo).
    variant: "grid" | "list";
}

// Imagem vinda da API: sprite em base64 junto do mimetype, prontos pra
// virar uma data URI (ver src/utils/image.ts).
export interface WikiItemImage {
    mimeType: string;
    base64: string;
}

// Um item dentro de uma categoria (ex.: a raquete "Clássica", o modo "Campanha").
// Estrutura pensada para já vir pronta a receber os dados da API.
export interface WikiItem {
    id: string;
    name: string;
    // Usado nos cards de grade (categorias com ícone).
    image?: string;
    // Usado nos cards de lista (categorias sem ícone).
    description?: string;
}