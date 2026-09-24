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

export function paddleToWikiItem(paddle: ApiPaddle): WikiItem {
    // TODO: a raquete tem 5 descrições de estágio e nenhum sprite próprio
    // documentado (o sprite vem da combinação raquete+skin, em
    // paddleSkinsApi). Decidir qual imagem/descrição mostrar aqui quando a
    // página de detalhes existir.
    return {
        id: String(paddle.id),
        name: paddle.name,
    };
}

export function ultimateToWikiItem(ultimate: ApiUltimate): WikiItem {
    return {
        id: String(ultimate.id),
        name: ultimate.name,
        imageUrl: ultimate.sprite,
    };
}

export function particleToWikiItem(particle: ApiParticle): WikiItem {
    // TODO: confirmar se "sprite" é mesmo o nome do campo de imagem.
    return {
        id: String(particle.id),
        name: particle.name,
        imageUrl: particle.sprite,
    };
}

export function skinToWikiItem(skin: ApiSkin): WikiItem {
    return {
        id: String(skin.id),
        name: skin.name,
    };
}

export function boxToWikiItem(box: ApiBox): WikiItem {
    return {
        id: String(box.id),
        name: box.name,
        imageUrl: box.sprite,
    };
}

export function modifierToWikiItem(modifier: ApiModifier): WikiItem {
    return {
        id: String(modifier.id),
        name: modifier.name,
        imageUrl: modifier.sprite,
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
    // TODO: a API não documenta um campo de "nome" para a fase — usando o
    // id como identificador visual até isso ser confirmado (ver ApiStage
    // em src/api/wikiTypes.ts).
    return {
        id: String(stage.id),
        name: `Fase ${stage.id}`,
    };
}