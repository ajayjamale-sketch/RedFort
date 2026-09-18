'use strict';
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { 
  Shield, 
  ArrowRight, 
  Activity, 
  Cpu, 
  Building2, 
  KeyRound, 
  AlertTriangle, 
  ShieldAlert, 
  FileCheck2, 
  BarChart3, 
  BellRing,
  CheckCircle2,
  Lock,
  Layers,
  Settings,
  Sliders,
  Radio,
  Clock,
  Zap,
  ExternalLink
} from 'lucide-react';
import MockupDashboard from '@/components/MockupDashboard';
import CtaBand from '@/components/CtaBand';
import { PRODUCT_MODULES } from '@/lib/siteData';

interface ModuleVisualConfig {
  slug: string;
  imageSrc: string;
  imageAlt: string;
  hudBadge: string;
  metricNumber: string;
  metricLabel: string;
}

const MODULE_VISUALS: Record<string, ModuleVisualConfig> = {
  'soc-dashboard': {
    slug: 'soc-dashboard',
    imageSrc: '/images/hero-gsoc.jpg',
    imageAlt: 'GSOC Command Center Console',
    hudBadge: 'CORE TELEMETRY HUB',
    metricNumber: '100k+ EPS',
    metricLabel: 'Zero-Loss Ingest'
  },
  'cyber-threat-monitoring': {
    slug: 'cyber-threat-monitoring',
    imageSrc: '/images/hero-correlation.jpg',
    imageAlt: 'Threat Correlation Radar',
    hudBadge: 'MITRE ATT&CK INGEST',
    metricNumber: '< 100ms',
    metricLabel: 'Correlation Delay'
  },
  'physical-security': {
    slug: 'physical-security',
    imageSrc: '/images/hero-physical.jpg',
    imageAlt: 'Facility Physical Security Checkpoints',
    hudBadge: 'ONVIF CCTV & PACS',
    metricNumber: '4K Stream',
    metricLabel: 'PTZ Auto-Track'
  },
  'identity-access-control': {
    slug: 'identity-access-control',
    imageSrc: '/images/solution-banking.jpg',
    imageAlt: 'Biometric Access Control Gateway',
    hudBadge: 'ZERO-TRUST IDP SYNC',
    metricNumber: '0.00s',
    metricLabel: 'Badge Revoke Sync'
  },
  'incident-response': {
    slug: 'incident-response',
    imageSrc: '/images/resource-playbook.jpg',
    imageAlt: 'SOAR Incident Response Playbook',
    hudBadge: 'AUTONOMOUS SOAR',
    metricNumber: '78%',
    metricLabel: 'MTTR Reduction'
  },
  'risk-vulnerability': {
    slug: 'risk-vulnerability',
    imageSrc: '/images/resource-whitepaper.jpg',
    imageAlt: 'Risk & Vulnerability Architecture',
    hudBadge: 'CONTINUOUS SCANNING',
    metricNumber: 'Real-Time',
    metricLabel: 'CVE & Zone Scoring'
  },
  'compliance-audit': {
    slug: 'compliance-audit',
    imageSrc: '/images/hero-executive.jpg',
    imageAlt: 'Executive Compliance & Audit Posture',
    hudBadge: 'CONTINUOUS GRC',
    metricNumber: '100%',
    metricLabel: 'Audit Ready'
  },
  'security-analytics': {
    slug: 'security-analytics',
    imageSrc: '/images/resource-threat-report.jpg',
    imageAlt: 'Security Analytics & Threat Intelligence',
    hudBadge: 'EXECUTIVE INTELLIGENCE',
    metricNumber: 'Grade A+',
    metricLabel: 'Posture Rating'
  },
  'emergency-alerts': {
    slug: 'emergency-alerts',
    imageSrc: '/images/solution-airports.jpg',
    imageAlt: 'Airport & Campus Emergency Alerts',
    hudBadge: 'MASS NOTIFICATION',
    metricNumber: '< 500ms',
    metricLabel: 'Broadcast Speed'
  }
};

const moduleIcons: Record<string, React.ReactNode> = {
  'soc-dashboard': <Activity className="w-4 h-4 text-[#F5762E]" />,
  'cyber-threat-monitoring': <Cpu className="w-4 h-4 text-[#F5762E]" />,
  'physical-security': <Building2 className="w-4 h-4 text-[#F5762E]" />,
  'identity-access-control': <KeyRound className="w-4 h-4 text-[#F5762E]" />,
  'incident-response': <AlertTriangle className="w-4 h-4 text-[#F5762E]" />,
  'risk-vulnerability': <ShieldAlert className="w-4 h-4 text-[#F5762E]" />,
  'compliance-audit': <FileCheck2 className="w-4 h-4 text-[#F5762E]" />,
  'security-analytics': <BarChart3 className="w-4 h-4 text-[#F5762E]" />,
  'emergency-alerts': <BellRing className="w-4 h-4 text-[#F5762E]" />
};

