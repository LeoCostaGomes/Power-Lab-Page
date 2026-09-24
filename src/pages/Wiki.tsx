import { useCallback, useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import WikiCategoryNav from "../components/WikiCategoryNav";
import WikiItemCard from "../components/WikiItemCard";
import WikiInfoCard from "../components/WikiInfoCard";
import { wikiCategories } from "../data/WikiCategories";
import { wikiSources } from "../data/WikiSources";
import { ApiError } from "../api/Client";
import type { WikiItem } from "../types/Wiki";
import "./Wiki.css";

type CategoryStatus = "loading" | "success" | "error";

export default function Wiki() {
    const [activeCategoryId, setActiveCategoryId] = useState(
        wikiCategories[0].id,
    );
    const [itemsByCategory, setItemsByCategory] = useState<
        Record<string, WikiItem[]>
    >({});
    const [statusByCategory, setStatusByCategory] = useState<
        Record<string, CategoryStatus>
    >({});
    const [errorByCategory, setErrorByCategory] = useState<
        Record<string, string>
    >({});

    // Evita buscar a mesma categoria de novo toda vez que ela é selecionada.
    const fetchedCategoriesRef = useRef<Set<string>>(new Set());

    const loadCategory = useCallback((categoryId: string) => {
        const source = wikiSources[categoryId];
        if (!source) return;

        fetchedCategoriesRef.current.add(categoryId);
        setStatusByCategory((prev) => ({ ...prev, [categoryId]: "loading" }));
        setErrorByCategory((prev) => {
            const next = { ...prev };
            delete next[categoryId];
            return next;
        });

        source
            .fetchItems()
            .then((items) => {
                setItemsByCategory((prev) => ({
                    ...prev,
                    [categoryId]: items,
                }));
                setStatusByCategory((prev) => ({
                    ...prev,
                    [categoryId]: "success",
                }));
            })
            .catch((error: unknown) => {
                const message =
                    error instanceof ApiError
                        ? error.message
                        : "Não foi possível carregar esses dados agora.";

                setErrorByCategory((prev) => ({
                    ...prev,
                    [categoryId]: message,
                }));
                setStatusByCategory((prev) => ({
                    ...prev,
                    [categoryId]: "error",
                }));
            });
    }, []);

    useEffect(() => {
        if (fetchedCategoriesRef.current.has(activeCategoryId)) return;
        loadCategory(activeCategoryId);
    }, [activeCategoryId, loadCategory]);

    const activeCategory = wikiCategories.find(
        (category) => category.id === activeCategoryId,
    )!;
    const status = statusByCategory[activeCategoryId];
    const items = itemsByCategory[activeCategoryId] ?? [];
    const errorMessage = errorByCategory[activeCategoryId];

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
                            {status === "loading" || status === undefined ? (
                                <p className="wiki-status-message">
                                    Carregando {activeCategory.label.toLowerCase()}
                                    ...
                                </p>
                            ) : status === "error" ? (
                                <div className="wiki-status-message error">
                                    <p>{errorMessage}</p>
                                    <button
                                        type="button"
                                        className="wiki-retry-btn"
                                        onClick={() =>
                                            loadCategory(activeCategoryId)
                                        }
                                    >
                                        Tentar de novo
                                    </button>
                                </div>
                            ) : items.length === 0 ? (
                                <p className="wiki-status-message">
                                    Ainda não há{" "}
                                    {activeCategory.label.toLowerCase()}{" "}
                                    cadastrado(a)s no banco de dados.
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
                                        <WikiInfoCard
                                            key={item.id}
                                            item={item}
                                        />
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