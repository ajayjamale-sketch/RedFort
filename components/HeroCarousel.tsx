'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Shield, 
  Activity, 
  Cpu, 
  Building2, 
  BarChart3, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Radio, 
  CheckCircle2, 
  Zap, 
  Lock,
  ArrowRight
} from 'lucide-react';

interface HeroSlide {
  id: string;
  tag: string;
  title: string;
  caption: string;
  imageSrc: string;
  badgeText: string;
  metric1: { label: string; value: string };
  metric2: { label: string; value: string };
  metric3: { label: string; value: string };
  icon: React.ReactNode;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'gsoc',
    tag: '01 / CENTRALIZED GSOC COMMAND',
    title: 'Global Security Operations Center',
    caption: 'Unified real-time monitoring across distributed data centers, enterprise campuses, and cloud infrastructure.',
    imageSrc: '/images/hero-gsoc.jpg',
    badgeText: 'STREAMING 12,400 EPS',
    metric1: { label: 'Event Ingestion', value: '< 10ms Latency' },
    metric2: { label: 'Active Facilities', value: '500+ Connected' },
    metric3: { label: 'Platform Availability', value: '99.999% SLA' },
    icon: <Activity className="w-4 h-4" />
  },
  {
    id: 'correlation',
    tag: '02 / COMPLEX EVENT PROCESSING',
    title: 'Cyber-Physical Threat Correlation',
    caption: 'Instant correlation connecting digital auth logs with physical badge swipes to intercept multi-vector threats.',
    imageSrc: '/images/hero-correlation.jpg',
    badgeText: 'SUB-100MS CEP ENGINE',
    metric1: { label: 'Detection Speed', value: '84ms' },
    metric2: { label: 'False Positives', value: '-82% Drop' },
    metric3: { label: 'Automated Containment', value: 'Zero-Touch' },
    icon: <Cpu className="w-4 h-4" />
  },
  {
    id: 'physical',
    tag: '03 / SMART FACILITIES & PACS',
    title: 'Physical Access & Perimeter Defense',
    caption: 'Seamless management of biometric turnstiles, 4K CCTV camera matrices, and visitor pass workflows.',
    imageSrc: '/images/hero-physical.jpg',
    badgeText: 'ALL CHECKPOINTS SECURED',
    metric1: { label: 'Biometric Readers', value: '100% Online' },
    metric2: { label: 'Visitor Pass Overstays', value: '0 Detected' },
    metric3: { label: 'PTZ Tracking', value: 'Auto-Triggered' },
    icon: <Building2 className="w-4 h-4" />
  },
  {
    id: 'executive',
    tag: '04 / BOARD GOVERNANCE & GRC',
    title: 'Executive Posture & Compliance Analytics',
    caption: 'Continuous security posture ratings, automated risk heatmaps, and audit-ready reports for SOC 2 and ISO 27001.',
    imageSrc: '/images/hero-executive.jpg',
    badgeText: 'AUDIT READY (100%)',
    metric1: { label: 'Posture Rating', value: '96.4%' },
    metric2: { label: 'MTTR Improvement', value: '78% Faster' },
    metric3: { label: 'Compliance Controls', value: '100% Verified' },
    icon: <BarChart3 className="w-4 h-4" />
  }
];

