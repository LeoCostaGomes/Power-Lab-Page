import type { WikiItem } from "../types/Wiki";
import {
    boxesApi,
    gameModesApi,
    gameVersionsApi,
    modifiersApi,
    objectivesApi,
    paddlesApi,
    paddleSkinsApi,
    particlesApi,
    skinsApi,
    stagesApi,
    ultimatesApi,
} from "../api/Wiki";
import {
    boxToWikiItem,
    gameModeToWikiItem,
    gameVersionToWikiItem,
    modifierToWikiItem,
    objectiveToWikiItem,
    paddleToWikiItem,
    particleToWikiItem,
    skinToWikiItem,
    stageToWikiItem,
    ultimateToWikiItem,
} from "./WikiAdapters";

export interface WikiSource {
    fetchItems: () => Promise<WikiItem[]>;
}

// As combinações raquete+skin são usadas tanto por "paddles" quanto por
// "skins" — esse cache evita buscar a lista duas vezes se o usuário
// visitar as duas categorias na mesma sessão.
let paddleSkinCombosPromise: ReturnType<typeof paddleSkinsApi.getAll> | null =
    null;

function getPaddleSkinCombos() {
    if (!paddleSkinCombosPromise) {
        paddleSkinCombosPromise = paddleSkinsApi.getAll();
    }
    return paddleSkinCombosPromise;
}

// Um registro por id de categoria (ver WikiCategories.ts).
export const wikiSources: Record<string, WikiSource> = {
    paddles: {
        fetchItems: async () => {
            const [paddles, combos] = await Promise.all([
                paddlesApi.getAll(),
                getPaddleSkinCombos(),
            ]);

            return paddles.map((paddle) =>
                paddleToWikiItem(
                    paddle,
                    combos
                        // String() por segurança: paddles/get e
                        // paddles-skins/get são controllers diferentes e
                        // podem não devolver o id no mesmo tipo (número
                        // vs texto).
                        .filter(
                            (combo) =>
                                String(combo.paddleId) === String(paddle.id),
                        )
                        .map((combo) => combo.sprite),
                ),
            );
        },
    },
    ultimates: {
        fetchItems: async () =>
            (await ultimatesApi.getAll()).map(ultimateToWikiItem),
    },
    particles: {
        fetchItems: async () =>
            (await particlesApi.getAll()).map(particleToWikiItem),
    },
    skins: {
        fetchItems: async () => {
            const [skins, combos] = await Promise.all([
                skinsApi.getAll(),
                getPaddleSkinCombos(),
            ]);

            return skins.map((skin) =>
                skinToWikiItem(
                    skin,
                    combos
                        .filter(
                            (combo) =>
                                String(combo.skinId) === String(skin.id),
                        )
                        .map((combo) => combo.sprite),
                ),
            );
        },
    },
    boxes: {
        fetchItems: async () => (await boxesApi.getAll()).map(boxToWikiItem),
    },
    modifiers: {
        fetchItems: async () =>
            (await modifiersApi.getAll()).map(modifierToWikiItem),
    },
    gameModes: {
        fetchItems: async () =>
            (await gameModesApi.getAll()).map(gameModeToWikiItem),
    },
    matchObjectives: {
        fetchItems: async () =>
            (await objectivesApi.getAll()).map(objectiveToWikiItem),
    },
    gameVersions: {
        fetchItems: async () =>
            (await gameVersionsApi.getAll()).map(gameVersionToWikiItem),
    },
    stages: {
        fetchItems: async () =>
            (await stagesApi.getAll()).map(stageToWikiItem),
    },
};