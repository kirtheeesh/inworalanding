-- Replace AI-generated cover/slider images with real screenshots of the live sites.
-- Run once in phpMyAdmin on the inwora.com database (after uploading
-- public_html/assets/projects/live/). Safe to re-run.
--
-- Only rows that point at the old built-in images (/assets/projects/..., not
-- /assets/projects/live/) are removed. Images uploaded through /admin
-- (/uploads/...) are kept and moved behind the new screenshots.

START TRANSACTION;

-- jci-malligai
DELETE pb FROM `project_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'jci-malligai' AND pb.image LIKE '/assets/projects/%';
UPDATE `project_banners` pb JOIN `projects` p ON p.id = pb.project_id SET pb.sort_order = pb.sort_order + 10 WHERE p.slug = 'jci-malligai';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/jci-malligai-1.jpg', 0 FROM `projects` WHERE `slug` = 'jci-malligai';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/jci-malligai-2.jpg', 1 FROM `projects` WHERE `slug` = 'jci-malligai';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/jci-malligai-3.jpg', 2 FROM `projects` WHERE `slug` = 'jci-malligai';
UPDATE `projects` SET `banner` = '/assets/projects/live/jci-malligai-1.jpg' WHERE `slug` = 'jci-malligai';

-- wallmark
DELETE pb FROM `project_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'wallmark' AND pb.image LIKE '/assets/projects/%';
UPDATE `project_banners` pb JOIN `projects` p ON p.id = pb.project_id SET pb.sort_order = pb.sort_order + 10 WHERE p.slug = 'wallmark';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/wallmark-1.jpg', 0 FROM `projects` WHERE `slug` = 'wallmark';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/wallmark-2.jpg', 1 FROM `projects` WHERE `slug` = 'wallmark';
UPDATE `projects` SET `banner` = '/assets/projects/live/wallmark-1.jpg' WHERE `slug` = 'wallmark';

-- thambalam
DELETE pb FROM `project_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'thambalam' AND pb.image LIKE '/assets/projects/%';
UPDATE `project_banners` pb JOIN `projects` p ON p.id = pb.project_id SET pb.sort_order = pb.sort_order + 10 WHERE p.slug = 'thambalam';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/thambalam-1.jpg', 0 FROM `projects` WHERE `slug` = 'thambalam';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/thambalam-2.jpg', 1 FROM `projects` WHERE `slug` = 'thambalam';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/thambalam-3.jpg', 2 FROM `projects` WHERE `slug` = 'thambalam';
UPDATE `projects` SET `banner` = '/assets/projects/live/thambalam-1.jpg' WHERE `slug` = 'thambalam';

-- chai-fi
DELETE pb FROM `project_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'chai-fi' AND pb.image LIKE '/assets/projects/%';
UPDATE `project_banners` pb JOIN `projects` p ON p.id = pb.project_id SET pb.sort_order = pb.sort_order + 10 WHERE p.slug = 'chai-fi';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/chai-fi-1.jpg', 0 FROM `projects` WHERE `slug` = 'chai-fi';
UPDATE `projects` SET `banner` = '/assets/projects/live/chai-fi-1.jpg' WHERE `slug` = 'chai-fi';

-- grocery-website
DELETE pb FROM `project_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'grocery-website' AND pb.image LIKE '/assets/projects/%';
UPDATE `project_banners` pb JOIN `projects` p ON p.id = pb.project_id SET pb.sort_order = pb.sort_order + 10 WHERE p.slug = 'grocery-website';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/grocery-website-1.jpg', 0 FROM `projects` WHERE `slug` = 'grocery-website';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/grocery-website-2.jpg', 1 FROM `projects` WHERE `slug` = 'grocery-website';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/grocery-website-3.jpg', 2 FROM `projects` WHERE `slug` = 'grocery-website';
UPDATE `projects` SET `banner` = '/assets/projects/live/grocery-website-1.jpg' WHERE `slug` = 'grocery-website';

-- priyam
DELETE pb FROM `project_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'priyam' AND pb.image LIKE '/assets/projects/%';
UPDATE `project_banners` pb JOIN `projects` p ON p.id = pb.project_id SET pb.sort_order = pb.sort_order + 10 WHERE p.slug = 'priyam';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/priyam-1.jpg', 0 FROM `projects` WHERE `slug` = 'priyam';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/priyam-2.jpg', 1 FROM `projects` WHERE `slug` = 'priyam';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/priyam-3.jpg', 2 FROM `projects` WHERE `slug` = 'priyam';
UPDATE `projects` SET `banner` = '/assets/projects/live/priyam-1.jpg' WHERE `slug` = 'priyam';

