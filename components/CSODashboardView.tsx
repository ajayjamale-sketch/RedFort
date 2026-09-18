'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  Activity,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Building2,
  Lock,
  Radio,
  FileText,
  Download,
  Flame,
  CheckCircle2,
  Clock,
  LogOut,
  RefreshCw,
  Globe,
  Sliders,
  ChevronRight,
  X,
  Play,
  Share2,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  Bell,
  Search,
  Check,
  Server,
  Camera,
  Cpu,
  UserCheck,
  Menu,
  Scale,
  ShieldAlert,
  Smartphone
} from 'lucide-react';
import Logo from '@/components/Logo';

// Types
export interface RiskVector {
  id: string;
  name: string;
  category: 'Converged' | 'Cyber' | 'Physical' | 'Compliance';
  likelihood: 1 | 2 | 3 | 4 | 5; // 1: Rare, 5: Frequent
  impact: 1 | 2 | 3 | 4 | 5; // 1: Insignificant, 5: Catastrophic
  score: number; // 1 - 25
  campuses: string[];
  status: 'Mitigated' | 'Monitoring' | 'Action Required';
  financialExposure: string;
  owner: string;
  controls: string[];
  description: string;
  soarPlaybook: string;
}

export interface CampusMetric {
  id: string;
  name: string;
  region: string;
  postureScore: number;
  complianceScore: number;
  totalNodes: number;
  physicalDoors: number;
  cctvCameras: number;
  activeIncidents: number;
  lastAudit: string;
  status: 'Optimal' | 'Guarded' | 'Review Required';
  leadContact: string;
}

export const CAMPUSES: CampusMetric[] = [
  {
    id: 'austin-hq',
    name: 'Austin Global HQ',
    region: 'North America',
    postureScore: 96.4,
    complianceScore: 99.1,
    totalNodes: 4200,
    physicalDoors: 340,
    cctvCameras: 280,
    activeIncidents: 1,
    lastAudit: '2026-03-12',
    status: 'Optimal',
    leadContact: 'Marcus Kane (Dir. Security)'
  },
  {
    id: 'frankfurt-emea',
    name: 'Frankfurt Edge Center',
    region: 'EMEA',
    postureScore: 94.2,
    complianceScore: 98.4,
    totalNodes: 3100,
    physicalDoors: 210,
    cctvCameras: 190,
    activeIncidents: 0,
    lastAudit: '2026-03-10',
    status: 'Optimal',
    leadContact: 'Stefan Meyer (Facilities Dir.)'
  },
  {
    id: 'singapore-apac',
    name: 'Singapore Cloud Gateway',
    region: 'APAC',
    postureScore: 92.8,
    complianceScore: 97.2,
    totalNodes: 2800,
    physicalDoors: 180,
    cctvCameras: 160,
    activeIncidents: 2,
    lastAudit: '2026-02-28',
    status: 'Guarded',
    leadContact: 'Dr. Sarah Lin (SecOps Head)'
  },
  {
    id: 'bengaluru-rd',
    name: 'Bengaluru R&D Facility',
    region: 'APAC',
    postureScore: 95.7,
    complianceScore: 99.0,
    totalNodes: 4720,
    physicalDoors: 410,
    cctvCameras: 340,
    activeIncidents: 0,
    lastAudit: '2026-03-15',
    status: 'Optimal',
    leadContact: 'Rajesh Sharma (APAC Ops)'
  }
];

export const INITIAL_RISK_VECTORS: RiskVector[] = [
  {
    id: 'RV-101',
    name: 'Badge Cloning & Perimeter Tailgating',
    category: 'Converged',
    likelihood: 4,
    impact: 4,
    score: 16,
    campuses: ['Austin Global HQ', 'Singapore Cloud Gateway'],
    status: 'Action Required',
    financialExposure: '$1.4M',
    owner: 'Marcus Kane (Physical Sec Dir)',
    controls: ['Anti-Passback LiDAR', 'AI Vision Discrepancy Alert', 'Biometric Dual-Factor'],
    description: 'RFID credential duplication combined with physical tailgating into server corridors.',
    soarPlaybook: 'SOAR-PB-84: Auto-Lockdown Corridors & Revoke Badge'
  },
  {
    id: 'RV-102',
    name: 'Edge Gateway Ransomware Propagation',
    category: 'Cyber',
    likelihood: 2,
    impact: 5,
    score: 10,
    campuses: ['Frankfurt Edge Center', 'Bengaluru R&D Facility'],
    status: 'Monitoring',
    financialExposure: '$3.8M',
    owner: 'Dr. Sarah Lin (Head of SecOps)',
    controls: ['Microsegmentation', 'Zero-Trust Host Quarantine', 'Real-Time Heuristics'],
    description: 'Lateral movement attempt across IoT edge nodes to compromise SCADA and OT controllers.',
    soarPlaybook: 'SOAR-PB-12: Zero-Trust Host Quarantine & Port Isolation'
  },
  {
    id: 'RV-103',
    name: 'Server Rack Physical Lock Tampering',
    category: 'Converged',
    likelihood: 3,
    impact: 4,
    score: 12,
    campuses: ['Austin Global HQ'],
    status: 'Mitigated',
    financialExposure: '$850K',
    owner: 'Devon Vance (Lead Infrastructure)',
    controls: ['Electronic Smart Latches', 'CCTV Frame Sync', 'Guard Dispatch Trigger'],
    description: 'Forced mechanical entry into secure server cage without active badge authentication.',
    soarPlaybook: 'SOAR-PB-99: Armed Guard Dispatch & High-Res CCTV Lock'
  },
  {
    id: 'RV-104',
    name: 'Industrial HVAC & Cooling Override',
    category: 'Physical',
    likelihood: 1,
    impact: 5,
    score: 5,
    campuses: ['Frankfurt Edge Center'],
    status: 'Mitigated',
    financialExposure: '$2.1M',
    owner: 'Stefan Meyer (Facilities Director)',
    controls: ['Isolated BACnet Gateway', 'Thermal Sensor Anomaly Detection', 'Analog Fail-Safe'],
    description: 'Cyber intrusion into HVAC PLC firmware to induce thermal throttling on high-compute servers.',
    soarPlaybook: 'SOAR-PB-44: Air-Gap HVAC Controller & Engage Backup Chillers'
  },
  {
    id: 'RV-105',
    name: 'LiDAR Perimeter Blindspot Incursion',
    category: 'Physical',
    likelihood: 3,
    impact: 3,
    score: 9,
    campuses: ['Bengaluru R&D Facility'],
    status: 'Monitoring',
    financialExposure: '$420K',
    owner: 'Rajesh Sharma (APAC SecOps)',
    controls: ['Overlapping PTZ Radar', 'Thermal Night Vision Fence', 'Acoustic Tripwires'],
    description: 'Adversary movement through vegetation along campus outer perimeter fence line.',
    soarPlaybook: 'SOAR-PB-31: Pan PTZ Camera & Alert Roaming Patrol'
  },
  {
    id: 'RV-106',
    name: 'Third-Party Vendor Access Misconfiguration',
    category: 'Compliance',
    likelihood: 2,
    impact: 3,
    score: 6,
    campuses: ['Global All-Campus'],
    status: 'Mitigated',
    financialExposure: '$650K',
    owner: 'Elena Rostova (Compliance Officer)',
    controls: ['Just-In-Time Access (JIT)', 'Session Video Recording', 'Mandatory 4-Eye Approval'],
    description: 'Contractor access credentials remaining active beyond designated maintenance windows.',
    soarPlaybook: 'SOAR-PB-05: Revoke Expired Vendor Tokens Automatically'
  }
];

