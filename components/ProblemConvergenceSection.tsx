'use strict';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Cpu, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Radio, 
  ArrowRight, 
  Lock, 
  Terminal, 
  Server, 
  Globe, 
  ShieldCheck, 
  XCircle,
  Activity,
  Layers,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface Scenario {
  id: string;
  tabLabel: string;
  badge: string;
  severity: 'CRITICAL' | 'HIGH' | 'ELEVATED';
  title: string;
  summary: string;
  
  // Cyber telemetry node
  cyber: {
    source: string;
    event: string;
    timestamp: string;
    ipOrAsset: string;
    status: string;
  };
  
  // Physical telemetry node
  physical: {
    source: string;
    event: string;
    timestamp: string;
    location: string;
    status: string;
  };

  // Correlation logic
  cepAnalysis: {
    delta: string;
    rule: string;
    anomalyMetric: string;
  };

  // Siloed vs RedFort metrics
  siloed: {
    mttd: string;
    status: string;
    verdict: string;
  };
  redfort: {
    mttr: string;
    status: string;
    actions: string[];
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: 'impossible-travel',
    tabLabel: 'Impossible Travel Anomaly',
    badge: 'IDENTITY EXPLOIT',
    severity: 'CRITICAL',
    title: 'Simultaneous Cyber Login & Physical Turnstile Tap',
    summary: 'Correlating cloud console access with turnstile telemetry eliminates credential sharing and session hijacking.',
    cyber: {
      source: 'AWS IAM / SSH Gateway',
      event: 'Root Console Login (SSH)',
      timestamp: '14:02:18 UTC',
      ipOrAsset: '185.34.11.2 (Tokyo, JP)',
      status: 'MFA Validated'
    },
    physical: {
      source: 'London HQ Turnstile B-04',
      event: 'Physical RFID Badge In',
      timestamp: '14:00:42 UTC',
      location: 'London, UK (Gate 4)',
      status: 'Access Granted'
    },
    cepAnalysis: {
      delta: 'Δt = 96 seconds',
      rule: 'RULE-GEO-709: Velocity > 5,900 mph',
      anomalyMetric: '5,912 mi / 96s'
    },
    siloed: {
      mttd: '4.2 Hours (Post-Incident)',
      status: 'UNCORRELATED',
      verdict: 'SIEM saw valid MFA; Physical saw valid badge. Zero cross-system alert.'
    },
    redfort: {
      mttr: '< 84ms',
      status: 'AUTO-CONTAINED',
      actions: ['Cloud Session Revoked', 'EDR Host Quarantined', 'Guard Post Alerted']
    }
  },
  {
    id: 'datacenter-breach',
    tabLabel: 'Datacenter Breach & Fiber Cut',
    badge: 'PHYSICAL INTRUSION',
    severity: 'CRITICAL',
    title: 'Forced Door Sensor Aligned with Switch Failure',
    summary: 'Cross-correlating optical door alarms with network dropouts identifies deliberate hardware tampering instantly.',
    cyber: {
      source: 'Core Switch SW-09 / DB Cluster',
      event: 'Interface eth0 Link Down',
      timestamp: '03:14:05 UTC',
      ipOrAsset: '10.0.4.12 (Primary SQL DB)',
      status: 'Link Lost'
    },
    physical: {
      source: 'Server Vault 4B Mag-Lock',
      event: 'Door Forced Open (DFO)',
      timestamp: '03:14:02 UTC',
      location: 'Frankfurt DC (Zone 3)',
      status: 'Optical Trip'
    },
    cepAnalysis: {
      delta: 'Δt = 3 seconds',
      rule: 'RULE-PHY-SEC-104: Mag-Lock Force + Switch Disconnect',
      anomalyMetric: 'Zone 3 Infrastructure Trip'
    },
    siloed: {
      mttd: '3.5 Hours (Shift Handover)',
      status: 'UNCORRELATED',
      verdict: 'IT blamed bad patch cable; Security assumed faulty door latch.'
    },
    redfort: {
      mttr: '< 112ms',
      status: 'AUTO-CONTAINED',
      actions: ['Corridor Airtight Lockout', 'PTZ 4K Camera Auto-Zoom', 'Rapid Response Dispatched']
    }
  },
  {
    id: 'terminated-contractor',
    tabLabel: 'Terminated Identity Tap',
    badge: 'ACCESS REVOCATION',
    severity: 'HIGH',
    title: 'Offboarded User Physical Badge Attempt',
    summary: 'Instantaneous synchronization between HR IdP and physical badge controllers closes access governance loopholes.',
    cyber: {
      source: 'Workday HR / Okta IdP',
      event: 'User Account Terminated',
      timestamp: '17:00:00 UTC',
      ipOrAsset: 'Contractor #USR-8821',
      status: 'Status: Deactivated'
    },
    physical: {
      source: 'Cleanroom Lab North Gate',
      event: 'RFID Badge Read Attempt',
      timestamp: '18:45:12 UTC',
      location: 'Austin R&D Facility',
      status: 'Local Controller Cache'
    },
    cepAnalysis: {
      delta: 'Δt = Instantaneous Zero-Trust',
      rule: 'RULE-IAM-SYNC: Global Badge Invalidation',
      anomalyMetric: 'Zero Sync Propagation Delay'
    },
    siloed: {
      mttd: 'Next Audit Cycle (30 Days)',
      status: 'UNCORRELATED',
      verdict: 'HR removed Okta access; un-synced local badge controller granted entry.'
    },
    redfort: {
      mttr: '< 18ms',
      status: 'AUTO-CONTAINED',
      actions: ['Badge Denied at Reader', 'Security Desk Alerted', 'GRC Audit Event Logged']
    }
  }
];

