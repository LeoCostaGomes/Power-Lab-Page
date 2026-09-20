import NavBar from "../components/NavBar";
import "./home.css";

export default function Home() {
    return (
        <>
            <NavBar />

            <main>
                <section className="ContentBox Trailer">
                    <h2>Trailer</h2>

                    <div className="video-wrapper">
                        <iframe
                            src="https://www.youtube.com/embed/rGd3koiuEG8"
                            title="Trailer do jogo"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </section>

                <section className="ContentBox">
                    <h2>Sobre o Jogo</h2>

                    <p>
                        O objetivo do jogador é impedir que a bola entre no seu
                        gol e, ao mesmo tempo, marcar ponto no seu adversário.
                        Para isso, o jogo oferece diversos tipos de raquetes
                        com poderes especiais, habilidades únicas e muitas
                        opções de customização, permitindo que cada jogador
                        crie seu próprio estilo de jogo.
                    </p>

                    <p>
                        Avance pelas fases, colete recompensas e desbloqueie
                        novos poderes e habilidades.
                    </p>

                    <p>
                        Power Pong é totalmente offline, perfeito para jogar a
                        qualquer momento, sem precisar de internet.
                    </p>

                    <p>
                        Um jogo retrô, dinâmico e desafiador para quem curte
                        arcade, pixel art e progressão constante.
                    </p>

                    <div className="download-wrapper">
                        <button
                            type="button"
                            className="download-btn"
                            title="Em breve"
                        >
                            Download
                        </button>
                    </div>
                </section>

                <section className="ContentBox Gallery">
                    <h2>Galeria</h2>

                    <div className="gallery-grid">
                        <div className="gallery-box"></div>
                        <div className="gallery-box"></div>
                        <div className="gallery-box"></div>
                        <div className="gallery-box"></div>
                        <div className="gallery-box"></div>
                        <div className="gallery-box"></div>
                    </div>
                </section>
            </main>

            <footer className="SocialFooter">
                <a
                    className="social-box"
                    href="https://www.youtube.com/@Leonardogamedev/videos"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                >
                    <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M23.5 6.2c-.3-1.1-1.1-1.9-2.2-2.2C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.3.5c-1.1.3-1.9 1.1-2.2 2.2C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1.1 1.1 1.9 2.2 2.2 1.9.5 9.3.5 9.3.5s7.4 0 9.3-.5c1.1-.3 1.9-1.1 2.2-2.2.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.5V8.5l6.3 3.5-6.3 3.5z" />
                    </svg>
                </a>

                <a
                    className="social-box"
                    href="https://www.instagram.com/leonardo_gamedev"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                >
                    <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.4.6.2 1 .5 1.4.9.4.4.7.9.9 1.4.2.4.4 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.4 2.3-.2.6-.5 1-.9 1.4-.4.4-.9.7-1.4.9-.4.2-1.1.4-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.9-.9-1.4-.2-.4-.4-1.1-.4-2.3-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.9.4-2.3.2-.2.4-.4.8-.8.4-.4.7-.6 1.2-.8.3-.1.9-.3 1.9-.4 1.2-.1 1.6-.1 4.7-.1zm0 1.8c-3.1 0-3.5 0-4.7.1-1 .1-1.6.2-1.9.4-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.1.3-.3.9-.4 1.9-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1 .2 1.6.4 1.9.2.5.4.8.8 1.2.4.4.7.6 1.2.8.3.1.9.3 1.9.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.2 1.9-.4.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.1-.3.3-.9.4-1.9.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.6-.4-1.9-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.3-.1-.9-.3-1.9-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm5.1-2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
                    </svg>
                </a>

                <a
                    className="social-box"
                    href="https://www.tiktok.com/@leonardo.game.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                >
                    <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M16.6 5.8c-.9-.9-1.4-2.1-1.4-3.4h-3.2v13.1c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .6 0 .8.1V9.6c-.3 0-.5-.1-.8-.1-3.2 0-5.8 2.6-5.8 5.8S6.9 21.1 10.1 21.1s5.8-2.6 5.8-5.8V9.1c1.2.9 2.7 1.4 4.2 1.4V7.3c-1.3 0-2.4-.6-3.5-1.5z" />
                    </svg>
                </a>
            </footer>
        </>
    );
}