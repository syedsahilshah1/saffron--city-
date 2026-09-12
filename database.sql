-- =============================================================
-- Saffron City Islamabad - Official MySQL Database Schema & Seeds
-- Database: `saffron_city`
-- =============================================================

CREATE DATABASE IF NOT EXISTS `saffron_city` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `saffron_city`;

-- -------------------------------------------------------------
-- 1. Users Table (Authentication & Access Control)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(100) PRIMARY KEY,
  `email` VARCHAR(191) UNIQUE NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `password` VARCHAR(255) NULL,
  `passwordHash` VARCHAR(255) NULL,
  `salt` VARCHAR(255) NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'SUPER_ADMIN',
  `permissions` JSON NOT NULL,
  `failedAttempts` INT DEFAULT 0,
  `lockedUntil` DATETIME NULL,
  `isActive` BOOLEAN DEFAULT TRUE,
  `lastLoginAt` DATETIME NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Seed Users
INSERT INTO `users` (`id`, `email`, `name`, `password`, `role`, `permissions`, `failedAttempts`, `isActive`, `createdAt`)
VALUES
('usr-superadmin-01', 'ubaidnasir401@gmail.com', 'Ubaid Nasir (Super Admin)', 'ubaidnasir401@gmail.com', 'SUPER_ADMIN', '["overview", "leads", "plots", "blogs", "content", "masterplan", "paymentplans", "seo", "settings", "users"]', 0, 1, NOW()),
('usr-admin-02', 'sahilkhan536ah@gmail.com', 'Sahil Shah', 'admin123', 'ADMIN', '["overview", "leads", "plots", "blogs", "content", "masterplan", "paymentplans", "seo", "settings", "users"]', 0, 1, NOW())
ON DUPLICATE KEY UPDATE `email` = VALUES(`email`);

-- -------------------------------------------------------------
-- 2. Password Reset Tokens Table
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `passwordresettoken` (
  `id` VARCHAR(100) PRIMARY KEY,
  `token` VARCHAR(50) NOT NULL,
  `userId` VARCHAR(100) NOT NULL,
  `expiresAt` DATETIME NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_token` (`token`),
  INDEX `idx_userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 3. Inquiries & CRM Leads Table
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` VARCHAR(100) PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(100) NOT NULL,
  `email` VARCHAR(191) NULL,
  `message` TEXT NULL,
  `plotSize` VARCHAR(100) NULL,
  `plotType` VARCHAR(100) NULL,
  `sector` VARCHAR(100) NULL,
  `status` VARCHAR(50) DEFAULT 'New',
  `source` VARCHAR(100) DEFAULT 'Website Form',
  `notes` TEXT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `inquiries` (`id`, `name`, `phone`, `email`, `message`, `plotSize`, `plotType`, `sector`, `status`, `source`, `notes`, `createdAt`)
VALUES
('lead-001', 'Tariq Mehmood', '+92 321 5554321', 'tariq@example.com', 'Interested in 1 Kanal residential plot in Sector A with park facing option.', '1 Kanal', 'Residential', 'Sector A', 'New', 'Website Hero Form', 'Requires remote overseas booking guidance.', NOW()),
('lead-002', 'Dr. Usman Farooq', '+92 300 9876543', 'usman@example.com', 'Looking for 4 Marla commercial plot on GT Road frontage for clinic setup.', '4 Marla', 'Commercial', 'Commercial Block', 'Contacted', 'WhatsApp Lead', 'Sent payment plan brochure. Follow-up scheduled.', NOW()),
('lead-003', 'Bilal Ahmad', '+92 333 1234567', 'bilal@example.com', 'I need a 5 Marla plot in Saffron City Sector B on 3-year installment.', '5 Marla', 'Residential', 'Sector B', 'FollowUp', 'Plot For Sale Page', 'Checking down payment readiness.', NOW()),
('lead-004', 'Sahil', '345678', NULL, 'Inquiry from web lead modal', '5 Marla', 'Residential', 'Sector A (Block B)', 'New', 'Website Form', 'Lead received via Website', NOW())
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`);

