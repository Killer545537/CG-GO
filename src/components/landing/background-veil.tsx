import { useEffect, useState } from 'react';
import DarkVeil from './DarkVeil';

export function BackgroundVeil() {
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        );
        setReduceMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    if (reduceMotion) {
        return (
            <div className='fixed inset-0 -z-10 bg-linear-to-b from-neutral-900 to-neutral-950 pointer-events-none' />
        );
    }

    return (
        <>
            <div className='fixed inset-0 -z-10 bg-neutral-950 pointer-events-none' />
            <div className='fixed inset-0 -z-10 opacity-60 pointer-events-none'>
                <DarkVeil speed={2.5} />
            </div>
        </>
    );
}
