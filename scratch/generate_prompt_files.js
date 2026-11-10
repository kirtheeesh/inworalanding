const fs = require('fs');
const path = require('path');

const baseDir = path.join('c:', 'xampp', 'htdocs', 'inworalanding', 'image-prompts');
const productsDir = path.join(baseDir, 'products');
const portfolioDir = path.join(baseDir, 'portfolio');

[baseDir, productsDir, portfolioDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Products definitions (5)
const products = [
  {
    filename: '01-inwora-daily-gold.txt',
    title: 'Inwora Daily Gold',
    badge: 'Poster Automation',
    tagline: 'Gold-rate posters & daily creatives',
    desc: 'Mobile app and subscription platform for jewelry showrooms to auto-sync daily bullion prices (24K, 22K, 18K gold and silver) onto branded social media creatives.',
    category: 'Jewellery SaaS & Mobile App',
    slide1: 'Editorial commercial hero photography of a luxury jewellery showroom counter. In the center, a sleek modern iPhone 16 Pro displays the Inwora Daily Gold mobile app with a crisp luxury gold-themed UI showing "Today\'s 22K Gold Rate: ₹6,850/g", high-res bridal necklace graphic, and a clean "Export to WhatsApp Status" button. Soft studio lighting, warm gold and deep emerald bokeh in the background, velvet jewellery presentation tray with hallmarked gold bangles slightly out of focus. Ultra-photorealistic, 8k, cinematic depth of field, architectural lighting, Hasselblad 50mm lens.',
    slide2: 'A modern boutique jewellery showroom interior in India. An Indian showroom owner in formal attire stands by an illuminated display case filled with diamond necklaces, holding a smartphone showing an exported gold rate WhatsApp poster. The showroom glass reflects warm recessed ceiling spotlights. Clean, authentic retail environment, no AI distortions, candid corporate documentary photography, ultra-sharp focus on the phone screen.',
    slide3: 'Perspective 3D floating UI mockup of the Inwora Daily Gold template editor interface on a dark glass table. The screen reveals a modular layout: daily bullion ticker widgets (24K, 22K, 18K Gold, Silver), dynamic logo overlay selector, customizable typography panel, and one-tap social story export queue. Minimalist dark-mode UI design with metallic gold accent badges and crisp vector charts. Clean studio lighting, subtle blue-gold ambient reflection, 8k render.'
  },
  {
    filename: '02-pos-kot-software.txt',
    title: 'POS & KOT Software',
    badge: 'Restaurant SaaS',
    tagline: 'Fast restaurant billing & kitchen orders',
    desc: 'High-speed cloud point-of-sale and kitchen order ticket system for restaurants, cafes, food trucks, and multi-branch dining outlets.',
    category: 'Food & Beverage SaaS',
    slide1: 'A busy contemporary restaurant bar and order counter during dinner service. In the foreground, an elegant POS touchscreen terminal (all-in-one capacitive touch monitor) sits next to a sleek thermal receipt printer emitting a crisp white Kitchen Order Ticket. The screen displays the Inwora POS interface with a visual dining table layout (Tables 1-14 with occupancy status indicators), live item cart, and KOT dispatch button. Warm restaurant ambiance, wooden bar top, blurred diners and warm hanging Edison bulbs in the background. Ultra-realistic, 8k, commercial food service photography.',
    slide2: 'An authentic stainless steel commercial restaurant kitchen in action. A chef in a clean white uniform checks a wall-mounted Kitchen Display System (KDS) showing pending tickets with live preparation countdown timers (Burger Platter - 4 mins, Truffle Pasta - 2 mins). Steam rises gently from a copper saucepan in the background. Crisp lighting, authentic culinary workflow, professional kitchen documentary style, shot on Sony A7R V.',
    slide3: 'Clean isometric multi-device showcase featuring the POS & KOT software. In the center, a 24-inch POS terminal monitor displays the live counter billing view; beside it, an iPad tablet in a waiter\'s leather folio shows table-side captain ordering; next to it, an iPhone shows the manager\'s real-time revenue analytics dashboard. Clean charcoal-slate theme with forest green accents and clear table layout graphics. Minimalist studio background with soft directional shadow.'
  },
  {
    filename: '03-unified-business-erp.txt',
    title: 'Unified Business ERP',
    badge: 'Enterprise ERP',
    tagline: 'Unified operations, multi-warehouse & GST workflows',
    desc: 'All-in-one cloud ERP system unifying sales billing, multi-warehouse inventory, GST accounting, procurement, and workforce permissions.',
    category: 'Business Software',
    slide1: 'A high-end modern corporate headquarters executive office overlooking a city skyline at dusk. On a polished oak boardroom desk sits an Apple Pro Display XDR showing the Unified Business ERP master command dashboard. The screen presents clean multi-warehouse stock valuations, real-time cash flow line charts, GST invoicing status widgets, and department headcount bars. Ambient warm architectural lighting, minimalist decor, premium enterprise technology feel, 8k, cinematic depth of field.',
    slide2: 'A sprawling modern automated distribution warehouse with high-bay pallet racking. A logistics supervisor in a safety vest and hardhat holds a rugged industrial tablet scanning barcode pallets. The tablet screen clearly displays the Unified Business ERP warehouse inventory module showing bin location allocations, SKU stock quantities, and dispatch approvals. Clean industrial warehouse interior with natural skylights and LED aisle lamps.',
    slide3: 'High-resolution perspective UI dashboard mockup of Unified Business ERP. An expansive dark-themed desktop software interface showcasing modular cards: "Total Revenue $148,500 (+8.2%)", "Multi-Warehouse Stock Levels", "GST Invoicing Tracker", and "Recent Purchase Orders". Clean typography, elegant financial charts in forest green and muted slate, crisp micro-interactions, no visual clutter, ultra-crisp Figma-style design system rendered in 3D studio light.'
  },
  {
    filename: '04-construction-management.txt',
    title: 'Construction Management',
    badge: 'Site Operations',
    tagline: 'Site accounts & every movement in one step',
    desc: 'End-to-end cloud ERP for construction contractors and builders to track site accounts, material requisitions, labour muster rolls, and milestones.',
    category: 'Construction & Civil Engineering',
    slide1: 'A commercial construction site office overlooking a towering architectural development with steel cranes at golden hour. On a rugged drafting table spread with blueprint schematics, an iPad Pro in a protective case displays the Inwora Construction Management app. The screen showcases multi-site cash movement graphs, daily cement/steel consumption logs, and subcontractor milestone progress bars. Hardhat and surveyor laser level beside the tablet. Authentic, rugged yet high-tech construction environment, 8k resolution, documentary lighting.',
    slide2: 'On an active high-rise construction site during concrete pouring, a civil engineer wearing a white safety helmet and neon high-vis vest reviews real-time material intake on a smartphone. Concrete mixer trucks and structural steel framework are visible in the background under bright morning sunlight. Crisp focus on the phone screen detailing site material receipt records and gate passes.',
    slide3: 'Polished perspective 3D mockup of the Construction Management platform on a dual-monitor workstation. Left screen displays interactive site progress Gantt charts and subcontractor billing ledgers; right screen highlights live site expense accounts, labour muster rolls, and material movement tracking. Clean slate-grey UI with safety orange and forest green status chips, ultra-detailed data tables and charts.'
  },
  {
    filename: '05-factory-management.txt',
    title: 'Factory Management',
    badge: 'Production Ops',
    tagline: 'Raw material to packing & dispatch',
    desc: 'Industrial production workflow system tracking raw material inventory, batch processing, QA inspection checkpoints, and final dispatch.',
    category: 'Industrial Manufacturing & IoT',
    slide1: 'Inside a cutting-edge automated precision manufacturing plant. Robotic assembly arms and sleek conveyor belts operate with pinpoint precision. In the foreground, an operator terminal workstation displays the Factory Management software: live batch progress meters, Overall Equipment Effectiveness (OEE 92.4%), raw material depletion rates, and quality check statuses. Clean industrial lighting, blue and green machinery LED status strips, polished epoxy factory floor, 8k, photorealistic commercial industrial photography.',
    slide2: 'A quality control manager in a modern production facility inspecting packed goods at the end of a packaging line. She holds a barcode scanner and a rugged mobile terminal displaying the Factory Management QA inspection approval screen with green checkmarks and digital dispatch gate pass generation. High-tech manufacturing setting, cleanroom standards, crisp depth of field.',
    slide3: 'Modern 3D isometric UI presentation of the Factory Management platform. The interface highlights a step-by-step production pipeline: "Raw Material Intake &rarr; Batch Mixing &rarr; Automated Assembly &rarr; Quality Inspection &rarr; Packaging & Dispatch". Clean dark slate UI, vivid teal and neon orange telemetry graphs, telemetry sensors data stream, and shift throughput metrics. Studio lighting with subtle metallic floor reflection.'
  }
];

// Portfolio items (26)
const portfolioProjects = [
  {
    filename: '01-inwora-erp.txt',
    title: 'Inwora ERP',
    category: 'Business Software',
    url: 'https://erp.inwora.com',
    slide1: 'Executive command center UI mockup of Inwora ERP displayed on an Apple Studio Display. A clean, light/dark responsive dashboard showcasing multi-branch inventory tracking, sales order pipelines, role-based staff access permissions, and financial P&L reporting. Crisp modern typography, subtle shadows, forest green and graphite color scheme. Polished desk setting with minimalist accessories, 8k.',
    slide2: 'A corporate supply chain manager reviewing warehouse stock levels across four distribution hubs on a lightweight business laptop in a bright modern office. Natural sunlight streaming through floor-to-ceiling glass windows. Focus on the screen displaying live inventory valuation and vendor purchase order approvals.',
    slide3: 'Detailed UI screen layout showing Inwora ERP multi-branch stock movement ledger: interactive filter chips, expandable order rows, tax summary cards, and role permission matrices. Crisp enterprise SaaS UI design, perfectly aligned typography, zero clutter.'
  },
  {
    filename: '02-balaji-jewellers.txt',
    title: 'Balaji Jewellers',
    category: 'Jewellery',
    url: 'https://balajijwellers.aimstorm.in',
    slide1: 'Luxury jewellery brand website showcase on a sleek MacBook Pro set against a dark royal mahogany and gold studio backdrop. The screen displays the Balaji Jewellers homepage featuring high-definition bridal necklace collections, hallmarked gold purity stamps, and an elegant customer enquiry modal. Polished gold jewellery pieces and soft warm spotlight reflections around the laptop. 8k, luxury commercial photography.',
    slide2: 'Close-up lifestyle photography in an authentic Indian jewellery showroom: a customer and showroom attendant looking at a collection of handcrafted 22K gold temple jewellery while browsing the Balaji Jewellers digital catalogue on an iPad Pro tablet. Warm velvet trays, glowing display showcases.',
    slide3: 'Full-bleed web interface view of Balaji Jewellers collection gallery: organized filter tabs ("Bridal Gold", "Antique Sets", "Diamond Bangles"), high-res product cards with zoom-on-hover effect, and direct WhatsApp showroom consultation buttons. Premium dark luxury aesthetic with gold accents.'
  },
  {
    filename: '03-sri-abnaya.txt',
    title: 'Sri Abnaya',
    category: 'Business Websites',
    url: 'https://sriabnaya.aimstorm.in',
    slide1: 'Modern corporate business website presentation on an ultra-slim aluminum laptop. The screen features the Sri Abnaya corporate homepage with structured service offerings, executive company profile, and interactive contact touchpoints. Clean navy blue and mint accent palette, corporate office desk background with a warm cup of coffee and architectural plans. 8k, sharp focus.',
    slide2: 'A modern consulting firm reception lobby with a digital kiosk display showing the Sri Abnaya corporate service portfolio. Professional, welcoming atmosphere, soft natural lighting, marble accents, architectural elegance.',
    slide3: 'Responsive multi-device layout showcasing Sri Abnaya across desktop, iPad tablet, and mobile views. Clean card architecture, transparent lead capture forms, verified client credentials, and smooth typography hierarchy.'
  },
  {
    filename: '04-malligai-crm.txt',
    title: 'Malligai CRM',
    category: 'Business Software',
    url: 'https://crmmalligai.inwora.com',
    slide1: 'Interactive Kanban sales pipeline board of Malligai CRM on a 27-inch monitor. Stages: "New Leads", "Contacted", "Proposal Sent", "Negotiation", "Won". Leads represented with deal values, rep avatars, follow-up countdown tags, and activity icons. Crisp modern SaaS design with vibrant status pills and fluid drag-and-drop handles. Polished office desk setting, 8k.',
    slide2: 'An inside sales executive wearing a modern headset at a sit-stand desk smiling while updating a customer contact profile on Malligai CRM. Dual monitor setup with lead timeline history and automated reminder notifications.',
    slide3: 'Detailed customer interaction timeline view inside Malligai CRM: chronological record of phone calls, email opens, meeting notes, automated SMS follow-ups, and sales conversion velocity metrics. High contrast, clean modern UI.'
  },
  {
    filename: '05-jci-malligai.txt',
    title: 'JCI Malligai',
    category: 'Business Software',
    url: 'https://jcimalligai.inwora.com',
    slide1: 'Community organization and member operations portal on a clean laptop screen. JCI Malligai dashboard showing member roster directory, active chapter community projects, attendance records, and leadership board governance tools. Vibrant community branding, navy blue and royal gold accents, 8k.',
    slide2: 'A chapter leadership meeting room with officers discussing community welfare projects, an iPad on the conference table open to the JCI Malligai event management and project workflow module.',
    slide3: 'Member profile and directory UI view: interactive search with filters by designation, past initiatives, awards, and meeting attendance statistics. Clean tabular presentation with export capabilities.'
  },
  {
    filename: '06-store-grocery-panel.txt',
    title: 'Store Grocery Panel',
    category: 'E-commerce & Retail',
    url: 'https://storegrocery.inwora.com',
    slide1: 'Supermarket vendor management portal on a rugged store counter terminal. The screen highlights live inventory stock toggles (In Stock / Out of Stock), real-time grocery orders awaiting packaging, customer delivery time-slots, and daily sales counter. Surrounding store shelves filled with fresh produce and packaged groceries in soft bokeh. 8k commercial retail photography.',
    slide2: 'A grocery store order fulfillment associate in an apron holding a handheld scanner verifying freshly packed grocery bags at the pickup counter while checking the Store Grocery Panel order status queue.',
    slide3: 'Detailed UI screen of the store inventory catalog editor: quick price adjustments, instant stock availability toggles, bulk category updates, and order packing stage indicators (Received &rarr; Packing &rarr; Ready for Dispatch).'
  },
  {
    filename: '07-user-grocery-app.txt',
    title: 'User Grocery App',
    category: 'E-commerce & Retail',
    url: 'https://usergrocery.inwora.com',
    slide1: 'Modern smartphone held in hand in a bright, stylish kitchen. The screen displays the User Grocery App with a vibrant e-commerce feed: fresh organic vegetables, bakery staples, one-tap "Add to Cart" counters, and express 30-minute delivery banner. Fresh fruits, avocados, and artisan sourdough bread resting on the marble kitchen island in the background. Ultra-photorealistic, 8k.',
    slide2: 'A happy shopper using a smartphone while walking through a bright gourmet grocery market, comparing organic item prices on the User Grocery App with digital shopping list synchronization.',
    slide3: 'Detailed multi-screen mobile UI showcase: Screen 1 shows rapid category browsing with search auto-complete; Screen 2 displays item detail modal with nutrition facts and weight options; Screen 3 shows the frictionless checkout and scheduled delivery slot selection.'
  },
  {
    filename: '08-admin-grocery-dashboard.txt',
    title: 'Admin Grocery Dashboard',
    category: 'E-commerce & Retail',
    url: 'https://admingrocery.inwora.com',
    slide1: 'Master administrative control dashboard on an ultra-wide curved monitor in a tech operations control room. The screen displays the Admin Grocery Dashboard: platform-wide order velocity heatmap, vendor store onboarding approvals, master category taxonomy, and delivery rider fleet status. Modern dark-mode UI with emerald green and electric blue analytics charts, 8k.',
    slide2: 'An e-commerce platform operations director analyzing platform growth and merchant commission payouts on an iPad Pro in a modern glass conference room.',
    slide3: 'High-detail dashboard UI screen showcasing multi-store management: merchant approval queues, master product taxonomy controls, platform commission logs, and granular role-based administrative permissions.'
  },
  {
    filename: '09-grocery-api.txt',
    title: 'Grocery API',
    category: 'E-commerce & Retail',
    url: 'https://groceryapi.inwora.com',
    slide1: 'Developer workstation setup with dual 4K monitors in a moody, ambient-lit tech workspace. Left screen displays interactive Swagger/Postman API documentation for Grocery API (endpoints for `/auth/login`, `/catalog/products`, `/orders/create`, `/inventory/sync`); right screen shows live JSON response payloads and high-concurrency server metrics. High-end mechanical keyboard with custom keycaps and warm desk lamp. 8k developer aesthetic.',
    slide2: 'Cloud infrastructure visualization: clean conceptual 3D render of secure microservices architecture connecting mobile shoppers, store merchant portals, and central database with glowing secure token authentication pathways.',
    slide3: 'Crisp UI screenshot of API developer portal: structured JSON response previews with syntax highlighting, token authorization modals, rate-limiting status badges, and webhook event configuration.'
  },
  {
    filename: '10-takeaway.txt',
    title: 'Takeaway',
    category: 'Food & Beverage',
    url: 'https://takeaway.inwora.com',
    slide1: 'A vibrant modern street-food bistro order counter with warm terracotta and charcoal decor. A touchscreen customer order kiosk displays the Takeaway food ordering app with mouthwatering food photography: gourmet wood-fired pizza, gourmet burgers, and artisan drinks with quick combo customization buttons. Fresh food garnishes and warm ambient counter lighting. 8k, mouthwatering culinary commercial style.',
    slide2: 'A customer picking up a branded kraft paper takeaway meal bag at a sleek restaurant pickup hatch, while the digital Takeaway order status screen shows their order number transitioning from "Preparing" to "Ready for Pickup".',
    slide3: 'Mobile web UI view of Takeaway digital menu: smooth food category horizontal scroll ("Signature Bowls", "Wood-fired Pizza", "Beverages"), meal customization drawer (extra cheese, spice levels), and live order tracking map.'
  },
  {
    filename: '11-wallmark.txt',
    title: 'Wallmark',
    category: 'Business Websites',
    url: 'https://wallmark.inwora.com',
    slide1: 'Architectural engineering showcase on a high-resolution laptop set in an architect\'s studio. The screen features the Wallmark Facades and Structures website highlighting monumental commercial curtain walls, structural glazing, ACP cladding, and steel engineering projects. Architectural scale models, blueprints, and drafting instruments surround the laptop. 8k, architectural lighting.',
    slide2: 'A stunning architectural exterior photograph of a modern glass skyscraper with complex parametric facade panels and geometric curtain walls installed by Wallmark at sunset, reflecting warm orange skies.',
    slide3: 'Portfolio case-study web page layout for Wallmark: high-definition before/after facade installation galleries, engineering specifications, wind load certifications, and corporate inquiry consultation form.'
  },
  {
    filename: '12-thambalam.txt',
    title: 'Thambalam',
    category: 'Business Websites',
    url: 'https://thambalam.inwora.com',
    slide1: 'Boutique bridal and festive craft website displayed on a clean tablet resting on an ornate wooden table. The screen features Thambalam website showcasing handcrafted return-gift bags in raw silk, jute, and gold zari embroidery. Around the tablet, colorful handcrafted wedding bags with traditional peacock motifs, auspicious brass lamps (kuthuvilakku), and marigold blossoms. Warm, festive Indian wedding aesthetic, 8k.',
    slide2: 'Close-up artisan craftsmanship: an Indian textile artisan hand-embroidering traditional zari borders onto a raw-silk festive gift bag in a boutique Madurai workshop.',
    slide3: 'Website product gallery view for Thambalam: categorized bags for weddings, poojas, and housewarmings, customizable fabric swatches, bulk order quote calculator, and direct customer contact integration.'
  },
  {
    filename: '13-chai-fi.txt',
    title: 'Chai Fi',
    category: 'Food & Beverage',
    url: 'https://chaifi.inwora.com',
    slide1: 'Chic specialty tea café and modern beverage bar. On a warm wooden counter sits an iPad tablet in a matte black stand showing the Chai-Fi billing and menu solution: specialty ginger chai, cardamom brews, artisanal snacks, and quick UPI QR code billing modal. Fresh ceramic tea cups with fragrant steaming masala chai and cinnamon sticks beside the tablet. Cozy warm ambient café lighting, 8k.',
    slide2: 'A smiling tea café barista swiftly generating an electronic bill on the Chai Fi counter terminal while pouring freshly brewed artisanal tea through a brass strainer into traditional clay kulhad cups.',
    slide3: 'High-speed billing UI layout for Chai Fi: one-tap quick item buttons with icons for high-frequency café sales, live thermal receipt print trigger, ingredient consumption tracker, and end-of-shift sales tally.'
  },
  {
    filename: '14-grocery-website.txt',
    title: 'Grocery Website',
    category: 'E-commerce & Retail',
    url: 'https://grocery.inwora.com',
    slide1: 'Full desktop monitor showcasing the Grocery Website online storefront in a bright modern home office. The homepage presents fresh produce banners, daily supermarket deals, intuitive department hierarchy ("Pantry", "Dairy & Eggs", "Farm Fresh"), and a floating shopping cart preview with free shipping progress bar. Natural morning light, modern desk aesthetic, 8k.',
    slide2: 'An aerial top-down flat-lay photo of an eco-friendly kraft paper grocery bag overflowing with vibrant organic vegetables, sourdough bread, and dairy cartons beside an iPad displaying the Grocery Website cart confirmation screen.',
    slide3: 'Full-width e-commerce storefront UI screen: dynamic search bar with instant autocomplete, multi-facet filtering (Brand, Price, Dietary Tags, Stock Status), and seamless accordion checkout step view.'
  },
  {
    filename: '15-wora-stayz.txt',
    title: 'Wora Stayz',
    category: 'Hospitality',
    url: 'https://worastayz.inwora.com',
    slide1: 'Luxury hospitality website showcase on a MacBook Pro placed on a teak balcony table overlooking a private infinity pool and lush tropical coastal scenery at sunset. The laptop screen displays the Wora Stayz accommodation portal showcasing luxury villa suites, transparent nightly rates, private amenities, and a direct reservation calendar. 8k, luxury travel editorial style.',
    slide2: 'An inviting luxury villa suite bedroom with plush king-size bed, crisp white linen, wooden ceiling beams, and sliding glass doors opening to a scenic view, reflecting the real-world accommodation experience of Wora Stayz.',
    slide3: 'Room details web page interface for Wora Stayz: interactive photo carousel of the villa suite, amenity icon badges (Private Pool, Wi-Fi, Ocean View, Butler Service), interactive location map, and instant booking inquiry form.'
  },
  {
    filename: '16-priyam.txt',
    title: 'Priyam',
    category: 'Food & Beverage',
    url: 'https://priyam.inwora.com',
    slide1: 'Brand showcase website for Priyam Agro Foods displayed on an ultra-slim laptop in a warm rustic kitchen setting. The website presents traditional South Indian culinary pastes, natural garlic, curry leaf, and ginger thuvaiyals. Next to the laptop, glass jars of authentic culinary pastes, fresh red chillies, garlic bulbs, and curry leaves in traditional brass bowls. Authentic culinary heritage photography, 8k.',
    slide2: 'A commercial food production facility showing modern, hygienic stainless steel processing and packaging of natural South Indian food pastes adhering to FSSAI food quality standards.',
    slide3: 'Product catalog web view for Priyam: high-res product jar photos with nutritional facts, farm-to-kitchen brand storytelling section, wholesale distribution enquiry form, and retailer contact details.'
  },
  {
    filename: '17-gold-platform.txt',
    title: 'Gold Platform',
    category: 'Jewellery',
    url: 'https://gold.inwora.com',
    slide1: 'High-end fintech and bullion platform interface displayed on a studio monitor. The screen displays the Gold Platform live market rate automation tool: dynamic bullion price tickers (24K Gold, 22K Gold, 999 Silver), customizable showroom branding overlays, and one-click bulk poster export queue. Polished gold bullion bars and velvet jewellery presentation props in soft focus. 8k.',
    slide2: 'A jewellery showroom manager standing in front of an LED showroom display screen showcasing today\'s live gold rate poster generated instantly from Gold Platform. Clean, authentic showroom setting.',
    slide3: 'Perspective UI view of the Gold Platform automated template engine: rate synchronization status indicator, custom brand font/logo overlay controls, and multi-format export options (WhatsApp Status, Instagram Story, High-Res Print).'
  },
  {
    filename: '18-subra-residency.txt',
    title: 'Subra Residency',
    category: 'Hospitality',
    url: 'https://subraresidency.com',
    slide1: 'Hotel website showcase on a sleek laptop set against a warm hotel reception desk with polished granite and traditional brass accents. The laptop displays the Subra Residency Kumbakonam homepage featuring comfortable deluxe family rooms, proximity to historic sacred temples, and booking inquiry workflows. Warm hospitality lighting, temple city heritage ambiance, 8k.',
    slide2: 'An authentic deluxe hotel room at Subra Residency: spacious air-conditioned room with king-size bed, clean white linens, modern ensuite bathroom, and amenities tailored for pilgrimage travelers in Kumbakonam.',
    slide3: 'Subra Residency web booking interface: detailed room category cards, pilgrimage tour package highlights for Kumbakonam temples, 24/7 front desk contact options, and direct reservation form with date selection.'
  },
  {
    filename: '19-pos-kot-for-restaurants.txt',
    title: 'POS & KOT for Restaurants',
    category: 'Food & Beverage',
    url: null,
    slide1: 'High-speed restaurant billing and kitchen order ticketing system on a dual-screen restaurant counter setup. Main screen shows live table floor map with order status colors (vacant, dining, billed); secondary screen faces customer showing itemized order summary and payment QR code. Warm restaurant background with soft ambient dining lighting. 8k.',
    slide2: 'A restaurant waitstaff using a tablet to input order modifications (extra toppings, no onions) tableside, which instantly prints a ticket at the kitchen dispatch counter without delay.',
    slide3: 'Deep UI screen view of restaurant operations: live KDS order routing matrix, split bill calculation modal, daily revenue reconciliation summary, and ingredient depletion tracking.'
  },
  {
    filename: '20-construction-crm.txt',
    title: 'Construction CRM',
    category: 'Business Software',
    url: null,
    slide1: 'Specialized contractor CRM dashboard on a rugged field laptop in a construction management trailer. The screen shows contractor bidding directories, building material procurement schedules, client communication logs, and daily site photo inspection feeds. Safety helmets and blueprints on the desk, 8k.',
    slide2: 'A general contractor and site supervisor reviewing contractor milestone billing cycles and weather delay logs on a tablet at a commercial building construction site.',
    slide3: 'UI screen layout for Construction CRM: bid and cost estimate builder with line-item markup calculations, subcontractor directory cards with rating badges, and live site weather integration widget.'
  },
  {
    filename: '21-lead-management-system.txt',
    title: 'Lead Management System',
    category: 'Business Software',
    url: null,
    slide1: 'B2B sales automation and lead scoring platform on a curved monitor in a modern tech office. The screen highlights an interactive sales funnel with automated lead scoring badges (Hot, Warm, Cold), lead source tracking (Google Ads, LinkedIn, Organic), and rep conversion velocity charts. 8k resolution, cinematic lighting.',
    slide2: 'A sales team collaborating around a digital dashboard reviewing weekly qualified sales leads and automated follow-up SLA notifications in a modern conference room.',
    slide3: 'Detailed UI view of lead scoring and automated routing: trigger conditions for instant WhatsApp/email follow-up, customer engagement timeline, and sales conversion analytics report.'
  },
  {
    filename: '22-accounts-management-system.txt',
    title: 'Accounts Management System',
    category: 'Business Software',
    url: null,
    slide1: 'Double-entry enterprise financial accounting system on a minimalist desktop setup. The interface displays general ledger balances, automated GST/VAT reconciliation tables, recurring expense tracking, and instant Profit & Loss (P&L) statements. Clean, modern typography with calm blue and forest green accents, 8k.',
    slide2: 'A financial controller and accountant reviewing bank reconciliation discrepancies and automated tax mapping ledgers on a dual-monitor setup in a corporate finance office.',
    slide3: 'Detailed accounting UI screen: double-entry ledger balance view with debit/credit verification, automated PDF invoice generation modal, and cash flow forecasting graph.'
  },
  {
    filename: '23-automated-factory-application.txt',
    title: 'Automated Factory Application',
    category: 'Business Software',
    url: null,
    slide1: 'Industry 4.0 IoT factory floor monitoring application on a rugged industrial touchscreen terminal in a high-tech manufacturing plant. The screen displays real-time machine telemetry (temperature, vibration, spindle RPM), Overall Equipment Effectiveness (OEE 94%), and predictive maintenance alarms. Blurred robotic production line in background. 8k.',
    slide2: 'An industrial engineer analyzing predictive vibration telemetry on a handheld rugged tablet standing beside a high-speed automated packaging conveyor.',
    slide3: 'Comprehensive telemetry dashboard UI: multi-machine status cards (Running, Idle, Warning), historical breakdown prediction graphs, and PLC/MQTT sensor connection status indicators.'
  },
  {
    filename: '24-hospital-management-application.txt',
    title: 'Hospital Management Application',
    category: 'Business Software',
    url: null,
    slide1: 'HIPAA-compliant healthcare operations and Electronic Health Record (EHR) portal on an all-in-one medical workstation in a modern hospital nurses\' station. The screen displays patient admission logs, doctor scheduling calendar, ward/ICU bed occupancy matrix, and lab test results dispatch tracker. Clean, clinical environment with soft medical lighting. 8k.',
    slide2: 'A doctor in a white lab coat reviewing a patient electronic medical record and diagnostic lab imaging on a lightweight tablet in a modern private consultation room.',
    slide3: 'EHR patient clinical dashboard UI: chronological medical history, prescription medication schedule, bed management occupancy grid, and automated medical insurance billing claims tracker.'
  },
  {
    filename: '25-travel-budget-application.txt',
    title: 'Travel Budget Application',
    category: 'Business Software',
    url: null,
    slide1: 'Fintech travel expense and itinerary budgeting application on an iPhone 16 Pro resting on a rustic wooden cafe table beside a passport, boarding pass, and compass. The screen displays live multi-currency expense conversions, visual trip spending limits, and OCR receipt scanner widget. Warm sunlight, travel lifestyle aesthetic, 8k.',
    slide2: 'A business traveler scanning a dining receipt using the smartphone OCR scanner feature at an international airport lounge, with flight departure screens in soft bokeh.',
    slide3: 'Detailed travel finance UI layout: multi-currency auto-conversion calculator, category expense breakdown pie chart (Flights, Hotels, Food, Transport), and group trip bill splitting ledger.'
  },
  {
    filename: '26-scrom-lms-learning-management-system.txt',
    title: 'SCORM LMS Learning Management System',
    category: 'Business Software',
    url: null,
    slide1: 'Modern e-learning academy portal on a MacBook Pro in a clean university library or corporate training room. The screen shows the SCORM-compliant LMS dashboard: interactive course modules, video lecture progression bar, student completion scores, and verifiable graduation certificates. Soft warm study lighting, books and headphones on desk. 8k.',
    slide2: 'A corporate employee completing an interactive compliance training module with a progress quiz on an iPad tablet in a modern corporate breakroom.',
    slide3: 'Instructor LMS dashboard UI: SCORM 2004 package import manager, student quiz analytics and drop-off rate heatmaps, automated digital certificate issuance with QR verification code.'
  }
];

function generatePromptTxt(item, isProduct) {
  let content = `================================================================================
IMAGE GENERATION PROMPTS: ${item.title.toUpperCase()}
Type: ${isProduct ? 'Official Inwora Product' : 'Portfolio Project'}
Category: ${item.category}
${item.badge ? 'Badge: ' + item.badge + '\n' : ''}${item.url ? 'Live URL: ' + item.url + '\n' : ''}================================================================================

OVERVIEW & AESTHETIC GUIDELINES:
- Aspect Ratio: 16:9 (--ar 16:9) for slideshow banners, web headers, and presentation decks.
- Style: Ultra-photorealistic, high-end commercial tech & corporate editorial aesthetic.
- Key Goal: Look like authentic, production-grade software and real commercial environments. AVOID generic cartoonish AI vectors, fake 3D blobs, or illegible text.
- Recommended Midjourney Parameters: --ar 16:9 --style raw --v 6.1
- Recommended Flux Parameters: 1920x1080 resolution, steps: 35, guidance: 3.5

--------------------------------------------------------------------------------
SLIDE 1: MAIN HERO BANNER & SPOTLIGHT SHOWCASE (16:9)
--------------------------------------------------------------------------------
PROMPT:
${item.slide1}

NEGATIVE PROMPT:
cartoon, anime, 3d render illustration, low resolution, blurry, distorted text, mutated hands, bad anatomy, artificial floating plastic blobs, watermarks, stock photo watermark, oversaturated colors, cheap vector clip-art.

--------------------------------------------------------------------------------
SLIDE 2: REAL-WORLD OPERATIONAL / IN-ACTION ENVIRONMENT (16:9)
--------------------------------------------------------------------------------
PROMPT:
${item.slide2}

NEGATIVE PROMPT:
deformed faces, extra fingers, cartoonish, oversaturated, staged fake smile, plastic skin, uncanny valley, watermark, text errors, low-res, out of frame, blurry background text.

--------------------------------------------------------------------------------
SLIDE 3: DEEP FEATURE SCREEN / MULTI-DEVICE WORKFLOW (16:9)
--------------------------------------------------------------------------------
PROMPT:
${item.slide3}

NEGATIVE PROMPT:
gibberish text, chaotic layouts, pixelated UI, neon cartoon vectors, low quality, warped perspective, bad typography, clutter, blurry lines, watermark.

================================================================================
HOW TO USE IN POPULAR AI IMAGE GENERATORS:
1. Midjourney v6.1:
   Paste: /imagine prompt: [PASTE PROMPT HERE] --ar 16:9 --style raw --v 6.1
2. Flux 1.1 Pro / Dev:
   Paste the prompt with aspect ratio set to 16:9 (1920x1080).
3. DALL-E 3:
   Paste the prompt directly; ensure you specify "16:9 widescreen landscape".
================================================================================
`;
  return content;
}

// Write products
products.forEach(p => {
  const filePath = path.join(productsDir, p.filename);
  fs.writeFileSync(filePath, generatePromptTxt(p, true), 'utf8');
  console.log(`Generated: products/${p.filename}`);
});

// Write portfolio
portfolioProjects.forEach(p => {
  const filePath = path.join(portfolioDir, p.filename);
  fs.writeFileSync(filePath, generatePromptTxt(p, false), 'utf8');
  console.log(`Generated: portfolio/${p.filename}`);
});

// Generate Master Index README.md
const indexContent = `# INWORA Image Generation Prompts Catalog

Comprehensive collection of tailored, ultra-photorealistic image generation prompts for slideshow banners, web headers, and presentation decks across all **Products** and **Portfolio Projects**.

Every item contains 3 dedicated slideshow prompts:
1. **Slide 1: Main Hero Banner & Spotlight Showcase (16:9)**
2. **Slide 2: Real-World In-Action / Commercial Environment (16:9)**
3. **Slide 3: Deep Feature Screen / Multi-Device UI Workflow (16:9)**

---

## Folder Organization

\`\`\`
image-prompts/
├── products/
│   ├── 01-inwora-daily-gold.txt
│   ├── 02-pos-kot-software.txt
│   ├── 03-unified-business-erp.txt
│   ├── 04-construction-management.txt
│   └── 05-factory-management.txt
│
└── portfolio/
    ├── 01-inwora-erp.txt
    ├── 02-balaji-jewellers.txt
    ├── 03-sri-abnaya.txt
    ├── 04-malligai-crm.txt
    ├── 05-jci-malligai.txt
    ├── 06-store-grocery-panel.txt
    ├── 07-user-grocery-app.txt
    ├── 08-admin-grocery-dashboard.txt
    ├── 09-grocery-api.txt
    ├── 10-takeaway.txt
    ├── 11-wallmark.txt
    ├── 12-thambalam.txt
    ├── 13-chai-fi.txt
    ├── 14-grocery-website.txt
    ├── 15-wora-stayz.txt
    ├── 16-priyam.txt
    ├── 17-gold-platform.txt
    ├── 18-subra-residency.txt
    ├── 19-pos-kot-for-restaurants.txt
    ├── 20-construction-crm.txt
    ├── 21-lead-management-system.txt
    ├── 22-accounts-management-system.txt
    ├── 23-automated-factory-application.txt
    ├── 24-hospital-management-application.txt
    ├── 25-travel-budget-application.txt
    └── 26-scorm-lms-learning-management-system.txt
\`\`\`

---

## Recommended Engine Settings

### 1. Midjourney (v6.1)
- Prompt format: \`/imagine prompt: <PROMPT> --ar 16:9 --style raw --v 6.1\`
- Tips: Using \`--style raw\` eliminates the overly artistic Midjourney default glow, creating authentic corporate and real-world commercial photography.

### 2. Flux 1.1 Pro / Flux Dev
- Dimensions: \`1920 x 1080\` (16:9)
- Steps: \`30 - 40\`
- Guidance scale: \`3.0 - 4.0\`

### 3. DALL-E 3 (ChatGPT Plus / Team / Enterprise)
- Specify: \`"16:9 widescreen landscape, photorealistic commercial product photography, no cartoon style"\`.

---

## Catalog Overview

### Products (5):
1. **Inwora Daily Gold**: Gold-rate poster & daily creatives app for jewelry brands.
2. **POS & KOT Software**: Restaurant billing, captain tableside orders & kitchen display system.
3. **Unified Business ERP**: Multi-warehouse inventory, GST billing, order-to-cash procurement.
4. **Construction Management**: Multi-site expense accounts, materials & labour muster tracking.
5. **Factory Management**: Manufacturing batch operations, QA checkpoints & dispatch logs.

### Portfolio Projects (26):
- **Business Software (10)**: Inwora ERP, Malligai CRM, JCI Malligai, Construction CRM, Lead Management System, Accounts Management System, Automated Factory Application, Hospital Management Application, Travel Budget Application, SCORM LMS.
- **E-commerce & Retail (5)**: Store Grocery Panel, User Grocery App, Admin Grocery Dashboard, Grocery API, Grocery Website.
- **Food & Beverage (4)**: Takeaway, Chai Fi, Priyam Agro Foods, POS & KOT for Restaurants.
- **Jewellery (2)**: Balaji Jewellers, Gold Platform.
- **Hospitality (2)**: Wora Stayz, Subra Residency Kumbakonam.
- **Business Websites (3)**: Sri Abnaya, Wallmark Facades, Thambalam Bag Design.
`;

fs.writeFileSync(path.join(baseDir, 'README.md'), indexContent, 'utf8');
console.log('Generated: image-prompts/README.md');
console.log('All prompt text files successfully generated!');
