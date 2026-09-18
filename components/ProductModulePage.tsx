'use strict';
'use client';

import React from 'react';
import Link from 'next/link';
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
  ChevronRight
} from 'lucide-react';
import { ProductModule, PRODUCT_MODULES } from '@/lib/siteData';
import CtaBand from '@/components/CtaBand';

const moduleIcons: Record<string, React.ReactNode> = {
  'soc-dashboard': <Activity className="w-8 h-8 text-[#F5762E]" />,
  'cyber-threat-monitoring': <Cpu className="w-8 h-8 text-[#F5762E]" />,
  'physical-security': <Building2 className="w-8 h-8 text-[#F5762E]" />,
  'identity-access-control': <KeyRound className="w-8 h-8 text-[#F5762E]" />,
  'incident-response': <AlertTriangle className="w-8 h-8 text-[#F5762E]" />,
  'risk-vulnerability': <ShieldAlert className="w-8 h-8 text-[#F5762E]" />,
  'compliance-audit': <FileCheck2 className="w-8 h-8 text-[#F5762E]" />,
  'security-analytics': <BarChart3 className="w-8 h-8 text-[#F5762E]" />,
  'emergency-alerts': <BellRing className="w-8 h-8 text-[#F5762E]" />
};

interface ProductModulePageProps {
  module: ProductModule;
}

export default function ProductModulePage({ module }: ProductModulePageProps) {
  const relatedModules = PRODUCT_MODULES.filter((m) => 
    module.relatedModuleSlugs.includes(m.slug)
  );

  return (
    <div className="w-full flex flex-col font-sans selection:bg-[#F5762E] selection:text-white">
      
      {/* 1. HERO SECTION [dark bg: #0B0F19] */}
      <section className="relative w-full bg-[#0B0F19] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F5762E]/10 blur-[130px] pointer-events-none rounded-full"></div>

        <div className="max-w-[1280px] mx-auto text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span>REDFORT MODULE // {module.category.toUpperCase()}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            {module.name}
          </h1>

          <p className="text-base sm:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            {module.shortDescription}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/request-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded font-semibold text-white bg-[#F5762E] hover:bg-[#FF9A5A] transition-all shadow-lg hover:shadow-orange-500/20 text-sm tracking-wide group"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded font-semibold text-white bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] transition-all text-sm"
            >
              <span>All 9 Modules</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. DETAILED FEATURE BREAKDOWN [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider">
              CORE FUNCTIONAL REQUIREMENTS & ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
              Built for high-consequence enterprise operations.
            </h2>
          </div>

          {/* 3 Expanded Features Grid with Dashboard/Mockup Graphic */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: 3 Expanded Feature Paragraphs (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              {module.expandedFeatures.map((feat, idx) => (
                <div key={idx} className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-sm space-y-2">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="w-7 h-7 rounded-md bg-[#0B0F19] text-[#F5762E] font-mono text-xs font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0B0F19]">
                      {feat.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#475569] leading-relaxed pl-10">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right: Technical UI Mockup Graphic (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-[#0B0F19] border border-[#1F2937] rounded-xl p-6 shadow-2xl text-white space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-[#1F2937]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-center">
                      {moduleIcons[module.id] || <Shield className="w-5 h-5 text-[#F5762E]" />}
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#94A3B8]">LIVE TELEMETRY CARD</div>
                      <div className="text-sm font-bold text-white">{module.name}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 font-semibold">
                    ACTIVE
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-between">
                    <span className="text-[#94A3B8]">Operational Benchmark</span>
                    <span className="text-white font-bold">{module.metric}</span>
                  </div>
                  <div className="p-3 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-between">
                    <span className="text-[#94A3B8]">Performance Impact</span>
                    <span className="text-[#F5762E] font-bold">{module.metricLabel}</span>
                  </div>
                  <div className="p-3 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-between">
                    <span className="text-[#94A3B8]">Audit Trail Integrity</span>
                    <span className="text-[#22C55E] font-bold">SHA-256 Hashed</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1F2937] flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                  <span className="flex items-center space-x-1.5 text-[#22C55E]">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>Real-Time Stream Synchronized</span>
                  </span>
                  <span className="text-white">&lt; 10ms Latency</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. WHO USES THIS [dark bg: #0B0F19] */}
      <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-semibold uppercase tracking-wider">
              USER ROLES & DAY IN THE LIFE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Who uses {module.name} and how it transforms their workday.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Primary Roles Card */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-8 space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-[#F5762E]" />
                <h3 className="text-lg font-bold text-white">Designated User Roles</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {module.primaryRoles.map((role, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded bg-[#0B0F19] border border-[#1F2937] text-xs font-mono text-white">
                    {role}
                  </span>
                ))}
              </div>

              <p className="text-sm text-[#94A3B8] leading-relaxed pt-2">
                {module.roleBenefit}
              </p>
            </div>

            {/* Day in the Life Framing */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-8 space-y-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-[#F5762E]" />
                <h3 className="text-lg font-bold text-white">A Day in the Life</h3>
              </div>

              <p className="text-sm text-[#94A3B8] leading-relaxed italic">
                "{module.dayInTheLife}"
              </p>

              <div className="pt-2 text-xs font-mono text-[#22C55E] flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero manual spreadsheet tracking · Instant automated governance</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. RELATED MODULES [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider mb-2">
                UNIFIED INTEGRATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B0F19]">
                Works better together with adjacent modules.
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-mono text-[#0B0F19] hover:text-[#F5762E] font-bold flex items-center space-x-1"
            >
              <span>View all 9 modules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedModules.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="group bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#F5762E] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center">
                    {moduleIcons[rel.id] || <Shield className="w-5 h-5 text-[#F5762E]" />}
                  </div>
                  <h3 className="text-base font-bold text-[#0B0F19] group-hover:text-[#F5762E] transition-colors">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
                    {rel.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#0B0F19] font-bold group-hover:text-[#F5762E]">
                  <span>Explore module</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 5. CTA BAND [dark] */}
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
