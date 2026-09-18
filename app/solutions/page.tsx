'use strict';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Shield, 
  ArrowRight, 
  Plane, 
  Landmark, 
  Hospital, 
  Building, 
  Layers, 
  Factory, 
  Server, 
  GraduationCap, 
  Truck, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  Radio, 
  Lock, 
  Cpu, 
  Activity,
  Zap,
  ChevronRight
} from 'lucide-react';
import { INDUSTRY_SOLUTIONS } from '@/lib/siteData';
import CtaBand from '@/components/CtaBand';

interface IndustryVisualConfig {
  slug: string;
  badge: string;
  imageSrc: string;
  imageAlt: string;
  hudLabel: string;
  frameworks: string[];
  vulnerabilities: string[];
  capabilities: string[];
}

const INDUSTRY_VISUAL_MAP: Record<string, IndustryVisualConfig> = {
  airports: {
    slug: 'airports',
    badge: 'AVIATION & AIRSIDE GSOC',
    imageSrc: '/images/solution-airports.jpg',
    imageAlt: 'Airport Terminal Command Operations Center',
    hudLabel: 'AIRSIDE PERIMETER · ZERO BLINDSPOTS',
    frameworks: ['FAA Mandates', 'TSA Part 1542', 'ICAO Annex 17'],
    vulnerabilities: [
      'Perimeter fence breaches & airside door bypasses',
      'Flight display & baggage sorting ransomware attacks'
    ],
    capabilities: [
      'Perimeter laser sensor & PTZ camera auto-tracking',
      'Instant tarmac lockdown on cyber-physical breach detection'
    ]
  },
  banks: {
    slug: 'banks',
    badge: 'GLOBAL VAULTS & SWIFT GSOC',
    imageSrc: '/images/solution-banking.jpg',
    imageAlt: 'High Security Banking Vault Operations',
    hudLabel: 'SWIFT GATEWAY · 0.00s GEO DELAY',
    frameworks: ['PCI-DSS 4.0', 'GLBA Safeguards', 'SOX 404', 'SOC 2 Type II'],
    vulnerabilities: [
      'Impossible travel credential hijacking on core transaction nodes',
      'Unauthorized physical vault access during off-hours'
    ],
    capabilities: [
      'Dual-custody biometric logging & optical sensor triggers',
      'Instant cloud session revocation on turnstile anomaly'
    ]
  },
  hospitals: {
    slug: 'hospitals',
    badge: 'CLINICAL IOT & ePHI DEFENSE',
    imageSrc: '/images/solution-healthcare.jpg',
    imageAlt: 'Hospital Clinical Security Operations Center',
    hudLabel: 'MEDICAL IOT · 100% HIPAA ePHI ISOLATED',
    frameworks: ['HIPAA Security Rule', 'HITECH Act', 'FDA Medical IoT'],
    vulnerabilities: [
      'Ransomware targeting infusion pumps & MRI subnetworks',
      'Unauthorized staff access to narcotics inventory'
    ],
    capabilities: [
      'Biometric pharmacy access with immutable audit trail',
      'Automated medical IoT network segmentation'
    ]
  },
  government: {
    slug: 'government',
    badge: 'SOVEREIGN SCIF & AGENCY GSOC',
    imageSrc: '/images/hero-gsoc.jpg',
    imageAlt: 'Government Agency Security Operations Command Center',
    hudLabel: 'SOVEREIGN CLUSTER · FedRAMP HIGH READY',
    frameworks: ['NIST SP 800-53', 'FedRAMP High', 'CJIS Policy'],
    vulnerabilities: [
      'Nation-state APTs targeting public utility registries',
      'Physical perimeter infiltration at classified SCIF facilities'
    ],
    capabilities: [
      'Hardware-backed CAC/PIV multi-tier clearance gates',
      'Air-gapped on-premise sovereign deployment'
    ]
  },
  enterprises: {
    slug: 'enterprises',
    badge: 'GLOBAL MULTI-HQ OPERATIONS',
    imageSrc: '/images/hero-executive.jpg',
    imageAlt: 'Enterprise Global Security Executive Operations',
    hudLabel: '50+ REGIONAL HQS · UNIFIED GSOC',
    frameworks: ['ISO 27001', 'SOC 2 Type II', 'GDPR Article 32'],
    vulnerabilities: [
      'Fragmented regional tools causing visibility gaps',
      'Executive travel risks and contractor privilege escalation'
    ],
    capabilities: [
      'Single operational console across global headquarters',
      'Executive route geofencing & automated SOAR containment'
    ]
  },
  manufacturing: {
    slug: 'manufacturing',
    badge: 'SMART FACTORY & SCADA / OT',
    imageSrc: '/images/solution-industrial.jpg',
    imageAlt: 'Automated Industrial Manufacturing Plant Security',
    hudLabel: 'OT SCADA INTEGRITY · 92% DOWNTIME DROP',
    frameworks: ['IEC 62443', 'NIST SP 800-82', 'ISO 45001'],
    vulnerabilities: [
      'Air-gap bridging industrial malware modifying PLC logic',
      'Hazardous machine operation by uncertified personnel'
    ],
    capabilities: [
      'Continuous PLC firmware checksum monitoring',
      'Forklift & hazardous zone geofence interlocking'
    ]
  },
  'it-companies': {
    slug: 'it-companies',
    badge: 'CLOUD DATACENTER & CODE VAULT',
    imageSrc: '/images/solution-datacenter.jpg',
    imageAlt: 'Hyperscale Cloud Datacenter Server Rack Security',
    hudLabel: 'SERVER RACK PACS · 100% SOC 2 AUDIT READY',
    frameworks: ['SOC 2 Type II', 'ISO 27001', 'CSA STAR Level 2'],
    vulnerabilities: [
      'Co-located datacenter physical server rack tampering',
      'Privileged Git pushes from compromised offboarded accounts'
    ],
    capabilities: [
      'Dual-factor micro-access locks on server cage doors',
      'Code push blocking correlated with physical badge presence'
    ]
  },
  universities: {
    slug: 'universities',
    badge: 'CAMPUS SAFETY & DORM PACS',
    imageSrc: '/images/hero-physical.jpg',
    imageAlt: 'University Campus & Physical Security Access',
    hudLabel: '50k+ CONCURRENT STUDENTS · MASS BROADCAST',
    frameworks: ['Clery Act', 'FERPA', 'Title IX Compliance'],
    vulnerabilities: [
      'Open campus perimeter control & dorm trespassers',
      'Delayed mass notification during active safety incidents'
    ],
    capabilities: [
      'Contactless NFC mobile smartphone credentials',
      'Instant sub-second audio siren & push notification dispatch'
    ]
  },
  logistics: {
    slug: 'logistics',
    badge: 'SUPPLY CHAIN & FREIGHT GATES',
    imageSrc: '/images/solution-industrial.jpg',
    imageAlt: 'Logistics Distribution Hub & Freight Security',
    hudLabel: 'AUTOMATED LPR GATES · 70% FASTER INTAKE',
    frameworks: ['C-TPAT Tier 3', 'TAPA FSR Level A', 'ISO 28000'],
    vulnerabilities: [
      'Cargo theft at loading docks during night shifts',
      'High driver turnover slowing down intake checkpoints'
    ],
    capabilities: [
      'Automated optical license plate recognition (LPR) gates',
      'High-value cargo cage laser tripwires & motion tracking'
    ]
  },
  'smart-cities': {
    slug: 'smart-cities',
    badge: 'MUNICIPAL GRID & TRANSIT GSOC',
    imageSrc: '/images/solution-smartcity.jpg',
    imageAlt: 'Smart City Municipal Operations Command Center',
    hudLabel: 'SUB-SECOND MUNICIPAL TELEMETRY STREAM',
    frameworks: ['NIST Cyber-Physical', 'NERC CIP', 'AWIA Water'],
    vulnerabilities: [
      'Cyber-physical sabotage on water filtration & power grids',
      'Disconnected communication between police, fire, and transit'
    ],
    capabilities: [
      'City-wide 3D GIS incident heatmaps with live unit feeds',
      'Utility SCADA anomaly detection with instant emergency dispatch'
    ]
  }
};

