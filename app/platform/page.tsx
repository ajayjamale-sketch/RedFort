'use strict';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Building2, 
  Activity, 
  Cpu, 
  AlertTriangle, 
  BarChart3, 
  Server, 
  Database, 
  Workflow, 
  Radio, 
  Lock, 
  Sparkles, 
  Brain, 
  Eye, 
  Fingerprint, 
  Bot, 
  Globe2,
  Check
} from 'lucide-react';
import MockupDashboard from '@/components/MockupDashboard';
import CtaBand from '@/components/CtaBand';

export default function PlatformPage() {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full flex flex-col font-sans selection:bg-[#F5762E] selection:text-white">
      
      {/* 1. HERO SECTION [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#E2E8F0] text-[#0B0F19] text-xs font-mono font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#F5762E]" />
            <span>UNIFIED PLATFORM ARCHITECTURE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B0F19] max-w-4xl mx-auto leading-[1.15]">
            Govern your entire security program from one system.
          </h1>

          <p className="text-base sm:text-xl text-[#475569] max-w-3xl mx-auto leading-relaxed">
            RedFort centralizes organization setup, live monitoring, incident response, and compliance — so your security program runs as one connected operation, not six disconnected tools.
          </p>

          <div className="pt-2">
            <Link
              href="/request-demo"
              className="inline-flex items-center justify-center px-8 py-4 rounded font-semibold text-white bg-[#F5762E] hover:bg-[#FF9A5A] transition-all shadow-md text-sm tracking-wide group"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Product Screenshot / Dashboard Mockup Placeholder */}
          <div className="pt-10 max-w-5xl mx-auto">
            <MockupDashboard interactive={true} />
          </div>

        </div>
      </section>

      {/* 2. UNIFIED CAPABILITIES OVERVIEW [dark bg: #0B0F19] (5-step vertical pipeline) */}
      <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-semibold uppercase tracking-wider">
              5-STEP CONTINUOUS SECURITY PIPELINE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              How RedFort connects your entire security lifecycle.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              From initial facility hierarchy registration to real-time correlation, guided response, and strategic executive risk analytics.
            </p>
          </div>

          {/* 5-Step Vertical Pipeline */}
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Step 1 */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#111827] border border-[#1F2937] flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 relative">
              <div className="w-12 h-12 rounded-lg bg-[#0B0F19] border border-[#F5762E] flex items-center justify-center font-mono font-bold text-lg text-[#F5762E] shrink-0">
                01
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#F5762E] uppercase font-semibold">STAGE 1: FOUNDATION</div>
                <h3 className="text-xl font-bold text-white">Set up your organization</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Register offices, campuses, and global facilities. Configure multi-tier spatial hierarchies, assign security zones with tailored clearance tiers, and configure organization-wide security responsibilities.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#111827] border border-[#1F2937] flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 relative">
              <div className="w-12 h-12 rounded-lg bg-[#0B0F19] border border-[#F5762E] flex items-center justify-center font-mono font-bold text-lg text-[#F5762E] shrink-0">
                02
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#F5762E] uppercase font-semibold">STAGE 2: VISIBILITY</div>
                <h3 className="text-xl font-bold text-white">Monitor everything centrally</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  SOC dashboard visualizes active threats, incidents, physical alarms, and live health metrics for servers, network switches, biometric access turnstiles, and CCTV cameras.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#111827] border border-[#1F2937] flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 relative">
              <div className="w-12 h-12 rounded-lg bg-[#0B0F19] border border-[#F5762E] flex items-center justify-center font-mono font-bold text-lg text-[#F5762E] shrink-0">
                03
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#F5762E] uppercase font-semibold">STAGE 3: INTELLIGENCE</div>
                <h3 className="text-xl font-bold text-white">Correlate cyber and physical signals</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Complex Event Processing engine automatically classifies threat severity and cross-references cyber authentication logs with physical badge swipes to detect impossible travel and insider exfiltration.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#111827] border border-[#1F2937] flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 relative">
              <div className="w-12 h-12 rounded-lg bg-[#0B0F19] border border-[#F5762E] flex items-center justify-center font-mono font-bold text-lg text-[#F5762E] shrink-0">
                04
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#F5762E] uppercase font-semibold">STAGE 4: CONTAINMENT & AUDIT</div>
                <h3 className="text-xl font-bold text-white">Respond and stay compliant</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Incident assignment, investigation, and resolution with guided SOAR playbooks. Tamper-proof evidence collection and compliance findings automatically convert into assigned corrective actions.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#111827] border border-[#1F2937] flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 relative">
              <div className="w-12 h-12 rounded-lg bg-[#0B0F19] border border-[#F5762E] flex items-center justify-center font-mono font-bold text-lg text-[#F5762E] shrink-0">
                05
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#F5762E] uppercase font-semibold">STAGE 5: STRATEGY</div>
                <h3 className="text-xl font-bold text-white">Learn from the data</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Analytics turn historical telemetry into dynamic security posture scores, MTTD/MTTR benchmarks, and executive risk exposure forecasts for strategic board planning.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. HOW IT WORKS [light bg: #F7F7F5] (Horizontal 4-stage flow diagram) */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider">
              DATA FLOW ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
              How it works: From raw signal to automated resolution.
            </h2>
          </div>

          {/* Horizontal 4-Stage Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Stage 1 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E]">
                  <Database className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-[#F5762E] font-bold uppercase">STAGE 1</div>
                <h3 className="text-lg font-bold text-[#0B0F19]">Event Sources</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Cyber systems, firewalls, CCTV streams, access-control readers, and IoT environmental sensors.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#475569]">
                Input: Syslog, RTSP, PACS
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-[#F5762E] font-bold uppercase">STAGE 2</div>
                <h3 className="text-lg font-bold text-[#0B0F19]">Correlation Engine</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Real-time complex event processing (CEP) correlates multi-vector signals and filters false positives.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#475569]">
                Latency: &lt; 100ms
              </div>
            </div>

            {/* Stage 3 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E]">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-[#F5762E] font-bold uppercase">STAGE 3</div>
                <h3 className="text-lg font-bold text-[#0B0F19]">SOC Dashboard</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Unified command console displaying correlated alarms, spatial floorplans, and live asset health.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#475569]">
                Single Pane of Glass
              </div>
            </div>

            {/* Stage 4 */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E]">
                  <Workflow className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-[#F5762E] font-bold uppercase">STAGE 4</div>
                <h3 className="text-lg font-bold text-[#0B0F19]">Automated Workflows</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Incident triage, escalation, compliance audits, and emergency broadcasts — all logged to immutable audit trail.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#475569]">
                Immutable SHA-256 Ledger
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. BUILT FOR SCALE [dark bg: #0B0F19] */}
      <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-mono text-[#F5762E] font-semibold uppercase tracking-wider">
                HIGH-THROUGHPUT RELIABILITY
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Built for enterprise-scale operations.
              </h2>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3 text-sm text-[#94A3B8]">
                  <div className="w-2 h-2 rounded-full bg-[#F5762E] mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-white">Real-time high-volume event processing:</strong> Capable of ingesting over 100,000 security events per second across distributed hybrid clouds and physical sensors.
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm text-[#94A3B8]">
                  <div className="w-2 h-2 rounded-full bg-[#F5762E] mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-white">Enterprise-scale multi-location deployment:</strong> Unified governance across hundreds of regional offices, manufacturing campuses, datacenters, and airports.
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm text-[#94A3B8]">
                  <div className="w-2 h-2 rounded-full bg-[#F5762E] mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-white">High availability, disaster recovery, business continuity:</strong> Active-active clustering, geo-redundant storage, and offline edge survivability for mission-critical access points.
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm text-[#94A3B8]">
                  <div className="w-2 h-2 rounded-full bg-[#F5762E] mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-white">Low-latency mission-critical processing:</strong> Sub-second threat correlation and immediate emergency broadcast dispatch when seconds determine life safety.
                  </div>
                </div>
              </div>
            </div>

            {/* Stat / Badge Strip alongside */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 font-mono">
              <div className="p-5 rounded-xl bg-[#111827] border border-[#1F2937] text-center space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-[#F5762E]">100k+</div>
                <div className="text-xs text-[#94A3B8]">Events Per Second (EPS)</div>
              </div>
              <div className="p-5 rounded-xl bg-[#111827] border border-[#1F2937] text-center space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-[#22C55E]">99.999%</div>
                <div className="text-xs text-[#94A3B8]">Platform Availability</div>
              </div>
              <div className="p-5 rounded-xl bg-[#111827] border border-[#1F2937] text-center space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-white">&lt; 100ms</div>
                <div className="text-xs text-[#94A3B8]">Threat Correlation Latency</div>
              </div>
              <div className="p-5 rounded-xl bg-[#111827] border border-[#1F2937] text-center space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-white">500+</div>
                <div className="text-xs text-[#94A3B8]">Global Facilities Supported</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. WHAT'S NEXT (Roadmap Teaser) [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider">
              FUTURE INNOVATION ROADMAP
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
              Where enterprise security is headed next.
            </h2>
            <p className="text-sm sm:text-base text-[#475569]">
              Preview upcoming breakthroughs currently in development for the RedFort platform.
            </p>
          </div>

          {/* 6 Coming Soon Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E] mb-4">
                <Brain className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-mono text-[#F5762E] font-bold uppercase mb-1">IN LABS</div>
              <h3 className="text-base font-bold text-[#0B0F19] mb-2">AI Threat Detection & Anomaly Analysis</h3>
              <p className="text-xs text-[#475569]">Large Security Models (LSMs) analyzing subtle behavioural deviations in human access and network packets.</p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E] mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-mono text-[#F5762E] font-bold uppercase mb-1">IN LABS</div>
              <h3 className="text-base font-bold text-[#0B0F19] mb-2">Predictive Risk Intelligence</h3>
              <p className="text-xs text-[#475569]">Forecasts emerging vulnerability hotspots and facility vulnerabilities before adversaries discover them.</p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E] mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-mono text-[#F5762E] font-bold uppercase mb-1">IN LABS</div>
              <h3 className="text-base font-bold text-[#0B0F19] mb-2">IoT Smart Sensor Integration</h3>
              <p className="text-xs text-[#475569]">Acoustic glass-break, thermal camera, laser tripwire, and environmental air quality sensor streams.</p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E] mb-4">
                <Fingerprint className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-mono text-[#F5762E] font-bold uppercase mb-1">IN LABS</div>
              <h3 className="text-base font-bold text-[#0B0F19] mb-2">Biometric & Facial Access Control</h3>
              <p className="text-xs text-[#475569]">Privacy-preserving on-device facial recognition for frictionless high-throughput turnstile throughput.</p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E] mb-4">
                <Bot className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-mono text-[#F5762E] font-bold uppercase mb-1">IN LABS</div>
              <h3 className="text-base font-bold text-[#0B0F19] mb-2">Autonomous Incident Response</h3>
              <p className="text-xs text-[#475569]">Zero-touch containment automation where high-confidence cyber and physical breaches are neutralized instantly.</p>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded bg-[#0B0F19] flex items-center justify-center text-[#F5762E] mb-4">
                <Globe2 className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-mono text-[#F5762E] font-bold uppercase mb-1">IN LABS</div>
              <h3 className="text-base font-bold text-[#0B0F19] mb-2">Global GSOC Multi-Clustering</h3>
              <p className="text-xs text-[#475569]">Hierarchical command center federation across sovereign borders, jurisdictions, and international subsidiaries.</p>
            </div>

          </div>

          {/* Waitlist Email Capture */}
          <div className="bg-[#0B0F19] border border-[#1F2937] rounded-xl p-8 text-white max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-xl font-bold text-white">Join the Innovation Roadmap Waitlist</h3>
            <p className="text-xs text-[#94A3B8]">
              Receive early access invitations to beta features, technical architecture whitepapers, and research previews.
            </p>

            {submitted ? (
              <div className="p-3 rounded bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 text-xs font-mono font-semibold flex items-center justify-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Thank you! You have been added to the priority roadmap queue.</span>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  required
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="Enter your enterprise work email..."
                  className="flex-1 px-4 py-3 rounded bg-[#111827] border border-[#1F2937] text-white placeholder-[#94A3B8] text-sm focus:outline-none focus:border-[#F5762E]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-semibold text-sm transition-all whitespace-nowrap shadow-md"
                >
                  Join Waitlist
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Standard CTA Band */}
      <CtaBand 
        headline="Fortify every asset. Secure every operation."
        subhead="Experience how RedFort turns six disconnected tools into a single connected operational defense platform."
        buttonText="Request a Demo"
        buttonLink="/request-demo"
        showBullets={true}
      />

    </div>
  );
}
