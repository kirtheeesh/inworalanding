-- INWORA landing page — portfolio schema
-- Usage: mysql -u root -p < backend/database/schema.sql

-- Note: On shared hosting (like Hostinger), select your database first in phpMyAdmin
-- and do not run CREATE DATABASE or USE.

-- CREATE DATABASE IF NOT EXISTS `inworalanding`
--   DEFAULT CHARACTER SET utf8mb4
--   COLLATE utf8mb4_unicode_ci;
-- USE `inworalanding`;

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
-- `category` powers the filter bar at the top of the public /portfolio page —
-- it is free text per project, and the frontend derives the filter chips from
-- whatever distinct values are in use (no separate categories table needed).
-- `banner` is auto-maintained as the *cover image* (the lowest-priority row in
-- `project_banners` below) so old card/thumbnail code keeps working unchanged.
-- `video_type` enforces "YouTube link OR uploaded file, never both": exactly
-- one of `video_url` (YouTube) / `video_file` (upload) is populated at a time.
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
  `created_at`   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_projects_slug` (`slug`),
  KEY `idx_projects_listing` (`is_published`, `sort_order`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ── Banner slider images ──────────────────────────────────────
-- Multiple banner slides per project. `sort_order` is the admin-facing
-- "priority" — lower shows first, and the lowest becomes `projects.banner`
-- (the cover image used on the portfolio card).
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

-- ── Products ─────────────────────────────────────────────────
-- The official INWORA products shown in the Hero panel and the #products
-- slider. Managed from /admin/products, served by GET /api/products.
-- `description` is the short card blurb; `overview` is the fuller text shown
-- in the "Learn more" dialog. `image` is auto-maintained as the cover (the
-- lowest-priority row in `product_banners`), same pattern as `projects.banner`.
-- `video_type` enforces "YouTube link OR uploaded file, never both".
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

-- ── Product banner slider images (priority = sort_order) ──────
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

-- ── Product features (bullet list on the product card) ───────
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
