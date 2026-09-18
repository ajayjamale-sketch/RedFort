'use strict';
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { 
  BookOpen, 
  ArrowRight, 
  FileText, 
  CheckSquare, 
  BarChart3, 
  Video, 
  Calendar, 
  Check, 
  Clock, 
  Download, 
  Shield, 
  Sparkles,
  Radio,
  ExternalLink,
  Layers,
  Lock,
  Cpu
} from 'lucide-react';
import CtaBand from '@/components/CtaBand';

interface ResourceItem {
  id: string;
  category: string;
  format: string;
  tag: string;
  title: string;
  description: string;
  readTime: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  downloadLabel: string;
  featured?: boolean;
}

const EXTENDED_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    category: 'Threat Reports',
    format: '34-PAGE PDF REPORT',
    tag: 'ANNUAL OUTLOOK',
    title: '2026 Cyber-Physical Threat Convergence Outlook',
    description: 'In-depth analysis of 4,000+ enterprise incidents where physical badge intrusions directly preceded network exfiltration.',
    readTime: '18 min read',
    date: 'August 2026',
    imageSrc: '/images/resource-threat-report.jpg',
    imageAlt: 'Annual Threat Intelligence Report Cover',
    downloadLabel: 'Download Report (PDF)',
    featured: true
  },
  {
    id: 'res-2',
    category: 'Guides & Whitepapers',
    format: 'TECHNICAL BLUEPRINT',
    tag: 'GSOC ARCHITECTURE',
    title: 'Architecting a Unified Cyber-Physical GSOC Console',
    description: 'Engineering blueprint for consolidating ONVIF CCTV streams, PACS door relays, and SIEM syslogs into sub-second CEP engines.',
    readTime: '24 min read',
    date: 'July 2026',
    imageSrc: '/images/resource-whitepaper.jpg',
    imageAlt: 'GSOC Technical Architecture Blueprint',
    downloadLabel: 'Download Blueprint'
  },
  {
    id: 'res-3',
    category: 'Security Checklists',
    format: 'INTERACTIVE AUDIT TOOL',
    tag: 'FACILITY ZERO-TRUST',
    title: 'Enterprise Zero-Trust Physical Access Checklist',
    description: '45-point inspection checklist for verifying biometric turnstiles, server cage locks, and instant IdP offboarding synchronization.',
    readTime: '8 min read',
    date: 'June 2026',
    imageSrc: '/images/resource-playbook.jpg',
    imageAlt: 'Zero Trust Access Audit Checklist Console',
    downloadLabel: 'Launch Checklist'
  },
  {
    id: 'res-4',
    category: 'Webinars & Events',
    format: '45-MIN WEBINAR',
    tag: 'INSIDER THREATS',
    title: 'Stopping the Insider Threat: Correlating Badge Swipes with SSH',
    description: 'Threat researchers simulate impossible physical travel anomalies and demonstrate automated EDR host isolation within 84ms.',
    readTime: '45 min watch',
    date: 'May 2026',
    imageSrc: '/images/hero-correlation.jpg',
    imageAlt: 'Threat Correlation Radar Simulation',
    downloadLabel: 'Watch Recording'
  },
  {
    id: 'res-5',
    category: 'Articles & Briefings',
    format: 'EXECUTIVE BRIEFING',
    tag: 'INDUSTRY ANALYSIS',
    title: 'Why Siloed SIEM and PACS Create Critical Blind Spots',
    description: 'How modern threat actors exploit the communication lag between IT security desks and facility guard booths.',
    readTime: '6 min read',
    date: 'April 2026',
    imageSrc: '/images/hero-physical.jpg',
    imageAlt: 'Facility Physical Security Checkpoint',
    downloadLabel: 'Read Briefing'
  },
  {
    id: 'res-6',
    category: 'Webinars & Events',
    format: 'KEYNOTE ARCHIVE',
    tag: 'DEFENSE SUMMIT',
    title: 'Global Cyber-Physical Defense Summit 2026',
    description: 'Keynote presentation on autonomous incident response, digital twin floorplans, and real-time smart city infrastructure telemetry.',
    readTime: '60 min watch',
    date: 'March 2026',
    imageSrc: '/images/solution-smartcity.jpg',
    imageAlt: 'Global Defense Summit Keynote Stage',
    downloadLabel: 'Access Keynote'
  },
  {
    id: 'res-7',
    category: 'Guides & Whitepapers',
    format: 'COMPLIANCE GUIDE',
    tag: 'CONTINUOUS GRC',
    title: 'SOC 2 & ISO 27001 Physical + Digital Audit Playbook',
    description: 'Step-by-step guidance on automating evidence collection across physical server rooms and AWS/Azure cloud environments.',
    readTime: '15 min read',
    date: 'February 2026',
    imageSrc: '/images/hero-executive.jpg',
    imageAlt: 'Executive Compliance & Audit Posture',
    downloadLabel: 'Download Playbook'
  },
  {
    id: 'res-8',
    category: 'Guides & Whitepapers',
    format: 'HARDENING GUIDE',
    tag: 'DATACENTER SECURITY',
    title: 'Hyperscale Server Rack Cage Micro-Segmentation',
    description: 'Hardware specifications and dual-factor NFC/biometric standards for co-located enterprise server cage enclosures.',
    readTime: '12 min read',
    date: 'January 2026',
    imageSrc: '/images/solution-datacenter.jpg',
    imageAlt: 'Datacenter Server Cage Security',
    downloadLabel: 'Download Guide'
  },
  {
    id: 'res-9',
    category: 'Articles & Briefings',
    format: 'INDUSTRY STANDARD',
    tag: 'AIRSIDE SECURITY',
    title: '2026 Airside Perimeter Security & FAA/TSA Mandates',
    description: 'Aviation security benchmark report covering radar perimeter fences, automated PTZ auto-tracking, and cyber runway safety.',
    readTime: '10 min read',
    date: 'December 2025',
    imageSrc: '/images/solution-airports.jpg',
    imageAlt: 'Airport Terminal Command Room',
    downloadLabel: 'Read Standard'
  }
];

