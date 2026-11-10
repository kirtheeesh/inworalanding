import fs from "fs";
import path from "path";

const targetDirs = [
  path.resolve("frontend/public/assets/projects"),
  path.resolve("backend/uploads"),
];

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeSlide(filename, svgContent) {
  for (const dir of targetDirs) {
    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, svgContent.trim());
  }
  console.log(`Generated: ${filename}`);
}

function card(x, y, w, h, title, subtitle, badge, accentColor, innerSvg) {
  return `
    <g transform="translate(${x}, ${y})">
      <rect width="${w}" height="${h}" rx="16" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
      <rect width="${w}" height="46" rx="16" fill="#1E293B"/>
      <rect y="36" width="${w}" height="10" fill="#1E293B"/>
      <circle cx="24" cy="23" r="5" fill="#EF4444"/>
      <circle cx="40" cy="23" r="5" fill="#F59E0B"/>
      <circle cx="56" cy="23" r="5" fill="#10B981"/>
      <text x="75" y="27" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="600">${title}</text>
      ${badge ? `<rect x="${w - 110}" y="12" width="95" height="22" rx="11" fill="${accentColor}" fill-opacity="0.2"/>
      <text x="${w - 62}" y="27" fill="${accentColor}" font-family="'Montserrat', sans-serif" font-size="9" font-weight="700" text-anchor="middle">${badge}</text>` : ""}
      <g transform="translate(24, 65)">
        ${innerSvg}
      </g>
    </g>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. SRI ABNAYA - Slide 3
// ─────────────────────────────────────────────────────────────────────────────
writeSlide(
  "sri-abnaya-slide3.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="ab3Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070D18"/>
      <stop offset="50%" stop-color="#0F1F38"/>
      <stop offset="100%" stop-color="#050B14"/>
    </linearGradient>
    <linearGradient id="abAccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#ab3Bg)"/>
  <g transform="translate(100, 60)">
    <rect width="180" height="32" rx="16" fill="#2563EB" fill-opacity="0.2" stroke="#38BDF8" stroke-width="1"/>
    <text x="90" y="21" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">CROSS-DEVICE SUITE</text>
    <text x="0" y="70" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="36" font-weight="800">Sri Abnaya Digital Ecosystem</text>
    <text x="0" y="100" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="15">Adaptive client booking, corporate portfolio presentation &amp; real-time enquiry routing</text>
  </g>
  <g transform="translate(100, 190)">
    <rect width="480" height="420" rx="16" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
    <rect width="480" height="42" rx="16" fill="#1E293B"/>
    <text x="24" y="26" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">DESKTOP CORPORATE SHOWCASE</text>
    <rect x="24" y="65" width="432" height="150" rx="8" fill="#1E293B"/>
    <text x="44" y="110" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="20" font-weight="700">Enterprise Service Packages</text>
    <text x="44" y="135" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">Structured milestones, SLA guarantees, verified deliverables</text>
    <rect x="44" y="155" width="160" height="36" rx="6" fill="#2563EB"/>
    <text x="124" y="178" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="12" font-weight="600" text-anchor="middle">Explore Solutions</text>
    
    <g transform="translate(24, 235)">
      <rect width="206" height="150" rx="8" fill="#1E293B"/>
      <text x="16" y="32" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">VERIFIED CLIENTS</text>
      <text x="16" y="70" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="32" font-weight="800">120+</text>
      <text x="16" y="95" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">Active commercial partnerships</text>
    </g>
    <g transform="translate(250, 235)">
      <rect width="206" height="150" rx="8" fill="#1E293B"/>
      <text x="16" y="32" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">PROJECT RETENTION</text>
      <text x="16" y="70" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="32" font-weight="800">98.4%</text>
      <text x="16" y="95" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">Repeat enterprise engagements</text>
    </g>
  </g>
  <g transform="translate(620, 190)">
    <rect width="480" height="420" rx="16" fill="#0F172A" stroke="#2563EB" stroke-width="1.5"/>
    <rect width="480" height="42" rx="16" fill="#1E293B"/>
    <text x="24" y="26" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">MOBILE INTAKE WORKFLOW</text>
    <g transform="translate(24, 65)">
      <rect width="432" height="70" rx="8" fill="#1E293B"/>
      <text x="20" y="30" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">1. Instant Enquiry Touchpoint</text>
      <text x="20" y="52" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Prospect completes tailored requirements in 30 seconds</text>
    </g>
    <g transform="translate(24, 150)">
      <rect width="432" height="70" rx="8" fill="#1E293B"/>
      <text x="20" y="30" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">2. Real-time Lead Notification</text>
      <text x="20" y="52" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Direct routing to senior business developers on WhatsApp &amp; Email</text>
    </g>
    <g transform="translate(24, 235)">
      <rect width="432" height="70" rx="8" fill="#1E293B"/>
      <text x="20" y="30" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">3. Proposal &amp; Quotation Delivery</text>
      <text x="20" y="52" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Automated proposal generation with dynamic pricing tiers</text>
    </g>
    <rect x="24" y="325" width="432" height="60" rx="8" fill="url(#abAccent)"/>
    <text x="240" y="360" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700" text-anchor="middle">Experience sriabnaya.aimstorm.in</text>
  </g>
</svg>`
);

