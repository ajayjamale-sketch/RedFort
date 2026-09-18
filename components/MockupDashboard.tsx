'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Activity, 
  Cpu, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  Eye, 
  Lock, 
  MapPin, 
  Server, 
  Wifi, 
  UserCheck, 
  Clock,
  ChevronRight,
  Terminal
} from 'lucide-react';

interface MockupDashboardProps {
  initialTab?: 'all' | 'cyber' | 'physical' | 'incidents';
  interactive?: boolean;
}

export default function MockupDashboard({
  initialTab = 'all',
  interactive = true
}: MockupDashboardProps) {
  const [selectedTab, setSelectedTab] = useState<'all' | 'cyber' | 'physical' | 'incidents'>(initialTab);
  const [tickerIndex, setTickerIndex] = useState(0);

  const mockEvents = [
    {
      id: 'EVT-9042',
      time: '14:23:08 UTC',
      type: 'CORRELATED ANOMALY',
      severity: 'CRITICAL',
      source: 'NYC Campus · Server Room 4B',
      detail: 'Impossible Physical Travel: London badge swipe vs Tokyo SSH root auth',
      action: 'Automated Host Quarantine (84ms)'
    },
    {
      id: 'EVT-9041',
      time: '14:22:45 UTC',
      type: 'PHYSICAL ACCESS',
      severity: 'RESOLVED',
      source: 'Zurich Tech Lab · Turnstile 02',
      detail: 'Visitor QR Pass Verified: ID #VIS-489 (Host: E. Rostova)',
      action: 'Guest Pass Active (4h remaining)'
    },
    {
      id: 'EVT-9040',
      time: '14:21:12 UTC',
      type: 'CYBER SIEM',
      severity: 'WARNING',
      source: 'Global Cloud AWS-US-EAST',
      detail: 'Privileged IAM token generation outside normal operational window',
      action: 'MFA Step-Up Triggered'
    },
    {
      id: 'EVT-9039',
      time: '14:19:50 UTC',
      type: 'CCTV VMS',
      severity: 'NORMAL',
      source: 'Chicago Logistics · Dock Gate 08',
      detail: 'Automated License Plate Recognition (LPR) verified freight carrier #TRK-881',
      action: 'Gate Barrier Auto-Open'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % mockEvents.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [mockEvents.length]);

  return (
    <div className="w-full bg-[#0B0F19] border border-[#1F2937] rounded-xl shadow-2xl overflow-hidden text-left font-sans">
      
      {/* Top Console Bar */}
      <div className="bg-[#111827] px-4 py-3 border-b border-[#1F2937] flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]/80"></span>
          </div>
          <div className="h-4 w-[1px] bg-[#1F2937]"></div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#94A3B8]">
            <Radio className="w-3.5 h-3.5 text-[#22C55E] animate-pulse" />
            <span className="text-white font-semibold">REDFORT GSOC CLUSTER // ALPHA-01</span>
            <span className="text-[#94A3B8] hidden sm:inline">[LIVE STREAM: 4,820 EPS]</span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        {interactive && (
          <div className="flex items-center space-x-1 bg-[#0B0F19] p-0.5 rounded-lg border border-[#1F2937] text-[11px] font-mono">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedTab === 'all' ? 'bg-[#F5762E] text-white font-bold' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Unified View
            </button>
            <button
              onClick={() => setSelectedTab('cyber')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedTab === 'cyber' ? 'bg-[#F5762E] text-white font-bold' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Cyber SIEM
            </button>
            <button
              onClick={() => setSelectedTab('physical')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedTab === 'physical' ? 'bg-[#F5762E] text-white font-bold' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Physical PACS
            </button>
          </div>
        )}
      </div>

      {/* Main Grid Dashboard */}
      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 bg-[#0B0F19]">
        
        {/* Left Column: Posture Stats & Spatial Map (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Posture Score Metric Card */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">Enterprise Security Posture</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 font-semibold">
                AUDIT READY
              </span>
            </div>
            
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight">96.4%</span>
              <span className="text-xs text-[#22C55E] font-mono">+3.8% vs last 30d</span>
            </div>

            {/* Sub-scores */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#1F2937] text-center font-mono">
              <div className="bg-[#0B0F19] p-2 rounded border border-[#1F2937]">
                <div className="text-[10px] text-[#94A3B8]">CYBER</div>
                <div className="text-xs text-white font-bold">98.1%</div>
              </div>
              <div className="bg-[#0B0F19] p-2 rounded border border-[#1F2937]">
                <div className="text-[10px] text-[#94A3B8]">PHYSICAL</div>
                <div className="text-xs text-[#F5762E] font-bold">94.8%</div>
              </div>
              <div className="bg-[#0B0F19] p-2 rounded border border-[#1F2937]">
                <div className="text-[10px] text-[#94A3B8]">GRC AUDIT</div>
                <div className="text-xs text-[#22C55E] font-bold">100%</div>
              </div>
            </div>
          </div>

          {/* Spatial Facility Map Simulation */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#94A3B8] flex items-center space-x-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#F5762E]" />
                <span>FACILITY: NYC HEADQUARTERS · LEVEL 4</span>
              </span>
              <span className="text-[10px] font-mono text-[#22C55E]">24 SENSORS ACTIVE</span>
            </div>

            {/* Interactive SVG Floorplan Graphic */}
            <div className="w-full h-36 bg-[#0B0F19] rounded border border-[#1F2937] p-2 relative flex items-center justify-center">
              <svg viewBox="0 0 300 120" className="w-full h-full text-[#1F2937]">
                {/* Floor boundaries */}
                <rect x="10" y="10" width="280" height="100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <rect x="25" y="25" width="80" height="70" fill="none" stroke="currentColor" strokeWidth="1" />
                <rect x="115" y="25" width="90" height="40" fill="none" stroke="currentColor" strokeWidth="1" />
                <rect x="115" y="70" width="90" height="25" fill="none" stroke="currentColor" strokeWidth="1" />
                <rect x="215" y="25" width="60" height="70" fill="none" stroke="currentColor" strokeWidth="1" />
                
                {/* Sensor nodes */}
                <circle cx="65" cy="60" r="4" fill="#22C55E" />
                <circle cx="160" cy="45" r="4" fill="#22C55E" />
                <circle cx="160" cy="82" r="5" fill="#EF4444" className="animate-ping" />
                <circle cx="160" cy="82" r="4" fill="#EF4444" />
                <circle cx="245" cy="60" r="4" fill="#22C55E" />

                {/* Text overlays in SVG */}
                <text x="35" y="40" fill="#94A3B8" fontSize="6" fontFamily="monospace">EXECUTIVE SUITE</text>
                <text x="125" y="40" fill="#94A3B8" fontSize="6" fontFamily="monospace">CLEANROOM LAB</text>
                <text x="125" y="86" fill="#EF4444" fontSize="6" fontFamily="monospace" fontWeight="bold">SERVER ROOM 4B [ALARM]</text>
                <text x="225" y="40" fill="#94A3B8" fontSize="6" fontFamily="monospace">CHECKPOINT 01</text>
              </svg>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
              <span className="flex items-center space-x-1 text-[#EF4444]">
                <AlertTriangle className="w-3 h-3" />
                <span>Zone 4B: Unauthorized Access Flag</span>
              </span>
              <span className="text-white">PTZ Cam #04 Auto-Tracking</span>
            </div>
          </div>

        </div>

        {/* Right Column: Live Correlated Threat Feed (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#1F2937]">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-[#F5762E]" />
                  <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                    Correlated Threat Telemetry Feed
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#94A3B8]">Sub-second CEP</span>
              </div>

              {/* Event Cards */}
              <div className="space-y-2.5 mt-3">
                {mockEvents.map((evt, idx) => (
                  <div
                    key={evt.id}
                    className={`p-3 rounded border transition-all ${
                      idx === tickerIndex 
                        ? 'bg-[#0B0F19] border-[#F5762E]/60 ring-1 ring-[#F5762E]/30' 
                        : 'bg-[#0B0F19]/60 border-[#1F2937]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <div className="flex items-center space-x-2">
                        <span className={`px-1.5 py-0.2 rounded font-bold ${
                          evt.severity === 'CRITICAL' ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40' :
                          evt.severity === 'WARNING' ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40' :
                          'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40'
                        }`}>
                          {evt.severity}
                        </span>
                        <span className="text-white font-semibold">{evt.id}</span>
                        <span className="text-[#94A3B8]">[{evt.type}]</span>
                      </div>
                      <span className="text-[#94A3B8] flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{evt.time}</span>
                      </span>
                    </div>

                    <div className="text-xs text-[#E2E8F0] font-medium mt-1">
                      {evt.detail}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mt-2 pt-1.5 border-t border-[#1F2937]/50">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-[#F5762E]" />
                        <span>{evt.source}</span>
                      </span>
                      <span className="text-[#22C55E] font-semibold flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{evt.action}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Status Ticker */}
            <div className="mt-3 pt-3 border-t border-[#1F2937] flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
              <span className="flex items-center space-x-1 text-[#22C55E]">
                <Shield className="w-3.5 h-3.5" />
                <span>SOAR Playbook Auto-Execution Active</span>
              </span>
              <span className="text-white hover:text-[#F5762E] cursor-pointer flex items-center space-x-1">
                <span>Investigate Case Room #882</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
