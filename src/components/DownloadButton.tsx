import "./DownloadButton.css";

// Link da versão de testes no Google Play (o id termina em ".test").
// Quando o app oficial for publicado, é só trocar aqui.
const PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?id=com.leonardocosta.powerpong.test";

export default function DownloadButton() {
    return (
        <div className="download-cta">
            <a
                className="download-cta-btn"
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Baixar o Power Pong no Google Play (abre em uma nova aba)"
            >
                {/* Triângulo de "play" em degraus, pra combinar com a pixel art */}
                <svg
                    className="download-cta-icon"
                    viewBox="0 0 10 13"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path d="M2 1h1v1h1v1h1v1h1v1h1v1h1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1z" />
                </svg>

                <span className="download-cta-text">
                    <span className="download-cta-label">Download</span>
                    <span className="download-cta-store">Google Play</span>
                </span>
            </a>
        </div>
    );
}