  'use strict';
import React from 'react';
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
  Layers,
  Lock,
  CheckCircle2,
  Zap,
  DollarSign,
  Radio,
  Eye,
  Server,
  UserCheck,
  ChevronRight,
  Sparkles,
  Plane,
  Landmark,
  Hospital,
  Building,
  Factory,
  GraduationCap,
  Truck,
  Compass,
  FileSpreadsheet
} from 'lucide-react';
import MockupDashboard from '@/components/MockupDashboard';
import HeroCarousel from '@/components/HeroCarousel';
import LogoMarquee from '@/components/LogoMarquee';
import ProblemConvergenceSection from '@/components/ProblemConvergenceSection';
import TabsStories from '@/components/TabsStories';
import CtaBand from '@/components/CtaBand';
import { 
  PRODUCT_MODULES, 
  INDUSTRY_SOLUTIONS, 
  ROLE_DEFINITIONS, 
  TRUST_BADGES, 
  CLIENT_LOGOS 
} from '@/lib/siteData';

const moduleIcons: Record<string, React.ReactNode> = {
  'soc-dashboard': <Activity className="w-5 h-5 text-[#F5762E]" />,
  'cyber-threat-monitoring': <Cpu className="w-5 h-5 text-[#F5762E]" />,
  'physical-security': <Building2 className="w-5 h-5 text-[#F5762E]" />,
  'identity-access-control': <KeyRound className="w-5 h-5 text-[#F5762E]" />,
  'incident-response': <AlertTriangle className="w-5 h-5 text-[#F5762E]" />,
  'risk-vulnerability': <ShieldAlert className="w-5 h-5 text-[#F5762E]" />,
  'compliance-audit': <FileCheck2 className="w-5 h-5 text-[#F5762E]" />,
  'security-analytics': <BarChart3 className="w-5 h-5 text-[#F5762E]" />,
  'emergency-alerts': <BellRing className="w-5 h-5 text-[#F5762E]" />
};

