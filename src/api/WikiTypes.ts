// Formatos de resposta da API, conforme o README e o StageController
// (compartilhado por Leonardo). Onde os nomes de campo internos não
// vieram do código-fonte, isso está marcado explicitamente abaixo.

export interface ApiPaddle {
    id: number;
    name: string;
    descriptions: string[]; // as 5 descrições de estágio
    territory: string;
}

export interface ApiUltimate {
    id: number;
    name: string;
    description: string;
    sprite: string; // já vem como data URI (mimetype + base64)
    territory: string;
}

export interface ApiParticle {
    id: number;
    name: string;
    sprite: string;
}

export interface ApiSkin {
    id: number;
    name: string;
}

export interface ApiPaddleSkin {
    paddleId: number;
    skinId: number;
    sprite: string;
}

export interface ApiBoxReward {
    category: string;
    chancePercent: number;
}

export interface ApiBox {
    id: number;
    name: string;
    sprite: string;
    rewards: ApiBoxReward[];
}

export interface ApiModifier {
    id: number;
    name: string;
    description: string;
    sprite: string;
}

export interface ApiGameMode {
    id: number;
    name: string;
    description: string;
}

export interface ApiObjective {
    id: number;
    name: string;
    description: string;
}

export interface ApiGameVersion {
    id: number;
    versionCode: string;
    versionLog: string;
}

// ===========================================================
// Fases (/stages) — baseado no retorno real do StageController.
// Os nomes de nível superior (id, name, paddleBot, ultimateBot, skinBot,
// particleBot, territory, difficulty, enemyType, objective, reward,
// modifiers) vieram direto do código. Os campos DENTRO de paddleBot,
// skinBot e objective são inferidos pelo padrão dos outros formatters
// (formatUltimate, formatParticle, etc.) — o código enviado só mostra as
// chamadas, não o corpo desses métodos. Ajustar se vierem diferentes.
// ===========================================================

export interface ApiStagePaddleBot {
    id: number;
    name: string;
    // Descrição do estágio específico dessa fase — uma das 5 descrições
    // da raquete (getPaddleStage()), já resolvida pelo back-end.
    description: string;
    territory: string;
}

export interface ApiStageSkinBot {
    id: number;
    name: string;
    // Sprite dessa skin já aplicada ao paddleBot dessa fase.
    sprite: string;
}

export interface ApiStageObjective {
    id: number;
    name: string;
    description: string;
    quantity: number;
}

export interface ApiStageReward {
    text: string;
    quantity: number;
    sprite: string;
}

export interface ApiStage {
    id: number;
    name: string;
    paddleBot: ApiStagePaddleBot;
    ultimateBot: ApiUltimate;
    skinBot: ApiStageSkinBot;
    particleBot: ApiParticle;
    territory: string;
    difficulty: string;
    enemyType: string;
    objective: ApiStageObjective;
    reward: ApiStageReward;
    // Até 3 modificadores; slots vazios vêm como null.
    modifiers: (ApiModifier | null)[];
}