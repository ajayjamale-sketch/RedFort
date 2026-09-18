'use strict';
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  CreditCard, 
  QrCode, 
  Smartphone, 
  Users, 
  UserPlus, 
  LifeBuoy, 
  Shield,
  ShieldCheck, 
  ShieldAlert, 
  Radio, 
  Scale, 
  Key, 
  Server, 
  Building2, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  ArrowUpRight, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw, 
  LogOut, 
  X, 
  Menu, 
  Eye, 
  FileText, 
  Bell, 
  Zap, 
  Fingerprint, 
  MapPin, 
  Lock, 
  Unlock, 
  Share2, 
  Download, 
  Flame, 
  SlidersHorizontal,
  Wifi,
  Send,
  AlertOctagon,
  Calendar,
  Layers,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import Logo from '@/components/Logo';

export type PortalNavTab = 'badge' | 'visitors' | 'safety' | 'access' | 'history';

// --- DATA STRUCTURES ---

export interface VisitorInvite {
  id: string;
  guestName: string;
  guestEmail: string;
  company: string;
  visitDate: string;
  arrivalWindow: string;
  facility: string;
  room: string;
  escortRequired: boolean;
  ndaSigned: boolean;
  status: 'Invited' | 'Checked-In' | 'Completed' | 'Expired';
  qrCodeDigest: string;
}

export interface ZoneAccessPermission {
  id: string;
  zoneName: string;
  campus: string;
  clearanceLevel: 'Standard' | 'Confidential' | 'High Security' | 'Cleanroom Tier-1';
  accessType: 'Permanent 24/7' | 'Business Hours (07:00 - 19:00)' | 'Escorted Only';
  validUntil: string;
  status: 'Active' | 'Pending Review' | 'Expired';
}

export interface TurnstileActivityRecord {
  id: string;
  timestamp: string;
  gateName: string;
  facility: string;
  direction: 'Entry' | 'Exit';
  authMethod: 'NFC Mobile Wallet' | 'Rotating Dynamic QR' | 'FIDO2 Physical Badge';
  status: 'Access Granted' | 'Denied - Zone Restricted' | 'Anti-Passback Blocked';
}

// --- INITIAL MOCK DATASETS ---

export const INITIAL_VISITOR_INVITES: VisitorInvite[] = [
  {
    id: 'VIS-2026-0891',
    guestName: 'Sarah Lin',
    guestEmail: 'sarah.lin@partner-consulting.com',
    company: 'Apex Cloud Systems',
    visitDate: '2026-03-19',
    arrivalWindow: '10:00 AM - 12:30 PM',
    facility: 'Austin Global HQ · Building A',
    room: 'Executive Briefing Center 302',
    escortRequired: true,
    ndaSigned: true,
    status: 'Invited',
    qrCodeDigest: 'RF-VIS-891-B78F90'
  },
  {
    id: 'VIS-2026-0842',
    guestName: 'David Chen',
    guestEmail: 'd.chen@semicon-tools.jp',
    company: 'Tokyo Fab Robotics Inc.',
    visitDate: '2026-03-18',
    arrivalWindow: '02:00 PM - 05:00 PM',
    facility: 'Austin Global HQ · Cleanroom Annex',
    room: 'Hardware R&D Lab 104',
    escortRequired: true,
    ndaSigned: true,
    status: 'Checked-In',
    qrCodeDigest: 'RF-VIS-842-A12E44'
  },
  {
    id: 'VIS-2026-0798',
    guestName: 'Jessica Morales',
    guestEmail: 'jessica@venture-capital.io',
    company: 'Benchmark Growth Partners',
    visitDate: '2026-03-16',
    arrivalWindow: '11:00 AM - 01:30 PM',
    facility: 'Austin Global HQ · Building B',
    room: 'Boardroom West',
    escortRequired: false,
    ndaSigned: true,
    status: 'Completed',
    qrCodeDigest: 'RF-VIS-798-C45A91'
  }
];

export const INITIAL_ZONE_PERMISSIONS: ZoneAccessPermission[] = [
  {
    id: 'ZONE-AUSTIN-LOBBY',
    zoneName: 'Main Campus Lobby & Turnstiles',
    campus: 'Austin Global HQ',
    clearanceLevel: 'Standard',
    accessType: 'Permanent 24/7',
    validUntil: '2027-12-31',
    status: 'Active'
  },
  {
    id: 'ZONE-AUSTIN-ENG4',
    zoneName: 'Engineering & Architecture Suite (Floor 4)',
    campus: 'Austin Global HQ',
    clearanceLevel: 'Confidential',
    accessType: 'Permanent 24/7',
    validUntil: '2027-12-31',
    status: 'Active'
  },
  {
    id: 'ZONE-AUSTIN-LAB',
    zoneName: 'Robotics & Hardware Prototyping Lab',
    campus: 'Austin Global HQ',
    clearanceLevel: 'High Security',
    accessType: 'Business Hours (07:00 - 19:00)',
    validUntil: '2026-09-30',
    status: 'Active'
  },
  {
    id: 'ZONE-AUSTIN-DC',
    zoneName: 'Primary Data Center & HSM Crypto Vault',
    campus: 'Austin Global HQ',
    clearanceLevel: 'Cleanroom Tier-1',
    accessType: 'Escorted Only',
    validUntil: '2026-04-15',
    status: 'Active'
  }
];