export default function HomePage() {
  return (
    <div className="w-full flex flex-col font-sans selection:bg-[#F5762E] selection:text-white">
      
      {/* 1. HERO SECTION [dark bg: #0B0F19] */}
      <section className="relative w-full bg-[#0B0F19] pt-12 sm:pt-20 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937] overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#F5762E]/10 blur-[140px] pointer-events-none rounded-full"></div>

        <div className="max-w-[1280px] mx-auto text-center relative z-10 space-y-6 sm:space-y-8">
          
          {/* Monospace Eyebrow Tag */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-[#22C55E] animate-pulse" />
            <span>UNIFIED CYBER-PHYSICAL GSOC PLATFORM</span>
          </div>

          {/* Clean High-Impact Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
            One command center for every security signal — <span className="text-[#F5762E]">cyber, physical,</span> and compliance.
          </h1>

          {/* Focused Subhead */}
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl mx-auto leading-relaxed font-normal">
            RedFort unifies SOC monitoring, physical access control, CCTV systems, and incident response into a single operational dashboard — so nothing falls into a blind spot.
          </p>

          {/* High-Converting CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/request-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded font-semibold text-white bg-[#F5762E] hover:bg-[#FF9A5A] transition-all shadow-lg hover:shadow-orange-500/20 text-sm tracking-wide group"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/platform"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded font-semibold text-white bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] transition-all text-sm tracking-wide"
            >
              <span>See RedFort in Action</span>
            </Link>
          </div>

          {/* Premium Interactive Hero Carousel */}
          <div className="pt-8 sm:pt-12">
            <HeroCarousel />
          </div>

          {/* Continuous Infinite Logo Marquee */}
          <div className="pt-12 border-t border-[#1F2937]/60">
            <LogoMarquee />
          </div>

        </div>
      </section>

      {/* 2. PROBLEM FRAMING [dark bg, secondary: #111827] */}
      <ProblemConvergenceSection />

      {/* 3. THREE-PILLAR VALUE PROPOSITION [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E2E8F0] text-[#0B0F19] text-xs font-mono font-semibold uppercase tracking-wider">
              <span>CORE VALUE PILLARS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
              The three pillars of unified enterprise defense.
            </h2>
            <p className="text-base sm:text-lg text-[#475569]">
              Purpose-built architecture to ingest every event, trigger instantaneous containment, and provide board-ready risk intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Unified Signal View */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#0B0F19] flex items-center justify-center text-[#F5762E]">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0B0F19]">
                  Unified Signal View
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Every event in one dashboard, correlated across sources. Ingests cyber logs, PACS badge taps, CCTV motion triggers, and sensor feeds with sub-second latency.
                </p>
              </div>
              <div className="pt-6 border-t border-[#E2E8F0] mt-6 text-xs font-mono text-[#0B0F19] font-semibold flex items-center justify-between">
                <span>Ingestion: 100k+ EPS</span>
                <span className="text-[#22C55E]">Zero Data Loss</span>
              </div>
            </div>

            {/* Column 2: Automated Response */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#0B0F19] flex items-center justify-center text-[#F5762E]">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0B0F19]">
                  Automated Response
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Workflows and escalations trigger without manual handoffs. SOAR playbooks automatically isolate compromised hosts, lock critical doors, and notify emergency teams.
                </p>
              </div>
              <div className="pt-6 border-t border-[#E2E8F0] mt-6 text-xs font-mono text-[#0B0F19] font-semibold flex items-center justify-between">
                <span>Playbook Trigger: &lt; 100ms</span>
                <span className="text-[#F5762E]">78% MTTR Drop</span>
              </div>
            </div>

            {/* Column 3: Actionable Intelligence */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#0B0F19] flex items-center justify-center text-[#F5762E]">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0B0F19]">
                  Actionable Intelligence
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Risk scores, compliance posture, and security analytics in one place. Translates technical telemetry and audit findings into executive board reporting.
                </p>
              </div>
              <div className="pt-6 border-t border-[#E2E8F0] mt-6 text-xs font-mono text-[#0B0F19] font-semibold flex items-center justify-between">
                <span>Continuous GRC Mapping</span>
                <span className="text-[#22C55E]">100% Audit Ready</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. SOLUTIONS BY PROGRAM [dark bg: #0B0F19] (Ontic Tabs Stories) */}
      <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto space-y-8">
          
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-semibold uppercase tracking-wider">
              PROGRAM CAPABILITIES & STORIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Tailored capabilities for every domain of enterprise security.
            </h2>
          </div>

          {/* Interactive Ontic Tab Stories */}
          <TabsStories />

        </div>
      </section>

      {/* 5. PRODUCT GRID [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider mb-2">
                COMPLETE MODULAR ARSENAL
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
                Nine modules. One unified platform.
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center space-x-1 text-sm font-semibold text-[#0B0F19] hover:text-[#F5762E] transition-colors"
            >
              <span>Explore full product documentation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 9 Product Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_MODULES.map((mod) => (
              <Link
                key={mod.id}
                href={`/products/${mod.slug}`}
                className="group bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#F5762E] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#0B0F19] flex items-center justify-center">
                      {moduleIcons[mod.id] || <Shield className="w-5 h-5 text-[#F5762E]" />}
                    </div>
                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] font-medium">
                      {mod.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B0F19] group-hover:text-[#F5762E] transition-colors">
                    {mod.name}
                  </h3>

                  <p className="text-xs text-[#475569] leading-relaxed">
                    {mod.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#0B0F19] font-semibold group-hover:text-[#F5762E]">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Full-Width Anchor Tile */}
          <div className="bg-[#0B0F19] border border-[#1F2937] rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <div className="text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider">
                CENTRALIZED GOVERNANCE
              </div>
              <h3 className="text-2xl font-bold text-white">
                RedFort Platform — Govern the entire security program from one system
              </h3>
              <p className="text-sm text-[#94A3B8] max-w-2xl">
                Register offices, configure hierarchies, establish multi-tier clearance zones, and enforce zero-trust security policies across your global enterprise.
              </p>
            </div>
            <Link
              href="/platform"
              className="px-6 py-3.5 rounded bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-semibold text-sm transition-all whitespace-nowrap shadow-md"
            >
              Explore Platform
            </Link>
          </div>

        </div>
      </section>

      {/* 6. WHO REDFORT IS FOR [dark bg: #0B0F19] */}
      <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <div className="text-xs font-mono text-[#F5762E] font-semibold uppercase tracking-wider">
              TAILORED OPERATIONAL ROLES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Built for every stakeholder in the security lifecycle.
            </h2>
            <p className="text-base text-[#94A3B8]">
              Granular role-based views ensuring executives, analysts, field guards, auditors, and employees get exact situational context.
            </p>
          </div>

          {/* 5 Role Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* CSO */}
            <Link 
              href="/products/security-analytics"
              className="p-6 rounded-xl bg-[#111827] border border-[#1F2937] hover:border-[#F5762E] transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B0F19] border border-[#1F2937] flex items-center justify-center text-[#F5762E]">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-white group-hover:text-[#F5762E] transition-colors">
                  Chief Security Officer (CSO)
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Holistic posture metrics, enterprise risk exposure heatmaps, and board-level compliance ROI.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#1F2937] text-[11px] font-mono text-[#F5762E] flex items-center justify-between">
                <span>Security Analytics</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Security Analyst & IT Admin */}
            <Link 
              href="/products/soc-dashboard"
              className="p-6 rounded-xl bg-[#111827] border border-[#1F2937] hover:border-[#F5762E] transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B0F19] border border-[#1F2937] flex items-center justify-center text-[#F5762E]">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-white group-hover:text-[#F5762E] transition-colors">
                  Security Analyst & IT Admin
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Correlated multi-vector threat feeds, guided SOAR investigation playbooks, and asset health telemetry.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#1F2937] text-[11px] font-mono text-[#F5762E] flex items-center justify-between">
                <span>SOC Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Security Guard / Field Officer */}
            <Link 
              href="/products/physical-security"
              className="p-6 rounded-xl bg-[#111827] border border-[#1F2937] hover:border-[#F5762E] transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B0F19] border border-[#1F2937] flex items-center justify-center text-[#F5762E]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-white group-hover:text-[#F5762E] transition-colors">
                  Security Guard / Field Officer
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Mobile checkpoint badge verification, live CCTV alarm streams, and instant panic dispatches with floorplan routing.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#1F2937] text-[11px] font-mono text-[#F5762E] flex items-center justify-between">
                <span>Physical Security</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Compliance Auditor */}
            <Link 
              href="/products/compliance-audit"
              className="p-6 rounded-xl bg-[#111827] border border-[#1F2937] hover:border-[#F5762E] transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B0F19] border border-[#1F2937] flex items-center justify-center text-[#F5762E]">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-white group-hover:text-[#F5762E] transition-colors">
                  Compliance Auditor
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Read-only access to immutable audit logs, regulatory checklists, and one-click evidence package exports.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#1F2937] text-[11px] font-mono text-[#F5762E] flex items-center justify-between">
                <span>Compliance & Audit</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Employee */}
            <Link 
              href="/products/emergency-alerts"
              className="p-6 rounded-xl bg-[#111827] border border-[#1F2937] hover:border-[#F5762E] transition-all group flex flex-col justify-between md:col-span-2 lg:col-span-2"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B0F19] border border-[#1F2937] flex items-center justify-center text-[#F5762E]">
                  <BellRing className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-white group-hover:text-[#F5762E] transition-colors">
                  Enterprise Employee
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Digital NFC smartphone access badge, visitor self-service invites, emergency lockdown broadcasts, and evacuation muster safety check-ins.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#1F2937] text-[11px] font-mono text-[#F5762E] flex items-center justify-between">
                <span>Emergency Alerts & Mobile PACS</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>

          {/* Industry Name-Chips Strip */}
          <div className="pt-8 border-t border-[#1F2937] space-y-4">
            <div className="text-xs font-mono text-[#94A3B8] uppercase text-center">
              ADAPTED TO 10 MISSION-CRITICAL INDUSTRY SECTORS
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {INDUSTRY_SOLUTIONS.map((ind) => (
                <Link
                  key={ind.id}
                  href={`/solutions#${ind.slug}`}
                  className="px-3.5 py-1.5 rounded-full bg-[#111827] border border-[#1F2937] hover:border-[#F5762E] text-xs font-mono text-white/80 hover:text-white transition-all"
                >
                  {ind.name}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. TRUST, COMPLIANCE & FINAL CTA [light bg -> dark CTA band] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-8 text-center">
          
          <div className="text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider">
            ENTERPRISE TRUST & ZERO TRUST FOUNDATION
          </div>

          <p className="text-base sm:text-lg text-[#475569] max-w-3xl mx-auto font-medium">
            Built on end-to-end encryption, multi-factor authentication, role-based access control, and immutable audit logs.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4 max-w-4xl mx-auto">
            {TRUST_BADGES.map((badge, idx) => (
              <div key={idx} className="bg-white border border-[#E2E8F0] rounded-lg p-3 text-center shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#22C55E] mx-auto mb-1.5" />
                <div className="text-xs font-bold text-[#0B0F19]">{badge.name}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Standard CTA Band */}
      <CtaBand 
        headline="Fortify every asset. Secure every operation."
        subhead="Join leading enterprise security teams consolidating cyber defense, physical PACS, and compliance into a single operational command center."
        buttonText="Request a Demo"
        buttonLink="/request-demo"
        showBullets={true}
      />

    </div>
  );
}