export default function HeroCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentSlide = HERO_SLIDES[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="w-full relative max-w-6xl mx-auto rounded-2xl overflow-hidden border border-[#1F2937] bg-[#0B0F19] shadow-2xl font-sans">
      
      {/* Visual Window (16:9 Aspect Ratio Container) */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0A1120]">
        
        {/* Background Image with Cinematic Overlay Gradients */}
        <Image
          key={currentSlide.id}
          src={currentSlide.imageSrc}
          alt={currentSlide.title}
          fill
          priority
          unoptimized
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="object-cover object-center transition-all duration-700 ease-out scale-100 hover:scale-105"
        />

        {/* Ambient Dark Gradient Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/80 via-transparent to-[#0B0F19]/40 pointer-events-none"></div>

        {/* Top Header Floating Badge inside Carousel */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-20">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B0F19]/80 backdrop-blur-md border border-[#1F2937] text-white text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span className="text-[#F5762E] font-semibold">{currentSlide.tag}</span>
          </div>

          <div className="px-3 py-1 rounded-full bg-[#0B0F19]/80 backdrop-blur-md border border-[#1F2937] text-[#22C55E] text-[11px] font-mono font-semibold hidden sm:inline-block">
            {currentSlide.badgeText}
          </div>
        </div>

        {/* Bottom Slide Info Overlay Card (Glassmorphic) */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-20">
          <div className="bg-[#0B0F19]/90 backdrop-blur-md border border-[#1F2937] rounded-xl p-4 sm:p-6 shadow-2xl space-y-3">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  {currentSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl mt-1 leading-relaxed">
                  {currentSlide.caption}
                </p>
              </div>

              <Link
                href="/platform"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-mono font-semibold uppercase tracking-wider transition-all self-start md:self-auto shrink-0 shadow-md"
              >
                <span>Live View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 border-t border-[#1F2937]/70 font-mono text-xs">
              <div className="bg-[#111827]/70 p-2 sm:p-2.5 rounded border border-[#1F2937]/60">
                <div className="text-[10px] text-[#94A3B8] uppercase">{currentSlide.metric1.label}</div>
                <div className="text-xs sm:text-sm font-bold text-white">{currentSlide.metric1.value}</div>
              </div>
              <div className="bg-[#111827]/70 p-2 sm:p-2.5 rounded border border-[#1F2937]/60">
                <div className="text-[10px] text-[#94A3B8] uppercase">{currentSlide.metric2.label}</div>
                <div className="text-xs sm:text-sm font-bold text-[#F5762E]">{currentSlide.metric2.value}</div>
              </div>
              <div className="bg-[#111827]/70 p-2 sm:p-2.5 rounded border border-[#1F2937]/60">
                <div className="text-[10px] text-[#94A3B8] uppercase">{currentSlide.metric3.label}</div>
                <div className="text-xs sm:text-sm font-bold text-[#22C55E]">{currentSlide.metric3.value}</div>
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Arrow Navigation Controls */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-[#0B0F19]/80 hover:bg-[#F5762E] border border-[#1F2937] text-white transition-colors focus:outline-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-[#0B0F19]/80 hover:bg-[#F5762E] border border-[#1F2937] text-white transition-colors focus:outline-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>

      {/* Bottom Interactive Slide Tab Selector Bar */}
      <div className="bg-[#111827] px-4 py-3 border-t border-[#1F2937] flex items-center justify-between flex-wrap gap-3">
        
        {/* Slide Selector Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIdx;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentIdx(idx)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                  isActive
                    ? 'bg-[#0B0F19] text-white border-[#F5762E] font-bold shadow-sm'
                    : 'bg-transparent text-[#94A3B8] border-transparent hover:text-white hover:bg-[#0B0F19]/40'
                }`}
              >
                <span className={isActive ? 'text-[#F5762E]' : 'text-[#94A3B8]'}>
                  {slide.icon}
                </span>
                <span className="hidden md:inline">{slide.title}</span>
                <span className="md:hidden">0{idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Play/Pause & Status */}
        <div className="flex items-center space-x-3 text-xs font-mono text-[#94A3B8]">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded bg-[#0B0F19] hover:text-white border border-[#1F2937] focus:outline-none"
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#F5762E]" /> : <Play className="w-3.5 h-3.5 text-[#22C55E]" />}
          </button>
          <span className="hidden sm:inline">
            Slide {currentIdx + 1} of {HERO_SLIDES.length}
          </span>
        </div>

      </div>

    </div>
  );
}
