import fs from "fs";
import path from "path";

const BANNERS_MAP = {
  "inwora-erp": [
    "/assets/projects/inwora-erp.jpg",
    "/assets/projects/inwora-erp-slide2.jpg",
    "/assets/projects/inwora-erp-slide3.jpg",
  ],
  "balaji-jewellers": [
    "/assets/projects/balaji-jewellers.svg",
    "/assets/projects/balaji-jewellers-slide2.jpg",
    "/assets/projects/balaji-jewellers-slide3.svg",
  ],
  "sri-abnaya": [
    "/assets/projects/sri-abnaya.svg",
    "/assets/projects/sri-abnaya-slide2.svg",
    "/assets/projects/sri-abnaya-slide3.svg",
  ],
  "malligai-crm": [
    "/assets/projects/malligai-crm.svg",
    "/assets/projects/malligai-crm-slide2.svg",
    "/assets/projects/malligai-crm-slide3.svg",
  ],
  "jci-malligai": [
    "/assets/projects/jci-malligai.svg",
    "/assets/projects/jci-malligai-slide2.svg",
    "/assets/projects/jci-malligai-slide3.svg",
  ],
  "store-grocery-panel": [
    "/assets/projects/store-grocery-panel.svg",
    "/assets/projects/store-grocery-panel-slide2.svg",
  ],
  "user-grocery-app": [
    "/assets/projects/user-grocery-app.svg",
    "/assets/projects/user-grocery-app-slide2.svg",
  ],
  "admin-grocery-dashboard": [
    "/assets/projects/admin-grocery-dashboard.svg",
    "/assets/projects/admin-grocery-dashboard-slide2.svg",
  ],
  "grocery-api": [
    "/assets/projects/grocery-api.svg",
    "/assets/projects/grocery-api-slide2.svg",
  ],
  "takeaway": [
    "/assets/projects/takeaway.svg",
    "/assets/projects/takeaway-slide2.svg",
  ],
  "wallmark": [
    "/assets/projects/wallmark.svg",
    "/assets/projects/wallmark-slide2.jpg",
    "/assets/projects/wallmark-slide3.svg",
  ],
  "thambalam": [
    "/assets/projects/thambalam.svg",
    "/assets/projects/thambalam-slide2.jpg",
    "/assets/projects/thambalam-slide3.svg",
  ],
  "chai-fi": [
    "/assets/projects/chai-fi.svg",
    "/assets/projects/chai-fi-slide2.jpg",
    "/assets/projects/chai-fi-slide3.svg",
  ],
  "grocery-website": [
    "/assets/projects/grocery-website.svg",
    "/assets/projects/grocery-website-slide2.svg",
  ],
  "wora-stayz": [
    "/assets/projects/wora-stayz.svg",
    "/assets/projects/wora-stayz-slide2.jpg",
    "/assets/projects/wora-stayz-slide3.svg",
  ],
  "priyam": [
    "/assets/projects/priyam.svg",
    "/assets/projects/priyam-slide2.svg",
  ],
  "gold-poster": [
    "/assets/projects/gold-poster.jpg",
    "/assets/projects/gold-poster-slide2.jpg",
    "/assets/projects/gold-poster-slide3.jpg",
  ],
  "subra-residency": [
    "/assets/projects/subra-residency.svg",
    "/assets/projects/subra-residency-slide2.svg",
  ],
  "pos-kot": [
    "/assets/projects/pos-kot.jpg",
    "/assets/projects/pos-kot-slide2.jpg",
    "/assets/projects/pos-kot-slide3.jpg",
  ],
  "construction-crm": [
    "/assets/projects/construction-crm.jpg",
    "/assets/projects/construction-crm-slide2.jpg",
    "/assets/projects/construction-crm.png",
  ],
  "lead-management": [
    "/assets/projects/lead-management.png",
    "/assets/projects/lead-management-slide2.svg",
  ],
  "accounts-management": [
    "/assets/projects/accounts-management.png",
    "/assets/projects/accounts-management-slide2.svg",
  ],
  "factory-automation": [
    "/assets/projects/factory-automation.jpg",
    "/assets/projects/factory-automation-slide2.jpg",
    "/assets/projects/factory-automation.png",
  ],
  "hospital-management": [
    "/assets/projects/hospital-management.png",
    "/assets/projects/hospital-management-slide2.svg",
  ],
  "travel-budget": [
    "/assets/projects/travel-budget.png",
    "/assets/projects/travel-budget-slide2.svg",
  ],
  "scrom-lms": [
    "/assets/projects/scrom-lms.png",
    "/assets/projects/scrom-lms-slide2.svg",
  ],
};

