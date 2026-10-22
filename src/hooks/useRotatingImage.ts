import { useEffect, useState } from "react";

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

// Alterna aleatoriamente entre as imagens fornecidas a cada 5s (usado
// pelas Raquetes, alternando as skins aplicadas, e pelas Skins,
// alternando as raquetes que a usam) — tanto nos cards da Wiki quanto na
// página de detalhes do item.
export function useRotatingImage(images: string[]): string | undefined {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (images.length < 2) return;

        const intervalId = setInterval(() => {
            setIndex((previous) => pickNextIndex(images.length, previous));
        }, ROTATION_INTERVAL_MS);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images.length]);

    return images[index];
}