// ─────────────────────────────────────────────────────────────────────────────
// 2. MALLIGAI CRM - Slide 2 (Kanban Pipeline) & Slide 3 (Follow-up Automation)
// ─────────────────────────────────────────────────────────────────────────────
writeSlide(
  "malligai-crm-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="crmBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B132B"/>
      <stop offset="60%" stop-color="#1C2541"/>
      <stop offset="100%" stop-color="#0A1128"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#crmBg)"/>
  <g transform="translate(80, 50)">
    <rect width="200" height="30" rx="15" fill="#6366F1" fill-opacity="0.2" stroke="#818CF8" stroke-width="1"/>
    <text x="100" y="20" fill="#818CF8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">SALES PIPELINE KANBAN</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Malligai CRM Lead Stages</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Multi-channel lead tracking, team conversion velocity, and stage movement</text>
  </g>
  <!-- 4 Kanban Columns -->
  <g transform="translate(80, 170)">
    <!-- Column 1: New Enquiries -->
    <rect width="240" height="450" rx="12" fill="#0F172A" stroke="#334155" stroke-width="1.2"/>
    <rect width="240" height="40" rx="12" fill="#1E293B"/>
    <text x="16" y="25" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">NEW ENQUIRIES (18)</text>
    <g transform="translate(12, 52)">
      <rect width="216" height="85" rx="8" fill="#1E293B" stroke="#334155"/>
      <text x="14" y="25" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">Apex Construction</text>
      <text x="14" y="44" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">Commercial HVAC inquiry</text>
      <rect x="14" y="55" width="60" height="20" rx="4" fill="#0284C7" fill-opacity="0.3"/>
      <text x="44" y="69" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="9" font-weight="700" text-anchor="middle">HIGH</text>
      <text x="195" y="70" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="10" text-anchor="end">2m ago</text>
    </g>
    <g transform="translate(12, 147)">
      <rect width="216" height="85" rx="8" fill="#1E293B" stroke="#334155"/>
      <text x="14" y="25" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">Surya Textiles</text>
      <text x="14" y="44" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">ERP integration quote</text>
      <rect x="14" y="55" width="60" height="20" rx="4" fill="#10B981" fill-opacity="0.3"/>
      <text x="44" y="69" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="9" font-weight="700" text-anchor="middle">WARM</text>
      <text x="195" y="70" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="10" text-anchor="end">14m ago</text>
    </g>
  </g>
  <!-- Column 2: In Contact -->
  <g transform="translate(340, 170)">
    <rect width="240" height="450" rx="12" fill="#0F172A" stroke="#334155" stroke-width="1.2"/>
    <rect width="240" height="40" rx="12" fill="#1E293B"/>
    <text x="16" y="25" fill="#F59E0B" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">IN CONTACT (12)</text>
    <g transform="translate(12, 52)">
      <rect width="216" height="95" rx="8" fill="#1E293B" stroke="#F59E0B" stroke-width="1.2"/>
      <text x="14" y="25" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">Kaveri Agro Tech</text>
      <text x="14" y="44" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">Demo scheduled for 4 PM</text>
      <text x="14" y="62" fill="#F59E0B" font-family="'Montserrat', sans-serif" font-size="11" font-weight="600">Agent: Priya S.</text>
      <rect x="14" y="70" width="70" height="18" rx="4" fill="#F59E0B" fill-opacity="0.2"/>
      <text x="49" y="83" fill="#F59E0B" font-family="'Montserrat', sans-serif" font-size="9" font-weight="700" text-anchor="middle">FOLLOW-UP</text>
    </g>
  </g>
  <!-- Column 3: Proposal Sent -->
  <g transform="translate(600, 170)">
    <rect width="240" height="450" rx="12" fill="#0F172A" stroke="#334155" stroke-width="1.2"/>
    <rect width="240" height="40" rx="12" fill="#1E293B"/>
    <text x="16" y="25" fill="#818CF8" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">PROPOSAL SENT (7)</text>
    <g transform="translate(12, 52)">
      <rect width="216" height="95" rx="8" fill="#1E293B" stroke="#334155"/>
      <text x="14" y="25" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">Vasantham Motors</text>
      <text x="14" y="44" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">Commercial SLA Sent</text>
      <text x="14" y="64" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">₹ 4,50,000</text>
      <text x="195" y="83" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="10" text-anchor="end">Viewed 1h ago</text>
    </g>
  </g>
  <!-- Column 4: Deals Won -->
  <g transform="translate(860, 170)">
    <rect width="240" height="450" rx="12" fill="#0F172A" stroke="#10B981" stroke-width="1.5"/>
    <rect width="240" height="40" rx="12" fill="#064E3B"/>
    <text x="16" y="25" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">CLOSED WON (34)</text>
    <g transform="translate(12, 52)">
      <rect width="216" height="95" rx="8" fill="#1E293B" stroke="#10B981"/>
      <text x="14" y="25" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">Sri Balaji Logistics</text>
      <text x="14" y="44" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">Annual SaaS Contract</text>
      <text x="14" y="64" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="13" font-weight="800">₹ 8,20,000</text>
      <rect x="14" y="70" width="80" height="18" rx="4" fill="#10B981" fill-opacity="0.3"/>
      <text x="54" y="83" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="9" font-weight="700" text-anchor="middle">ACTIVE CLIENT</text>
    </g>
  </g>
</svg>`
);

writeSlide(
  "malligai-crm-slide3.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="crm3Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B132B"/>
      <stop offset="60%" stop-color="#141E38"/>
      <stop offset="100%" stop-color="#080D1D"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#crm3Bg)"/>
  <g transform="translate(80, 50)">
    <rect width="220" height="30" rx="15" fill="#6366F1" fill-opacity="0.2" stroke="#818CF8" stroke-width="1"/>
    <text x="110" y="20" fill="#818CF8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">AUTOMATED FOLLOW-UPS</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Malligai CRM Client Timeline</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Never miss an inquiry — automated WhatsApp, SMS, and email alerts</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="650" height="460" rx="16" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
    <rect width="650" height="42" rx="16" fill="#1E293B"/>
    <text x="24" y="26" fill="#818CF8" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">CUSTOMER INTERACTION HISTORY &amp; AUDIT TRAIL</text>
    <g transform="translate(24, 60)">
      <circle cx="16" cy="16" r="8" fill="#10B981"/>
      <line x1="16" y1="24" x2="16" y2="70" stroke="#334155" stroke-width="2"/>
      <text x="40" y="16" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">Inbound Website Lead Received</text>
      <text x="40" y="34" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">Source: crmmalligai.inwora.com • 10:45 AM</text>
    </g>
    <g transform="translate(24, 130)">
      <circle cx="16" cy="16" r="8" fill="#38BDF8"/>
      <line x1="16" y1="24" x2="16" y2="70" stroke="#334155" stroke-width="2"/>
      <text x="40" y="16" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">Automated WhatsApp Welcome Sent</text>
      <text x="40" y="34" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">Delivered &amp; read • 10:46 AM</text>
    </g>
    <g transform="translate(24, 200)">
      <circle cx="16" cy="16" r="8" fill="#F59E0B"/>
      <line x1="16" y1="24" x2="16" y2="70" stroke="#334155" stroke-width="2"/>
      <text x="40" y="16" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">Outbound Call Logged by Sales Agent</text>
      <text x="40" y="34" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">Duration: 4m 12s • Client requested product demo</text>
    </g>
    <g transform="translate(24, 270)">
      <circle cx="16" cy="16" r="8" fill="#6366F1"/>
      <text x="40" y="16" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">Demo Scheduled &amp; Calendar Invite Synced</text>
      <text x="40" y="34" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">Set for Tomorrow 3:00 PM • Google Calendar &amp; Outlook</text>
    </g>
  </g>
  <g transform="translate(760, 160)">
    <rect width="360" height="460" rx="16" fill="#0F172A" stroke="#6366F1" stroke-width="1.5"/>
    <rect width="360" height="42" rx="16" fill="#1E293B"/>
    <text x="24" y="26" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">SALES REP PERFORMANCE</text>
    <g transform="translate(24, 65)">
      <text x="0" y="16" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Monthly Target: 85%</text>
      <rect y="26" width="312" height="12" rx="6" fill="#1E293B"/>
      <rect y="26" width="265" height="12" rx="6" fill="#6366F1"/>
    </g>
    <g transform="translate(24, 135)">
      <rect width="312" height="90" rx="8" fill="#1E293B"/>
      <text x="16" y="30" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">TOTAL CONVERSIONS</text>
      <text x="16" y="65" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">142 Leads</text>
    </g>
    <g transform="translate(24, 240)">
      <rect width="312" height="90" rx="8" fill="#1E293B"/>
      <text x="16" y="30" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">AVG CONVERSION CYCLE</text>
      <text x="16" y="65" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">4.2 Days</text>
    </g>
  </g>
</svg>`
);

