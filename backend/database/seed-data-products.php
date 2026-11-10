<?php

declare(strict_types=1);

/**
 * The five official INWORA products.
 * Served by the PHP backend (/api/products) to the React frontend — used by
 * both the Hero product panel and the #products slider.
 */
return [
    [
        'slug'           => 'gold-application',
        'title'          => 'Gold Application',
        'subtitle'       => 'Gold-rate poster & daily showroom creatives automation',
        'badge'          => 'Gold Tech Automation',
        'tagline'        => 'Daily live rate posters & jeweler marketing',
        'description'    => 'Specialized mobile app and subscription platform for jewelry showrooms. Automatically synchronizes live gold and silver market rates onto luxury promotional posters and social media creatives.',
        'icon'           => 'Image',
        'image'          => '/assets/projects/gold-poster.jpg',
        'banners'        => [
            '/assets/projects/gold-poster.jpg',
            '/assets/projects/gold-poster-slide2.jpg',
            '/assets/projects/gold-poster-slide3.jpg',
        ],
        'live_url'       => 'https://gold.inwora.com',
        'play_store_url' => 'https://play.google.com/store/apps/details?id=com.kirtheeshh.usermobile&pli=1',
        'is_featured'    => 0,
        'features'       => [
            'Official Android app on Google Play',
            'Automated gold & silver daily market rate sync',
            'Luxury branded showroom poster templates',
            'One-click WhatsApp Status & Instagram export',
        ],
    ],
    [
        'slug'           => 'construction-erp',
        'title'          => 'Construction ERP',
        'subtitle'       => 'Site accounts, materials & contractor tracking',
        'badge'          => 'Construction SaaS',
        'tagline'        => 'Site accounts, materials & labour management',
        'description'    => 'End-to-end cloud ERP for construction contractors and infrastructure developers. Centralize site expense accounts, material requisitions, labour muster rolls, and multi-site project milestones.',
        'icon'           => 'HardHat',
        'image'          => '/assets/projects/construction-crm.jpg',
        'banners'        => [
            '/assets/projects/construction-crm.jpg',
            '/assets/projects/construction-management-slide2.jpg',
            '/assets/projects/construction-crm.png',
        ],
        'live_url'       => 'https://construction.inwora.com',
        'play_store_url' => null,
        'is_featured'    => 0,
        'features'       => [
            'Multi-site account & cash movement tracking',
            'Material requisition & site inventory control',
            'Subcontractor billing & daily labour muster logs',
            'Real-time project milestone progress tracking',
        ],
    ],
    [
        'slug'           => 'unified-business-erp',
        'title'          => 'Unified Business ERP',
        'subtitle'       => 'Integrated finance, inventory, sales & HR operations',
        'badge'          => 'Enterprise ERP',
        'tagline'        => 'Unified operations, finance & workflow control',
        'description'    => 'All-in-one cloud ERP system engineered to unify multi-channel sales billing, warehouse inventory, GST accounting, customer workflows, and staff management into a single centralized command center.',
        'icon'           => 'Boxes',
        'image'          => '/assets/projects/unified-business-erp.jpg',
        'banners'        => [
            '/assets/projects/unified-business-erp.jpg',
            '/assets/projects/unified-business-erp-slide2.jpg',
            '/assets/projects/unified-business-erp-slide3.jpg',
        ],
        'live_url'       => null,
        'play_store_url' => null,
        'is_featured'    => 0,
        'features'       => [
            'Centralized inventory & multi-warehouse tracking',
            'GST-compliant billing & accounting workflows',
            'Order-to-cash & procurement management',
            'Executive financial & sales analytics dashboards',
        ],
    ],
    [
        'slug'           => 'pos-kot',
        'title'          => 'POS & KOT',
        'subtitle'       => 'Restaurants, billing & kitchen order workflows',
        'badge'          => 'Restaurant & Retail SaaS',
        'tagline'        => 'Fast restaurant billing & kitchen orders',
        'description'    => 'High-speed point-of-sale and kitchen order ticket (KOT) system for restaurants, cafes, food trucks, and retail counters. Cloud-synchronized billing with live table layout and kitchen display routing.',
        'icon'           => 'Monitor',
        'image'          => '/assets/projects/pos-kot.jpg',
        'banners'        => [
            '/assets/projects/pos-kot.jpg',
            '/assets/projects/pos-kot-slide2.jpg',
            '/assets/projects/pos-kot-slide3.jpg',
        ],
        'live_url'       => null,
        'play_store_url' => null,
        'is_featured'    => 1,
        'features'       => [
            'Real-time Kitchen Order Ticket (KOT) routing',
            'High-speed billing & multi-counter support',
            'Table layout & takeaway order management',
            'Live daily sales, revenue & item analytics',
        ],
    ],
    [
        'slug'           => 'factory-management',
        'title'          => 'Factory Management',
        'subtitle'       => 'Raw material intake to packing & dispatch in one click',
        'badge'          => 'Manufacturing ERP',
        'tagline'        => 'Raw material to packing & dispatch',
        'description'    => 'Smart industrial production workflow system. Track raw material inventory, batch processing, work-in-progress stages, quality inspection checkpoints, and final dispatch in a single unified workflow.',
        'icon'           => 'Factory',
        'image'          => '/assets/projects/factory-automation.jpg',
        'banners'        => [
            '/assets/projects/factory-automation.jpg',
            '/assets/projects/factory-management-slide2.jpg',
            '/assets/projects/factory-automation.png',
        ],
        'live_url'       => null,
        'play_store_url' => null,
        'is_featured'    => 0,
        'features'       => [
            'Raw material inventory & batch tracking',
            'Multi-stage production & packing workflow',
            'Quality check inspection logging',
            'One-click dispatch & gate pass generation',
        ],
    ],
];
