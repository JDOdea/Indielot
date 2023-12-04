import { useEffect } from "react";
export const useOutsideAlerter = (ref, onClickOutsideFn) => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                if (onClickOutsideFn) {
                    onClickOutsideFn();
                };
            };
        };

        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, onClickOutsideFn]);
};