// ─────────────────────────────────────────────────────────────────────────────
// 3. JCI MALLIGAI - Slide 2 & 3
// ─────────────────────────────────────────────────────────────────────────────
writeSlide(
  "jci-malligai-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="jciBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#041F38"/>
      <stop offset="60%" stop-color="#0A365C"/>
      <stop offset="100%" stop-color="#031526"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#jciBg)"/>
  <g transform="translate(80, 50)">
    <rect width="210" height="30" rx="15" fill="#0284C7" fill-opacity="0.25" stroke="#38BDF8" stroke-width="1"/>
    <text x="105" y="20" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">MEMBER MANAGEMENT</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">JCI Malligai Chapter Portal</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Digital roster, committee roles, and verified membership credentials</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="1040" height="460" rx="16" fill="#0B1B2B" stroke="#0284C7" stroke-width="1.2"/>
    <rect width="1040" height="46" rx="16" fill="#132B45"/>
    <text x="30" y="28" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">ACTIVE CHAPTER MEMBERS &amp; DIRECTORS</text>
    
    <!-- Member Row 1 -->
    <g transform="translate(30, 70)">
      <rect width="980" height="70" rx="8" fill="#173456"/>
      <circle cx="36" cy="35" r="20" fill="#0284C7"/>
      <text x="36" y="41" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700" text-anchor="middle">JS</text>
      <text x="75" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">Jc. Suresh Kumar</text>
      <text x="75" y="52" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Chapter President (2026)</text>
      <rect x="420" y="22" width="130" height="26" rx="13" fill="#10B981" fill-opacity="0.2"/>
      <text x="485" y="39" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" text-anchor="middle">EXECUTIVE BOARD</text>
      <text x="780" y="40" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">Attendance: 100%</text>
    </g>

    <!-- Member Row 2 -->
    <g transform="translate(30, 155)">
      <rect width="980" height="70" rx="8" fill="#173456"/>
      <circle cx="36" cy="35" r="20" fill="#F59E0B"/>
      <text x="36" y="41" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700" text-anchor="middle">AR</text>
      <text x="75" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">Jc. Anand Ram</text>
      <text x="75" y="52" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Secretary &amp; Governance Officer</text>
      <rect x="420" y="22" width="130" height="26" rx="13" fill="#38BDF8" fill-opacity="0.2"/>
      <text x="485" y="39" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" text-anchor="middle">SECRETARIAT</text>
      <text x="780" y="40" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">Attendance: 96%</text>
    </g>

    <!-- Member Row 3 -->
    <g transform="translate(30, 240)">
      <rect width="980" height="70" rx="8" fill="#173456"/>
      <circle cx="36" cy="35" r="20" fill="#8B5CF6"/>
      <text x="36" y="41" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700" text-anchor="middle">MK</text>
      <text x="75" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">Jc. Meenakshi K.</text>
      <text x="75" y="52" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">VP Community &amp; Youth Development</text>
      <rect x="420" y="22" width="130" height="26" rx="13" fill="#8B5CF6" fill-opacity="0.2"/>
      <text x="485" y="39" fill="#C4B5FD" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" text-anchor="middle">DIRECTOR</text>
      <text x="780" y="40" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">Attendance: 94%</text>
    </g>
  </g>
</svg>`
);

writeSlide(
  "jci-malligai-slide3.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="jci3Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#041F38"/>
      <stop offset="60%" stop-color="#082845"/>
      <stop offset="100%" stop-color="#02101F"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#jci3Bg)"/>
  <g transform="translate(80, 50)">
    <rect width="210" height="30" rx="15" fill="#0284C7" fill-opacity="0.25" stroke="#38BDF8" stroke-width="1"/>
    <text x="105" y="20" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">PROJECT INITIATIVES</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">JCI Malligai Impact Log</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Community development, youth training programs, and chapter award archives</text>
  </g>
  <g transform="translate(80, 160)">
    <g transform="translate(0, 0)">
      <rect width="320" height="450" rx="16" fill="#0B1B2B" stroke="#334155"/>
      <rect width="320" height="120" rx="16" fill="#0284C7"/>
      <text x="24" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="20" font-weight="800">Youth Leadership Camp</text>
      <text x="24" y="90" fill="#E0F2FE" font-family="'Montserrat', sans-serif" font-size="12">March 2026 • 240 Students</text>
      <text x="24" y="160" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="600">Key Outcomes:</text>
      <text x="24" y="190" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">• Public speaking seminars</text>
      <text x="24" y="215" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">• Career guidance panels</text>
      <text x="24" y="240" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">• Certificate distributions</text>
    </g>
    <g transform="translate(360, 0)">
      <rect width="320" height="450" rx="16" fill="#0B1B2B" stroke="#334155"/>
      <rect width="320" height="120" rx="16" fill="#10B981"/>
      <text x="24" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="20" font-weight="800">Green City Plantation</text>
      <text x="24" y="90" fill="#D1FAE5" font-family="'Montserrat', sans-serif" font-size="12">February 2026 • 1,500 Saplings</text>
      <text x="24" y="160" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="600">Key Outcomes:</text>
      <text x="24" y="190" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">• 5 School campus drives</text>
      <text x="24" y="215" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">• Corporate volunteer participation</text>
      <text x="24" y="240" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">• Environmental awareness kit</text>
    </g>
    <g transform="translate(720, 0)">
      <rect width="320" height="450" rx="16" fill="#0B1B2B" stroke="#334155"/>
      <rect width="320" height="120" rx="16" fill="#8B5CF6"/>
      <text x="24" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="20" font-weight="800">Blood Donation Drive</text>
      <text x="24" y="90" fill="#EDE9FE" font-family="'Montserrat', sans-serif" font-size="12">January 2026 • 185 Donors</text>
      <text x="24" y="160" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="600">Key Outcomes:</text>
      <text x="24" y="190" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">• District Hospital tie-up</text>
      <text x="24" y="215" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">• Emergency registry updated</text>
      <text x="24" y="240" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">• 100% safety compliance</text>
    </g>
  </g>
</svg>`
);

// ─────────────────────────────────────────────────────────────────────────────
// 4. GROCERY SUITE (Store Panel, User App, Admin Dashboard, Grocery API)
// ─────────────────────────────────────────────────────────────────────────────
writeSlide(
  "store-grocery-panel-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="gpBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#062014"/>
      <stop offset="60%" stop-color="#0E3D27"/>
      <stop offset="100%" stop-color="#05170E"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#gpBg)"/>
  <g transform="translate(80, 50)">
    <rect width="210" height="30" rx="15" fill="#10B981" fill-opacity="0.25" stroke="#34D399" stroke-width="1"/>
    <text x="105" y="20" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">LIVE ORDER PACKING</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Store Grocery Panel Workflows</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Real-time order incoming alerts, barcode item verification &amp; rider assignment</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="1040" height="460" rx="16" fill="#0A1E14" stroke="#10B981" stroke-width="1.5"/>
    <rect width="1040" height="46" rx="16" fill="#123524"/>
    <text x="30" y="28" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">STORE ORDER DISPATCH QUEUE • 8 ORDERS READY FOR RIDER PICKUP</text>
    
    <g transform="translate(30, 70)">
      <rect width="470" height="170" rx="10" fill="#15422D" stroke="#34D399" stroke-width="1.2"/>
      <text x="20" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700">Order #GRC-9841</text>
      <rect x="360" y="16" width="90" height="24" rx="12" fill="#10B981"/>
      <text x="405" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="10" font-weight="700" text-anchor="middle">PACKED</text>
      <text x="20" y="65" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">• Organic Cow Milk 1L (x2)</text>
      <text x="20" y="90" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">• Fresh Tomatoes 1kg (x1)</text>
      <text x="20" y="115" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">• Whole Wheat Bread 400g (x1)</text>
      <text x="20" y="145" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Rider: Rajesh (Arriving in 3 mins)</text>
    </g>

    <g transform="translate(540, 70)">
      <rect width="470" height="170" rx="10" fill="#15422D" stroke="#F59E0B" stroke-width="1.2"/>
      <text x="20" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700">Order #GRC-9842</text>
      <rect x="340" y="16" width="110" height="24" rx="12" fill="#F59E0B"/>
      <text x="395" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="10" font-weight="700" text-anchor="middle">PACKING (3/5)</text>
      <text x="20" y="65" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">• Sona Masoori Rice 5kg [Scanned ✓]</text>
      <text x="20" y="90" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">• Sunflower Oil 1L [Scanned ✓]</text>
      <text x="20" y="115" fill="#F59E0B" font-family="'Montserrat', sans-serif" font-size="13">• Kashmiri Chilli Powder 200g [Pending]</text>
      <text x="20" y="145" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">Picker: Counter 2</text>
    </g>

    <g transform="translate(30, 260)">
      <rect width="980" height="160" rx="10" fill="#123524"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">Store Inventory Low-Stock Alerts</text>
      <g transform="translate(24, 55)">
        <rect width="290" height="80" rx="6" fill="#1A4731"/>
        <text x="16" y="28" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">Brown Eggs (Pack of 12)</text>
        <text x="16" y="52" fill="#EF4444" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">4 packs left (Reorder alert)</text>
      </g>
      <g transform="translate(330, 55)">
        <rect width="290" height="80" rx="6" fill="#1A4731"/>
        <text x="16" y="28" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">Aashirvaad Atta 10kg</text>
        <text x="16" y="52" fill="#F59E0B" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">8 bags left</text>
      </g>
      <g transform="translate(635, 55)">
        <rect width="320" height="80" rx="6" fill="#1A4731"/>
        <text x="16" y="28" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">Fresh Coriander Bunches</text>
        <text x="16" y="52" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Replenished today (45 units)</text>
      </g>
    </g>
  </g>
</svg>`
);

writeSlide(
  "user-grocery-app-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="ugBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#041E11"/>
      <stop offset="60%" stop-color="#0B3820"/>
      <stop offset="100%" stop-color="#02140A"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#ugBg)"/>
  <g transform="translate(80, 50)">
    <rect width="220" height="30" rx="15" fill="#10B981" fill-opacity="0.25" stroke="#34D399" stroke-width="1"/>
    <text x="110" y="20" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">EXPRESS DELIVERY TRACKING</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">User Grocery Mobile App</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Sub-30 minute doorstep delivery with live GPS courier routing and instant notifications</text>
  </g>
  <g transform="translate(140, 160)">
    <!-- Phone Mockup 1: Map Tracking -->
    <rect width="280" height="470" rx="28" fill="#0F172A" stroke="#34D399" stroke-width="3"/>
    <rect x="80" y="10" width="120" height="18" rx="9" fill="#1E293B"/>
    <rect x="15" y="40" width="250" height="240" rx="16" fill="#1E293B"/>
    <!-- Map Path Mockup -->
    <path d="M40 220 Q120 120 220 80" stroke="#10B981" stroke-width="4" stroke-dasharray="8 6" fill="none"/>
    <circle cx="220" cy="80" r="10" fill="#EF4444"/>
    <circle cx="40" cy="220" r="12" fill="#10B981"/>
    <text x="40" y="224" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="10" font-weight="700" text-anchor="middle">YOU</text>
    
    <g transform="translate(20, 300)">
      <text x="0" y="20" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700">Delivery in 11 Mins</text>
      <text x="0" y="40" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Rider Manoj is on his way</text>
      <rect y="60" width="240" height="40" rx="8" fill="#10B981"/>
      <text x="120" y="85" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700" text-anchor="middle">Call Rider</text>
    </g>

    <!-- Phone Mockup 2: Cart Checkout -->
    <g transform="translate(340, 0)">
      <rect width="280" height="470" rx="28" fill="#0F172A" stroke="#334155" stroke-width="2"/>
      <rect x="80" y="10" width="120" height="18" rx="9" fill="#1E293B"/>
      <text x="24" y="55" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="18" font-weight="800">My Basket (4 items)</text>
      
      <g transform="translate(15, 80)">
        <rect width="250" height="60" rx="8" fill="#1E293B"/>
        <text x="14" y="26" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="12" font-weight="600">Fresh Strawberries 250g</text>
        <text x="14" y="45" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">₹ 140</text>
      </g>
      <g transform="translate(15, 150)">
        <rect width="250" height="60" rx="8" fill="#1E293B"/>
        <text x="14" y="26" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="12" font-weight="600">Amul Butter 500g</text>
        <text x="14" y="45" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">₹ 275</text>
      </g>
      <g transform="translate(15, 220)">
        <rect width="250" height="60" rx="8" fill="#1E293B"/>
        <text x="14" y="26" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="12" font-weight="600">Farm Fresh Spinach 1kg</text>
        <text x="14" y="45" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">₹ 65</text>
      </g>
      <g transform="translate(15, 340)">
        <text x="0" y="20" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">Bill Total:</text>
        <text x="250" y="20" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="18" font-weight="800" text-anchor="end">₹ 480</text>
        <rect y="35" width="250" height="45" rx="8" fill="#10B981"/>
        <text x="125" y="62" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700" text-anchor="middle">Proceed to Pay</text>
      </g>
    </g>

    <!-- Key Metrics Panel -->
    <g transform="translate(680, 40)">
      <rect width="240" height="170" rx="12" fill="#0F172A" stroke="#10B981" stroke-width="1.2"/>
      <text x="20" y="36" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">REPEAT ORDER RATE</text>
      <text x="20" y="90" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="44" font-weight="800">76%</text>
      <text x="20" y="125" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">Weekly pantry restocking</text>
    </g>
    <g transform="translate(680, 240)">
      <rect width="240" height="170" rx="12" fill="#0F172A" stroke="#38BDF8" stroke-width="1.2"/>
      <text x="20" y="36" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">AVG DELIVERY TIME</text>
      <text x="20" y="90" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="44" font-weight="800">22 Min</text>
      <text x="20" y="125" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">Across 12 dark stores</text>
    </g>
  </g>
</svg>`
);

