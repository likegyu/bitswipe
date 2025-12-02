import React from 'react';

export const JsonLd = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Bitswipe",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Bitswipe is a risk-free crypto trading simulation game. Practice reading candle charts, predict price flows, and sharpen your instincts.",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250"
        },
        "keywords": "Bitcoin Trading Game, Crypto Simulation, Bitcoin Futures, Chart Reading, Technical Analysis"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};
