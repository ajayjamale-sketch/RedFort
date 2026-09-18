'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, 
  ChevronDown, 
  Menu, 
  X, 
  Activity, 
  Cpu, 
  Building2, 
  KeyRound, 
  AlertTriangle, 
  ShieldAlert, 
  FileCheck2, 
  BarChart3, 
  BellRing,
  Plane,
  Landmark,
  Hospital,
  Building,
  Factory,
  Server,
  GraduationCap,
  Truck,
  Layers,
  FileText,
  CheckSquare,
  BookOpen,
  Video,
  Calendar,
  Lock,
  ExternalLink,
  Users,
  Award,
  ArrowRight
} from 'lucide-react';
import { PRODUCT_MODULES, INDUSTRY_SOLUTIONS } from '@/lib/siteData';
import Logo from '@/components/Logo';

const moduleIcons: Record<string, React.ReactNode> = {
  'soc-dashboard': <Activity className="w-4 h-4 text-[#F5762E]" />,
  'cyber-threat-monitoring': <Cpu className="w-4 h-4 text-[#F5762E]" />,
  'physical-security': <Building2 className="w-4 h-4 text-[#F5762E]" />,
  'identity-access-control': <KeyRound className="w-4 h-4 text-[#F5762E]" />,
  'incident-response': <AlertTriangle className="w-4 h-4 text-[#F5762E]" />,
  'risk-vulnerability': <ShieldAlert className="w-4 h-4 text-[#F5762E]" />,
  'compliance-audit': <FileCheck2 className="w-4 h-4 text-[#F5762E]" />,
  'security-analytics': <BarChart3 className="w-4 h-4 text-[#F5762E]" />,
  'emergency-alerts': <BellRing className="w-4 h-4 text-[#F5762E]" />
};

