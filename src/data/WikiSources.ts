import type { WikiItem } from "../types/Wiki";
import {
    boxesApi,
    gameModesApi,
    gameVersionsApi,
    modifiersApi,
    objectivesApi,
    paddlesApi,
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

// Um registro por id de categoria (ver wikiCategories.ts).
export const wikiSources: Record<string, WikiSource> = {
    paddles: {
        fetchItems: async () =>
            (await paddlesApi.getAll()).map(paddleToWikiItem),
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
        fetchItems: async () => (await skinsApi.getAll()).map(skinToWikiItem),
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