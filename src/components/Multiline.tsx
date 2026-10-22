interface MultilineProps {
    text: string;
}

// O HTML colapsa \r, \n e \r\n em um espaço só por padrão — este
// componente quebra o texto nessas marcas e insere <br /> de verdade entre
// as linhas. Usar em QUALQUER lugar que exiba texto vindo da API que possa
// ter quebras de linha (changeLog de versão, descrição de modo de jogo,
// objetivo, modificador, etc.), não só onde já é usado hoje.
export default function Multiline({ text }: MultilineProps) {
    const lines = text.replace(/\r\n|\r/g, "\n").split("\n");

    return (
        <>
            {lines.map((line, index) => (
                <span key={index}>
                    {line}
                    {index < lines.length - 1 && <br />}
                </span>
            ))}
        </>
    );
}