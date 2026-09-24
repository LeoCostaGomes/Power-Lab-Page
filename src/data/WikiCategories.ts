import type { WikiCategory } from "../types/Wiki";

// Ids alinhados com os recursos da API (ver README: /paddles, /ultimates,
// /particles, /skins, /boxes, /modifiers, /gamemodes, /objectives,
// /gameversions, /stages).
//
// TODO: os ids de ícone abaixo esperam entradas correspondentes em
// public/icons.svg (ex.: <symbol id="paddle">...). Ajuste os ids se os
// símbolos do sprite tiverem outro nome.
export const wikiCategories: WikiCategory[] = [
    { id: "paddles", label: "Raquetes", icon: "paddle", variant: "grid" },
    { id: "ultimates", label: "Ultimate", icon: "ultimate", variant: "grid" },
    { id: "skins", label: "Skins", icon: "skin", variant: "grid" },
    {
        id: "particles",
        label: "Partículas",
        icon: "particle",
        variant: "grid",
    },
    { id: "boxes", label: "Tipos de Caixotes", icon: "box", variant: "grid" },
    {
        id: "modifiers",
        label: "Modificadores",
        icon: "modifier",
        variant: "grid",
    },
    { id: "gameModes", label: "Modos de Jogo", variant: "list" },
    { id: "matchObjectives", label: "Objetivos de Partida", variant: "list" },
    { id: "gameVersions", label: "Versões do Jogo", variant: "list" },
    { id: "stages", label: "Fases", icon: "stage", variant: "grid" },
];