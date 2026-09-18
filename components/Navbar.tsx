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
  Users,
  Award,
  ArrowRight,
  LayoutDashboard,
  LogOut,
  User
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
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('redfort_user');
        if (stored) {
          try {
            setUser(JSON.parse(stored));
          } catch (e) {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    window.addEventListener('redfort_auth_change', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('redfort_auth_change', checkAuth);
    };
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('redfort_user');
      window.dispatchEvent(new Event('redfort_auth_change'));
    }
    setUser(null);
  };

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

            <Link 
              href="/company/about-us" 
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                pathname.startsWith('/company') ? 'text-[#F5762E] font-semibold' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Company
            </Link>

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
          {user ? (
            <div className="hidden lg:flex items-center space-x-3">
              {/* User Profile Badge */}
              <div className="flex items-center space-x-2 bg-[#111827] px-2.5 py-1 rounded-lg border border-[#1F2937]">
                <div className="w-6 h-6 rounded-full bg-[#F5762E] text-white font-bold text-xs flex items-center justify-center">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-left font-mono">
                  <div className="text-xs font-semibold text-white leading-tight">{user.name}</div>
                  <div className="text-[10px] text-[#22C55E] leading-tight">● Active Session</div>
                </div>
              </div>

              {/* Go to Dashboard Button */}
              <Link
                href={
                  user?.role?.includes('Employee') || user?.role?.includes('Contractor') || user?.role?.includes('Portal')
                    ? '/dashboard/portal'
                    : (user?.role?.includes('Super') || user?.role?.includes('Governance')
                        ? '/dashboard/governance'
                        : (user?.role?.includes('CSO') 
                            ? '/dashboard/cso' 
                            : (user?.role?.includes('Guard') || user?.role?.includes('Field') 
                                ? '/dashboard/guard' 
                                : (user?.role?.includes('Auditor') || user?.role?.includes('Compliance') 
                                    ? '/dashboard/auditor' 
                                    : (user?.role?.includes('Admin') || user?.role?.includes('DevOps')
                                        ? '/dashboard/admin'
                                        : '/dashboard')))))
                }
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded text-xs font-semibold text-white bg-[#F5762E] hover:bg-[#FF9A5A] transition-all shadow-md focus:outline-none"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Go to Dashboard</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              {/* Quick Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-[#EF4444] rounded hover:bg-[#111827] transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-4">
              <Link 
                href="/login" 
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
          )}

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
            Company
          </Link>

          <Link
            href="/pricing"
            className="block py-2 text-sm font-semibold text-white border-b border-[#1F2937]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </Link>

          {user ? (
            <div className="pt-4 flex flex-col space-y-2">
              <div className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-[#111827] border border-[#1F2937]">
                <div className="w-7 h-7 rounded-full bg-[#F5762E] text-white font-bold text-xs flex items-center justify-center">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-left font-mono">
                  <div className="text-xs font-semibold text-white">{user.name}</div>
                  <div className="text-[10px] text-[#22C55E]">● Active Session</div>
                </div>
              </div>
              <Link
                href={
                  user?.role?.includes('Employee') || user?.role?.includes('Contractor') || user?.role?.includes('Portal')
                    ? '/dashboard/portal'
                    : (user?.role?.includes('Super') || user?.role?.includes('Governance')
                        ? '/dashboard/governance'
                        : (user?.role?.includes('CSO') 
                            ? '/dashboard/cso' 
                            : (user?.role?.includes('Guard') || user?.role?.includes('Field') 
                                ? '/dashboard/guard' 
                                : (user?.role?.includes('Auditor') || user?.role?.includes('Compliance') 
                                    ? '/dashboard/auditor' 
                                    : (user?.role?.includes('Admin') || user?.role?.includes('DevOps')
                                        ? '/dashboard/admin'
                                        : '/dashboard')))))
                }
                className="w-full text-center py-2.5 rounded bg-[#F5762E] text-white font-semibold text-xs flex items-center justify-center space-x-1.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Go to Dashboard</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 rounded border border-[#EF4444]/30 text-[#EF4444] text-xs font-semibold flex items-center justify-center space-x-1.5 hover:bg-[#EF4444]/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="pt-4 flex flex-col space-y-2">
              <Link
                href="/request-demo"
                className="w-full text-center py-2.5 rounded bg-[#F5762E] text-white font-semibold text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Request a Demo
              </Link>
              <Link
                href="/login"
                className="w-full text-center py-2 rounded border border-[#1F2937] text-[#94A3B8] text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Client Login
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
