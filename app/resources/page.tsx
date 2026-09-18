'use strict';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Sparkles
} from 'lucide-react';
import { RESOURCES_DATA } from '@/lib/siteData';
import CtaBand from '@/components/CtaBand';

const categoryIcons: Record<string, React.ReactNode> = {
  'Articles': <FileText className="w-4 h-4 text-[#F5762E]" />,
  'Checklists': <CheckSquare className="w-4 h-4 text-[#F5762E]" />,
  'Reports': <BarChart3 className="w-4 h-4 text-[#F5762E]" />,
  'Guides & Whitepapers': <BookOpen className="w-4 h-4 text-[#F5762E]" />,
  'Webinars': <Video className="w-4 h-4 text-[#F5762E]" />,
  'Events': <Calendar className="w-4 h-4 text-[#F5762E]" />
};

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState<boolean>(false);

  const categories = ['All', 'Articles', 'Checklists', 'Reports', 'Guides & Whitepapers', 'Webinars', 'Events'];

  const filteredResources = selectedCategory === 'All'
    ? RESOURCES_DATA
    : RESOURCES_DATA.filter(r => r.category === selectedCategory || (selectedCategory === 'Guides & Whitepapers' && r.category.includes('Guides')));

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
    }
  };

  return (
    <div className="w-full flex flex-col font-sans selection:bg-[#F5762E] selection:text-white">
      
      {/* 1. HERO SECTION [dark bg: #0B0F19] */}
      <section className="relative w-full bg-[#0B0F19] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F5762E]/10 blur-[130px] pointer-events-none rounded-full"></div>

        <div className="max-w-[1280px] mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>KNOWLEDGE HUB & RESEARCH</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Build your security knowledge.
          </h1>

          <p className="text-base sm:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Guides, checklists, and reports for modern security teams.
          </p>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS & FEATURED RESOURCES GRID [light bg: #F7F7F5] */}
      <section className="w-full bg-[#F7F7F5] text-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          {/* Category Filter Pill Row */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0B0F19] text-white shadow-sm'
                    : 'bg-white border border-[#E2E8F0] text-[#475569] hover:text-[#0B0F19] hover:border-[#0B0F19]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Resources Grid (6-9 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#F5762E] transition-all flex flex-col justify-between"
              >
                {/* Visual Header / Thumbnail Box */}
                <div className="bg-[#0B0F19] p-6 text-white relative flex items-center justify-between border-b border-[#1F2937]">
                  <div className="w-10 h-10 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-center">
                    {categoryIcons[res.category] || <FileText className="w-5 h-5 text-[#F5762E]" />}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#111827] text-[#F5762E] border border-[#1F2937] uppercase font-bold">
                    {res.tag}
                  </span>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-[11px] font-mono text-[#475569]">
                      <Clock className="w-3.5 h-3.5 text-[#F5762E]" />
                      <span>{res.readTime}</span>
                      <span>·</span>
                      <span>{res.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0B0F19] leading-snug">
                      {res.title}
                    </h3>

                    <p className="text-xs text-[#475569] leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-mono text-[#0B0F19] font-bold">
                    <span>Access Resource</span>
                    <ArrowRight className="w-4 h-4 text-[#F5762E]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. NEWSLETTER SIGNUP [dark bg: #0B0F19] */}
      <section className="w-full bg-[#0B0F19] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F2937]">
        <div className="max-w-[800px] mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#111827] border border-[#1F2937] text-[#F5762E] text-xs font-mono font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>WEEKLY THREAT INTELLIGENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Get security insights sent to your inbox.
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto">
            Weekly research on cyber-physical threat correlation, GSOC best practices, regulatory checklists, and incident response frameworks.
          </p>

          {newsletterSubmitted ? (
            <div className="p-4 rounded-lg bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 text-xs font-mono font-semibold flex items-center justify-center space-x-2 max-w-md mx-auto">
              <Check className="w-4 h-4" />
              <span>You're subscribed! Expect your first executive security briefing on Monday.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter work email..."
                className="flex-1 px-4 py-3 rounded bg-[#111827] border border-[#1F2937] text-white placeholder-[#94A3B8] text-sm focus:outline-none focus:border-[#F5762E]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-semibold text-sm transition-all whitespace-nowrap shadow-md"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[11px] font-mono text-[#94A3B8]">
            We respect your privacy. Zero spam. Unsubscribe with single click at any time.
          </p>

        </div>
      </section>

      {/* Standard CTA Band */}
      <CtaBand 
        headline="Fortify every asset. Secure every operation."
        subhead="Ready to see how RedFort turns security research into automated protection across your physical and cyber perimeters?"
        buttonText="Request a Demo"
        buttonLink="/request-demo"
        showBullets={true}
      />

    </div>
  );
}
