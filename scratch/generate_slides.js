import fs from "fs";
import path from "path";

const targetDirs = [
  path.resolve("frontend/public/assets/projects"),
  path.resolve("backend/uploads"),
];

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeSlide(filename, svgContent) {
  for (const dir of targetDirs) {
    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, svgContent.trim());
    console.log(`Saved: ${filePath}`);
  }
}

// ── 1. Sri Abnaya Slide 2: Corporate Consulting & Reception Presentation ──
writeSlide(
  "sri-abnaya-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="ab2Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080F1E"/>
      <stop offset="60%" stop-color="#0F1E36"/>
      <stop offset="100%" stop-color="#0A1628"/>
    </linearGradient>
    <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>
    <linearGradient id="emeraldBar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#34D399"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#ab2Bg)"/>

  <!-- Subtle grid lines -->
  <g stroke="#38BDF8" stroke-width="0.6" stroke-opacity="0.12" fill="none">
    <line x1="0" y1="135" x2="1200" y2="135"/>
    <line x1="0" y1="270" x2="1200" y2="270"/>
    <line x1="0" y1="405" x2="1200" y2="405"/>
    <line x1="0" y1="540" x2="1200" y2="540"/>
    <line x1="200" y1="0" x2="200" y2="675"/>
    <line x1="400" y1="0" x2="400" y2="675"/>
    <line x1="600" y1="0" x2="600" y2="675"/>
    <line x1="800" y1="0" x2="800" y2="675"/>
    <line x1="1000" y1="0" x2="1000" y2="675"/>
  </g>

  <!-- Header Pill -->
  <g transform="translate(100, 70)">
    <rect x="0" y="0" width="220" height="34" rx="17" fill="#2563EB" fill-opacity="0.2" stroke="#38BDF8" stroke-width="1.2" stroke-opacity="0.5"/>
    <circle cx="18" cy="17" r="5" fill="#38BDF8"/>
    <text x="32" y="22" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">CLIENT CONSULTATION FLOW</text>
    <text x="0" y="70" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="36" font-weight="800">Sri Abnaya Corporate Experience</text>
    <text x="0" y="102" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="16" font-weight="500">Structured service portfolios, executive credentials, and real-time consultation intake</text>
  </g>

  <!-- 3 Interactive Workflow Cards -->
  <g transform="translate(100, 220)">
    <!-- Card 1 -->
    <rect x="0" y="0" width="310" height="360" rx="16" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
    <rect x="0" y="0" width="310" height="8" rx="4" fill="url(#blueGlow)"/>
    <rect x="24" y="32" width="48" height="48" rx="12" fill="#2563EB" fill-opacity="0.2"/>
    <path d="M40 56 L48 48 L56 56" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" fill="none"/>
    <text x="24" y="115" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="20" font-weight="700">Service Directory</text>
    <text x="24" y="145" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14" font-weight="400">Clear categorization of consulting,</text>
    <text x="24" y="168" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14" font-weight="400">commercial supply &amp; project management.</text>
    <rect x="24" y="210" width="262" height="36" rx="8" fill="#1E293B"/>
    <text x="40" y="233" fill="#E2E8F0" font-family="'Montserrat', sans-serif" font-size="12" font-weight="600">✓ Tier-1 Verified Credentials</text>
    <rect x="24" y="258" width="262" height="36" rx="8" fill="#1E293B"/>
    <text x="40" y="281" fill="#E2E8F0" font-family="'Montserrat', sans-serif" font-size="12" font-weight="600">✓ Industry Compliance Audits</text>
    <rect x="24" y="306" width="262" height="36" rx="8" fill="#1E293B"/>
    <text x="40" y="329" fill="#E2E8F0" font-family="'Montserrat', sans-serif" font-size="12" font-weight="600">✓ Transparent Engagement Terms</text>

    <!-- Card 2 -->
    <g transform="translate(345, 0)">
      <rect x="0" y="0" width="310" height="360" rx="16" fill="#0F172A" stroke="#2563EB" stroke-width="1.8"/>
      <rect x="0" y="0" width="310" height="8" rx="4" fill="url(#emeraldBar)"/>
      <rect x="24" y="32" width="48" height="48" rx="12" fill="#10B981" fill-opacity="0.2"/>
      <circle cx="48" cy="56" r="12" stroke="#34D399" stroke-width="3" fill="none"/>
      <text x="24" y="115" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="20" font-weight="700">Digital Consultation</text>
      <text x="24" y="145" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14" font-weight="400">Direct enquiry channels with</text>
      <text x="24" y="168" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14" font-weight="400">instant notification routing to managers.</text>
      <rect x="24" y="210" width="262" height="48" rx="8" fill="#1E293B" stroke="#38BDF8" stroke-width="1" stroke-opacity="0.3"/>
      <text x="36" y="235" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700">AVG RESPONSE VELOCITY</text>
      <text x="36" y="250" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">&lt; 15 Minutes</text>
      <rect x="24" y="270" width="262" height="66" rx="8" fill="#2563EB" fill-opacity="0.15" stroke="#2563EB" stroke-width="1"/>
      <text x="36" y="295" fill="#93C5FD" font-family="'Montserrat', sans-serif" font-size="11" font-weight="600">Direct WhatsApp Integration</text>
      <text x="36" y="318" fill="#E2E8F0" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">Instant Lead Connection</text>
    </g>

    <!-- Card 3 -->
    <g transform="translate(690, 0)">
      <rect x="0" y="0" width="310" height="360" rx="16" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
      <rect x="0" y="0" width="310" height="8" rx="4" fill="url(#blueGlow)"/>
      <rect x="24" y="32" width="48" height="48" rx="12" fill="#38BDF8" fill-opacity="0.2"/>
      <path d="M38 60 L48 48 L58 60" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" fill="none"/>
      <text x="24" y="115" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="20" font-weight="700">Mobile Optimization</text>
      <text x="24" y="145" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14" font-weight="400">Sub-second loading times</text>
      <text x="24" y="168" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14" font-weight="400">with zero visual layout shifts on mobile.</text>
      <g transform="translate(24, 210)">
        <rect x="0" y="0" width="125" height="120" rx="8" fill="#1E293B"/>
        <text x="62" y="55" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800" text-anchor="middle">99%</text>
        <text x="62" y="80" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="600" text-anchor="middle">Performance</text>

        <rect x="137" y="0" width="125" height="120" rx="8" fill="#1E293B"/>
        <text x="200" y="55" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800" text-anchor="middle">100%</text>
        <text x="200" y="80" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="600" text-anchor="middle">SEO Score</text>
      </g>
    </g>
  </g>
</svg>`
);

console.log("Completed Sri Abnaya slide 2");
