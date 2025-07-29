import { useCallback, useEffect } from "react";

export const useClickOutside = (ref: React.RefObject<HTMLDivElement | null>, callback: () => void, menuOpened: boolean) => {
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (ref?.current && !ref.current.contains(event.target as Node)) {
            callback();
        }
    }, [ref, callback]);

    useEffect(() => {
        if (menuOpened) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside, menuOpened]);
};