<?php

declare(strict_types=1);

/**
 * The five official INWORA products.
 * Served by the PHP backend (/api/products) to the React frontend — used by
 * both the Hero product panel and the #products slider.
 */
return [
    [
        'slug'           => 'inwora-daily-gold',
        'title'          => 'Inwora Daily Gold',
        'subtitle'       => 'Gold-rate poster & daily creatives app',
        'badge'          => 'Poster Automation',
        'tagline'        => 'Gold-rate posters & daily creatives',
        'description'    => 'A mobile app & subscription platform for creating gold & silver rate posters and promotional graphics. Generate professional visuals in seconds.',
        'icon'           => 'Image',
        'image'          => '',
        'live_url'       => 'https://gold.inwora.com',
        'play_store_url' => 'https://play.google.com/store/apps/details?id=com.kirtheeshh.usermobile&pli=1',
        'is_featured'    => 0,
        'features'       => [
            'Official Android app on Google Play',
            'Automated gold & silver rate templates',
            'Fast poster creation engine',
            'Brand logo & shop customization',
        ],
    ],
    [
        'slug'           => 'pos-kot-software',
        'title'          => 'POS & KOT Software',
        'subtitle'       => 'Restaurants, billing & order workflows',
        'badge'          => 'Restaurant SaaS',
        'tagline'        => 'Restaurant billing & kitchen orders',
        'description'    => 'A live SaaS subscription POS & Kitchen Order Ticket system for restaurants, cafes, and retail counters. Streamline orders and billing in real time.',
        'icon'           => 'Monitor',
        'image'          => '',
        'live_url'       => 'https://kot.nexoraapp.in/',
        'play_store_url' => null,
        'is_featured'    => 1,
        'features'       => [
            'Real-time order management',
            'Kitchen display system (KOT)',
            'Multi-counter support',
            'Sales reports & analytics',
        ],
    ],
    [
        'slug'           => 'whatsapp-crm',
        'title'          => 'WhatsApp CRM',
        'subtitle'       => 'Scheduled bulk messaging & tag-based campaigns',
        'badge'          => 'Marketing CRM',
        'tagline'        => 'Scheduled bulk messaging by tag',
        'description'    => 'A CRM built for WhatsApp outreach — send bulk messages on a schedule, segmented by contact tags, so the right audience hears from you at the right time.',
        'icon'           => 'Send',
        'image'          => '',
        'live_url'       => null,
        'play_store_url' => null,
        'is_featured'    => 0,
        'features'       => [
            'Bulk message broadcasting',
            'Schedule campaigns in advance',
            'Tag-based audience segmentation',
            'Contact & conversation management',
        ],
    ],
    [
        'slug'           => 'construction-management',
        'title'          => 'Construction Management',
        'subtitle'       => 'Site accounts & operations in a single step',
        'badge'          => 'Site Operations',
        'tagline'        => 'Site accounts & every movement in one step',
        'description'    => 'Manage every construction site account and track each movement from one place. Materials, labour, expenses and progress stay in sync across all your sites.',
        'icon'           => 'HardHat',
        'image'          => '',
        'live_url'       => 'https://construction.inwora.com',
        'play_store_url' => null,
        'is_featured'    => 0,
        'features'       => [
            'Centralised site account management',
            'Track every material & fund movement',
            'Labour & expense records per site',
            'Real-time progress across all sites',
        ],
    ],
    [
        'slug'           => 'factory-management',
        'title'          => 'Factory Management',
        'subtitle'       => 'Raw material to dispatch in one click',
        'badge'          => 'Production Ops',
        'tagline'        => 'Raw material to packing & dispatch',
        'description'    => 'Record the full production flow — from raw material intake through manufacturing to product packing and final dispatch — in a single click.',
        'icon'           => 'Factory',
        'image'          => '',
        'live_url'       => null,
        'play_store_url' => null,
        'is_featured'    => 0,
        'features'       => [
            'Raw material inventory tracking',
            'Production & packing workflow',
            'One-click dispatch entries',
            'Stock & output reporting',
        ],
    ],
];
