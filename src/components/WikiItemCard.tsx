import { Link } from "react-router";
import { wikiDetailSources } from "../data/WikiItemDetails";
import { useRotatingImage } from "../hooks/useRotatingImage";
import type { WikiItem } from "../types/Wiki";
import "./WikiItemCard.css";

interface WikiItemCardProps {
    item: WikiItem;
    categoryId: string;
}

export default function WikiItemCard({ item, categoryId }: WikiItemCardProps) {
    const images =
        item.images && item.images.length > 0
            ? item.images
            : item.image
              ? [item.image]
              : [];

    const currentImage = useRotatingImage(images);

    const content = (
        <>
            {currentImage ? (
                <img
                    className="wiki-card-image"
                    src={currentImage}
                    alt={item.name}
                    loading="lazy"
                />
            ) : (
                <span className="wiki-card-image" aria-hidden="true" />
            )}
            <span className="wiki-card-name">{item.name}</span>
        </>
    );

    // Skins e Partículas não têm página de detalhes — o card fica só
    // exibindo a imagem/nome, sem link e sem efeito de clique.
    const hasDetailPage = categoryId in wikiDetailSources;

    if (!hasDetailPage) {
        return <div className="wiki-card wiki-card-static">{content}</div>;
    }

    return (
        <Link className="wiki-card" to={`/wiki/${categoryId}/${item.id}`}>
            {content}
        </Link>
    );
}