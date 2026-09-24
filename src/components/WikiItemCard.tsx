import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { WikiItem } from "../types/Wiki";
import "./WikiItemCard.css";

// Intervalo de troca de sprite pros itens com mais de uma imagem
// (Raquetes alternando skin, Skins alternando raquete).
const ROTATION_INTERVAL_MS = 5000;

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

    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        if (images.length < 2) return;

        const intervalId = setInterval(() => {
            setImageIndex((previous) => (previous + 1) % images.length);
        }, ROTATION_INTERVAL_MS);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images.length]);

    const currentImage = images[imageIndex];

    // TODO: ajustar a rota quando a página de detalhes do item existir.
    return (
        <Link className="wiki-card" to={`/wiki/${categoryId}/${item.id}`}>
            <span
                className="wiki-card-image"
                aria-hidden="true"
                style={
                    currentImage
                        ? { backgroundImage: `url(${currentImage})` }
                        : undefined
                }
            />
            <span className="wiki-card-name">{item.name}</span>
        </Link>
    );
}