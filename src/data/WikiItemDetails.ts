import {
    boxesApi,
    modifiersApi,
    paddlesApi,
    paddleSkinsApi,
    particlesApi,
    skinsApi,
    stagesApi,
    ultimatesApi,
} from "../api/Wiki";
import type { ApiModifier } from "../api/WikiTypes";

export interface WikiDetailField {
    label: string;
    value: string;
}

// Card pra uma entidade relacionada e complexa (raquete do bot, skin do
// bot, um modificador da fase, etc.) — não cabe como linha simples de
// texto no card de informações, por isso vira um card à parte.
export interface WikiDetailCard {
    label: string;
    name: string;
    image?: string;
    // Link pra página de detalhes da categoria correspondente, quando
    // existir (ex.: raquete do bot -> /wiki/paddles/{id}).
    href?: string;
}

export interface WikiItemDetailViewModel {
    title: string;
    image?: string;
    // Mais de uma imagem = a página alterna entre elas (ver
    // useRotatingImage), igual o card da Wiki.
    images?: string[];
    infoFields: WikiDetailField[];
    description?: string;
    relatedCards: WikiDetailCard[];
    // Lista livre adicional (ex.: as recompensas possíveis de uma caixa).
    listSection?: { title: string; items: string[] };
}

export interface WikiDetailSource {
    getDetail: (id: string) => Promise<WikiItemDetailViewModel>;
}

function modifierCard(
    modifier: ApiModifier | null,
    index: number,
): WikiDetailCard | null {
    if (!modifier) return null;

    return {
        label: `Modificador ${index + 1}`,
        name: modifier.name,
        image: modifier.sprite,
        href: `/wiki/modifiers/${modifier.id}`,
    };
}

export const wikiDetailSources: Record<string, WikiDetailSource> = {
    paddles: {
        getDetail: async (id) => {
            const [paddle, combos] = await Promise.all([
                paddlesApi.getById(id),
                paddleSkinsApi.getAll(),
            ]);

            const images = combos
                .filter(
                    (combo) => String(combo.paddleId) === String(paddle.id),
                )
                .map((combo) => combo.sprite);

            return {
                title: paddle.name,
                images,
                infoFields: [
                    { label: "Território", value: paddle.territory },
                ],
                // A raquete não tem uma descrição única — tem 5, uma por
                // estágio de evolução.
                description: paddle.descriptions
                    .map((text, index) => `Estágio ${index + 1}: ${text}`)
                    .join("\n\n"),
                relatedCards: [],
            };
        },
    },

    ultimates: {
        getDetail: async (id) => {
            const ultimate = await ultimatesApi.getById(id);

            return {
                title: ultimate.name,
                image: ultimate.sprite,
                infoFields: [
                    { label: "Território", value: ultimate.territory },
                ],
                description: ultimate.description,
                relatedCards: [],
            };
        },
    },

    particles: {
        getDetail: async (id) => {
            const particle = await particlesApi.getById(id);

            return {
                title: particle.name,
                image: particle.sprite,
                infoFields: [],
                relatedCards: [],
            };
        },
    },

    skins: {
        getDetail: async (id) => {
            const [skin, combos] = await Promise.all([
                skinsApi.getById(id),
                paddleSkinsApi.getAll(),
            ]);

            const images = combos
                .filter((combo) => String(combo.skinId) === String(skin.id))
                .map((combo) => combo.sprite);

            return {
                title: skin.name,
                images,
                infoFields: [],
                relatedCards: [],
            };
        },
    },

    boxes: {
        getDetail: async (id) => {
            const box = await boxesApi.getById(id);

            return {
                title: box.name,
                image: box.sprite,
                infoFields: [],
                relatedCards: [],
                listSection: {
                    title: "Recompensas Possíveis",
                    items: box.rewards.map(
                        (reward) =>
                            `${reward.category} — ${reward.chancePercent}%`,
                    ),
                },
            };
        },
    },

    modifiers: {
        getDetail: async (id) => {
            const modifier = await modifiersApi.getById(id);

            return {
                title: modifier.name,
                image: modifier.sprite,
                infoFields: [],
                description: modifier.description,
                relatedCards: [],
            };
        },
    },

    stages: {
        getDetail: async (id) => {
            const stage = await stagesApi.getById(id);

            const relatedCards: WikiDetailCard[] = [
                {
                    label: "Raquete do Bot",
                    name: stage.paddleBot.name,
                    href: `/wiki/paddles/${stage.paddleBot.id}`,
                },
                {
                    label: "Skin do Bot",
                    name: stage.skinBot.name,
                    image: stage.skinBot.sprite,
                    href: `/wiki/skins/${stage.skinBot.id}`,
                },
                {
                    label: "Ultimate do Bot",
                    name: stage.ultimateBot.name,
                    image: stage.ultimateBot.sprite,
                    href: `/wiki/ultimates/${stage.ultimateBot.id}`,
                },
                {
                    label: "Partícula do Bot",
                    name: stage.particleBot.name,
                    image: stage.particleBot.sprite,
                    href: `/wiki/particles/${stage.particleBot.id}`,
                },
                {
                    label: "Recompensa",
                    name: `${stage.reward.text} (x${stage.reward.quantity})`,
                    image: stage.reward.sprite,
                },
                ...stage.modifiers
                    .map((modifier, index) => modifierCard(modifier, index))
                    .filter(
                        (card): card is WikiDetailCard => card !== null,
                    ),
            ];

            return {
                title: stage.name,
                // A fase não tem sprite próprio — usa a do bot (raquete +
                // skin aplicada), mesma escolha feita no card da Wiki.
                image: stage.skinBot.sprite,
                infoFields: [
                    { label: "Território", value: stage.territory },
                    { label: "Dificuldade", value: stage.difficulty },
                    { label: "Tipo de Inimigo", value: stage.enemyType },
                    {
                        label: "Objetivo",
                        value: `${stage.objective.name} (x${stage.objective.quantity})\n${stage.objective.description}`,
                    },
                ],
                relatedCards,
            };
        },
    },
};