-- gold-poster
DELETE pb FROM `project_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'gold-poster' AND pb.image LIKE '/assets/projects/%';
UPDATE `project_banners` pb JOIN `projects` p ON p.id = pb.project_id SET pb.sort_order = pb.sort_order + 10 WHERE p.slug = 'gold-poster';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/gold-poster-1.jpg', 0 FROM `projects` WHERE `slug` = 'gold-poster';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/gold-poster-2.jpg', 1 FROM `projects` WHERE `slug` = 'gold-poster';
UPDATE `projects` SET `banner` = '/assets/projects/live/gold-poster-1.jpg' WHERE `slug` = 'gold-poster';

-- subra-residency
DELETE pb FROM `project_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'subra-residency' AND pb.image LIKE '/assets/projects/%';
UPDATE `project_banners` pb JOIN `projects` p ON p.id = pb.project_id SET pb.sort_order = pb.sort_order + 10 WHERE p.slug = 'subra-residency';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/subra-residency-1.jpg', 0 FROM `projects` WHERE `slug` = 'subra-residency';
UPDATE `projects` SET `banner` = '/assets/projects/live/subra-residency-1.jpg' WHERE `slug` = 'subra-residency';

-- takeaway
DELETE pb FROM `project_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'takeaway' AND pb.image LIKE '/assets/projects/%';
UPDATE `project_banners` pb JOIN `projects` p ON p.id = pb.project_id SET pb.sort_order = pb.sort_order + 10 WHERE p.slug = 'takeaway';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/takeaway-1.jpg', 0 FROM `projects` WHERE `slug` = 'takeaway';
UPDATE `projects` SET `banner` = '/assets/projects/live/takeaway-1.jpg' WHERE `slug` = 'takeaway';

-- construction-crm
DELETE pb FROM `project_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'construction-crm' AND pb.image LIKE '/assets/projects/%';
UPDATE `project_banners` pb JOIN `projects` p ON p.id = pb.project_id SET pb.sort_order = pb.sort_order + 10 WHERE p.slug = 'construction-crm';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/construction-1.jpg', 0 FROM `projects` WHERE `slug` = 'construction-crm';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/construction-2.jpg', 1 FROM `projects` WHERE `slug` = 'construction-crm';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/construction-3.jpg', 2 FROM `projects` WHERE `slug` = 'construction-crm';
UPDATE `projects` SET `banner` = '/assets/projects/live/construction-1.jpg' WHERE `slug` = 'construction-crm';

