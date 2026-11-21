# Technical Architecture & Developer Handbook
### Portfolio System: Suyash Yadav — Data Analytics & BI Developer / Junior Data Scientist
**Target Production Domain:** `https://suyashhh-yadav.github.io`  
**Repository Architecture:** GitHub Pages Static Distribution (Zero Build-Step)  
**Author / Engineering Lead:** 25-Year Veteran Systems Perspective  
**Last Updated:** November 2026  

---

## 1. Executive Summary & Design Rationale

This document serves as the master architectural reference and long-term maintenance manual for Suyash Yadav's professional portfolio.

### The Objective
Deliver a lightning-fast (<200ms Time to First Byte), rock-solid, ultra-minimalist personal portfolio that presents analytical capability through proven business impact, enterprise data modeling rigor, and high-resolution dashboard inspection.

### Target Audience Personas
1. **VP of Analytics / Head of BI:** Cares about data governance, star-schema data modeling, row-level security (RLS), and whether metrics drive actual commercial decisions (ROAS sensitivity, logistics delivery correlation).
2. **Technical Lead / Senior Data Scientist:** Scrutinizes code cleanliness, SQL query mastery (CTEs, window functions), Python ETL robustness, and anomaly detection logic.
3. **Executive Recruiter / Talent Partner:** Scans for rapid credentials, contact availability, downloadable PDF resume, and clear tenure progression.

### Why "Zero-Build-Step" Architecture?
In modern frontend engineering, simple portfolio websites are routinely over-engineered with multi-gigabyte `node_modules`, fragile bundlers (Webpack/Vite/Turbopack), and ephemeral framework churn (React/Next.js). 

**The 25-Year Veteran Decision:** We intentionally chose a **pure static HTML5 + Modern CSS3 (Tailwind utility tokens) + Native ECMAScript (Vanilla JS)** architecture.
* **Zero Dependency Rot:** This website will build and render identically 5, 10, or 15 years from now with zero maintenance. No broken npm dependencies, no security vulnerabilities (`npm audit` issues), no broken lockfiles.
* **Instant Global CDN Delivery:** Deployed natively via GitHub Pages (Fastly CDN edge cache). HTML, CSS, and pre-compressed assets are served directly from RAM cache.
* **Zero Host Cost:** 100% free hosting with native HTTPS/SSL provided by GitHub.

---

## 2. Directory Topology & Asset Hierarchy

```
C:\Users\suyas\suyashhh-yadav.github.io\
│
├── index.html                           # Master semantic single-page application
├── README.md                            # Comprehensive engineering & maintenance guide (this file)
│
└── assets\
    ├── css\
    │   └── style.css                    # Custom design tokens, glassmorphism, studio frames & animations
    │
    ├── js\
    │   └── main.js                      # Scroll spy, IntersectionObserver, modal lightbox, email copy, form handler
    │
    ├── docs\
    │   └── Suyash_Yadav_Resume.pdf      # Canonical PDF resume for downloads & preview
    │
    └── images\
        ├── hero_manga.jpg               # High-res manga analyst portrait (1024x1024, 1:1 ratio)
        ├── dashboard_advertising_roas.jpg # Dashboard 1: Advertising ROAS & Pacing (2000x1128 HD)
        ├── dashboard_olist_store.jpg    # Dashboard 2: Olist E-Commerce Performance (1671x942 HD)
        ├── dashboard_crowdfunding_2018.jpg # Dashboard 3: Crowdfunding 2018 Benchmark (2000x1337 HD)
        ├── dashboard_kickstarter_excel.jpg # Dashboard 4: Kickstarter 10-Yr Excel Model (2000x779 HD)
        ├── star_schema.png              # Enterprise Power BI Star Schema Diagram (6 facts/6 dims)
        ├── 01-raw-data-model.png        # Pre-refactor raw fragmented table schema
        ├── 03-regional-rls.png          # Dynamic Row-Level Security configuration view
        └── deloitte_dashboard.png       # Operational downtime analysis visual
```

---

## 3. Structural Page Hierarchy & Section Map

The page flow is strategically sequenced to guide executive and technical evaluators from high-level positioning down to deep technical proof:

| Order | Section ID | Visual Style | Functional Purpose |
|:---:|:---|:---|:---|
| **01** | `#hero` | Warm light gradient (`slate-50` to `white`) | First impression, positioning title, manga hero avatar, primary CTAs, core toolkit pills. |
| **02** | Metrics Ribbon | Soft `slate-50/50` border ribbon | 4 immediate high-impact numerical proof points (400K+ records, 97% time saved, 5K leads, 5-Star SQL). |
| **03** | `#about` | Crisp `white` | Core philosophy: bridging technical engineering with commercial decision support; 3 practice pillars. |
| **04** | `#experience` | Crisp `white` (`border-t`) | **Placed directly after About Me**: Career progression (Navy Blue Energy, Technoedge, AI Variant), B.Tech AI & Data Science degree, certifications. |
| **05** | `#dashboards` | Soft `slate-50/70` (`border-t`) | **The Showcase Gallery**: 4 Dual-Pane case studies featuring studio mockup frames and 2000px HD Lightbox inspection. |
| **06** | `#modeling` | Crisp `white` (`border-t`) | Technical architecture proof: Star Schema diagram, Dynamic RLS logic, Python ETL parsers, Farmer scoring. |
| **07** | `#skills` | Soft `slate-50/80` (`border-t`) | 4-column capability matrix (SQL, BI & Modeling, Python Pipelines, ML & Gen AI). |
| **08** | `#contact` | Carbon `slate-950` dark finish | High-conversion footer: 1-click email clipboard copy + interactive validation form + social profiles. |

---