writeSlide(
  "admin-grocery-dashboard-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="agdBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#041F28"/>
      <stop offset="60%" stop-color="#083849"/>
      <stop offset="100%" stop-color="#02141A"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#agdBg)"/>
  <g transform="translate(80, 50)">
    <rect width="220" height="30" rx="15" fill="#0284C7" fill-opacity="0.25" stroke="#38BDF8" stroke-width="1"/>
    <text x="110" y="20" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">PLATFORM GMV ANALYTICS</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Admin Grocery Command Center</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Multi-store sales revenues, vendor commissions, and delivery fleet performance</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="1040" height="460" rx="16" fill="#071822" stroke="#0284C7" stroke-width="1.2"/>
    <rect width="1040" height="46" rx="16" fill="#0D2636"/>
    <text x="30" y="28" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">EXECUTIVE PLATFORM REVENUE BREAKDOWN</text>
    
    <!-- 3 Big Metric Cards -->
    <g transform="translate(30, 70)">
      <rect width="300" height="120" rx="10" fill="#0E2D3E"/>
      <text x="20" y="32" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">TODAY'S GROSS GMV</text>
      <text x="20" y="75" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="32" font-weight="800">₹ 8,45,200</text>
      <text x="20" y="102" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12">↑ 18.4% vs last week</text>
    </g>
    <g transform="translate(370, 70)">
      <rect width="300" height="120" rx="10" fill="#0E2D3E"/>
      <text x="20" y="32" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">TOTAL ORDERS COMPLETED</text>
      <text x="20" y="75" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="32" font-weight="800">3,892 Orders</text>
      <text x="20" y="102" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="12">99.1% on-time fulfillment</text>
    </g>
    <g transform="translate(710, 70)">
      <rect width="300" height="120" rx="10" fill="#0E2D3E"/>
      <text x="20" y="32" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">ACTIVE DELIVERY RIDERS</text>
      <text x="20" y="75" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="32" font-weight="800">148 Online</text>
      <text x="20" y="102" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="12">Average rating 4.85 ★</text>
    </g>

    <!-- Visual Chart / Grid -->
    <g transform="translate(30, 215)">
      <rect width="980" height="215" rx="10" fill="#0A2230"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Top Performing Stores by Revenue</text>
      
      <g transform="translate(24, 60)">
        <text x="0" y="16" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">1. Chennai Central Dark Store (₹ 3,40,000)</text>
        <rect y="26" width="930" height="12" rx="6" fill="#13364B"/>
        <rect y="26" width="780" height="12" rx="6" fill="#34D399"/>
      </g>
      <g transform="translate(24, 120)">
        <text x="0" y="16" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">2. Anna Nagar Hub (₹ 2,90,000)</text>
        <rect y="26" width="930" height="12" rx="6" fill="#13364B"/>
        <rect y="26" width="620" height="12" rx="6" fill="#38BDF8"/>
      </g>
    </g>
  </g>
</svg>`
);

writeSlide(
  "grocery-api-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="gapiBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="60%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0A0F1D"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#gapiBg)"/>
  <g transform="translate(80, 50)">
    <rect width="210" height="30" rx="15" fill="#38BDF8" fill-opacity="0.2" stroke="#38BDF8" stroke-width="1"/>
    <text x="105" y="20" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">HIGH-THROUGHPUT ENGINE</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Grocery API Microservices</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Sub-50ms endpoint latency, Redis caching &amp; asynchronous webhook dispatching</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="600" height="460" rx="16" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
    <rect width="600" height="42" rx="16" fill="#1E293B"/>
    <text x="24" y="26" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">REST &amp; GRAPHQL ENDPOINT HEALTH MONITOR</text>
    <g transform="translate(24, 60)">
      <rect width="550" height="75" rx="8" fill="#1E293B"/>
      <text x="16" y="28" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">POST /api/v1/orders/checkout</text>
      <text x="16" y="52" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Latency: 28ms • Status 200 OK • Throughput: 1,200 req/min</text>
    </g>
    <g transform="translate(24, 150)">
      <rect width="550" height="75" rx="8" fill="#1E293B"/>
      <text x="16" y="28" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">GET /api/v1/catalog/inventory-sync</text>
      <text x="16" y="52" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Latency: 14ms (Redis Cache Hit 99.4%) • Status 200 OK</text>
    </g>
    <g transform="translate(24, 240)">
      <rect width="550" height="75" rx="8" fill="#1E293B"/>
      <text x="16" y="28" fill="#F59E0B" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">POST /api/v1/webhooks/rider-location</text>
      <text x="16" y="52" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Latency: 32ms • Queue: Zero backlog</text>
    </g>
    <g transform="translate(24, 330)">
      <rect width="550" height="85" rx="8" fill="#1E293B"/>
      <text x="16" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">System Availability: 99.99%</text>
      <text x="16" y="58" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="13">Zero downtime deployment with auto-scaling Kubernetes clusters</text>
    </g>
  </g>
  <g transform="translate(710, 160)">
    <rect width="410" height="460" rx="16" fill="#0A0F1D" stroke="#38BDF8" stroke-width="1.2"/>
    <rect width="410" height="42" rx="16" fill="#1E293B"/>
    <text x="24" y="26" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">ARCHITECTURAL STACK</text>
    <g transform="translate(24, 65)">
      <rect width="360" height="70" rx="8" fill="#1E293B"/>
      <text x="16" y="30" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">Node.js &amp; TypeScript Engine</text>
      <text x="16" y="50" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Strict type safety &amp; async event loop</text>
    </g>
    <g transform="translate(24, 150)">
      <rect width="360" height="70" rx="8" fill="#1E293B"/>
      <text x="16" y="30" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">PostgreSQL + Redis In-Memory</text>
      <text x="16" y="50" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">ACID transactions with microsecond cache</text>
    </g>
    <g transform="translate(24, 235)">
      <rect width="360" height="70" rx="8" fill="#1E293B"/>
      <text x="16" y="30" fill="#F59E0B" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">Kafka Event Streaming</text>
      <text x="16" y="50" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Reliable publish-subscribe messaging</text>
    </g>
    <g transform="translate(24, 320)">
      <rect width="360" height="70" rx="8" fill="#1E293B"/>
      <text x="16" y="30" fill="#8B5CF6" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">JWT &amp; Rate-Limited Auth</text>
      <text x="16" y="50" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Bank-grade enterprise security</text>
    </g>
  </g>
</svg>`
);

