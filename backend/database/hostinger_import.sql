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
  `video_type`   ENUM('youtube', 'upload') NULL DEFAULT NULL,
  `video_url`    VARCHAR(500) NULL,
  `video_file`   VARCHAR(500) NULL,
  `pdf_url`      VARCHAR(500) NULL,
  `live_url`     VARCHAR(500) NULL,
  `sort_order`   INT          NOT NULL DEFAULT 0,
  `is_published` TINYINT(1)   NOT NULL DEFAULT 1,
  `show_web_view`    TINYINT(1)   NOT NULL DEFAULT 1,
  `show_mobile_view` TINYINT(1)   NOT NULL DEFAULT 0,
  `created_at`   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_projects_slug` (`slug`),
  KEY `idx_projects_listing` (`is_published`, `sort_order`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- `CREATE TABLE IF NOT EXISTS` above is a no-op if `projects` already exists
-- from before the banner slider / demo video columns were added (re-imports
-- on an existing production DB). Add them explicitly; requires MySQL 8.0.29+
-- or MariaDB 10.0.2+ for `ADD COLUMN IF NOT EXISTS` (safe no-op on a fresh
-- import too, since CREATE TABLE above already created them).
ALTER TABLE `projects`
  ADD COLUMN IF NOT EXISTS `video_type` ENUM('youtube', 'upload') NULL DEFAULT NULL AFTER `banner`,
  ADD COLUMN IF NOT EXISTS `video_file` VARCHAR(500) NULL DEFAULT NULL AFTER `video_url`,
  ADD COLUMN IF NOT EXISTS `show_web_view` TINYINT(1) NOT NULL DEFAULT 1 AFTER `is_published`,
  ADD COLUMN IF NOT EXISTS `show_mobile_view` TINYINT(1) NOT NULL DEFAULT 0 AFTER `show_web_view`;

UPDATE `projects` SET `video_type` = 'youtube'
  WHERE `video_type` IS NULL AND `video_url` IS NOT NULL AND `video_url` <> '';

-- ── Banner slider images (priority = sort_order, lowest shows first) ────
CREATE TABLE IF NOT EXISTS `project_banners` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` INT UNSIGNED NOT NULL,
  `image`      VARCHAR(500) NOT NULL,
  `sort_order` INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_project_banners_project` (`project_id`, `sort_order`),
  CONSTRAINT `fk_project_banners_project`
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ── Mobile screenshots (portrait phone mockups) ─────────────
CREATE TABLE IF NOT EXISTS `project_mobile_banners` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` INT UNSIGNED NOT NULL,
  `image`      VARCHAR(500) NOT NULL,
  `sort_order` INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_project_mobile_banners_project` (`project_id`, `sort_order`),
  CONSTRAINT `fk_project_mobile_banners_project`
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
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

-- ── Products (Hero panel + #products slider) ─────────────────
CREATE TABLE IF NOT EXISTS `products` (
  `id`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug`           VARCHAR(160) NOT NULL,
  `title`          VARCHAR(200) NOT NULL,
  `subtitle`       VARCHAR(255) NOT NULL DEFAULT '',
  `badge`          VARCHAR(120) NOT NULL DEFAULT '',
  `tagline`        VARCHAR(255) NOT NULL DEFAULT '',
  `description`    TEXT         NOT NULL,
  `overview`       LONGTEXT     NULL,
  `icon`           VARCHAR(60)  NOT NULL DEFAULT 'Boxes',
  `image`          VARCHAR(500) NOT NULL DEFAULT '',
  `video_type`     ENUM('youtube', 'upload') NULL DEFAULT NULL,
  `video_url`      VARCHAR(500) NULL,
  `video_file`     VARCHAR(500) NULL,
  `live_url`       VARCHAR(500) NULL,
  `play_store_url` VARCHAR(500) NULL,
  `is_featured`    TINYINT(1)   NOT NULL DEFAULT 0,
  `sort_order`     INT          NOT NULL DEFAULT 0,
  `is_published`   TINYINT(1)   NOT NULL DEFAULT 1,
  `created_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_products_slug` (`slug`),
  KEY `idx_products_listing` (`is_published`, `sort_order`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- `CREATE TABLE IF NOT EXISTS` above is a no-op if `products` already exists
-- from before these columns were added (re-imports on an existing DB).
ALTER TABLE `products`
  ADD COLUMN IF NOT EXISTS `overview` LONGTEXT NULL AFTER `description`,
  ADD COLUMN IF NOT EXISTS `video_type` ENUM('youtube', 'upload') NULL DEFAULT NULL AFTER `image`,
  ADD COLUMN IF NOT EXISTS `video_url` VARCHAR(500) NULL AFTER `video_type`,
  ADD COLUMN IF NOT EXISTS `video_file` VARCHAR(500) NULL AFTER `video_url`;

CREATE TABLE IF NOT EXISTS `product_banners` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `image`      VARCHAR(500) NOT NULL,
  `sort_order` INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_product_banners_product` (`product_id`, `sort_order`),
  CONSTRAINT `fk_product_banners_product`
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `product_features` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `feature`    VARCHAR(255) NOT NULL,
  `sort_order` INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_product_features_product` (`product_id`, `sort_order`),
  CONSTRAINT `fk_product_features_product`
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;


-- ── Seed Admin User ──────────────────────────────────────────
INSERT INTO `admin_users` (`username`, `password_hash`) VALUES ('admin', '$2y$10$bcBwXcB8mDYk6cHdpcZd7O2uwB3MWcxQzKuYuK9EUb1Q6/h3wXiD2') ON DUPLICATE KEY UPDATE `password_hash` = VALUES(`password_hash`);

-- ── Seed Projects Data (All 26 Projects) ───────────────────────
INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('inwora-erp', 'Inwora ERP', 'Business Software', 'Centralized enterprise resource planning system streamlining multi-branch inventory tracking, purchase orders, sales billing, role-based staff access, and executive operational reporting.', 'Inwora ERP is a centralized enterprise resource planning platform engineered to unify operations for growing commercial businesses and enterprises. The platform consolidates inventory and stock management, vendor procurement, customer sales records, and role-based staff access controls into a single intuitive interface. Operational dashboards and real-time ledger reporting provide business leaders with complete visibility into supply chain movements, daily sales volume, and multi-location asset allocation.', 'Briefcase', '/assets/projects/inwora-erp.jpg', NULL, NULL, 'https://erp.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Inwora ERP', `category`='Business Software', `short_desc`='Centralized enterprise resource planning system streamlining multi-branch inventory tracking, purchase orders, sales billing, role-based staff access, and executive operational reporting.', `full_desc`='Inwora ERP is a centralized enterprise resource planning platform engineered to unify operations for growing commercial businesses and enterprises. The platform consolidates inventory and stock management, vendor procurement, customer sales records, and role-based staff access controls into a single intuitive interface. Operational dashboards and real-time ledger reporting provide business leaders with complete visibility into supply chain movements, daily sales volume, and multi-location asset allocation.', `icon`='Briefcase', `banner`='/assets/projects/inwora-erp.jpg', `live_url`='https://erp.inwora.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('balaji-jewellers', 'Balaji Jewellers', 'Jewellery', 'Elegant jewellery showroom website presenting bridal collections, gold ornaments, and bespoke craftsmanship with interactive customer enquiry options across all screen sizes.', 'Balaji Jewellers is a modern digital showcase designed for a premier jewellery business. The platform highlights bridal gold, diamond, and antique ornament collections through high-resolution photography, categorized catalogues, and artisan storytelling. Customers can explore hallmark purity standards, review showroom locations, and submit direct enquiries for bespoke designs. Engineered for seamless responsiveness, the site delivers a luxury browsing experience tailored to retail jewellery buyers.', 'Gem', '/assets/projects/balaji-jewellers.svg', NULL, NULL, 'https://balajijwellers.aimstorm.in', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Balaji Jewellers', `category`='Jewellery', `short_desc`='Elegant jewellery showroom website presenting bridal collections, gold ornaments, and bespoke craftsmanship with interactive customer enquiry options across all screen sizes.', `full_desc`='Balaji Jewellers is a modern digital showcase designed for a premier jewellery business. The platform highlights bridal gold, diamond, and antique ornament collections through high-resolution photography, categorized catalogues, and artisan storytelling. Customers can explore hallmark purity standards, review showroom locations, and submit direct enquiries for bespoke designs. Engineered for seamless responsiveness, the site delivers a luxury browsing experience tailored to retail jewellery buyers.', `icon`='Gem', `banner`='/assets/projects/balaji-jewellers.svg', `live_url`='https://balajijwellers.aimstorm.in';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('sri-abnaya', 'Sri Abnaya', 'Business Websites', 'Modern business website presenting corporate services, product offerings, and brand credentials with intuitive navigation and direct customer enquiry channels.', 'Sri Abnaya is a professional corporate web presence built to establish credible digital branding and streamline client communication. The website features structured service presentations, comprehensive business profile sections, and clear navigation designed to guide prospective clients toward key offerings. Direct enquiry touchpoints and responsive layouts ensure that visitors on any device can easily learn about the firm\'s solutions and initiate consultations.', 'Globe', '/assets/projects/sri-abnaya.svg', NULL, NULL, 'https://sriabnaya.aimstorm.in', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Sri Abnaya', `category`='Business Websites', `short_desc`='Modern business website presenting corporate services, product offerings, and brand credentials with intuitive navigation and direct customer enquiry channels.', `full_desc`='Sri Abnaya is a professional corporate web presence built to establish credible digital branding and streamline client communication. The website features structured service presentations, comprehensive business profile sections, and clear navigation designed to guide prospective clients toward key offerings. Direct enquiry touchpoints and responsive layouts ensure that visitors on any device can easily learn about the firm\'s solutions and initiate consultations.', `icon`='Globe', `banner`='/assets/projects/sri-abnaya.svg', `live_url`='https://sriabnaya.aimstorm.in';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('malligai-crm', 'Malligai CRM', 'Business Software', 'Customer relationship and lead management system tracking sales inquiries, automated follow-up schedules, interaction histories, and team conversion performance.', 'Malligai CRM is a dedicated customer relationship platform built to organize lead pipelines and optimize conversion workflows for sales teams. The software centralizes customer contact cards, tracks multi-channel enquiries, and automates follow-up reminder alerts so no prospect slips through the cracks. Team supervisors benefit from role-based assignment, interaction history timelines, and clear pipeline analytics that monitor representative performance and deal velocity.', 'Users', '/assets/projects/malligai-crm.svg', NULL, NULL, 'https://crmmalligai.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Malligai CRM', `category`='Business Software', `short_desc`='Customer relationship and lead management system tracking sales inquiries, automated follow-up schedules, interaction histories, and team conversion performance.', `full_desc`='Malligai CRM is a dedicated customer relationship platform built to organize lead pipelines and optimize conversion workflows for sales teams. The software centralizes customer contact cards, tracks multi-channel enquiries, and automates follow-up reminder alerts so no prospect slips through the cracks. Team supervisors benefit from role-based assignment, interaction history timelines, and clear pipeline analytics that monitor representative performance and deal velocity.', `icon`='Users', `banner`='/assets/projects/malligai-crm.svg', `live_url`='https://crmmalligai.inwora.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('jci-malligai', 'JCI Malligai', 'Business Software', 'Member directory and organizational operations portal facilitating activity logging, leadership workflows, event tracking, and centralized chapter administration.', 'JCI Malligai is a comprehensive organizational operations portal developed to coordinate member management and chapter initiatives. The platform digitizes member directories, tracks leadership workflows, and logs chapter projects and community activities in one central hub. Administrative dashboards provide officers with role-based governance, attendance verification, and automated reporting to keep organizational operations transparent and efficient.', 'Users', '/assets/projects/jci-malligai.svg', NULL, NULL, 'https://jcimalligai.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='JCI Malligai', `category`='Business Software', `short_desc`='Member directory and organizational operations portal facilitating activity logging, leadership workflows, event tracking, and centralized chapter administration.', `full_desc`='JCI Malligai is a comprehensive organizational operations portal developed to coordinate member management and chapter initiatives. The platform digitizes member directories, tracks leadership workflows, and logs chapter projects and community activities in one central hub. Administrative dashboards provide officers with role-based governance, attendance verification, and automated reporting to keep organizational operations transparent and efficient.', `icon`='Users', `banner`='/assets/projects/jci-malligai.svg', `live_url`='https://jcimalligai.inwora.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('store-grocery-panel', 'Store Grocery Panel', 'E-commerce & Retail', 'Vendor-facing grocery store portal for managing inventory availability, catalog pricing, incoming customer orders, fulfillment statuses, and store operating hours.', 'Store Grocery Panel is a merchant management interface tailored for grocery store managers and department vendors. It allows store staff to manage item catalog pricing, toggle live stock availability, and process incoming grocery orders through real-time fulfillment pipelines. Store managers can monitor order packing stages, update delivery handoffs, adjust operating hours, and oversee daily sales totals directly from their dedicated operational terminal.', 'Store', '/assets/projects/store-grocery-panel.svg', NULL, NULL, 'https://storegrocery.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Store Grocery Panel', `category`='E-commerce & Retail', `short_desc`='Vendor-facing grocery store portal for managing inventory availability, catalog pricing, incoming customer orders, fulfillment statuses, and store operating hours.', `full_desc`='Store Grocery Panel is a merchant management interface tailored for grocery store managers and department vendors. It allows store staff to manage item catalog pricing, toggle live stock availability, and process incoming grocery orders through real-time fulfillment pipelines. Store managers can monitor order packing stages, update delivery handoffs, adjust operating hours, and oversee daily sales totals directly from their dedicated operational terminal.', `icon`='Store', `banner`='/assets/projects/store-grocery-panel.svg', `live_url`='https://storegrocery.inwora.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('user-grocery-app', 'User Grocery App', 'E-commerce & Retail', 'Customer-facing online grocery shopping web app featuring rapid product discovery, category filters, interactive cart, secure checkout, and order history.', 'User Grocery App is an intuitive online grocery application engineered to deliver a seamless shopping experience for everyday household shoppers. Customers can browse fresh produce, pantry staples, and FMCG categories using instant search and filtering. The application features item detail cards, one-tap cart adjustments, scheduled delivery selection, and clear order tracking, enabling users to reorder frequent items effortlessly from desktop or mobile browsers.', 'ShoppingCart', '/assets/projects/user-grocery-app.svg', NULL, NULL, 'https://usergrocery.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='User Grocery App', `category`='E-commerce & Retail', `short_desc`='Customer-facing online grocery shopping web app featuring rapid product discovery, category filters, interactive cart, secure checkout, and order history.', `full_desc`='User Grocery App is an intuitive online grocery application engineered to deliver a seamless shopping experience for everyday household shoppers. Customers can browse fresh produce, pantry staples, and FMCG categories using instant search and filtering. The application features item detail cards, one-tap cart adjustments, scheduled delivery selection, and clear order tracking, enabling users to reorder frequent items effortlessly from desktop or mobile browsers.', `icon`='ShoppingCart', `banner`='/assets/projects/user-grocery-app.svg', `live_url`='https://usergrocery.inwora.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('admin-grocery-dashboard', 'Admin Grocery Dashboard', 'E-commerce & Retail', 'Central administration dashboard overseeing multi-store grocery operations, vendor approvals, catalog categories, platform orders, and role-based permissions.', 'Admin Grocery Dashboard is the central administrative engine orchestrating the entire grocery commerce ecosystem. Platform operators can approve new vendor stores, manage master product taxonomies, monitor platform-wide order velocity, and enforce operational guidelines. Featuring granular role-based access control and detailed activity logs, the dashboard provides administrators with the oversight needed to maintain service quality across participating stores.', 'LineChart', '/assets/projects/admin-grocery-dashboard.svg', NULL, NULL, 'https://admingrocery.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Admin Grocery Dashboard', `category`='E-commerce & Retail', `short_desc`='Central administration dashboard overseeing multi-store grocery operations, vendor approvals, catalog categories, platform orders, and role-based permissions.', `full_desc`='Admin Grocery Dashboard is the central administrative engine orchestrating the entire grocery commerce ecosystem. Platform operators can approve new vendor stores, manage master product taxonomies, monitor platform-wide order velocity, and enforce operational guidelines. Featuring granular role-based access control and detailed activity logs, the dashboard provides administrators with the oversight needed to maintain service quality across participating stores.', `icon`='LineChart', `banner`='/assets/projects/admin-grocery-dashboard.svg', `live_url`='https://admingrocery.inwora.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('grocery-api', 'Grocery API', 'E-commerce & Retail', 'High-performance RESTful API powering grocery customer applications, vendor merchant portals, and central admin systems with secure token authentication.', 'Grocery API serves as the foundational backend infrastructure that links the customer web application, vendor store terminals, and central administration dashboard. Built with a scalable RESTful architecture, the API handles token-based authentication, catalog synchronization, real-time inventory adjustments, and transactional order routing. It ensures data consistency and fast response times across concurrent shopping sessions and operational workflows.', 'Server', '/assets/projects/grocery-api.svg', NULL, NULL, 'https://groceryapi.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Grocery API', `category`='E-commerce & Retail', `short_desc`='High-performance RESTful API powering grocery customer applications, vendor merchant portals, and central admin systems with secure token authentication.', `full_desc`='Grocery API serves as the foundational backend infrastructure that links the customer web application, vendor store terminals, and central administration dashboard. Built with a scalable RESTful architecture, the API handles token-based authentication, catalog synchronization, real-time inventory adjustments, and transactional order routing. It ensures data consistency and fast response times across concurrent shopping sessions and operational workflows.', `icon`='Server', `banner`='/assets/projects/grocery-api.svg', `live_url`='https://groceryapi.inwora.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('takeaway', 'Takeaway', 'Food & Beverage', 'Online takeaway and food ordering system featuring digital menu browsing, custom item options, quick cart checkout, and live order tracking.', 'Takeaway is a digital food ordering platform created for restaurants and quick-service food outlets to take direct customer pickup and takeaway orders online. Diners can explore digital menus organized by meal categories, customize portion selections, and place orders smoothly through a mobile-optimized checkout. The system bridges customer orders directly to kitchen counters, streamlining preparation times and pickup coordination.', 'Utensils', '/assets/projects/takeaway.svg', NULL, NULL, 'https://takeaway.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Takeaway', `category`='Food & Beverage', `short_desc`='Online takeaway and food ordering system featuring digital menu browsing, custom item options, quick cart checkout, and live order tracking.', `full_desc`='Takeaway is a digital food ordering platform created for restaurants and quick-service food outlets to take direct customer pickup and takeaway orders online. Diners can explore digital menus organized by meal categories, customize portion selections, and place orders smoothly through a mobile-optimized checkout. The system bridges customer orders directly to kitchen counters, streamlining preparation times and pickup coordination.', `icon`='Utensils', `banner`='/assets/projects/takeaway.svg', `live_url`='https://takeaway.inwora.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('wallmark', 'Wallmark', 'Business Websites', 'Architectural facades and structural engineering brand website showcasing building envelopes, glazing installations, cladding projects, and technical capabilities.', 'Wallmark is a corporate brand website representing Wallmark Facades and Structures, a specialist in architectural glazing, curtain walls, ACP cladding, and structural steel works. The website presents past commercial architectural projects, detailing technical engineering standards, materials, and exterior design execution. Prospective architects and property developers can examine completed project portfolios and connect directly with structural engineering consultants.', 'HardHat', '/assets/projects/wallmark.svg', NULL, NULL, 'https://wallmark.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Wallmark', `category`='Business Websites', `short_desc`='Architectural facades and structural engineering brand website showcasing building envelopes, glazing installations, cladding projects, and technical capabilities.', `full_desc`='Wallmark is a corporate brand website representing Wallmark Facades and Structures, a specialist in architectural glazing, curtain walls, ACP cladding, and structural steel works. The website presents past commercial architectural projects, detailing technical engineering standards, materials, and exterior design execution. Prospective architects and property developers can examine completed project portfolios and connect directly with structural engineering consultants.', `icon`='HardHat', `banner`='/assets/projects/wallmark.svg', `live_url`='https://wallmark.inwora.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('thambalam', 'Thambalam', 'Business Websites', 'Handcrafted wedding thambalam bag design website showcasing customized return-gift bags, traditional zari embroidery, fabric variations, and bulk order enquiries.', 'Thambalam is a boutique showcase website highlighting handcrafted wedding thambalam bags and traditional gift packaging for auspicious celebrations. The platform features curated collections of silk, jute, and raw-silk return-gift bags adorned with traditional motifs and zari embroidery. Wedding planners and families can view customization options, explore fabric finishes, and submit bulk order enquiries for festive occasions.', 'Layout', '/assets/projects/thambalam.svg', NULL, NULL, 'https://thambalam.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Thambalam', `category`='Business Websites', `short_desc`='Handcrafted wedding thambalam bag design website showcasing customized return-gift bags, traditional zari embroidery, fabric variations, and bulk order enquiries.', `full_desc`='Thambalam is a boutique showcase website highlighting handcrafted wedding thambalam bags and traditional gift packaging for auspicious celebrations. The platform features curated collections of silk, jute, and raw-silk return-gift bags adorned with traditional motifs and zari embroidery. Wedding planners and families can view customization options, explore fabric finishes, and submit bulk order enquiries for festive occasions.', `icon`='Layout', `banner`='/assets/projects/thambalam.svg', `live_url`='https://thambalam.inwora.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('chai-fi', 'Chai Fi', 'Food & Beverage', 'Modern café and beverage-brand billing solution presenting artisanal teas, instant POS bill generation, ingredient tracking, and mobile-friendly café ordering.', 'Chai Fi is a specialized café web platform and modern billing application built for specialty tea and beverage outlets. Combining contemporary café branding with swift point-of-sale functionality, the interface displays signature chai varieties, snacks, and beverage collections. Counter staff can issue speedy customer bills, track ingredient consumption, and handle customer queues during peak café hours with a lightweight, responsive interface.', 'Coffee', '/assets/projects/chai-fi.svg', NULL, NULL, 'https://chaifi.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Chai Fi', `category`='Food & Beverage', `short_desc`='Modern café and beverage-brand billing solution presenting artisanal teas, instant POS bill generation, ingredient tracking, and mobile-friendly café ordering.', `full_desc`='Chai Fi is a specialized café web platform and modern billing application built for specialty tea and beverage outlets. Combining contemporary café branding with swift point-of-sale functionality, the interface displays signature chai varieties, snacks, and beverage collections. Counter staff can issue speedy customer bills, track ingredient consumption, and handle customer queues during peak café hours with a lightweight, responsive interface.', `icon`='Coffee', `banner`='/assets/projects/chai-fi.svg', `live_url`='https://chaifi.inwora.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('grocery-website', 'Grocery Website', 'E-commerce & Retail', 'Responsive grocery e-commerce storefront offering organized pantry categories, smart search, basket management, customer accounts, and scheduled home delivery.', 'Grocery Website is a full-featured customer grocery e-commerce storefront designed for fast, accessible household provisioning on desktop and mobile web browsers. It provides shoppers with intuitive department browsing—spanning fresh produce, grains, dairy, and household essentials. With category filters, persistent cart states, transparent delivery slot selection, and past order reordering, customers enjoy a dependable grocery purchasing journey.', 'ShoppingCart', '/assets/projects/grocery-website.svg', NULL, NULL, 'https://grocery.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Grocery Website', `category`='E-commerce & Retail', `short_desc`='Responsive grocery e-commerce storefront offering organized pantry categories, smart search, basket management, customer accounts, and scheduled home delivery.', `full_desc`='Grocery Website is a full-featured customer grocery e-commerce storefront designed for fast, accessible household provisioning on desktop and mobile web browsers. It provides shoppers with intuitive department browsing—spanning fresh produce, grains, dairy, and household essentials. With category filters, persistent cart states, transparent delivery slot selection, and past order reordering, customers enjoy a dependable grocery purchasing journey.', `icon`='ShoppingCart', `banner`='/assets/projects/grocery-website.svg', `live_url`='https://grocery.inwora.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('wora-stayz', 'Wora Stayz', 'Hospitality', 'Hospitality and accommodation platform showcasing room inventories, property amenities, local area guides, and guest room reservation enquiries.', 'Wora Stayz is a boutique hospitality and accommodation web platform designed for premium stays and serviced apartments. The platform showcases room categories with high-definition photography, bed configurations, room amenities, and transparent pricing. Visitors can review property locations, explore nearby attractions, check seasonal availability, and submit direct room reservation inquiries through an intuitive, mobile-friendly interface.', 'Building2', '/assets/projects/wora-stayz.svg', NULL, NULL, 'https://worastayz.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Wora Stayz', `category`='Hospitality', `short_desc`='Hospitality and accommodation platform showcasing room inventories, property amenities, local area guides, and guest room reservation enquiries.', `full_desc`='Wora Stayz is a boutique hospitality and accommodation web platform designed for premium stays and serviced apartments. The platform showcases room categories with high-definition photography, bed configurations, room amenities, and transparent pricing. Visitors can review property locations, explore nearby attractions, check seasonal availability, and submit direct room reservation inquiries through an intuitive, mobile-friendly interface.', `icon`='Building2', `banner`='/assets/projects/wora-stayz.svg', `live_url`='https://worastayz.inwora.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('priyam', 'Priyam', 'Food & Beverage', 'Authentic South Indian agro foods website showcasing traditional pastes, thuvaiyals, and culinary relishes with brand storytelling and customer enquiries.', 'Priyam is the official digital brand platform for Priyam Agro Foods, a Madurai-based producer of authentic South Indian culinary pastes, traditional thuvaiyals, and natural food seasonings. The website presents their culinary heritage, natural ingredient philosophy, and product range—including classic garlic, curry leaf, and ginger pastes. Retailers and consumers can learn about hygiene standards, explore recipes, and place direct distribution enquiries.', 'Utensils', '/assets/projects/priyam.svg', NULL, NULL, 'https://priyam.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Priyam', `category`='Food & Beverage', `short_desc`='Authentic South Indian agro foods website showcasing traditional pastes, thuvaiyals, and culinary relishes with brand storytelling and customer enquiries.', `full_desc`='Priyam is the official digital brand platform for Priyam Agro Foods, a Madurai-based producer of authentic South Indian culinary pastes, traditional thuvaiyals, and natural food seasonings. The website presents their culinary heritage, natural ingredient philosophy, and product range—including classic garlic, curry leaf, and ginger pastes. Retailers and consumers can learn about hygiene standards, explore recipes, and place direct distribution enquiries.', `icon`='Utensils', `banner`='/assets/projects/priyam.svg', `live_url`='https://priyam.inwora.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('gold-poster', 'Gold Platform', 'Jewellery', 'Jewellery business automation platform generating real-time gold and silver rate posters, dynamic brand overlays, and showroom marketing media.', 'Gold Platform (formerly Inwora Gold Poster) is a specialized digital platform engineered for jewelry showrooms and bullion merchants. The system automates daily bullion rate publication (24K, 22K, 18K gold and silver), embedding verified market prices onto high-resolution showroom-branded promotional templates. Showroom managers can generate customized marketing graphics with their showroom logos and contact details in a single tap, streamlining daily rate communication across social channels.', 'Gem', '/assets/projects/gold-poster.jpg', 'https://www.youtube.com/embed/dQw4w9WgXcQ', '/assets/pdf/gold-poster-presentation.pdf', 'https://gold.inwora.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Gold Platform', `category`='Jewellery', `short_desc`='Jewellery business automation platform generating real-time gold and silver rate posters, dynamic brand overlays, and showroom marketing media.', `full_desc`='Gold Platform (formerly Inwora Gold Poster) is a specialized digital platform engineered for jewelry showrooms and bullion merchants. The system automates daily bullion rate publication (24K, 22K, 18K gold and silver), embedding verified market prices onto high-resolution showroom-branded promotional templates. Showroom managers can generate customized marketing graphics with their showroom logos and contact details in a single tap, streamlining daily rate communication across social channels.', `icon`='Gem', `banner`='/assets/projects/gold-poster.jpg', `live_url`='https://gold.inwora.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('subra-residency', 'Subra Residency', 'Hospitality', 'Kumbakonam temple city hotel website highlighting comfortable guest rooms, pilgrimage amenities, proximity to sacred temples, and booking enquiries.', 'Subra Residency is the official hospitality website for a hotel located in the historic temple city of Kumbakonam. The website presents air-conditioned deluxe and family rooms tailored for pilgrims, tourists, and business visitors. Guests can review in-room amenities, access driving directions to prominent Kumbakonam temples, verify front-desk services, and submit booking enquiries directly through a fast, mobile-friendly interface.', 'Building2', '/assets/projects/subra-residency.svg', NULL, NULL, 'https://subraresidency.com', 0, 1)
ON DUPLICATE KEY UPDATE `title`='Subra Residency', `category`='Hospitality', `short_desc`='Kumbakonam temple city hotel website highlighting comfortable guest rooms, pilgrimage amenities, proximity to sacred temples, and booking enquiries.', `full_desc`='Subra Residency is the official hospitality website for a hotel located in the historic temple city of Kumbakonam. The website presents air-conditioned deluxe and family rooms tailored for pilgrims, tourists, and business visitors. Guests can review in-room amenities, access driving directions to prominent Kumbakonam temples, verify front-desk services, and submit booking enquiries directly through a fast, mobile-friendly interface.', `icon`='Building2', `banner`='/assets/projects/subra-residency.svg', `live_url`='https://subraresidency.com';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('pos-kot', 'POS & KOT for Restaurants', 'Food & Beverage', 'Integrated Point-of-Sale billing, table management, and live Kitchen Order Ticket (KOT) workflow system.', 'POS & KOT for Restaurants is an enterprise-grade dining outlet management system designed to bridge table order booking counters directly with the kitchen. Built for fast-paced restaurants, cafes, and multi-outlet dining chains, waitstaff can enter table orders on mobile tablets, which instantly sync onto Kitchen Display System (KDS) screens and print thermal Kitchen Order Tickets (KOT) in real time. It features split billing, captain management, inventory depletion tracking, thermal receipt printing, and automated end-of-day financial reconciliation reports.', 'Utensils', '/assets/projects/pos-kot.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ', '/assets/pdf/nexora-pos-deck.pdf', NULL, 0, 1)
ON DUPLICATE KEY UPDATE `title`='POS & KOT for Restaurants', `category`='Food & Beverage', `short_desc`='Integrated Point-of-Sale billing, table management, and live Kitchen Order Ticket (KOT) workflow system.', `full_desc`='POS & KOT for Restaurants is an enterprise-grade dining outlet management system designed to bridge table order booking counters directly with the kitchen. Built for fast-paced restaurants, cafes, and multi-outlet dining chains, waitstaff can enter table orders on mobile tablets, which instantly sync onto Kitchen Display System (KDS) screens and print thermal Kitchen Order Tickets (KOT) in real time. It features split billing, captain management, inventory depletion tracking, thermal receipt printing, and automated end-of-day financial reconciliation reports.', `icon`='Utensils', `banner`='/assets/projects/pos-kot.png', `live_url`=NULL;

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('construction-crm', 'Construction CRM', 'Business Software', 'Dedicated CRM for construction groups to track client bids, contractor materials, and work site progress.', 'Construction CRM is a specialized contractor CRM platform tailored to handle the unique workflows of general contractors, commercial builders, and civil engineering groups. It centralizes contractor directories, tracks construction bid progress, manages building material procurement orders, and hosts client communication boards. Site managers can upload daily site pictures and inspection logs to update property owners on build milestones, weather conditions, and progress billing cycles.', 'HardHat', '/assets/projects/construction-crm.png', NULL, NULL, NULL, 0, 1)
ON DUPLICATE KEY UPDATE `title`='Construction CRM', `category`='Business Software', `short_desc`='Dedicated CRM for construction groups to track client bids, contractor materials, and work site progress.', `full_desc`='Construction CRM is a specialized contractor CRM platform tailored to handle the unique workflows of general contractors, commercial builders, and civil engineering groups. It centralizes contractor directories, tracks construction bid progress, manages building material procurement orders, and hosts client communication boards. Site managers can upload daily site pictures and inspection logs to update property owners on build milestones, weather conditions, and progress billing cycles.', `icon`='HardHat', `banner`='/assets/projects/construction-crm.png', `live_url`=NULL;

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('lead-management', 'Lead Management System', 'Business Software', 'Growth-centric sales funnel to capture, score, route, and convert B2B leads across digital marketing channels.', 'The Lead Management System is a B2B sales automation CRM engineered to track business leads from initial digital capture through final deal conversion. Featuring an interactive Kanban pipeline board, the platform ranks incoming leads using an automated lead-scoring algorithm based on engagement levels and buyer intent. It automatically routes high-value prospects to appropriate sales reps, triggers SLA follow-up alerts, tracks email campaign open rates, and provides detailed sales velocity analytics.', 'LineChart', '/assets/projects/lead-management.png', NULL, NULL, NULL, 0, 1)
ON DUPLICATE KEY UPDATE `title`='Lead Management System', `category`='Business Software', `short_desc`='Growth-centric sales funnel to capture, score, route, and convert B2B leads across digital marketing channels.', `full_desc`='The Lead Management System is a B2B sales automation CRM engineered to track business leads from initial digital capture through final deal conversion. Featuring an interactive Kanban pipeline board, the platform ranks incoming leads using an automated lead-scoring algorithm based on engagement levels and buyer intent. It automatically routes high-value prospects to appropriate sales reps, triggers SLA follow-up alerts, tracks email campaign open rates, and provides detailed sales velocity analytics.', `icon`='LineChart', `banner`='/assets/projects/lead-management.png', `live_url`=NULL;

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('accounts-management', 'Accounts Management System', 'Business Software', 'Double-entry financial accounting software with automated invoicing, ledger tracking, and tax reconciliation.', 'The Accounts Management System is a secure, double-entry financial accounting platform designed for small-to-medium enterprises. It automates general financial ledger updates, tracks recurring operating expenses, generates and dispatches professional PDF invoices to clients, and compiles instant Profit & Loss (P&L) financial statements. The system streamlines bank account reconciliations and tax category mapping, saving business owners and accountants over 70% in administrative preparation time.', 'Calculator', '/assets/projects/accounts-management.png', NULL, NULL, NULL, 0, 1)
ON DUPLICATE KEY UPDATE `title`='Accounts Management System', `category`='Business Software', `short_desc`='Double-entry financial accounting software with automated invoicing, ledger tracking, and tax reconciliation.', `full_desc`='The Accounts Management System is a secure, double-entry financial accounting platform designed for small-to-medium enterprises. It automates general financial ledger updates, tracks recurring operating expenses, generates and dispatches professional PDF invoices to clients, and compiles instant Profit & Loss (P&L) financial statements. The system streamlines bank account reconciliations and tax category mapping, saving business owners and accountants over 70% in administrative preparation time.', `icon`='Calculator', `banner`='/assets/projects/accounts-management.png', `live_url`=NULL;

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('factory-automation', 'Automated Factory Application', 'Business Software', 'Smart Industry 4.0 factory floor control dashboard with real-time IoT machinery monitoring and quality checks.', 'The Automated Factory Application is a custom Industry 4.0 industrial IoT monitoring platform built for modern manufacturing plants and assembly lines. By connecting PLC controllers and wireless MQTT sensors directly to centralized management dashboards, the system tracks real-time machine operating status, assembly line throughput, temperature/vibration metrics, and Overall Equipment Effectiveness (OEE). It automatically triggers predictive maintenance alarms before breakdowns occur, reducing factory assembly downtime by 90% and eliminating manual paper logs.', 'Cpu', '/assets/projects/factory-automation.png', NULL, NULL, NULL, 0, 1)
ON DUPLICATE KEY UPDATE `title`='Automated Factory Application', `category`='Business Software', `short_desc`='Smart Industry 4.0 factory floor control dashboard with real-time IoT machinery monitoring and quality checks.', `full_desc`='The Automated Factory Application is a custom Industry 4.0 industrial IoT monitoring platform built for modern manufacturing plants and assembly lines. By connecting PLC controllers and wireless MQTT sensors directly to centralized management dashboards, the system tracks real-time machine operating status, assembly line throughput, temperature/vibration metrics, and Overall Equipment Effectiveness (OEE). It automatically triggers predictive maintenance alarms before breakdowns occur, reducing factory assembly downtime by 90% and eliminating manual paper logs.', `icon`='Cpu', `banner`='/assets/projects/factory-automation.png', `live_url`=NULL;

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('hospital-management', 'Hospital Management Application', 'Business Software', 'HIPAA-compliant healthcare portal for Electronic Health Records (EHR), doctor scheduling, and medical billing.', 'The Hospital Management Application is a secure, HIPAA-compliant digital healthcare portal created to streamline clinical operations and patient care. It manages end-to-end hospital administrative workflows, including patient registration, OPD/IPD admission logs, doctor appointment scheduling calendars, and Electronic Health Record (EHR) maintenance. The platform automates lab test report dispatches, ward bed allocations, and itemized medical billing claims, empowering clinical staff and physicians to deliver coordinated, error-free patient care.', 'Activity', '/assets/projects/hospital-management.png', NULL, NULL, NULL, 0, 1)
ON DUPLICATE KEY UPDATE `title`='Hospital Management Application', `category`='Business Software', `short_desc`='HIPAA-compliant healthcare portal for Electronic Health Records (EHR), doctor scheduling, and medical billing.', `full_desc`='The Hospital Management Application is a secure, HIPAA-compliant digital healthcare portal created to streamline clinical operations and patient care. It manages end-to-end hospital administrative workflows, including patient registration, OPD/IPD admission logs, doctor appointment scheduling calendars, and Electronic Health Record (EHR) maintenance. The platform automates lab test report dispatches, ward bed allocations, and itemized medical billing claims, empowering clinical staff and physicians to deliver coordinated, error-free patient care.', `icon`='Activity', `banner`='/assets/projects/hospital-management.png', `live_url`=NULL;

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('travel-budget', 'Travel Budget Application', 'Business Software', 'Multi-currency travel expense tracker, receipt scanner, and visual itinerary cost planner for teams and travelers.', 'The Travel Budget Application is a smart fintech tool designed for leisure travelers and corporate business teams to track expenditures, set category budgets, and prevent overspending while on the road. Integrated with live auto-converting currency exchange rates, the application allows users to split expenses across accommodation, flights, transportation, and dining. Travelers can scan physical paper receipts via OCR, view visual itinerary budget maps, and divide group trip expenses seamlessly offline and online.', 'Compass', '/assets/projects/travel-budget.png', NULL, NULL, NULL, 0, 1)
ON DUPLICATE KEY UPDATE `title`='Travel Budget Application', `category`='Business Software', `short_desc`='Multi-currency travel expense tracker, receipt scanner, and visual itinerary cost planner for teams and travelers.', `full_desc`='The Travel Budget Application is a smart fintech tool designed for leisure travelers and corporate business teams to track expenditures, set category budgets, and prevent overspending while on the road. Integrated with live auto-converting currency exchange rates, the application allows users to split expenses across accommodation, flights, transportation, and dining. Travelers can scan physical paper receipts via OCR, view visual itinerary budget maps, and divide group trip expenses seamlessly offline and online.', `icon`='Compass', `banner`='/assets/projects/travel-budget.png', `live_url`=NULL;

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `video_url`, `pdf_url`, `live_url`, `sort_order`, `is_published`) VALUES
('scrom-lms', 'SCORM LMS Learning Management System', 'Business Software', 'SCORM-compliant e-learning digital academy for interactive course delivery, student tracking, and auto-certification.', 'Our SCORM LMS is a digital learning academy portal built for educational institutions and corporate training programs. Built around SCORM 2004 standards, it seamlessly imports standardized e-learning course packages, maintaining precise logs on student module completion times, quiz scores, and learning progress metrics. Instructors can build interactive quizzes, monitor class analytics, and issue automated, verified graduation certificates upon successful course completion.', 'GraduationCap', '/assets/projects/scrom-lms.png', NULL, NULL, NULL, 0, 1)
ON DUPLICATE KEY UPDATE `title`='SCORM LMS Learning Management System', `category`='Business Software', `short_desc`='SCORM-compliant e-learning digital academy for interactive course delivery, student tracking, and auto-certification.', `full_desc`='Our SCORM LMS is a digital learning academy portal built for educational institutions and corporate training programs. Built around SCORM 2004 standards, it seamlessly imports standardized e-learning course packages, maintaining precise logs on student module completion times, quiz scores, and learning progress metrics. Instructors can build interactive quizzes, monitor class analytics, and issue automated, verified graduation certificates upon successful course completion.', `icon`='GraduationCap', `banner`='/assets/projects/scrom-lms.png', `live_url`=NULL;

-- ── Project Banners ──────────────────────────────────────────
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/inwora-erp.jpg', 0 FROM `projects` WHERE `slug` = 'inwora-erp';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/balaji-jewellers.svg', 0 FROM `projects` WHERE `slug` = 'balaji-jewellers';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/sri-abnaya.svg', 0 FROM `projects` WHERE `slug` = 'sri-abnaya';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/malligai-crm.svg', 0 FROM `projects` WHERE `slug` = 'malligai-crm';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/jci-malligai.svg', 0 FROM `projects` WHERE `slug` = 'jci-malligai';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/store-grocery-panel.svg', 0 FROM `projects` WHERE `slug` = 'store-grocery-panel';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/user-grocery-app.svg', 0 FROM `projects` WHERE `slug` = 'user-grocery-app';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/admin-grocery-dashboard.svg', 0 FROM `projects` WHERE `slug` = 'admin-grocery-dashboard';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/grocery-api.svg', 0 FROM `projects` WHERE `slug` = 'grocery-api';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/takeaway.svg', 0 FROM `projects` WHERE `slug` = 'takeaway';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/wallmark.svg', 0 FROM `projects` WHERE `slug` = 'wallmark';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/thambalam.svg', 0 FROM `projects` WHERE `slug` = 'thambalam';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/chai-fi.svg', 0 FROM `projects` WHERE `slug` = 'chai-fi';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/grocery-website.svg', 0 FROM `projects` WHERE `slug` = 'grocery-website';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/wora-stayz.svg', 0 FROM `projects` WHERE `slug` = 'wora-stayz';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/priyam.svg', 0 FROM `projects` WHERE `slug` = 'priyam';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/gold-poster.jpg', 0 FROM `projects` WHERE `slug` = 'gold-poster';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/subra-residency.svg', 0 FROM `projects` WHERE `slug` = 'subra-residency';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/pos-kot.png', 0 FROM `projects` WHERE `slug` = 'pos-kot';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/construction-crm.png', 0 FROM `projects` WHERE `slug` = 'construction-crm';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/lead-management.png', 0 FROM `projects` WHERE `slug` = 'lead-management';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/accounts-management.png', 0 FROM `projects` WHERE `slug` = 'accounts-management';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/factory-automation.png', 0 FROM `projects` WHERE `slug` = 'factory-automation';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/hospital-management.png', 0 FROM `projects` WHERE `slug` = 'hospital-management';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/travel-budget.png', 0 FROM `projects` WHERE `slug` = 'travel-budget';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/scrom-lms.png', 0 FROM `projects` WHERE `slug` = 'scrom-lms';

-- ── Project Tags ─────────────────────────────────────────────
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'ERP', 0 FROM `projects` WHERE `slug` = 'inwora-erp';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Enterprise', 1 FROM `projects` WHERE `slug` = 'inwora-erp';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Inventory', 2 FROM `projects` WHERE `slug` = 'inwora-erp';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Operations', 3 FROM `projects` WHERE `slug` = 'inwora-erp';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Jewellery Showcase', 0 FROM `projects` WHERE `slug` = 'balaji-jewellers';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Brand Website', 1 FROM `projects` WHERE `slug` = 'balaji-jewellers';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Catalogue', 2 FROM `projects` WHERE `slug` = 'balaji-jewellers';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Luxury Retail', 3 FROM `projects` WHERE `slug` = 'balaji-jewellers';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Business Profile', 0 FROM `projects` WHERE `slug` = 'sri-abnaya';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Corporate Web', 1 FROM `projects` WHERE `slug` = 'sri-abnaya';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Lead Capture', 2 FROM `projects` WHERE `slug` = 'sri-abnaya';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Responsive Design', 3 FROM `projects` WHERE `slug` = 'sri-abnaya';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'CRM', 0 FROM `projects` WHERE `slug` = 'malligai-crm';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Lead Management', 1 FROM `projects` WHERE `slug` = 'malligai-crm';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Sales Pipeline', 2 FROM `projects` WHERE `slug` = 'malligai-crm';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Customer Tracking', 3 FROM `projects` WHERE `slug` = 'malligai-crm';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Member Management', 0 FROM `projects` WHERE `slug` = 'jci-malligai';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Operations Portal', 1 FROM `projects` WHERE `slug` = 'jci-malligai';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Directory', 2 FROM `projects` WHERE `slug` = 'jci-malligai';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Governance', 3 FROM `projects` WHERE `slug` = 'jci-malligai';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Vendor Panel', 0 FROM `projects` WHERE `slug` = 'store-grocery-panel';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Grocery Commerce', 1 FROM `projects` WHERE `slug` = 'store-grocery-panel';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Order Fulfillment', 2 FROM `projects` WHERE `slug` = 'store-grocery-panel';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Store Management', 3 FROM `projects` WHERE `slug` = 'store-grocery-panel';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Grocery App', 0 FROM `projects` WHERE `slug` = 'user-grocery-app';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'E-commerce', 1 FROM `projects` WHERE `slug` = 'user-grocery-app';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Cart & Checkout', 2 FROM `projects` WHERE `slug` = 'user-grocery-app';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Shopping', 3 FROM `projects` WHERE `slug` = 'user-grocery-app';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Admin Dashboard', 0 FROM `projects` WHERE `slug` = 'admin-grocery-dashboard';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Multi-Store Management', 1 FROM `projects` WHERE `slug` = 'admin-grocery-dashboard';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Platform Ops', 2 FROM `projects` WHERE `slug` = 'admin-grocery-dashboard';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Grocery Analytics', 3 FROM `projects` WHERE `slug` = 'admin-grocery-dashboard';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'REST API', 0 FROM `projects` WHERE `slug` = 'grocery-api';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Backend Infrastructure', 1 FROM `projects` WHERE `slug` = 'grocery-api';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Microservices', 2 FROM `projects` WHERE `slug` = 'grocery-api';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Grocery Platform', 3 FROM `projects` WHERE `slug` = 'grocery-api';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Food Ordering', 0 FROM `projects` WHERE `slug` = 'takeaway';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Takeaway', 1 FROM `projects` WHERE `slug` = 'takeaway';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Digital Menu', 2 FROM `projects` WHERE `slug` = 'takeaway';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Restaurant System', 3 FROM `projects` WHERE `slug` = 'takeaway';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Architectural Facades', 0 FROM `projects` WHERE `slug` = 'wallmark';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Structural Engineering', 1 FROM `projects` WHERE `slug` = 'wallmark';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Brand Website', 2 FROM `projects` WHERE `slug` = 'wallmark';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Commercial Projects', 3 FROM `projects` WHERE `slug` = 'wallmark';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Wedding Crafts', 0 FROM `projects` WHERE `slug` = 'thambalam';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Traditional Bags', 1 FROM `projects` WHERE `slug` = 'thambalam';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Brand Showcase', 2 FROM `projects` WHERE `slug` = 'thambalam';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Gift Packaging', 3 FROM `projects` WHERE `slug` = 'thambalam';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Café Solution', 0 FROM `projects` WHERE `slug` = 'chai-fi';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'POS Billing', 1 FROM `projects` WHERE `slug` = 'chai-fi';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Beverage Brand', 2 FROM `projects` WHERE `slug` = 'chai-fi';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Food & Beverage', 3 FROM `projects` WHERE `slug` = 'chai-fi';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Grocery Store', 0 FROM `projects` WHERE `slug` = 'grocery-website';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'E-commerce Storefront', 1 FROM `projects` WHERE `slug` = 'grocery-website';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Online Retail', 2 FROM `projects` WHERE `slug` = 'grocery-website';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Catalogue', 3 FROM `projects` WHERE `slug` = 'grocery-website';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Hospitality', 0 FROM `projects` WHERE `slug` = 'wora-stayz';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Accommodation', 1 FROM `projects` WHERE `slug` = 'wora-stayz';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Room Booking', 2 FROM `projects` WHERE `slug` = 'wora-stayz';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Travel & Stay', 3 FROM `projects` WHERE `slug` = 'wora-stayz';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Agro Foods', 0 FROM `projects` WHERE `slug` = 'priyam';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Food Brand', 1 FROM `projects` WHERE `slug` = 'priyam';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Culinary Heritage', 2 FROM `projects` WHERE `slug` = 'priyam';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Product Showcase', 3 FROM `projects` WHERE `slug` = 'priyam';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Gold Platform', 0 FROM `projects` WHERE `slug` = 'gold-poster';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Jewellery Tech', 1 FROM `projects` WHERE `slug` = 'gold-poster';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Bullion Rates', 2 FROM `projects` WHERE `slug` = 'gold-poster';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Showroom Marketing', 3 FROM `projects` WHERE `slug` = 'gold-poster';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Hotel Website', 0 FROM `projects` WHERE `slug` = 'subra-residency';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Hospitality', 1 FROM `projects` WHERE `slug` = 'subra-residency';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Kumbakonam', 2 FROM `projects` WHERE `slug` = 'subra-residency';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Temple Pilgrimage', 3 FROM `projects` WHERE `slug` = 'subra-residency';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Restaurant POS', 0 FROM `projects` WHERE `slug` = 'pos-kot';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'KOT Workflow', 1 FROM `projects` WHERE `slug` = 'pos-kot';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Real-time Sync', 2 FROM `projects` WHERE `slug` = 'pos-kot';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Dining Ops', 3 FROM `projects` WHERE `slug` = 'pos-kot';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'CRM', 0 FROM `projects` WHERE `slug` = 'construction-crm';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Construction', 1 FROM `projects` WHERE `slug` = 'construction-crm';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Contractor Tool', 2 FROM `projects` WHERE `slug` = 'construction-crm';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Project Tracking', 3 FROM `projects` WHERE `slug` = 'construction-crm';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'CRM', 0 FROM `projects` WHERE `slug` = 'lead-management';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Lead Scoring', 1 FROM `projects` WHERE `slug` = 'lead-management';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Sales Funnel', 2 FROM `projects` WHERE `slug` = 'lead-management';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Pipeline', 3 FROM `projects` WHERE `slug` = 'lead-management';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Accounting', 0 FROM `projects` WHERE `slug` = 'accounts-management';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Invoicing', 1 FROM `projects` WHERE `slug` = 'accounts-management';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Double-Entry', 2 FROM `projects` WHERE `slug` = 'accounts-management';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Financial Ledgers', 3 FROM `projects` WHERE `slug` = 'accounts-management';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Factory Floor', 0 FROM `projects` WHERE `slug` = 'factory-automation';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'IoT Monitoring', 1 FROM `projects` WHERE `slug` = 'factory-automation';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Automation', 2 FROM `projects` WHERE `slug` = 'factory-automation';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Operations', 3 FROM `projects` WHERE `slug` = 'factory-automation';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Healthcare ERP', 0 FROM `projects` WHERE `slug` = 'hospital-management';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'EHR Portal', 1 FROM `projects` WHERE `slug` = 'hospital-management';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Hospital Ops', 2 FROM `projects` WHERE `slug` = 'hospital-management';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Patient Records', 3 FROM `projects` WHERE `slug` = 'hospital-management';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Expense Management', 0 FROM `projects` WHERE `slug` = 'travel-budget';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Multi-Currency', 1 FROM `projects` WHERE `slug` = 'travel-budget';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Budgeting', 2 FROM `projects` WHERE `slug` = 'travel-budget';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Fintech', 3 FROM `projects` WHERE `slug` = 'travel-budget';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'LMS', 0 FROM `projects` WHERE `slug` = 'scrom-lms';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'SCORM 2004', 1 FROM `projects` WHERE `slug` = 'scrom-lms';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'E-Learning', 2 FROM `projects` WHERE `slug` = 'scrom-lms';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Training Ops', 3 FROM `projects` WHERE `slug` = 'scrom-lms';

-- ── Project Features ─────────────────────────────────────────
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Multi-branch inventory & warehouse stock management', 0 FROM `projects` WHERE `slug` = 'inwora-erp';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'End-to-end sales, purchase, and customer billing records', 1 FROM `projects` WHERE `slug` = 'inwora-erp';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Granular role-based staff permissions & audit trails', 2 FROM `projects` WHERE `slug` = 'inwora-erp';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Executive operational dashboards & real-time financial reporting', 3 FROM `projects` WHERE `slug` = 'inwora-erp';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'High-definition jewellery collection catalogues & galleries', 0 FROM `projects` WHERE `slug` = 'balaji-jewellers';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Hallmark purity standards & brand heritage presentation', 1 FROM `projects` WHERE `slug` = 'balaji-jewellers';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Direct customer enquiry and showroom contact integration', 2 FROM `projects` WHERE `slug` = 'balaji-jewellers';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Fluid, responsive interface optimized for desktop & mobile', 3 FROM `projects` WHERE `slug` = 'balaji-jewellers';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Comprehensive business profile & service showcase', 0 FROM `projects` WHERE `slug` = 'sri-abnaya';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Intuitive site architecture & streamlined navigation', 1 FROM `projects` WHERE `slug` = 'sri-abnaya';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Integrated enquiry workflows & direct contact touchpoints', 2 FROM `projects` WHERE `slug` = 'sri-abnaya';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Fully responsive layouts tailored for mobile, tablet, and desktop', 3 FROM `projects` WHERE `slug` = 'sri-abnaya';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Centralized lead profiles & customer interaction timelines', 0 FROM `projects` WHERE `slug` = 'malligai-crm';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Inquiry stage tracking with automated follow-up reminders', 1 FROM `projects` WHERE `slug` = 'malligai-crm';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Role-based sales staff assignment & access permissions', 2 FROM `projects` WHERE `slug` = 'malligai-crm';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Performance analytics & conversion pipeline dashboards', 3 FROM `projects` WHERE `slug` = 'malligai-crm';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Complete member profiles & active roster directory', 0 FROM `projects` WHERE `slug` = 'jci-malligai';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Chapter project coordination & activity workflow logging', 1 FROM `projects` WHERE `slug` = 'jci-malligai';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Centralized administrative governance dashboard', 2 FROM `projects` WHERE `slug` = 'jci-malligai';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Role-based officer permissions & meeting documentation', 3 FROM `projects` WHERE `slug` = 'jci-malligai';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Real-time catalog editing, pricing, and stock availability toggles', 0 FROM `projects` WHERE `slug` = 'store-grocery-panel';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Order processing pipeline with live status updates', 1 FROM `projects` WHERE `slug` = 'store-grocery-panel';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Store profile configuration & operational schedule controls', 2 FROM `projects` WHERE `slug` = 'store-grocery-panel';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Daily fulfillment tracking & vendor dispatch monitoring', 3 FROM `projects` WHERE `slug` = 'store-grocery-panel';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Fast catalog browsing with instant keyword search & category filters', 0 FROM `projects` WHERE `slug` = 'user-grocery-app';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Comprehensive product detail views with unit pricing', 1 FROM `projects` WHERE `slug` = 'user-grocery-app';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Dynamic shopping cart with quantity adjustments & checkout flow', 2 FROM `projects` WHERE `slug` = 'user-grocery-app';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Customer account dashboard with saved addresses & order history', 3 FROM `projects` WHERE `slug` = 'user-grocery-app';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Master store onboarding, approval, and management controls', 0 FROM `projects` WHERE `slug` = 'admin-grocery-dashboard';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Centralized product catalogue taxonomy & category governance', 1 FROM `projects` WHERE `slug` = 'admin-grocery-dashboard';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Platform-wide live order monitoring & dispatch oversight', 2 FROM `projects` WHERE `slug` = 'admin-grocery-dashboard';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Role-based administrative access & system audit logs', 3 FROM `projects` WHERE `slug` = 'admin-grocery-dashboard';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'RESTful API endpoints with structured JSON responses', 0 FROM `projects` WHERE `slug` = 'grocery-api';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Secure token-based authentication & role authorization', 1 FROM `projects` WHERE `slug` = 'grocery-api';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'High-concurrency inventory, catalog, and pricing services', 2 FROM `projects` WHERE `slug` = 'grocery-api';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Transactional order processing & state synchronization', 3 FROM `projects` WHERE `slug` = 'grocery-api';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Interactive digital restaurant menu categorized by meal types', 0 FROM `projects` WHERE `slug` = 'takeaway';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Item customization, portion selection, and dynamic cart', 1 FROM `projects` WHERE `slug` = 'takeaway';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Frictionless online order placement and confirmation', 2 FROM `projects` WHERE `slug` = 'takeaway';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Order status tracking with kitchen prep coordination', 3 FROM `projects` WHERE `slug` = 'takeaway';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Architectural facade, curtain wall & structural glazing showcase', 0 FROM `projects` WHERE `slug` = 'wallmark';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Commercial project case studies with high-resolution galleries', 1 FROM `projects` WHERE `slug` = 'wallmark';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Structural engineering specifications & material standards', 2 FROM `projects` WHERE `slug` = 'wallmark';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Direct client consultation enquiry & project quotation workflows', 3 FROM `projects` WHERE `slug` = 'wallmark';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Curated showcase of handcrafted wedding thambalam bags & totes', 0 FROM `projects` WHERE `slug` = 'thambalam';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Material, zari embroidery, and color customization presentations', 1 FROM `projects` WHERE `slug` = 'thambalam';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Clear product categories for weddings, receptions, and poojas', 2 FROM `projects` WHERE `slug` = 'thambalam';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Bulk order quotation & direct customer enquiry channels', 3 FROM `projects` WHERE `slug` = 'thambalam';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Artisanal tea, brew, and café snack menu presentation', 0 FROM `projects` WHERE `slug` = 'chai-fi';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Fast POS billing interface tailored for high-volume tea counters', 1 FROM `projects` WHERE `slug` = 'chai-fi';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Ingredient usage tracking and recipe consistency support', 2 FROM `projects` WHERE `slug` = 'chai-fi';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Responsive mobile-first interface designed for counter tablets', 3 FROM `projects` WHERE `slug` = 'chai-fi';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Comprehensive grocery department catalogue with structured categories', 0 FROM `projects` WHERE `slug` = 'grocery-website';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Dynamic product search, item filtering, and unit pricing details', 1 FROM `projects` WHERE `slug` = 'grocery-website';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Persistent shopping cart and frictionless multi-step checkout', 2 FROM `projects` WHERE `slug` = 'grocery-website';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Customer profile dashboard with order tracking and past purchase history', 3 FROM `projects` WHERE `slug` = 'grocery-website';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Detailed room type presentations with amenity specifications & photos', 0 FROM `projects` WHERE `slug` = 'wora-stayz';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Comprehensive property facility guides and local attraction highlights', 1 FROM `projects` WHERE `slug` = 'wora-stayz';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Interactive location map, transit details, and guest contact options', 2 FROM `projects` WHERE `slug` = 'wora-stayz';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Direct room booking enquiry form with date and guest count selection', 3 FROM `projects` WHERE `slug` = 'wora-stayz';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Traditional South Indian paste & thuvaiyal product catalogue', 0 FROM `projects` WHERE `slug` = 'priyam';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Farm-to-kitchen brand storytelling and natural ingredient focus', 1 FROM `projects` WHERE `slug` = 'priyam';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Clear nutritional information and culinary usage guidelines', 2 FROM `projects` WHERE `slug` = 'priyam';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Trade distribution and customer enquiry communication channels', 3 FROM `projects` WHERE `slug` = 'priyam';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Real-time bullion market gold and silver rate synchronization', 0 FROM `projects` WHERE `slug` = 'gold-poster';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Automated high-resolution promotional poster generator', 1 FROM `projects` WHERE `slug` = 'gold-poster';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'One-tap social status and digital story graphic export', 2 FROM `projects` WHERE `slug` = 'gold-poster';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Dynamic showroom brand kit and custom logo overlay', 3 FROM `projects` WHERE `slug` = 'gold-poster';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Room category showcases with occupancy details & photo galleries', 0 FROM `projects` WHERE `slug` = 'subra-residency';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Pilgrimage and tourism information for Kumbakonam sacred temples', 1 FROM `projects` WHERE `slug` = 'subra-residency';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Essential guest amenities: Wi-Fi, 24-hr front desk & room service details', 2 FROM `projects` WHERE `slug` = 'subra-residency';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Direct reservation enquiry form and interactive location contact', 3 FROM `projects` WHERE `slug` = 'subra-residency';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Real-time Kitchen Display System (KDS)', 0 FROM `projects` WHERE `slug` = 'pos-kot';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Thermal Receipt Printer Integration', 1 FROM `projects` WHERE `slug` = 'pos-kot';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Table & Captain Order Tablet Management', 2 FROM `projects` WHERE `slug` = 'pos-kot';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Offline Billing & Data Recovery', 3 FROM `projects` WHERE `slug` = 'pos-kot';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Daily Financial Reconciliation Reports', 4 FROM `projects` WHERE `slug` = 'pos-kot';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Recipe Costing & Inventory Tracking', 5 FROM `projects` WHERE `slug` = 'pos-kot';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Bid & Cost Estimate Builder', 0 FROM `projects` WHERE `slug` = 'construction-crm';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Building Material Procurement Tracker', 1 FROM `projects` WHERE `slug` = 'construction-crm';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Daily Work Site Inspection Photo Logs', 2 FROM `projects` WHERE `slug` = 'construction-crm';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Subcontractor Work Directory', 3 FROM `projects` WHERE `slug` = 'construction-crm';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Milestone Progress Billing Cycles', 4 FROM `projects` WHERE `slug` = 'construction-crm';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Live Site Weather Sync & Logs', 5 FROM `projects` WHERE `slug` = 'construction-crm';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Automated Multi-Channel Lead Capture', 0 FROM `projects` WHERE `slug` = 'lead-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Lead Scoring & Intent Algorithm', 1 FROM `projects` WHERE `slug` = 'lead-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'SLA Rep Follow-up Alerts', 2 FROM `projects` WHERE `slug` = 'lead-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Email Campaign Engagement Tracking', 3 FROM `projects` WHERE `slug` = 'lead-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Interactive Kanban Pipeline Board', 4 FROM `projects` WHERE `slug` = 'lead-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Detailed Sales Velocity Analytics', 5 FROM `projects` WHERE `slug` = 'lead-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Automated PDF Invoice Dispatch', 0 FROM `projects` WHERE `slug` = 'accounts-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Double-Entry General Ledger Balance', 1 FROM `projects` WHERE `slug` = 'accounts-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Bank Statement Auto-Reconciliation', 2 FROM `projects` WHERE `slug` = 'accounts-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Instant P&L Financial Statement Generator', 3 FROM `projects` WHERE `slug` = 'accounts-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Automated Tax Category Mapping', 4 FROM `projects` WHERE `slug` = 'accounts-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Secure Accountant Access & Audit Trail', 5 FROM `projects` WHERE `slug` = 'accounts-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Real-Time Machinery Status Telemetry', 0 FROM `projects` WHERE `slug` = 'factory-automation';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Predictive Maintenance Alarms', 1 FROM `projects` WHERE `slug` = 'factory-automation';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Shift Assembly Throughput Tracking', 2 FROM `projects` WHERE `slug` = 'factory-automation';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Automated Quality Control Checkpoints', 3 FROM `projects` WHERE `slug` = 'factory-automation';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Barcode & RFID Label Scanner', 4 FROM `projects` WHERE `slug` = 'factory-automation';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'PLC & MQTT Industrial Integration', 5 FROM `projects` WHERE `slug` = 'factory-automation';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Electronic Health Records (EHR)', 0 FROM `projects` WHERE `slug` = 'hospital-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Doctor Appointment Scheduler Calendar', 1 FROM `projects` WHERE `slug` = 'hospital-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Ward & ICU Bed Occupancy Management', 2 FROM `projects` WHERE `slug` = 'hospital-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Automated Laboratory Test Reports', 3 FROM `projects` WHERE `slug` = 'hospital-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Medical Billing & Insurance Claim Sync', 4 FROM `projects` WHERE `slug` = 'hospital-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Secure Staff Clinical Communications', 5 FROM `projects` WHERE `slug` = 'hospital-management';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, '150+ Currency Live Auto-Conversion', 0 FROM `projects` WHERE `slug` = 'travel-budget';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Visual Trip Itinerary Cost Builder', 1 FROM `projects` WHERE `slug` = 'travel-budget';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'OCR Receipt Image Scanning', 2 FROM `projects` WHERE `slug` = 'travel-budget';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Group Expense Splitting & Settlement', 3 FROM `projects` WHERE `slug` = 'travel-budget';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Category Spending Limit Alerts', 4 FROM `projects` WHERE `slug` = 'travel-budget';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Offline Data Sync Enabled', 5 FROM `projects` WHERE `slug` = 'travel-budget';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Standard SCORM 2004 Package Import', 0 FROM `projects` WHERE `slug` = 'scrom-lms';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Real-Time Student Completion Tracker', 1 FROM `projects` WHERE `slug` = 'scrom-lms';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Interactive Quiz & Exam Builders', 2 FROM `projects` WHERE `slug` = 'scrom-lms';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Auto Verification Certificate Issuance', 3 FROM `projects` WHERE `slug` = 'scrom-lms';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Instructor Class Performance Dashboards', 4 FROM `projects` WHERE `slug` = 'scrom-lms';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Course Access & Enrollment Controls', 5 FROM `projects` WHERE `slug` = 'scrom-lms';

-- ── Seed Products Data ───────────────────────────────────────
INSERT INTO `products` (`id`, `slug`, `title`, `subtitle`, `badge`, `tagline`, `description`, `icon`, `image`, `live_url`, `play_store_url`, `is_featured`, `sort_order`, `is_published`) VALUES
(1, 'inwora-daily-gold', 'Inwora Daily Gold', 'Gold-rate poster & daily creatives app', 'Poster Automation', 'Gold-rate posters & daily creatives', 'A mobile app & subscription platform for creating gold & silver rate posters and promotional graphics. Generate professional visuals in seconds.', 'Image', '/assets/projects/gold-poster.jpg', 'https://gold.inwora.com', 'https://play.google.com/store/apps/details?id=com.kirtheeshh.usermobile&pli=1', 0, 0, 1),
(2, 'pos-kot-software', 'POS & KOT Software', 'Restaurants, billing & order workflows', 'Restaurant SaaS', 'Restaurant billing & kitchen orders', 'A live SaaS subscription POS & Kitchen Order Ticket system for restaurants, cafes, and retail counters. Streamline orders and billing in real time.', 'Monitor', '/assets/projects/pos-kot.jpg', NULL, NULL, 1, 1, 1),
(3, 'unified-business-erp', 'Unified Business ERP', 'Integrated finance, inventory, sales & HR operations', 'Enterprise ERP', 'Unified operations, multi-warehouse & GST workflows', 'All-in-one cloud ERP system engineered to unify multi-channel sales billing, warehouse inventory, GST accounting, customer workflows, and staff management into a single centralized command center.', 'Boxes', '/assets/projects/unified-business-erp.jpg', NULL, NULL, 0, 2, 1),
(4, 'construction-management', 'Construction Management', 'Site accounts & operations in a single step', 'Site Operations', 'Site accounts & every movement in one step', 'Manage every construction site account and track each movement from one place. Materials, labour, expenses and progress stay in sync across all your sites.', 'HardHat', '/assets/projects/construction-crm.jpg', 'https://construction.inwora.com', NULL, 0, 3, 1),
(5, 'factory-management', 'Factory Management', 'Raw material to dispatch in one click', 'Production Ops', 'Raw material to packing & dispatch', 'Record the full production flow — from raw material intake through manufacturing to product packing and final dispatch — in a single click.', 'Factory', '/assets/projects/factory-automation.jpg', NULL, NULL, 0, 4, 1)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`), `subtitle`=VALUES(`subtitle`), `badge`=VALUES(`badge`), `tagline`=VALUES(`tagline`), `description`=VALUES(`description`), `icon`=VALUES(`icon`), `image`=VALUES(`image`), `live_url`=VALUES(`live_url`), `play_store_url`=VALUES(`play_store_url`), `is_featured`=VALUES(`is_featured`), `sort_order`=VALUES(`sort_order`);

-- New `overview` column defaults to the card description until an admin writes a fuller one.
UPDATE `products` SET `overview` = `description` WHERE `overview` IS NULL;

INSERT INTO `product_features` (`id`, `product_id`, `feature`, `sort_order`) VALUES
(1, 1, 'Official Android app on Google Play', 0),
(2, 1, 'Automated gold & silver rate templates', 1),
(3, 1, 'Fast poster creation engine', 2),
(4, 1, 'Brand logo & shop customization', 3),
(5, 2, 'Real-time order management', 0),
(6, 2, 'Kitchen display system (KOT)', 1),
(7, 2, 'Multi-counter support', 2),
(8, 2, 'Sales reports & analytics', 3),
(9, 3, 'Centralized multi-warehouse inventory & batch tracking', 0),
(10, 3, 'Automated GST-compliant billing & tax reconciliation', 1),
(11, 3, 'Order-to-cash procurement & purchase approvals', 2),
(12, 3, 'Executive financial balance sheets & sales analytics', 3),
(13, 4, 'Centralised site account management', 0),
(14, 4, 'Track every material & fund movement', 1),
(15, 4, 'Labour & expense records per site', 2),
(16, 4, 'Real-time progress across all sites', 3),
(17, 5, 'Raw material inventory tracking', 0),
(18, 5, 'Production & packing workflow', 1),
(19, 5, 'One-click dispatch entries', 2),
(20, 5, 'Stock & output reporting', 3)
ON DUPLICATE KEY UPDATE `feature`=VALUES(`feature`), `sort_order`=VALUES(`sort_order`);

SET FOREIGN_KEY_CHECKS=1;
