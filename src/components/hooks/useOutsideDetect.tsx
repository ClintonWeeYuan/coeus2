import { FC, ReactNode, RefObject, useEffect, useRef } from 'react';

const useOutsideAlerter = (
    ref: RefObject<HTMLElement>,
    callback: () => void,
) => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};

/**
 * Component that alerts if you click outside of it
 */

interface Props {
    children: ReactNode;
    callback: () => void;
}
const OutsideDetecter: FC<Props> = ({ children, callback }) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, callback);

    return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideDetecter;
