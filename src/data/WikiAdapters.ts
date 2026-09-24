import type { WikiItem } from "../types/Wiki";
import type {
    ApiBox,
    ApiGameMode,
    ApiGameVersion,
    ApiModifier,
    ApiObjective,
    ApiPaddle,
    ApiParticle,
    ApiSkin,
    ApiStage,
    ApiUltimate,
} from "../api/WikiTypes";

// Raquete: não tem sprite próprio — as imagens vêm das combinações
// raquete+skin (paddleSkinsApi), já resolvidas por quem chama esta
// função. O card alterna entre elas (ver WikiItemCard).
export function paddleToWikiItem(
    paddle: ApiPaddle,
    images: string[] = [],
): WikiItem {
    return {
        id: String(paddle.id),
        name: paddle.name,
        images,
    };
}

export function ultimateToWikiItem(ultimate: ApiUltimate): WikiItem {
    return {
        id: String(ultimate.id),
        name: ultimate.name,
        image: ultimate.sprite,
    };
}

export function particleToWikiItem(particle: ApiParticle): WikiItem {
    return {
        id: String(particle.id),
        name: particle.name,
        image: particle.sprite,
    };
}

// Skin: mesma ideia da raquete, mas invertida — alterna entre as
// raquetes em que essa skin foi aplicada.
export function skinToWikiItem(
    skin: ApiSkin,
    images: string[] = [],
): WikiItem {
    return {
        id: String(skin.id),
        name: skin.name,
        images,
    };
}

export function boxToWikiItem(box: ApiBox): WikiItem {
    return {
        id: String(box.id),
        name: box.name,
        image: box.sprite,
    };
}

export function modifierToWikiItem(modifier: ApiModifier): WikiItem {
    return {
        id: String(modifier.id),
        name: modifier.name,
        image: modifier.sprite,
    };
}

export function gameModeToWikiItem(gameMode: ApiGameMode): WikiItem {
    return {
        id: String(gameMode.id),
        name: gameMode.name,
        description: gameMode.description,
    };
}

export function objectiveToWikiItem(objective: ApiObjective): WikiItem {
    return {
        id: String(objective.id),
        name: objective.name,
        description: objective.description,
    };
}

export function gameVersionToWikiItem(gameVersion: ApiGameVersion): WikiItem {
    return {
        id: String(gameVersion.id),
        name: gameVersion.versionCode,
        description: gameVersion.versionLog,
    };
}

export function stageToWikiItem(stage: ApiStage): WikiItem {
    return {
        id: String(stage.id),
        name: stage.name,
        // Sprite do bot (raquete + skin aplicada) usado como imagem do
        // card. Troque para outro campo (ex.: stage.reward.sprite) se
        // preferir outra imagem de capa aqui.
        image: stage.skinBot.sprite,
    };
}