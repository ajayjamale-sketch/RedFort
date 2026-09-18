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

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

function SlackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
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

            {/* Social Icons (6 Bespoke Vector Channels, No Emojis) */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-center text-[#94A3B8] hover:text-[#F5762E] hover:border-[#F5762E] transition-colors"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-center text-[#94A3B8] hover:text-[#F5762E] hover:border-[#F5762E] transition-colors"
                aria-label="X / Twitter"
                title="X (Twitter)"
              >
                <TwitterXIcon />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-center text-[#94A3B8] hover:text-[#F5762E] hover:border-[#F5762E] transition-colors"
                aria-label="GitHub"
                title="GitHub"
              >
                <GitHubIcon />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-center text-[#94A3B8] hover:text-[#F5762E] hover:border-[#F5762E] transition-colors"
                aria-label="YouTube"
                title="YouTube"
              >
                <YouTubeIcon />
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-center text-[#94A3B8] hover:text-[#F5762E] hover:border-[#F5762E] transition-colors"
                aria-label="Discord"
                title="Discord"
              >
                <DiscordIcon />
              </a>
              <a 
                href="https://slack.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded bg-[#111827] border border-[#1F2937] flex items-center justify-center text-[#94A3B8] hover:text-[#F5762E] hover:border-[#F5762E] transition-colors"
                aria-label="Slack"
                title="Slack Community"
              >
                <SlackIcon />
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

            {/* Company Column */}
            <div>
              <h4 className="font-mono text-white uppercase tracking-wider font-semibold mb-4 text-xs">
                Company
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/company/about-us" className="hover:text-white transition-colors">About Us</Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">Pricing & Plans</Link>
                </li>
                <li>
                  <Link href="/request-demo" className="hover:text-white transition-colors">Request a Demo</Link>
                </li>
                <li className="pt-2 border-t border-[#1F2937] text-[11px] text-[#94A3B8]">
                  <span>Trust & Governance:</span>
                </li>
                <li>
                  <Link href="/company/trust-and-security" className="hover:text-white transition-colors">Security & Privacy</Link>
                </li>
                <li>
                  <Link href="/company/trust-and-security" className="hover:text-white transition-colors">Terms of Service</Link>
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
