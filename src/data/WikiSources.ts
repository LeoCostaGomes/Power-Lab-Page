import type { WikiItem } from "../types/Wiki";
import {
    boxesCache,
    gameModesCache,
    gameVersionsCache,
    modifiersCache,
    objectivesCache,
    paddlesCache,
    paddleSkinsCache,
    particlesCache,
    skinsCache,
    stagesCache,
    ultimatesCache,
} from "./WikiCache";
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

// Um registro por id de categoria (ver WikiCategories.ts). Cada fonte usa
// os caches de WikiCache.ts — a busca de verdade na API só acontece uma
// vez por recurso, mesmo revisitando a categoria várias vezes ou abrindo
// vários itens em sequência.
export const wikiSources: Record<string, WikiSource> = {
    paddles: {
        fetchItems: async () => {
            const [paddles, combos] = await Promise.all([
                paddlesCache.getAll(),
                paddleSkinsCache.getAll(),
            ]);

            return paddles.map((paddle) =>
                paddleToWikiItem(
                    paddle,
                    combos
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
            (await ultimatesCache.getAll()).map(ultimateToWikiItem),
    },
    particles: {
        fetchItems: async () =>
            (await particlesCache.getAll()).map(particleToWikiItem),
    },
    skins: {
        fetchItems: async () => {
            const [skins, combos] = await Promise.all([
                skinsCache.getAll(),
                paddleSkinsCache.getAll(),
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
        fetchItems: async () =>
            (await boxesCache.getAll()).map(boxToWikiItem),
    },
    modifiers: {
        fetchItems: async () =>
            (await modifiersCache.getAll()).map(modifierToWikiItem),
    },
    gameModes: {
        fetchItems: async () =>
            (await gameModesCache.getAll()).map(gameModeToWikiItem),
    },
    matchObjectives: {
        fetchItems: async () =>
            (await objectivesCache.getAll()).map(objectiveToWikiItem),
    },
    gameVersions: {
        fetchItems: async () =>
            (await gameVersionsCache.getAll()).map(gameVersionToWikiItem),
    },
    stages: {
        fetchItems: async () =>
            (await stagesCache.getAll()).map(stageToWikiItem),
    },
};