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

// Um item dentro de uma categoria (ex.: a raquete "Clássica", o modo "Campanha").
export interface WikiItem {
    id: string;
    name: string;
    // Data URI completa (mimetype + base64) — a API já devolve pronta.
    // Usado quando o item tem uma única imagem fixa.
    image?: string;
    // Lista de imagens para alternar automaticamente (ver WikiItemCard) —
    // usado pelas Raquetes (skins aplicadas) e Skins (raquetes que a usam).
    images?: string[];
    // Usado nos cards de lista (categorias sem ícone).
    description?: string;
}