import { useState } from "react";
import NavBar from "../components/NavBar";
import WikiCategoryNav from "../components/WikiCategoryNav";
import WikiItemCard from "../components/WikiItemCard";
import WikiInfoCard from "../components/WikiInfoCard";
import { wikiCategories } from "../data/wikiCategories";
import type { WikiItem } from "../types/Wiki";
import "./Wiki.css";

// TODO: substituir pelos dados vindos da API (ex.: buscados em um
// useEffect a partir do id da categoria ativa, ou todos de uma vez aqui).
// Cada chave é o id de uma categoria (veja src/data/wikiCategories.ts).
const wikiItemsByCategory: Record<string, WikiItem[]> = {
    paddles: [],
    ultimates: [],
    skins: [],
    particles: [],
    boxes: [],
    modifiers: [],
    gameModes: [],
    matchObjectives: [],
    gameVersions: [],
    stages: [],
};

export default function Wiki() {
    const [activeCategoryId, setActiveCategoryId] = useState(
        wikiCategories[0].id,
    );

    const activeCategory = wikiCategories.find(
        (category) => category.id === activeCategoryId,
    )!;
    const items = wikiItemsByCategory[activeCategoryId] ?? [];

    return (
        <>
            <NavBar />

            <main>
                <section className="ContentBox WikiHome">
                    <div className="wiki-title-bar">Wiki</div>

                    <div className="wiki-app">
                        <WikiCategoryNav
                            categories={wikiCategories}
                            activeCategoryId={activeCategoryId}
                            onSelectCategory={setActiveCategoryId}
                        />

                        <div className="wiki-content">
                            {items.length === 0 ? (
                                <p className="wiki-empty-message">
                                    Ainda não há {activeCategory.label} cadastrado(a)s
                                    no banco de dados. Assim que forem cadastrados,
                                    aparecerão aqui.
                                </p>
                            ) : activeCategory.variant === "grid" ? (
                                <div className="wiki-grid">
                                    {items.map((item) => (
                                        <WikiItemCard
                                            key={item.id}
                                            item={item}
                                            categoryId={activeCategory.id}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="wiki-list">
                                    {items.map((item) => (
                                        <WikiInfoCard key={item.id} item={item} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}