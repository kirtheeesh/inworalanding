import fs from "fs";
import path from "path";

const targetDirs = [
  path.resolve("frontend/public/assets/projects"),
  path.resolve("backend/uploads"),
];

function writeSlide(filename, svgContent) {
  for (const dir of targetDirs) {
    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, svgContent.trim());
  }
  console.log(`Generated: ${filename}`);
}

// 1. BALAJI JEWELLERS - Slide 3: Hallmark 916 Purity & Bridal Catalogue
writeSlide(
  "balaji-jewellers-slide3.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bj3Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#140802"/>
      <stop offset="60%" stop-color="#2D1205"/>
      <stop offset="100%" stop-color="#0F0501"/>
    </linearGradient>
    <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="50%" stop-color="#FDE047"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bj3Bg)"/>
  <g transform="translate(80, 50)">
    <rect width="230" height="30" rx="15" fill="#D97706" fill-opacity="0.25" stroke="#FBBF24" stroke-width="1"/>
    <text x="115" y="20" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">PURITY &amp; CRAFTSMANSHIP</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Balaji Jewellers Hallmark Heritage</text>
    <text x="0" y="92" fill="#D4AF37" font-family="'Montserrat', sans-serif" font-size="14">100% BIS 916 Hallmark certification, antique temple jewellery &amp; custom bridal suites</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="1040" height="460" rx="16" fill="#1C0C04" stroke="#D97706" stroke-width="1.2"/>
    <rect width="1040" height="46" rx="16" fill="#2E1408"/>
    <text x="30" y="28" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">EXCLUSIVE BRIDAL COLLECTIONS &amp; PURITY VERIFICATION</text>
    <g transform="translate(30, 70)">
      <rect width="300" height="340" rx="12" fill="#291206"/>
      <circle cx="150" cy="80" r="45" fill="#D97706" fill-opacity="0.2"/>
      <text x="150" y="90" fill="#FDE047" font-family="'Montserrat', sans-serif" font-size="36" text-anchor="middle">👑</text>
      <text x="150" y="160" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="18" font-weight="700" text-anchor="middle">Royal Heritage Choker</text>
      <text x="150" y="190" fill="#D4AF37" font-family="'Montserrat', sans-serif" font-size="13" text-anchor="middle">22K Antique Yellow Gold</text>
      <text x="150" y="220" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12" text-anchor="middle">Weight: 68.45g • Uncut Rubies</text>
      <rect x="50" y="260" width="200" height="40" rx="8" fill="url(#goldGlow)"/>
      <text x="150" y="285" fill="#1C0C04" font-family="'Montserrat', sans-serif" font-size="13" font-weight="800" text-anchor="middle">View Catalogue</text>
    </g>
    <g transform="translate(370, 70)">
      <rect width="300" height="340" rx="12" fill="#291206"/>
      <circle cx="150" cy="80" r="45" fill="#D97706" fill-opacity="0.2"/>
      <text x="150" y="90" fill="#FDE047" font-family="'Montserrat', sans-serif" font-size="36" text-anchor="middle">✨</text>
      <text x="150" y="160" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="18" font-weight="700" text-anchor="middle">Temple Kasu Mala</text>
      <text x="150" y="190" fill="#D4AF37" font-family="'Montserrat', sans-serif" font-size="13" text-anchor="middle">Laxmi Coin Classic Setting</text>
      <text x="150" y="220" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12" text-anchor="middle">Weight: 84.10g • Handcrafted</text>
      <rect x="50" y="260" width="200" height="40" rx="8" fill="url(#goldGlow)"/>
      <text x="150" y="285" fill="#1C0C04" font-family="'Montserrat', sans-serif" font-size="13" font-weight="800" text-anchor="middle">View Catalogue</text>
    </g>
    <g transform="translate(710, 70)">
      <rect width="300" height="340" rx="12" fill="#291206"/>
      <circle cx="150" cy="80" r="45" fill="#D97706" fill-opacity="0.2"/>
      <text x="150" y="90" fill="#FDE047" font-family="'Montserrat', sans-serif" font-size="36" text-anchor="middle">💎</text>
      <text x="150" y="160" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="18" font-weight="700" text-anchor="middle">Solitaire Bridal Jhumkas</text>
      <text x="150" y="190" fill="#D4AF37" font-family="'Montserrat', sans-serif" font-size="13" text-anchor="middle">VVS Diamond &amp; South Sea Pearl</text>
      <text x="150" y="220" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="12" text-anchor="middle">Certified IGI Clarity</text>
      <rect x="50" y="260" width="200" height="40" rx="8" fill="url(#goldGlow)"/>
      <text x="150" y="285" fill="#1C0C04" font-family="'Montserrat', sans-serif" font-size="13" font-weight="800" text-anchor="middle">View Catalogue</text>
    </g>
  </g>