export const INITIAL_ACTIVITY_LOGS: TurnstileActivityRecord[] = [
  {
    id: 'ACT-9821',
    timestamp: 'Today · 08:42:15 AM',
    gateName: 'Turnstile Post-01 (Main Lobby)',
    facility: 'Austin Global HQ',
    direction: 'Entry',
    authMethod: 'NFC Mobile Wallet',
    status: 'Access Granted'
  },
  {
    id: 'ACT-9820',
    timestamp: 'Today · 08:45:30 AM',
    gateName: 'Speed Gate E-4 (Floor 4 Elevator Bank)',
    facility: 'Austin Global HQ',
    direction: 'Entry',
    authMethod: 'Rotating Dynamic QR',
    status: 'Access Granted'
  },
  {
    id: 'ACT-9788',
    timestamp: 'Yesterday · 06:15:22 PM',
    gateName: 'Turnstile Post-04 (West Courtyard Exit)',
    facility: 'Austin Global HQ',
    direction: 'Exit',
    authMethod: 'NFC Mobile Wallet',
    status: 'Access Granted'
  },
  {
    id: 'ACT-9754',
    timestamp: 'Yesterday · 01:12:08 PM',
    gateName: 'Smart Lock Door 402 (Hardware Lab)',
    facility: 'Austin Global HQ',
    direction: 'Entry',
    authMethod: 'NFC Mobile Wallet',
    status: 'Access Granted'
  },
  {
    id: 'ACT-9721',
    timestamp: '2 days ago · 09:05:44 AM',
    gateName: 'Turnstile Post-02 (Main Lobby)',
    facility: 'Austin Global HQ',
    direction: 'Entry',
    authMethod: 'FIDO2 Physical Badge',
    status: 'Access Granted'
  }
];

interface EmployeePortalViewProps {
  initialTab?: PortalNavTab;
}