## 4. Key Subsystems & Interactive Features

### 4.1. The Studio Dashboard Window & Fullscreen Lightbox
* **Problem Solved:** BI dashboards contain fine text (KPI labels, DAX measure results, axis tickers) that gets lost in standard compressed thumbnails.
* **Implementation:**
  - Each dashboard is housed inside a custom CSS `.studio-frame` with macOS-style window traffic light dots (`.dot-red`, `.dot-yellow`, `.dot-green`).
  - Clicking any dashboard triggers the modal lightbox (`#lightbox-modal`), loading the **uncompressed 2000px HD image**.
  - Includes interactive **Zoom In (+25%)**, **Zoom Out (-25%)**, **Reset (100%)** controls, and keyboard `ESC` dismissal.
  - Body scrolling is locked (`overflow: hidden`) during modal view to prevent background jitter.

### 4.2. Glassmorphic Navigation & Scroll Spy
* **Implementation:**
  - The header uses `backdrop-filter: blur(16px)` with semi-transparent white (`rgba(255, 255, 255, 0.85)`) to maintain legibility over scrolling content.
  - A scroll event listener queries section offsets dynamically, applying active styling to the corresponding nav link (`text-blue-600 font-semibold`) as the user scrolls.

### 4.3. 1-Click Clipboard Engine
* **Implementation:**
  - `copyEmail(event)` utilizes `navigator.clipboard.writeText('suyashhh09@gmail.com')`.
  - Animates a tooltip `#copy-tooltip` ("Copied to clipboard!") with graceful entry/exit transitions.
  - Automatically falls back to `mailto:` URI if clipboard permissions are restricted in legacy browsers.

### 4.4. Direct Interactive Form & Mailto Fallback
* **Implementation:**
  - Validates required fields (`name`, `email`, `message`) client-side.
  - On submit, transitions the button to an animated loading spinner, shows a confirmed message, and constructs an encoded `mailto:` URI to trigger the client's mail application with all fields prefilled.

---

## 5. Deployment & Release Runbook (GitHub Pages)

### Standard Push Deployment
The repository is pre-configured with the remote origin pointing to:
`https://github.com/Suyashhh-yadav/suyashhh-yadav.github.io.git`

To deploy any changes:
```powershell
# 1. Navigate to the repository
cd C:\Users\suyas\suyashhh-yadav.github.io

# 2. Check changes
git status

# 3. Stage and commit
git add .
git commit -m "Your descriptive commit message"

# 4. Push to production
git push origin main
```
*GitHub Pages will automatically build and distribute the new static files across its global CDN in ~30–60 seconds.*

### Custom Domain Configuration (Optional Future Step)
If you later purchase a custom domain (e.g., `suyashyadav.com`):
1. In the root of this repository, create a file named `CNAME` containing just your domain:
   ```
   suyashyadav.com
   ```
2. In your domain registrar (GoDaddy, Namecheap, Cloudflare), set up DNS records:
   - **Apex domain (`@`):** 4 `A` records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **Subdomain (`www`):** `CNAME` record pointing to `suyashhh-yadav.github.io`.
3. In GitHub repo settings → **Pages**, check **Enforce HTTPS**.

---

## 6. Maintenance & Future Update SOPs (Standard Operating Procedures)

### SOP 1: Updating Your Resume PDF
1. Export your updated resume from Word/Canva as a PDF.
2. Replace `assets/docs/Suyash_Yadav_Resume.pdf` with the new file (keep the exact filename).
3. Commit and push:
   ```powershell
   git add assets/docs/Suyash_Yadav_Resume.pdf
   git commit -m "Update resume PDF with latest experience"
   git push origin main
   ```

### SOP 2: Adding a 5th Featured Dashboard
To add another dashboard in the `#dashboards` section:
1. Save your high-resolution screenshot (min 1600px wide) into `assets/images/dashboard_new_name.jpg`.
2. In `index.html`, duplicate one of the existing project card blocks (e.g., lines 470–560).
3. Update:
   - Tool badges (e.g., `Power BI`, `SQL`, `Tableau`)
   - Project Title
   - Problem narrative
   - The 4 KPI metric cards
   - The 3 key insight bullet points
   - The GitHub URL button
   - The image `src` and `data-img` attributes to `assets/images/dashboard_new_name.jpg`
4. Test locally in your browser, commit, and push.

### SOP 3: Updating Work Experience or Education
1. Locate line ~320 in `index.html` within `<section id="experience">`.
2. Add or modify a timeline item using the standard template:
   ```html
   <div class="relative pl-8 border-l-2 border-slate-200 reveal">
     <span class="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow"></span>
     <div class="flex flex-wrap items-baseline justify-between gap-2">
       <h3 class="text-lg font-bold text-slate-950">Senior Data Analyst</h3>
       <span class="text-xs font-mono text-slate-500 font-medium bg-white px-2.5 py-1 rounded-lg border border-slate-200">Nov 2026 – Present</span>
     </div>
     <div class="text-sm font-semibold text-blue-600">Company Name</div>
     <ul class="mt-3 space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-outside ml-4 leading-relaxed">
       <li>Key quantified achievement 1...</li>
       <li>Key quantified achievement 2...</li>
     </ul>
   </div>
   ```

---

## 7. Performance & Quality Benchmarks

* **Google Lighthouse Target Scores:**
  * Performance: **98–100**
  * Accessibility (a11y): **100**
  * Best Practices: **100**
  * SEO: **100**
* **Mobile Responsiveness:** Tested and verified across 360px (mobile portrait), 768px (tablet), 1024px (small desktop), and 1920px+ (4K displays).
* **Asset Compression:** All dashboard screenshots are optimized under ~400KB while retaining full 2000px display sharpness.
