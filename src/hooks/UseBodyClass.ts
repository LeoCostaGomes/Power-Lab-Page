import { useEffect } from "react";

// Nomeado em minúsculo de propósito: hooks do React precisam começar com
// "use" em minúsculo pra serem reconhecidos como hooks (regra do React,
// não uma inconsistência de maiúscula/minúscula do projeto).
export function useBodyClass(className: string) {
    useEffect(() => {
        document.body.classList.add(className);

        return () => {
            document.body.classList.remove(className);
        };
    }, [className]);
}