const industryIcons: Record<string, React.ReactNode> = {
  airports: <Plane className="w-4 h-4 text-[#F5762E]" />,
  banks: <Landmark className="w-4 h-4 text-[#F5762E]" />,
  hospitals: <Hospital className="w-4 h-4 text-[#F5762E]" />,
  government: <Building className="w-4 h-4 text-[#F5762E]" />,
  enterprises: <Layers className="w-4 h-4 text-[#F5762E]" />,
  manufacturing: <Factory className="w-4 h-4 text-[#F5762E]" />,
  'it-companies': <Server className="w-4 h-4 text-[#F5762E]" />,
  universities: <GraduationCap className="w-4 h-4 text-[#F5762E]" />,
  logistics: <Truck className="w-4 h-4 text-[#F5762E]" />,
  'smart-cities': <Building2 className="w-4 h-4 text-[#F5762E]" />
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full bg-[#0B0F19]/95 backdrop-blur-md border-b border-[#1F2937]">
      {/* Top Announcement Ribbon */}
      <div className="bg-[#111827] text-xs text-[#94A3B8] border-b border-[#1F2937] py-1.5 px-4 hidden md:block">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span className="font-mono text-[11px] text-[#F5762E] font-semibold uppercase tracking-wider">New Intelligence Report:</span>
            <span>2026 Cyber-Physical Threat Convergence Outlook</span>
            <Link href="/resources" className="text-white hover:text-[#F5762E] inline-flex items-center space-x-1 font-medium underline ml-2">
              <span>Read Analysis</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono text-[#94A3B8]">
            <span>GSOC Status: Nominal (99.99%)</span>
            <span>Emergency 24/7: +1 (800) 733-3678</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="focus:outline-none">
            <Logo variant="full" theme="dark" size="md" showSubtitle={true} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link 
              href="/platform" 
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                pathname === '/platform' ? 'text-[#F5762E] font-semibold' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Platform
            </Link>

            {/* Products Mega Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
                className={`px-3 py-2 rounded text-sm font-medium flex items-center space-x-1 transition-colors ${
                  pathname.startsWith('/products') || activeDropdown === 'products'
                    ? 'text-[#F5762E] font-semibold' 
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'products' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[760px] bg-[#111827] border border-[#1F2937] rounded-lg shadow-2xl p-6 grid grid-cols-3 gap-4 z-50">
                  <div className="col-span-3 pb-3 border-b border-[#1F2937] flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">RedFort Unified Product Suite</h4>
                      <p className="text-xs text-[#94A3B8]">9 integrated modules designed to operate standalone or unified in GSOC.</p>
                    </div>
                    <Link 
                      href="/products" 
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-mono text-[#F5762E] hover:text-[#FF9A5A] flex items-center space-x-1"
                    >
                      <span>View All Modules</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {PRODUCT_MODULES.map((mod) => (
                    <Link
                      key={mod.id}
                      href={`/products/${mod.slug}`}
                      onClick={() => setActiveDropdown(null)}
                      className="group p-2.5 rounded border border-transparent hover:border-[#1F2937] hover:bg-[#0B0F19] transition-all flex flex-col justify-start"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="p-1 rounded bg-[#0B0F19] group-hover:bg-[#111827] border border-[#1F2937] transition-colors">
                          {moduleIcons[mod.id] || <Shield className="w-4 h-4 text-[#F5762E]" />}
                        </div>
                        <span className="text-xs font-semibold text-white group-hover:text-[#F5762E] transition-colors">
                          {mod.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#94A3B8] line-clamp-2 leading-relaxed">
                        {mod.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')}
                className={`px-3 py-2 rounded text-sm font-medium flex items-center space-x-1 transition-colors ${
                  pathname.startsWith('/solutions') || activeDropdown === 'solutions'
                    ? 'text-[#F5762E] font-semibold' 
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'solutions' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[680px] bg-[#111827] border border-[#1F2937] rounded-lg shadow-2xl p-6 grid grid-cols-2 gap-3 z-50">
                  <div className="col-span-2 pb-3 border-b border-[#1F2937] flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Solutions by Industry</h4>
                      <p className="text-xs text-[#94A3B8]">Purpose-built security architectures for high-consequence environments.</p>
                    </div>
                    <Link 
                      href="/solutions" 
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-mono text-[#F5762E] hover:text-[#FF9A5A] flex items-center space-x-1"
                    >
                      <span>Explore All Industries</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {INDUSTRY_SOLUTIONS.map((ind) => (
                    <Link
                      key={ind.id}
                      href={`/solutions#${ind.slug}`}
                      onClick={() => setActiveDropdown(null)}
                      className="group p-2 rounded hover:bg-[#0B0F19] border border-transparent hover:border-[#1F2937] flex items-start space-x-3 transition-all"
                    >
                      <div className="p-1.5 rounded bg-[#0B0F19] group-hover:bg-[#111827] border border-[#1F2937] transition-colors mt-0.5">
                        {industryIcons[ind.id] || <Building2 className="w-4 h-4 text-[#F5762E]" />}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white group-hover:text-[#F5762E] transition-colors block">
                          {ind.name}
                        </span>
                        <p className="text-[11px] text-[#94A3B8] line-clamp-1">
                          {ind.oneLiner}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                className={`px-3 py-2 rounded text-sm font-medium flex items-center space-x-1 transition-colors ${
                  pathname.startsWith('/resources') || activeDropdown === 'resources'
                    ? 'text-[#F5762E] font-semibold' 
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[440px] bg-[#111827] border border-[#1F2937] rounded-lg shadow-2xl p-5 grid grid-cols-2 gap-3 z-50">
                  <div className="col-span-2 pb-2 border-b border-[#1F2937]">
                    <h4 className="text-xs font-mono uppercase text-[#F5762E] font-semibold">Knowledge & Research</h4>
                  </div>
                  <Link href="/resources?tab=Articles" onClick={() => setActiveDropdown(null)} className="p-2 rounded hover:bg-[#0B0F19] flex items-center space-x-2 text-xs text-white hover:text-[#F5762E]">
                    <FileText className="w-4 h-4 text-[#F5762E]" />
                    <span>Articles</span>
                  </Link>
                  <Link href="/resources?tab=Checklists" onClick={() => setActiveDropdown(null)} className="p-2 rounded hover:bg-[#0B0F19] flex items-center space-x-2 text-xs text-white hover:text-[#F5762E]">
                    <CheckSquare className="w-4 h-4 text-[#F5762E]" />
                    <span>Checklists</span>
                  </Link>
                  <Link href="/resources?tab=Reports" onClick={() => setActiveDropdown(null)} className="p-2 rounded hover:bg-[#0B0F19] flex items-center space-x-2 text-xs text-white hover:text-[#F5762E]">
                    <BarChart3 className="w-4 h-4 text-[#F5762E]" />
                    <span>Reports</span>
                  </Link>
                  <Link href="/resources?tab=Guides" onClick={() => setActiveDropdown(null)} className="p-2 rounded hover:bg-[#0B0F19] flex items-center space-x-2 text-xs text-white hover:text-[#F5762E]">
                    <BookOpen className="w-4 h-4 text-[#F5762E]" />
                    <span>Guides & Whitepapers</span>
                  </Link>
                  <Link href="/resources?tab=Webinars" onClick={() => setActiveDropdown(null)} className="p-2 rounded hover:bg-[#0B0F19] flex items-center space-x-2 text-xs text-white hover:text-[#F5762E]">
                    <Video className="w-4 h-4 text-[#F5762E]" />
                    <span>Webinars</span>
                  </Link>
                  <Link href="/resources?tab=Events" onClick={() => setActiveDropdown(null)} className="p-2 rounded hover:bg-[#0B0F19] flex items-center space-x-2 text-xs text-white hover:text-[#F5762E]">
                    <Calendar className="w-4 h-4 text-[#F5762E]" />
                    <span>Events</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'company' ? null : 'company')}
                className={`px-3 py-2 rounded text-sm font-medium flex items-center space-x-1 transition-colors ${
                  pathname.startsWith('/company') || activeDropdown === 'company'
                    ? 'text-[#F5762E] font-semibold' 
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <span>Company</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'company' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'company' && (
                <div className="absolute right-0 top-full mt-2 w-[340px] bg-[#111827] border border-[#1F2937] rounded-lg shadow-2xl p-4 flex flex-col space-y-1.5 z-50">
                  <div className="pb-2 border-b border-[#1F2937]">
                    <h4 className="text-xs font-mono uppercase text-[#F5762E] font-semibold">About RedFort</h4>
                  </div>
                  <Link href="/company/about-us" onClick={() => setActiveDropdown(null)} className="p-2 rounded hover:bg-[#0B0F19] flex items-center space-x-3 text-xs text-white hover:text-[#F5762E]">
                    <Users className="w-4 h-4 text-[#F5762E]" />
                    <div>
                      <div className="font-semibold">About Us</div>
                      <div className="text-[11px] text-[#94A3B8]">Mission, leadership, and vision</div>
                    </div>
                  </Link>
                  <Link href="/company/trust-and-security" onClick={() => setActiveDropdown(null)} className="p-2 rounded hover:bg-[#0B0F19] flex items-center space-x-3 text-xs text-white hover:text-[#F5762E]">
                    <Lock className="w-4 h-4 text-[#F5762E]" />
                    <div>
                      <div className="font-semibold">Trust & Security</div>
                      <div className="text-[11px] text-[#94A3B8]">SOC 2, ISO 27001, and architecture</div>
                    </div>
                  </Link>
                  <Link href="/company/about-us#careers" onClick={() => setActiveDropdown(null)} className="p-2 rounded hover:bg-[#0B0F19] flex items-center space-x-3 text-xs text-white hover:text-[#F5762E]">
                    <Award className="w-4 h-4 text-[#F5762E]" />
                    <div>
                      <div className="font-semibold">Careers</div>
                      <div className="text-[11px] text-[#94A3B8]">Join our mission in defense</div>
                    </div>
                  </Link>
                  <Link href="/company/about-us#newsroom" onClick={() => setActiveDropdown(null)} className="p-2 rounded hover:bg-[#0B0F19] flex items-center space-x-3 text-xs text-white hover:text-[#F5762E]">
                    <FileText className="w-4 h-4 text-[#F5762E]" />
                    <div>
                      <div className="font-semibold">Newsroom</div>
                      <div className="text-[11px] text-[#94A3B8]">Press releases and announcements</div>
                    </div>
                  </Link>
                  <Link href="/company/about-us#partners" onClick={() => setActiveDropdown(null)} className="p-2 rounded hover:bg-[#0B0F19] flex items-center space-x-3 text-xs text-white hover:text-[#F5762E]">
                    <Layers className="w-4 h-4 text-[#F5762E]" />
                    <div>
                      <div className="font-semibold">Partners</div>
                      <div className="text-[11px] text-[#94A3B8]">SIEM, CCTV, and PACS integrations</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/pricing" 
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                pathname === '/pricing' ? 'text-[#F5762E] font-semibold' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop Right Utilities */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              href="/request-demo" 
              className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors"
            >
              Client Login
            </Link>
            <Link
              href="/request-demo"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded text-sm font-semibold text-white bg-[#F5762E] hover:bg-[#FF9A5A] transition-all shadow-md focus:outline-none"
            >
              Request a Demo
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/request-demo"
              className="px-3 py-1.5 rounded text-xs font-semibold text-white bg-[#F5762E] hover:bg-[#FF9A5A]"
            >
              Demo
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-[#94A3B8] hover:text-white hover:bg-[#111827] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F19] border-b border-[#1F2937] max-h-[85vh] overflow-y-auto px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/platform"
            className="block py-2 text-sm font-semibold text-white border-b border-[#1F2937]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Platform
          </Link>

          {/* Mobile Products Accordion */}
          <div>
            <button
              onClick={() => setMobileSection(mobileSection === 'products' ? null : 'products')}
              className="w-full flex items-center justify-between py-2 text-sm font-semibold text-white border-b border-[#1F2937]"
            >
              <span>Products (9 Modules)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileSection === 'products' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSection === 'products' && (
              <div className="pl-3 py-2 space-y-2 bg-[#111827]/60 rounded mt-1">
                {PRODUCT_MODULES.map((m) => (
                  <Link
                    key={m.id}
                    href={`/products/${m.slug}`}
                    className="block text-xs text-[#94A3B8] hover:text-[#F5762E] py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {m.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Solutions Accordion */}
          <div>
            <button
              onClick={() => setMobileSection(mobileSection === 'solutions' ? null : 'solutions')}
              className="w-full flex items-center justify-between py-2 text-sm font-semibold text-white border-b border-[#1F2937]"
            >
              <span>Solutions by Industry</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileSection === 'solutions' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSection === 'solutions' && (
              <div className="pl-3 py-2 space-y-2 bg-[#111827]/60 rounded mt-1">
                {INDUSTRY_SOLUTIONS.map((ind) => (
                  <Link
                    key={ind.id}
                    href={`/solutions#${ind.slug}`}
                    className="block text-xs text-[#94A3B8] hover:text-[#F5762E] py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {ind.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/resources"
            className="block py-2 text-sm font-semibold text-white border-b border-[#1F2937]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Resources
          </Link>

          <Link
            href="/company/about-us"
            className="block py-2 text-sm font-semibold text-white border-b border-[#1F2937]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Company & About Us
          </Link>

          <Link
            href="/company/trust-and-security"
            className="block py-2 text-sm font-semibold text-white border-b border-[#1F2937]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Trust & Security
          </Link>

          <Link
            href="/pricing"
            className="block py-2 text-sm font-semibold text-white border-b border-[#1F2937]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </Link>

          <div className="pt-4 flex flex-col space-y-2">
            <Link
              href="/request-demo"
              className="w-full text-center py-2.5 rounded bg-[#F5762E] text-white font-semibold text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Request a Demo
            </Link>
            <Link
              href="/request-demo"
              className="w-full text-center py-2 rounded border border-[#1F2937] text-[#94A3B8] text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Client Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