</svg>`
);

// 2. WALLMARK - Slide 3: Structural Blueprint & Project Specification
writeSlide(
  "wallmark-slide3.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="wm3Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#091422"/>
      <stop offset="60%" stop-color="#142842"/>
      <stop offset="100%" stop-color="#060E18"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#wm3Bg)"/>
  <g transform="translate(80, 50)">
    <rect width="230" height="30" rx="15" fill="#0284C7" fill-opacity="0.25" stroke="#38BDF8" stroke-width="1"/>
    <text x="115" y="20" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">ARCHITECTURAL EXCELLENCE</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Wallmark Structural Portfolio</text>
    <text x="0" y="92" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="14">Commercial grade curtain wall facades, composite aluminum cladding &amp; glazing systems</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="1040" height="460" rx="16" fill="#0A1828" stroke="#0284C7" stroke-width="1.2"/>
    <rect width="1040" height="46" rx="16" fill="#112B45"/>
    <text x="30" y="28" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">TECHNICAL FACADE SPECIFICATIONS &amp; COMPLIANCE</text>
    <g transform="translate(30, 70)">
      <rect width="470" height="150" rx="10" fill="#163454"/>
      <text x="24" y="32" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Unitized Curtain Wall Systems</text>
      <text x="24" y="60" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">• Double-glazed low-E thermal acoustic insulation</text>
      <text x="24" y="85" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">• Wind load resistance up to 3.5 kPa</text>
      <text x="24" y="110" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">• Seismic movement expansion joints integrated</text>
    </g>
    <g transform="translate(540, 70)">
      <rect width="470" height="150" rx="10" fill="#163454"/>
      <text x="24" y="32" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700">Commercial Landmark Projects</text>
      <text x="24" y="60" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">• Olympia Tech Park IT Tower (120,000 sq ft)</text>
      <text x="24" y="85" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">• Nexus Horizon Corporate Headquarters</text>
      <text x="24" y="110" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="13">• Grand Sovereign Commercial Mall Atrium</text>
    </g>
    <g transform="translate(30, 245)">
      <rect width="980" height="180" rx="10" fill="#0E2338"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">Engineering Accreditations &amp; Durability Warranties</text>
      <g transform="translate(24, 60)">
        <rect width="210" height="90" rx="8" fill="#16385A"/>
        <text x="16" y="28" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">FIRE RATING</text>
        <text x="16" y="62" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="24" font-weight="800">Class A1 Non-Comb</text>
      </g>
      <g transform="translate(260, 60)">
        <rect width="210" height="90" rx="8" fill="#16385A"/>
        <text x="16" y="28" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">STRUCTURAL WARRANTY</text>
        <text x="16" y="62" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="24" font-weight="800">25 Years</text>
      </g>
      <g transform="translate(500, 60)">
        <rect width="210" height="90" rx="8" fill="#16385A"/>
        <text x="16" y="28" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">LEED CONTRIBUTION</text>
        <text x="16" y="62" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="24" font-weight="800">Platinum Tier</text>
      </g>
      <g transform="translate(740, 60)">
        <rect width="210" height="90" rx="8" fill="#16385A"/>
        <text x="16" y="28" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11">INSTALLED AREA</text>
        <text x="16" y="62" fill="#A78BFA" font-family="'Montserrat', sans-serif" font-size="24" font-weight="800">1.2M+ Sq Ft</text>
      </g>
    </g>
  </g>
</svg>`
);