writeSlide(
  "takeaway-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="twBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D1204"/>
      <stop offset="60%" stop-color="#4A1E06"/>
      <stop offset="100%" stop-color="#1B0A02"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#twBg)"/>
  <g transform="translate(80, 50)">
    <rect width="220" height="30" rx="15" fill="#EA580C" fill-opacity="0.25" stroke="#FB923C" stroke-width="1"/>
    <text x="110" y="20" fill="#FB923C" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">COUNTER TOKEN DISPLAY</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Takeaway Billing &amp; Tokens</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Split-second counter checkout, token numbers, and pickup station dispatch</text>
  </g>
  <g transform="translate(80, 160)">
    <!-- Ready for Pickup Screen -->
    <rect width="500" height="450" rx="16" fill="#180C05" stroke="#EA580C" stroke-width="1.5"/>
    <rect width="500" height="46" rx="16" fill="#321609"/>
    <text x="24" y="28" fill="#FB923C" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">NOW SERVING / READY FOR PICKUP</text>
    <g transform="translate(24, 70)">
      <rect width="210" height="150" rx="12" fill="#321609" stroke="#10B981" stroke-width="2"/>
      <text x="105" y="45" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700" text-anchor="middle">TOKEN</text>
      <text x="105" y="115" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="64" font-weight="900" text-anchor="middle">48</text>
    </g>
    <g transform="translate(260, 70)">
      <rect width="210" height="150" rx="12" fill="#321609" stroke="#10B981" stroke-width="2"/>
      <text x="105" y="45" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700" text-anchor="middle">TOKEN</text>
      <text x="105" y="115" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="64" font-weight="900" text-anchor="middle">49</text>
    </g>
    <g transform="translate(24, 250)">
      <text x="0" y="25" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">PREPARING IN KITCHEN:</text>
      <text x="0" y="60" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">Tokens: 50, 51, 52, 53, 54</text>
    </g>
  </g>
  <g transform="translate(620, 160)">
    <!-- Thermal Receipt Preview -->
    <rect width="500" height="450" rx="16" fill="#180C05" stroke="#334155" stroke-width="1.2"/>
    <rect width="500" height="46" rx="16" fill="#321609"/>
    <text x="24" y="28" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">INSTANT THERMAL RECEIPT &amp; KOT</text>
    <g transform="translate(50, 70)">
      <rect width="400" height="340" rx="8" fill="#FFFDF8"/>
      <text x="200" y="40" fill="#000000" font-family="'Courier New', monospace" font-size="16" font-weight="700" text-anchor="middle">*** INWORA TAKEAWAY ***</text>
      <text x="200" y="65" fill="#555555" font-family="'Courier New', monospace" font-size="13" text-anchor="middle">Order Token #48</text>
      <line x1="20" y1="80" x2="380" y2="80" stroke="#000000" stroke-dasharray="4 4"/>
      <text x="30" y="115" fill="#000000" font-family="'Courier New', monospace" font-size="13">1x Chicken Dum Biryani</text>
      <text x="360" y="115" fill="#000000" font-family="'Courier New', monospace" font-size="13" text-anchor="end">220.00</text>
      <text x="30" y="145" fill="#000000" font-family="'Courier New', monospace" font-size="13">2x Butter Roti</text>
      <text x="360" y="145" fill="#000000" font-family="'Courier New', monospace" font-size="13" text-anchor="end">60.00</text>
      <text x="30" y="175" fill="#000000" font-family="'Courier New', monospace" font-size="13">1x Paneer Butter Masala</text>
      <text x="360" y="175" fill="#000000" font-family="'Courier New', monospace" font-size="13" text-anchor="end">180.00</text>
      <line x1="20" y1="200" x2="380" y2="200" stroke="#000000"/>
      <text x="30" y="235" fill="#000000" font-family="'Courier New', monospace" font-size="16" font-weight="700">TOTAL PAID (UPI)</text>
      <text x="360" y="235" fill="#000000" font-family="'Courier New', monospace" font-size="16" font-weight="700" text-anchor="end">₹ 460.00</text>
      <text x="200" y="280" fill="#555555" font-family="'Courier New', monospace" font-size="12" text-anchor="middle">Thank you! Please visit again.</text>
    </g>
  </g>
</svg>`
);

writeSlide(
  "grocery-website-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="gwBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#041E15"/>
      <stop offset="60%" stop-color="#0A3827"/>
      <stop offset="100%" stop-color="#02140D"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#gwBg)"/>
  <g transform="translate(80, 50)">
    <rect width="220" height="30" rx="15" fill="#10B981" fill-opacity="0.25" stroke="#34D399" stroke-width="1"/>
    <text x="110" y="20" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">E-COMMERCE STOREFRONT</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Fresh Grocery Online Store</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Curated produce bundles, smart search filtering, and seamless multi-device browsing</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="1040" height="460" rx="16" fill="#0A1D15" stroke="#10B981" stroke-width="1.2"/>
    <rect width="1040" height="46" rx="16" fill="#113324"/>
    <text x="30" y="28" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">SEASONAL PRODUCE &amp; PANTRY DEALS</text>
    <!-- Product Grid -->
    <g transform="translate(30, 70)">
      <rect width="220" height="340" rx="12" fill="#153E2C"/>
      <rect x="20" y="20" width="180" height="140" rx="8" fill="#1A4B36"/>
      <text x="110" y="100" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="36" text-anchor="middle">🍎</text>
      <text x="20" y="195" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">Royal Gala Apples</text>
      <text x="20" y="220" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">1kg Fresh Harvest</text>
      <text x="20" y="255" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="18" font-weight="800">₹ 180</text>
      <rect x="20" y="280" width="180" height="38" rx="8" fill="#10B981"/>
      <text x="110" y="304" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700" text-anchor="middle">+ Add to Cart</text>
    </g>
    <g transform="translate(280, 70)">
      <rect width="220" height="340" rx="12" fill="#153E2C"/>
      <rect x="20" y="20" width="180" height="140" rx="8" fill="#1A4B36"/>
      <text x="110" y="100" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="36" text-anchor="middle">🥦</text>
      <text x="20" y="195" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">Organic Broccoli</text>
      <text x="20" y="220" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">500g Farm Direct</text>
      <text x="20" y="255" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="18" font-weight="800">₹ 95</text>
      <rect x="20" y="280" width="180" height="38" rx="8" fill="#10B981"/>
      <text x="110" y="304" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700" text-anchor="middle">+ Add to Cart</text>
    </g>
    <g transform="translate(530, 70)">
      <rect width="220" height="340" rx="12" fill="#153E2C"/>
      <rect x="20" y="20" width="180" height="140" rx="8" fill="#1A4B36"/>
      <text x="110" y="100" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="36" text-anchor="middle">🥑</text>
      <text x="20" y="195" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">Hass Avocados</text>
      <text x="20" y="220" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">2 Pieces Imported</text>
      <text x="20" y="255" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="18" font-weight="800">₹ 210</text>
      <rect x="20" y="280" width="180" height="38" rx="8" fill="#10B981"/>
      <text x="110" y="304" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700" text-anchor="middle">+ Add to Cart</text>
    </g>
    <g transform="translate(780, 70)">
      <rect width="220" height="340" rx="12" fill="#153E2C"/>
      <rect x="20" y="20" width="180" height="140" rx="8" fill="#1A4B36"/>
      <text x="110" y="100" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="36" text-anchor="middle">🥛</text>
      <text x="20" y="195" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">A2 Desi Cow Milk</text>
      <text x="20" y="220" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">1L Glass Bottle</text>
      <text x="20" y="255" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="18" font-weight="800">₹ 85</text>
      <rect x="20" y="280" width="180" height="38" rx="8" fill="#10B981"/>
      <text x="110" y="304" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700" text-anchor="middle">+ Add to Cart</text>
    </g>
  </g>
</svg>`
);

