'use strict';
import React from 'react';
import Link from 'next/link';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Globe2, 
  Lock, 
  Eye, 
  Brain, 
  Building2, 
  Layers, 
  Radio,
  Award,
  Sparkles,
  Compass
} from 'lucide-react';
import { LEADERSHIP_TEAM } from '@/lib/siteData';

export default function AboutUsPage() {
  return (
    <div className="w-full flex flex-col font-sans selection:bg-[#F5762E] selection:text-white">
      
      {/* 1. HERO SECTION [dark bg: #0B0F19] */}
      <section className="relative w-full bg-[#0B0F19] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F5762E]/10 blur-[130px] pointer-events-none rounded-full"></div>

        <div className="max-w-[1280px] mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>OUR MISSION & HERITAGE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Fortify Every Asset. Secure Every Operation.
          </h1>

          <p className="text-base sm:text-xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            RedFort was founded on a singular premise: modern enterprises cannot defend against multi-vector threats when their cybersecurity desks and physical security guard booths speak completely different languages.
          </p>
        </div>
      </section>

      {/* 2. THE PROBLEM WE SOLVE [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider">
                THE PROBLEM WE SOLVE
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19] leading-tight">
                Eliminating the dangerous blind spot between digital and physical defense.
              </h2>

              <p className="text-base text-[#475569] leading-relaxed">
                Organizations typically run separate systems for cybersecurity, physical security, visitor management, access control, and compliance — creating blind spots and slow response times.
              </p>

              <p className="text-base text-[#475569] leading-relaxed">
                We built RedFort to unify these capabilities into one platform, enabling security teams to monitor threats, manage incidents, enforce compliance, and protect people and assets from a single operational dashboard.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-mono text-[#0B0F19]">
                <div className="p-3.5 rounded bg-white border border-[#E2E8F0] shadow-sm">
                  <div className="text-lg font-bold text-[#F5762E]">01</div>
                  <div className="font-semibold mt-1">Universal Signal Ingest</div>
                  <div className="text-[#475569] mt-0.5">SIEM, EDR, PACS, CCTV, IoT</div>
                </div>
                <div className="p-3.5 rounded bg-white border border-[#E2E8F0] shadow-sm">
                  <div className="text-lg font-bold text-[#22C55E]">02</div>
                  <div className="font-semibold mt-1">Autonomous SOAR</div>
                  <div className="text-[#475569] mt-0.5">Sub-second threat neutralization</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#0B0F19] border border-[#1F2937] rounded-2xl p-8 text-white space-y-6 shadow-xl">
                <div className="text-xs font-mono text-[#F5762E] font-bold uppercase">
                  UNIFIED PLATFORM PURPOSE
                </div>
                
                <h3 className="text-2xl font-bold text-white">
                  Why the world's most critical organizations choose RedFort
                </h3>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Whether protecting a global financial trading floor, a nuclear power utility, an international airport tarmac, or an AI research facility, RedFort gives security leaders complete assurance that no physical or cyber signal goes unheeded.
                </p>

                <div className="pt-4 border-t border-[#1F2937] flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                  <span>Trusted by Fortune 500 & Defense</span>
                  <span className="text-[#22C55E]">SOC 2 Type II Certified</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. OUR VISION [dark bg: #0B0F19] */}
      <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-semibold uppercase tracking-wider">
              FUTURE HORIZONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Where enterprise security is headed.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              We are engineering the future of autonomous corporate resilience, merging artificial intelligence, digital twins, and autonomous drone surveillance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-xl bg-[#111827] border border-[#1F2937] space-y-3">
              <Brain className="w-6 h-6 text-[#F5762E]" />
              <h3 className="text-base font-bold text-white">AI Threat Detection</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Machine learning models capable of identifying subtle multi-vector attack precursors across millions of real-time logs.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#111827] border border-[#1F2937] space-y-3">
              <Layers className="w-6 h-6 text-[#F5762E]" />
              <h3 className="text-base font-bold text-white">Digital Twin Operations</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Full 3D spatial digital replicas of corporate campuses displaying real-time personnel density and sensor status.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#111827] border border-[#1F2937] space-y-3">
              <Eye className="w-6 h-6 text-[#F5762E]" />
              <h3 className="text-base font-bold text-white">Drone Perimeter Defense</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Autonomous drone deployment to investigate physical fence vibrations and unauthorized vehicle approaches.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#111827] border border-[#1F2937] space-y-3">
              <Globe2 className="w-6 h-6 text-[#F5762E]" />
              <h3 className="text-base font-bold text-white">Smart City Integration</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Inter-agency emergency dispatch protocols connecting municipal services, hospitals, and transit grids during major events.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. LEADERSHIP / TEAM [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-bold uppercase tracking-wider">
              EXECUTIVE LEADERSHIP
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
              Led by enterprise defense veterans.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {LEADERSHIP_TEAM.map((member, idx) => (
              <div key={idx} className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#0B0F19] border-2 border-[#F5762E] flex items-center justify-center text-xl font-bold font-mono text-[#F5762E]">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0B0F19]">{member.name}</h3>
                    <div className="text-xs font-mono text-[#F5762E] mt-0.5">{member.title}</div>
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {member.bio}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#F1F5F9] text-[11px] font-mono text-[#0B0F19] font-semibold">
                  {member.experience}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. CTA BAND [dark] (Two smaller CTAs side by side: "Join us" + "Request a Demo") */}
      <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-t border-[#1F2937]">
        <div className="max-w-[1000px] mx-auto text-center space-y-8">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>JOIN OUR EXPEDITION IN SECURITY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white max-w-2xl mx-auto">
            Ready to secure your enterprise operations?
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/company/trust-and-security"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded font-semibold text-white bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] transition-all text-sm"
            >
              <span>Join Us (Careers)</span>
            </Link>
            <Link
              href="/request-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded font-semibold text-white bg-[#F5762E] hover:bg-[#FF9A5A] transition-all shadow-lg text-sm"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
