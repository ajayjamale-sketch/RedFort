'use strict';
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Cpu, 
  Building2, 
  KeyRound, 
  AlertTriangle, 
  ShieldAlert, 
  FileCheck2, 
  BarChart3, 
  BellRing,
  Users,
  Clock,
  Radio,
  Lock,
  ChevronRight,
  Zap,
  Server,
  Layers,
  Database,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { ProductModule, PRODUCT_MODULES } from '@/lib/siteData';
import CtaBand from '@/components/CtaBand';

interface ModuleVisualConfig {
  slug: string;
  imageSrc: string;
  imageAlt: string;
  hudBadge: string;
  telemetryStream: {
    source: string;
    event: string;
    status: string;
    badgeColor: string;
  }[];
}

const MODULE_VISUALS_DATA: Record<string, ModuleVisualConfig> = {
  'soc-dashboard': {
    slug: 'soc-dashboard',
    imageSrc: '/images/hero-gsoc.jpg',
    imageAlt: 'GSOC Command Center Operations Console',
    hudBadge: 'CORE TELEMETRY HUB // 100k+ EPS',
    telemetryStream: [
      { source: 'Global Ingest Pipeline (Kafka)', event: '124,500 EPS Normalized (0.00% Drop)', status: 'Active', badgeColor: 'text-[#22C55E]' },
      { source: 'Cross-Domain CEP Engine', event: 'Simultaneous Cyber + Turnstile Correlation', status: 'Correlated', badgeColor: 'text-[#F5762E]' },
      { source: 'Global Facility GIS Floorplan', event: '50 Regional Sites Nominal', status: 'Optimal', badgeColor: 'text-[#22C55E]' }
    ]
  },
  'cyber-threat-monitoring': {
    slug: 'cyber-threat-monitoring',
    imageSrc: '/images/hero-correlation.jpg',
    imageAlt: 'Threat Correlation Radar Simulation',
    hudBadge: 'MITRE ATT&CK RECON // < 100ms CEP',
    telemetryStream: [
      { source: 'AWS CloudTrail / Sentinel EDR', event: 'SSH Root Login from Foreign Subnet', status: 'Flagged', badgeColor: 'text-[#EF4444]' },
      { source: 'MITRE T1078.004 Classifier', event: 'Valid Accounts: Cloud Accounts Flagged', status: 'Tagged', badgeColor: 'text-amber-400' },
      { source: 'Network Packet Inspection', event: 'Core Switch SW-09 Link-Down Correlated', status: 'Matched', badgeColor: 'text-[#22C55E]' }
    ]
  },
  'physical-security': {
    slug: 'physical-security',
    imageSrc: '/images/hero-physical.jpg',
    imageAlt: 'Facility Physical Security & Checkpoint Access',
    hudBadge: 'ONVIF VMS & SMART PACS // 4K STREAM',
    telemetryStream: [
      { source: 'HQ Reception Speedlane B-04', event: 'NFC Badge Read #USR-8891 (Authorized)', status: 'Granted', badgeColor: 'text-[#22C55E]' },
      { source: 'Perimeter Laser Fence #02', event: 'Zero Vibration / Laser Grid Nominal', status: 'Secured', badgeColor: 'text-[#22C55E]' },
      { source: 'PTZ Dome Camera Matrix #19', event: 'Automated 4K Optical Tracking Active', status: 'Tracking', badgeColor: 'text-[#22C55E]' }
    ]
  },
  'identity-access-control': {
    slug: 'identity-access-control',
    imageSrc: '/images/solution-banking.jpg',
    imageAlt: 'Biometric Access Control & Vault Security',
    hudBadge: 'ZERO-TRUST IDP SYNC // 0.00s DELAY',
    telemetryStream: [
      { source: 'Okta IdP / Entra ID SCIM Connector', event: 'Contractor #USR-401 Deactivated', status: 'Propagated', badgeColor: 'text-[#22C55E]' },
      { source: 'Cleanroom North Gate Reader', event: 'Local Controller Badge Cache Cleared', status: 'Revoked', badgeColor: 'text-[#22C55E]' },
      { source: 'Visitor Self-Service Kiosk', event: 'QR Guest Pass Issued (Zone 2 Only)', status: 'Valid (4h)', badgeColor: 'text-blue-400' }
    ]
  },
  'incident-response': {
    slug: 'incident-response',
    imageSrc: '/images/resource-playbook.jpg',
    imageAlt: 'Autonomous SOAR Playbook Execution Console',
    hudBadge: 'AUTONOMOUS SOAR // 78% MTTR DROP',
    telemetryStream: [
      { source: 'Playbook #402: Breach Containment', event: 'EDR Host Quarantined (24ms)', status: 'Executed', badgeColor: 'text-[#22C55E]' },
      { source: 'Physical Door Relay Module', event: 'Server Vault Mag-Lockout Triggered (48ms)', status: 'Locked', badgeColor: 'text-[#22C55E]' },
      { source: 'GSOC Incident Commander', event: 'Duty Officer Dispatched via SMS (86ms)', status: 'Alerted', badgeColor: 'text-[#22C55E]' }
    ]
  },
  'risk-vulnerability': {
    slug: 'risk-vulnerability',
    imageSrc: '/images/resource-whitepaper.jpg',
    imageAlt: 'Risk & Vulnerability Architecture Blueprint',
    hudBadge: 'CVE TELEMETRY // REAL-TIME POSTURE',
    telemetryStream: [
      { source: 'Vulnerability Scanner Daemon', event: 'CVE-2026-9011 Patched on Edge Router', status: 'Resolved', badgeColor: 'text-[#22C55E]' },
      { source: 'Physical Security Zone Matrix', event: 'Zone 4 Fire Exit Sensor Test Passed', status: 'Compliant', badgeColor: 'text-[#22C55E]' },
      { source: 'Dynamic Risk Engine', event: 'Asset Criticality Index: 96.4/100', status: 'Optimal', badgeColor: 'text-[#22C55E]' }
    ]
  },
  'compliance-audit': {
    slug: 'compliance-audit',
    imageSrc: '/images/hero-executive.jpg',
    imageAlt: 'Executive Compliance & Audit Posture Dashboard',
    hudBadge: 'IMMUTABLE GRC // 100% AUDIT READY',
    telemetryStream: [
      { source: 'SOC 2 Type II Evidence Engine', event: 'Access Control Logs Exported to Vault', status: 'Certified', badgeColor: 'text-[#22C55E]' },
      { source: 'ISO 27001 Cryptographic Ledger', event: 'SHA-256 Audit Block #88910 Verified', status: 'Immutable', badgeColor: 'text-[#22C55E]' },
      { source: 'HIPAA ePHI Subnet Auditor', event: 'Zero Unauthorized Lateral Access Attempts', status: 'Compliant', badgeColor: 'text-[#22C55E]' }
    ]
  },
  'security-analytics': {
    slug: 'security-analytics',
    imageSrc: '/images/resource-threat-report.jpg',
    imageAlt: 'Security Analytics & Threat Intelligence Report',
    hudBadge: 'EXECUTIVE INTELLIGENCE // GRADE A+',
    telemetryStream: [
      { source: 'Cross-Facility Incident Heatmap', event: 'Global Dwell Time Reduced to 4.2 mins', status: 'Analyzed', badgeColor: 'text-[#22C55E]' },
      { source: 'Operator Fatigue AI Filter', event: '94% Alert Noise Suppressed', status: 'Optimized', badgeColor: 'text-[#22C55E]' },
      { source: 'Board Risk Reporting Generator', event: 'Monthly Security ROI PDF Ready', status: 'Generated', badgeColor: 'text-[#22C55E]' }
    ]
  },
  'emergency-alerts': {
    slug: 'emergency-alerts',
    imageSrc: '/images/solution-airports.jpg',
    imageAlt: 'Airport & Campus Mass Emergency Notification',
    hudBadge: 'MASS NOTIFICATION // < 500ms BROADCAST',
    telemetryStream: [
      { source: 'Campus Mass Siren Matrix', event: 'Sub-Second Acoustic Pulse Armed', status: 'Ready', badgeColor: 'text-[#22C55E]' },
      { source: 'Mobile Smartphone Push Broadcast', event: '50,000 Push Notifications Dispatched', status: 'Delivered', badgeColor: 'text-[#22C55E]' },
      { source: 'Evacuation Muster Sensor Grid', event: 'Zone 1 Safe Muster Headcount: 100%', status: 'Accounted', badgeColor: 'text-[#22C55E]' }
    ]
  }
};

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

