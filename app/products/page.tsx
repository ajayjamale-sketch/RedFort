'use strict';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Users,
  Sliders,
  Sparkles
} from 'lucide-react';
import MockupDashboard from '@/components/MockupDashboard';
import CtaBand from '@/components/CtaBand';
import { PRODUCT_MODULES } from '@/lib/siteData';

const moduleIcons: Record<string, React.ReactNode> = {
  'soc-dashboard': <Activity className="w-6 h-6 text-[#F5762E]" />,
  'cyber-threat-monitoring': <Cpu className="w-6 h-6 text-[#F5762E]" />,
  'physical-security': <Building2 className="w-6 h-6 text-[#F5762E]" />,
  'identity-access-control': <KeyRound className="w-6 h-6 text-[#F5762E]" />,
  'incident-response': <AlertTriangle className="w-6 h-6 text-[#F5762E]" />,
  'risk-vulnerability': <ShieldAlert className="w-6 h-6 text-[#F5762E]" />,
  'compliance-audit': <FileCheck2 className="w-6 h-6 text-[#F5762E]" />,
  'security-analytics': <BarChart3 className="w-6 h-6 text-[#F5762E]" />,
  'emergency-alerts': <BellRing className="w-6 h-6 text-[#F5762E]" />
};

export default function ProductsOverviewPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Monitoring', 'Physical', 'Response', 'Compliance', 'Analytics', 'Identity', 'Alerting'];

  const filteredModules = activeCategory === 'All' 
    ? PRODUCT_MODULES 
    : PRODUCT_MODULES.filter(m => m.category === activeCategory);

  return (
    <div className="w-full flex flex-col font-sans selection:bg-[#F5762E] selection:text-white">
      
      {/* 1. HERO SECTION [dark bg: #0B0F19] */}
      <section className="w-full bg-[#0B0F19] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>MODULAR ENTERPRISE ARCHITECTURE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Nine modules. One platform.
          </h1>

          <p className="text-base sm:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Every module in RedFort works on its own — and works better together.
          </p>

        </div>
      </section>

      {/* 2. FULL PRODUCT GRID [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          {/* Filter / Tag Row at Top */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#0B0F19] text-white shadow-sm'
                    : 'bg-white border border-[#E2E8F0] text-[#475569] hover:text-[#0B0F19] hover:border-[#0B0F19]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 9 Product Cards (Large) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredModules.map((mod) => (
              <Link
                key={mod.id}
                href={`/products/${mod.slug}`}
                className="group bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm hover:shadow-md hover:border-[#F5762E] transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-[#0B0F19] flex items-center justify-center">
                      {moduleIcons[mod.id] || <Shield className="w-6 h-6 text-[#F5762E]" />}
                    </div>
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#F1F5F9] text-[#475569] uppercase">
                      {mod.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#0B0F19] group-hover:text-[#F5762E] transition-colors mb-1">
                      {mod.name}
                    </h3>
                    <div className="text-xs font-mono text-[#F5762E] font-medium mb-3">
                      {mod.tagline}
                    </div>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      {mod.shortDescription}
                    </p>
                  </div>

                  <div className="pt-2 space-y-2 border-t border-[#F1F5F9]">
                    <div className="text-[11px] font-mono text-[#475569] uppercase font-semibold">Key Capabilities:</div>
                    {mod.requirements.map((req, idx) => (
                      <div key={idx} className="text-xs text-[#0B0F19] flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5762E] mt-1.5 shrink-0"></span>
                        <span className="line-clamp-1">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#0B0F19] font-bold group-hover:text-[#F5762E]">
                  <span>Explore Module Specs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 3. FEATURED MODULE DEEP-DIVE — SOC DASHBOARD [dark bg: #0B0F19] */}
      <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Copy & 3 Expanded Bullets (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-mono text-[#F5762E] font-semibold uppercase tracking-wider">
                FLAGSHIP CORE ENGINE
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Start here: the SOC Dashboard
              </h2>

              <p className="text-base text-[#94A3B8] leading-relaxed">
                The SOC Dashboard is the central nervous system of RedFort. It converges all telemetry streams into one coherent operational interface, giving security teams complete situational clarity across global facilities and hybrid cloud networks.
              </p>

              {/* 3 Expanded Bullets */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3 text-sm text-[#94A3B8]">
                  <div className="w-2 h-2 rounded-full bg-[#F5762E] mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-white">Centralized monitoring:</strong> Real-time streaming visibility into every active threat, physical breach, and GRC compliance finding from a unified GSOC console.
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm text-[#94A3B8]">
                  <div className="w-2 h-2 rounded-full bg-[#F5762E] mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-white">Live asset status:</strong> Continuous operational health tracking for firewalls, server racks, biometric readers, cameras, and physical perimeter alarms.
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm text-[#94A3B8]">
                  <div className="w-2 h-2 rounded-full bg-[#F5762E] mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-white">Entry point into every other module:</strong> Single-click drill-down into SOAR playbooks, CCTV video playback, visitor logs, and compliance audit packages.
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/products/soc-dashboard"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-semibold text-sm transition-all shadow-md group"
                >
                  <span>Explore SOC Dashboard</span>
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

      {/* 4. ADMIN & ORG CONTROLS [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 sm:p-12 shadow-sm space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E2E8F0] text-[#0B0F19] text-xs font-mono font-semibold uppercase tracking-wider">
                <Settings className="w-3.5 h-3.5 text-[#F5762E]" />
                <span>GOVERNANCE & CONFIGURATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B0F19]">
                Built-in administration & organizational governance
              </h2>
              <p className="text-sm sm:text-base text-[#475569] max-w-3xl">
                RedFort provides administrators with deep governance controls to manage tenants, configure automated response runbooks, and monitor entire platform telemetry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E2E8F0]">
              
              <div className="space-y-2">
                <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E] mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B0F19]">
                  Manage Organizations & Facilities
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Register regional headquarters, campuses, and data centers. Establish security zone boundaries and enforce strict role-based access control (RBAC).
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E] mb-3">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B0F19]">
                  Configure Workflows & Alert Rules
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Customize complex correlation rules, automated escalation trees, notification channels, and emergency lockdown templates without code.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E] mb-3">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B0F19]">
                  Monitor Platform Health & Audits
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Real-time visibility into ingestion pipeline uptime, API connector latency, and immutable cryptographic administrative audit trails.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. CTA BAND [dark] */}
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
