# 🎨 RedFort — UI / UX Design System & Component Guidelines (`ui.md`)
### *Visual Architecture Modeled After [Ontic.co](https://ontic.co/)*

---

## 1. Brand Identity & Visual Philosophy

**RedFort** merges high-stakes enterprise defense with the authoritative, clean, and high-contrast design language pioneered by **Ontic.co**. 

The design conveys:
* **Precision & Technical Depth**: Space Mono telemetry codes, live status pulse beacons, and tabular security matrices.
* **Executive Authority**: Deep corporate Navy (`#0A376D`), crisp light surfaces (`#F9FBFD`, `#F1F7FF`), and high-alert signal orange accents (`#E96822`).
* **Instant Clarity in Crisis**: Micro-badges, severity-coded pill tags, and live-streaming indicators.

---

## 2. Color Palette & Design Tokens

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             REDFORT COLOR PALETTE                                │
├──────────────────────────────┬──────────────┬────────────────────────────────────┤
│ Token Name                   │ HEX / RGB    │ Usage / Role                       │
├──────────────────────────────┼──────────────┼────────────────────────────────────┤
│ `--color-navy-dark`          │ `#092F5D`    │ Deep header, mega-nav, dark hero   │
│ `--color-navy-primary`       │ `#0A376D`    │ Primary Brand, high-contrast text  │
│ `--color-blue-electric`      │ `#0072E3`    │ Interactive links, active borders  │
│ `--color-blue-light`         │ `#40C8F6`    │ Cyan telemetry highlight, radar    │
│ `--color-orange-signal`      │ `#E96822`    │ Primary Action CTA, Critical Alarm │
│ `--color-orange-hover`       │ `#CC5514`    │ Hover state for primary CTAs       │
│ `--color-amber-warning`      │ `#FCC63B`    │ Moderate alert, caution badge      │
│ `--color-bg-offwhite`        │ `#F9FBFD`    │ Main page body background          │
│ `--color-bg-ice`             │ `#F1F7FF`    │ Card background, mega-menu surface │
│ `--color-card-dark`          │ `#0A1120`    │ Dark SOC terminal & map widgets    │
│ `--color-border-subtle`      │ `#D9E4F2`    │ Clean divider lines & card borders │
│ `--color-text-body`          │ `#4A5568`    │ Readable secondary body copy       │
└──────────────────────────────┴──────────────┴────────────────────────────────────┘
```

### Tailwind Token Mapping (v4 Syntax / CSS Variables)
```css
:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'Space Mono', 'JetBrains Mono', monospace;

  --navy-dark: #092f5d;
  --navy-primary: #0a376d;
  --blue-electric: #0072e3;
  --blue-light: #40c8f6;
  --orange-signal: #e96822;
  --orange-hover: #cc5514;
  --amber-warning: #fcc63b;
  --bg-offwhite: #f9fbfd;
  --bg-ice: #f1f7ff;
  --bg-dark-soc: #0a1120;
  --border-subtle: #d9e4f2;
}
```

---

## 3. Typography Hierarchy

| Level | Font Family | Size / Weight | Line Height | Tracking / Transform | Example Content |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow Tag** | Space Mono (Monospace) | 12px / Bold (700) | 1.0 | +1.2px / UPPERCASE | `[ UNIFIED THREAT INTELLIGENCE & GSOC ]` |
| **Display H1** | Sans-Serif (Inter) | 48px – 64px / Medium (500) | 1.12 | -1.5px / Normal | *Unified Security Intelligence for the Modern Enterprise.* |
| **Section H2** | Sans-Serif (Inter) | 36px – 42px / Medium (500) | 1.2 | -0.8px / Normal | *Transform Incident Chaos Into Coordinated Action.* |
| **Card H3 / H4** | Sans-Serif (Inter) | 20px – 24px / SemiBold (600)| 1.3 | -0.4px / Normal | *Real-Time Physical & Cyber Correlation* |
| **Body Large** | Sans-Serif (Inter) | 18px – 20px / Regular (400) | 1.5 | Normal | Hero intro paragraphs & capability descriptions |
| **Body Standard** | Sans-Serif (Inter) | 15px – 16px / Regular (400) | 1.6 | Normal | Standard descriptive text & lists |
| **Telemetry Tag**| Space Mono (Monospace) | 11px – 13px / Medium (500) | 1.2 | +0.5px / Monospace | `IP: 192.168.4.12 // EVT_DOOR_FORCED` |

---

