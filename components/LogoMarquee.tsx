'use strict';
'use client';

import React from 'react';

interface CompanyLogo {
  name: string;
  category: string;
  svg: React.ReactNode;
}

const COMPANY_LOGOS: CompanyLogo[] = [
  {
    name: 'Lockheed Martin',
    category: 'Defense & Aerospace',
    svg: (
      <svg viewBox="0 0 160 36" fill="currentColor" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Star / Compass Geometric Mark */}
        <path d="M14 2 L18 12 L28 14 L20 20 L23 30 L14 24 L5 30 L8 20 L0 14 L10 12 Z" fill="#F5762E" opacity="0.9" />
        {/* Text */}
        <text x="34" y="23" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="800" letterSpacing="1.2">LOCKHEED</text>
      </svg>
    )
  },
  {
    name: 'JPMorgan Chase',
    category: 'Global Financial',
    svg: (
      <svg viewBox="0 0 160 36" fill="currentColor" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Octagon Geometric Mark */}
        <path d="M4 11 L11 4 H21 L28 11 V21 L21 28 H11 L4 21 Z" fill="none" stroke="#F5762E" strokeWidth="2.5" />
        <rect x="13" y="13" width="6" height="6" fill="#FFFFFF" />
        {/* Text */}
        <text x="36" y="23" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="800" letterSpacing="1">J.P. MORGAN</text>
      </svg>
    )
  },
  {
    name: 'Cisco Systems',
    category: 'Network Infrastructure',
    svg: (
      <svg viewBox="0 0 140 36" fill="currentColor" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Bridge Wave Lines */}
        <line x1="4" y1="20" x2="4" y2="28" stroke="#F5762E" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="9" y1="14" x2="9" y2="28" stroke="#F5762E" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="14" y1="8" x2="14" y2="28" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="19" y1="14" x2="19" y2="28" stroke="#F5762E" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="24" y1="20" x2="24" y2="28" stroke="#F5762E" strokeWidth="2.5" strokeLinecap="round" />
        {/* Text */}
        <text x="34" y="24" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="800" letterSpacing="2">CISCO</text>
      </svg>
    )
  },
  {
    name: 'Siemens Energy',
    category: 'Critical Infrastructure',
    svg: (
      <svg viewBox="0 0 140 36" fill="currentColor" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Double Wave Mark */}
        <circle cx="10" cy="18" r="7" fill="#F5762E" />
        <circle cx="16" cy="18" r="4" fill="#FFFFFF" />
        {/* Text */}
        <text x="28" y="24" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.5">SIEMENS</text>
      </svg>
    )
  },
  {
    name: 'Palantir Technologies',
    category: 'Defense Intelligence',
    svg: (
      <svg viewBox="0 0 140 36" fill="currentColor" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Palantir Ring & Crescent */}
        <circle cx="14" cy="18" r="9" fill="none" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="14" cy="18" r="4" fill="#F5762E" />
        <line x1="14" y1="27" x2="14" y2="31" stroke="#FFFFFF" strokeWidth="2" />
        {/* Text */}
        <text x="30" y="23" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" letterSpacing="1.8">PALANTIR</text>
      </svg>
    )
  },
  {
    name: 'Amazon Web Services',
    category: 'Cloud Infrastructure',
    svg: (
      <svg viewBox="0 0 140 36" fill="currentColor" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
        {/* AWS Smile Curve */}
        <path d="M4 26 Q16 33 28 26" fill="none" stroke="#F5762E" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="27,24 30,27 25,28" fill="#F5762E" />
        {/* Text */}
        <text x="6" y="20" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="900" letterSpacing="1.5">AWS</text>
        <text x="44" y="20" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1" fill="#94A3B8">CLOUD</text>
      </svg>
    )
  },
  {
    name: 'Boeing Defense',
    category: 'Aviation & Space',
    svg: (
      <svg viewBox="0 0 140 36" fill="currentColor" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Wing / Orbit Emblem */}
        <path d="M4 22 C10 10 24 10 28 14 C20 16 12 24 4 22 Z" fill="#F5762E" />
        <circle cx="16" cy="18" r="3" fill="#FFFFFF" />
        {/* Text */}
        <text x="34" y="23" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="800" letterSpacing="1.5">BOEING</text>
      </svg>
    )
  },
  {
    name: 'Honeywell',
    category: 'Industrial IoT & Building Solutions',
    svg: (
      <svg viewBox="0 0 150 36" fill="currentColor" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Precision Square Mark */}
        <rect x="4" y="10" width="14" height="14" fill="#F5762E" />
        <rect x="8" y="14" width="6" height="6" fill="#0B0F19" />
        {/* Text */}
        <text x="24" y="23" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1">HONEYWELL</text>
      </svg>
    )
  },
  {
    name: 'Delta Air Lines',
    category: 'Aviation Transit',
    svg: (
      <svg viewBox="0 0 130 36" fill="currentColor" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Delta Triangular Chevron */}
        <polygon points="14,6 4,26 24,26" fill="#F5762E" />
        <polygon points="14,14 8,24 20,24" fill="#0B0F19" />
        {/* Text */}
        <text x="30" y="23" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="800" letterSpacing="1.8">DELTA</text>
      </svg>
    )
  },
  {
    name: 'CrowdStrike',
    category: 'Cybersecurity EDR',
    svg: (
      <svg viewBox="0 0 170 36" fill="currentColor" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Falcon Strike Wing */}
        <path d="M4 26 L16 8 L24 20 L16 26 Z" fill="#F5762E" />
        <polygon points="12,18 20,12 18,22" fill="#FFFFFF" />
        {/* Text */}
        <text x="30" y="23" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="800" letterSpacing="1">CROWDSTRIKE</text>
      </svg>
    )
  },
  {
    name: 'Pfizer Global',
    category: 'Healthcare & Biotech',
    svg: (
      <svg viewBox="0 0 130 36" fill="currentColor" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Oval Helix */}
        <ellipse cx="14" cy="18" rx="10" ry="7" fill="none" stroke="#F5762E" strokeWidth="2.2" transform="rotate(-25 14 18)" />
        {/* Text */}
        <text x="30" y="24" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.8">Pfizer</text>
      </svg>
    )
  },
  {
    name: 'Schneider Electric',
    category: 'Energy & Automation',
    svg: (
      <svg viewBox="0 0 160 36" fill="currentColor" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Life Is On Arc */}
        <path d="M6 24 C4 16 12 8 20 8" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="20" cy="8" r="3" fill="#F5762E" />
        {/* Text */}
        <text x="28" y="23" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="800" letterSpacing="1">SCHNEIDER</text>
      </svg>
    )
  }
];