// ─────────────────────────────────────────────────────────────────────────────
// 5. PRIYAM & SUBRA RESIDENCY
// ─────────────────────────────────────────────────────────────────────────────
writeSlide(
  "priyam-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="prBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#261002"/>
      <stop offset="60%" stop-color="#3D1B05"/>
      <stop offset="100%" stop-color="#140801"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#prBg)"/>
  <g transform="translate(80, 50)">
    <rect width="220" height="30" rx="15" fill="#D97706" fill-opacity="0.25" stroke="#FBBF24" stroke-width="1"/>
    <text x="110" y="20" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">DIGITAL MENU BOARD</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Priyam Street Food &amp; Chaat</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Dynamic LED menu display, fast-moving snack token ticketing, and counter audit</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="1040" height="460" rx="16" fill="#170A02" stroke="#D97706" stroke-width="1.5"/>
    <rect width="1040" height="46" rx="16" fill="#2E1405"/>
    <text x="30" y="28" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">LIVE CHAAT &amp; SNACKS SPECIALTIES</text>
    
    <g transform="translate(30, 70)">
      <rect width="470" height="100" rx="10" fill="#2B1406"/>
      <text x="24" y="35" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700">Special Pani Puri (6 Pcs)</text>
      <text x="24" y="60" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">Mint &amp; tangy tamarind water, spiced potato fill</text>
      <text x="430" y="45" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="20" font-weight="800" text-anchor="end">₹ 40</text>
    </g>
    <g transform="translate(540, 70)">
      <rect width="470" height="100" rx="10" fill="#2B1406"/>
      <text x="24" y="35" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700">Dahi Sev Puri (6 Pcs)</text>
      <text x="24" y="60" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">Crispy puris loaded with sweet yogurt &amp; sev</text>
      <text x="430" y="45" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="20" font-weight="800" text-anchor="end">₹ 60</text>
    </g>
    <g transform="translate(30, 190)">
      <rect width="470" height="100" rx="10" fill="#2B1406"/>
      <text x="24" y="35" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700">Pav Bhaji (Double Pav)</text>
      <text x="24" y="60" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">Buttery toasted buns with slow-simmered bhaji</text>
      <text x="430" y="45" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="20" font-weight="800" text-anchor="end">₹ 90</text>
    </g>
    <g transform="translate(540, 190)">
      <rect width="470" height="100" rx="10" fill="#2B1406"/>
      <text x="24" y="35" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700">Cheese Bhel Puri</text>
      <text x="24" y="60" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="13">Grated Amul cheese over crunchy bhel mixture</text>
      <text x="430" y="45" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="20" font-weight="800" text-anchor="end">₹ 75</text>
    </g>
    <g transform="translate(30, 310)">
      <rect width="980" height="110" rx="10" fill="#241005"/>
      <text x="24" y="35" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">Counter Performance: 450+ Daily Chaat Tokens Served</text>
      <text x="24" y="65" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="13">Instant UPI QR scanning &amp; token printing keeps queue time under 90 seconds</text>
    </g>
  </g>
</svg>`
);

writeSlide(
  "subra-residency-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="srBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081A24"/>
      <stop offset="60%" stop-color="#0E2D3E"/>
      <stop offset="100%" stop-color="#040F16"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#srBg)"/>
  <g transform="translate(80, 50)">
    <rect width="230" height="30" rx="15" fill="#0284C7" fill-opacity="0.25" stroke="#38BDF8" stroke-width="1"/>
    <text x="115" y="20" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">FRONT-DESK CHECK-IN ENGINE</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Subra Residency Hotel Management</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Room occupancy grid, instant guest check-in, Aadhaar verification &amp; checkout billing</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="1040" height="460" rx="16" fill="#071720" stroke="#0284C7" stroke-width="1.2"/>
    <rect width="1040" height="46" rx="16" fill="#0D2736"/>
    <text x="30" y="28" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">ROOM OCCUPANCY &amp; HOUSEKEEPING STATUS (32 ROOMS)</text>
    
    <!-- Floor 1 -->
    <g transform="translate(30, 70)">
      <text x="0" y="20" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">First Floor (Executive AC)</text>
      <g transform="translate(0, 35)">
        <rect width="180" height="70" rx="8" fill="#0F3348" stroke="#10B981" stroke-width="2"/>
        <text x="16" y="28" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Room 101</text>
        <text x="16" y="52" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12">OCCUPIED (Dr. Sen)</text>

        <rect x="200" width="180" height="70" rx="8" fill="#0F3348" stroke="#38BDF8" stroke-width="2"/>
        <text x="216" y="28" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Room 102</text>
        <text x="216" y="52" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="12">AVAILABLE (Clean)</text>

        <rect x="400" width="180" height="70" rx="8" fill="#0F3348" stroke="#10B981" stroke-width="2"/>
        <text x="416" y="28" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Room 103</text>
        <text x="416" y="52" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12">OCCUPIED (Mr. Rao)</text>

        <rect x="600" width="180" height="70" rx="8" fill="#0F3348" stroke="#F59E0B" stroke-width="2"/>
        <text x="616" y="28" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Room 104</text>
        <text x="616" y="52" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="12">HOUSEKEEPING</text>

        <rect x="800" width="180" height="70" rx="8" fill="#0F3348" stroke="#38BDF8" stroke-width="2"/>
        <text x="816" y="28" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Room 105</text>
        <text x="816" y="52" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="12">AVAILABLE (Clean)</text>
      </g>
    </g>

    <!-- Floor 2 -->
    <g transform="translate(30, 210)">
      <text x="0" y="20" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Second Floor (Deluxe Suite)</text>
      <g transform="translate(0, 35)">
        <rect width="180" height="70" rx="8" fill="#0F3348" stroke="#10B981" stroke-width="2"/>
        <text x="16" y="28" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Room 201</text>
        <text x="16" y="52" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12">OCCUPIED</text>

        <rect x="200" width="180" height="70" rx="8" fill="#0F3348" stroke="#10B981" stroke-width="2"/>
        <text x="216" y="28" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Room 202</text>
        <text x="216" y="52" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12">OCCUPIED</text>

        <rect x="400" width="180" height="70" rx="8" fill="#0F3348" stroke="#38BDF8" stroke-width="2"/>
        <text x="416" y="28" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Room 203</text>
        <text x="416" y="52" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="12">AVAILABLE</text>

        <rect x="600" width="180" height="70" rx="8" fill="#0F3348" stroke="#38BDF8" stroke-width="2"/>
        <text x="616" y="28" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Room 204</text>
        <text x="616" y="52" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="12">AVAILABLE</text>

        <rect x="800" width="180" height="70" rx="8" fill="#0F3348" stroke="#10B981" stroke-width="2"/>
        <text x="816" y="28" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Room 205</text>
        <text x="816" y="52" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12">OCCUPIED</text>
      </g>
    </g>

    <!-- Summary Stats -->
    <g transform="translate(30, 350)">
      <rect width="980" height="85" rx="8" fill="#0D2736"/>
      <text x="30" y="30" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">TODAY'S OCCUPANCY</text>
      <text x="30" y="62" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="24" font-weight="800">82% (26 Rooms Full)</text>
      <text x="450" y="30" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">ESTIMATED REVENUE</text>
      <text x="450" y="62" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="24" font-weight="800">₹ 58,400 Today</text>
    </g>
  </g>
</svg>`
);