// 3. THAMBALAM - Slide 3: Custom Bulk Gift Builder
writeSlide(
  "thambalam-slide3.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="th3Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E0610"/>
      <stop offset="60%" stop-color="#3A0D20"/>
      <stop offset="100%" stop-color="#14040B"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#th3Bg)"/>
  <g transform="translate(80, 50)">
    <rect width="230" height="30" rx="15" fill="#E11D48" fill-opacity="0.25" stroke="#FB7185" stroke-width="1"/>
    <text x="115" y="20" fill="#FB7185" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">BESPOKE RETURN GIFTS</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Thambalam Wedding Gift Builder</text>
    <text x="0" y="92" fill="#FCA5A5" font-family="'Montserrat', sans-serif" font-size="14">Personalized couple monograms, handcrafted raw-silk pouches &amp; bulk wedding order dispatch</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="1040" height="460" rx="16" fill="#1A0710" stroke="#E11D48" stroke-width="1.2"/>
    <rect width="1040" height="46" rx="16" fill="#2E0E1E"/>
    <text x="30" y="28" fill="#FB7185" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">PERSONALIZED WEDDING FAVOUR SELECTIONS</text>
    <g transform="translate(30, 70)">
      <rect width="470" height="150" rx="10" fill="#3D1227"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700">Raw Silk Zari Potli (Pack of 500)</text>
      <text x="24" y="60" fill="#FCA5A5" font-family="'Montserrat', sans-serif" font-size="13">• Deep crimson &amp; antique gold threadwork</text>
      <text x="24" y="85" fill="#FCA5A5" font-family="'Montserrat', sans-serif" font-size="13">• Customized couple initials monogram embroidery</text>
      <text x="24" y="110" fill="#FCA5A5" font-family="'Montserrat', sans-serif" font-size="13">• Premium drawstring tassels with brass bells</text>
    </g>
    <g transform="translate(540, 70)">
      <rect width="470" height="150" rx="10" fill="#3D1227"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700">Brass Diya &amp; Kumkum Thambalam Box</text>
      <text x="24" y="60" fill="#FCA5A5" font-family="'Montserrat', sans-serif" font-size="13">• Solid hand-carved peacock brass deepam</text>
      <text x="24" y="85" fill="#FCA5A5" font-family="'Montserrat', sans-serif" font-size="13">• Auspicious turmeric &amp; kumkum compartments</text>
      <text x="24" y="110" fill="#FCA5A5" font-family="'Montserrat', sans-serif" font-size="13">• Velvet-lined presentation gift case</text>
    </g>
    <g transform="translate(30, 245)">
      <rect width="980" height="180" rx="10" fill="#260A18"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">Bulk Wedding Production Metrics</text>
      <g transform="translate(24, 60)">
        <rect width="210" height="90" rx="8" fill="#380F24"/>
        <text x="16" y="28" fill="#FCA5A5" font-family="'Montserrat', sans-serif" font-size="11">WEDDINGS SERVED</text>
        <text x="16" y="62" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">850+ Events</text>
      </g>
      <g transform="translate(260, 60)">
        <rect width="210" height="90" rx="8" fill="#380F24"/>
        <text x="16" y="28" fill="#FCA5A5" font-family="'Montserrat', sans-serif" font-size="11">DISPATCH TURNAROUND</text>
        <text x="16" y="62" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">5-7 Days</text>
      </g>
      <g transform="translate(500, 60)">
        <rect width="210" height="90" rx="8" fill="#380F24"/>
        <text x="16" y="28" fill="#FCA5A5" font-family="'Montserrat', sans-serif" font-size="11">CLIENT SATISFACTION</text>
        <text x="16" y="62" fill="#FB7185" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">4.96 ★</text>
      </g>
      <g transform="translate(740, 60)">
        <rect width="210" height="90" rx="8" fill="#380F24"/>
        <text x="16" y="28" fill="#FCA5A5" font-family="'Montserrat', sans-serif" font-size="11">PAN-INDIA SHIPPING</text>
        <text x="16" y="62" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">100% Insured</text>
      </g>
    </g>
  </g>
</svg>`
);

// 4. CHAI-FI - Slide 3: Quick Touch POS & Recipe Stock Deduction
writeSlide(
  "chai-fi-slide3.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="cf3Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A0D03"/>
      <stop offset="60%" stop-color="#331A06"/>
      <stop offset="100%" stop-color="#0E0701"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#cf3Bg)"/>
  <g transform="translate(80, 50)">
    <rect width="230" height="30" rx="15" fill="#D97706" fill-opacity="0.25" stroke="#FBBF24" stroke-width="1"/>
    <text x="115" y="20" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">CAFÉ POS TOUCH TERMINAL</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Chai-Fi Smart Café Billing</text>
    <text x="0" y="92" fill="#FDE68A" font-family="'Montserrat', sans-serif" font-size="14">Split-second tea brewing orders, tea recipe ingredient deduction &amp; loyalty stamps</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="1040" height="460" rx="16" fill="#140A02" stroke="#D97706" stroke-width="1.2"/>
    <rect width="1040" height="46" rx="16" fill="#281505"/>
    <text x="30" y="28" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">TOUCH POS MENU GRID &amp; RECIPE INGREDIENT DEDUCTIONS</text>
    <g transform="translate(30, 70)">
      <rect width="220" height="150" rx="10" fill="#2E1807" stroke="#FBBF24" stroke-width="1"/>
      <text x="110" y="45" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700" text-anchor="middle">Special Masala Chai</text>
      <text x="110" y="75" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="24" font-weight="800" text-anchor="middle">₹ 25</text>
      <text x="110" y="105" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11" text-anchor="middle">Milk: 80ml • CTC: 4g • Spices</text>
      <text x="110" y="130" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12" font-weight="600" text-anchor="middle">In Stock (140 cups)</text>
    </g>
    <g transform="translate(280, 70)">
      <rect width="220" height="150" rx="10" fill="#2E1807"/>
      <text x="110" y="45" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700" text-anchor="middle">Ginger Cardamom Chai</text>
      <text x="110" y="75" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="24" font-weight="800" text-anchor="middle">₹ 30</text>
      <text x="110" y="105" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11" text-anchor="middle">Fresh crushed adrak &amp; elaichi</text>
      <text x="110" y="130" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12" font-weight="600" text-anchor="middle">In Stock (95 cups)</text>
    </g>
    <g transform="translate(530, 70)">
      <rect width="220" height="150" rx="10" fill="#2E1807"/>
      <text x="110" y="45" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700" text-anchor="middle">Bun Maska (Irani Style)</text>
      <text x="110" y="75" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="24" font-weight="800" text-anchor="middle">₹ 45</text>
      <text x="110" y="105" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11" text-anchor="middle">Warm sweet bun with Amul dollop</text>
      <text x="110" y="130" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12" font-weight="600" text-anchor="middle">In Stock (40 units)</text>
    </g>
    <g transform="translate(780, 70)">
      <rect width="220" height="150" rx="10" fill="#2E1807"/>
      <text x="110" y="45" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700" text-anchor="middle">Osmania Biscuits (4 Pcs)</text>
      <text x="110" y="75" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="24" font-weight="800" text-anchor="middle">₹ 20</text>
      <text x="110" y="105" fill="#94A3B8" font-family="'Montserrat', sans-serif" font-size="11" text-anchor="middle">Crispy butter tea dunkers</text>
      <text x="110" y="130" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="12" font-weight="600" text-anchor="middle">In Stock (80 packs)</text>
    </g>
    <g transform="translate(30, 245)">
      <rect width="980" height="180" rx="10" fill="#1C0E03"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">Daily Counter Turnover: 1,200+ Cups of Chai Brewed</text>
      <g transform="translate(24, 60)">
        <rect width="290" height="90" rx="8" fill="#2D1705"/>
        <text x="16" y="28" fill="#FDE68A" font-family="'Montserrat', sans-serif" font-size="11">BILLING VELOCITY</text>
        <text x="16" y="62" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="24" font-weight="800">4.5 Seconds / Bill</text>
      </g>
      <g transform="translate(330, 60)">
        <rect width="290" height="90" rx="8" fill="#2D1705"/>
        <text x="16" y="28" fill="#FDE68A" font-family="'Montserrat', sans-serif" font-size="11">REPEAT LOYALTY USERS</text>
        <text x="16" y="62" fill="#38BDF8" font-family="'Montserrat', sans-serif" font-size="24" font-weight="800">68% Regulars</text>
      </g>
      <g transform="translate(640, 60)">
        <rect width="315" height="90" rx="8" fill="#2D1705"/>
        <text x="16" y="28" fill="#FDE68A" font-family="'Montserrat', sans-serif" font-size="11">MILK &amp; LEAF DEDUCTION</text>
        <text x="16" y="62" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="24" font-weight="800">Zero Inventory Drift</text>
      </g>
    </g>
  </g>
</svg>`
);

