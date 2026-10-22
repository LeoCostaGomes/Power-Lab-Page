import { Link } from "react-router";
import "./WikiItemCard.css";
import "./RelatedItemCard.css";

interface RelatedItemCardProps {
    label: string;
    name: string;
    image?: string;
    href?: string;
}

// Reaproveita as classes visuais do WikiItemCard (.wiki-card /
// .wiki-card-image / .wiki-card-name) — é um Link quando há href (ex.:
// raquete do bot, que leva pra página da raquete), ou só um div estático
// quando não há pra onde navegar (ex.: a recompensa de uma fase).
export default function RelatedItemCard({
    label,
    name,
    image,
    href,
}: RelatedItemCardProps) {
    const content = (
        <>
            <span className="related-card-label">{label}</span>
            {image ? (
                <img
                    className="wiki-card-image"
                    src={image}
                    alt={name}
                    loading="lazy"
                />
            ) : (
                <span className="wiki-card-image" aria-hidden="true" />
            )}
            <span className="wiki-card-name">{name}</span>
        </>
    );

    if (href) {
        return (
            <Link className="wiki-card related-card" to={href}>
                {content}
            </Link>
        );
    }

    return <div className="wiki-card related-card">{content}</div>;
}