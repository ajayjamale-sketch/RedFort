'use strict';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Zap, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Radio, 
  Cpu, 
  Building2, 
  Lock, 
  FileCheck2, 
  Server,
  Play,
  RotateCcw
} from 'lucide-react';

export default function ValuePillarsSection() {
  const [activePlaybookStep, setActivePlaybookStep] = useState<number>(3);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setActivePlaybookStep(1);
    setTimeout(() => setActivePlaybookStep(2), 600);
    setTimeout(() => {
      setActivePlaybookStep(3);
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0] font-sans">
      <div className="max-w-[1280px] mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E2E8F0] text-[#0B0F19] text-xs font-mono font-semibold uppercase tracking-wider">
              <span>03 / ARCHITECTURAL FOUNDATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B0F19]">
              The three pillars of unified enterprise defense.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#475569] max-w-lg leading-relaxed">
            Engineered for global enterprises to ingest millions of cross-domain events, execute sub-second containment playbooks, and automate continuous board-level governance.
          </p>
        </div>

        {/* 3 Developer-Crafted Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* PILLAR 1: UNIFIED INGESTION ENGINE */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-6">
              
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#0B0F19] flex items-center justify-center text-[#F5762E] shadow-sm">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#E2E8F0] text-[#0B0F19] font-bold">
                  PILLAR 01
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#0B0F19] tracking-tight group-hover:text-[#F5762E] transition-colors">
                  Unified Signal Ingestion
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Ingests cyber logs, physical badge swipes, RTSP CCTV feeds, and IoT sensors into one normalized event stream.
                </p>
              </div>

              {/* Live Telemetry Stream Visualizer Widget */}
              <div className="bg-[#0B0F19] rounded-xl p-4 text-white font-mono text-xs space-y-2.5 border border-[#1F2937] shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-[#1F2937] text-[10px] text-[#94A3B8]">
                  <span className="flex items-center space-x-1.5 text-white font-semibold">
                    <Radio className="w-3 h-3 text-[#22C55E] animate-pulse" />
                    <span>MULTI-SOURCE INGEST FEED</span>
                  </span>
                  <span className="text-[#22C55E]">124.5k EPS</span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between p-1.5 rounded bg-[#111827] border border-[#1F2937]/80">
                    <span className="text-[#F5762E] font-semibold flex items-center space-x-1">
                      <Cpu className="w-3 h-3" />
                      <span>SIEM / EDR Stream</span>
                    </span>
                    <span className="text-slate-300">58.4k EPS</span>
                  </div>

                  <div className="flex items-center justify-between p-1.5 rounded bg-[#111827] border border-[#1F2937]/80">
                    <span className="text-blue-400 font-semibold flex items-center space-x-1">
                      <Building2 className="w-3 h-3" />
                      <span>PACS Reader Grid</span>
                    </span>
                    <span className="text-slate-300">31.9k EPS</span>
                  </div>

                  <div className="flex items-center justify-between p-1.5 rounded bg-[#111827] border border-[#1F2937]/80">
                    <span className="text-purple-400 font-semibold flex items-center space-x-1">
                      <Server className="w-3 h-3" />
                      <span>CCTV & Environmental</span>
                    </span>
                    <span className="text-slate-300">34.2k EPS</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1F2937] flex items-center justify-between text-[10px] text-[#94A3B8]">
                  <span>Buffer Drop Rate: <span className="text-[#22C55E] font-bold">0.00%</span></span>
                  <span className="text-slate-400">Kafka / gRPC</span>
                </div>
              </div>

            </div>

            {/* Card Footer */}
            <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex items-center justify-between">
              <Link
                href="/products/soc-dashboard"
                className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#0B0F19] group-hover:text-[#F5762E] transition-colors"
              >
                <span>Inspect Ingestion Architecture</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* PILLAR 2: AUTONOMOUS SOAR ORCHESTRATION */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-6">
              
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#0B0F19] flex items-center justify-center text-[#F5762E] shadow-sm">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#E2E8F0] text-[#0B0F19] font-bold">
                  PILLAR 02
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#0B0F19] tracking-tight group-hover:text-[#F5762E] transition-colors">
                  Autonomous SOAR Response
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Executes dual-domain response playbooks instantly to isolate hosts, lock physical perimeters, and notify responders.
                </p>
              </div>

              {/* Interactive SOAR Execution Pipeline Widget */}
              <div className="bg-[#0B0F19] rounded-xl p-4 text-white font-mono text-xs space-y-2.5 border border-[#1F2937] shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-[#1F2937] text-[10px]">
                  <span className="text-[#F5762E] font-bold uppercase">
                    PLAYBOOK #402: BREACH CONTAINMENT
                  </span>
                  <button
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-[#1F2937] hover:bg-[#374151] text-[#22C55E] text-[10px] font-semibold transition-all"
                  >
                    {isSimulating ? (
                      <RotateCcw className="w-2.5 h-2.5 animate-spin" />
                    ) : (
                      <Play className="w-2.5 h-2.5" />
                    )}
                    <span>{isSimulating ? 'Running...' : 'Simulate'}</span>
                  </button>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  {/* Step 1 */}
                  <div className={`p-1.5 rounded flex items-center justify-between border transition-all ${
                    activePlaybookStep >= 1 
                      ? 'bg-[#111827] border-[#22C55E]/50 text-white' 
                      : 'bg-[#111827]/40 border-transparent text-[#64748B]'
                  }`}>
                    <span className="flex items-center space-x-1.5">
                      <CheckCircle2 className={`w-3 h-3 ${activePlaybookStep >= 1 ? 'text-[#22C55E]' : 'text-[#64748B]'}`} />
                      <span>1. EDR Host Network Isolation</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#22C55E]">24ms</span>
                  </div>

                  {/* Step 2 */}
                  <div className={`p-1.5 rounded flex items-center justify-between border transition-all ${
                    activePlaybookStep >= 2 
                      ? 'bg-[#111827] border-[#22C55E]/50 text-white' 
                      : 'bg-[#111827]/40 border-transparent text-[#64748B]'
                  }`}>
                    <span className="flex items-center space-x-1.5">
                      <CheckCircle2 className={`w-3 h-3 ${activePlaybookStep >= 2 ? 'text-[#22C55E]' : 'text-[#64748B]'}`} />
                      <span>2. Server Vault Mag-Lockout</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#22C55E]">48ms</span>
                  </div>

                  {/* Step 3 */}
                  <div className={`p-1.5 rounded flex items-center justify-between border transition-all ${
                    activePlaybookStep >= 3 
                      ? 'bg-[#111827] border-[#22C55E]/50 text-white' 
                      : 'bg-[#111827]/40 border-transparent text-[#64748B]'
                  }`}>
                    <span className="flex items-center space-x-1.5">
                      <CheckCircle2 className={`w-3 h-3 ${activePlaybookStep >= 3 ? 'text-[#22C55E]' : 'text-[#64748B]'}`} />
                      <span>3. GSOC & Field Dispatch SMS</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#22C55E]">86ms</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1F2937] flex items-center justify-between text-[10px] text-[#94A3B8]">
                  <span>Trigger Time: <span className="text-[#F5762E] font-bold">&lt; 100ms</span></span>
                  <span className="text-[#22C55E] font-bold">78% MTTR Drop</span>
                </div>
              </div>

            </div>

            {/* Card Footer */}
            <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex items-center justify-between">
              <Link
                href="/products/incident-response"
                className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#0B0F19] group-hover:text-[#F5762E] transition-colors"
              >
                <span>Explore SOAR Playbooks</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* PILLAR 3: ACTIONABLE INTELLIGENCE & GOVERNANCE */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-6">
              
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#0B0F19] flex items-center justify-center text-[#F5762E] shadow-sm">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#E2E8F0] text-[#0B0F19] font-bold">
                  PILLAR 03
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#0B0F19] tracking-tight group-hover:text-[#F5762E] transition-colors">
                  Actionable Risk Intelligence
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Translates millions of low-level logs into continuous compliance postures and board-ready risk dashboards.
                </p>
              </div>

              {/* Executive Posture & Compliance Widget */}
              <div className="bg-[#0B0F19] rounded-xl p-4 text-white font-mono text-xs space-y-2.5 border border-[#1F2937] shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-[#1F2937] text-[10px]">
                  <span className="text-[#94A3B8] font-bold uppercase">ENTERPRISE POSTURE</span>
                  <span className="text-[#22C55E] font-bold">GRADE A+ (94/100)</span>
                </div>

                {/* Score Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-[#94A3B8]">
                    <span>Global Security Index</span>
                    <span className="text-white font-bold">94.2%</span>
                  </div>
                  <div className="w-full bg-[#111827] h-2 rounded-full overflow-hidden border border-[#1F2937]">
                    <div className="bg-gradient-to-r from-[#F5762E] to-[#22C55E] h-full w-[94%] rounded-full"></div>
                  </div>
                </div>

                {/* Framework Compliance Chips */}
                <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
                  <div className="p-1.5 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-between">
                    <span className="text-slate-300">SOC 2 Type II</span>
                    <span className="text-[#22C55E] font-bold">100%</span>
                  </div>
                  <div className="p-1.5 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-between">
                    <span className="text-slate-300">ISO 27001</span>
                    <span className="text-[#22C55E] font-bold">Pass</span>
                  </div>
                  <div className="p-1.5 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-between">
                    <span className="text-slate-300">NIST 800-53</span>
                    <span className="text-[#22C55E] font-bold">98.4%</span>
                  </div>
                  <div className="p-1.5 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-between">
                    <span className="text-slate-300">GDPR / HIPAA</span>
                    <span className="text-[#22C55E] font-bold">Active</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1F2937] flex items-center justify-between text-[10px] text-[#94A3B8]">
                  <span>Evidence Package: <span className="text-white font-semibold">1-Click PDF</span></span>
                  <span className="text-[#22C55E] font-bold">Audit Ready</span>
                </div>
              </div>

            </div>

            {/* Card Footer */}
            <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex items-center justify-between">
              <Link
                href="/products/compliance-audit"
                className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#0B0F19] group-hover:text-[#F5762E] transition-colors"
              >
                <span>View Compliance Mapping</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
