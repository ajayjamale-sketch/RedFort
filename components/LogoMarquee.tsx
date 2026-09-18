'use strict';
'use client';

import React from 'react';
import { 
  Shield, 
  Building2, 
  Cpu, 
  Server, 
  Plane, 
  Landmark, 
  Activity, 
  Zap, 
  Layers, 
  Globe, 
  Radar, 
  Lock,
  Boxes,
  Radio
} from 'lucide-react';

interface BrandBadge {
  name: string;
  category: string;
  icon: React.ReactNode;
  tag: string;
}

const BRAND_BADGES: BrandBadge[] = [
  {
    name: 'Lockheed Martin',
    category: 'Defense & Aerospace',
    icon: <Plane className="w-4 h-4 text-[#F5762E]" />,
    tag: 'DEFENSE'
  },
  {
    name: 'JPMorgan Chase',
    category: 'Global Banking & Assets',
    icon: <Landmark className="w-4 h-4 text-[#F5762E]" />,
    tag: 'FINANCIAL'
  },
  {
    name: 'Cisco Systems',
    category: 'Network Infrastructure',
    icon: <Radio className="w-4 h-4 text-[#F5762E]" />,
    tag: 'NETWORKING'
  },
  {
    name: 'Siemens Energy',
    category: 'Critical Power Grid',
    icon: <Zap className="w-4 h-4 text-[#F5762E]" />,
    tag: 'ENERGY'
  },
  {
    name: 'Palantir Technologies',
    category: 'Defense Intelligence',
    icon: <Radar className="w-4 h-4 text-[#F5762E]" />,
    tag: 'INTEL'
  },
  {
    name: 'Amazon Web Services',
    category: 'Cloud Infrastructure',
    icon: <Server className="w-4 h-4 text-[#F5762E]" />,
    tag: 'CLOUD'
  },
  {
    name: 'Boeing Defense',
    category: 'Aviation & Space',
    icon: <Globe className="w-4 h-4 text-[#F5762E]" />,
    tag: 'AEROSPACE'
  },
  {
    name: 'Honeywell',
    category: 'Industrial IoT & PACS',
    icon: <Building2 className="w-4 h-4 text-[#F5762E]" />,
    tag: 'INDUSTRIAL'
  },
  {
    name: 'CrowdStrike',
    category: 'Endpoint Security',
    icon: <Shield className="w-4 h-4 text-[#F5762E]" />,
    tag: 'CYBER EDR'
  },
  {
    name: 'Pfizer Global',
    category: 'Healthcare & Biotech',
    icon: <Activity className="w-4 h-4 text-[#F5762E]" />,
    tag: 'HEALTHCARE'
  },
  {
    name: 'Schneider Electric',
    category: 'Datacenter Energy',
    icon: <Cpu className="w-4 h-4 text-[#F5762E]" />,
    tag: 'HARDWARE'
  },
  {
    name: 'General Dynamics',
    category: 'Mission Systems',
    icon: <Lock className="w-4 h-4 text-[#F5762E]" />,
    tag: 'GOV / MIL'
  }
];

export default function LogoMarquee({
  title = "TRUSTED BY DEFENSE, CRITICAL INFRASTRUCTURE & FORTUNE 500 SECURITY TEAMS"
}: {
  title?: string;
}) {
  // Duplicate for infinite continuous CSS marquee
  const marqueeList = [...BRAND_BADGES, ...BRAND_BADGES];

  return (
    <div className="w-full py-8 relative overflow-hidden font-sans">
      
      {/* Eyebrow Header */}
      {title && (
        <div className="text-center mb-6">
          <div className="text-[11px] font-mono text-[#94A3B8] tracking-[0.2em] uppercase font-semibold">
            {title}
          </div>
        </div>
      )}

      {/* Continuous Marquee Track */}
      <div className="relative w-full overflow-hidden marquee-mask">
        <div className="animate-marquee flex items-center space-x-6 py-2">
          {marqueeList.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="group flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-[#111827]/60 hover:bg-[#111827] border border-[#1F2937] hover:border-[#F5762E]/60 transition-all duration-200 shrink-0 cursor-default shadow-sm"
            >
              <div className="p-1.5 rounded-md bg-[#0B0F19] border border-[#1F2937] group-hover:border-[#F5762E]/40 transition-colors">
                {brand.icon}
              </div>

              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white tracking-tight group-hover:text-[#F5762E] transition-colors whitespace-nowrap">
                  {brand.name}
                </span>
                <span className="text-[10px] font-mono text-[#64748B] group-hover:text-[#94A3B8] transition-colors whitespace-nowrap">
                  {brand.category}
                </span>
              </div>

              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#0B0F19] text-[#94A3B8] border border-[#1F2937] font-semibold uppercase">
                {brand.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
