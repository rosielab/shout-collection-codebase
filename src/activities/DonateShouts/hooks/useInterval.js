// This hook is made using the following tutorial
// https://blog.bitsrc.io/polling-in-react-using-the-useinterval-custom-hook-e2bcefda4197
import { useEffect, useRef } from 'react';

export const useInterval = (callback, delay, flag) => {
    const savedCallback = useRef();

    useEffect(() => {
        if (flag) {
            savedCallback.current = callback;
        }
    }, [callback, flag]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (flag) {
            if (delay !== null) {
                const id = setInterval(tick, delay);
                return () => {
                    clearInterval(id);
                };
            }
        }
    }, [callback, delay, flag]);
};
