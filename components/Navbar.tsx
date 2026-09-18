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

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileSection(null);
  }, [pathname]);

  // Auth sync
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

  // Close dropdown on click outside or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Determine user's target dashboard route
  const getDashboardHref = (role?: string) => {
    if (!role) return '/dashboard';
    const r = role.toLowerCase();
    if (r.includes('employee') || r.includes('contractor') || r.includes('portal') || r.includes('staff')) return '/dashboard/portal';
    if (r.includes('super') || r.includes('governance')) return '/dashboard/governance';
    if (r.includes('cso')) return '/dashboard/cso';
    if (r.includes('guard') || r.includes('field') || r.includes('officer')) return '/dashboard/guard';
    if (r.includes('auditor') || r.includes('compliance')) return '/dashboard/auditor';
    if (r.includes('admin') || r.includes('devops') || r.includes('infrastructure')) return '/dashboard/admin';
    return '/dashboard';
  };

  const dashboardHref = getDashboardHref(user?.role || user?.name);

  // Parse user display name and title
  const rawName = user?.name || 'Operator';
  const nameParts = rawName.split(',');
  const shortName = nameParts[0].trim();
  const subTitle = nameParts[1]?.trim() || user?.role || 'Active Session';
  const initials = shortName
    .split(' ')
    .filter(Boolean)
    .map(p => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'RF';

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full bg-[#0B0F19]/95 backdrop-blur-md border-b border-[#1E293B]">
      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link href="/" className="focus:outline-none flex items-center shrink-0">
            <Logo variant="full" theme="dark" size="sm" showSubtitle={true} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link 
              href="/platform" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === '/platform' 
                  ? 'text-[#F5762E] font-semibold bg-[#F5762E]/10' 
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#111827]'
              }`}
            >
              Platform
            </Link>

            {/* Products Mega Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-all ${
                  pathname.startsWith('/products') || activeDropdown === 'products'
                    ? 'text-[#F5762E] font-semibold bg-[#F5762E]/10' 
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#111827]'
                }`}
                aria-expanded={activeDropdown === 'products'}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180 text-[#F5762E]' : ''}`} />
              </button>

              {activeDropdown === 'products' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[720px] bg-[#0E1526] border border-[#1E293B] rounded-xl shadow-2xl p-5 grid grid-cols-3 gap-3 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <div className="col-span-3 pb-2.5 border-b border-[#1E293B] flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#F5762E] font-semibold">RedFort Unified Product Suite</h4>
                      <p className="text-[11px] text-[#94A3B8]">9 cyber-physical security modules unified under one platform.</p>
                    </div>
                    <Link 
                      href="/products" 
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-semibold text-white hover:text-[#F5762E] flex items-center space-x-1 transition-colors"
                    >
                      <span>All Modules</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {PRODUCT_MODULES.map((mod) => (
                    <Link
                      key={mod.id}
                      href={`/products/${mod.slug}`}
                      onClick={() => setActiveDropdown(null)}
                      className="group p-2.5 rounded-lg border border-transparent hover:border-[#1E293B] hover:bg-[#111827] transition-all flex flex-col justify-start"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="p-1.5 rounded bg-[#0B0F19] group-hover:bg-[#1E293B] border border-[#1E293B] transition-colors">
                          {moduleIcons[mod.id] || <Shield className="w-3.5 h-3.5 text-[#F5762E]" />}
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
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-all ${
                  pathname.startsWith('/solutions') || activeDropdown === 'solutions'
                    ? 'text-[#F5762E] font-semibold bg-[#F5762E]/10' 
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#111827]'
                }`}
                aria-expanded={activeDropdown === 'solutions'}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180 text-[#F5762E]' : ''}`} />
              </button>

              {activeDropdown === 'solutions' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[640px] bg-[#0E1526] border border-[#1E293B] rounded-xl shadow-2xl p-5 grid grid-cols-2 gap-2.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <div className="col-span-2 pb-2.5 border-b border-[#1E293B] flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#F5762E] font-semibold">Solutions by Industry</h4>
                      <p className="text-[11px] text-[#94A3B8]">Zero-trust physical and digital defense architectures.</p>
                    </div>
                    <Link 
                      href="/solutions" 
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-semibold text-white hover:text-[#F5762E] flex items-center space-x-1 transition-colors"
                    >
                      <span>Explore All</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {INDUSTRY_SOLUTIONS.map((ind) => (
                    <Link
                      key={ind.id}
                      href={`/solutions#${ind.slug}`}
                      onClick={() => setActiveDropdown(null)}
                      className="group p-2 rounded-lg hover:bg-[#111827] border border-transparent hover:border-[#1E293B] flex items-start space-x-2.5 transition-all"
                    >
                      <div className="p-1.5 rounded bg-[#0B0F19] group-hover:bg-[#1E293B] border border-[#1E293B] transition-colors mt-0.5 shrink-0">
                        {industryIcons[ind.id] || <Building2 className="w-3.5 h-3.5 text-[#F5762E]" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-semibold text-white group-hover:text-[#F5762E] transition-colors block truncate">
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
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-all ${
                  pathname.startsWith('/resources') || activeDropdown === 'resources'
                    ? 'text-[#F5762E] font-semibold bg-[#F5762E]/10' 
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#111827]'
                }`}
                aria-expanded={activeDropdown === 'resources'}
              >
                <span>Resources</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180 text-[#F5762E]' : ''}`} />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[400px] bg-[#0E1526] border border-[#1E293B] rounded-xl shadow-2xl p-4 grid grid-cols-2 gap-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <div className="col-span-2 pb-2 border-b border-[#1E293B]">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#F5762E] font-semibold">Knowledge & Research</h4>
                  </div>
                  <Link href="/resources?tab=Articles" onClick={() => setActiveDropdown(null)} className="p-2 rounded-lg hover:bg-[#111827] flex items-center space-x-2 text-xs text-[#94A3B8] hover:text-white transition-colors">
                    <FileText className="w-3.5 h-3.5 text-[#F5762E]" />
                    <span>Articles</span>
                  </Link>
                  <Link href="/resources?tab=Checklists" onClick={() => setActiveDropdown(null)} className="p-2 rounded-lg hover:bg-[#111827] flex items-center space-x-2 text-xs text-[#94A3B8] hover:text-white transition-colors">
                    <CheckSquare className="w-3.5 h-3.5 text-[#F5762E]" />
                    <span>Checklists</span>
                  </Link>
                  <Link href="/resources?tab=Reports" onClick={() => setActiveDropdown(null)} className="p-2 rounded-lg hover:bg-[#111827] flex items-center space-x-2 text-xs text-[#94A3B8] hover:text-white transition-colors">
                    <BarChart3 className="w-3.5 h-3.5 text-[#F5762E]" />
                    <span>Reports</span>
                  </Link>
                  <Link href="/resources?tab=Guides" onClick={() => setActiveDropdown(null)} className="p-2 rounded-lg hover:bg-[#111827] flex items-center space-x-2 text-xs text-[#94A3B8] hover:text-white transition-colors">
                    <BookOpen className="w-3.5 h-3.5 text-[#F5762E]" />
                    <span>Guides & Whitepapers</span>
                  </Link>
                  <Link href="/resources?tab=Webinars" onClick={() => setActiveDropdown(null)} className="p-2 rounded-lg hover:bg-[#111827] flex items-center space-x-2 text-xs text-[#94A3B8] hover:text-white transition-colors">
                    <Video className="w-3.5 h-3.5 text-[#F5762E]" />
                    <span>Webinars</span>
                  </Link>
                  <Link href="/resources?tab=Events" onClick={() => setActiveDropdown(null)} className="p-2 rounded-lg hover:bg-[#111827] flex items-center space-x-2 text-xs text-[#94A3B8] hover:text-white transition-colors">
                    <Calendar className="w-3.5 h-3.5 text-[#F5762E]" />
                    <span>Events</span>
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/company/about-us" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname.startsWith('/company') 
                  ? 'text-[#F5762E] font-semibold bg-[#F5762E]/10' 
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#111827]'
              }`}
            >
              Company
            </Link>

            <Link 
              href="/pricing" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === '/pricing' 
                  ? 'text-[#F5762E] font-semibold bg-[#F5762E]/10' 
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#111827]'
              }`}
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop Right Utilities */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-2.5">
                {/* User Profile Pill */}
                <div className="flex items-center space-x-2 bg-[#111827] hover:bg-[#1E293B]/70 px-2.5 py-1.5 rounded-lg border border-[#1E293B] transition-colors">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#F5762E] to-[#FF8C42] text-white font-bold text-[11px] flex items-center justify-center shrink-0 shadow-sm">
                    {initials}
                  </div>
                  <div className="text-left leading-none max-w-[140px] xl:max-w-[180px]">
                    <div className="text-xs font-medium text-white truncate">{shortName}</div>
                    <div className="text-[10px] text-[#22C55E] flex items-center space-x-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                      <span className="truncate">{subTitle}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Dashboard Link Button */}
                <Link
                  href={dashboardHref}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#F5762E] to-[#FF8C42] hover:from-[#FF8C42] hover:to-[#FFA066] shadow-sm hover:shadow-[#F5762E]/20 transition-all focus:outline-none"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                {/* Quick Logout Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-[#EF4444] rounded-lg hover:bg-[#111827] transition-colors cursor-pointer border border-transparent hover:border-[#1E293B]"
                  title="Log Out"
                  aria-label="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/login" 
                  className="text-xs xl:text-sm font-medium text-[#94A3B8] hover:text-white px-3 py-1.5 rounded-lg hover:bg-[#111827] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/request-demo"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs xl:text-sm font-semibold text-white bg-[#F5762E] hover:bg-[#FF8C42] transition-all shadow-sm focus:outline-none"
                >
                  <span>Request a Demo</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile & Tablet Right Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            {user ? (
              <Link
                href={dashboardHref}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#F5762E] hover:bg-[#FF8C42] flex items-center space-x-1 shadow-sm"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            ) : (
              <Link
                href="/request-demo"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#F5762E] hover:bg-[#FF8C42] shadow-sm"
              >
                Demo
              </Link>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#111827] border border-[#1E293B] focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F19]/98 backdrop-blur-xl border-b border-[#1E293B] max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-4 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
          
          {/* User Status Bar if Logged In */}
          {user && (
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#0E1526] border border-[#1E293B]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F5762E] to-[#FF8C42] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-white truncate">{shortName}</div>
                <div className="text-[11px] text-[#94A3B8] truncate">{user.email || subTitle}</div>
              </div>
              <div className="flex items-center space-x-1 text-[10px] text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span>Active</span>
              </div>
            </div>
          )}

          {/* Primary Mobile Links */}
          <div className="space-y-1">
            <Link
              href="/platform"
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/platform' ? 'text-[#F5762E] bg-[#F5762E]/10 font-semibold' : 'text-[#94A3B8] hover:text-white hover:bg-[#111827]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Platform
            </Link>

            {/* Mobile Products Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileSection(mobileSection === 'products' ? null : 'products')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#111827] transition-colors"
              >
                <span>Products (9 Modules)</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSection === 'products' ? 'rotate-180 text-[#F5762E]' : ''}`} />
              </button>
              {mobileSection === 'products' && (
                <div className="pl-2 pr-1 py-1.5 space-y-1 bg-[#0E1526] rounded-lg mt-1 border border-[#1E293B]">
                  {PRODUCT_MODULES.map((m) => (
                    <Link
                      key={m.id}
                      href={`/products/${m.slug}`}
                      className="flex items-center space-x-2 px-2.5 py-1.5 rounded text-xs text-[#94A3B8] hover:text-white hover:bg-[#111827] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="p-1 rounded bg-[#0B0F19] border border-[#1E293B] shrink-0">
                        {moduleIcons[m.id] || <Shield className="w-3 h-3 text-[#F5762E]" />}
                      </div>
                      <span className="truncate">{m.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    className="flex items-center justify-between px-2.5 py-2 text-xs font-semibold text-[#F5762E] hover:text-[#FF8C42] border-t border-[#1E293B] mt-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>View All Products</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Solutions Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileSection(mobileSection === 'solutions' ? null : 'solutions')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#111827] transition-colors"
              >
                <span>Solutions by Industry</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSection === 'solutions' ? 'rotate-180 text-[#F5762E]' : ''}`} />
              </button>
              {mobileSection === 'solutions' && (
                <div className="pl-2 pr-1 py-1.5 space-y-1 bg-[#0E1526] rounded-lg mt-1 border border-[#1E293B]">
                  {INDUSTRY_SOLUTIONS.map((ind) => (
                    <Link
                      key={ind.id}
                      href={`/solutions#${ind.slug}`}
                      className="flex items-center space-x-2 px-2.5 py-1.5 rounded text-xs text-[#94A3B8] hover:text-white hover:bg-[#111827] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="p-1 rounded bg-[#0B0F19] border border-[#1E293B] shrink-0">
                        {industryIcons[ind.id] || <Building2 className="w-3 h-3 text-[#F5762E]" />}
                      </div>
                      <span className="truncate">{ind.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/solutions"
                    className="flex items-center justify-between px-2.5 py-2 text-xs font-semibold text-[#F5762E] hover:text-[#FF8C42] border-t border-[#1E293B] mt-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Explore All Solutions</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Resources Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileSection(mobileSection === 'resources' ? null : 'resources')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#111827] transition-colors"
              >
                <span>Resources & Research</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSection === 'resources' ? 'rotate-180 text-[#F5762E]' : ''}`} />
              </button>
              {mobileSection === 'resources' && (
                <div className="p-2 grid grid-cols-2 gap-1.5 bg-[#0E1526] rounded-lg mt-1 border border-[#1E293B]">
                  <Link href="/resources?tab=Articles" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded hover:bg-[#111827] flex items-center space-x-2 text-xs text-[#94A3B8] hover:text-white">
                    <FileText className="w-3 h-3 text-[#F5762E]" />
                    <span>Articles</span>
                  </Link>
                  <Link href="/resources?tab=Checklists" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded hover:bg-[#111827] flex items-center space-x-2 text-xs text-[#94A3B8] hover:text-white">
                    <CheckSquare className="w-3 h-3 text-[#F5762E]" />
                    <span>Checklists</span>
                  </Link>
                  <Link href="/resources?tab=Reports" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded hover:bg-[#111827] flex items-center space-x-2 text-xs text-[#94A3B8] hover:text-white">
                    <BarChart3 className="w-3 h-3 text-[#F5762E]" />
                    <span>Reports</span>
                  </Link>
                  <Link href="/resources?tab=Guides" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded hover:bg-[#111827] flex items-center space-x-2 text-xs text-[#94A3B8] hover:text-white">
                    <BookOpen className="w-3 h-3 text-[#F5762E]" />
                    <span>Guides</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/company/about-us"
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith('/company') ? 'text-[#F5762E] bg-[#F5762E]/10 font-semibold' : 'text-[#94A3B8] hover:text-white hover:bg-[#111827]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Company
            </Link>

            <Link
              href="/pricing"
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/pricing' ? 'text-[#F5762E] bg-[#F5762E]/10 font-semibold' : 'text-[#94A3B8] hover:text-white hover:bg-[#111827]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
          </div>

          {/* Bottom Actions in Drawer */}
          <div className="pt-3 border-t border-[#1E293B] space-y-2">
            {user ? (
              <>
                <Link
                  href={dashboardHref}
                  className="w-full text-center py-2.5 rounded-lg bg-[#F5762E] hover:bg-[#FF8C42] text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-sm transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 rounded-lg border border-[#EF4444]/30 text-[#EF4444] text-xs font-semibold flex items-center justify-center space-x-1.5 hover:bg-[#EF4444]/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out of Session</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/request-demo"
                  className="w-full text-center py-2.5 rounded-lg bg-[#F5762E] hover:bg-[#FF8C42] text-white font-semibold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Request a Demo</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href="/login"
                  className="w-full text-center py-2 rounded-lg border border-[#1E293B] hover:bg-[#111827] text-white text-xs font-semibold block transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

        </div>
      )}
    </header>
  );
}