const industryIcons: Record<string, React.ReactNode> = {
  airports: <Plane className="w-5 h-5 text-[#F5762E]" />,
  banks: <Landmark className="w-5 h-5 text-[#F5762E]" />,
  hospitals: <Hospital className="w-5 h-5 text-[#F5762E]" />,
  government: <Building className="w-5 h-5 text-[#F5762E]" />,
  enterprises: <Layers className="w-5 h-5 text-[#F5762E]" />,
  manufacturing: <Factory className="w-5 h-5 text-[#F5762E]" />,
  'it-companies': <Server className="w-5 h-5 text-[#F5762E]" />,
  universities: <GraduationCap className="w-5 h-5 text-[#F5762E]" />,
  logistics: <Truck className="w-5 h-5 text-[#F5762E]" />,
  'smart-cities': <Building2 className="w-5 h-5 text-[#F5762E]" />
};

export default function SolutionsPage() {
  const [activeSlug, setActiveSlug] = useState<string>('airports');

  const scrollToSection = (slug: string) => {
    setActiveSlug(slug);
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full flex flex-col font-sans selection:bg-[#F5762E] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-[#0B0F19] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#F5762E]/10 blur-[140px] pointer-events-none rounded-full"></div>

        <div className="max-w-[1280px] mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>10 MISSION-CRITICAL INDUSTRY SOLUTIONS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
            Industry Architectures for Zero-Blindspot Security
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-normal">
            Every sector operates with distinct physical layouts, OT infrastructure, and compliance mandates. RedFort adapts natively to your environment.
          </p>
        </div>
      </section>

      {/* 2. STICKY SECTOR JUMP SELECTOR */}
      <section className="sticky top-[64px] z-30 w-full bg-[#0B0F19]/95 backdrop-blur-md border-b border-[#1F2937] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-mono text-[#64748B] uppercase font-bold shrink-0 mr-2 hidden sm:inline">
            SECTOR:
          </span>
          {INDUSTRY_SOLUTIONS.map((ind) => {
            const isActive = activeSlug === ind.slug;
            return (
              <button
                key={ind.id}
                onClick={() => scrollToSection(ind.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 flex items-center space-x-2 shrink-0 border ${
                  isActive
                    ? 'bg-[#F5762E] border-[#F5762E] text-white font-bold shadow-md shadow-orange-950/40'
                    : 'bg-[#111827] border-[#1F2937] text-[#94A3B8] hover:text-white hover:border-[#F5762E]/60 hover:bg-[#1F2937]'
                }`}
              >
                <span className="shrink-0">{industryIcons[ind.id]}</span>
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. HIGHLY VISUAL SECTOR SHOWCASE (ALL 10) */}
      <div className="w-full flex flex-col divide-y divide-[#1F2937]">
        {INDUSTRY_SOLUTIONS.map((ind, index) => {
          const config = INDUSTRY_VISUAL_MAP[ind.slug] || INDUSTRY_VISUAL_MAP['airports'];
          const isEven = index % 2 === 0;

          return (
            <section
              key={ind.id}
              id={ind.slug}
              className={`w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 scroll-mt-24 font-sans ${
                isEven ? 'bg-[#0E1424] text-white' : 'bg-[#0B0F19] text-white'
              }`}
            >
              <div className="max-w-[1280px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* LEFT: 16:9 Enterprise Visual with HUD Overlay (6 Cols) */}
                  <div className="lg:col-span-6 group relative rounded-2xl overflow-hidden border border-[#1F2937] hover:border-[#F5762E]/70 transition-all duration-500 shadow-2xl bg-[#0B0F19]">
                    
                    {/* Visual Container */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={config.imageSrc}
                        alt={config.imageAlt}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                      />
                      
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80 pointer-events-none"></div>

                      {/* Top HUD Badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0B0F19]/80 backdrop-blur-md border border-[#1F2937] text-[10px] font-mono text-white flex items-center space-x-1.5">
                        <Radio className="w-3 h-3 text-[#22C55E] animate-pulse" />
                        <span>{config.hudLabel}</span>
                      </div>

                      {/* Bottom Metric Pill */}
                      <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-[#0B0F19]/90 backdrop-blur-md border border-[#F5762E]/40 text-right">
                        <div className="text-[9px] font-mono text-[#94A3B8] uppercase">{ind.statsLabel}</div>
                        <div className="text-base font-mono font-extrabold text-[#F5762E] leading-none">{ind.stats}</div>
                      </div>
                    </div>

                  </div>

                  {/* RIGHT: Streamlined Punchy Content (6 Cols) */}
                  <div className="lg:col-span-6 space-y-6">
                    
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider">
                        <span>{config.badge}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-3">
                        <span>{ind.name}</span>
                      </h2>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        {ind.oneLiner}
                      </p>
                    </div>

                    {/* Threat vs RedFort Matrix (Concise Cards) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* Vulnerabilities */}
                      <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1F2937] space-y-2">
                        <div className="text-[11px] font-mono font-bold text-[#EF4444] uppercase flex items-center space-x-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>SECTOR THREATS</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-[#94A3B8]">
                          {config.vulnerabilities.map((v, i) => (
                            <li key={i} className="flex items-start space-x-1.5 leading-snug">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-1 shrink-0"></span>
                              <span>{v}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* RedFort Unified Defense */}
                      <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1F2937] space-y-2">
                        <div className="text-[11px] font-mono font-bold text-[#22C55E] uppercase flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>REDFORT CONVERGENCE</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-200">
                          {config.capabilities.map((c, i) => (
                            <li key={i} className="flex items-start space-x-1.5 leading-snug">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-1 shrink-0"></span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Compliance Chips & Action Button */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#1F2937]">
                      <div className="flex flex-wrap gap-1.5">
                        {config.frameworks.map((fw, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111827] text-[#94A3B8] border border-[#1F2937]">
                            {fw}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/request-demo?sector=${ind.slug}`}
                        className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-mono font-bold transition-all shrink-0 shadow-md group"
                      >
                        <span>Deploy for {ind.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 4. BOTTOM CTA BAND */}
      <CtaBand 
        headline="Ready to deploy unified security for your industry?"
        subhead="Connect with our solutions engineering team to evaluate how RedFort integrates with your existing PACS, CCTV networks, and SIEM infrastructure."
        buttonText="Request a Demo"
        buttonLink="/request-demo"
        showBullets={true}
      />

    </div>
  );
}