const CATEGORIES = [
  'All',
  'Monitoring',
  'Physical',
  'Response',
  'Compliance',
  'Analytics',
  'Identity',
  'Alerting'
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Handle URL query parameters (?tab=... or ?category=...)
  useEffect(() => {
    const tabParam = searchParams.get('tab') || searchParams.get('category');
    if (tabParam) {
      const p = tabParam.toLowerCase();
      let matched = 'All';

      if (p.includes('monitor') || p.includes('cyber')) {
        matched = 'Monitoring';
      } else if (p.includes('physic') || p.includes('cctv')) {
        matched = 'Physical';
      } else if (p.includes('response') || p.includes('incident') || p.includes('soar')) {
        matched = 'Response';
      } else if (p.includes('compliance') || p.includes('audit') || p.includes('grc')) {
        matched = 'Compliance';
      } else if (p.includes('analytic') || p.includes('intel')) {
        matched = 'Analytics';
      } else if (p.includes('ident') || p.includes('access') || p.includes('pacs')) {
        matched = 'Identity';
      } else if (p.includes('alert') || p.includes('emergency')) {
        matched = 'Alerting';
      }

      setActiveCategory(matched);

      // Smooth scroll to products grid
      setTimeout(() => {
        const target = document.getElementById('products-grid');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }, [searchParams]);

  const filteredModules = activeCategory === 'All' 
    ? PRODUCT_MODULES 
    : PRODUCT_MODULES.filter(m => m.category === activeCategory);

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    const url = new URL(window.location.href);
    if (cat === 'All') {
      url.searchParams.delete('tab');
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('tab', cat);
    }
    window.history.pushState({}, '', url.toString());
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'All': return <Layers className="w-3.5 h-3.5" />;
      case 'Monitoring': return <Cpu className="w-3.5 h-3.5" />;
      case 'Physical': return <Building2 className="w-3.5 h-3.5" />;
      case 'Response': return <AlertTriangle className="w-3.5 h-3.5" />;
      case 'Compliance': return <FileCheck2 className="w-3.5 h-3.5" />;
      case 'Analytics': return <BarChart3 className="w-3.5 h-3.5" />;
      case 'Identity': return <KeyRound className="w-3.5 h-3.5" />;
      case 'Alerting': return <BellRing className="w-3.5 h-3.5" />;
      default: return <Shield className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="w-full flex flex-col font-sans selection:bg-[#F5762E] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-[#0B0F19] text-white pt-16 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#F5762E]/10 blur-[140px] pointer-events-none rounded-full"></div>

        <div className="max-w-[1280px] mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>NINE MODULAR ENGINES · ONE PLATFORM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
            Complete Modular Arsenal for Enterprise Security
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-normal">
            Every module operates as an independent powerhouse — and integrates seamlessly through real-time Complex Event Processing.
          </p>
        </div>
      </section>

      {/* 2. FULL PRODUCT GRID */}
      <section 
        id="products-grid"
        className="w-full bg-[#0B0F19] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937] scroll-mt-24"
      >
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          {/* Category Filter Tabs with Icons, Counts & Enhanced Hover */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 pb-2">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              const count = cat === 'All' 
                ? PRODUCT_MODULES.length 
                : PRODUCT_MODULES.filter(m => m.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`group px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all duration-300 flex items-center space-x-2 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#F5762E] border-[#F5762E] text-white shadow-lg shadow-orange-950/40 ring-2 ring-[#F5762E]/30 scale-[1.02]'
                      : 'bg-[#111827] border-[#1F2937] text-[#94A3B8] hover:text-white hover:bg-[#1A2234] hover:border-[#F5762E]/70 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-950/20'
                  }`}
                >
                  <span className={`transition-colors ${isSelected ? 'text-white' : 'text-[#F5762E] group-hover:text-white'}`}>
                    {getCategoryIcon(cat)}
                  </span>
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-colors ${
                    isSelected 
                      ? 'bg-black/20 text-white' 
                      : 'bg-[#0B0F19] text-[#64748B] group-hover:text-white group-hover:bg-[#0B0F19]/80 border border-[#1F2937]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 9 Visual Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((mod) => {
              const visual = MODULE_VISUALS[mod.id] || MODULE_VISUALS['soc-dashboard'];

              return (
                <Link
                  key={mod.id}
                  href={`/products/${mod.slug}`}
                  className="group bg-[#111827] border border-[#1F2937] hover:border-[#F5762E]/70 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* 16:9 Image Thumbnail Container */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0B0F19] border-b border-[#1F2937]">
                    <Image
                      src={visual.imageSrc}
                      alt={visual.imageAlt}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent pointer-events-none"></div>

                    {/* HUD Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0B0F19]/90 backdrop-blur-md border border-[#1F2937] text-[10px] font-mono text-[#F5762E] font-bold">
                      {visual.hudBadge}
                    </div>

                    {/* Category Pill */}
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#0B0F19]/80 backdrop-blur-md border border-[#1F2937] text-[9px] font-mono text-[#94A3B8] uppercase font-semibold">
                      {mod.category}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 rounded-lg bg-[#0B0F19] border border-[#1F2937] group-hover:border-[#F5762E]/40 transition-colors">
                          {moduleIcons[mod.id]}
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#F5762E] transition-colors">
                          {mod.name}
                        </h3>
                      </div>

                      <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                        {mod.shortDescription}
                      </p>

                      {/* Capabilities Matrix */}
                      <div className="pt-2 space-y-1.5 border-t border-[#1F2937]">
                        {mod.requirements.slice(0, 2).map((req, idx) => (
                          <div key={idx} className="text-xs text-slate-300 flex items-start space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action & Metric Strip */}
                    <div className="pt-4 border-t border-[#1F2937] flex items-center justify-between text-xs font-mono">
                      <div className="text-[#94A3B8]">
                        <span className="text-white font-bold">{visual.metricNumber}</span> {visual.metricLabel}
                      </div>
                      <div className="flex items-center space-x-1 text-[#F5762E] font-bold group-hover:text-white transition-colors">
                        <span>Explore Specs</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. FEATURED MODULE DEEP-DIVE — SOC DASHBOARD */}
      <section className="w-full bg-[#0E1424] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Copy & 3 Expanded Bullets (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-[#22C55E] animate-pulse" />
                <span>FLAGSHIP GSOC CORE ENGINE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                The SOC Dashboard: Central Nervous System of RedFort
              </h2>

              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                The SOC Dashboard converges all security signals into a unified operational console, giving security operations teams complete situational clarity across global facilities and hybrid cloud networks.
              </p>

              {/* 3 Expanded Bullets */}
              <div className="space-y-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#111827] border border-[#1F2937] flex items-center justify-between">
                  <span className="text-white font-semibold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                    <span>Real-Time Stream Convergence</span>
                  </span>
                  <span className="text-[#22C55E]">100k+ EPS</span>
                </div>

                <div className="p-3 rounded-lg bg-[#111827] border border-[#1F2937] flex items-center justify-between">
                  <span className="text-white font-semibold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                    <span>Cross-Domain Complex Event Processing</span>
                  </span>
                  <span className="text-[#F5762E]">&lt; 100ms CEP</span>
                </div>

                <div className="p-3 rounded-lg bg-[#111827] border border-[#1F2937] flex items-center justify-between">
                  <span className="text-white font-semibold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                    <span>Automated SOAR Playbook Execution</span>
                  </span>
                  <span className="text-blue-400">Zero Hand-off</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/products/soc-dashboard"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-mono font-bold text-xs transition-all shadow-md group cursor-pointer"
                >
                  <span>Explore SOC Dashboard Specs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: Dashboard Mockup (6 Cols) */}
            <div className="lg:col-span-6">
              <MockupDashboard interactive={true} />
            </div>

          </div>

        </div>
      </section>

      {/* 4. ADMIN & ORG CONTROLS */}
      <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 sm:p-12 shadow-xl space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B0F19] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
                <Settings className="w-3.5 h-3.5 text-[#F5762E]" />
                <span>GOVERNANCE & PLATFORM ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Built-in Multi-Tenant Organizational Governance
              </h2>
              <p className="text-sm text-[#94A3B8] max-w-3xl">
                RedFort provides administrators with granular governance controls to register regional facilities, establish security zone hierarchies, and enforce zero-trust policies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#1F2937]">
              
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1F2937] space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#111827] flex items-center justify-center text-[#F5762E] mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  Hierarchical Facilities & Campuses
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Register regional headquarters, campuses, and data centers with tailored clearance policies and automated barrier controls.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1F2937] space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#111827] flex items-center justify-center text-[#F5762E] mb-3">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  Workflow & Correlation Rules
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Customize cross-domain correlation rules, automated escalation trees, and emergency lockdown templates without code.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1F2937] space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#111827] flex items-center justify-center text-[#F5762E] mb-3">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  Platform Telemetry & Audit Logs
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Real-time visibility into ingestion pipeline uptime, API connector latency, and immutable cryptographic administrative audit trails.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. CTA BAND */}
      <CtaBand 
        headline="See any module in action."
        subhead="Book a customized walkthrough with our enterprise security architects tailored to your organization's facilities and threat profile."
        buttonText="Request a Demo"
        buttonLink="/request-demo"
        showBullets={true}
      />

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-[#0B0F19] text-white p-20 text-center font-mono">Loading Products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
