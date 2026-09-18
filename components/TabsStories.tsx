'use strict';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Building2, 
  AlertTriangle, 
  FileCheck2, 
  ArrowRight, 
  Check, 
  Quote, 
  Shield, 
  Cpu, 
  Lock, 
  Zap,
  Clock,
  Radio,
  UserCheck
} from 'lucide-react';

interface TabStory {
  id: string;
  title: string;
  icon: React.ReactNode;
  productSlug: string;
  productName: string;
  eyebrow: string;
  headline: string;
  bullets: string[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
    company: string;
  };
  mockupGraphic: {
    title: string;
    badge: string;
    items: { label: string; value: string; status?: string }[];
  };
}

const TAB_STORIES: TabStory[] = [
  {
    id: 'soc-threat',
    title: 'SOC & Threat Monitoring',
    icon: <Activity className="w-4 h-4" />,
    productSlug: 'soc-dashboard',
    productName: 'SOC Dashboard',
    eyebrow: '01 / REAL-TIME SITUATIONAL AWARENESS',
    headline: 'Unified SOC Monitoring Across Cyber Infrastructure and Physical Perimeters',
    bullets: [
      'Security teams monitor all security events through a centralized dashboard with sub-second ingestion latency.',
      'Active threats, incidents, and alarms are classified automatically by severity to eradicate alert fatigue.',
      'Live operational status and telemetry health are available for every server, firewall, camera, and access reader.'
    ],
    testimonial: {
      quote: "Before RedFort, our SOC analysts were constantly context-switching across four disconnected tools. Unifying cyber telemetry with physical alarms reduced our critical triage response time from 45 minutes to 38 seconds.",
      name: "Arthur Pendelton",
      role: "Chief Information Security Officer",
      company: "AeroDynamics Global Defense"
    },
    mockupGraphic: {
      title: 'GSOC ACTIVE THREAT MATRIX',
      badge: 'STREAMING 12,400 EPS',
      items: [
        { label: 'Cloud EDR Telemetry', value: '4,812 Nodes Nominal', status: 'normal' },
        { label: 'Physical Checkpoints', value: '142 Turnstiles Active', status: 'normal' },
        { label: 'Correlated Incidents', value: '2 Active Triage Rooms', status: 'alert' },
        { label: 'MTTD / MTTR Index', value: '94% Faster vs Industry Avg', status: 'success' }
      ]
    }
  },
  {
    id: 'physical-access',
    title: 'Physical Security & Access Control',
    icon: <Building2 className="w-4 h-4" />,
    productSlug: 'physical-security',
    productName: 'Physical Security Management',
    eyebrow: '02 / SMART FACILITIES & VISITOR FLOW',
    headline: 'Manage Campuses, Biometric Gates, CCTV Streams, and Visitor Checkpoints',
    bullets: [
      'Organizations configure buildings, entry points, CCTV systems, alarms, and multi-tier security checkpoints.',
      'Visitor access is automated from digital pre-invitation to kiosk self-check-in, NDA execution, and QR pass issuance.',
      'Physical incidents and perimeter breaches are recorded with cryptographic timestamps and guard patrol notes.'
    ],
    testimonial: {
      quote: "Managing 18 hospital facilities with thousands of daily visitors used to be our largest security vulnerability. RedFort gave our field officers instant mobile verification and eliminated unauthorized pharmacy entries.",
      name: "Dr. Karen Lindqvist",
      role: "VP of Physical Security & Operations",
      company: "Apex Health Systems"
    },
    mockupGraphic: {
      title: 'PHYSICAL ACCESS GATEWAY // ZURICH',
      badge: 'ALL DOORS SECURED',
      items: [
        { label: 'Biometric Checkpoints', value: '38 Active Scanners', status: 'normal' },
        { label: 'Visitor Pass Requests', value: '124 Today · 0 Overstays', status: 'success' },
        { label: 'CCTV Camera Network', value: '196 ONVIF 4K Streams', status: 'normal' },
        { label: 'Perimeter Alarm State', value: 'Zero Breaches Detected', status: 'success' }
      ]
    }
  },
  {
    id: 'incident-response',
    title: 'Incident Response & SOAR',
    icon: <AlertTriangle className="w-4 h-4" />,
    productSlug: 'incident-response',
    productName: 'Incident Response Management',
    eyebrow: '03 / AUTOMATED ORCHESTRATION',
    headline: 'Automated Playbooks, Root-Cause Analysis, and Tamper-Proof Evidence Lockers',
    bullets: [
      'Security teams create, assign, investigate, and resolve incidents with guided step-by-step SOAR workflows.',
      'Incident workflows centralize packet captures, server logs, and CCTV video clips into SHA-256 hashed evidence packages.',
      'Multi-level escalation procedures and emergency lockdown triggers execute automatically based on threat score.'
    ],
    testimonial: {
      quote: "The automated playbooks saved us during an insider attempt. When a credential was used off-hours at an unusual terminal, RedFort locked the door and isolated the host before data exfiltration occurred.",
      name: "Marcus Sterling",
      role: "Director of Threat Response",
      company: "Nordic Trust Bank"
    },
    mockupGraphic: {
      title: 'AUTOMATED PLAYBOOK RUNNER',
      badge: 'INCIDENT #8824 RESOLVED',
      items: [
        { label: 'Containment Action', value: 'Host Isolated (12ms)', status: 'success' },
        { label: 'Physical Security Action', value: 'Corridor Lockdown Activated', status: 'alert' },
        { label: 'Evidence Preservation', value: 'CCTV + Syslog SHA-256 Hashed', status: 'success' },
        { label: 'Executive Escalation', value: 'CSO Notified via Encrypted SMS', status: 'normal' }
      ]
    }
  },
  {
    id: 'compliance-audit',
    title: 'Compliance & Audit Management',
    icon: <FileCheck2 className="w-4 h-4" />,
    productSlug: 'compliance-audit',
    productName: 'Compliance & Audit Management',
    eyebrow: '04 / CONTINUOUS REGULATORY GOVERNANCE',
    headline: 'Continuous Compliance Mapping for SOC 2, ISO 27001, HIPAA, and OSHA',
    bullets: [
      'Organizations continuously track compliance requirements and security audits across all digital and physical systems.',
      'Audit findings instantly generate prioritized corrective action tasks with accountability tracking and due dates.',
      'Auditor-ready reports support regulatory inspections and board oversight with zero manual spreadsheet gathering.'
    ],
    testimonial: {
      quote: "Preparing for our annual SOC 2 Type II and ISO 27001 audits used to take our compliance staff 6 weeks. With RedFort's continuous evidence collector, we generated our complete audit package in 15 minutes.",
      name: "Helena Rostova",
      role: "Lead Compliance Auditor",
      company: "Vanguard Cloud Technologies"
    },
    mockupGraphic: {
      title: 'REGULATORY COMPLIANCE MONITOR',
      badge: '100% CONTROL PASS RATE',
      items: [
        { label: 'SOC 2 Type II Controls', value: '84/84 Verified Compliant', status: 'success' },
        { label: 'ISO / IEC 27001 ISMS', value: 'Continuous Evidence Active', status: 'success' },
        { label: 'Immutable Audit Trail', value: 'Zero Gaps Detected', status: 'success' },
        { label: 'Corrective Action SLAs', value: '100% Resolved On Schedule', status: 'normal' }
      ]
    }
  }
];

