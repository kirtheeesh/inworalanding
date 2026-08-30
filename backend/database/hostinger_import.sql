-- INWORA Hostinger Production Database Dump
-- Import directly into Hostinger phpMyAdmin (u891386226_inworaweb_db)

SET FOREIGN_KEY_CHECKS=0;

-- INWORA landing page — portfolio schema
-- Usage: mysql -u root -p < backend/database/schema.sql





-- ── Admin users ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id`            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username`      VARCHAR(60)  NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at`    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_admin_users_username` (`username`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ── Projects ─────────────────────────────────────────────────
-- `slug` is the public identifier used by the frontend route /portfolio/:id
CREATE TABLE IF NOT EXISTS `projects` (
  `id`           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug`         VARCHAR(160) NOT NULL,
  `title`        VARCHAR(200) NOT NULL,
  `category`     VARCHAR(120) NOT NULL,
  `short_desc`   TEXT         NOT NULL,
  `full_desc`    LONGTEXT     NOT NULL,
  `icon`         VARCHAR(60)  NOT NULL DEFAULT 'Layout',
  `banner`       VARCHAR(500) NOT NULL DEFAULT '',
  `video_url`    VARCHAR(500) NULL,
  `pdf_url`      VARCHAR(500) NULL,
  `live_url`     VARCHAR(500) NULL,
  `sort_order`   INT          NOT NULL DEFAULT 0,
  `is_published` TINYINT(1)   NOT NULL DEFAULT 1,
  `created_at`   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_projects_slug` (`slug`),
  KEY `idx_projects_listing` (`is_published`, `sort_order`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ── Tags (chips shown on the card + detail hero) ─────────────
CREATE TABLE IF NOT EXISTS `project_tags` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` INT UNSIGNED NOT NULL,
  `tag`        VARCHAR(120) NOT NULL,
  `sort_order` INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_project_tags_project` (`project_id`, `sort_order`),
  CONSTRAINT `fk_project_tags_project`
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ── Features (bullet list on the detail page) ────────────────
CREATE TABLE IF NOT EXISTS `project_features` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` INT UNSIGNED NOT NULL,
  `feature`    VARCHAR(255) NOT NULL,
  `sort_order` INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_project_features_project` (`project_id`, `sort_order`),
  CONSTRAINT `fk_project_features_project`
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;


-- ── Seed Admin User ──────────────────────────────────────────
INSERT INTO `admin_users` (`username`, `password_hash`) VALUES ('admin', '$2y$10$bcBwXcB8mDYk6cHdpcZd7O2uwB3MWcxQzKuYuK9EUb1Q6/h3wXiD2') ON DUPLICATE KEY UPDATE `password_hash` = VALUES(`password_hash`);

-- ── Seed Projects Data ───────────────────────────────────────
INSERT INTO `projects` (`id`, `slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
(1, 'gold-poster', 'Automated Gold Poster Application', 'SaaS Product', 'Automated marketing & daily rate poster generator for jewelry showrooms with live market gold price sync.', 'Inwora Gold Poster is a specialized SaaS branding and marketing automation app engineered specifically for premier jewelry showrooms. Every morning, the application automatically fetches live market bullion prices (24K, 22K, 18K gold and silver) and embeds them onto high-resolution luxury promotional templates dynamically customized with your showroom logo, address, tagline, and contact numbers. Showroom owners can generate daily branded posters in one tap, export zero-watermark graphics directly to WhatsApp Status and Instagram Stories, and receive 10 ready-to-post AI promotional video reels every month — completely eliminating manual graphic design costs and saving hours of daily administrative work.', 'Layout', '/assets/projects/gold-poster.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ', '/assets/pdf/gold-poster-presentation.pdf', 'https://gold.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Automated Gold Poster Application', `short_desc`='Automated marketing & daily rate poster generator for jewelry showrooms with live market gold price sync.', `full_desc`='Inwora Gold Poster is a specialized SaaS branding and marketing automation app engineered specifically for premier jewelry showrooms. Every morning, the application automatically fetches live market bullion prices (24K, 22K, 18K gold and silver) and embeds them onto high-resolution luxury promotional templates dynamically customized with your showroom logo, address, tagline, and contact numbers. Showroom owners can generate daily branded posters in one tap, export zero-watermark graphics directly to WhatsApp Status and Instagram Stories, and receive 10 ready-to-post AI promotional video reels every month — completely eliminating manual graphic design costs and saving hours of daily administrative work.', `banner`='/assets/projects/gold-poster.png';

INSERT INTO `projects` (`id`, `slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
(2, 'pos-kot', 'POS & KOT for Restaurants', 'Business Software', 'Integrated Point-of-Sale billing, table management, and live Kitchen Order Ticket (KOT) workflow system.', 'POS & KOT for Restaurants is an enterprise-grade dining outlet management system designed to bridge table order booking counters directly with the kitchen. Built for fast-paced restaurants, cafes, and multi-outlet dining chains, waitstaff can enter table orders on mobile tablets, which instantly sync onto Kitchen Display System (KDS) screens and print thermal Kitchen Order Tickets (KOT) in real time. It features split billing, captain management, inventory depletion tracking, thermal receipt printing, and automated end-of-day financial reconciliation reports.', 'Database', '/assets/projects/pos-kot.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ', '/assets/pdf/nexora-pos-deck.pdf', 'https://kot.nexoraapp.in/', 1, 1)
ON DUPLICATE KEY UPDATE `title`='POS & KOT for Restaurants', `short_desc`='Integrated Point-of-Sale billing, table management, and live Kitchen Order Ticket (KOT) workflow system.', `full_desc`='POS & KOT for Restaurants is an enterprise-grade dining outlet management system designed to bridge table order booking counters directly with the kitchen. Built for fast-paced restaurants, cafes, and multi-outlet dining chains, waitstaff can enter table orders on mobile tablets, which instantly sync onto Kitchen Display System (KDS) screens and print thermal Kitchen Order Tickets (KOT) in real time. It features split billing, captain management, inventory depletion tracking, thermal receipt printing, and automated end-of-day financial reconciliation reports.', `banner`='/assets/projects/pos-kot.png';

INSERT INTO `projects` (`id`, `slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
(3, 'hospital-management', 'Hospital Management Application', 'Healthcare System', 'HIPAA-compliant healthcare portal for Electronic Health Records (EHR), doctor scheduling, and medical billing.', 'The Hospital Management Application is a secure, HIPAA-compliant digital healthcare portal created to streamline clinical operations and patient care. It manages end-to-end hospital administrative workflows, including patient registration, OPD/IPD admission logs, doctor appointment scheduling calendars, and Electronic Health Record (EHR) maintenance. The platform automates lab test report dispatches, ward bed allocations, and itemized medical billing claims, empowering clinical staff and physicians to deliver coordinated, error-free patient care.', 'Activity', '/assets/projects/hospital-management.png', NULL, NULL, NULL, 2, 1)
ON DUPLICATE KEY UPDATE `title`='Hospital Management Application', `short_desc`='HIPAA-compliant healthcare portal for Electronic Health Records (EHR), doctor scheduling, and medical billing.', `full_desc`='The Hospital Management Application is a secure, HIPAA-compliant digital healthcare portal created to streamline clinical operations and patient care. It manages end-to-end hospital administrative workflows, including patient registration, OPD/IPD admission logs, doctor appointment scheduling calendars, and Electronic Health Record (EHR) maintenance. The platform automates lab test report dispatches, ward bed allocations, and itemized medical billing claims, empowering clinical staff and physicians to deliver coordinated, error-free patient care.', `banner`='/assets/projects/hospital-management.png';

INSERT INTO `projects` (`id`, `slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
(4, 'factory-automation', 'Automated Factory Application', 'Industrial Solutions', 'Smart Industry 4.0 factory floor control dashboard with real-time IoT machinery monitoring and quality checks.', 'The Automated Factory Application is a custom Industry 4.0 industrial IoT monitoring platform built for modern manufacturing plants and assembly lines. By connecting PLC controllers and wireless MQTT sensors directly to centralized management dashboards, the system tracks real-time machine operating status, assembly line throughput, temperature/vibration metrics, and Overall Equipment Effectiveness (OEE). It automatically triggers predictive maintenance alarms before breakdowns occur, reducing factory assembly downtime by 90% and eliminating manual paper logs.', 'Code', '/assets/projects/factory-automation.png', NULL, NULL, NULL, 3, 1)
ON DUPLICATE KEY UPDATE `title`='Automated Factory Application', `short_desc`='Smart Industry 4.0 factory floor control dashboard with real-time IoT machinery monitoring and quality checks.', `full_desc`='The Automated Factory Application is a custom Industry 4.0 industrial IoT monitoring platform built for modern manufacturing plants and assembly lines. By connecting PLC controllers and wireless MQTT sensors directly to centralized management dashboards, the system tracks real-time machine operating status, assembly line throughput, temperature/vibration metrics, and Overall Equipment Effectiveness (OEE). It automatically triggers predictive maintenance alarms before breakdowns occur, reducing factory assembly downtime by 90% and eliminating manual paper logs.', `banner`='/assets/projects/factory-automation.png';

INSERT INTO `projects` (`id`, `slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
(5, 'travel-budget', 'Travel Budget Application', 'Financial Tool', 'Multi-currency travel expense tracker, receipt scanner, and visual itinerary cost planner for teams and travelers.', 'The Travel Budget Application is a smart fintech tool designed for leisure travelers and corporate business teams to track expenditures, set category budgets, and prevent overspending while on the road. Integrated with live auto-converting currency exchange rates, the application allows users to split expenses across accommodation, flights, transportation, and dining. Travelers can scan physical paper receipts via OCR, view visual itinerary budget maps, and divide group trip expenses seamlessly offline and online.', 'Compass', '/assets/projects/travel-budget.png', NULL, NULL, NULL, 4, 1)
ON DUPLICATE KEY UPDATE `title`='Travel Budget Application', `short_desc`='Multi-currency travel expense tracker, receipt scanner, and visual itinerary cost planner for teams and travelers.', `full_desc`='The Travel Budget Application is a smart fintech tool designed for leisure travelers and corporate business teams to track expenditures, set category budgets, and prevent overspending while on the road. Integrated with live auto-converting currency exchange rates, the application allows users to split expenses across accommodation, flights, transportation, and dining. Travelers can scan physical paper receipts via OCR, view visual itinerary budget maps, and divide group trip expenses seamlessly offline and online.', `banner`='/assets/projects/travel-budget.png';

INSERT INTO `projects` (`id`, `slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
(6, 'construction-crm', 'Construction CRM', 'SaaS Product', 'Dedicated CRM for construction groups to track client bids, contractor materials, and work site progress.', 'Construction CRM is a specialized contractor CRM platform tailored to handle the unique workflows of general contractors, commercial builders, and civil engineering groups. It centralizes contractor directories, tracks construction bid progress, manages building material procurement orders, and hosts client communication boards. Site managers can upload daily site pictures and inspection logs to update property owners on build milestones, weather conditions, and progress billing cycles.', 'HardHat', '/assets/projects/construction-crm.png', NULL, NULL, NULL, 5, 1)
ON DUPLICATE KEY UPDATE `title`='Construction CRM', `short_desc`='Dedicated CRM for construction groups to track client bids, contractor materials, and work site progress.', `full_desc`='Construction CRM is a specialized contractor CRM platform tailored to handle the unique workflows of general contractors, commercial builders, and civil engineering groups. It centralizes contractor directories, tracks construction bid progress, manages building material procurement orders, and hosts client communication boards. Site managers can upload daily site pictures and inspection logs to update property owners on build milestones, weather conditions, and progress billing cycles.', `banner`='/assets/projects/construction-crm.png';

INSERT INTO `projects` (`id`, `slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
(7, 'lead-management', 'Lead Management System', 'SaaS Product', 'Growth-centric sales funnel to capture, score, route, and convert B2B leads across digital marketing channels.', 'The Lead Management System is a B2B sales automation CRM engineered to track business leads from initial digital capture through final deal conversion. Featuring an interactive Kanban pipeline board, the platform ranks incoming leads using an automated lead-scoring algorithm based on engagement levels and buyer intent. It automatically routes high-value prospects to appropriate sales reps, triggers SLA follow-up alerts, tracks email campaign open rates, and provides detailed sales velocity analytics.', 'Globe', '/assets/projects/lead-management.png', NULL, NULL, NULL, 6, 1)
ON DUPLICATE KEY UPDATE `title`='Lead Management System', `short_desc`='Growth-centric sales funnel to capture, score, route, and convert B2B leads across digital marketing channels.', `full_desc`='The Lead Management System is a B2B sales automation CRM engineered to track business leads from initial digital capture through final deal conversion. Featuring an interactive Kanban pipeline board, the platform ranks incoming leads using an automated lead-scoring algorithm based on engagement levels and buyer intent. It automatically routes high-value prospects to appropriate sales reps, triggers SLA follow-up alerts, tracks email campaign open rates, and provides detailed sales velocity analytics.', `banner`='/assets/projects/lead-management.png';

INSERT INTO `projects` (`id`, `slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
(8, 'scrom-lms', 'SCORM LMS Learning Management System', 'EdTech Portal', 'SCORM-compliant e-learning digital academy for interactive course delivery, student tracking, and auto-certification.', 'Our SCORM LMS is a digital learning academy portal built for educational institutions and corporate training programs. Built around SCORM 2004 standards, it seamlessly imports standardized e-learning course packages, maintaining precise logs on student module completion times, quiz scores, and learning progress metrics. Instructors can build interactive quizzes, monitor class analytics, and issue automated, verified graduation certificates upon successful course completion.', 'GraduationCap', '/assets/projects/scrom-lms.png', NULL, NULL, NULL, 7, 1)
ON DUPLICATE KEY UPDATE `title`='SCORM LMS Learning Management System', `short_desc`='SCORM-compliant e-learning digital academy for interactive course delivery, student tracking, and auto-certification.', `full_desc`='Our SCORM LMS is a digital learning academy portal built for educational institutions and corporate training programs. Built around SCORM 2004 standards, it seamlessly imports standardized e-learning course packages, maintaining precise logs on student module completion times, quiz scores, and learning progress metrics. Instructors can build interactive quizzes, monitor class analytics, and issue automated, verified graduation certificates upon successful course completion.', `banner`='/assets/projects/scrom-lms.png';

INSERT INTO `projects` (`id`, `slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
(9, 'accounts-management', 'Accounts Management System', 'Financial Tool', 'Double-entry financial accounting software with automated invoicing, ledger tracking, and tax reconciliation.', 'The Accounts Management System is a secure, double-entry financial accounting platform designed for small-to-medium enterprises. It automates general financial ledger updates, tracks recurring operating expenses, generates and dispatches professional PDF invoices to clients, and compiles instant Profit & Loss (P&L) financial statements. The system streamlines bank account reconciliations and tax category mapping, saving business owners and accountants over 70% in administrative preparation time.', 'Calculator', '/assets/projects/accounts-management.png', NULL, NULL, NULL, 8, 1)
ON DUPLICATE KEY UPDATE `title`='Accounts Management System', `short_desc`='Double-entry financial accounting software with automated invoicing, ledger tracking, and tax reconciliation.', `full_desc`='The Accounts Management System is a secure, double-entry financial accounting platform designed for small-to-medium enterprises. It automates general financial ledger updates, tracks recurring operating expenses, generates and dispatches professional PDF invoices to clients, and compiles instant Profit & Loss (P&L) financial statements. The system streamlines bank account reconciliations and tax category mapping, saving business owners and accountants over 70% in administrative preparation time.', `banner`='/assets/projects/accounts-management.png';

INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (41, 1, 'React', 0) ON DUPLICATE KEY UPDATE `tag`='React';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (42, 1, 'SaaS', 1) ON DUPLICATE KEY UPDATE `tag`='SaaS';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (43, 1, 'Jewelry Tech', 2) ON DUPLICATE KEY UPDATE `tag`='Jewelry Tech';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (44, 1, 'Marketing Automation', 3) ON DUPLICATE KEY UPDATE `tag`='Marketing Automation';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (45, 2, 'Real-time Sync', 0) ON DUPLICATE KEY UPDATE `tag`='Real-time Sync';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (46, 2, 'POS Billing', 1) ON DUPLICATE KEY UPDATE `tag`='POS Billing';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (47, 2, 'KOT System', 2) ON DUPLICATE KEY UPDATE `tag`='KOT System';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (48, 2, 'Analytics', 3) ON DUPLICATE KEY UPDATE `tag`='Analytics';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (49, 3, 'EHR System', 0) ON DUPLICATE KEY UPDATE `tag`='EHR System';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (50, 3, 'HIPAA Compliant', 1) ON DUPLICATE KEY UPDATE `tag`='HIPAA Compliant';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (51, 3, 'React', 2) ON DUPLICATE KEY UPDATE `tag`='React';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (52, 3, 'Node.js', 3) ON DUPLICATE KEY UPDATE `tag`='Node.js';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (53, 4, 'IoT', 0) ON DUPLICATE KEY UPDATE `tag`='IoT';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (54, 4, 'Factory Floor', 1) ON DUPLICATE KEY UPDATE `tag`='Factory Floor';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (55, 4, 'Automation', 2) ON DUPLICATE KEY UPDATE `tag`='Automation';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (56, 4, 'MQTT', 3) ON DUPLICATE KEY UPDATE `tag`='MQTT';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (57, 5, 'Fintech', 0) ON DUPLICATE KEY UPDATE `tag`='Fintech';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (58, 5, 'Expense Tracker', 1) ON DUPLICATE KEY UPDATE `tag`='Expense Tracker';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (59, 5, 'Multi-Currency', 2) ON DUPLICATE KEY UPDATE `tag`='Multi-Currency';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (60, 5, 'Mobile App', 3) ON DUPLICATE KEY UPDATE `tag`='Mobile App';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (61, 6, 'Contractor Tool', 0) ON DUPLICATE KEY UPDATE `tag`='Contractor Tool';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (62, 6, 'CRM', 1) ON DUPLICATE KEY UPDATE `tag`='CRM';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (63, 6, 'Bid Tracker', 2) ON DUPLICATE KEY UPDATE `tag`='Bid Tracker';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (64, 6, 'Civil Eng', 3) ON DUPLICATE KEY UPDATE `tag`='Civil Eng';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (65, 7, 'Lead Nurturing', 0) ON DUPLICATE KEY UPDATE `tag`='Lead Nurturing';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (66, 7, 'Sales Funnel', 1) ON DUPLICATE KEY UPDATE `tag`='Sales Funnel';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (67, 7, 'Automation', 2) ON DUPLICATE KEY UPDATE `tag`='Automation';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (68, 7, 'CRM Integrations', 3) ON DUPLICATE KEY UPDATE `tag`='CRM Integrations';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (69, 8, 'SCORM Compliant', 0) ON DUPLICATE KEY UPDATE `tag`='SCORM Compliant';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (70, 8, 'LMS', 1) ON DUPLICATE KEY UPDATE `tag`='LMS';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (71, 8, 'E-Learning', 2) ON DUPLICATE KEY UPDATE `tag`='E-Learning';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (72, 8, 'Certification', 3) ON DUPLICATE KEY UPDATE `tag`='Certification';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (73, 9, 'Accounting', 0) ON DUPLICATE KEY UPDATE `tag`='Accounting';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (74, 9, 'Invoicing', 1) ON DUPLICATE KEY UPDATE `tag`='Invoicing';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (75, 9, 'Tax Prep', 2) ON DUPLICATE KEY UPDATE `tag`='Tax Prep';
INSERT INTO `project_tags` (`id`, `project_id`, `tag`, `sort_order`) VALUES (76, 9, 'Double-Entry', 3) ON DUPLICATE KEY UPDATE `tag`='Double-Entry';

INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (61, 1, 'Real-time Gold & Silver Rate Integration', 0) ON DUPLICATE KEY UPDATE `feature`='Real-time Gold & Silver Rate Integration';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (62, 1, 'Automated High-Res Image Generator', 1) ON DUPLICATE KEY UPDATE `feature`='Automated High-Res Image Generator';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (63, 1, 'One-click WhatsApp & Instagram Export', 2) ON DUPLICATE KEY UPDATE `feature`='One-click WhatsApp & Instagram Export';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (64, 1, 'Bulk Poster & Story Generation', 3) ON DUPLICATE KEY UPDATE `feature`='Bulk Poster & Story Generation';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (65, 1, '10 Monthly AI Showroom Video Reels', 4) ON DUPLICATE KEY UPDATE `feature`='10 Monthly AI Showroom Video Reels';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (66, 1, 'Dynamic Brand Kit & Logo Overlay', 5) ON DUPLICATE KEY UPDATE `feature`='Dynamic Brand Kit & Logo Overlay';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (67, 2, 'Real-time Kitchen Display System (KDS)', 0) ON DUPLICATE KEY UPDATE `feature`='Real-time Kitchen Display System (KDS)';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (68, 2, 'Thermal Receipt Printer Integration', 1) ON DUPLICATE KEY UPDATE `feature`='Thermal Receipt Printer Integration';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (69, 2, 'Table & Captain Order Tablet Management', 2) ON DUPLICATE KEY UPDATE `feature`='Table & Captain Order Tablet Management';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (70, 2, 'Offline Billing & Data Recovery', 3) ON DUPLICATE KEY UPDATE `feature`='Offline Billing & Data Recovery';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (71, 2, 'Daily Financial Reconciliation Reports', 4) ON DUPLICATE KEY UPDATE `feature`='Daily Financial Reconciliation Reports';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (72, 2, 'Recipe Costing & Inventory Tracking', 5) ON DUPLICATE KEY UPDATE `feature`='Recipe Costing & Inventory Tracking';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (73, 3, 'Electronic Health Records (EHR)', 0) ON DUPLICATE KEY UPDATE `feature`='Electronic Health Records (EHR)';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (74, 3, 'Doctor Appointment Scheduler Calendar', 1) ON DUPLICATE KEY UPDATE `feature`='Doctor Appointment Scheduler Calendar';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (75, 3, 'Ward & ICU Bed Occupancy Management', 2) ON DUPLICATE KEY UPDATE `feature`='Ward & ICU Bed Occupancy Management';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (76, 3, 'Automated Laboratory Test Reports', 3) ON DUPLICATE KEY UPDATE `feature`='Automated Laboratory Test Reports';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (77, 3, 'Medical Billing & Insurance Claim Sync', 4) ON DUPLICATE KEY UPDATE `feature`='Medical Billing & Insurance Claim Sync';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (78, 3, 'Secure Staff Clinical Communications', 5) ON DUPLICATE KEY UPDATE `feature`='Secure Staff Clinical Communications';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (79, 4, 'Real-Time Machinery Status Telemetry', 0) ON DUPLICATE KEY UPDATE `feature`='Real-Time Machinery Status Telemetry';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (80, 4, 'Predictive Maintenance Alarms', 1) ON DUPLICATE KEY UPDATE `feature`='Predictive Maintenance Alarms';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (81, 4, 'Shift Assembly Throughput Tracking', 2) ON DUPLICATE KEY UPDATE `feature`='Shift Assembly Throughput Tracking';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (82, 4, 'Automated Quality Control Checkpoints', 3) ON DUPLICATE KEY UPDATE `feature`='Automated Quality Control Checkpoints';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (83, 4, 'Barcode & RFID Label Scanner', 4) ON DUPLICATE KEY UPDATE `feature`='Barcode & RFID Label Scanner';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (84, 4, 'PLC & MQTT Industrial Integration', 5) ON DUPLICATE KEY UPDATE `feature`='PLC & MQTT Industrial Integration';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (85, 5, '150+ Currency Live Auto-Conversion', 0) ON DUPLICATE KEY UPDATE `feature`='150+ Currency Live Auto-Conversion';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (86, 5, 'Visual Trip Itinerary Cost Builder', 1) ON DUPLICATE KEY UPDATE `feature`='Visual Trip Itinerary Cost Builder';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (87, 5, 'OCR Receipt Image Scanning', 2) ON DUPLICATE KEY UPDATE `feature`='OCR Receipt Image Scanning';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (88, 5, 'Group Expense Splitting & Settlement', 3) ON DUPLICATE KEY UPDATE `feature`='Group Expense Splitting & Settlement';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (89, 5, 'Category Spending Limit Alerts', 4) ON DUPLICATE KEY UPDATE `feature`='Category Spending Limit Alerts';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (90, 5, 'Offline Data Sync Enabled', 5) ON DUPLICATE KEY UPDATE `feature`='Offline Data Sync Enabled';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (91, 6, 'Bid & Cost Estimate Builder', 0) ON DUPLICATE KEY UPDATE `feature`='Bid & Cost Estimate Builder';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (92, 6, 'Building Material Procurement Tracker', 1) ON DUPLICATE KEY UPDATE `feature`='Building Material Procurement Tracker';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (93, 6, 'Daily Work Site Inspection Photo Logs', 2) ON DUPLICATE KEY UPDATE `feature`='Daily Work Site Inspection Photo Logs';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (94, 6, 'Subcontractor Work Directory', 3) ON DUPLICATE KEY UPDATE `feature`='Subcontractor Work Directory';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (95, 6, 'Milestone Progress Billing Cycles', 4) ON DUPLICATE KEY UPDATE `feature`='Milestone Progress Billing Cycles';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (96, 6, 'Live Site Weather Sync & Logs', 5) ON DUPLICATE KEY UPDATE `feature`='Live Site Weather Sync & Logs';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (97, 7, 'Automated Multi-Channel Lead Capture', 0) ON DUPLICATE KEY UPDATE `feature`='Automated Multi-Channel Lead Capture';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (98, 7, 'Lead Scoring & Intent Algorithm', 1) ON DUPLICATE KEY UPDATE `feature`='Lead Scoring & Intent Algorithm';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (99, 7, 'SLA Rep Follow-up Alerts', 2) ON DUPLICATE KEY UPDATE `feature`='SLA Rep Follow-up Alerts';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (100, 7, 'Email Campaign Engagement Tracking', 3) ON DUPLICATE KEY UPDATE `feature`='Email Campaign Engagement Tracking';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (101, 7, 'Interactive Kanban Pipeline Board', 4) ON DUPLICATE KEY UPDATE `feature`='Interactive Kanban Pipeline Board';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (102, 7, 'Detailed Sales Velocity Analytics', 5) ON DUPLICATE KEY UPDATE `feature`='Detailed Sales Velocity Analytics';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (103, 8, 'Standard SCORM 2004 Package Import', 0) ON DUPLICATE KEY UPDATE `feature`='Standard SCORM 2004 Package Import';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (104, 8, 'Real-Time Student Completion Tracker', 1) ON DUPLICATE KEY UPDATE `feature`='Real-Time Student Completion Tracker';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (105, 8, 'Interactive Quiz & Exam Builders', 2) ON DUPLICATE KEY UPDATE `feature`='Interactive Quiz & Exam Builders';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (106, 8, 'Auto Verification Certificate Issuance', 3) ON DUPLICATE KEY UPDATE `feature`='Auto Verification Certificate Issuance';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (107, 8, 'Instructor Class Performance Dashboards', 4) ON DUPLICATE KEY UPDATE `feature`='Instructor Class Performance Dashboards';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (108, 8, 'Course Access & Enrollment Controls', 5) ON DUPLICATE KEY UPDATE `feature`='Course Access & Enrollment Controls';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (109, 9, 'Automated PDF Invoice Dispatch', 0) ON DUPLICATE KEY UPDATE `feature`='Automated PDF Invoice Dispatch';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (110, 9, 'Double-Entry General Ledger Balance', 1) ON DUPLICATE KEY UPDATE `feature`='Double-Entry General Ledger Balance';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (111, 9, 'Bank Statement Auto-Reconciliation', 2) ON DUPLICATE KEY UPDATE `feature`='Bank Statement Auto-Reconciliation';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (112, 9, 'Instant P&L Financial Statement Generator', 3) ON DUPLICATE KEY UPDATE `feature`='Instant P&L Financial Statement Generator';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (113, 9, 'Automated Tax Category Mapping', 4) ON DUPLICATE KEY UPDATE `feature`='Automated Tax Category Mapping';
INSERT INTO `project_features` (`id`, `project_id`, `feature`, `sort_order`) VALUES (114, 9, 'Secure Accountant Access & Audit Trail', 5) ON DUPLICATE KEY UPDATE `feature`='Secure Accountant Access & Audit Trail';

SET FOREIGN_KEY_CHECKS=1;
