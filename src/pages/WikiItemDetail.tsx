import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ApiError } from "../api/Client";
import Multiline from "../components/Multiline";
import NavBar from "../components/NavBar";
import RelatedItemCard from "../components/RelatedItemCard";
import {
    wikiDetailSources,
    type WikiItemDetailViewModel,
} from "../data/WikiItemDetails";
import { useRotatingImage } from "../hooks/useRotatingImage";
import "./WikiItemDetail.css";

type Status = "loading" | "success" | "error" | "not-found";

function ItemImageAside({ detail }: { detail: WikiItemDetailViewModel }) {
    const images =
        detail.images && detail.images.length > 0
            ? detail.images
            : detail.image
              ? [detail.image]
              : [];

    const currentImage = useRotatingImage(images);

    return (
        <aside
            className="ContentBox ItemInfo"
            aria-label="Informações do item"
        >
            <div className="item-image">
                {currentImage && (
                    <img src={currentImage} alt={detail.title} />
                )}
            </div>

            <div className="item-info-list">
                <div className="item-info-row">
                    <span className="item-info-label">Nome</span>
                    <span className="item-info-value">{detail.title}</span>
                </div>

                {detail.infoFields.map((field) => (
                    <div className="item-info-row" key={field.label}>
                        <span className="item-info-label">
                            {field.label}
                        </span>
                        <span className="item-info-value">
                            <Multiline text={field.value} />
                        </span>
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default function WikiItemDetail() {
    const { categoryId = "", itemId = "" } = useParams();

    const [status, setStatus] = useState<Status>("loading");
    const [detail, setDetail] = useState<WikiItemDetailViewModel | null>(
        null,
    );
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const source = wikiDetailSources[categoryId];
        if (!source) {
            setStatus("not-found");
            return;
        }

        let cancelled = false;
        setStatus("loading");

        source
            .getDetail(itemId)
            .then((result) => {
                if (cancelled) return;
                setDetail(result);
                setStatus("success");
            })
            .catch((error: unknown) => {
                if (cancelled) return;

                if (error instanceof ApiError && error.status === 404) {
                    setStatus("not-found");
                    return;
                }

                setErrorMessage(
                    error instanceof Error
                        ? error.message
                        : "Não foi possível carregar este item.",
                );
                setStatus("error");
            });

        return () => {
            cancelled = true;
        };
    }, [categoryId, itemId]);

    useEffect(() => {
        if (detail) {
            document.title = `PowerLab - ${detail.title}`;
        }
    }, [detail]);

    return (
        <>
            <NavBar />

            <main className="ItemPage">
                {status === "loading" && (
                    <p className="ContentBox item-status-message">
                        Carregando...
                    </p>
                )}

                {status === "not-found" && (
                    <p className="ContentBox item-status-message">
                        Esse item não foi encontrado.
                    </p>
                )}

                {status === "error" && (
                    <p className="ContentBox item-status-message error">
                        {errorMessage}
                    </p>
                )}

                {status === "success" && detail && (
                    <>
                        <ItemImageAside detail={detail} />

                        <div className="item-main">
                            {detail.description && (
                                <section className="ContentBox">
                                    <h2>Descrição</h2>
                                    <p>
                                        <Multiline
                                            text={detail.description}
                                        />
                                    </p>
                                </section>
                            )}

                            {detail.relatedCards.length > 0 && (
                                <section className="ContentBox">
                                    <h2>Detalhes Relacionados</h2>
                                    <div className="related-grid">
                                        {detail.relatedCards.map(
                                            (card, index) => (
                                                <RelatedItemCard
                                                    key={index}
                                                    {...card}
                                                />
                                            ),
                                        )}
                                    </div>
                                </section>
                            )}

                            {detail.listSection && (
                                <section className="ContentBox">
                                    <h2>{detail.listSection.title}</h2>
                                    <div className="reward-list">
                                        {detail.listSection.items.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="reward-list-item"
                                                >
                                                    {item}
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </section>
                            )}
                        </div>
                    </>
                )}
            </main>
        </>
    );
}