const CATEGORIES = [
  'All',
  'Threat Reports',
  'Guides & Whitepapers',
  'Security Checklists',
  'Webinars & Events',
  'Articles & Briefings'
];

function ResourcesContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState<boolean>(false);

  // Sync with ?tab= query parameter from URL
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      const p = tabParam.toLowerCase();
      let matched = 'All';

      if (p.includes('report')) {
        matched = 'Threat Reports';
      } else if (p.includes('checklist')) {
        matched = 'Security Checklists';
      } else if (p.includes('guide') || p.includes('whitepaper')) {
        matched = 'Guides & Whitepapers';
      } else if (p.includes('webinar') || p.includes('event')) {
        matched = 'Webinars & Events';
      } else if (p.includes('article') || p.includes('briefing')) {
        matched = 'Articles & Briefings';
      }

      setSelectedCategory(matched);

      // Smooth scroll to the resources grid
      setTimeout(() => {
        const target = document.getElementById('resources-grid');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }, [searchParams]);

  const featuredResource = EXTENDED_RESOURCES.find(r => r.featured) || EXTENDED_RESOURCES[0];

  const filteredResources = selectedCategory === 'All'
    ? EXTENDED_RESOURCES
    : EXTENDED_RESOURCES.filter(r => r.category === selectedCategory);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    // Update URL shallowly
    const url = new URL(window.location.href);
    if (cat === 'All') {
      url.searchParams.delete('tab');
    } else {
      url.searchParams.set('tab', cat);
    }
    window.history.pushState({}, '', url.toString());
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
    }
  };

  return (
    <div className="w-full flex flex-col font-sans selection:bg-[#F5762E] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-[#0B0F19] text-white pt-16 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#F5762E]/10 blur-[140px] pointer-events-none rounded-full"></div>

        <div className="max-w-[1280px] mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ENTERPRISE RESEARCH & THREAT INTELLIGENCE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
            Security Knowledge Built by Practitioners
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-normal">
            Threat intelligence reports, GSOC blueprints, interactive audit checklists, and on-demand technical briefings for modern security teams.
          </p>
        </div>
      </section>

      {/* 2. FEATURED FLAGSHIP RESEARCH BANNER */}
      <section className="w-full bg-[#0E1424] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-[#111827] border border-[#1F2937] hover:border-[#F5762E]/70 transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
              
              {/* Left Cover Visual (5 Cols) */}
              <div className="lg:col-span-5 relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#1F2937] bg-[#0B0F19] shadow-lg">
                <Image
                  src={featuredResource.imageSrc}
                  alt={featuredResource.imageAlt}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0B0F19]/90 backdrop-blur-md border border-[#1F2937] text-[10px] font-mono text-[#F5762E] font-bold">
                  {featuredResource.format}
                </div>
              </div>

              {/* Right Summary & Stats (7 Cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#F5762E]/10 text-[#F5762E] border border-[#F5762E]/30 font-bold uppercase">
                    FLAGSHIP RESEARCH
                  </span>
                  <span className="text-xs font-mono text-[#64748B] flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span>{featuredResource.readTime} · {featuredResource.date}</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#F5762E] transition-colors">
                  {featuredResource.title}
                </h2>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {featuredResource.description}
                </p>

                {/* Key Research Takeaways Strip */}
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#1F2937]">
                  <div className="p-2.5 rounded-lg bg-[#0B0F19] border border-[#1F2937]">
                    <div className="text-[10px] font-mono text-[#64748B]">ANALYZED</div>
                    <div className="text-sm font-mono font-bold text-white">4,000+ Incidents</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0B0F19] border border-[#1F2937]">
                    <div className="text-[10px] font-mono text-[#64748B]">CROSS-DOMAIN</div>
                    <div className="text-sm font-mono font-bold text-[#F5762E]">78% Correlated</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0B0F19] border border-[#1F2937]">
                    <div className="text-[10px] font-mono text-[#64748B]">FORMAT</div>
                    <div className="text-sm font-mono font-bold text-[#22C55E]">PDF (Free)</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center space-x-4">
                  <button className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-mono font-bold transition-all shadow-md group/btn cursor-pointer">
                    <Download className="w-4 h-4" />
                    <span>{featuredResource.downloadLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY FILTER TABS & VISUAL RESOURCES GRID */}
      <section 
        id="resources-grid" 
        className="w-full bg-[#0B0F19] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937] scroll-mt-24"
      >
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          {/* Category Filter Tabs with Icons, Counts & Enhanced Hover Effects */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 pb-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = cat === 'All' 
                ? EXTENDED_RESOURCES.length 
                : EXTENDED_RESOURCES.filter(r => r.category === cat).length;

              const getCategoryIcon = (category: string) => {
                switch (category) {
                  case 'All': return <Layers className="w-3.5 h-3.5" />;
                  case 'Threat Reports': return <BarChart3 className="w-3.5 h-3.5" />;
                  case 'Guides & Whitepapers': return <BookOpen className="w-3.5 h-3.5" />;
                  case 'Security Checklists': return <CheckSquare className="w-3.5 h-3.5" />;
                  case 'Webinars & Events': return <Video className="w-3.5 h-3.5" />;
                  case 'Articles & Briefings': return <FileText className="w-3.5 h-3.5" />;
                  default: return <BookOpen className="w-3.5 h-3.5" />;
                }
              };

              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`group px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all duration-300 flex items-center space-x-2 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#F5762E] border-[#F5762E] text-white shadow-lg shadow-orange-950/40 ring-2 ring-[#F5762E]/30 scale-[1.02]'
                      : 'bg-[#111827] border-[#1F2937] text-[#94A3B8] hover:text-white hover:bg-[#1A2234] hover:border-[#F5762E]/70 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-950/20'
                  }`}
                >
                  <span className={`transition-colors ${isSelected ? 'text-white' : 'text-[#F5762E] group-hover:text-white'}`}>
                    {getCategoryIcon(cat)}
                  </span>
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-colors ${
                    isSelected 
                      ? 'bg-black/20 text-white' 
                      : 'bg-[#0B0F19] text-[#64748B] group-hover:text-white group-hover:bg-[#0B0F19]/80 border border-[#1F2937]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* High-Impact Visual Resource Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="group bg-[#111827] border border-[#1F2937] hover:border-[#F5762E]/70 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* 16:9 Image Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0B0F19] border-b border-[#1F2937]">
                  <Image
                    src={res.imageSrc}
                    alt={res.imageAlt}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent pointer-events-none"></div>

                  {/* Format Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0B0F19]/90 backdrop-blur-md border border-[#1F2937] text-[10px] font-mono text-[#F5762E] font-bold">
                    {res.format}
                  </div>

                  {/* Tag Pill */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#0B0F19]/80 backdrop-blur-md border border-[#1F2937] text-[9px] font-mono text-[#94A3B8] uppercase font-semibold">
                    {res.tag}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-[11px] font-mono text-[#64748B]">
                      <Clock className="w-3.5 h-3.5 text-[#F5762E]" />
                      <span>{res.readTime}</span>
                      <span>·</span>
                      <span>{res.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug group-hover:text-[#F5762E] transition-colors">
                      {res.title}
                    </h3>

                    <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                      {res.description}
                    </p>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-4 border-t border-[#1F2937] flex items-center justify-between text-xs font-mono text-white font-bold group-hover:text-[#F5762E] transition-colors">
                    <span>{res.downloadLabel}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. EXECUTIVE NEWSLETTER */}
      <section className="w-full bg-[#0E1424] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[760px] mx-auto text-center space-y-5 bg-[#111827] border border-[#1F2937] p-8 sm:p-10 rounded-2xl shadow-xl">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B0F19] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-[#22C55E] animate-pulse" />
            <span>WEEKLY THREAT INTELLIGENCE RADAR</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Curated Threat Intelligence Delivered Weekly
          </h2>

          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-lg mx-auto leading-relaxed">
            Real-world breach post-mortems, cyber-physical correlation playbooks, and regulatory frameworks delivered every Monday morning.
          </p>

          {newsletterSubmitted ? (
            <div className="p-4 rounded-xl bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 text-xs font-mono font-semibold flex items-center justify-center space-x-2 max-w-md mx-auto">
              <Check className="w-4 h-4" />
              <span>Subscribed! Your first executive intelligence dispatch arrives Monday.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter enterprise email..."
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#0B0F19] border border-[#1F2937] text-white placeholder-[#64748B] text-xs font-mono focus:outline-none focus:border-[#F5762E]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-mono font-bold text-xs transition-all whitespace-nowrap shadow-md cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[10px] font-mono text-[#64748B]">
            Zero spam. Unsubscribe with 1-click anytime.
          </p>

        </div>
      </section>

      {/* 5. CTA BAND */}
      <CtaBand 
        headline="Turn threat research into automated defense."
        subhead="Connect with our security architecture team to see how RedFort correlates live signals across your enterprise facilities and cloud infrastructure."
        buttonText="Request a Demo"
        buttonLink="/request-demo"
        showBullets={true}
      />

    </div>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-[#0B0F19] text-white p-20 text-center font-mono">Loading Resources...</div>}>
      <ResourcesContent />
    </Suspense>
  );
}
