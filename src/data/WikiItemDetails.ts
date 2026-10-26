import { toArray } from "../api/Client";
import {
    boxesApi,
    modifiersApi,
    paddlesApi,
    paddleSkinsApi,
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

// Só as categorias listadas aqui têm página de detalhes — Skins e
// Partículas foram tiradas de propósito (ver WikiItemCard, que usa esse
// mesmo registro pra decidir se o card deve ou não virar um link).
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

            // Mesma blindagem usada nas listas: se as 5 descrições não
            // vierem com chaves sequenciais, o PHP devolve um objeto em
            // vez de array e .map() quebraria.
            const descriptions = toArray<string>(paddle.descriptions);

            return {
                title: paddle.name,
                images,
                infoFields: [
                    { label: "Território", value: paddle.territory },
                ],
                // A raquete não tem uma descrição única — tem 5, uma por
                // estágio de evolução.
                description: descriptions
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

            // Cada sub-item pode vir null (ex.: a Fase 1/tutorial não tem
            // todos preenchidos) — por isso cada um só entra na lista se
            // realmente existir, em vez de acessar .name direto.
            const relatedCards: WikiDetailCard[] = [];

            if (stage.paddleBot) {
                relatedCards.push({
                    label: "Raquete do Bot",
                    name: stage.paddleBot.name,
                    href: `/wiki/paddles/${stage.paddleBot.id}`,
                });
            }

            if (stage.skinBot) {
                relatedCards.push({
                    label: "Skin do Bot",
                    name: stage.skinBot.name,
                    image: stage.skinBot.sprite,
                    href: `/wiki/skins/${stage.skinBot.id}`,
                });
            }

            if (stage.ultimateBot) {
                relatedCards.push({
                    label: "Ultimate do Bot",
                    name: stage.ultimateBot.name,
                    image: stage.ultimateBot.sprite,
                    href: `/wiki/ultimates/${stage.ultimateBot.id}`,
                });
            }

            if (stage.particleBot) {
                relatedCards.push({
                    label: "Partícula do Bot",
                    name: stage.particleBot.name,
                    image: stage.particleBot.sprite,
                });
            }

            if (stage.reward) {
                relatedCards.push({
                    label: "Recompensa",
                    name: `${stage.reward.text} (x${stage.reward.quantity})`,
                    image: stage.reward.sprite,
                });
            }

            relatedCards.push(
                ...stage.modifiers
                    .map((modifier, index) => modifierCard(modifier, index))
                    .filter(
                        (card): card is WikiDetailCard => card !== null,
                    ),
            );

            const infoFields: WikiDetailField[] = [
                { label: "Território", value: stage.territory },
                { label: "Dificuldade", value: stage.difficulty },
                { label: "Tipo de Inimigo", value: stage.enemyType },
            ];

            if (stage.objective) {
                infoFields.push({
                    label: "Objetivo",
                    value: `${stage.objective.name} (x${stage.objective.quantity})\n${stage.objective.description}`,
                });
            }

            return {
                title: stage.name,
                // A fase não tem sprite próprio — usa a do bot (raquete +
                // skin aplicada), quando existir.
                image: stage.skinBot?.sprite,
                infoFields,
                relatedCards,
            };
        },
    },
};