interface ProductModulePageProps {
  module: ProductModule;
}

export default function ProductModulePage({ module }: ProductModulePageProps) {
  const visualConfig = MODULE_VISUALS_DATA[module.id] || MODULE_VISUALS_DATA['soc-dashboard'];
  
  const relatedModules = PRODUCT_MODULES.filter((m) => 
    module.relatedModuleSlugs.includes(m.slug)
  );

  return (
    <div className="w-full flex flex-col font-sans selection:bg-[#F5762E] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-[#0B0F19] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#F5762E]/10 blur-[140px] pointer-events-none rounded-full"></div>

        <div className="max-w-[1280px] mx-auto text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-[#22C55E] animate-pulse" />
            <span>REDFORT MODULE // {module.category.toUpperCase()}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
            {module.name}
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-normal">
            {module.shortDescription}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/request-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-semibold text-white bg-[#F5762E] hover:bg-[#FF9A5A] transition-all shadow-lg hover:shadow-orange-500/20 text-xs font-mono tracking-wide group cursor-pointer"
            >
              <span>Schedule Module Demo</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-white bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] transition-all text-xs font-mono cursor-pointer"
            >
              <span>View All 9 Modules</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. DEDICATED VISUAL & ARCHITECTURAL BREAKDOWN */}
      <section className="w-full bg-[#0E1424] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: 16:9 High-Res Visual Preview with HUD (6 Cols) */}
            <div className="lg:col-span-6 group relative rounded-2xl overflow-hidden border border-[#1F2937] hover:border-[#F5762E]/70 transition-all duration-500 shadow-2xl bg-[#0B0F19]">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={visualConfig.imageSrc}
                  alt={visualConfig.imageAlt}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80 pointer-events-none"></div>

                {/* Top HUD Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0B0F19]/90 backdrop-blur-md border border-[#1F2937] text-[10px] font-mono text-[#F5762E] font-bold flex items-center space-x-1.5">
                  <Radio className="w-3 h-3 text-[#22C55E] animate-pulse" />
                  <span>{visualConfig.hudBadge}</span>
                </div>

                {/* Bottom Metric Pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-[#0B0F19]/90 backdrop-blur-md border border-[#F5762E]/40 text-right">
                  <div className="text-[9px] font-mono text-[#94A3B8] uppercase">{module.metricLabel}</div>
                  <div className="text-base font-mono font-extrabold text-[#F5762E] leading-none">{module.metric}</div>
                </div>
              </div>
            </div>

            {/* Right: Live Telemetry Console Stream (6 Cols) */}
            <div className="lg:col-span-6 bg-[#111827] border border-[#1F2937] rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#1F2937]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0B0F19] border border-[#1F2937] flex items-center justify-center">
                    {moduleIcons[module.id] || <Shield className="w-5 h-5 text-[#F5762E]" />}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#94A3B8] uppercase">LIVE CONSOLE STREAM</div>
                    <div className="text-sm font-bold text-white">{module.name}</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 font-bold">
                  ACTIVE HUD
                </span>
              </div>

              {/* Dynamic Telemetry Rows */}
              <div className="space-y-2.5 font-mono text-xs">
                {visualConfig.telemetryStream.map((stream, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#0B0F19] border border-[#1F2937] space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#94A3B8] font-semibold">{stream.source}</span>
                      <span className={`font-bold text-[10px] ${stream.badgeColor}`}>{stream.status}</span>
                    </div>
                    <div className="text-xs text-white font-bold truncate">
                      {stream.event}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#1F2937] flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                <span>Audit Trail Integrity: <span className="text-[#22C55E] font-bold">SHA-256 Hashed</span></span>
                <span className="text-slate-400">Zero Ingestion Loss</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. DETAILED ARCHITECTURAL CAPABILITIES */}
      <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider">
              CORE FUNCTIONAL ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Built for high-consequence enterprise operations.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {module.expandedFeatures.map((feat, idx) => (
              <div 
                key={idx} 
                className="bg-[#111827] border border-[#1F2937] hover:border-[#F5762E]/70 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-[#0B0F19] text-[#F5762E] border border-[#1F2937] group-hover:border-[#F5762E]/50 font-mono text-xs font-bold flex items-center justify-center transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-[#22C55E] uppercase font-semibold">
                      ENGINEERED
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#F5762E] transition-colors leading-snug">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1F2937] flex items-center space-x-1.5 text-[11px] font-mono text-[#22C55E]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Continuous Automation Active</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. USER ROLES & DAY IN THE LIFE */}
      <section className="w-full bg-[#0E1424] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-semibold uppercase tracking-wider">
              OPERATIONAL WORKFLOW & USER ROLES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Who operates {module.name} and how it transforms response.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Primary Roles Card */}
            <div className="bg-[#111827] border border-[#1F2937] hover:border-[#F5762E]/60 rounded-2xl p-7 space-y-4 shadow-sm transition-all">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#0B0F19] border border-[#1F2937]">
                  <Users className="w-5 h-5 text-[#F5762E]" />
                </div>
                <h3 className="text-base font-bold text-white">Designated Operators</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-1">
                {module.primaryRoles.map((role, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-[#0B0F19] border border-[#1F2937] text-xs font-mono text-white font-medium">
                    {role}
                  </span>
                ))}
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed pt-1">
                {module.roleBenefit}
              </p>
            </div>

            {/* Day in the Life Framing */}
            <div className="bg-[#111827] border border-[#1F2937] hover:border-[#F5762E]/60 rounded-2xl p-7 space-y-4 shadow-sm transition-all">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#0B0F19] border border-[#1F2937]">
                  <Clock className="w-5 h-5 text-[#F5762E]" />
                </div>
                <h3 className="text-base font-bold text-white">A Day in the Life</h3>
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed italic">
                "{module.dayInTheLife}"
              </p>

              <div className="pt-2 text-xs font-mono text-[#22C55E] flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Zero manual spreadsheet tracking · Instant automated governance</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. RELATED ADJACENT MODULES */}
      <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider mb-2">
                UNIFIED INTEGRATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Works better together with adjacent engines.
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-mono text-[#F5762E] hover:text-[#FF9A5A] font-bold flex items-center space-x-1 cursor-pointer"
            >
              <span>View all 9 modules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedModules.map((rel) => {
              const relVisual = MODULE_VISUALS_DATA[rel.id] || MODULE_VISUALS_DATA['soc-dashboard'];

              return (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="group bg-[#111827] border border-[#1F2937] hover:border-[#F5762E]/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0B0F19] border-b border-[#1F2937]">
                    <Image
                      src={relVisual.imageSrc}
                      alt={relVisual.imageAlt}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#0B0F19]/90 border border-[#1F2937] text-[9px] font-mono text-[#F5762E] font-bold">
                      {rel.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-white group-hover:text-[#F5762E] transition-colors">
                        {rel.name}
                      </h3>
                      <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                        {rel.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#1F2937] flex items-center justify-between text-xs font-mono text-[#F5762E] font-bold group-hover:text-white transition-colors">
                      <span>Inspect Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. CTA BAND */}
      <CtaBand 
        headline={`See ${module.name} in action.`}
        subhead={`Experience how ${module.name} integrates seamlessly with your existing infrastructure and the rest of the RedFort platform.`}
        buttonText="Request a Demo"
        buttonLink="/request-demo"
        showBullets={true}
      />

    </div>
  );
}
