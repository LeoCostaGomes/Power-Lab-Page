import { createResourceCache } from "../api/ResourceCache";
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

// Um cache por recurso — usado tanto por WikiSources.ts (a lista da Wiki)
// quanto por WikiItemDetails.ts (a página de detalhes), pra nunca buscar a
// mesma lista duas vezes na mesma sessão.
export const paddlesCache = createResourceCache(paddlesApi.getAll);
export const ultimatesCache = createResourceCache(ultimatesApi.getAll);
export const particlesCache = createResourceCache(particlesApi.getAll);
export const skinsCache = createResourceCache(skinsApi.getAll);
export const paddleSkinsCache = createResourceCache(paddleSkinsApi.getAll);
export const boxesCache = createResourceCache(boxesApi.getAll);
export const modifiersCache = createResourceCache(modifiersApi.getAll);
export const gameModesCache = createResourceCache(gameModesApi.getAll);
export const objectivesCache = createResourceCache(objectivesApi.getAll);
export const gameVersionsCache = createResourceCache(gameVersionsApi.getAll);
export const stagesCache = createResourceCache(stagesApi.getAll);