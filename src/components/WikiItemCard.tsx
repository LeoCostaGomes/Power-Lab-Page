import { Link } from "react-router";
import type { WikiItem } from "../types/Wiki";
import "./WikiItemCard.css";

interface WikiItemCardProps {
    item: WikiItem;
    categoryId: string;
}

export default function WikiItemCard({ item, categoryId }: WikiItemCardProps) {
    // TODO: ajustar a rota quando a página de detalhes do item existir.
    return (
        <Link className="wiki-card" to={`/wiki/${categoryId}/${item.id}`}>
            <span
                className="wiki-card-image"
                aria-hidden="true"
                style={
                    item.image
                        ? { backgroundImage: `url(${item.image})` }
                        : undefined
                }
            />
            <span className="wiki-card-name">{item.name}</span>
        </Link>
    );
}