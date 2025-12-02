import React from 'react';

interface BreadcrumbItem {
    name: string;
    item: string;
}

interface BreadcrumbJsonLdProps {
    items: BreadcrumbItem[];
}

export const BreadcrumbJsonLd = ({ items }: BreadcrumbJsonLdProps) => {
    const breadcrumbItems = items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.item
    }));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};
