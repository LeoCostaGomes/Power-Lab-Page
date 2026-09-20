import type { WikiCategory } from "../types/Wiki";
import "./WikiCategoryNav.css";

interface WikiCategoryNavProps {
    categories: WikiCategory[];
    activeCategoryId: string;
    onSelectCategory: (categoryId: string) => void;
}

export default function WikiCategoryNav({
    categories,
    activeCategoryId,
    onSelectCategory,
}: WikiCategoryNavProps) {
    return (
        <nav className="wiki-nav" aria-label="Categorias da Wiki">
            {categories.map((category) => {
                const isActive = category.id === activeCategoryId;

                return (
                    <button
                        key={category.id}
                        type="button"
                        className={
                            "wiki-nav-item" + (isActive ? " active" : "")
                        }
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => onSelectCategory(category.id)}
                    >
                        {category.icon && (
                            <svg
                                className="wiki-nav-item-icon"
                                aria-hidden="true"
                            >
                                <use href={`/icons.svg#${category.icon}`} />
                            </svg>
                        )}
                        <span>{category.label}</span>
                    </button>
                );
            })}
        </nav>
    );
}