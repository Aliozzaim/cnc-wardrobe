'use client';

import { useEffect } from 'react';

interface GoogleAnalyticsProps {
    measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
    useEffect(() => {
        // Only load GA if we have a valid measurement ID
        if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
            return;
        }

        // Load gtag script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(...args: unknown[]) {
            window.dataLayer.push(args);
        };
        window.gtag('js', new Date());
        window.gtag('config', measurementId);

        return () => {
            // Cleanup script on unmount
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, [measurementId]);

    return null;
}

// Extend Window interface for TypeScript
declare global {
    interface Window {
        dataLayer: unknown[][];
        gtag: (...args: unknown[]) => void;
    }
}
