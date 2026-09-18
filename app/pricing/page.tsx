'use strict';
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Shield, 
  ArrowRight, 
  Check, 
  X, 
  DollarSign, 
  Building2, 
  Users, 
  CheckCircle2, 
  HelpCircle,
  Zap,
  Sparkles
} from 'lucide-react';
import { PRICING_TIERS, PRODUCT_MODULES } from '@/lib/siteData';
import CtaBand from '@/components/CtaBand';

export default function PricingPage() {
  const comparisonRows = [
    { name: 'SOC Dashboard', starter: true, pro: true, enterprise: true },
    { name: 'Cyber Threat Monitoring', starter: true, pro: true, enterprise: true },
    { name: 'Physical Security Management', starter: true, pro: true, enterprise: true },
    { name: 'Identity & Access Control', starter: false, pro: true, enterprise: true },
    { name: 'Incident Response Management', starter: false, pro: true, enterprise: true },
    { name: 'Risk & Vulnerability Management', starter: false, pro: true, enterprise: true },
    { name: 'Compliance & Audit Management', starter: false, pro: true, enterprise: true },
    { name: 'Security Analytics & Intelligence', starter: false, pro: false, enterprise: true },
    { name: 'Emergency Alerts & Notifications', starter: false, pro: false, enterprise: true },
    { name: 'Admin Console & Multi-Tenant Setup', starter: 'Basic', pro: 'Full Access', enterprise: 'Unlimited Governance' },
    { name: 'User Role Support', starter: '3 Roles', pro: 'All 7 Roles', enterprise: 'Custom RBAC Clearances' },
    { name: 'Event Ingestion Capacity', starter: '5,000 EPS', pro: '25,000 EPS', enterprise: '100,000+ EPS' },
    { name: 'Uptime SLA Guarantee', starter: '99.9%', pro: '99.95%', enterprise: '99.999% Dedicated' },
    { name: 'Deployment Options', starter: 'Cloud SaaS', pro: 'Cloud SaaS', enterprise: 'Cloud / On-Prem / Air-Gapped' }
  ];

  return (
    <div className="w-full flex flex-col font-sans selection:bg-[#F5762E] selection:text-white">
      
      {/* 1. HERO SECTION [dark bg: #0B0F19] */}
      <section className="relative w-full bg-[#0B0F19] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F5762E]/10 blur-[130px] pointer-events-none rounded-full"></div>

        <div className="max-w-[1280px] mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <DollarSign className="w-3.5 h-3.5" />
            <span>TRANSPARENT ENTERPRISE PACKAGING</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Priced for how your organization actually operates.
          </h1>

          <p className="text-base sm:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Plans scale with your facilities, users, and modules — not arbitrary seat counts.
          </p>
        </div>
      </section>

      {/* 2. PLAN TIERS [light bg: #F7F7F5] (3-column table) */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all ${
                  tier.highlight
                    ? 'bg-white border-2 border-[#F5762E] shadow-xl relative'
                    : 'bg-white border border-[#E2E8F0] shadow-sm'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#F5762E] text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-[#0B0F19]">{tier.name}</h3>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#F1F5F9] text-[#475569] font-semibold">
                        {tier.scope}
                      </span>
                    </div>

                    <p className="text-xs text-[#475569] leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="pt-2 pb-4 border-y border-[#F1F5F9]">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-extrabold font-mono text-[#0B0F19]">{tier.price}</span>
                      <span className="text-xs font-mono text-[#475569]">{tier.period}</span>
                    </div>
                    <div className="text-xs font-mono text-[#F5762E] font-medium mt-1">
                      {tier.bestFor}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-[#0B0F19] font-bold uppercase tracking-wider">
                      Included Capabilities:
                    </div>
                    <ul className="space-y-2.5 text-xs text-[#475569]">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2.5">
                          <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-[#F1F5F9]">
                  <Link
                    href="/request-demo"
                    className={`w-full py-3.5 rounded text-center text-xs font-bold font-mono tracking-wider uppercase transition-all block ${
                      tier.highlight
                        ? 'bg-[#F5762E] hover:bg-[#FF9A5A] text-white shadow-md'
                        : 'bg-[#0B0F19] hover:bg-[#111827] text-white'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. FEATURE COMPARISON TABLE [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto space-y-8">
          
          <div className="space-y-2 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B0F19]">
              Comprehensive Module & Feature Matrix
            </h2>
            <p className="text-xs sm:text-sm text-[#475569]">
              Compare capabilities across Starter, Professional, and Enterprise tiers.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#0B0F19] text-white border-b border-[#1F2937] font-mono text-[11px] uppercase">
                    <th className="py-4 px-6 font-semibold">Capability / Specification</th>
                    <th className="py-4 px-6 font-semibold text-center">Starter</th>
                    <th className="py-4 px-6 font-semibold text-center text-[#F5762E]">Professional</th>
                    <th className="py-4 px-6 font-semibold text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] font-sans">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#F9FBFD] transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-[#0B0F19]">
                        {row.name}
                      </td>
                      
                      {/* Starter Col */}
                      <td className="py-3.5 px-6 text-center">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? (
                            <Check className="w-4 h-4 text-[#22C55E] mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-[#94A3B8] mx-auto" />
                          )
                        ) : (
                          <span className="font-mono text-[11px] font-semibold text-[#475569]">{row.starter}</span>
                        )}
                      </td>

                      {/* Pro Col */}
                      <td className="py-3.5 px-6 text-center bg-[#FDF7F3]">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? (
                            <Check className="w-4 h-4 text-[#22C55E] mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-[#94A3B8] mx-auto" />
                          )
                        ) : (
                          <span className="font-mono text-[11px] font-bold text-[#F5762E]">{row.pro}</span>
                        )}
                      </td>

                      {/* Enterprise Col */}
                      <td className="py-3.5 px-6 text-center">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? (
                            <Check className="w-4 h-4 text-[#22C55E] mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-[#94A3B8] mx-auto" />
                          )
                        ) : (
                          <span className="font-mono text-[11px] font-semibold text-[#0B0F19]">{row.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CTA BAND [dark] (Headline: "Get a custom quote.") */}
      <CtaBand 
        headline="Get a custom quote."
        subhead="Speak with our deployment architects to structure a customized proposal tailored to your facility square footage, sensor volume, and SLA requirements."
        buttonText="Request Custom Proposal"
        buttonLink="/request-demo"
        showBullets={true}
      />

    </div>
  );
}
