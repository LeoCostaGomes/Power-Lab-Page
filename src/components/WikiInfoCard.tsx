import type { WikiItem } from "../types/Wiki";
import "./WikiInfoCard.css";

interface WikiInfoCardProps {
    item: WikiItem;
}

// Card largo, um item por linha, sem link — usado nas categorias que não
// têm página de detalhes própria (a descrição já fica aqui, na Wiki).
export default function WikiInfoCard({ item }: WikiInfoCardProps) {
    return (
        <div className="wiki-info-card">
            <span className="wiki-info-card-name">{item.name}</span>

            {item.description && (
                <p className="wiki-info-card-description">
                    {item.description}
                </p>
            )}
        </div>
    );
}