export default function ProblemConvergenceSection() {
  const [activeId, setActiveId] = useState<string>('impossible-travel');
  const active = SCENARIOS.find((s) => s.id === activeId) || SCENARIOS[0];

  return (
    <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937] font-sans relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#F5762E]/5 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-[1280px] mx-auto space-y-10 relative z-10">
        
        {/* Section Header: Punchy & High-Impact */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1F2937]">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#EF4444] text-xs font-mono font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse"></span>
              <span>02 / CROSS-DOMAIN TELEMETRY GAP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              The Multi-Vector Blind Spot
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#94A3B8] max-w-lg leading-relaxed">
            When cyber SIEM, physical PACS, and compliance tools run in silos, cross-domain threats bypass detection. RedFort correlates every signal with sub-second precision.
          </p>
        </div>

        {/* Interactive Scenario Switcher Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SCENARIOS.map((sc) => {
            const isSelected = sc.id === activeId;
            return (
              <button
                key={sc.id}
                onClick={() => setActiveId(sc.id)}
                className={`p-4 rounded-xl text-left transition-all border flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-[#111827] border-[#F5762E] shadow-lg shadow-orange-950/20'
                    : 'bg-[#111827]/40 border-[#1F2937] hover:border-[#1F2937]/80 hover:bg-[#111827]/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    isSelected ? 'bg-[#F5762E]/20 text-[#F5762E]' : 'bg-[#1F2937] text-[#94A3B8]'
                  }`}>
                    {sc.badge}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#F5762E] animate-ping' : 'bg-[#1F2937]'}`}></span>
                </div>
                <div className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-[#94A3B8]'}`}>
                  {sc.tabLabel}
                </div>
              </button>
            );
          })}
        </div>

        {/* Visual Telemetry Matrix & Topology Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: Real-Time Signal Convergence Topology (7 Cols) */}
          <div className="lg:col-span-7 bg-[#111827] border border-[#1F2937] rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl">
            
            {/* Topology Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1F2937]">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-[#F5762E]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  LIVE CORRELATION TOPOLOGY
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] font-mono text-[#22C55E]">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span>CEP ENGINE ONLINE</span>
              </div>
            </div>

            {/* Ingest Feeds Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Feed 1: Cyber Vector */}
              <div className="p-4 rounded-lg bg-[#0B0F19] border border-[#1F2937] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#F5762E] font-semibold flex items-center space-x-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>CYBER VECTOR</span>
                  </span>
                  <span className="text-[#64748B]">{active.cyber.timestamp}</span>
                </div>
                <div className="text-xs font-mono font-bold text-white">
                  {active.cyber.event}
                </div>
                <div className="text-[11px] font-mono text-[#94A3B8] truncate">
                  Src: {active.cyber.source}
                </div>
                <div className="text-[11px] font-mono text-[#64748B] truncate">
                  Target: {active.cyber.ipOrAsset}
                </div>
                <div className="pt-2 border-t border-[#1F2937] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#94A3B8]">Sensor State</span>
                  <span className="text-emerald-400 font-bold">{active.cyber.status}</span>
                </div>
              </div>

              {/* Feed 2: Physical Vector */}
              <div className="p-4 rounded-lg bg-[#0B0F19] border border-[#1F2937] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#F5762E] font-semibold flex items-center space-x-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>PHYSICAL VECTOR</span>
                  </span>
                  <span className="text-[#64748B]">{active.physical.timestamp}</span>
                </div>
                <div className="text-xs font-mono font-bold text-white">
                  {active.physical.event}
                </div>
                <div className="text-[11px] font-mono text-[#94A3B8] truncate">
                  Src: {active.physical.source}
                </div>
                <div className="text-[11px] font-mono text-[#64748B] truncate">
                  Loc: {active.physical.location}
                </div>
                <div className="pt-2 border-t border-[#1F2937] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#94A3B8]">Sensor State</span>
                  <span className="text-amber-400 font-bold">{active.physical.status}</span>
                </div>
              </div>

            </div>

            {/* Central CEP Correlation Rule Box */}
            <div className="p-4 rounded-lg bg-[#0B0F19] border border-[#F5762E]/40 relative overflow-hidden space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-2 text-[#F5762E] font-bold">
                  <Zap className="w-4 h-4 text-[#F5762E]" />
                  <span>COMPLEX EVENT PROCESSING (CEP) MATCH</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F5762E]/10 text-[#F5762E] font-bold">
                  {active.cepAnalysis.delta}
                </span>
              </div>
              <div className="text-xs font-mono text-white/90">
                {active.cepAnalysis.rule}
              </div>
              <div className="text-[11px] font-mono text-[#94A3B8]">
                Metric Trigger: <span className="text-white font-semibold">{active.cepAnalysis.anomalyMetric}</span>
              </div>
            </div>

            {/* Automated SOAR Action Stream */}
            <div className="p-4 rounded-lg bg-[#0B0F19] border border-[#22C55E]/30 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-1.5 text-[#22C55E] font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>AUTOMATED SOAR CONTAINMENT DISPATCH</span>
                </div>
                <span className="text-[10px] font-mono text-[#22C55E] font-bold">LATENCY: {active.redfort.mttr}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {active.redfort.actions.map((act, i) => (
                  <div key={i} className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#111827] border border-[#22C55E]/40 text-xs font-mono text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Outcome Comparison & Telemetry Benchmark (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Siloed Disconnected Outcome */}
            <div className="p-6 rounded-xl bg-[#111827] border border-[#EF4444]/30 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#EF4444]">
                  <XCircle className="w-4 h-4 text-[#EF4444]" />
                  <span>WITHOUT REDFORT (SILOED)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EF4444]/10 text-[#EF4444] font-bold">
                  {active.siloed.status}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-mono text-[#64748B] uppercase">Mean Time to Detect (MTTD)</div>
                <div className="text-2xl font-mono font-extrabold text-[#EF4444]">
                  {active.siloed.mttd}
                </div>
              </div>

              <div className="p-3 rounded bg-[#0B0F19] border border-[#1F2937] text-xs font-mono text-[#94A3B8] leading-relaxed">
                {active.siloed.verdict}
              </div>
            </div>

            {/* RedFort Unified Outcome */}
            <div className="p-6 rounded-xl bg-[#111827] border border-[#22C55E]/50 space-y-4 relative overflow-hidden shadow-lg shadow-emerald-950/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#22C55E]">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>WITH REDFORT CONVERGENCE</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] font-bold">
                  {active.redfort.status}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-mono text-[#64748B] uppercase">Mean Time to Respond (MTTR)</div>
                <div className="text-3xl font-mono font-extrabold text-[#22C55E] flex items-center space-x-2">
                  <span>{active.redfort.mttr}</span>
                  <span className="text-xs font-normal text-[#94A3B8] font-sans">Automated Execution</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1F2937] flex items-center justify-between">
                <div className="text-xs font-mono text-[#94A3B8]">
                  SOC Handshake: <span className="text-white font-bold">Instantaneous</span>
                </div>
                <Link
                  href="/platform"
                  className="inline-flex items-center space-x-1 text-xs font-mono text-[#F5762E] hover:text-[#FF9A5A] font-bold"
                >
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Platform Quick Link CTA Pill */}
            <div className="p-4 rounded-xl bg-[#111827]/40 border border-[#1F2937] flex items-center justify-between text-xs font-mono text-[#94A3B8]">
              <span>Zero-loss pipeline ingesting 100,000+ EPS</span>
              <span className="text-[#22C55E] font-bold">99.999% SLA</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
