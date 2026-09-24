import { apiRequest } from "./Client";
import type {
    ApiBox,
    ApiGameMode,
    ApiGameVersion,
    ApiModifier,
    ApiObjective,
    ApiPaddle,
    ApiPaddleSkin,
    ApiParticle,
    ApiSkin,
    ApiStage,
    ApiUltimate,
} from "./WikiTypes";

export const paddlesApi = {
    getAll: () => apiRequest<ApiPaddle[]>("/paddles/get"),
    getById: (id: number | string) =>
        apiRequest<ApiPaddle>(`/paddles/get/${id}`),
};

export const ultimatesApi = {
    getAll: () => apiRequest<ApiUltimate[]>("/ultimates/get"),
    getById: (id: number | string) =>
        apiRequest<ApiUltimate>(`/ultimates/get/${id}`),
};

export const particlesApi = {
    getAll: () => apiRequest<ApiParticle[]>("/particles/get"),
    getById: (id: number | string) =>
        apiRequest<ApiParticle>(`/particles/get/${id}`),
};

export const skinsApi = {
    getAll: () => apiRequest<ApiSkin[]>("/skins/get"),
    getById: (id: number | string) => apiRequest<ApiSkin>(`/skins/get/${id}`),
};

// Combinações raquete + skin.
export const paddleSkinsApi = {
    getAll: () => apiRequest<ApiPaddleSkin[]>("/paddles-skins/get"),
    getSprite: (paddleId: number | string, skinId: number | string) =>
        apiRequest<ApiPaddleSkin>(`/paddle/${paddleId}/skin/${skinId}/get`),
    getSkinsForPaddle: (paddleId: number | string) =>
        apiRequest<ApiSkin[]>(`/paddle/${paddleId}/skins/get`),
    getPaddlesForSkin: (skinId: number | string) =>
        apiRequest<ApiPaddle[]>(`/skin/${skinId}/paddles/get`),
};

export const boxesApi = {
    getAll: () => apiRequest<ApiBox[]>("/boxes/get"),
    getById: (id: number | string) => apiRequest<ApiBox>(`/boxes/get/${id}`),
};

export const modifiersApi = {
    getAll: () => apiRequest<ApiModifier[]>("/modifiers/get"),
    getById: (id: number | string) =>
        apiRequest<ApiModifier>(`/modifiers/get/${id}`),
};

export const gameModesApi = {
    getAll: () => apiRequest<ApiGameMode[]>("/gamemodes/get"),
    getById: (id: number | string) =>
        apiRequest<ApiGameMode>(`/gamemodes/get/${id}`),
};

export const objectivesApi = {
    getAll: () => apiRequest<ApiObjective[]>("/objectives/get"),
    getById: (id: number | string) =>
        apiRequest<ApiObjective>(`/objectives/get/${id}`),
};

export const gameVersionsApi = {
    getAll: () => apiRequest<ApiGameVersion[]>("/gameversions/get"),
    getById: (id: number | string) =>
        apiRequest<ApiGameVersion>(`/gameversions/get/${id}`),
};

export const stagesApi = {
    getAll: () => apiRequest<ApiStage[]>("/stages/get"),
    getById: (id: number | string) =>
        apiRequest<ApiStage>(`/stages/get/${id}`),
};