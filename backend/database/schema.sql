-- INWORA landing page — portfolio schema
-- Usage: mysql -u root -p < backend/database/schema.sql

CREATE DATABASE IF NOT EXISTS `inworalanding`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `inworalanding`;

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