export default function LogoMarquee({
  title = "TRUSTED BY DEFENSE, CRITICAL INFRASTRUCTURE & FORTUNE 500 SECURITY TEAMS"
}: {
  title?: string;
}) {
  // Duplicate array for seamless infinite marquee loop
  const marqueeList = [...COMPANY_LOGOS, ...COMPANY_LOGOS];

  return (
    <div className="w-full py-10 relative overflow-hidden font-sans">
      
      {/* Eyebrow Label */}
      {title && (
        <div className="text-center mb-8">
          <div className="text-xs font-mono text-[#94A3B8] tracking-[0.2em] uppercase font-semibold">
            {title}
          </div>
        </div>
      )}

      {/* Marquee Track with Fade Gradient Masks */}
      <div className="relative w-full overflow-hidden marquee-mask">
        <div className="animate-marquee flex items-center space-x-8 sm:space-x-12 py-2">
          {marqueeList.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="group flex items-center justify-center px-6 py-3 rounded-xl bg-[#111827]/40 hover:bg-[#111827] border border-[#1F2937]/80 hover:border-[#F5762E]/50 transition-all duration-300 shrink-0 cursor-default shadow-sm"
              title={`${company.name} — ${company.category}`}
            >
              <div className="text-[#94A3B8] group-hover:text-white transition-colors opacity-70 group-hover:opacity-100 flex items-center">
                {company.svg}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
