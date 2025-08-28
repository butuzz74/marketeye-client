import { useEffect, useRef } from "react";

export function useAutoScroll<T>(deps: T[] | null) {
    const endRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [deps]);

    return endRef;
}
