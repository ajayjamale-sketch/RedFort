'use strict';
import React from 'react';
import Link from 'next/link';
import { Shield, ArrowUpRight, Lock, CheckCircle2 } from 'lucide-react';
import { PRODUCT_MODULES, INDUSTRY_SOLUTIONS } from '@/lib/siteData';
import Logo from '@/components/Logo';

// SVG Social Icons (Clean, No Emojis, High-Res Vector Paths)
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function TwitterXIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0B0F19] text-[#94A3B8] border-t border-[#1F2937] pt-16 pb-12 font-sans">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand & Mission Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 pb-12 border-b border-[#1F2937]">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block focus:outline-none">
              <Logo variant="full" theme="dark" size="md" showSubtitle={false} />
            </Link>
            
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              Fortify Every Asset. Secure Every Operation. The unified enterprise security management platform bridging cybersecurity, physical PACS, CCTV surveillance, and GRC compliance into a single GSOC command center.
            </p>

            <div className="text-xs font-mono text-[#94A3B8] space-y-1">
              <div>Global Headquarters: One World Trade Center, Suite 7800, New York, NY 10007</div>
              <div>Emergency SOC Desk: +1 (800) 733-3678 · contact@redfort.security</div>
            </div>

            {/* Social Icons (SVG Vector Paths, No Emojis) */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-center text-[#94A3B8] hover:text-[#F5762E] hover:border-[#F5762E] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-center text-[#94A3B8] hover:text-[#F5762E] hover:border-[#F5762E] transition-colors"
                aria-label="X / Twitter"
              >
                <TwitterXIcon />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-center text-[#94A3B8] hover:text-[#F5762E] hover:border-[#F5762E] transition-colors"
                aria-label="YouTube"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* Column Groups */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
            
            {/* Products Column */}
            <div>
              <h4 className="font-mono text-white uppercase tracking-wider font-semibold mb-4 text-xs">
                Products (9)
              </h4>
              <ul className="space-y-2.5">
                {PRODUCT_MODULES.map((m) => (
                  <li key={m.id}>
                    <Link href={`/products/${m.slug}`} className="hover:text-white transition-colors">
                      {m.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions Column */}
            <div>
              <h4 className="font-mono text-white uppercase tracking-wider font-semibold mb-4 text-xs">
                Industries (10)
              </h4>
              <ul className="space-y-2.5">
                {INDUSTRY_SOLUTIONS.map((ind) => (
                  <li key={ind.id}>
                    <Link href={`/solutions#${ind.slug}`} className="hover:text-white transition-colors">
                      {ind.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="font-mono text-white uppercase tracking-wider font-semibold mb-4 text-xs">
                Resources
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/resources?tab=Articles" className="hover:text-white transition-colors">Articles & Briefings</Link>
                </li>
                <li>
                  <Link href="/resources?tab=Checklists" className="hover:text-white transition-colors">Security Checklists</Link>
                </li>
                <li>
                  <Link href="/resources?tab=Reports" className="hover:text-white transition-colors">Threat Reports</Link>
                </li>
                <li>
                  <Link href="/resources?tab=Guides" className="hover:text-white transition-colors">Guides & Whitepapers</Link>
                </li>
                <li>
                  <Link href="/resources?tab=Webinars" className="hover:text-white transition-colors">Live & On-Demand Webinars</Link>
                </li>
                <li>
                  <Link href="/resources?tab=Events" className="hover:text-white transition-colors">Global Events</Link>
                </li>
              </ul>
            </div>

            {/* Company & Legal Column */}
            <div>
              <h4 className="font-mono text-white uppercase tracking-wider font-semibold mb-4 text-xs">
                Company & Trust
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/company/about-us" className="hover:text-white transition-colors">About RedFort</Link>
                </li>
                <li>
                  <Link href="/company/trust-and-security" className="hover:text-white transition-colors">Trust & Security</Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">Platform Pricing</Link>
                </li>
                <li>
                  <Link href="/company/about-us#careers" className="hover:text-white transition-colors">Careers</Link>
                </li>
                <li>
                  <Link href="/company/about-us#newsroom" className="hover:text-white transition-colors">Newsroom</Link>
                </li>
                <li>
                  <Link href="/company/about-us#partners" className="hover:text-white transition-colors">Technology Partners</Link>
                </li>
                <li className="pt-2 border-t border-[#1F2937] text-[11px] text-[#94A3B8]">
                  <span>Legal & Compliance:</span>
                </li>
                <li>
                  <Link href="/company/trust-and-security" className="hover:text-white transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/company/trust-and-security" className="hover:text-white transition-colors">Terms of Use</Link>
                </li>
                <li>
                  <Link href="/company/trust-and-security" className="hover:text-white transition-colors">Data Processing (DPA)</Link>
                </li>
                <li>
                  <Link href="/company/trust-and-security" className="hover:text-white transition-colors">Security Overview</Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#94A3B8] space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span>&copy; {new Date().getFullYear()} RedFort Technologies, Inc. All rights reserved.</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">End-to-End Encrypted & Immutable Audit Logs</span>
          </div>

          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span className="flex items-center space-x-1.5 text-[#22C55E]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>SOC 2 Type II</span>
            </span>
            <span className="flex items-center space-x-1.5 text-[#22C55E]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ISO 27001</span>
            </span>
            <span className="flex items-center space-x-1.5 text-[#22C55E]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>FedRAMP In-Process</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