export const COMPLIANCE_FRAMEWORKS = [
  { name: 'ISO/IEC 27001:2022', score: 99.2, status: 'Certified', controlsPassed: '114 / 114', delta: '+0.4%', nextAudit: 'Oct 2026', scope: 'Global Infrastructure' },
  { name: 'SOC 2 Type II (Security & Availability)', score: 98.8, status: 'Audited (Clean Opinion)', controlsPassed: '64 / 64', delta: '+1.2%', nextAudit: 'Nov 2026', scope: 'Cloud & Edge Platform' },
  { name: 'NIST SP 800-53 Rev. 5', score: 97.9, status: 'Compliant', controlsPassed: '168 / 172', delta: '+2.1%', nextAudit: 'Dec 2026', scope: 'Federal & Commercial Sites' },
  { name: 'HIPAA Security & Breach Notification', score: 99.5, status: 'Verified', controlsPassed: '42 / 42', delta: '+0.0%', nextAudit: 'Aug 2026', scope: 'Healthcare Data Centers' },
  { name: 'GDPR Article 32 (Technical & Org Measures)', score: 98.1, status: 'Compliant', controlsPassed: '38 / 38', delta: '+0.8%', nextAudit: 'Sep 2026', scope: 'EMEA Facilities' }
];

export const MTTD_MTTR_DATA = {
  '24h': {
    mttd: '1.8 min',
    mttdDelta: '-42%',
    mttr: '4.2 min',
    mttrDelta: '-38%',
    automatedSoarRatio: '88.4%',
    points: [
      { label: '00:00', mttd: 2.1, mttr: 5.4, automated: 85 },
      { label: '04:00', mttd: 1.9, mttr: 4.8, automated: 87 },
      { label: '08:00', mttd: 2.4, mttr: 5.1, automated: 84 },
      { label: '12:00', mttd: 1.6, mttr: 3.9, automated: 91 },
      { label: '16:00', mttd: 1.7, mttr: 4.1, automated: 89 },
      { label: '20:00', mttd: 1.8, mttr: 4.2, automated: 88 }
    ]
  },
  '7d': {
    mttd: '1.9 min',
    mttdDelta: '-35%',
    mttr: '4.6 min',
    mttrDelta: '-29%',
    automatedSoarRatio: '86.1%',
    points: [
      { label: 'Mon', mttd: 2.3, mttr: 5.2, automated: 84 },
      { label: 'Tue', mttd: 2.0, mttr: 4.7, automated: 86 },
      { label: 'Wed', mttd: 1.8, mttr: 4.1, automated: 89 },
      { label: 'Thu', mttd: 1.7, mttr: 4.3, automated: 88 },
      { label: 'Fri', mttd: 2.1, mttr: 4.9, automated: 85 },
      { label: 'Sat', mttd: 1.6, mttr: 3.8, automated: 92 },
      { label: 'Sun', mttd: 1.9, mttr: 4.6, automated: 86 }
    ]
  },
  '30d': {
    mttd: '2.1 min',
    mttdDelta: '-28%',
    mttr: '5.0 min',
    mttrDelta: '-24%',
    automatedSoarRatio: '84.2%',
    points: [
      { label: 'Week 1', mttd: 2.5, mttr: 5.8, automated: 81 },
      { label: 'Week 2', mttd: 2.2, mttr: 5.1, automated: 83 },
      { label: 'Week 3', mttd: 1.9, mttr: 4.6, automated: 87 },
      { label: 'Week 4', mttd: 1.8, mttr: 4.2, automated: 88 }
    ]
  },
  '90d': {
    mttd: '2.4 min',
    mttdDelta: '-22%',
    mttr: '5.8 min',
    mttrDelta: '-19%',
    automatedSoarRatio: '81.5%',
    points: [
      { label: 'Month 1', mttd: 2.9, mttr: 6.8, automated: 78 },
      { label: 'Month 2', mttd: 2.4, mttr: 5.6, automated: 82 },
      { label: 'Month 3', mttd: 1.9, mttr: 4.4, automated: 87 }
    ]
  },
  '1y': {
    mttd: '3.1 min',
    mttdDelta: '-54%',
    mttr: '7.2 min',
    mttrDelta: '-48%',
    automatedSoarRatio: '79.0%',
    points: [
      { label: 'Q1', mttd: 4.2, mttr: 9.1, automated: 72 },
      { label: 'Q2', mttd: 3.5, mttr: 7.8, automated: 76 },
      { label: 'Q3', mttd: 2.6, mttr: 6.1, automated: 82 },
      { label: 'Q4', mttd: 1.9, mttr: 4.4, automated: 88 }
    ]
  }
};

export type CSONavTab = 'posture' | 'risks' | 'velocity' | 'multicampus' | 'compliance';

interface CSODashboardViewProps {
  initialNav?: CSONavTab;
}