// 1. Update frontend/src/lib/portfolio-data.ts
const portfolioFile = path.resolve("frontend/src/lib/portfolio-data.ts");
let portfolioSrc = fs.readFileSync(portfolioFile, "utf8");

for (const [id, banners] of Object.entries(BANNERS_MAP)) {
  const bannersJson = JSON.stringify(banners, null, 6)
    .replace(/^\[/m, "[\n")
    .replace(/\]$/, "    ]")
    .split("\n")
    .map((line, idx) => (idx === 0 ? line : "    " + line.trim()))
    .join("\n");

  const regex = new RegExp(
    `({\\s*id:\\s*"${id}"[\\s\\S]*?banners:\\s*\\[)[\\s\\S]*?(\\][\\s\\S]*?tags:)`,
    "m"
  );

  if (regex.test(portfolioSrc)) {
    portfolioSrc = portfolioSrc.replace(
      regex,
      `$1\n${banners.map((b) => `      "${b}",`).join("\n")}\n    $2`
    );
    console.log(`Updated portfolio-data.ts banners for: ${id}`);
  } else {
    console.warn(`Could not match in portfolio-data.ts: ${id}`);
  }
}
fs.writeFileSync(portfolioFile, portfolioSrc, "utf8");
console.log("portfolio-data.ts updated successfully!");

// 2. Update backend/database/seed-data.php
const seedDataFile = path.resolve("backend/database/seed-data.php");
let seedSrc = fs.readFileSync(seedDataFile, "utf8");

for (const [slug, banners] of Object.entries(BANNERS_MAP)) {
  const phpBanners = banners.map((b) => `            '${b}',`).join("\n");
  const bannersBlock = `'banner'     => '${banners[0]}',\n        'banners'    => [\n${phpBanners}\n        ],`;

  const regex = new RegExp(`'slug'\\s*=>\\s*'${slug}'[\\s\\S]*?'banner'\\s*=>\\s*'[^']*',`);
  if (regex.test(seedSrc)) {
    seedSrc = seedSrc.replace(regex, (match) => {
      return match.replace(/'banner'\s*=>\s*'[^']*',/, bannersBlock);
    });
    console.log(`Updated seed-data.php banners for: ${slug}`);
  } else {
    console.warn(`Could not match in seed-data.php: ${slug}`);
  }
}
fs.writeFileSync(seedDataFile, seedSrc, "utf8");
console.log("seed-data.php updated successfully!");

// 3. Update backend/database/seed-data-products.php
const PRODUCT_BANNERS_MAP = {
  "gold-application": [
    "/assets/projects/gold-poster.jpg",
    "/assets/projects/gold-poster-slide2.jpg",
    "/assets/projects/gold-poster-slide3.jpg",
  ],
  "construction-erp": [
    "/assets/projects/construction-crm.jpg",
    "/assets/projects/construction-management-slide2.jpg",
    "/assets/projects/construction-crm.png",
  ],
  "unified-business-erp": [
    "/assets/projects/unified-business-erp.jpg",
    "/assets/projects/unified-business-erp-slide2.jpg",
    "/assets/projects/unified-business-erp-slide3.jpg",
  ],
  "pos-kot": [
    "/assets/projects/pos-kot.jpg",
    "/assets/projects/pos-kot-slide2.jpg",
    "/assets/projects/pos-kot-slide3.jpg",
  ],
  "factory-management": [
    "/assets/projects/factory-automation.jpg",
    "/assets/projects/factory-management-slide2.jpg",
    "/assets/projects/factory-automation.png",
  ],
};

const productSeedFile = path.resolve("backend/database/seed-data-products.php");
let productSeedSrc = fs.readFileSync(productSeedFile, "utf8");

for (const [slug, banners] of Object.entries(PRODUCT_BANNERS_MAP)) {
  const phpBanners = banners.map((b) => `            '${b}',`).join("\n");
  const bannersBlock = `'image'          => '${banners[0]}',\n        'banners'        => [\n${phpBanners}\n        ],`;

  const regex = new RegExp(`'slug'\\s*=>\\s*'${slug}'[\\s\\S]*?'image'\\s*=>\\s*'[^']*',`);
  if (regex.test(productSeedSrc)) {
    productSeedSrc = productSeedSrc.replace(regex, (match) => {
      return match.replace(/'image'\s*=>\s*'[^']*',/, bannersBlock);
    });
    console.log(`Updated seed-data-products.php banners for: ${slug}`);
  }
}
fs.writeFileSync(productSeedFile, productSeedSrc, "utf8");
console.log("seed-data-products.php updated successfully!");