-- -------------------------------------------------------------
-- 4. Plots & Real Estate Inventory Table
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `plots` (
  `id` VARCHAR(100) PRIMARY KEY,
  `plotNumber` VARCHAR(100) NOT NULL,
  `sector` VARCHAR(100) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `totalPrice` BIGINT NOT NULL,
  `downPayment` BIGINT NOT NULL,
  `monthlyInst` BIGINT NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'Available',
  `features` TEXT NULL,
  `image` VARCHAR(500) NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `plots` (`id`, `plotNumber`, `sector`, `category`, `type`, `totalPrice`, `downPayment`, `monthlyInst`, `status`, `features`, `image`, `createdAt`)
VALUES
('plt-a-01', 'A-101', 'Sector A', '5 Marla', 'Residential', 4500000, 450000, 45000, 'Available', 'Underground Utilities, Near Central Park', '.webp', NOW()),
('plt-a-02', 'A-102', 'Sector A', '10 Marla', 'Residential', 8200000, 820000, 82000, 'Reserved', 'Main Boulevard, Underground Electrification', '.webp', NOW()),
('plt-a-03', 'A-105', 'Sector A', '1 Kanal', 'Residential', 15500000, 1550000, 155000, 'Available', 'Corner Plot, Park Facing, 60-ft Road', '.webp', NOW()),
('plt-b-01', 'B-201', 'Sector B', '5 Marla', 'Residential', 4500000, 450000, 45000, 'Available', 'Near Community Mosque, 40-ft Wide Road', '.webp', NOW()),
('plt-b-02', 'B-205', 'Sector B', '10 Marla', 'Residential', 8200000, 820000, 82000, 'Available', 'Family Zone, Green Belt Adjacent', '.webp', NOW()),
('plt-com-01', 'COM-01', 'Commercial Block', '4 Marla', 'Commercial', 18000000, 1800000, 180000, 'Available', 'Main GT Road Frontage, High Footfall Plaza Plot', '.webp', NOW()),
('plt-com-02', 'COM-04', 'Commercial Block', '8 Marla', 'Commercial', 34000000, 3400000, 340000, 'Booked', 'Corporate Plaza Hub, Multi-Storey Approved', '.webp', NOW())
ON DUPLICATE KEY UPDATE `id` = VALUES(`id`);

-- -------------------------------------------------------------
-- 5. Blogs & News Articles Table
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` VARCHAR(100) PRIMARY KEY,
  `slug` VARCHAR(191) UNIQUE NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `excerpt` TEXT NULL,
  `content` LONGTEXT NULL,
  `image` VARCHAR(500) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `author` VARCHAR(191) NOT NULL,
  `readTime` VARCHAR(50) NOT NULL DEFAULT '5 min read',
  `isPublished` BOOLEAN DEFAULT TRUE,
  `seoTitle` VARCHAR(255) NULL,
  `metaDescription` TEXT NULL,
  `canonicalUrl` VARCHAR(500) NULL,
  `robotsIndex` BOOLEAN DEFAULT TRUE,
  `robotsFollow` BOOLEAN DEFAULT TRUE,
  `focusKeyword` VARCHAR(255) NULL,
  `secondaryKeywords` TEXT NULL,
  `h1Heading` VARCHAR(255) NULL,
  `imageAlt` VARCHAR(255) NULL,
  `ogTitle` VARCHAR(255) NULL,
  `ogDescription` TEXT NULL,
  `ogImage` VARCHAR(500) NULL,
  `twitterTitle` VARCHAR(255) NULL,
  `twitterDescription` TEXT NULL,
  `twitterImage` VARCHAR(500) NULL,
  `customSchema` TEXT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `blogs` (`id`, `slug`, `title`, `excerpt`, `content`, `image`, `category`, `author`, `readTime`, `isPublished`, `seoTitle`, `metaDescription`, `createdAt`)
VALUES
('blog-01', 'saffron-city-islamabad-rda-noc-approval-complete-guide', 'Saffron City Islamabad RDA NOC Approval: Official Status & Investor Guide 2026', 'A comprehensive legal review of Saffron City Islamabad 15,000 Kanal RDA NOC clearance, land permissions, and why it is the safest investment on GT Road Rawat.', '<h2>Is Saffron City Islamabad Legally Approved by RDA?</h2><p>Yes, Saffron City Islamabad is fully cleared and approved by the Rawalpindi Development Authority (RDA). Spanning across an expansive 15,000 Kanals on the prime GT Road corridor near Rawat T-Chowk, the project fulfills all master planning, environmental, and infrastructure standards set by Punjab development authorities.</p><h3>Key Highlights of RDA Clearance:</h3><ul><li><strong>15,000 Kanal Master Layout:</strong> Duly sanctioned layout plans for residential and commercial boulevard developments.</li><li><strong>Unencumbered Land Title:</strong> 100% owned and verified land backed by SKB Engineering legacy.</li><li><strong>Rapid Infrastructure Development:</strong> Carpeted roads, civic amenities, and utility zoning in active progress.</li></ul>', '.webp', 'Legal & NOC', 'Editorial Team', '6 min read', 1, 'Saffron City Islamabad RDA NOC Approval Status & Guide 2026', 'Read complete legal verification and RDA NOC status for Saffron City Islamabad across 15,000 Kanals on Main GT Road Rawat.', NOW()),
('blog-02', 'rawalpindi-ring-road-impact-on-saffron-city-property-prices', 'How Rawalpindi Ring Road (R3) Boosts Property Value in Saffron City Islamabad', 'Discover how direct connectivity to the Rawalpindi Ring Road (R3) interchange is set to accelerate capital appreciation for Saffron City investors by over 40% in 2026.', '<h2>The Strategic Game-Changer: Rawalpindi Ring Road</h2><p>Infrastructure development is the biggest catalyst for real estate price appreciation. Saffron City Islamabad is uniquely positioned right at the doorstep of the upcoming Rawalpindi Ring Road interchange near Rawat.</p><h3>Key Benefits for Saffron City Residents:</h3><ul><li><strong>15-Minute Access to New Islamabad Airport:</strong> Bypass heavy city traffic with direct signal-free highway transit.</li><li><strong>Seamless Motorway Connectivity:</strong> Fast link to M-2 Lahore-Islamabad and M-1 Peshawar motorways.</li><li><strong>High Rental Yields & Capital Gains:</strong> Industry analysts project a 35-50% growth upon Ring Road commissioning.</li></ul>', '.webp', 'Market Analysis', 'Research Desk', '5 min read', 1, 'Rawalpindi Ring Road Impact on Saffron City Property Value', 'Detailed analysis of how Rawalpindi Ring Road interchange enhances Saffron City plot prices and investment returns.', NOW()),
('blog-03', 'saffron-city-3-year-installment-payment-plan-breakdown', 'Saffron City 3-Year Flexible Installment Plan: 5, 10 Marla & 1 Kanal Plots', 'Complete breakdown of down payments, 30 monthly installments, and balloting charges for 5 Marla, 10 Marla, and 1 Kanal plots in Sector A and Sector B.', '<h2>Affordable Luxury with 3-Year Flexible Installments</h2><p>Saffron City Islamabad offers investors and home builders an attractive 30-month payment plan with only 10% down payment required at booking. Designed to accommodate both local salaried professionals and overseas Pakistani investors.</p><h3>Payment Summary:</h3><ul><li><strong>5 Marla:</strong> PKR 4,500,000 total (PKR 450,000 Down Payment | PKR 45,000 Monthly)</li><li><strong>10 Marla:</strong> PKR 8,200,000 total (PKR 820,000 Down Payment | PKR 82,000 Monthly)</li><li><strong>1 Kanal:</strong> PKR 15,500,000 total (PKR 1,550,000 Down Payment | PKR 155,000 Monthly)</li></ul>', '.webp', 'Investment', 'Finance Advisory', '4 min read', 1, 'Saffron City 3-Year Installment Payment Plan 2026', 'Official price schedule, down payment, and monthly installment breakdown for Saffron City plots.', NOW())
ON DUPLICATE KEY UPDATE `slug` = VALUES(`slug`);

-- -------------------------------------------------------------
-- 6. Site Settings & CMS Content Table
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `sitesetting` (
  `id` VARCHAR(50) PRIMARY KEY DEFAULT 'default',
  `siteName` VARCHAR(255) NOT NULL,
  `contactPhone` VARCHAR(100) NOT NULL,
  `secondaryPhone` VARCHAR(100) NULL,
  `whatsappPhone` VARCHAR(100) NOT NULL,
  `officialEmail` VARCHAR(191) NOT NULL,
  `officeAddress` TEXT NOT NULL,
  `googleMapsUrl` TEXT NOT NULL,
  `rdaNocStatus` VARCHAR(255) NOT NULL,
  `rdaVerificationUrl` VARCHAR(500) NOT NULL,
  `announcement` TEXT NULL,
  `activePreLaunchDiscount` BOOLEAN DEFAULT TRUE,
  `smtpEnabled` BOOLEAN DEFAULT TRUE,
  `smtpHost` VARCHAR(191) NULL,
  `smtpPort` INT NULL,
  `smtpSecure` BOOLEAN DEFAULT TRUE,
  `smtpUser` VARCHAR(191) NULL,
  `smtpPass` VARCHAR(191) NULL,
  `smtpFromEmail` VARCHAR(191) NULL,
  `leadNotificationEmail` VARCHAR(191) NULL,
  `metaSettingsJson` JSON NULL,
  `heroSettingsJson` JSON NULL,
  `chairmanSettingsJson` JSON NULL,
  `amenitiesJson` JSON NULL,
  `landmarksJson` JSON NULL,
  `paymentTiersJson` JSON NULL,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sitesetting` (
  `id`, `siteName`, `contactPhone`, `secondaryPhone`, `whatsappPhone`, `officialEmail`, `officeAddress`, `googleMapsUrl`, `rdaNocStatus`, `rdaVerificationUrl`, `announcement`, `activePreLaunchDiscount`, `smtpEnabled`, `smtpHost`, `smtpPort`, `smtpSecure`, `smtpUser`, `smtpPass`, `smtpFromEmail`, `leadNotificationEmail`
) VALUES (
  'default',
  'Saffron City Islamabad',
  '0333 1113551',
  '',
  '923331113551',
  'info@saffroncity.org',
  'Main GT Road, Near T-Chowk, Rawat, Islamabad / Rawalpindi',
  'https://maps.google.com/?q=Saffron+City+Rawat+Islamabad',
  'RDA Approved (Full 15,000 Kanal)',
  'https://punjab.gov.pk',
  '10% Pre-Launch Discount Active on 5 & 10 Marla Plots in Sector B',
  1,
  1,
  'smtp.hostinger.com',
  465,
  1,
  'info@saffroncity.org',
  '2igu-plh8-etms-ioqc',
  'info@saffroncity.org',
  'info@saffroncity.org'
) ON DUPLICATE KEY UPDATE `id` = VALUES(`id`);

-- -------------------------------------------------------------
-- 7. Page SEO & Meta Tags Table
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `pageseo` (
  `id` VARCHAR(100) PRIMARY KEY,
  `path` VARCHAR(191) UNIQUE NOT NULL,
  `pageName` VARCHAR(191) NOT NULL,
  `metaTitle` VARCHAR(255) NOT NULL,
  `metaDescription` TEXT NOT NULL,
  `h1Heading` VARCHAR(255) NULL,
  `focusKeyword` VARCHAR(255) NULL,
  `secondaryKeywords` TEXT NULL,
  `canonicalUrl` VARCHAR(500) NULL,
  `robotsIndex` BOOLEAN DEFAULT TRUE,
  `robotsFollow` BOOLEAN DEFAULT TRUE,
  `ogTitle` VARCHAR(255) NULL,
  `ogDescription` TEXT NULL,
  `ogImage` VARCHAR(500) NULL,
  `twitterTitle` VARCHAR(255) NULL,
  `twitterDescription` TEXT NULL,
  `twitterImage` VARCHAR(500) NULL,
  `schemaType` VARCHAR(100) DEFAULT 'WebSite',
  `customJsonLd` TEXT NULL,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `pageseo` (`id`, `path`, `pageName`, `metaTitle`, `metaDescription`, `h1Heading`, `canonicalUrl`, `robotsIndex`, `robotsFollow`, `schemaType`)
VALUES
('seo-home', '/', 'Home Page', 'Saffron City Islamabad | RDA Approved Plots on GT Road Rawat', 'Invest in Saffron City Islamabad — a premier 15,000 Kanal RDA NOC-approved housing society on Main GT Road near Rawat. 5, 10 Marla & 1 Kanal plots on easy 3-year installments.', 'Invest in Premium Living at Saffron City Islamabad', 'https://saffroncity.org', 1, 1, 'WebSite'),
('seo-about', '/about-us', 'About Us', 'About Us | Saffron City Islamabad (SKB Group Legacy)', 'Learn about Saffron City Islamabad developed by Saadullah Khan & Brothers (SKB Group) with over 70 years of infrastructure excellence and 100% RDA NOC clearance.', 'Shaping Pakistan\'s Future with 70+ Years of Engineering Excellence', 'https://saffroncity.org/about-us', 1, 1, 'AboutPage'),
('seo-masterplan', '/master-plan', 'Master Plan', 'Master Plan & Layout | Saffron City Islamabad 15,000 Kanal', 'Explore the 15,000 Kanal official master plan of Saffron City Islamabad featuring residential sectors, commercial boulevard, Grand Jamia mosque, and wide carpeted roads.', 'Official 15,000 Kanal Master Plan & Sector Map', 'https://saffroncity.org/master-plan', 1, 1, 'RealEstateListing'),
('seo-paymentplan', '/payment-plan', 'Payment Plan', 'Payment Plan 2026 | 3-Year Installments Saffron City Islamabad', 'View official 30-month installment payment plans for 5 Marla, 10 Marla, 1 Kanal residential & commercial plots in Saffron City Islamabad. 10% down payment.', 'Flexible 3-Year Payment Plans & Installment Schedule', 'https://saffroncity.org/payment-plan', 1, 1, 'ItemPage'),
('seo-noc', '/noc-status', 'NOC Status & Legal Clearances', 'RDA NOC Legal Status & Verification | Saffron City Islamabad', 'Verify 100% legal RDA No Objection Certificate (NOC) approval for Saffron City Islamabad across 15,000 Kanals on Main GT Road Rawat.', '100% RDA Approved & Legally Verified NOC Status', 'https://saffroncity.org/noc-status', 1, 1, 'ItemPage'),
('seo-location', '/location', 'Location & Access', 'Location & Map | Main GT Road Rawat Saffron City Islamabad', 'Discover prime location of Saffron City on Main GT Road near T-Chowk Rawat, with direct access to Rawalpindi Ring Road and Islamabad Expressway.', 'Prime Strategic Location on Main GT Road Rawat', 'https://saffroncity.org/location', 1, 1, 'ItemPage'),
('seo-sector-a', '/sectors/sector-a', 'Sector A (Executive)', 'Sector A Executive Plots | Saffron City Islamabad', 'Sector A at Saffron City offers premium luxury residential plots with direct access to Grand Mosque and main boulevard. Book with 10% down payment.', 'Sector A — Premium Executive Living', 'https://saffroncity.org/sectors/sector-a', 1, 1, 'RealEstateListing'),
('seo-sector-b', '/sectors/sector-b', 'Sector B (Affordable Living)', 'Sector B Plots | Affordable Housing Saffron City Islamabad', 'Sector B offers affordable 5, 10 Marla residential plots on 30-month easy installments with pre-launch discount rates in Saffron City Islamabad.', 'Sector B — Smart & Affordable Community Living', 'https://saffroncity.org/sectors/sector-b', 1, 1, 'RealEstateListing'),
('seo-plots-res', '/plots/residential', 'Residential Plots', 'Residential Plots for Sale | 5, 10 Marla & 1 Kanal Saffron City', 'Explore residential plot sizes in Saffron City Islamabad including 5 Marla, 10 Marla, and 1 Kanal on 30 monthly installments. RDA Approved.', 'Residential Plots Inventory — 5, 10 Marla & 1 Kanal', 'https://saffroncity.org/plots/residential', 1, 1, 'RealEstateListing'),
('seo-plots-com', '/plots/commercial', 'Commercial Plots', 'Commercial Plots for Sale | Main GT Road Commercial Hub Saffron City', 'Premium 4 & 8 Marla commercial plots on Main Boulevard in Saffron City Islamabad. Ideal for retail, plazas, corporate offices with high ROI.', 'Commercial Plots on Main GT Road Corridor', 'https://saffroncity.org/plots/commercial', 1, 1, 'RealEstateListing'),
('seo-blogs', '/blogs', 'Blogs & News', 'Real Estate News & Market Insights | Saffron City Islamabad', 'Read latest news, development updates, RDA verification reports and real estate investment guides for Saffron City Islamabad.', 'News, Updates & Expert Insights', 'https://saffroncity.org/blogs', 1, 1, 'ItemPage'),
('seo-contact', '/contact', 'Contact & Booking', 'Contact Saffron City Islamabad | Official Sales Office GT Road Rawat', 'Contact Saffron City official sales team for plot booking, site visits, overseas client facilitation, and RDA verification inquiries.', 'Get in Touch with Official Sales Office', 'https://saffroncity.org/contact', 1, 1, 'ContactPage')
ON DUPLICATE KEY UPDATE `path` = VALUES(`path`);

-- -------------------------------------------------------------
-- 8. URL Redirects Table
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `redirects` (
  `id` VARCHAR(100) PRIMARY KEY,
  `sourcePath` VARCHAR(255) UNIQUE NOT NULL,
  `destinationUrl` VARCHAR(500) NOT NULL,
  `statusCode` INT DEFAULT 301,
  `isActive` BOOLEAN DEFAULT TRUE,
  `hitCount` INT DEFAULT 0,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `redirects` (`id`, `sourcePath`, `destinationUrl`, `statusCode`, `isActive`, `hitCount`, `createdAt`)
VALUES
('red-01', '/payment-plans', '/payment-plan', 301, 1, 0, NOW()),
('red-02', '/masterplan', '/master-plan', 301, 1, 0, NOW()),
('red-03', '/noc', '/noc-status', 301, 1, 0, NOW())
ON DUPLICATE KEY UPDATE `sourcePath` = VALUES(`sourcePath`);
