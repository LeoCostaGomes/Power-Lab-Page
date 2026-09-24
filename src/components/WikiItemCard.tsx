import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { WikiItem } from "../types/Wiki";
import "./WikiItemCard.css";

// Intervalo de troca de sprite pros itens com mais de uma imagem
// (Raquetes alternando skin, Skins alternando raquete).
const ROTATION_INTERVAL_MS = 5000;

// Sorteia um índice diferente do atual, pra nunca repetir a mesma imagem
// duas vezes seguidas.
function pickNextIndex(length: number, currentIndex: number): number {
    if (length < 2) return 0;

    let nextIndex = Math.floor(Math.random() * length);
    if (nextIndex === currentIndex) {
        nextIndex = (nextIndex + 1) % length;
    }
    return nextIndex;
}

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
            setImageIndex((previous) =>
                pickNextIndex(images.length, previous),
            );
        }, ROTATION_INTERVAL_MS);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images.length]);

    const currentImage = images[imageIndex];

    // TODO: ajustar a rota quando a página de detalhes do item existir.
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