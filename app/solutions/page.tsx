'use strict';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Radio, 
  AlertTriangle, 
  Lock, 
  FileCheck2, 
  Eye, 
  Activity,
  ChevronRight
} from 'lucide-react';
import { INDUSTRY_SOLUTIONS } from '@/lib/siteData';
import CtaBand from '@/components/CtaBand';

const industryIcons: Record<string, React.ReactNode> = {
  airports: <Plane className="w-6 h-6 text-[#F5762E]" />,
  banks: <Landmark className="w-6 h-6 text-[#F5762E]" />,
  hospitals: <Hospital className="w-6 h-6 text-[#F5762E]" />,
  government: <Building className="w-6 h-6 text-[#F5762E]" />,
  enterprises: <Layers className="w-6 h-6 text-[#F5762E]" />,
  manufacturing: <Factory className="w-6 h-6 text-[#F5762E]" />,
  'it-companies': <Server className="w-6 h-6 text-[#F5762E]" />,
  universities: <GraduationCap className="w-6 h-6 text-[#F5762E]" />,
  logistics: <Truck className="w-6 h-6 text-[#F5762E]" />,
  'smart-cities': <Building2 className="w-6 h-6 text-[#F5762E]" />
};

export default function SolutionsPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('airports');

  return (
    <div className="w-full flex flex-col font-sans selection:bg-[#F5762E] selection:text-white">
      
      {/* 1. HERO SECTION [dark bg: #0B0F19] */}
      <section className="relative w-full bg-[#0B0F19] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F5762E]/10 blur-[130px] pointer-events-none rounded-full"></div>

        <div className="max-w-[1280px] mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>INDUSTRY-SPECIFIC DEFENSE ARCHITECTURES</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Built for the sectors that can't afford blind spots.
          </h1>

          <p className="text-base sm:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            From airports to hospitals to banks, RedFort adapts to how your industry actually runs security.
          </p>
        </div>
      </section>

      {/* 2. INDUSTRY GRID [light bg: #F7F7F5] (10 cards) */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider">
              10 MISSION-CRITICAL SECTORS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
              Tailored for high-stakes operational environments.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRY_SOLUTIONS.map((ind) => (
              <div
                key={ind.id}
                id={ind.slug}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`bg-white border rounded-xl p-6 shadow-sm cursor-pointer transition-all flex flex-col justify-between ${
                  selectedIndustry === ind.id 
                    ? 'border-[#F5762E] ring-2 ring-[#F5762E]/20' 
                    : 'border-[#E2E8F0] hover:border-[#F5762E]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-[#0B0F19] flex items-center justify-center">
                      {industryIcons[ind.id] || <Building2 className="w-6 h-6 text-[#F5762E]" />}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#F5762E] bg-[#FFF5EE] px-2.5 py-1 rounded">
                      {ind.stats}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B0F19]">
                    {ind.name}
                  </h3>

                  <p className="text-xs text-[#475569] leading-relaxed">
                    {ind.oneLiner}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#0B0F19] font-semibold">
                  <span>{ind.statsLabel}</span>
                  <ChevronRight className="w-4 h-4 text-[#F5762E]" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. FEATURED INDUSTRY SPOTLIGHT — AIRPORTS [dark bg: #0B0F19] */}
      <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
                <Plane className="w-3.5 h-3.5" />
                <span>FEATURED SPOTLIGHT: AVIATION & CRITICAL TRANSIT</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Airports: where physical and cyber security can't afford a gap.
              </h2>

              <p className="text-base text-[#94A3B8] leading-relaxed">
                Airports operate at the extreme frontier of security complexity. A breached perimeter gate, an unauthorized badge tap at an airside door, or a ransomware attempt on flight information displays can paralyze international airspace and endanger thousands of lives.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded bg-[#111827] border border-[#1F2937] flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-[#F5762E] mt-2 shrink-0"></div>
                  <div>
                    <span className="text-sm font-semibold text-white">Checkpoint Management & Passenger Flow</span>
                    <p className="text-xs text-[#94A3B8]">Monitors security screening throughput, baggage IT telemetry, and automated biometric boarding gates from a centralized GSOC interface.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded bg-[#111827] border border-[#1F2937] flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-[#F5762E] mt-2 shrink-0"></div>
                  <div>
                    <span className="text-sm font-semibold text-white">4K CCTV Video Matrix with PTZ Auto-Tracking</span>
                    <p className="text-xs text-[#94A3B8]">Integrates thousands of ONVIF cameras with perimeter laser sensors, automatically pointing cameras at fence vibration alerts.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded bg-[#111827] border border-[#1F2937] flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E] mt-2 shrink-0"></div>
                  <div>
                    <span className="text-sm font-semibold text-white">Simultaneous Cyber-Physical Breach Correlation</span>
                    <p className="text-xs text-[#94A3B8]">If a tarmac door is breached while unauthorized administrative commands hit air traffic radar IT, RedFort triggers instant runway lockdown and first-responder dispatch.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Airport Simulation Graphic Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 shadow-2xl space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-[#1F2937]">
                  <div className="text-xs font-mono text-white font-bold flex items-center space-x-2">
                    <Plane className="w-4 h-4 text-[#F5762E]" />
                    <span>METRO INT'L AIRPORT // TERMINAL 3 GSOC</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#22C55E]/20 text-[#22C55E] font-semibold">
                    100% AIRSIDE SECURED
                  </span>
                </div>

                {/* SVG Visualizer */}
                <div className="w-full h-44 bg-[#0B0F19] rounded border border-[#1F2937] p-3 flex flex-col justify-between font-mono text-[10px]">
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>RUNWAY PERIMETER: 12.4 MILES</span>
                    <span className="text-[#22C55E]">NO INTRUSIONS</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 my-2">
                    <div className="p-2 rounded bg-[#111827] border border-[#1F2937]">
                      <div className="text-[#94A3B8]">TSA CHECKPOINTS</div>
                      <div className="text-white font-bold text-xs">24 LANES NOMINAL</div>
                    </div>
                    <div className="p-2 rounded bg-[#111827] border border-[#1F2937]">
                      <div className="text-[#94A3B8]">BAGGAGE SORT IT</div>
                      <div className="text-white font-bold text-xs">ZERO CYBER FLAGS</div>
                    </div>
                  </div>

                  <div className="text-xs text-[#F5762E] font-bold flex items-center space-x-1.5">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>Correlated Flight Ops Stream Active</span>
                  </div>
                </div>

                <div className="text-xs text-[#94A3B8] leading-relaxed">
                  Compliant with FAA, TSA, ICAO, and CISA cybersecurity and physical facility mandates.
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. COMPLIANCE ANGLE BY SECTOR [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider">
              REGULATORY & AUDIT GOVERNANCE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
              Compliance requirements by sector.
            </h2>
          </div>

          {/* 3-Column Callout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Banks */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E]">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0B0F19]">
                  Banks & Financial
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Regulatory reporting and immutable audit trails for PCI-DSS, GLBA, SOX, and SOC 2 Type II. Dual-custody vault logging and impossible travel detection on core transaction interfaces.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#0B0F19] font-bold">
                Frameworks: PCI-DSS · SOX · GLBA
              </div>
            </div>

            {/* Hospitals */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E]">
                  <Hospital className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0B0F19]">
                  Hospitals & Healthcare
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Compliance workflows for patient-safety, medical device network isolation, and electronic protected health information (ePHI) data protection under HIPAA and HITECH.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#0B0F19] font-bold">
                Frameworks: HIPAA · HITECH · OSHA
              </div>
            </div>

            {/* Government */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E]">
                  <Building className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0B0F19]">
                  Government & Defense
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Immutable audit logs and hardware-backed role-based access control (RBAC) for public-sector accountability, CAC/PIV credentials, and NIST 800-53 / FedRAMP compliance.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#0B0F19] font-bold">
                Frameworks: NIST 800-53 · FedRAMP · CJIS
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CTA BAND [dark] */}
      <CtaBand 
        headline="Find the right fit for your organization."
        subhead="Speak with an enterprise industry specialist to map RedFort capabilities directly against your sector's physical perimeters and cyber compliance mandates."
        buttonText="Request a Demo"
        buttonLink="/request-demo"
        showBullets={true}
      />

    </div>
  );
}
