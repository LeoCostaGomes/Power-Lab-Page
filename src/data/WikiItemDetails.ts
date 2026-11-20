import { ApiError, toArray } from "../api/Client";
import type { ApiBox, ApiModifier, ApiPaddleSkin } from "../api/WikiTypes";
import {
    boxesCache,
    modifiersCache,
    paddlesCache,
    paddleSkinsCache,
    stagesCache,
    ultimatesCache,
} from "./WikiCache";

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
    // existir (ver detailHref).
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

// Só devolve um link se a categoria realmente tiver página de detalhes
// (ou seja, se estiver em wikiDetailSources). Skins e Partículas não têm,
// então o card relacionado delas fica sem link em vez de levar pra uma
// página de "item não encontrado".
function detailHref(
    categoryId: string,
    id: number | string,
): string | undefined {
    return categoryId in wikiDetailSources
        ? `/wiki/${categoryId}/${id}`
        : undefined;
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
        href: detailHref("modifiers", modifier.id),
    };
}

function normalizeText(text: string): string {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}

// A recompensa da fase só traz texto/quantidade/sprite — não tem o id do
// caixote. Então a ligação é feita pelo nome: primeiro igualdade exata e,
// se não achar, o caixote cujo nome aparece dentro do texto da recompensa
// (o de nome mais longo vence). Sem correspondência, não vira link.
function findBoxForReward<T extends { id: number; name: string }>(
    rewardText: string,
    boxes: T[],
): T | undefined {
    const target = normalizeText(rewardText);

    const exact = boxes.find((box) => normalizeText(box.name) === target);
    if (exact) return exact;

    return boxes
        .filter((box) => target.includes(normalizeText(box.name)))
        .sort((a, b) => b.name.length - a.name.length)[0];
}

// Só as categorias listadas aqui têm página de detalhes — Skins e
// Partículas ficaram de fora de propósito (ver WikiItemCard, que usa esse
// mesmo registro pra decidir se o card deve ou não virar um link).
export const wikiDetailSources: Record<string, WikiDetailSource> = {
    paddles: {
        getDetail: async (id) => {
            const [paddle, combos] = await Promise.all([
                paddlesCache.getById(id, (item) => item.id),
                paddleSkinsCache.getAll(),
            ]);

            if (!paddle) {
                throw new ApiError(404, "Item não encontrado.");
            }

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
            const ultimate = await ultimatesCache.getById(
                id,
                (item) => item.id,
            );

            if (!ultimate) {
                throw new ApiError(404, "Item não encontrado.");
            }

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
            const box = await boxesCache.getById(id, (item) => item.id);

            if (!box) {
                throw new ApiError(404, "Item não encontrado.");
            }

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
            const modifier = await modifiersCache.getById(
                id,
                (item) => item.id,
            );

            if (!modifier) {
                throw new ApiError(404, "Item não encontrado.");
            }

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
            const [stage, boxes] = await Promise.all([
                stagesCache.getById(id, (item) => item.id),
                boxesCache.getAll().catch((): ApiBox[] => []),
            ]);

            if (!stage) {
                throw new ApiError(404, "Item não encontrado.");
            }

            // A raquete não tem sprite próprio; a imagem dela vem da
            // combinação raquete+skin. skinBot.sprite já é essa combinação
            // (a skin aplicada na raquete do bot). Se a fase não tiver
            // skin, usa a primeira combinação que existir pra raquete.
            let paddleImage = stage.skinBot?.sprite;

            if (!paddleImage && stage.paddleBot) {
                const paddleId = String(stage.paddleBot.id);
                const combos = await paddleSkinsCache
                    .getAll()
                    .catch((): ApiPaddleSkin[] => []);

                paddleImage = combos.find(
                    (combo) => String(combo.paddleId) === paddleId,
                )?.sprite;
            }

            // Cada sub-item pode vir null (ex.: a Fase 1/tutorial não tem
            // todos preenchidos) — por isso cada um só entra na lista se
            // realmente existir, em vez de acessar .name direto.
            const relatedCards: WikiDetailCard[] = [];

            if (stage.paddleBot) {
                relatedCards.push({
                    label: "Raquete do Bot",
                    name: stage.paddleBot.name,
                    image: paddleImage,
                    href: detailHref("paddles", stage.paddleBot.id),
                });
            }

            if (stage.skinBot) {
                relatedCards.push({
                    label: "Skin do Bot",
                    name: stage.skinBot.name,
                    image: stage.skinBot.sprite,
                    href: detailHref("skins", stage.skinBot.id),
                });
            }

            if (stage.ultimateBot) {
                relatedCards.push({
                    label: "Ultimate do Bot",
                    name: stage.ultimateBot.name,
                    image: stage.ultimateBot.sprite,
                    href: detailHref("ultimates", stage.ultimateBot.id),
                });
            }

            if (stage.particleBot) {
                relatedCards.push({
                    label: "Partícula do Bot",
                    name: stage.particleBot.name,
                    image: stage.particleBot.sprite,
                    href: detailHref("particles", stage.particleBot.id),
                });
            }

            if (stage.reward) {
                const rewardBox = findBoxForReward(stage.reward.text, boxes);

                relatedCards.push({
                    label: "Recompensa",
                    name: `${stage.reward.text} (x${stage.reward.quantity})`,
                    image: stage.reward.sprite,
                    href: rewardBox
                        ? detailHref("boxes", rewardBox.id)
                        : undefined,
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
                image: paddleImage,
                infoFields,
                relatedCards,
            };
        },
    },
};