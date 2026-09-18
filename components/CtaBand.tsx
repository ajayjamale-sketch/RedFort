'use strict';
import React from 'react';
import Link from 'next/link';
import { Shield, ArrowRight, CheckCircle2, Lock, Zap, DollarSign } from 'lucide-react';

interface CtaBandProps {
  headline?: string;
  subhead?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  showBullets?: boolean;
}

export default function CtaBand({
  headline = 'Fortify every asset. Secure every operation.',
  subhead = 'Centralize cyber threat intelligence, physical facility access, CCTV monitoring, and compliance into a single GSOC command center.',
  buttonText = 'Request a Demo',
  buttonLink = '/request-demo',
  secondaryButtonText,
  secondaryButtonLink,
  showBullets = true
}: CtaBandProps) {
  return (
    <section className="relative w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-t border-[#1F2937] overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#F5762E]/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-[1000px] mx-auto text-center relative z-10 space-y-8">
        
        {/* Eyebrow Tag (Mono, uppercase, no emoji) */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" />
          <span>Unified Enterprise Security</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans max-w-3xl mx-auto leading-tight">
          {headline}
        </h2>

        {/* Subhead */}
        {subhead && (
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            {subhead}
          </p>
        )}

        {/* 3 Value Bullets (Requested in Section 4.2 & Section 6) */}
        {showBullets && (
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-2 text-xs sm:text-sm text-[#94A3B8] font-mono">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-center text-[#22C55E]">
                <Shield className="w-3 h-3" />
              </div>
              <span className="text-white font-medium">Better security</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-center text-[#F5762E]">
                <Zap className="w-3 h-3" />
              </div>
              <span className="text-white font-medium">Faster response</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-center text-[#22C55E]">
                <DollarSign className="w-3 h-3" />
              </div>
              <span className="text-white font-medium">Lower operational cost</span>
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href={buttonLink}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded font-semibold text-white bg-[#F5762E] hover:bg-[#FF9A5A] transition-all shadow-lg hover:shadow-orange-500/20 text-sm tracking-wide group"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          {secondaryButtonText && secondaryButtonLink ? (
            <Link
              href={secondaryButtonLink}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded font-semibold text-white bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] transition-all text-sm"
            >
              <span>{secondaryButtonText}</span>
            </Link>
          ) : (
            <Link
              href="/platform"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded font-semibold text-white bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] transition-all text-sm"
            >
              <span>Explore Platform Architecture</span>
            </Link>
          )}
        </div>

      </div>
    </section>
  );
}