export default function TabsStories() {
  const [activeTabId, setActiveTabId] = useState<string>('soc-threat');
  const activeTab = TAB_STORIES.find((t) => t.id === activeTabId) || TAB_STORIES[0];

  return (
    <div className="w-full font-sans">
      
      {/* Horizontal Tab Navigation (Ontic style) */}
      <div className="flex border-b border-[#1F2937] overflow-x-auto scrollbar-none mb-10 sm:mb-12">
        {TAB_STORIES.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex-1 min-w-[200px] sm:min-w-[220px] py-4 px-4 text-left relative transition-all border-b-2 ${
                isActive 
                  ? 'border-[#F5762E] text-white bg-[#111827]/50' 
                  : 'border-transparent text-[#94A3B8] hover:text-white hover:bg-[#111827]/20'
              }`}
            >
              <div className="flex items-center space-x-2.5 mb-1.5">
                <span className={`p-1.5 rounded ${isActive ? 'bg-[#F5762E] text-white' : 'bg-[#111827] text-[#94A3B8]'}`}>
                  {tab.icon}
                </span>
                <span className="text-xs font-semibold tracking-wide">
                  {tab.title}
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#94A3B8] line-clamp-1">
                {tab.productName}
              </div>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display (Split View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Copy & Bullets (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="text-xs font-mono font-semibold text-[#F5762E] uppercase tracking-wider">
            {activeTab.eyebrow}
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
            {activeTab.headline}
          </h3>

          {/* 3 Feature Bullets with Navy Accent Bars (Ontic Spec) */}
          <div className="space-y-4 pt-2">
            {activeTab.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                <div className="w-1.5 h-5 bg-[#F5762E] rounded-full mt-1 shrink-0"></div>
                <span>{bullet}</span>
              </div>
            ))}
          </div>

          {/* CTA Link */}
          <div className="pt-4">
            <Link
              href={`/products/${activeTab.productSlug}`}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-semibold text-sm transition-all shadow-md group"
            >
              <span>Explore {activeTab.productName}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Testimonial Card */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-5 mt-6 relative">
            <Quote className="w-6 h-6 text-[#F5762E]/30 mb-2" />
            <p className="text-xs sm:text-sm text-white italic leading-relaxed mb-3">
              "{activeTab.testimonial.quote}"
            </p>
            <div className="flex items-center space-x-3 border-t border-[#1F2937] pt-3 text-xs font-mono">
              <div className="w-8 h-8 rounded-full bg-[#0B0F19] border border-[#F5762E] flex items-center justify-center font-bold text-[#F5762E]">
                {activeTab.testimonial.name.charAt(0)}
              </div>
              <div>
                <div className="text-white font-semibold">{activeTab.testimonial.name}</div>
                <div className="text-[11px] text-[#94A3B8]">{activeTab.testimonial.role} · {activeTab.testimonial.company}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Mockup Card (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 shadow-2xl relative">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1F2937]">
              <div>
                <span className="text-xs font-mono text-[#94A3B8] block">MODULE TELEMETRY</span>
                <span className="text-sm font-bold font-mono text-white">{activeTab.mockupGraphic.title}</span>
              </div>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-semibold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">
                {activeTab.mockupGraphic.badge}
              </span>
            </div>

            {/* Metric Rows */}
            <div className="space-y-3 mt-4">
              {activeTab.mockupGraphic.items.map((item, idx) => (
                <div key={idx} className="p-3 rounded bg-[#0B0F19] border border-[#1F2937] flex items-center justify-between">
                  <div className="text-xs font-mono text-[#94A3B8]">{item.label}</div>
                  <div className={`text-xs font-mono font-bold ${
                    item.status === 'alert' ? 'text-[#EF4444]' :
                    item.status === 'success' ? 'text-[#22C55E]' :
                    'text-white'
                  }`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Live Action Footer */}
            <div className="mt-6 pt-4 border-t border-[#1F2937] flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
              <span className="flex items-center space-x-1.5 text-[#22C55E]">
                <Radio className="w-3 h-3 animate-pulse" />
                <span>Synchronized with GSOC Engine</span>
              </span>
              <span className="text-white">Lat: 18ms</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