export default function EmployeePortalView({ initialTab = 'badge' }: EmployeePortalViewProps) {
  const [activeTab, setActiveTab] = useState<PortalNavTab>(initialTab);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // States
  const [invites, setInvites] = useState<VisitorInvite[]>(INITIAL_VISITOR_INVITES);
  const [zonePermissions, setZonePermissions] = useState<ZoneAccessPermission[]>(INITIAL_ZONE_PERMISSIONS);
  const [activityLogs, setActivityLogs] = useState<TurnstileActivityRecord[]>(INITIAL_ACTIVITY_LOGS);

  // Dynamic QR Code Countdown Timer
  const [qrCountdown, setQrCountdown] = useState<number>(30);
  const [qrToken, setQrToken] = useState<string>('RF-9842-8819-F3A0');
  const [isBadgeLocked, setIsBadgeLocked] = useState<boolean>(false);
  const [nfcTapped, setNfcTapped] = useState<boolean>(false);

  // Emergency Safety State
  const [safetyStatus, setSafetyStatus] = useState<'Safe' | 'Pending' | 'Needs Assistance'>('Safe');
  const [lastCheckInTime, setLastCheckInTime] = useState<string>('Today · 08:50 AM');
  const [musterZone, setMusterZone] = useState<string>('North Lawn Assembly Area B');
  const [isEvacDrillActive, setIsEvacDrillActive] = useState<boolean>(false);

  // Modals
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [newInviteData, setNewInviteData] = useState({
    guestName: '',
    guestEmail: '',
    company: '',
    visitDate: '2026-03-20',
    arrivalWindow: '10:00 AM - 12:00 PM',
    facility: 'Austin Global HQ · Building A',
    room: 'Conference Room 402',
    escortRequired: true
  });

  const [isZoneRequestModalOpen, setIsZoneRequestModalOpen] = useState<boolean>(false);
  const [newZoneRequest, setNewZoneRequest] = useState({
    zoneName: 'Server Room Annex B',
    campus: 'Austin Global HQ',
    clearanceLevel: 'High Security' as ZoneAccessPermission['clearanceLevel'],
    durationDays: 30,
    justification: 'Quarterly server maintenance and edge firmware upgrades.'
  });

  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // QR Rotating Countdown Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setQrCountdown((prev) => {
        if (prev <= 1) {
          // Generate new token
          const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
          setQrToken(`RF-9842-${Math.floor(1000 + Math.random() * 9000)}-${randomHex}`);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Simulate NFC Tap to Unlock
  const triggerNfcTap = () => {
    if (isBadgeLocked) return;
    setNfcTapped(true);
    setTimeout(() => {
      setNfcTapped(false);
    }, 2500);
  };

  // Handle Safety Check-In
  const handleSafetyCheckIn = () => {
    setSafetyStatus('Safe');
    const now = new Date();
    setLastCheckInTime(`Today · ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
  };

  // Handle Visitor Invite Submit
  const handleCreateInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInviteData.guestName || !newInviteData.guestEmail) return;

    const newInvite: VisitorInvite = {
      id: `VIS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: newInviteData.guestName,
      guestEmail: newInviteData.guestEmail,
      company: newInviteData.company || 'External Guest',
      visitDate: newInviteData.visitDate,
      arrivalWindow: newInviteData.arrivalWindow,
      facility: newInviteData.facility,
      room: newInviteData.room,
      escortRequired: newInviteData.escortRequired,
      ndaSigned: true,
      status: 'Invited',
      qrCodeDigest: `RF-VIS-${Math.floor(100 + Math.random() * 900)}-${Math.random().toString(16).substring(2, 6).toUpperCase()}`
    };

    setInvites([newInvite, ...invites]);
    setIsInviteModalOpen(false);
    setNewInviteData({
      guestName: '',
      guestEmail: '',
      company: '',
      visitDate: '2026-03-20',
      arrivalWindow: '10:00 AM - 12:00 PM',
      facility: 'Austin Global HQ · Building A',
      room: 'Conference Room 402',
      escortRequired: true
    });
  };

  // Handle Zone Request Submit
  const handleCreateZoneRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newPerm: ZoneAccessPermission = {
      id: `ZONE-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      zoneName: newZoneRequest.zoneName,
      campus: newZoneRequest.campus,
      clearanceLevel: newZoneRequest.clearanceLevel,
      accessType: 'Business Hours (07:00 - 19:00)',
      validUntil: 'Pending Approval',
      status: 'Pending Review'
    };

    setZonePermissions([...zonePermissions, newPerm]);
    setIsZoneRequestModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-[#F5762E] selection:text-white">
      
      {/* Top Banner Bar */}
      <header className="h-14 border-b border-[#1E293B] bg-[#0E1526]/90 backdrop-blur px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E293B]"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <Link href="/" className="flex items-center space-x-2">
            <Logo variant="mark" size="sm" />
            <span className="font-bold text-white tracking-wide text-sm hidden sm:inline-block">REDFORT</span>
          </Link>
          
          <div className="h-4 w-px bg-[#1E293B] hidden sm:block"></div>
          
          <div className="flex items-center space-x-2">
            <div className="px-2 py-0.5 rounded bg-[#F5762E]/10 border border-[#F5762E]/30 text-[#F5762E] text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center space-x-1.5">
              <Smartphone className="w-3 h-3" />
              <span>Employee Portal</span>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden lg:inline">Digital Credential & Self-Service</span>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Quick Safety Indicator */}
          <button
            type="button"
            onClick={() => setActiveTab('safety')}
            className={`hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-full border text-[11px] font-mono transition-colors ${
              safetyStatus === 'Safe' 
                ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]' 
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${safetyStatus === 'Safe' ? 'bg-[#22C55E]' : 'bg-rose-500'}`}></span>
            <span>Safety Status: <strong>{safetyStatus}</strong></span>
          </button>

          <button
            type="button"
            onClick={() => setIsInviteModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Invite Visitor</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex relative">
        
        {/* Sidebar Navigation */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-30
          w-64 bg-[#0E1526] border-r border-[#1E293B]
          flex flex-col justify-between p-4
          transition-transform duration-200 ease-in-out
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          top-14 md:top-0 h-[calc(100vh-3.5rem)] md:h-auto
        `}>
          <div className="space-y-6">
            
            {/* Navigation Tabs */}
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
                Self-Service Consoles
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('badge');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'badge' 
                    ? 'bg-[#F5762E] text-white shadow-sm font-semibold' 
                    : 'text-slate-300 hover:bg-[#151E33] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <span className="truncate">Digital Badge</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                  activeTab === 'badge' ? 'bg-white/20 text-white' : 'bg-[#1E293B] text-slate-400'
                }`}>
                  Live
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('visitors');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'visitors' 
                    ? 'bg-[#F5762E] text-white shadow-sm font-semibold' 
                    : 'text-slate-300 hover:bg-[#151E33] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <Users className="w-4 h-4 shrink-0" />
                  <span className="truncate">Visitor Passes</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                  activeTab === 'visitors' ? 'bg-white/20 text-white' : 'bg-[#1E293B] text-slate-400'
                }`}>
                  {invites.length} Passes
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('safety');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'safety' 
                    ? 'bg-[#F5762E] text-white shadow-sm font-semibold' 
                    : 'text-slate-300 hover:bg-[#151E33] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <LifeBuoy className="w-4 h-4 shrink-0" />
                  <span className="truncate">Emergency Muster</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                  activeTab === 'safety' ? 'bg-white/20 text-white' : 'bg-[#1E293B] text-[#22C55E]'
                }`}>
                  I am Safe
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('access');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'access' 
                    ? 'bg-[#F5762E] text-white shadow-sm font-semibold' 
                    : 'text-slate-300 hover:bg-[#151E33] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span className="truncate">Zone Permissions</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                  activeTab === 'access' ? 'bg-white/20 text-white' : 'bg-[#1E293B] text-slate-400'
                }`}>
                  4 Zones
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('history');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'history' 
                    ? 'bg-[#F5762E] text-white shadow-sm font-semibold' 
                    : 'text-slate-300 hover:bg-[#151E33] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span className="truncate">Turnstile Activity</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                  activeTab === 'history' ? 'bg-white/20 text-white' : 'bg-[#1E293B] text-slate-400'
                }`}>
                  Log
                </span>
              </button>
            </div>

            {/* Mobile Credential Card */}
            <div className="p-3 rounded-xl bg-[#111827] border border-[#1E293B] space-y-2">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Mobile NFC Ready</span>
                <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Hold phone near any turnstile reader or gate scanner for instant contactless badge entry.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsWalletModalOpen(true)}
                  className="w-full py-1 px-2 rounded bg-[#1E293B] hover:bg-[#2A374A] text-slate-300 text-[11px] font-mono flex items-center justify-center space-x-1 transition-colors"
                >
                  <Smartphone className="w-3 h-3 text-[#38BDF8]" />
                  <span>Add to Apple / Google Wallet</span>
                </button>
              </div>
            </div>

        </div>

          {/* Footer User Profile */}
          <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#F5762E] text-white font-bold text-xs flex items-center justify-center shrink-0">
                ER
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate">Elena Rostova</div>
                <div className="text-[10px] text-slate-400 truncate">Staff Systems Architect</div>
              </div>
            </div>
            <Link 
              href="/login"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-[#151E33] transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6">

          {/* --- TAB 1: DIGITAL BADGE HUB --- */}
          {activeTab === 'badge' && (
            <div className="space-y-6">
              
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2.5">
                    <CreditCard className="w-6 h-6 text-[#F5762E]" />
                    <span>Digital Mobile Credential</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Contactless NFC badge and dynamic rotating QR code for turnstile and high-security facility access.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsBadgeLocked(!isBadgeLocked)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center space-x-1.5 transition-colors ${
                      isBadgeLocked 
                        ? 'bg-rose-500/15 border-rose-500/40 text-rose-400' 
                        : 'bg-[#151E33] border-[#1E293B] text-slate-300 hover:text-white'
                    }`}
                  >
                    {isBadgeLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5 text-[#22C55E]" />}
                    <span>{isBadgeLocked ? 'Badge Locked' : 'Badge Active'}</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setIsWalletModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Export Pass</span>
                  </button>
                </div>
              </div>

              {/* Digital Badge Layout (Center Card) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Left Card: Holographic Digital Badge Pass */}
                <div className="md:col-span-7 bg-[#0E1526] border border-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
                  
                  {/* Subtle Background Radial Watermark */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5762E]/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  {/* Badge Header with Chip */}
                  <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
                    <div className="flex items-center space-x-2.5">
                      <Logo variant="mark" size="sm" />
                      <div>
                        <div className="text-sm font-bold text-white tracking-wider font-mono">REDFORT SECURE PASS</div>
                        <div className="text-[10px] text-slate-400 font-mono">Austin Global HQ · Level 3 Clearance</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 text-[#22C55E] text-xs font-mono">
                      <ShieldCheck className="w-4 h-4" />
                      <span>FIDO2 Active</span>
                    </div>
                  </div>

                  {/* Badge Body: Profile & Rotating Cryptographic QR */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                    
                    {/* User Info */}
                    <div className="space-y-4 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-[#F5762E] to-[#FF9A5A] text-white font-bold text-xl flex items-center justify-center shadow-lg font-mono ring-4 ring-[#F5762E]/20">
                          ER
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-white">Elena Rostova</h2>
                          <p className="text-xs text-[#38BDF8] font-mono">Staff Systems Architect</p>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">Dept: Enterprise Infrastructure</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs font-mono">
                        <div className="flex items-center space-x-2 text-slate-400">
                          <span>Badge ID:</span>
                          <strong className="text-white">BDG-USA-984288</strong>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-400">
                          <span>RFID Serial:</span>
                          <strong className="text-white">04:8A:22:9F:1B:34</strong>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-400">
                          <span>Expiry:</span>
                          <strong className="text-[#22C55E]">Dec 31, 2027</strong>
                        </div>
                      </div>
                    </div>

                    {/* Rotating QR Display */}
                    <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-[#111827] border border-[#1E293B] shadow-inner">
                      <div className="p-3 bg-white rounded-lg shadow-md relative">
                        {/* Simulated QR Pattern */}
                        <div className="w-28 h-28 flex flex-col justify-between p-1 bg-white text-slate-900 font-mono text-[9px]">
                          <div className="flex justify-between">
                            <div className="w-7 h-7 bg-slate-950 rounded-sm flex items-center justify-center text-white text-[8px] font-bold">■</div>
                            <div className="w-4 h-4 bg-slate-950 rounded-sm"></div>
                            <div className="w-7 h-7 bg-slate-950 rounded-sm flex items-center justify-center text-white text-[8px] font-bold">■</div>
                          </div>
                          <div className="text-center font-bold text-[8px] text-slate-800 tracking-tighter">
                            {qrToken}
                          </div>
                          <div className="flex justify-between items-end">
                            <div className="w-7 h-7 bg-slate-950 rounded-sm flex items-center justify-center text-white text-[8px] font-bold">■</div>
                            <div className="w-3 h-3 bg-[#F5762E] rounded-full animate-ping"></div>
                            <div className="w-7 h-7 bg-slate-950 rounded-sm flex items-center justify-center text-white text-[8px] font-bold">■</div>
                          </div>
                        </div>
                      </div>

                      {/* Rotating Countdown */}
                      <div className="text-center">
                        <div className="text-[11px] font-mono text-slate-300 flex items-center justify-center space-x-1">
                          <RefreshCw className="w-3 h-3 text-[#F5762E] animate-spin" />
                          <span>Rotates in <strong>{qrCountdown}s</strong></span>
                        </div>
                        <div className="w-24 bg-[#1E293B] h-1 rounded-full mt-1.5 overflow-hidden mx-auto">
                          <div 
                            className="bg-[#F5762E] h-full transition-all duration-1000"
                            style={{ width: `${(qrCountdown / 30) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Contactless Tap Simulation Button */}
                  <div className="pt-2 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs font-mono text-slate-400">
                      <span>NFC Reader Status: </span>
                      <strong className="text-[#22C55E]">Ready (BLE Broadcast Online)</strong>
                    </div>

                    <button
                      type="button"
                      disabled={isBadgeLocked}
                      onClick={triggerNfcTap}
                      className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-md ${
                        isBadgeLocked 
                          ? 'bg-[#1E293B] text-slate-500 cursor-not-allowed'
                          : nfcTapped
                            ? 'bg-[#22C55E] text-slate-950 font-bold scale-105'
                            : 'bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] text-white cursor-pointer'
                      }`}
                    >
                      <Wifi className={`w-4 h-4 ${nfcTapped ? 'animate-bounce text-slate-950' : 'text-[#38BDF8]'}`} />
                      <span>{nfcTapped ? 'Gate Turnstile Unlocked!' : 'Simulate NFC Tap to Open Gate'}</span>
                    </button>
                  </div>

                </div>

                {/* Right Card: Quick Privileges & Status Overview */}
                <div className="md:col-span-5 space-y-4">
                  
                  {/* Clearance Summary */}
                  <div className="p-5 rounded-2xl bg-[#0E1526] border border-[#1E293B] space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                        <span>Granted Clearances</span>
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">
                        Level 3 Active
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="p-2.5 rounded-lg bg-[#111827] border border-[#1E293B] flex items-center justify-between">
                        <span className="text-slate-300">Austin Global HQ</span>
                        <span className="text-[#22C55E] font-semibold">Full 24/7 Access</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#111827] border border-[#1E293B] flex items-center justify-between">
                        <span className="text-slate-300">Hardware Prototyping Lab</span>
                        <span className="text-[#38BDF8]">07:00 - 19:00</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#111827] border border-[#1E293B] flex items-center justify-between">
                        <span className="text-slate-300">Tokyo Fab Cleanroom</span>
                        <span className="text-slate-500">Escort Required</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('access')}
                      className="w-full py-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#F5762E]" />
                      <span>Request Additional Zone Access</span>
                    </button>
                  </div>

                  {/* Recent Gate Entry */}
                  <div className="p-5 rounded-2xl bg-[#0E1526] border border-[#1E293B] space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-[#38BDF8]" />
                        <span>Last Gate Badge In</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab('history')}
                        className="text-[11px] text-[#F5762E] hover:underline font-mono"
                      >
                        View Full Log
                      </button>
                    </div>

                    <div className="p-3 rounded-lg bg-[#111827] border border-[#1E293B] space-y-1 text-xs font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">Turnstile Post-01</span>
                        <span className="text-[#22C55E]">Granted</span>
                      </div>
                      <div className="text-slate-400 text-[11px]">Austin HQ Main Lobby Entry</div>
                      <div className="text-[10px] text-slate-500">Today · 08:42:15 AM · NFC Mobile Wallet</div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* --- TAB 2: VISITOR PASS INVITATIONS --- */}
          {activeTab === 'visitors' && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2.5">
                    <Users className="w-6 h-6 text-[#F5762E]" />
                    <span>Guest & Visitor Pass Invitations</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Pre-register clients, interview candidates, and vendors with automated digital QR entry passes and NDA sign-off.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(true)}
                  className="px-3.5 py-2 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md cursor-pointer self-start sm:self-auto"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Send Visitor Invitation</span>
                </button>
              </div>

              {/* Roster of Invites */}
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#111827] text-slate-400 font-mono text-[11px] border-b border-[#1E293B] uppercase">
                      <tr>
                        <th className="py-3 px-4">Visitor & Company</th>
                        <th className="py-3 px-4">Visit Date & Time</th>
                        <th className="py-3 px-4">Destination Room</th>
                        <th className="py-3 px-4">Escort & NDA</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Pass Passcode</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {invites.map((inv) => (
                        <tr key={inv.id} className="hover:bg-[#111827]/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{inv.guestName}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{inv.guestEmail}</div>
                            <div className="text-[10px] text-[#38BDF8] font-mono">{inv.company}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            <div className="text-white">{inv.visitDate}</div>
                            <div className="text-[10px] text-slate-400">{inv.arrivalWindow}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            <div className="text-slate-200">{inv.room}</div>
                            <div className="text-[10px] text-slate-500">{inv.facility}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex flex-col space-y-1 font-mono text-[10px]">
                              <span className={inv.escortRequired ? 'text-[#F5762E]' : 'text-slate-400'}>
                                {inv.escortRequired ? '• Host Escort Req' : '• Unescorted Guest'}
                              </span>
                              <span className="text-[#22C55E]">✓ NDA Pre-Signed</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                              inv.status === 'Checked-In'
                                ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30'
                                : inv.status === 'Invited'
                                  ? 'bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30'
                                  : 'bg-[#1E293B] text-slate-400'
                            }`}>
                              {inv.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="font-mono text-[11px] text-slate-300 flex items-center justify-end space-x-1">
                              <span>{inv.qrCodeDigest}</span>
                              <button 
                                type="button"
                                onClick={() => handleCopy(inv.qrCodeDigest, inv.id)}
                                className="text-slate-500 hover:text-white"
                              >
                                {copiedId === inv.id ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* --- TAB 3: EMERGENCY MUSTER & "I AM SAFE" --- */}
          {activeTab === 'safety' && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2.5">
                    <LifeBuoy className="w-6 h-6 text-[#22C55E]" />
                    <span>Emergency Evacuation & Safety Hub</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Instant emergency muster check-in, real-time safety confirmation, and assembly zone guidance.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEvacDrillActive(!isEvacDrillActive)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center space-x-1.5 transition-colors ${
                      isEvacDrillActive 
                        ? 'bg-rose-500/15 border-rose-500/40 text-rose-400 animate-pulse' 
                        : 'bg-[#151E33] border-[#1E293B] text-slate-300'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>{isEvacDrillActive ? 'DRILL ACTIVE' : 'Simulate Drill'}</span>
                  </button>
                </div>
              </div>

              {/* Emergency Banner */}
              {isEvacDrillActive && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 flex items-start space-x-3 text-xs">
                  <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-rose-400 uppercase tracking-wider">Active Campus Evacuation Drill</h3>
                    <p className="text-slate-300 mt-0.5">
                      Please proceed to your assigned assembly zone immediately. Tap "I Am Safe" below to register with GSOC incident command.
                    </p>
                  </div>
                </div>
              )}

              {/* Main Safety Check-In Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Check-In Card */}
                <div className="p-6 rounded-2xl bg-[#0E1526] border border-[#1E293B] space-y-5 shadow-2xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accountability Status</span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{safetyStatus.toUpperCase()}</span>
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-white">Austin Global HQ · North Assembly Zone</h2>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Your current badge location was verified at Austin HQ Building A. Confirm your safety status below:
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSafetyCheckIn}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg cursor-pointer"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>I Am Safe & Accounted For</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSafetyStatus('Needs Assistance')}
                      className="w-full py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-semibold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Request Immediate Security / Medical Aid</span>
                    </button>
                  </div>

                  <div className="pt-3 border-t border-[#1E293B] text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>Last Check-In: <strong className="text-white">{lastCheckInTime}</strong></span>
                    <span>GPS Telemetry: <strong className="text-[#22C55E]">Live</strong></span>
                  </div>
                </div>

                {/* Muster Point Guidance */}
                <div className="p-6 rounded-2xl bg-[#0E1526] border border-[#1E293B] space-y-4 shadow-2xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Muster Zone</span>
                      <MapPin className="w-4 h-4 text-[#F5762E]" />
                    </div>

                    <h3 className="text-base font-bold text-white">{musterZone}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Located 120 meters north of Building A main lobby exit, adjacent to the visitor parking perimeter.
                    </p>
                  </div>

                  {/* Evacuation Map Preview */}
                  <div className="p-4 rounded-xl bg-[#111827] border border-[#1E293B] space-y-2 font-mono text-xs">
                    <div className="text-slate-300 font-semibold flex items-center justify-between">
                      <span>Muster Officer On-Site:</span>
                      <span className="text-[#38BDF8]">Officer Marcus Sterling</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">Contact: GSOC Radio Ch 4 / +1 (512) 555-0199</div>
                    <div className="pt-2 flex items-center space-x-2 text-[11px] text-[#22C55E]">
                      <Check className="w-3.5 h-3.5" />
                      <span>Automatic Turnstile Free-Egress Active</span>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-slate-400 font-mono">
                    Emergency Broadcast: <em>All stairwells clear. Follow green illuminated exit markings.</em>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* --- TAB 4: ZONE ACCESS PERMISSIONS --- */}
          {activeTab === 'access' && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2.5">
                    <Lock className="w-6 h-6 text-[#F5762E]" />
                    <span>Zone Clearance Permissions & Elevation Requests</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Review currently granted physical zones and submit temporary or permanent clearance elevation requests.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsZoneRequestModalOpen(true)}
                  className="px-3.5 py-2 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Request Zone Clearance</span>
                </button>
              </div>

              {/* Zone Clearances Table */}
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#111827] text-slate-400 font-mono text-[11px] border-b border-[#1E293B] uppercase">
                      <tr>
                        <th className="py-3 px-4">Facility Zone</th>
                        <th className="py-3 px-4">Campus</th>
                        <th className="py-3 px-4">Clearance Tier</th>
                        <th className="py-3 px-4">Allowed Hours</th>
                        <th className="py-3 px-4">Valid Through</th>
                        <th className="py-3 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {zonePermissions.map((zp) => (
                        <tr key={zp.id} className="hover:bg-[#111827]/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{zp.zoneName}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{zp.id}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-300">
                            {zp.campus}
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            <span className={`px-2 py-0.5 rounded text-[10px] ${
                              zp.clearanceLevel === 'Cleanroom Tier-1'
                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                                : zp.clearanceLevel === 'High Security'
                                  ? 'bg-[#F5762E]/10 text-[#F5762E] border border-[#F5762E]/30'
                                  : 'bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30'
                            }`}>
                              {zp.clearanceLevel}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-300">
                            {zp.accessType}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-400">
                            {zp.validUntil}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                              zp.status === 'Active'
                                ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30'
                                : 'bg-[#F5762E]/10 text-[#F5762E] border border-[#F5762E]/30'
                            }`}>
                              {zp.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* --- TAB 5: TURNSTILE ACTIVITY LOG --- */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2.5">
                    <Clock className="w-6 h-6 text-[#F5762E]" />
                    <span>Personal Turnstile & Access Audit Log</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Immutable record of your physical badge swipes, mobile NFC taps, and entry/exit timestamps.
                  </p>
                </div>
              </div>

              {/* Activity Log Table */}
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#111827] text-slate-400 font-mono text-[11px] border-b border-[#1E293B] uppercase">
                      <tr>
                        <th className="py-3 px-4">Timestamp</th>
                        <th className="py-3 px-4">Gate / Door Controller</th>
                        <th className="py-3 px-4">Campus Location</th>
                        <th className="py-3 px-4">Direction</th>
                        <th className="py-3 px-4">Auth Method</th>
                        <th className="py-3 px-4 text-right">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {activityLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#111827]/60 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-slate-300">
                            {log.timestamp}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-white">
                            {log.gateName}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-400">
                            {log.facility}
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                              log.direction === 'Entry' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#38BDF8]/10 text-[#38BDF8]'
                            }`}>
                              {log.direction}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-300 text-[11px]">
                            {log.authMethod}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 font-semibold">
                              {log.status}
                            </span>
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

      {/* --- MODAL 1: INVITE VISITOR MODAL --- */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-[#F5762E]" />
                <h3 className="text-base font-bold text-white">Invite Guest Visitor</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvite} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Guest Full Name</label>
                  <input
                    type="text"
                    required
                    value={newInviteData.guestName}
                    onChange={(e) => setNewInviteData({ ...newInviteData, guestName: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Guest Email</label>
                  <input
                    type="email"
                    required
                    value={newInviteData.guestEmail}
                    onChange={(e) => setNewInviteData({ ...newInviteData, guestEmail: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Guest Organization / Company</label>
                <input
                  type="text"
                  value={newInviteData.company}
                  onChange={(e) => setNewInviteData({ ...newInviteData, company: e.target.value })}
                  placeholder="e.g. Acme Quantum Technologies"
                  className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Date of Visit</label>
                  <input
                    type="date"
                    value={newInviteData.visitDate}
                    onChange={(e) => setNewInviteData({ ...newInviteData, visitDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Arrival Window</label>
                  <input
                    type="text"
                    value={newInviteData.arrivalWindow}
                    onChange={(e) => setNewInviteData({ ...newInviteData, arrivalWindow: e.target.value })}
                    placeholder="09:00 AM - 12:00 PM"
                    className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Meeting Room / Facility Destination</label>
                <input
                  type="text"
                  value={newInviteData.room}
                  onChange={(e) => setNewInviteData({ ...newInviteData, room: e.target.value })}
                  placeholder="e.g. Conference Room 402, Building A"
                  className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                />
              </div>

              <div className="pt-1 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="escortReq"
                  checked={newInviteData.escortRequired}
                  onChange={(e) => setNewInviteData({ ...newInviteData, escortRequired: e.target.checked })}
                  className="rounded border-[#1E293B] text-[#F5762E] focus:ring-[#F5762E]"
                />
                <label htmlFor="escortReq" className="text-slate-300 text-[11px]">
                  Host employee escort required at physical gate turnstiles
                </label>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-semibold flex items-center space-x-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Digital Guest Pass</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: REQUEST ZONE CLEARANCE MODAL --- */}
      {isZoneRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-[#F5762E]" />
                <h3 className="text-base font-bold text-white">Request Zone Access Elevation</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsZoneRequestModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateZoneRequest} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Facility / Room Target</label>
                <input
                  type="text"
                  required
                  value={newZoneRequest.zoneName}
                  onChange={(e) => setNewZoneRequest({ ...newZoneRequest, zoneName: e.target.value })}
                  placeholder="e.g. Server Room Annex B"
                  className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Clearance Level</label>
                <select
                  value={newZoneRequest.clearanceLevel}
                  onChange={(e) => setNewZoneRequest({ ...newZoneRequest, clearanceLevel: e.target.value as ZoneAccessPermission['clearanceLevel'] })}
                  className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                >
                  <option value="High Security">High Security (Requires Manager Sign-Off)</option>
                  <option value="Cleanroom Tier-1">Cleanroom Tier-1 (Requires CSO Dual-Auth)</option>
                  <option value="Confidential">Confidential (Standard Engineering)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Business Justification</label>
                <textarea
                  rows={3}
                  required
                  value={newZoneRequest.justification}
                  onChange={(e) => setNewZoneRequest({ ...newZoneRequest, justification: e.target.value })}
                  placeholder="State project need and access requirements..."
                  className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsZoneRequestModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-semibold flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit Approval Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: ADD TO MOBILE WALLET MODAL --- */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#F5762E]/10 border border-[#F5762E]/30 text-[#F5762E] flex items-center justify-center mx-auto">
              <Smartphone className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">Apple & Google Wallet Pass</h3>
              <p className="text-xs text-slate-400 mt-1">
                Install your RedFort cryptographic physical credential directly into your phone's native secure enclave.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => setIsWalletModalOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black border border-slate-700 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <span>Add to Apple Wallet</span>
              </button>

              <button
                type="button"
                onClick={() => setIsWalletModalOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black border border-slate-700 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <span>Add to Google Wallet</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsWalletModalOpen(false)}
              className="text-xs text-slate-500 hover:text-slate-300 font-mono"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