export default function CSODashboardView({ initialNav = 'posture' }: CSODashboardViewProps) {
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState<CSONavTab>(() => {
    if (pathname.includes('/multi-campus')) return 'multicampus';
    if (pathname.includes('/compliance')) return 'compliance';
    if (pathname.includes('/risks')) return 'risks';
    if (pathname.includes('/velocity')) return 'velocity';
    return initialNav;
  });

  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d' | '1y'>('24h');
  const [riskVectors, setRiskVectors] = useState<RiskVector[]>(INITIAL_RISK_VECTORS);
  const [selectedRisk, setSelectedRisk] = useState<RiskVector | null>(null);
  const [threatLevel, setThreatLevel] = useState<'GUARDED' | 'ELEVATED' | 'HIGH' | 'SEVERE' | 'NORMAL'>('GUARDED');
  const [threatModalOpen, setThreatModalOpen] = useState(false);
  const [boardReportOpen, setBoardReportOpen] = useState(false);
  const [simulationModalOpen, setSimulationModalOpen] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [reportExported, setReportExported] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [utcTime, setUtcTime] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      const timeStr = now.toTimeString().split(' ')[0];
      setUtcTime(`${dateStr} · ${timeStr} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync state if pathname changes
  useEffect(() => {
    if (pathname.includes('/multi-campus')) setActiveNav('multicampus');
    else if (pathname.includes('/compliance')) setActiveNav('compliance');
    else if (pathname.includes('/risks')) setActiveNav('risks');
    else if (pathname.includes('/velocity')) setActiveNav('velocity');
    else if (pathname === '/dashboard/cso') setActiveNav('posture');
    setMobileSidebarOpen(false);
  }, [pathname]);

  // Initialize CSO session in localStorage if not set
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem('redfort_user');
      if (!existing || !existing.includes('CSO')) {
        localStorage.setItem('redfort_user', JSON.stringify({
          name: 'Helena Vance',
          email: 'cso@redfort.enterprise',
          role: 'Chief Security Officer (CSO)'
        }));
        window.dispatchEvent(new Event('redfort_auth_change'));
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('redfort_user');
      window.dispatchEvent(new Event('redfort_auth_change'));
    }
  };

  // Run Simulation Drill
  const handleRunSimulation = () => {
    setSimulationRunning(true);
    setSimulationResult(null);
    setTimeout(() => {
      setSimulationRunning(false);
      setSimulationResult('Simulation Complete: Multi-vector attack intercepted in 1.4 minutes. Zero breach recorded. Automated SOAR playbook quarantined 2 edge nodes and locked Server Room B-12.');
      setActionNotice('Multi-Campus Chaos Drill Completed Successfully.');
      setTimeout(() => setActionNotice(null), 4000);
    }, 2000);
  };

  // Export Report
  const handleExportBoardReport = () => {
    setReportExported(true);
    setTimeout(() => {
      setReportExported(false);
      setBoardReportOpen(false);
      setActionNotice('Executive Board Dossier (Q1-2026-RedFort-Executive.pdf) generated & downloaded.');
      setTimeout(() => setActionNotice(null), 4000);
    }, 1200);
  };

  // Filtered Risks
  const filteredRisks = riskVectors.filter(r => {
    const matchesCampus = selectedCampus === 'all' 
      ? true 
      : (() => {
          const campusObj = CAMPUSES.find(c => c.id === selectedCampus);
          return campusObj ? r.campuses.includes(campusObj.name) || r.campuses.includes('Global All-Campus') : true;
        })();
    
    if (!matchesCampus) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.owner.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q)
    );
  });

  const activeTrend = MTTD_MTTR_DATA[timeRange];

  const NAV_ITEMS = [
    { id: 'posture', label: 'Executive Posture', href: '/dashboard/cso', icon: Shield, badge: '94.8' },
    { id: 'risks', label: 'Risk Heatmaps', href: '/dashboard/cso/risks', icon: Flame, badge: `${riskVectors.filter(r => r.score >= 12).length} High`, badgeColor: 'bg-[#EF4444] text-white' },
    { id: 'velocity', label: 'MTTD / MTTR Velocity', href: '/dashboard/cso/velocity', icon: TrendingDown, badge: '1.8m' },
    { id: 'multicampus', label: 'Multi-Campus Score', href: '/dashboard/cso/multi-campus', icon: Building2, badge: '4 Sites' },
    { id: 'compliance', label: 'Compliance & Audit', href: '/dashboard/cso/compliance', icon: Award, badge: '98.6%' }
  ];

  return (
    <div className="h-screen w-screen bg-[#0B0F19] text-slate-100 flex overflow-hidden font-sans selection:bg-[#F5762E] selection:text-white relative">
      
      {/* Mobile Backdrop Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-200"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 1. Steady Fixed / Mobile Drawer Left Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 h-screen bg-[#0E1526] border-r border-[#1E293B] p-4 flex flex-col justify-between shrink-0 select-none transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        mobileSidebarOpen ? 'translate-x-0 shadow-2xl shadow-black/90' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        <div className="space-y-6">
          
          {/* Brand Header & Link to Public Home */}
          <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
            <Link 
              href="/" 
              onClick={() => setMobileSidebarOpen(false)}
              className="flex items-center space-x-2 px-1 hover:opacity-90 transition-opacity cursor-pointer group"
              title="Return to RedFort Home Page"
            >
              <Logo variant="full" theme="dark" size="sm" showSubtitle={false} />
              <span className="text-[10px] font-mono font-bold text-[#F5762E] bg-[#F5762E]/10 px-1.5 py-0.5 rounded border border-[#F5762E]/30">
                CSO
              </span>
            </Link>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#151E33] transition-colors cursor-pointer"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Executive Navigation */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
              Executive View
            </div>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = activeNav === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveNav(item.id as CSONavTab);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap group ${
                    isSelected
                      ? 'bg-[#F5762E] text-white shadow-sm font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-[#151E33]'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap ${
                    isSelected
                      ? 'bg-black/20 text-white font-bold'
                      : (item.badgeColor || 'bg-[#151E33] text-slate-300 border border-[#1E293B]')
                  }`}>
                    {item.badge}
                  </span>
                </Link>
              );
            })}
          </div>

        </div>

        {/* Sidebar Footer: CSO Profile & Steady Log Out */}
        <div className="pt-4 border-t border-[#1E293B] space-y-3">
          
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F5762E] to-[#FF9A5A] text-white font-bold text-xs flex items-center justify-center font-mono ring-2 ring-[#F5762E]/30 shrink-0">
              HV
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-white truncate">Helena Vance</div>
              <div className="text-[10px] text-[#F5762E] truncate font-medium">Chief Security Officer</div>
            </div>
          </div>

          <Link
            href="/login"
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-[#EF4444]/10 hover:bg-[#EF4444] text-[#EF4444] hover:text-white border border-[#EF4444]/30 hover:border-[#EF4444] text-xs font-semibold transition-all duration-150 cursor-pointer shadow-sm group"
          >
            <LogOut className="w-3.5 h-3.5 group-hover:rotate-6 transition-transform" />
            <span>Log Out</span>
          </Link>
        </div>

      </aside>

      {/* 2. Main Executive Viewport */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        
        {/* Top Executive Header */}
        <header className="h-16 border-b border-[#1E293B] bg-[#0E1526]/95 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between shrink-0 z-20 gap-2 sm:gap-3 overflow-x-auto select-none">
          
          {/* Left: Mobile Toggle, Title & Threat Level Beacon */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* Hamburger Toggle Button for Mobile / Tablet */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-200 hover:text-white border border-[#1E293B] transition-colors shrink-0 cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            <h1 className="text-xs sm:text-sm font-bold text-white tracking-wide whitespace-nowrap shrink-0">
              <span className="hidden sm:inline">Executive Security Posture Console</span>
              <span className="sm:hidden">CSO Console</span>
            </h1>

            {/* DEFCON / Threat Level Badge Button */}
            <button
              onClick={() => setThreatModalOpen(true)}
              className="flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/60 border border-red-500/40 text-red-400 hover:text-red-300 text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
              title="Click to adjust Enterprise Threat Advisory Level"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0"></span>
              <span className="hidden md:inline">THREAT LEVEL: {threatLevel} (DEFCON 4)</span>
              <span className="md:hidden">{threatLevel}</span>
              <Sliders className="w-3.5 h-3.5 ml-0.5 text-red-400 shrink-0" />
            </button>
          </div>

          {/* Center: Global Scope Selector & UTC Clock */}
          <div className="hidden lg:flex items-center space-x-3 shrink-0">
            <div className="flex items-center space-x-2 bg-[#0B0F19] border border-[#1E293B] hover:border-slate-600 rounded-lg px-3 py-1.5 text-xs whitespace-nowrap shrink-0 transition-colors">
              <Globe className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="all">Global (All 4 Campuses)</option>
                {CAMPUSES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="hidden xl:flex items-center space-x-2 bg-[#0B0F19] border border-[#1E293B] rounded-lg px-3 py-1.5 text-xs font-mono text-slate-300 whitespace-nowrap shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
              <span>{utcTime || '18 Sep · 13:40:00 UTC'}</span>
            </div>
          </div>

          {/* Right: Executive Action CTAs & Avatar */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
            
            {/* Simulate Chaos Drill Button */}
            <button
              onClick={() => setSimulationModalOpen(true)}
              className="hidden md:flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
              <span>Simulate Drill</span>
            </button>

            {/* Export Board Report Button */}
            <button
              onClick={() => setBoardReportOpen(true)}
              className="flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Export Board Report</span>
              <span className="sm:hidden">Report</span>
            </button>

            {/* Avatar Pill */}
            <div 
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F5762E] to-[#FF9A5A] text-white font-bold text-xs flex items-center justify-center font-mono ring-2 ring-[#F5762E]/30 shrink-0 shadow-sm cursor-pointer"
              title="Helena Vance (Chief Security Officer)"
            >
              HV
            </div>

          </div>

        </header>

        {/* Action Toast Notification */}
        {actionNotice && (
          <div className="bg-[#22C55E]/15 border-b border-[#22C55E]/30 px-6 py-2 text-xs text-[#22C55E] flex items-center justify-between font-mono animate-fade-in">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{actionNotice}</span>
            </div>
            <button onClick={() => setActionNotice(null)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Scrollable Executive Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* VIEW 1: EXECUTIVE POSTURE OVERVIEW */}
          {activeNav === 'posture' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Executive KPI Ribbon */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                
                {/* 1. Overall ESR Score */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-[#F5762E]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#94A3B8] font-medium">Enterprise Posture Score</span>
                    <span className="p-1.5 rounded-md bg-[#22C55E]/10 text-[#22C55E]">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-white font-mono">94.8</span>
                    <span className="text-xs text-[#64748B]">/ 100</span>
                  </div>
                  <div className="mt-2 flex items-center space-x-1.5 text-[11px] text-[#22C55E]">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+2.4% QoQ (Tier 1 Resilient)</span>
                  </div>
                  <div className="w-full bg-[#1E293B] h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#22C55E] to-[#F5762E] h-full w-[94.8%]"></div>
                  </div>
                </div>

                {/* 2. Mean Time to Detect (MTTD) */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-[#22C55E]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#94A3B8] font-medium">Mean Time to Detect</span>
                    <span className="p-1.5 rounded-md bg-[#22C55E]/10 text-[#22C55E]">
                      <Clock className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-white font-mono">{activeTrend.mttd}</span>
                    <span className="text-xs text-[#64748B]">avg</span>
                  </div>
                  <div className="mt-2 flex items-center space-x-1.5 text-[11px] text-[#22C55E]">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>{activeTrend.mttdDelta} vs 18.4 hr industry</span>
                  </div>
                  <div className="w-full bg-[#1E293B] h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-[#22C55E] h-full w-[92%]"></div>
                  </div>
                </div>

                {/* 3. Mean Time to Remediate (MTTR) */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-[#F5762E]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#94A3B8] font-medium">Mean Time to Remediate</span>
                    <span className="p-1.5 rounded-md bg-[#F5762E]/10 text-[#F5762E]">
                      <Activity className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-white font-mono">{activeTrend.mttr}</span>
                    <span className="text-xs text-[#64748B]">avg</span>
                  </div>
                  <div className="mt-2 flex items-center space-x-1.5 text-[11px] text-[#22C55E]">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>{activeTrend.mttrDelta} (99.1% SLA met)</span>
                  </div>
                  <div className="w-full bg-[#1E293B] h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-[#F5762E] h-full w-[88%]"></div>
                  </div>
                </div>

                {/* 4. Converged Attack Surface */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-[#38BDF8]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#94A3B8] font-medium">Converged Asset Surface</span>
                    <span className="p-1.5 rounded-md bg-[#38BDF8]/10 text-[#38BDF8]">
                      <Layers className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-white font-mono">14,820</span>
                    <span className="text-xs text-[#64748B]">nodes</span>
                  </div>
                  <div className="mt-2 flex items-center space-x-1.5 text-[11px] text-[#38BDF8]">
                    <Globe className="w-3.5 h-3.5" />
                    <span>4 Campuses · 99.98% Telemetry</span>
                  </div>
                  <div className="w-full bg-[#1E293B] h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-[#38BDF8] h-full w-[99.98%]"></div>
                  </div>
                </div>

                {/* 5. Audit & Compliance Readiness */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 shadow-sm relative overflow-hidden group hover:border-[#A855F7]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#94A3B8] font-medium">Audit Compliance Index</span>
                    <span className="p-1.5 rounded-md bg-[#A855F7]/10 text-[#A855F7]">
                      <Award className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-white font-mono">98.6%</span>
                    <span className="text-xs text-[#64748B]">audit-ready</span>
                  </div>
                  <div className="mt-2 flex items-center space-x-1.5 text-[11px] text-[#22C55E]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>5 / 5 Frameworks Clean</span>
                  </div>
                  <div className="w-full bg-[#1E293B] h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-[#A855F7] h-full w-[98.6%]"></div>
                  </div>
                </div>

              </section>

              {/* Executive Grid: Quick Previews */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Executive Risk Posture Card */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F2937]">
                    <div className="flex items-center space-x-2">
                      <Flame className="w-4 h-4 text-[#EF4444]" />
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">High Risk Exposure</h3>
                    </div>
                    <Link 
                      href="/dashboard/cso/risks"
                      onClick={() => setActiveNav('risks')}
                      className="text-xs text-[#F5762E] hover:underline font-semibold flex items-center space-x-1"
                    >
                      <span>View Matrix</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="space-y-2">
                    {riskVectors.slice(0, 3).map((rv) => (
                      <div key={rv.id} className="p-3 rounded-lg bg-[#0B0F19] border border-[#1E293B] flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-white truncate max-w-[180px]">{rv.name}</div>
                          <div className="text-[10px] text-[#94A3B8] mt-0.5">{rv.category} &middot; {rv.financialExposure}</div>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          rv.status === 'Action Required' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-[#22C55E]/20 text-[#22C55E]'
                        }`}>
                          Score {rv.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Multi-Campus Quick Card */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F2937]">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-[#38BDF8]" />
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Campus Posture</h3>
                    </div>
                    <Link 
                      href="/dashboard/cso/multi-campus"
                      onClick={() => setActiveNav('multicampus')}
                      className="text-xs text-[#38BDF8] hover:underline font-semibold flex items-center space-x-1"
                    >
                      <span>All Sites</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="space-y-2">
                    {CAMPUSES.map((c) => (
                      <div key={c.id} className="p-2.5 rounded-lg bg-[#0B0F19] border border-[#1E293B] flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-white">{c.name}</div>
                          <div className="text-[10px] text-[#64748B]">{c.region} &middot; {c.totalNodes.toLocaleString()} nodes</div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-[#22C55E]">{c.postureScore}%</span>
                          <div className="text-[10px] text-slate-400 font-mono">{c.physicalDoors} doors</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Regulatory Readiness Card */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F2937]">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-[#A855F7]" />
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Audit Readiness</h3>
                    </div>
                    <Link 
                      href="/dashboard/cso/compliance"
                      onClick={() => setActiveNav('compliance')}
                      className="text-xs text-[#A855F7] hover:underline font-semibold flex items-center space-x-1"
                    >
                      <span>Evidence</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="space-y-2">
                    {COMPLIANCE_FRAMEWORKS.slice(0, 4).map((fw, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-[#0B0F19] border border-[#1E293B] flex items-center justify-between text-xs">
                        <div className="truncate max-w-[170px]">
                          <div className="font-semibold text-white truncate">{fw.name}</div>
                          <div className="text-[10px] text-[#22C55E]">{fw.status}</div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-white">{fw.score}%</span>
                          <div className="text-[10px] text-[#64748B] font-mono">{fw.controlsPassed}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* VIEW 2: RISK MATRIX & HEATMAPS */}
          {activeNav === 'risks' && (
            <section className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4 animate-fade-in">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1F2937] pb-3">
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Flame className="w-4 h-4 text-[#EF4444]" />
                    <span>Enterprise Converged Risk Heatmap (Likelihood &times; Impact Matrix)</span>
                  </h2>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Real-time threat evaluation combining physical intrusions, cyber telemetry, and supply chain exposure
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {/* Threat Level Badge */}
                  <button
                    onClick={() => setThreatModalOpen(true)}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-[11px] font-mono font-bold hover:bg-[#EF4444]/25 transition-colors cursor-pointer"
                    title="Click to adjust Enterprise Threat Advisory Level"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-ping"></span>
                    <span>DEFCON 4 &middot; {threatLevel}</span>
                    <Sliders className="w-3 h-3 ml-0.5 text-[#EF4444]" />
                  </button>

                  {/* Campus Filter */}
                  <div className="flex items-center space-x-1.5 bg-[#0B0F19] border border-[#1E293B] rounded-lg px-2.5 py-1 text-xs">
                    <Globe className="w-3.5 h-3.5 text-[#64748B]" />
                    <select
                      value={selectedCampus}
                      onChange={(e) => setSelectedCampus(e.target.value)}
                      className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="all">Global (All 4 Campuses)</option>
                      {CAMPUSES.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Chaos Drill Button */}
                  <button
                    onClick={() => setSimulationModalOpen(true)}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] text-slate-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3 text-[#38BDF8]" />
                    <span>Chaos Drill</span>
                  </button>
                </div>
              </div>

              {/* Matrix Container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                
                {/* 5x5 Heatmap Grid */}
                <div className="lg:col-span-8 overflow-x-auto">
                  <div className="min-w-[500px]">
                    
                    {/* Grid Header (Impact Scale) */}
                    <div className="text-center text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                      Impact Severity &rarr;
                    </div>

                    <div className="grid grid-cols-6 gap-2">
                      {/* Corner */}
                      <div className="text-[10px] font-semibold text-[#64748B] flex items-end justify-end p-1">
                        Likelihood &darr;
                      </div>
                      <div className="text-center text-[10px] font-semibold text-slate-400 py-1">Insignificant (1)</div>
                      <div className="text-center text-[10px] font-semibold text-slate-400 py-1">Minor (2)</div>
                      <div className="text-center text-[10px] font-semibold text-slate-400 py-1">Moderate (3)</div>
                      <div className="text-center text-[10px] font-semibold text-slate-400 py-1">Major (4)</div>
                      <div className="text-center text-[10px] font-semibold text-[#EF4444] py-1">Catastrophic (5)</div>

                      {/* Rows */}
                      {[5, 4, 3, 2, 1].map((likelihoodVal) => {
                        const likelihoodLabels: { [key: number]: string } = {
                          5: 'Frequent (5)',
                          4: 'Likely (4)',
                          3: 'Moderate (3)',
                          2: 'Unlikely (2)',
                          1: 'Rare (1)'
                        };

                        return (
                          <React.Fragment key={likelihoodVal}>
                            <div className="text-right text-[10px] font-semibold text-slate-400 flex items-center justify-end pr-2">
                              {likelihoodLabels[likelihoodVal]}
                            </div>

                            {[1, 2, 3, 4, 5].map((impactVal) => {
                              const score = likelihoodVal * impactVal;
                              
                              // Color classification
                              let bgClass = 'bg-[#1E293B]/40 hover:bg-[#1E293B] border-[#1E293B]';
                              let textBadge = 'text-slate-400';
                              if (score >= 15) {
                                bgClass = 'bg-[#EF4444]/20 hover:bg-[#EF4444]/35 border-[#EF4444]/40';
                                textBadge = 'text-[#EF4444]';
                              } else if (score >= 10) {
                                bgClass = 'bg-[#F5762E]/20 hover:bg-[#F5762E]/35 border-[#F5762E]/40';
                                textBadge = 'text-[#F5762E]';
                              } else if (score >= 6) {
                                bgClass = 'bg-[#EAB308]/15 hover:bg-[#EAB308]/30 border-[#EAB308]/30';
                                textBadge = 'text-[#EAB308]';
                              } else {
                                bgClass = 'bg-[#22C55E]/10 hover:bg-[#22C55E]/20 border-[#22C55E]/30';
                                textBadge = 'text-[#22C55E]';
                              }

                              // Find risks matching this coordinate
                              const matchedRisks = filteredRisks.filter(
                                r => r.likelihood === likelihoodVal && r.impact === impactVal
                              );

                              return (
                                <div
                                  key={`${likelihoodVal}-${impactVal}`}
                                  className={`min-h-[70px] p-1.5 rounded-lg border flex flex-col justify-between transition-all cursor-pointer ${bgClass}`}
                                  onClick={() => {
                                    if (matchedRisks.length > 0) setSelectedRisk(matchedRisks[0]);
                                  }}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className={`text-[10px] font-mono font-bold ${textBadge}`}>
                                      {score}
                                    </span>
                                    {matchedRisks.length > 0 && (
                                      <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping"></span>
                                    )}
                                  </div>

                                  <div className="space-y-1">
                                    {matchedRisks.map(r => (
                                      <div
                                        key={r.id}
                                        className="text-[10px] font-semibold text-white bg-[#0B0F19]/90 px-1.5 py-0.5 rounded truncate border border-slate-700 shadow-sm"
                                        title={r.name}
                                      >
                                        {r.name}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </React.Fragment>
                        );
                      })}
                    </div>

                  </div>
                </div>

                {/* Heatmap Legend & Selected Vector Details */}
                <div className="lg:col-span-4 bg-[#0B0F19] border border-[#1F2937] rounded-xl p-4 flex flex-col justify-between">
                  
                  {selectedRisk ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#1F2937]">
                        <span className="text-[10px] font-mono text-[#F5762E] font-bold uppercase tracking-wider">
                          {selectedRisk.id} &middot; {selectedRisk.category} Risk
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          selectedRisk.status === 'Action Required' ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40' :
                          selectedRisk.status === 'Monitoring' ? 'bg-[#F5762E]/20 text-[#F5762E] border border-[#F5762E]/40' :
                          'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40'
                        }`}>
                          {selectedRisk.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-white">{selectedRisk.name}</h4>
                        <p className="text-[11px] text-[#94A3B8] mt-1 leading-relaxed">
                          {selectedRisk.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div className="bg-[#111827] p-2 rounded border border-[#1E293B]">
                          <div className="text-[10px] text-[#64748B]">Risk Score</div>
                          <div className="text-sm font-bold text-[#EF4444] font-mono">{selectedRisk.score} / 25</div>
                        </div>
                        <div className="bg-[#111827] p-2 rounded border border-[#1E293B]">
                          <div className="text-[10px] text-[#64748B]">Financial Exposure</div>
                          <div className="text-sm font-bold text-white font-mono">{selectedRisk.financialExposure}</div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[10px] font-semibold text-[#64748B] uppercase">Responsible Owner</div>
                        <div className="text-xs text-slate-300">{selectedRisk.owner}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[10px] font-semibold text-[#64748B] uppercase">Active Mitigating Controls</div>
                        <div className="space-y-1">
                          {selectedRisk.controls.map((c, i) => (
                            <div key={i} className="text-[11px] text-slate-300 flex items-center space-x-1.5">
                              <ShieldCheck className="w-3 h-3 text-[#22C55E] shrink-0" />
                              <span>{c}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-[#F5762E]/10 border border-[#F5762E]/30 text-[11px] text-[#F5762E] flex items-center justify-between">
                        <span className="font-mono truncate">{selectedRisk.soarPlaybook}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-2">
                      <Flame className="w-8 h-8 text-[#64748B]" />
                      <div className="text-xs font-semibold text-white">Select a Heatmap Coordinate</div>
                      <p className="text-[11px] text-[#64748B] max-w-[200px]">
                        Click any cell or active threat tag on the matrix to review residual risk and SOAR mitigation status.
                      </p>
                    </div>
                  )}

                  {/* Color Legend */}
                  <div className="pt-3 border-t border-[#1F2937] flex items-center justify-between text-[10px] text-[#94A3B8]">
                    <div className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded bg-[#22C55E]"></span>
                      <span>Low (1-5)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded bg-[#EAB308]"></span>
                      <span>Med (6-9)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded bg-[#F5762E]"></span>
                      <span>High (10-14)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded bg-[#EF4444]"></span>
                      <span>Critical (15-25)</span>
                    </div>
                  </div>

                </div>

              </div>

            </section>
          )}

          {/* VIEW 3: MTTD / MTTR VELOCITY */}
          {activeNav === 'velocity' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
              
              {/* Chart 1: Mean Time to Detect vs Remediate */}
              <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4">
                
                <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <TrendingDown className="w-4 h-4 text-[#22C55E]" />
                      <span>Detection & Remediation Velocity (MTTD vs MTTR)</span>
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      Speed of physical and cyber incident containment across all sites
                    </p>
                  </div>

                  {/* Time Range Pills */}
                  <div className="flex items-center bg-[#0B0F19] p-0.5 rounded-lg border border-[#1E293B] text-xs">
                    {(['24h', '7d', '30d', '90d', '1y'] as const).map(range => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-2 py-1 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${
                          timeRange === range ? 'bg-[#F5762E] text-white font-bold' : 'text-[#64748B] hover:text-white'
                        }`}
                      >
                        {range.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Visual Graph */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#94A3B8]">Telemetry Intervals</span>
                    <div className="flex items-center space-x-4 text-[11px]">
                      <span className="flex items-center space-x-1 text-[#22C55E]">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span>
                        <span>MTTD ({activeTrend.mttd})</span>
                      </span>
                      <span className="flex items-center space-x-1 text-[#F5762E]">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F5762E]"></span>
                        <span>MTTR ({activeTrend.mttr})</span>
                      </span>
                    </div>
                  </div>

                  {/* Visual Bars Container */}
                  <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-[#1E293B]">
                    {activeTrend.points.map((pt, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group">
                        <div className="w-full flex items-end justify-center space-x-1.5 h-36">
                          {/* MTTD Bar */}
                          <div
                            style={{ height: `${(pt.mttd / 5) * 100}%` }}
                            className="w-1/2 max-w-[20px] bg-[#22C55E] rounded-t-sm hover:brightness-125 transition-all relative group-hover:bg-[#4ADE80]"
                          >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#0B0F19] text-[#22C55E] text-[9px] font-mono px-1 rounded shadow pointer-events-none transition-opacity">
                              {pt.mttd}m
                            </div>
                          </div>

                          {/* MTTR Bar */}
                          <div
                            style={{ height: `${(pt.mttr / 10) * 100}%` }}
                            className="w-1/2 max-w-[20px] bg-[#F5762E] rounded-t-sm hover:brightness-125 transition-all relative group-hover:bg-[#FF9A5A]"
                          >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#0B0F19] text-[#F5762E] text-[9px] font-mono px-1 rounded shadow pointer-events-none transition-opacity">
                              {pt.mttr}m
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-[#64748B] mt-2 group-hover:text-white transition-colors">
                          {pt.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Benchmark Comparison Footer */}
                  <div className="p-3 bg-[#0B0F19] border border-[#1E293B] rounded-lg flex items-center justify-between text-xs">
                    <div className="text-[11px] text-[#94A3B8]">
                      Industry Benchmark (Gartner 2026): <span className="text-white font-mono font-semibold">18.4 hrs MTTD</span>
                    </div>
                    <div className="text-[11px] text-[#22C55E] font-bold font-mono">
                      RedFort Advantage: 99.8% Faster
                    </div>
                  </div>

                </div>

              </div>

              {/* Chart 2: SOAR Automation vs Manual Officer Dispatch Ratio */}
              <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4">
                
                <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-[#38BDF8]" />
                      <span>SOAR Autonomous Containment Ratio</span>
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      Percentage of threats resolved instantly via machine-speed playbooks
                    </p>
                  </div>

                  <span className="text-xs font-mono font-bold text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-1 rounded border border-[#38BDF8]/30">
                    {activeTrend.automatedSoarRatio} Autonomous
                  </span>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#0B0F19] p-3 rounded-lg border border-[#1E293B]">
                      <div className="text-[10px] text-[#64748B]">Machine-Speed Actions</div>
                      <div className="text-lg font-bold text-[#38BDF8] font-mono mt-0.5">3,492 / 3,950</div>
                      <div className="text-[10px] text-[#22C55E] mt-1">Sub-second execution</div>
                    </div>
                    <div className="bg-[#0B0F19] p-3 rounded-lg border border-[#1E293B]">
                      <div className="text-[10px] text-[#64748B]">Escalated to Field Officers</div>
                      <div className="text-lg font-bold text-slate-300 font-mono mt-0.5">458 incidents</div>
                      <div className="text-[10px] text-[#94A3B8] mt-1">Physical verification only</div>
                    </div>
                  </div>

                  {/* Progress Distribution */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Automated SOAR Execution Rate</span>
                      <span className="text-[#38BDF8] font-bold font-mono">{activeTrend.automatedSoarRatio}</span>
                    </div>
                    <div className="w-full bg-[#1E293B] h-3 rounded-full overflow-hidden flex">
                      <div style={{ width: activeTrend.automatedSoarRatio }} className="bg-[#38BDF8] h-full"></div>
                      <div style={{ width: `${100 - parseFloat(activeTrend.automatedSoarRatio)}%` }} className="bg-[#64748B] h-full"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#64748B]">
                      <span>Automated Host Isolation & Badging</span>
                      <span>Human Officer Intervention</span>
                    </div>
                  </div>

                  {/* Live Playbook Effectiveness */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-semibold text-[#64748B] uppercase">Top Active Playbooks (Last 30 Days)</div>
                    {[
                      { name: 'SOAR-PB-84: Tailgating Lockdown & CCTV Clip Capture', fired: '1,204 times', success: '99.8%' },
                      { name: 'SOAR-PB-12: Zero-Trust Host Quarantine on Anomaly', fired: '842 times', success: '100.0%' },
                      { name: 'SOAR-PB-05: JIT Vendor Token Auto-Revocation', fired: '640 times', success: '100.0%' }
                    ].map((pb, idx) => (
                      <div key={idx} className="p-2 rounded bg-[#0B0F19] border border-[#1E293B] flex items-center justify-between text-xs">
                        <span className="text-slate-300 truncate max-w-[240px]">{pb.name}</span>
                        <div className="flex items-center space-x-3 shrink-0 font-mono text-[11px]">
                          <span className="text-[#64748B]">{pb.fired}</span>
                          <span className="text-[#22C55E] font-bold">{pb.success}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* VIEW 4: MULTI-CAMPUS CONVERGENCE SCORECARDS */}
          {activeNav === 'multicampus' && (
            <div className="space-y-6 animate-fade-in">
              
              <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-[#38BDF8]" />
                    <span>Multi-Campus Convergence & Posture Scorecards</span>
                  </h2>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Comparative telemetry and infrastructure integrity across global enterprise sites
                  </p>
                </div>

                <button
                  onClick={() => setSimulationModalOpen(true)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 border border-[#38BDF8]/30 text-[#38BDF8] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Run Multi-Campus Drill</span>
                </button>
              </div>

              {/* 4 Campus Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CAMPUSES.map(campus => (
                  <div
                    key={campus.id}
                    onClick={() => setSelectedCampus(campus.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedCampus === campus.id
                        ? 'bg-[#151E33] border-[#F5762E] shadow-lg ring-1 ring-[#F5762E]'
                        : 'bg-[#111827] border-[#1F2937] hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">{campus.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold font-mono ${
                        campus.status === 'Optimal' ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-[#F5762E]/15 text-[#F5762E]'
                      }`}>
                        {campus.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#64748B] mt-0.5">{campus.region}</div>

                    <div className="mt-3 pt-3 border-t border-[#1E293B] space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-[#94A3B8]">Security Posture</span>
                        <span className="font-bold text-white font-mono">{campus.postureScore}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#94A3B8]">Compliance Rating</span>
                        <span className="font-bold text-[#22C55E] font-mono">{campus.complianceScore}%</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-[#64748B]">Monitored Nodes</span>
                        <span className="text-slate-300 font-mono">{campus.totalNodes.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-[#64748B]">Physical Perimeter Doors</span>
                        <span className="text-slate-300 font-mono">{campus.physicalDoors}</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-[#64748B]">CCTV Cameras</span>
                        <span className="text-slate-300 font-mono">{campus.cctvCameras}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Campus Deep Dive Matrix Table */}
              <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Campus Edge Nodes & Sensor Fleet Summary</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#1E293B] text-[11px] text-[#64748B] uppercase font-semibold">
                        <th className="pb-2.5">Campus Name</th>
                        <th className="pb-2.5">Region</th>
                        <th className="pb-2.5">Lead Security Officer</th>
                        <th className="pb-2.5">Monitored Assets</th>
                        <th className="pb-2.5">Last Physical Audit</th>
                        <th className="pb-2.5">Posture Rating</th>
                        <th className="pb-2.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {CAMPUSES.map((c) => (
                        <tr key={c.id} className="hover:bg-[#151E33] transition-colors">
                          <td className="py-3 font-semibold text-white flex items-center space-x-2">
                            <Building2 className="w-4 h-4 text-[#38BDF8]" />
                            <span>{c.name}</span>
                          </td>
                          <td className="py-3 text-slate-300">{c.region}</td>
                          <td className="py-3 text-slate-300">{c.leadContact}</td>
                          <td className="py-3 font-mono text-slate-300">{c.totalNodes.toLocaleString()} nodes ({c.physicalDoors} doors)</td>
                          <td className="py-3 font-mono text-slate-400">{c.lastAudit}</td>
                          <td className="py-3 font-mono font-bold text-[#22C55E]">{c.postureScore}%</td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => {
                                setActionNotice(`Telemetry sync triggered for ${c.name}`);
                                setTimeout(() => setActionNotice(null), 3000);
                              }}
                              className="px-2.5 py-1 rounded bg-[#0B0F19] hover:bg-[#1E293B] border border-[#1E293B] text-[10px] text-slate-300 hover:text-white font-mono transition-colors cursor-pointer"
                            >
                              Sync Telemetry
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* VIEW 5: COMPLIANCE & AUDIT */}
          {activeNav === 'compliance' && (
            <div className="space-y-6 animate-fade-in">
              
              <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1F2937] pb-3">
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                      <Award className="w-4 h-4 text-[#A855F7]" />
                      <span>Regulatory Compliance & Framework Audit Matrix</span>
                    </h2>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      Automated continuous control validation against international security and privacy mandates
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-[#22C55E] font-mono font-bold bg-[#22C55E]/10 px-2 py-1 rounded border border-[#22C55E]/30">
                      Continuous Automated Auditing Active
                    </span>
                  </div>
                </div>

                {/* Frameworks Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#1E293B] text-[11px] text-[#64748B] uppercase font-semibold">
                        <th className="pb-2.5">Standard / Framework</th>
                        <th className="pb-2.5">Audit Scope</th>
                        <th className="pb-2.5">Audit Opinion</th>
                        <th className="pb-2.5">Controls Verified</th>
                        <th className="pb-2.5">Score</th>
                        <th className="pb-2.5">Next External Audit</th>
                        <th className="pb-2.5 text-right">Evidence Locker</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {COMPLIANCE_FRAMEWORKS.map((fw, idx) => (
                        <tr key={idx} className="hover:bg-[#151E33] transition-colors">
                          <td className="py-3 font-semibold text-white flex items-center space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                            <span>{fw.name}</span>
                          </td>
                          <td className="py-3 text-slate-300">{fw.scope}</td>
                          <td className="py-3 text-slate-300">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                              {fw.status}
                            </span>
                          </td>
                          <td className="py-3 font-mono text-slate-300">{fw.controlsPassed}</td>
                          <td className="py-3 font-mono font-bold text-white">{fw.score}%</td>
                          <td className="py-3 font-mono text-slate-400">{fw.nextAudit}</td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => {
                                setActionNotice(`Evidence package for ${fw.name} exported.`);
                                setTimeout(() => setActionNotice(null), 3000);
                              }}
                              className="px-2.5 py-1 rounded bg-[#0B0F19] hover:bg-[#1E293B] border border-[#1E293B] text-[10px] text-slate-300 hover:text-white font-mono transition-colors cursor-pointer"
                            >
                              Export Proof
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </main>

      </div>

      {/* MODAL 1: Threat Level / DEFCON Escalation Controller */}
      {threatModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F2937]">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-[#EF4444]" />
                <span>Enterprise Threat Advisory Level (DEFCON)</span>
              </h3>
              <button onClick={() => setThreatModalOpen(false)} className="text-[#64748B] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#94A3B8]">
              Adjusting the global threat level dynamically scales automated physical lockdowns, two-factor badge enforcement, and sensor telemetry frequencies across all 4 campuses.
            </p>

            <div className="space-y-2">
              {[
                { level: 'NORMAL', defcon: 'DEFCON 5', color: 'border-[#22C55E] text-[#22C55E]', desc: 'Routine operations. Standard LiDAR and badge telemetry.' },
                { level: 'GUARDED', defcon: 'DEFCON 4', color: 'border-[#38BDF8] text-[#38BDF8]', desc: 'Heightened convergence monitoring. Baseline active state.' },
                { level: 'ELEVATED', defcon: 'DEFCON 3', color: 'border-[#EAB308] text-[#EAB308]', desc: 'Mandatory two-factor badge access at high-security corridors.' },
                { level: 'HIGH', defcon: 'DEFCON 2', color: 'border-[#F5762E] text-[#F5762E]', desc: 'Armed escort required for server cages. JIT vendor access revoked.' },
                { level: 'SEVERE', defcon: 'DEFCON 1', color: 'border-[#EF4444] text-[#EF4444]', desc: 'Full physical lockdown and cyber network perimeter isolation.' }
              ].map((item) => (
                <button
                  key={item.level}
                  onClick={() => {
                    setThreatLevel(item.level as any);
                    setThreatModalOpen(false);
                    setActionNotice(`Enterprise Threat Level elevated to ${item.level} (${item.defcon}).`);
                    setTimeout(() => setActionNotice(null), 4000);
                  }}
                  className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                    threatLevel === item.level ? `${item.color} bg-[#151E33] ring-1` : 'border-[#1E293B] hover:bg-[#151E33]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white flex items-center space-x-2">
                      <span>{item.defcon} &middot; {item.level}</span>
                      {threatLevel === item.level && <span className="text-[10px] text-[#22C55E] font-mono">(Active)</span>}
                    </div>
                    <div className="text-[11px] text-[#94A3B8] mt-0.5">{item.desc}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#64748B]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Board-Ready Report Generator */}
      {boardReportOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F2937]">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#F5762E]" />
                <span>Export Board-Ready Executive Dossier</span>
              </h3>
              <button onClick={() => setBoardReportOpen(false)} className="text-[#64748B] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#0B0F19] border border-[#1E293B] space-y-2">
                <div className="text-[11px] font-semibold text-[#F5762E] uppercase">Executive Briefing Summary</div>
                <div className="text-slate-300 leading-relaxed text-[11px]">
                  <strong>Q1 2026 Posture:</strong> RedFort Converged Security System maintained a <strong>94.8/100</strong> security rating across all 4 global campuses with <strong>0 data breaches</strong>. MTTD dropped to <strong>1.8 minutes</strong> (99.8% faster than industry standard), preventing an estimated <strong>$14.2M</strong> in combined cyber-physical exposure.
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-[#64748B] uppercase">Included Sections</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <label className="flex items-center space-x-2 text-slate-300">
                    <input type="checkbox" defaultChecked className="rounded text-[#F5762E]" />
                    <span>Likelihood &times; Impact Heatmap</span>
                  </label>
                  <label className="flex items-center space-x-2 text-slate-300">
                    <input type="checkbox" defaultChecked className="rounded text-[#F5762E]" />
                    <span>MTTD &amp; MTTR Velocity Curves</span>
                  </label>
                  <label className="flex items-center space-x-2 text-slate-300">
                    <input type="checkbox" defaultChecked className="rounded text-[#F5762E]" />
                    <span>Multi-Campus Compliance Scorecard</span>
                  </label>
                  <label className="flex items-center space-x-2 text-slate-300">
                    <input type="checkbox" defaultChecked className="rounded text-[#F5762E]" />
                    <span>SOAR Automation ROI Metrics</span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setBoardReportOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExportBoardReport}
                  disabled={reportExported}
                  className="px-4 py-2 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold flex items-center space-x-2 cursor-pointer shadow-md"
                >
                  {reportExported ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Generating PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF Briefing</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Chaos Threat Simulation Drill */}
      {simulationModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F2937]">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Play className="w-4 h-4 text-[#38BDF8]" />
                <span>Multi-Campus Chaos &amp; Resilience Drill</span>
              </h3>
              <button onClick={() => setSimulationModalOpen(false)} className="text-[#64748B] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#94A3B8]">
              Simulates simultaneous high-impact threat scenarios across Austin HQ and Frankfurt Edge Center to benchmark mean time to detect and test automated SOAR lockdown triggers.
            </p>

            {simulationResult ? (
              <div className="p-3.5 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/30 text-xs text-[#22C55E] space-y-2">
                <div className="font-bold flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Drill Verification Succeeded</span>
                </div>
                <div className="text-[11px] leading-relaxed text-slate-200">
                  {simulationResult}
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-xs text-slate-300 space-y-2">
                <div className="font-semibold text-white">Injected Scenarios:</div>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-[#94A3B8]">
                  <li>Zone-A Server Corridor Tailgating &amp; Anti-Passback bypass</li>
                  <li>SCADA Edge Gateway lateral port scan injection</li>
                  <li>Simulated HVAC thermal override anomaly trigger</li>
                </ul>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setSimulationModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={simulationRunning}
                className="px-4 py-2 rounded-lg bg-[#38BDF8] hover:bg-[#7DD3FC] text-slate-950 text-xs font-bold flex items-center space-x-2 cursor-pointer shadow-md"
              >
                {simulationRunning ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Injecting Threat Scenarios...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Run Live Drill</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