// ─────────────────────────────────────────────────────────────────────────────
// 6. CORE BACK-OFFICE SUITE (Lead, Accounts, Hospital, Travel Budget, Scrom LMS)
// ─────────────────────────────────────────────────────────────────────────────
writeSlide(
  "lead-management-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="lmBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="60%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0B101E"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#lmBg)"/>
  <g transform="translate(80, 50)">
    <rect width="210" height="30" rx="15" fill="#38BDF8" fill-opacity="0.2" stroke="#38BDF8" stroke-width="1"/>
    <text x="105" y="20" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">LEAD QUALIFICATION</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Lead Management System Funnel</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Multi-source inquiry aggregation, lead scoring, and automated sales rep assignment</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="1040" height="460" rx="16" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
    <rect width="1040" height="46" rx="16" fill="#1E293B"/>
    <text x="30" y="28" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">INBOUND CONVERSION PIPELINE &amp; SCORING MATRIX</text>
    
    <g transform="translate(30, 70)">
      <rect width="300" height="150" rx="10" fill="#1E293B" stroke="#38BDF8" stroke-width="1.2"/>
      <text x="20" y="32" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">TOP LEAD SOURCES</text>
      <text x="20" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">• Google Ads (42%)</text>
      <text x="20" y="90" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">• Organic Website (31%)</text>
      <text x="20" y="115" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">• Referrals &amp; B2B (27%)</text>
    </g>
    <g transform="translate(360, 70)">
      <rect width="300" height="150" rx="10" fill="#1E293B" stroke="#10B981" stroke-width="1.2"/>
      <text x="20" y="32" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">QUALIFIED OPPORTUNITIES</text>
      <text x="20" y="75" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="36" font-weight="800">268 Leads</text>
      <text x="20" y="115" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Score &gt; 75 points (Ready for Pitch)</text>
    </g>
    <g transform="translate(690, 70)">
      <rect width="320" height="150" rx="10" fill="#1E293B" stroke="#F59E0B" stroke-width="1.2"/>
      <text x="20" y="32" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">AVERAGE FIRST RESPONSE</text>
      <text x="20" y="75" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="36" font-weight="800">8.5 Mins</text>
      <text x="20" y="115" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Automated SMS &amp; WhatsApp callback</text>
    </g>

    <g transform="translate(30, 245)">
      <rect width="980" height="180" rx="10" fill="#1E293B"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Recent Lead Actions &amp; Representative Velocity</text>
      <g transform="translate(24, 55)">
        <text x="0" y="20" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">Apollo Infra Build</text>
        <text x="220" y="20" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">Assigned to: Arjun K.</text>
        <text x="500" y="20" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">Status: Commercial Meeting Confirmed</text>
        <text x="930" y="20" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12" text-anchor="end">4m ago</text>
      </g>
      <g transform="translate(24, 100)">
        <text x="0" y="20" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">Zenith Retailers</text>
        <text x="220" y="20" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">Assigned to: Maya S.</text>
        <text x="500" y="20" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">Status: Proposal Under Review</text>
        <text x="930" y="20" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12" text-anchor="end">22m ago</text>
      </g>
    </g>
  </g>
</svg>`
);

writeSlide(
  "accounts-management-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="amBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0C1E18"/>
      <stop offset="60%" stop-color="#14362B"/>
      <stop offset="100%" stop-color="#081410"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#amBg)"/>
  <g transform="translate(80, 50)">
    <rect width="220" height="30" rx="15" fill="#10B981" fill-opacity="0.25" stroke="#34D399" stroke-width="1"/>
    <text x="110" y="20" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">FINANCIAL LEDGER &amp; GST</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Accounts Management System</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Automated double-entry general ledger, GST filing reconciliation &amp; balance sheets</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="1040" height="460" rx="16" fill="#0A1813" stroke="#10B981" stroke-width="1.2"/>
    <rect width="1040" height="46" rx="16" fill="#133026"/>
    <text x="30" y="28" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">GENERAL LEDGER &amp; TAX COMPLIANCE SUMMARY</text>
    
    <g transform="translate(30, 70)">
      <rect width="300" height="130" rx="10" fill="#123026"/>
      <text x="20" y="32" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">TOTAL RECEIVABLES (CURRENT)</text>
      <text x="20" y="75" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="30" font-weight="800">₹ 24,18,500</text>
      <text x="20" y="105" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12">92% within 30-day term</text>
    </g>
    <g transform="translate(370, 70)">
      <rect width="300" height="130" rx="10" fill="#123026"/>
      <text x="20" y="32" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">VENDOR PAYABLES (OUTSTANDING)</text>
      <text x="20" y="75" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="30" font-weight="800">₹ 11,42,000</text>
      <text x="20" y="105" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="12">Scheduled across 8 vendors</text>
    </g>
    <g transform="translate(710, 70)">
      <rect width="300" height="130" rx="10" fill="#123026"/>
      <text x="20" y="32" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">GST INPUT TAX CREDIT (GSTR-2B)</text>
      <text x="20" y="75" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="30" font-weight="800">₹ 3,85,600</text>
      <text x="20" y="105" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="12">100% matched &amp; validated</text>
    </g>

    <g transform="translate(30, 225)">
      <rect width="980" height="200" rx="10" fill="#102B22"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Double-Entry Trial Balance Verification</text>
      <g transform="translate(24, 60)">
        <text x="0" y="16" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">Debit Turnover: ₹ 1,48,20,000</text>
        <text x="350" y="16" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">Credit Turnover: ₹ 1,48,20,000</text>
        <rect x="750" y="-3" width="160" height="28" rx="6" fill="#10B981" fill-opacity="0.3"/>
        <text x="830" y="16" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700" text-anchor="middle">PERFECT BALANCE ✓</text>
      </g>
      <g transform="translate(24, 110)">
        <rect width="932" height="60" rx="8" fill="#15362B"/>
        <text x="20" y="35" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">Audit-Ready Financials: Instant export to Tally XML, Excel, and PDF balance sheets</text>
      </g>
    </g>
  </g>
</svg>`
);