-- factory-automation
DELETE pb FROM `project_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'factory-automation' AND pb.image LIKE '/assets/projects/%';
UPDATE `project_banners` pb JOIN `projects` p ON p.id = pb.project_id SET pb.sort_order = pb.sort_order + 10 WHERE p.slug = 'factory-automation';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/factoryos-1.jpg', 0 FROM `projects` WHERE `slug` = 'factory-automation';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/factoryos-2.jpg', 1 FROM `projects` WHERE `slug` = 'factory-automation';
UPDATE `projects` SET `banner` = '/assets/projects/live/factoryos-1.jpg' WHERE `slug` = 'factory-automation';

-- product: inwora-daily-gold
DELETE pb FROM `product_banners` pb JOIN `products` p ON p.id = pb.product_id WHERE p.slug = 'inwora-daily-gold' AND pb.image LIKE '/assets/projects/%';
UPDATE `product_banners` pb JOIN `products` p ON p.id = pb.product_id SET pb.sort_order = pb.sort_order + 10 WHERE p.slug = 'inwora-daily-gold';
INSERT INTO `product_banners` (`product_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/gold-poster-1.jpg', 0 FROM `products` WHERE `slug` = 'inwora-daily-gold';
INSERT INTO `product_banners` (`product_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/gold-poster-2.jpg', 1 FROM `products` WHERE `slug` = 'inwora-daily-gold';
UPDATE `products` SET `image` = '/assets/projects/live/gold-poster-1.jpg' WHERE `slug` = 'inwora-daily-gold';

-- product: construction-management
DELETE pb FROM `product_banners` pb JOIN `products` p ON p.id = pb.product_id WHERE p.slug = 'construction-management' AND pb.image LIKE '/assets/projects/%';
UPDATE `product_banners` pb JOIN `products` p ON p.id = pb.product_id SET pb.sort_order = pb.sort_order + 10 WHERE p.slug = 'construction-management';
INSERT INTO `product_banners` (`product_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/construction-1.jpg', 0 FROM `products` WHERE `slug` = 'construction-management';
INSERT INTO `product_banners` (`product_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/construction-2.jpg', 1 FROM `products` WHERE `slug` = 'construction-management';
INSERT INTO `product_banners` (`product_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/construction-3.jpg', 2 FROM `products` WHERE `slug` = 'construction-management';
UPDATE `products` SET `image` = '/assets/projects/live/construction-1.jpg' WHERE `slug` = 'construction-management';

-- product: factory-management
DELETE pb FROM `product_banners` pb JOIN `products` p ON p.id = pb.product_id WHERE p.slug = 'factory-management' AND pb.image LIKE '/assets/projects/%';
UPDATE `product_banners` pb JOIN `products` p ON p.id = pb.product_id SET pb.sort_order = pb.sort_order + 10 WHERE p.slug = 'factory-management';
INSERT INTO `product_banners` (`product_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/factoryos-1.jpg', 0 FROM `products` WHERE `slug` = 'factory-management';
INSERT INTO `product_banners` (`product_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/factoryos-2.jpg', 1 FROM `products` WHERE `slug` = 'factory-management';
UPDATE `products` SET `image` = '/assets/projects/live/factoryos-1.jpg' WHERE `slug` = 'factory-management';


-- ── New case studies: Digital Wedding Invitation, Nexus Space India; Priyam as a branding site ──
INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `live_url`, `sort_order`, `is_published`, `show_web_view`, `show_mobile_view`) VALUES ('digital-wedding-invitation', 'Digital Wedding Invitation', 'Digital Invitations', 'Cinematic digital wedding invitation: an animated invitation website and AI invitation video that guests open on their phone from one WhatsApp link.', 'Inwora Digital Invitation puts your wedding invitation on every guest''s phone. Each invitation is a beautifully designed, animated invitation website with an opening animation, Tamil and English content, Google Maps directions and a live countdown to the big day, paired with a cinematic AI-generated invitation video. Everything is shared with one link on WhatsApp. Designs are fully customised for weddings, birthdays and every kind of event, and the same platform creates birthday wishes and greetings.', 'Smartphone', '/assets/projects/live/digital-wedding-invitation-1.jpg', 'https://digitalinvitation.inwora.com', -2, 1, 1, 1)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`), `category`=VALUES(`category`), `short_desc`=VALUES(`short_desc`), `full_desc`=VALUES(`full_desc`), `icon`=VALUES(`icon`), `banner`=VALUES(`banner`), `live_url`=VALUES(`live_url`), `show_web_view`=1, `show_mobile_view`=1;
DELETE pb FROM `project_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'digital-wedding-invitation' AND pb.image LIKE '/assets/projects/%';
DELETE pb FROM `project_mobile_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'digital-wedding-invitation' AND pb.image LIKE '/assets/projects/%';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/digital-wedding-invitation-1.jpg', 0 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/digital-wedding-invitation-2.jpg', 1 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/digital-wedding-invitation-3.jpg', 2 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';
INSERT INTO `project_mobile_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/mobile/digital-wedding-invitation-1.jpg', 0 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';
INSERT INTO `project_mobile_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/mobile/digital-wedding-invitation-2.jpg', 1 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';
INSERT INTO `project_mobile_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/mobile/digital-wedding-invitation-3.jpg', 2 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';
DELETE t FROM `project_tags` t JOIN `projects` p ON p.id = t.project_id WHERE p.slug = 'digital-wedding-invitation';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Digital Invitation', 0 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Wedding', 1 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'AI Video', 2 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'WhatsApp Sharing', 3 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';
DELETE f FROM `project_features` f JOIN `projects` p ON p.id = f.project_id WHERE p.slug = 'digital-wedding-invitation';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Cinematic invitation website with opening animation', 0 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'AI-generated invitation video with Tamil voice-over', 1 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Tamil and English invitation content', 2 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Google Maps directions and live wedding countdown', 3 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'One link to share with every guest on WhatsApp', 4 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Fully customised designs for weddings, birthdays and all events', 5 FROM `projects` WHERE `slug` = 'digital-wedding-invitation';

INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `live_url`, `sort_order`, `is_published`, `show_web_view`, `show_mobile_view`) VALUES ('nexus-space-india', 'Nexus Space India', 'Branding Websites', 'Animated, interactive brand website with a dark space theme for India''s first commercial lunar legacy payload service.', 'Nexus Space India, a division of Yoposh Nexus Private Limited, offers a commercial lunar archival and legacy payload service that carries personal memories and milestones on a journey to the Moon. We built a brand website to match that ambition: a dark space theme, animated scroll-driven chapters that move the story from Earth to the Moon, and clear entry points to explore the Moonbox and find stored memories. The site is fully responsive, so the experience holds up on every phone.', 'Rocket', '/assets/projects/live/nexus-space-india-1.jpg', 'https://yoposhnexusdark.inwora.com', -1, 1, 1, 1)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`), `category`=VALUES(`category`), `short_desc`=VALUES(`short_desc`), `full_desc`=VALUES(`full_desc`), `icon`=VALUES(`icon`), `banner`=VALUES(`banner`), `live_url`=VALUES(`live_url`), `show_web_view`=1, `show_mobile_view`=1;
DELETE pb FROM `project_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'nexus-space-india' AND pb.image LIKE '/assets/projects/%';
DELETE pb FROM `project_mobile_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'nexus-space-india' AND pb.image LIKE '/assets/projects/%';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/nexus-space-india-1.jpg', 0 FROM `projects` WHERE `slug` = 'nexus-space-india';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/nexus-space-india-2.jpg', 1 FROM `projects` WHERE `slug` = 'nexus-space-india';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/nexus-space-india-3.jpg', 2 FROM `projects` WHERE `slug` = 'nexus-space-india';
INSERT INTO `project_mobile_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/mobile/nexus-space-india-1.jpg', 0 FROM `projects` WHERE `slug` = 'nexus-space-india';
INSERT INTO `project_mobile_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/mobile/nexus-space-india-2.jpg', 1 FROM `projects` WHERE `slug` = 'nexus-space-india';
INSERT INTO `project_mobile_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/mobile/nexus-space-india-3.jpg', 2 FROM `projects` WHERE `slug` = 'nexus-space-india';
DELETE t FROM `project_tags` t JOIN `projects` p ON p.id = t.project_id WHERE p.slug = 'nexus-space-india';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Branding', 0 FROM `projects` WHERE `slug` = 'nexus-space-india';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Animated Website', 1 FROM `projects` WHERE `slug` = 'nexus-space-india';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Space Tech', 2 FROM `projects` WHERE `slug` = 'nexus-space-india';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Storytelling', 3 FROM `projects` WHERE `slug` = 'nexus-space-india';
DELETE f FROM `project_features` f JOIN `projects` p ON p.id = f.project_id WHERE p.slug = 'nexus-space-india';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Animated, scroll-driven storytelling from Earth to the Moon', 0 FROM `projects` WHERE `slug` = 'nexus-space-india';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Dark space theme with interactive visuals', 1 FROM `projects` WHERE `slug` = 'nexus-space-india';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Moonbox explorer and memory search entry points', 2 FROM `projects` WHERE `slug` = 'nexus-space-india';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Fully responsive brand experience on mobile and desktop', 3 FROM `projects` WHERE `slug` = 'nexus-space-india';

UPDATE `projects` SET `category` = 'Branding Websites', `show_mobile_view` = 1 WHERE `slug` = 'priyam';
DELETE pb FROM `project_mobile_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'priyam' AND pb.image LIKE '/assets/projects/%';
INSERT INTO `project_mobile_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/mobile/priyam-1.jpg', 0 FROM `projects` WHERE `slug` = 'priyam';
INSERT INTO `project_mobile_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/mobile/priyam-2.jpg', 1 FROM `projects` WHERE `slug` = 'priyam';
INSERT INTO `project_mobile_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/mobile/priyam-3.jpg', 2 FROM `projects` WHERE `slug` = 'priyam';

-- ── New case study: Karur Connect (branding site) ──
INSERT INTO `projects` (`slug`, `title`, `category`, `short_desc`, `full_desc`, `icon`, `banner`, `live_url`, `sort_order`, `is_published`, `show_web_view`, `show_mobile_view`) VALUES ('karur-connect', 'Karur Connect', 'Branding Websites', 'Local digital media and community platform connecting Karur''s creators, businesses and families, with verified creator profiles and local bookings.', 'KARUR CONNECT is a local digital media and community platform focused on promoting Karur''s businesses, creators, talents and culture. We designed and built its brand website around the line "Discover Karur. Connect with Karur. Grow with Karur.": a warm, illustrated identity inspired by Karur''s fields, river and looms, a clear story of the platform''s mission and vision, and a free creator registration flow. Photographers, videographers, food bloggers, influencers and local artists register in under two minutes, the team reviews each profile, and verified creators go live to receive bookings from local businesses, event organisers and families.', 'Users', '/assets/projects/live/karur-connect-1.jpg', 'https://karurconnect.inwora.com', -1, 1, 1, 1)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`), `category`=VALUES(`category`), `short_desc`=VALUES(`short_desc`), `full_desc`=VALUES(`full_desc`), `icon`=VALUES(`icon`), `banner`=VALUES(`banner`), `live_url`=VALUES(`live_url`), `show_web_view`=1, `show_mobile_view`=1;
DELETE pb FROM `project_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'karur-connect' AND pb.image LIKE '/assets/projects/%';
DELETE pb FROM `project_mobile_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'karur-connect' AND pb.image LIKE '/assets/projects/%';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/karur-connect-1.jpg', 0 FROM `projects` WHERE `slug` = 'karur-connect';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/karur-connect-2.jpg', 1 FROM `projects` WHERE `slug` = 'karur-connect';
INSERT INTO `project_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/karur-connect-3.jpg', 2 FROM `projects` WHERE `slug` = 'karur-connect';
INSERT INTO `project_mobile_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/mobile/karur-connect-1.jpg', 0 FROM `projects` WHERE `slug` = 'karur-connect';
INSERT INTO `project_mobile_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/mobile/karur-connect-2.jpg', 1 FROM `projects` WHERE `slug` = 'karur-connect';
INSERT INTO `project_mobile_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/mobile/karur-connect-3.jpg', 2 FROM `projects` WHERE `slug` = 'karur-connect';
DELETE t FROM `project_tags` t JOIN `projects` p ON p.id = t.project_id WHERE p.slug = 'karur-connect';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Branding', 0 FROM `projects` WHERE `slug` = 'karur-connect';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Community Platform', 1 FROM `projects` WHERE `slug` = 'karur-connect';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Creator Directory', 2 FROM `projects` WHERE `slug` = 'karur-connect';
INSERT INTO `project_tags` (`project_id`, `tag`, `sort_order`) SELECT id, 'Local Business', 3 FROM `projects` WHERE `slug` = 'karur-connect';
DELETE f FROM `project_features` f JOIN `projects` p ON p.id = f.project_id WHERE p.slug = 'karur-connect';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Illustrated local brand identity inspired by Karur''s fields, river and looms', 0 FROM `projects` WHERE `slug` = 'karur-connect';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Free creator registration form with category, location and social links', 1 FROM `projects` WHERE `slug` = 'karur-connect';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Three-step flow: register, team review, go live with a verified profile', 2 FROM `projects` WHERE `slug` = 'karur-connect';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Searchable creator directory for local businesses, events and families', 3 FROM `projects` WHERE `slug` = 'karur-connect';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Booking requests for weddings, functions, shop launches and brand shoots', 4 FROM `projects` WHERE `slug` = 'karur-connect';
INSERT INTO `project_features` (`project_id`, `feature`, `sort_order`) SELECT id, 'Fully responsive experience on mobile and desktop', 5 FROM `projects` WHERE `slug` = 'karur-connect';

-- ── Wallmark: official domain + phone views ──
UPDATE `projects` SET `live_url` = 'https://wallmarkfacades.com', `show_mobile_view` = 1 WHERE `slug` = 'wallmark';
DELETE pb FROM `project_mobile_banners` pb JOIN `projects` p ON p.id = pb.project_id WHERE p.slug = 'wallmark' AND pb.image LIKE '/assets/projects/%';
INSERT INTO `project_mobile_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/mobile/wallmark-1.jpg', 0 FROM `projects` WHERE `slug` = 'wallmark';
INSERT INTO `project_mobile_banners` (`project_id`, `image`, `sort_order`) SELECT id, '/assets/projects/live/mobile/wallmark-2.jpg', 1 FROM `projects` WHERE `slug` = 'wallmark';

COMMIT;
