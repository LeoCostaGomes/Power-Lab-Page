// Formatos de resposta da API, conforme documentados no README do
// back-end. Campos comentados como "não confirmado" são os que a própria
// documentação avisa que ainda precisam ser conferidos contra a resposta
// real (controllers feitos fora da conversa em que a doc foi escrita).

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

// Campos além de id/name não confirmados pela documentação.
export interface ApiParticle {
    id: number;
    name: string;
    sprite?: string;
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

// Campos prováveis (colunas de tb_game_mode) — não confirmados.
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

// Campos prováveis (colunas de tb_game_version) — não confirmados.
export interface ApiGameVersion {
    id: number;
    versionCode: string;
    versionLog: string;
}

// A doc descreve o conteúdo (raquete bot, ultimate bot, partícula bot,
// território, dificuldade, tipo de inimigo, objetivo, recompensa,
// modificadores) mas não os nomes exatos dos campos no JSON. Ajustar assim
// que o StageController tiver a documentação completa.
export interface ApiStage {
    id: number;
    [key: string]: unknown;
}