## 4. Component Layout & Structural Patterns (Ontic Spec)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ 🔔 TOP ANNOUNCEMENT BAR: New Report: 2026 Cyber-Physical Threat Convergence Outlook  [Read] │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 🛡️ REDFORT  Solutions ▾   Platform ▾   Executive Center ▾   Pricing    [Demo] [Client Login]│
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                             │
│  [ UNIFIED GSOC PLATFORM ]                                                                  │
│  Fortify Every Asset. Secure Every Operation.             ┌───────────────────────────────┐ │
│  Bridge the blind spot between cybersecurity and physical │  LIVE SOC COMMAND SIMULATOR   │ │
│  defense from a single operational pane of glass.         │  ● 4 Active Threats Detected  │ │
│                                                           │  [Floorplan] [CCTV] [Logs]    │ │
│  [ 🚀 Request Executive Demo ]  [ ⚡ Explore Live SOC ]   │  ■ Turnstile B-04 Cloned Badge│ │
│                                                           └───────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│  TRUSTED BY GLOBAL SECURITY TEAMS  [ FORTUNE 50 ] [ DEFENSE ] [ GLOBAL BANK ] [ CLOUD CO ]  │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│  INTERACTIVE CAPABILITIES (TABS STORIES)                                                    │
│  [ 01. Cyber SIEM ] | [ 02. Physical PACS ] | [ 03. Correlation ] | [ 04. SOAR Playbooks ]  │
│  ┌──────────────────────────────────────────┬─────────────────────────────────────────────┐ │
│  │ ⚡ Real-Time Cyber-Physical Correlation  │  [LIVE CORRELATION VIEW]                    │ │
│  │ Automatically connects badge events with │  • NYC Turnstile Badge at 14:00             │ │
│  │ identity logins to catch impossible      │  • Tokyo Root SSH Login at 14:02            │ │
│  │ physical travel and insider exfiltration.│  >> ANOMALY DETECTED: AUTO-ISOLATED (98ms)  │ │
│  └──────────────────────────────────────────┴─────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│  CONNECTED INTELLIGENCE BENTO GRID                                                          │
│  ┌─────────────────────────┬───────────────────────────────┬──────────────────────────────┐ │
│  │ 🏢 Multi-Campus GIS     │ 🚨 Instant Emergency Lockdown │ 📋 Automated GRC & Audit     │ │
│  └─────────────────────────┴───────────────────────────────┴──────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│  INTERACTIVE THREAT SIMULATOR & ROI RISK CALCULATOR                                         │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│  GLOBAL FOOTER (Navy) & COMPLIANCE BADGES (SOC 2, ISO 27001, FedRAMP, HIPAA)                │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1. Global Navigation & Announcement Bar
* **Announcement Bar**: Navy background (`#092F5D`), high-contrast link, dismissible or permanent ribbon.
* **Sticky Header**: Glassmorphic dark navy (`#0A376D/95` with backdrop-blur), sharp white logo with orange security dot.
* **Mega-Menu Drawers**: Light blue container (`#F1F7FF`) with rounded 4px corners, dropdown cards organized by program (Executive Protection, Threat Intel, Incident Management, Physical Access).

### 2. Ontic "Tabs Stories" Capability Section
* Horizontal pill tabs with active orange bottom-border loading bar (`animation: storySlideOut 6s`).
* Split layout:
  * **Left Column**: Section eyebrow, title, quote/callout, feature bullet list with navy left-accent bars (`width: 2px, height: 20px, bg: #0A376D`), and white/orange outline button.
  * **Right Column**: Interactive live UI simulation with dark mode cards, real-time pinging indicators, animated badge logs, and camera feed mockups.

### 3. Bento Grid ("Product Points")
* 3-4 column modular grid with light borders (`#D9E4F2`) and subtle hover lifts (`box-shadow: 0 8px 30px rgba(10,55,109,0.08)`).
* Custom SVG hardware and threat glyphs in electric blue (`#0072E3`) or signal orange (`#E96822`).

### 4. Interactive Public Cyber-Physical Threat Simulator
* Prospect can click real scenarios:
  1. *Impossible Physical Travel (NYC Badge vs Tokyo Cloud Login)*
  2. *Server Room Forced Door + Network Cable Disconnect*
  3. *After-Hours Terminated Employee Badge Attempt*
* Shows live detection timeline: Ingestion $\rightarrow$ Correlation $\rightarrow$ Automated SOAR Lockdown $\rightarrow$ Incident Resolution.

### 5. Interactive ROI & Risk Exposure Calculator
* Interactive sliders for:
  * Number of Global Facilities (1 – 500)
  * Headcount / Identities (100 – 100,000)
  * Monthly Security Alerts (1,000 – 5,000,000)
* Real-time calculation of:
  * Alert triage hours saved per year ($82\%$)
  * Mean-Time-To-Respond (MTTR) improvement ($14.2\text{ hours} \rightarrow 4\text{ mins}$)
  * Estimated annual risk exposure reduction (\$2.4M+).

---

## 5. UI Micro-Interactions & Styling Details

* **Card Corners**: Precise corporate `rounded-md` or `rounded-lg` (4px – 8px), avoiding overly round cartoonish borders.
* **Badges**: Monospace, `px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold`.
* **Buttons**:
  * **Primary**: `bg-[#E96822] text-white hover:bg-[#CC5514] shadow-sm font-medium px-6 py-3 rounded transition-all`
  * **Secondary / Outline**: `border border-[#0A376D] text-[#0A376D] hover:bg-[#F1F7FF] font-medium px-6 py-3 rounded`
  * **Ghost Dark**: `bg-[#0A376D] text-white hover:bg-[#092F5D] px-6 py-3 rounded`
* **Real-Time Beacons**: Pulsing green dot for `SYSTEMS NOMINAL`, pulsing red dot for `ACTIVE THREAT CORRELATED`.
