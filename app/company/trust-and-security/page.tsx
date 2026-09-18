'use strict';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Key, 
  Users, 
  FileText, 
  Database, 
  Radio, 
  Activity, 
  Globe2, 
  Server,
  Zap,
  Check
} from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import { TRUST_BADGES } from '@/lib/siteData';

export default function TrustAndSecurityPage() {
  const [activeCert, setActiveCert] = useState<number | null>(0);

  const securityChecklist = [
    {
      icon: <Lock className="w-5 h-5 text-[#F5762E]" />,
      label: 'End-to-End Encryption',
      sentence: 'All customer data, video streams, access logs, and network telemetry are encrypted in transit via TLS 1.3 and at rest with AES-256 keys managed in dedicated hardware security modules (HSM).'
    },
    {
      icon: <Key className="w-5 h-5 text-[#F5762E]" />,
      label: 'Multi-Factor Authentication (MFA)',
      sentence: 'Strict FIDO2/WebAuthn hardware key and time-based OTP multi-factor authentication enforced on every console login, API key generation, and administrative policy edit.'
    },
    {
      icon: <Users className="w-5 h-5 text-[#F5762E]" />,
      label: 'Role-Based Access Control (RBAC)',
      sentence: 'Granular least-privilege permissions restrict access to critical security functions, CCTV streams, and employee location data according to strict departmental policies.'
    },
    {
      icon: <FileText className="w-5 h-5 text-[#F5762E]" />,
      label: 'Immutable Cryptographic Audit Logs',
      sentence: 'Every badge tap, failed door access, firewall alert, and investigator action is recorded into an append-only ledger secured by SHA-256 cryptographic hashing to prevent internal tampering.'
    },
    {
      icon: <Database className="w-5 h-5 text-[#F5762E]" />,
      label: 'Secure Backup, Disaster Recovery & Retention',
      sentence: 'Continuous automated geo-replicated backups with automated failover testing, zero-data-loss RPO, and customizable enterprise data retention schedules.'
    }
  ];

  const reliabilityStats = [
    {
      label: 'Real-Time High-Volume Processing',
      stat: '100k+ EPS',
      desc: 'Sustained throughput for high-consequence global deployments without telemetry lag.'
    },
    {
      label: 'Enterprise Multi-Location Support',
      stat: '500+ Sites',
      desc: 'Unified governance across distributed headquarters, factories, datacenters, and airports.'
    },
    {
      label: 'High Availability & Business Continuity',
      stat: '99.999%',
      desc: 'Active-active multi-region clustering ensuring your GSOC is always online in emergencies.'
    },
    {
      label: 'Low-Latency Mission-Critical Processing',
      stat: '< 100ms',
      desc: 'Instant event correlation and immediate lockdown trigger execution when seconds matter.'
    }
  ];

  const certificationDetails = [
    {
      name: 'SOC 2 Type II Certified',
      standards: 'Security, Availability, Confidentiality, and Processing Integrity.',
      details: 'Independently audited by top-tier accounting firms verifying continuous compliance across all 5 Trust Services Criteria.'
    },
    {
      name: 'ISO / IEC 27001',
      standards: 'Information Security Management Systems (ISMS).',
      details: 'Certified global management system governing risk mitigation, physical asset access, and software lifecycle security.'
    },
    {
      name: 'GDPR & CCPA Compliant',
      standards: 'Global Data Privacy & Role-Based Masking.',
      details: 'Includes automatic face-blurring in surveillance footage and strict data residency controls across EU and US sovereignty boundaries.'
    },
    {
      name: 'HIPAA & HITECH Ready',
      standards: 'Health Insurance Portability and Accountability Act.',
      details: 'Provides administrative, physical, and technical safeguards for organizations handling Electronic Protected Health Information (ePHI).'
    },
    {
      name: 'FedRAMP In-Process',
      standards: 'Federal Risk and Authorization Management Program.',
      details: 'Architected to meet stringent NIST SP 800-53 security controls for US government and public sector deployments.'
    }
  ];

  return (
    <div className="w-full flex flex-col font-sans selection:bg-[#F5762E] selection:text-white">
      
      {/* 1. HERO SECTION [dark bg: #0B0F19] */}
      <section className="relative w-full bg-[#0B0F19] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F5762E]/10 blur-[130px] pointer-events-none rounded-full"></div>

        <div className="max-w-[1280px] mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>ENTERPRISE TRUST, SECURITY & COMPLIANCE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Security is in RedFort's DNA.
          </h1>

          <p className="text-base sm:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            The same standards we help you enforce, we hold ourselves to.
          </p>
        </div>
      </section>

      {/* 2. SECURITY REQUIREMENTS IN DETAIL [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider">
              DEFENSE-IN-DEPTH ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
              Enterprise security requirements in detail.
            </h2>
          </div>

          {/* Checklist-style list of 5 items */}
          <div className="max-w-4xl mx-auto space-y-4">
            {securityChecklist.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex items-start space-x-5"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0B0F19] flex items-center justify-center shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-[#0B0F19]">
                      {item.label}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {item.sentence}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. RELIABILITY COMMITMENTS [dark bg: #0B0F19] (4-stat callout row) */}
      <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-semibold uppercase tracking-wider">
              OPERATIONAL PERFORMANCE GUARANTEES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Enterprise reliability commitments.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reliabilityStats.map((st, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-[#111827] border border-[#1F2937] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-[#F5762E]">
                    {st.stat}
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {st.label}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#1F2937] text-[10px] font-mono text-[#22C55E] flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>SLA Backed</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. COMPLIANCE CERTIFICATIONS [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider">
              GLOBAL ASSURANCE STANDARDS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
              Compliance certifications & audits.
            </h2>
            <p className="text-sm text-[#475569]">
              Click on any certification to review our continuous compliance and third-party audit coverage.
            </p>
          </div>

          {/* Badge Grid with Interactive Detail Modal / Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {certificationDetails.map((cert, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCert(idx)}
                className={`p-5 rounded-xl text-left transition-all flex flex-col justify-between ${
                  activeCert === idx
                    ? 'bg-[#0B0F19] text-white border-2 border-[#F5762E] shadow-md'
                    : 'bg-white border border-[#E2E8F0] text-[#0B0F19] hover:border-[#0B0F19]'
                }`}
              >
                <div>
                  <CheckCircle2 className={`w-6 h-6 mb-3 ${activeCert === idx ? 'text-[#F5762E]' : 'text-[#22C55E]'}`} />
                  <h3 className="text-sm font-bold leading-snug">{cert.name}</h3>
                </div>
                <div className="text-[10px] font-mono mt-3 opacity-80 uppercase">
                  {activeCert === idx ? 'Active View' : 'Click to inspect'}
                </div>
              </button>
            ))}
          </div>

          {/* Active Certification Detail Explainer Box */}
          {activeCert !== null && (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 max-w-3xl mx-auto shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#F5762E] font-bold uppercase">
                <Shield className="w-4 h-4" />
                <span>Audit Scope & Verification Artifacts</span>
              </div>
              <h3 className="text-xl font-bold text-[#0B0F19]">
                {certificationDetails[activeCert].name}
              </h3>
              <p className="text-xs font-mono text-[#475569] font-semibold">
                Standards: {certificationDetails[activeCert].standards}
              </p>
              <p className="text-sm text-[#475569] leading-relaxed">
                {certificationDetails[activeCert].details}
              </p>
            </div>
          )}

        </div>
      </section>

      {/* 5. CTA BAND [dark] (Headline: "Talk to our security team.") */}
      <CtaBand 
        headline="Talk to our security team."
        subhead="Request our SOC 2 Type II report, ISO 27001 certificate, or schedule a technical architecture review with our Chief Information Security Officer."
        buttonText="Request Security Package"
        buttonLink="/request-demo"
        showBullets={true}
      />

    </div>
  );
}
