import { apiRequest, toArray } from "./Client";
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
    getAll: () =>
        apiRequest<ApiPaddle[]>("/paddles/get").then(toArray<ApiPaddle>),
    getById: (id: number | string) =>
        apiRequest<ApiPaddle>(`/paddles/get/${id}`),
};

export const ultimatesApi = {
    getAll: () =>
        apiRequest<ApiUltimate[]>("/ultimates/get").then(toArray<ApiUltimate>),
    getById: (id: number | string) =>
        apiRequest<ApiUltimate>(`/ultimates/get/${id}`),
};

export const particlesApi = {
    getAll: () =>
        apiRequest<ApiParticle[]>("/particles/get").then(toArray<ApiParticle>),
    getById: (id: number | string) =>
        apiRequest<ApiParticle>(`/particles/get/${id}`),
};

export const skinsApi = {
    getAll: () => apiRequest<ApiSkin[]>("/skins/get").then(toArray<ApiSkin>),
    getById: (id: number | string) => apiRequest<ApiSkin>(`/skins/get/${id}`),
};

// Combinações raquete + skin.
export const paddleSkinsApi = {
    getAll: () =>
        apiRequest<ApiPaddleSkin[]>("/paddles-skins/get").then(
            toArray<ApiPaddleSkin>,
        ),
    getSprite: (paddleId: number | string, skinId: number | string) =>
        apiRequest<ApiPaddleSkin>(`/paddle/${paddleId}/skin/${skinId}/get`),
    getSkinsForPaddle: (paddleId: number | string) =>
        apiRequest<ApiSkin[]>(`/paddle/${paddleId}/skins/get`).then(
            toArray<ApiSkin>,
        ),
    getPaddlesForSkin: (skinId: number | string) =>
        apiRequest<ApiPaddle[]>(`/skin/${skinId}/paddles/get`).then(
            toArray<ApiPaddle>,
        ),
};

export const boxesApi = {
    getAll: () => apiRequest<ApiBox[]>("/boxes/get").then(toArray<ApiBox>),
    getById: (id: number | string) => apiRequest<ApiBox>(`/boxes/get/${id}`),
};

export const modifiersApi = {
    getAll: () =>
        apiRequest<ApiModifier[]>("/modifiers/get").then(toArray<ApiModifier>),
    getById: (id: number | string) =>
        apiRequest<ApiModifier>(`/modifiers/get/${id}`),
};

export const gameModesApi = {
    getAll: () =>
        apiRequest<ApiGameMode[]>("/gamemodes/get").then(toArray<ApiGameMode>),
    getById: (id: number | string) =>
        apiRequest<ApiGameMode>(`/gamemodes/get/${id}`),
};

export const objectivesApi = {
    getAll: () =>
        apiRequest<ApiObjective[]>("/objectives/get").then(
            toArray<ApiObjective>,
        ),
    getById: (id: number | string) =>
        apiRequest<ApiObjective>(`/objectives/get/${id}`),
};

export const gameVersionsApi = {
    getAll: () =>
        apiRequest<ApiGameVersion[]>("/gameversions/get").then(
            toArray<ApiGameVersion>,
        ),
    getById: (id: number | string) =>
        apiRequest<ApiGameVersion>(`/gameversions/get/${id}`),
};

export const stagesApi = {
    getAll: () => apiRequest<ApiStage[]>("/stages/get").then(toArray<ApiStage>),
    getById: (id: number | string) =>
        apiRequest<ApiStage>(`/stages/get/${id}`),
};