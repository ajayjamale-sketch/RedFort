'use strict';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  Video, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Check,
  Building2,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { USER_ROLES } from '@/lib/siteData';

export default function RequestDemoPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    role: USER_ROLES[0],
    facilitiesCount: '1 - 5 Facilities',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.workEmail) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full flex flex-col font-sans selection:bg-[#F5762E] selection:text-white">
      
      {/* 1. HERO SECTION [dark bg: #0B0F19] */}
      <section className="relative w-full bg-[#0B0F19] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F5762E]/10 blur-[130px] pointer-events-none rounded-full"></div>

        <div className="max-w-[1280px] mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>EXECUTIVE BRIEFING & DEMO</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            See RedFort in action.
          </h1>

          <p className="text-base sm:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Tell us about your organization — we'll show you the modules that matter most.
          </p>
        </div>
      </section>

      {/* 2. DEMO REQUEST FORM [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-[800px] mx-auto">
          
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 sm:p-12 shadow-md space-y-8">
            
            <div className="space-y-2 border-b border-[#E2E8F0] pb-6">
              <h2 className="text-2xl font-bold text-[#0B0F19]">
                Request an Architecture & Platform Demonstration
              </h2>
              <p className="text-xs sm:text-sm text-[#475569]">
                Complete the brief form below. A senior security architect will tailor the demonstration to your specific facilities, cyber ingestion requirements, and compliance standards.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-xl bg-[#0B0F19] text-white text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#111827] border-2 border-[#22C55E] flex items-center justify-center text-[#22C55E] mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Briefing Request Received</h3>
                <p className="text-sm text-[#94A3B8] max-w-md mx-auto">
                  Thank you, <strong className="text-white">{formData.fullName}</strong>. An enterprise security specialist has been assigned and will contact you at <strong className="text-white">{formData.workEmail}</strong> within 1 business hour.
                </p>
                <div className="pt-4">
                  <Link
                    href="/"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-semibold text-xs font-mono uppercase tracking-wider"
                  >
                    <span>Return to Homepage</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase text-[#0B0F19]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className="w-full px-4 py-3 rounded-lg bg-[#F9FBFD] border border-[#CBD5E1] text-[#0B0F19] text-sm focus:outline-none focus:border-[#F5762E] focus:ring-1 focus:ring-[#F5762E]"
                    />
                  </div>

                  {/* Work Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase text-[#0B0F19]">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="jane@enterprise.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#F9FBFD] border border-[#CBD5E1] text-[#0B0F19] text-sm focus:outline-none focus:border-[#F5762E] focus:ring-1 focus:ring-[#F5762E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase text-[#0B0F19]">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Acme Corporation"
                      className="w-full px-4 py-3 rounded-lg bg-[#F9FBFD] border border-[#CBD5E1] text-[#0B0F19] text-sm focus:outline-none focus:border-[#F5762E] focus:ring-1 focus:ring-[#F5762E]"
                    />
                  </div>

                  {/* Role Dropdown (Exact labels from Section 1) */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase text-[#0B0F19]">
                      Your Role *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#F9FBFD] border border-[#CBD5E1] text-[#0B0F19] text-sm focus:outline-none focus:border-[#F5762E] focus:ring-1 focus:ring-[#F5762E]"
                    >
                      {USER_ROLES.map((role, idx) => (
                        <option key={idx} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Number of facilities */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase text-[#0B0F19]">
                    Number of Facilities / Campuses *
                  </label>
                  <select
                    value={formData.facilitiesCount}
                    onChange={(e) => setFormData({ ...formData, facilitiesCount: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#F9FBFD] border border-[#CBD5E1] text-[#0B0F19] text-sm focus:outline-none focus:border-[#F5762E] focus:ring-1 focus:ring-[#F5762E]"
                  >
                    <option value="1 Facility">1 Facility (Single Headquarters)</option>
                    <option value="2 - 5 Facilities">2 - 5 Facilities</option>
                    <option value="6 - 20 Facilities">6 - 20 Facilities</option>
                    <option value="20+ Global Facilities">20+ Global Facilities (Enterprise GSOC)</option>
                  </select>
                </div>

                {/* Message / Notes */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase text-[#0B0F19]">
                    Specific Security Focus / Message (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your current security stack, key integrations (SIEM, PACS, CCTV), or upcoming compliance milestones..."
                    className="w-full px-4 py-3 rounded-lg bg-[#F9FBFD] border border-[#CBD5E1] text-[#0B0F19] text-sm focus:outline-none focus:border-[#F5762E] focus:ring-1 focus:ring-[#F5762E]"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-bold text-sm uppercase tracking-wider font-mono transition-all shadow-lg hover:shadow-orange-500/20 flex items-center justify-center space-x-2"
                >
                  <span>Submit Demo Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center space-x-4 text-[11px] font-mono text-[#475569] pt-2">
                  <span className="flex items-center space-x-1">
                    <Lock className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>256-Bit Encrypted</span>
                  </span>
                  <span>·</span>
                  <span>NDA Protected</span>
                  <span>·</span>
                  <span>Zero Spam Guarantee</span>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* 3. WHAT TO EXPECT [dark bg: #0B0F19] (3-step process indicator) */}
      <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#F5762E] font-semibold uppercase tracking-wider">
              WHAT TO EXPECT
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The 3-step evaluation process.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            
            {/* Step 1 */}
            <div className="p-6 rounded-xl bg-[#111827] border border-[#1F2937] space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#0B0F19] border border-[#F5762E] flex items-center justify-center font-mono font-bold text-lg text-[#F5762E] mx-auto">
                01
              </div>
              <h3 className="text-base font-bold text-white">Schedule a Call</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                A 15-minute scoping conversation with our technical team to assess your current facility count and SIEM infrastructure.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-xl bg-[#111827] border border-[#1F2937] space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#0B0F19] border border-[#F5762E] flex items-center justify-center font-mono font-bold text-lg text-[#F5762E] mx-auto">
                02
              </div>
              <h3 className="text-base font-bold text-white">Live Walkthrough</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                A tailored 45-minute live platform demonstration simulating your specific cyber-physical threat scenarios and SOAR workflows.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-xl bg-[#111827] border border-[#1F2937] space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#0B0F19] border border-[#F5762E] flex items-center justify-center font-mono font-bold text-lg text-[#F5762E] mx-auto">
                03
              </div>
              <h3 className="text-base font-bold text-white">Custom Proposal</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Transparent pricing, integration timelines, hardware connector specifications, and custom SLA guarantees.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. ALTERNATE CONTACT [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto text-center space-y-6">
          
          <h2 className="text-2xl font-bold text-[#0B0F19]">
            Prefer direct contact?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-[#0B0F19]">
            <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-sm">
              <Phone className="w-5 h-5 text-[#F5762E] mx-auto mb-2" />
              <div className="font-bold">Telephone</div>
              <div className="text-[#475569] mt-1">+1 (800) 733-3678</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-sm">
              <Mail className="w-5 h-5 text-[#F5762E] mx-auto mb-2" />
              <div className="font-bold">Direct Email</div>
              <div className="text-[#475569] mt-1">contact@redfort.security</div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-sm">
              <MapPin className="w-5 h-5 text-[#F5762E] mx-auto mb-2" />
              <div className="font-bold">Headquarters</div>
              <div className="text-[#475569] mt-1">New York, NY</div>
            </div>
          </div>

          <p className="text-sm text-[#475569]">
            Prefer email? Reach us directly at <a href="mailto:contact@redfort.security" className="text-[#F5762E] font-semibold underline">contact@redfort.security</a>
          </p>

        </div>
      </section>

    </div>
  );
}