writeSlide(
  "hospital-management-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="hmBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#051B2E"/>
      <stop offset="60%" stop-color="#0A3254"/>
      <stop offset="100%" stop-color="#03121F"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#hmBg)"/>
  <g transform="translate(80, 50)">
    <rect width="210" height="30" rx="15" fill="#0284C7" fill-opacity="0.25" stroke="#38BDF8" stroke-width="1"/>
    <text x="105" y="20" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">CLINICAL OPD WORKFLOW</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Hospital Management Suite</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Electronic medical records (EMR), doctor queue management, bed occupancy &amp; pharmacy</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="1040" height="460" rx="16" fill="#081E33" stroke="#0284C7" stroke-width="1.2"/>
    <rect width="1040" height="46" rx="16" fill="#0F2B48"/>
    <text x="30" y="28" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">OUTPATIENT CLINIC QUEUE &amp; DOCTOR SCHEDULES</text>
    
    <g transform="translate(30, 70)">
      <rect width="470" height="150" rx="10" fill="#123354" stroke="#38BDF8" stroke-width="1"/>
      <text x="20" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700">Dr. Ramesh V. (Cardiology)</text>
      <text x="20" y="55" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">Status: In Consultation (Token #14)</text>
      <text x="20" y="85" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Next Patient: S. Meenakshi (Token #15)</text>
      <text x="20" y="110" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Waiting in OPD Lounge: 6 patients</text>
    </g>
    <g transform="translate(540, 70)">
      <rect width="470" height="150" rx="10" fill="#123354" stroke="#10B981" stroke-width="1"/>
      <text x="20" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700">Dr. Ananya R. (Pediatrics)</text>
      <text x="20" y="55" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600">Status: In Consultation (Token #22)</text>
      <text x="20" y="85" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Next Patient: Master Harish (Token #23)</text>
      <text x="20" y="110" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">Waiting in OPD Lounge: 4 patients</text>
    </g>

    <g transform="translate(30, 245)">
      <rect width="980" height="180" rx="10" fill="#0D2742"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Hospital Bed Occupancy &amp; Emergency Census</text>
      <g transform="translate(24, 60)">
        <rect width="210" height="90" rx="8" fill="#14365A"/>
        <text x="16" y="28" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">ICU BEDS OCCUPIED</text>
        <text x="16" y="62" fill="#EF4444" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">18 / 20</text>
      </g>
      <g transform="translate(260, 60)">
        <rect width="210" height="90" rx="8" fill="#14365A"/>
        <text x="16" y="28" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">GENERAL WARD BEDS</text>
        <text x="16" y="62" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">64 / 80</text>
      </g>
      <g transform="translate(500, 60)">
        <rect width="210" height="90" rx="8" fill="#14365A"/>
        <text x="16" y="28" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">OPERATION THEATRES</text>
        <text x="16" y="62" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">4 / 5 Active</text>
      </g>
      <g transform="translate(740, 60)">
        <rect width="210" height="90" rx="8" fill="#14365A"/>
        <text x="16" y="28" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">PHARMACY DISPATCHES</text>
        <text x="16" y="62" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">320 Today</text>
      </g>
    </g>
  </g>
</svg>`
);

writeSlide(
  "travel-budget-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="tbBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#061B2B"/>
      <stop offset="60%" stop-color="#0C3454"/>
      <stop offset="100%" stop-color="#04121E"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#tbBg)"/>
  <g transform="translate(80, 50)">
    <rect width="220" height="30" rx="15" fill="#0284C7" fill-opacity="0.25" stroke="#38BDF8" stroke-width="1"/>
    <text x="110" y="20" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">EXPENSE BREAKDOWN</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Travel Budget Application</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Multi-currency trip wallets, real-time receipt scanning &amp; split-bill expense reports</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="1040" height="460" rx="16" fill="#081E31" stroke="#0284C7" stroke-width="1.2"/>
    <rect width="1040" height="46" rx="16" fill="#0F2E4A"/>
    <text x="30" y="28" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">TRIP ITINERARY BUDGET: SOUTHEAST ASIA TOUR 2026</text>
    
    <g transform="translate(30, 70)">
      <rect width="300" height="130" rx="10" fill="#133654"/>
      <text x="20" y="32" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">TOTAL ALLOCATED BUDGET</text>
      <text x="20" y="75" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="32" font-weight="800">₹ 2,50,000</text>
      <text x="20" y="105" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="12">Flights, Stay, Transit &amp; Dining</text>
    </g>
    <g transform="translate(370, 70)">
      <rect width="300" height="130" rx="10" fill="#133654"/>
      <text x="20" y="32" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">ACTUAL SPENT TO DATE</text>
      <text x="20" y="75" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="32" font-weight="800">₹ 1,62,400</text>
      <text x="20" y="105" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12">65% of budget used (On track)</text>
    </g>
    <g transform="translate(710, 70)">
      <rect width="300" height="130" rx="10" fill="#133654"/>
      <text x="20" y="32" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12">SURPLUS WALLET</text>
      <text x="20" y="75" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="32" font-weight="800">₹ 87,600</text>
      <text x="20" y="105" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="12">Available for remaining 4 days</text>
    </g>

    <g transform="translate(30, 225)">
      <rect width="980" height="200" rx="10" fill="#0C263D"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Category Spending Distribution</text>
      
      <g transform="translate(24, 60)">
        <text x="0" y="16" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">Accommodations &amp; Resorts (₹ 82,000)</text>
        <rect y="26" width="930" height="12" rx="6" fill="#143755"/>
        <rect y="26" width="480" height="12" rx="6" fill="#38BDF8"/>
      </g>
      <g transform="translate(24, 120)">
        <text x="0" y="16" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">Dining &amp; Local Cuisine (₹ 45,200)</text>
        <rect y="26" width="930" height="12" rx="6" fill="#143755"/>
        <rect y="26" width="280" height="12" rx="6" fill="#34D399"/>
      </g>
    </g>
  </g>
</svg>`
);

writeSlide(
  "scrom-lms-slide2.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="scBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E1726"/>
      <stop offset="60%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0A0F1A"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#scBg)"/>
  <g transform="translate(80, 50)">
    <rect width="220" height="30" rx="15" fill="#6366F1" fill-opacity="0.25" stroke="#818CF8" stroke-width="1"/>
    <text x="110" y="20" fill="#818CF8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">SCORM 1.2 / 2004 ENGINE</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">SCROM LMS Learning Platform</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Interactive course player, bookmarking state, automated quiz scoring &amp; certificates</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="680" height="460" rx="16" fill="#0A0E1A" stroke="#6366F1" stroke-width="1.2"/>
    <rect width="680" height="46" rx="16" fill="#182033"/>
    <text x="24" y="28" fill="#818CF8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">COURSE PLAYER: ADVANCED INDUSTRIAL SAFETY (MODULE 4)</text>
    
    <g transform="translate(24, 70)">
      <rect width="632" height="240" rx="10" fill="#121828"/>
      <circle cx="316" cy="110" r="30" fill="#6366F1"/>
      <polygon points="310,95 330,110 310,125" fill="#FFFFFF"/>
      <text x="316" y="165" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700" text-anchor="middle">Hazard Identification &amp; Emergency Protocols</text>
      <text x="316" y="190" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12" text-anchor="middle">18:42 / 24:00 • Interactive SCORM Checkpoint Ready</text>
    </g>

    <g transform="translate(24, 335)">
      <text x="0" y="16" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">Course Completion Progress: 75%</text>
      <rect y="26" width="632" height="12" rx="6" fill="#1E293B"/>
      <rect y="26" width="474" height="12" rx="6" fill="#6366F1"/>
      <text x="0" y="60" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12">✓ CMI Data State: Synchronized to LMS cloud</text>
    </g>
  </g>

  <g transform="translate(790, 160)">
    <rect width="330" height="460" rx="16" fill="#0A0E1A" stroke="#334155" stroke-width="1.2"/>
    <rect width="330" height="46" rx="16" fill="#182033"/>
    <text x="20" y="28" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700">STUDENT ASSESSMENT</text>
    <g transform="translate(20, 70)">
      <rect width="290" height="100" rx="8" fill="#141B2D"/>
      <text x="16" y="30" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">QUIZ ATTEMPTS</text>
      <text x="16" y="65" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">94% Pass</text>
    </g>
    <g transform="translate(20, 185)">
      <rect width="290" height="100" rx="8" fill="#141B2D"/>
      <text x="16" y="30" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">CERTIFICATES ISSUED</text>
      <text x="16" y="65" fill="#818CF8" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">1,420</text>
    </g>
    <g transform="translate(20, 300)">
      <rect width="290" height="110" rx="8" fill="#141B2D"/>
      <text x="16" y="30" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="11">COMPLIANCE REPORT</text>
      <text x="16" y="55" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="12">OSHA &amp; ISO 9001 audit ready</text>
      <text x="16" y="80" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12">Automated HR export</text>
    </g>
  </g>
</svg>`
);

console.log("All additional high-fidelity vector slides successfully generated!");
