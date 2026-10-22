import { Link } from "react-router";
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

    return (
        <Link className="wiki-card" to={`/wiki/${categoryId}/${item.id}`}>
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
        </Link>
    );
}