// 5. WORA-STAYZ - Slide 3: Booking Engine & Tariff Availability Grid
writeSlide(
  "wora-stayz-slide3.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="ws3Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#041E1A"/>
      <stop offset="60%" stop-color="#0B3931"/>
      <stop offset="100%" stop-color="#021411"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#ws3Bg)"/>
  <g transform="translate(80, 50)">
    <rect width="230" height="30" rx="15" fill="#0D9488" fill-opacity="0.25" stroke="#2DD4BF" stroke-width="1"/>
    <text x="115" y="20" fill="#2DD4BF" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="1.2" text-anchor="middle">LUXURY VILLA RESERVATIONS</text>
    <text x="0" y="65" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="34" font-weight="800">Wora Stayz Availability Engine</text>
    <text x="0" y="92" fill="#99F6E4" font-family="'Montserrat', sans-serif" font-size="14">Interactive booking calendar, private infinity pool villas, and automated guest concierge</text>
  </g>
  <g transform="translate(80, 160)">
    <rect width="1040" height="460" rx="16" fill="#061C18" stroke="#0D9488" stroke-width="1.2"/>
    <rect width="1040" height="46" rx="16" fill="#0E2C26"/>
    <text x="30" y="28" fill="#2DD4BF" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700">VILLA AVAILABILITY CALENDAR &amp; TARIFF MANAGEMENT</text>
    <g transform="translate(30, 70)">
      <rect width="470" height="150" rx="10" fill="#133D35"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700">Infinity Cliffside Villa (Suite 401)</text>
      <text x="24" y="60" fill="#99F6E4" font-family="'Montserrat', sans-serif" font-size="13">• Private heated infinity plunge pool &amp; deck</text>
      <text x="24" y="85" fill="#99F6E4" font-family="'Montserrat', sans-serif" font-size="13">• Panoramic sunset valley view, king plush bed</text>
      <text x="24" y="115" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="18" font-weight="800">₹ 14,500 / Night</text>
      <rect x="330" y="95" width="120" height="36" rx="6" fill="#0D9488"/>
      <text x="390" y="118" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700" text-anchor="middle">Book Suite</text>
    </g>
    <g transform="translate(540, 70)">
      <rect width="470" height="150" rx="10" fill="#133D35"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700">Tropical Garden Estate (4 BHK)</text>
      <text x="24" y="60" fill="#99F6E4" font-family="'Montserrat', sans-serif" font-size="13">• Private lawn, outdoor barbecue &amp; jacuzzi</text>
      <text x="24" y="85" fill="#99F6E4" font-family="'Montserrat', sans-serif" font-size="13">• Accommodates up to 10 guests with chef service</text>
      <text x="24" y="115" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="18" font-weight="800">₹ 28,000 / Night</text>
      <rect x="330" y="95" width="120" height="36" rx="6" fill="#0D9488"/>
      <text x="390" y="118" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700" text-anchor="middle">Book Suite</text>
    </g>
    <g transform="translate(30, 245)">
      <rect width="980" height="180" rx="10" fill="#0A241F"/>
      <text x="24" y="32" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="15" font-weight="700">Guest Hospitality &amp; Experience Ratings</text>
      <g transform="translate(24, 60)">
        <rect width="210" height="90" rx="8" fill="#133E35"/>
        <text x="16" y="28" fill="#99F6E4" font-family="'Montserrat', sans-serif" font-size="11">AVERAGE GUEST RATING</text>
        <text x="16" y="62" fill="#FBBF24" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">4.92 ★</text>
      </g>
      <g transform="translate(260, 60)">
        <rect width="210" height="90" rx="8" fill="#133E35"/>
        <text x="16" y="28" fill="#99F6E4" font-family="'Montserrat', sans-serif" font-size="11">WEEKEND OCCUPANCY</text>
        <text x="16" y="62" fill="#34D399" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">96% Sold</text>
      </g>
      <g transform="translate(500, 60)">
        <rect width="210" height="90" rx="8" fill="#133E35"/>
        <text x="16" y="28" fill="#99F6E4" font-family="'Montserrat', sans-serif" font-size="11">INSTANT CONFIRMATION</text>
        <text x="16" y="62" fill="#2DD4BF" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">WhatsApp Key</text>
      </g>
      <g transform="translate(740, 60)">
        <rect width="210" height="90" rx="8" fill="#133E35"/>
        <text x="16" y="28" fill="#99F6E4" font-family="'Montserrat', sans-serif" font-size="11">RETURNING GUESTS</text>
        <text x="16" y="62" fill="#FFFFFF" font-family="'Montserrat', sans-serif" font-size="28" font-weight="800">42%</text>
      </g>
    </g>
  </g>
</svg>`
);

console.log("Top 5 project slide 3 generation complete!");
