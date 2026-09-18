'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  Radio,
  Camera,
  UserCheck,
  Building2,
  Lock,
  Unlock,
  AlertTriangle,
  Clock,
  LogOut,
  Search,
  Plus,
  X,
  Check,
  CheckCircle2,
  XCircle,
  FileText,
  Printer,
  QrCode,
  Sliders,
  Play,
  Pause,
  RefreshCw,
  Bell,
  ArrowRight,
  Maximize2,
  Volume2,
  Users,
  Key,
  ShieldAlert,
  ShieldCheck,
  Send,
  SlidersHorizontal,
  ChevronRight,
  Menu,
  PhoneCall,
  UserPlus,
  Scale,
  Server,
  Smartphone
} from 'lucide-react';
import Logo from '@/components/Logo';

// ================= TYPES =================
export interface TurnstileSwipe {
  id: string;
  timestamp: string;
  badgeId: string;
  holderName: string;
  department: string;
  role: string;
  door: string;
  zone: string;
  status: 'Granted' | 'Denied - Expired' | 'Denied - Anti-Passback' | 'Denied - Unauthorized' | 'Tailgating Detected';
  biometricScore: number;
}

export interface Visitor {
  id: string;
  name: string;
  company: string;
  hostEmployee: string;
  hostEmail: string;
  checkInTime: string;
  expectedCheckout: string;
  badgeNumber: string;
  status: 'Checked-In' | 'Expected' | 'Checked-Out';
  accessZone: 'Lobby & Conf Rooms' | 'Engineering Floor 3' | 'Executive Suite' | 'Data Center Escorted';
  idType: 'Driver License' | 'Passport' | 'Government ID' | 'Corporate Badge';
  idNumber: string;
  vehiclePlate?: string;
  ndaSigned: boolean;
  escortRequired: boolean;
}

export interface CCTVFeed {
  id: string;
  name: string;
  zone: string;
  resolution: string;
  fps: number;
  status: 'Online' | 'Motion Detected' | 'Restricted Zone Incursion';
  aiOverlay: string;
  ptzSupport: boolean;
  preset: string;
}

export interface DispatchTicket {
  id: string;
  title: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  location: string;
  assignedOfficer: string;
  status: 'Dispatched' | 'On Scene' | 'Investigating' | 'Resolved';
  timestamp: string;
  description: string;
}

export interface KeyLockerItem {
  id: string;
  slot: number;
  keyName: string;
  facilityArea: string;
  status: 'In Locker' | 'Checked Out';
  holder: string | null;
  checkoutTime: string | null;
}

// ================= INITIAL MOCK DATA =================
const INITIAL_SWIPES: TurnstileSwipe[] = [
  { id: 'SW-9401', timestamp: '13:48:12', badgeId: 'BDG-4491', holderName: 'Elena Rostova', department: 'Compliance & Audit', role: 'Compliance Officer', door: 'Turnstile 02 (North Lobby)', zone: 'North Lobby', status: 'Granted', biometricScore: 98 },
  { id: 'SW-9400', timestamp: '13:47:50', badgeId: 'BDG-1082', holderName: 'Marcus Kane', department: 'Physical Security', role: 'SecOps Lead', door: 'Vault Mantrap Gate 01', zone: 'Server Vault', status: 'Granted', biometricScore: 99 },
  { id: 'SW-9399', timestamp: '13:46:15', badgeId: 'BDG-8821', holderName: 'Unregistered NFC Tag', department: 'Unknown Vendor', role: 'Visitor', door: 'Turnstile 04 (North Lobby)', zone: 'North Lobby', status: 'Tailgating Detected', biometricScore: 42 },
  { id: 'SW-9398', timestamp: '13:45:02', badgeId: 'BDG-3391', holderName: 'Michael Chen', department: 'Cloud Infrastructure', role: 'DevOps Lead', door: 'East Gate Turnstile 01', zone: 'East Perimeter', status: 'Granted', biometricScore: 96 },
  { id: 'SW-9397', timestamp: '13:43:29', badgeId: 'BDG-7104', holderName: 'Stefan Meyer', department: 'Facilities & BMS', role: 'HVAC Specialist', door: 'Loading Dock Barrier', zone: 'Loading Dock', status: 'Granted', biometricScore: 94 },
  { id: 'SW-9396', timestamp: '13:41:10', badgeId: 'BDG-0912', holderName: 'Ex-Contractor Card', department: 'External Vendor', role: 'HVAC Tech', door: 'Turnstile 01 (North Lobby)', zone: 'North Lobby', status: 'Denied - Expired', biometricScore: 12 },
  { id: 'SW-9395', timestamp: '13:38:44', badgeId: 'BDG-4481', holderName: 'Robert Davis', department: 'Data Science', role: 'Senior Analyst', door: 'Turnstile 03 (North Lobby)', zone: 'North Lobby', status: 'Denied - Anti-Passback', biometricScore: 88 },
  { id: 'SW-9394', timestamp: '13:35:19', badgeId: 'BDG-2004', holderName: 'Dr. Sarah Lin', department: 'Threat Research', role: 'Senior Researcher', door: 'East Gate Turnstile 02', zone: 'East Perimeter', status: 'Granted', biometricScore: 97 }
];

const INITIAL_VISITORS: Visitor[] = [
  { id: 'VIS-301', name: 'Jonathan Vance', company: 'Paladin Audit Corp', hostEmployee: 'Elena Rostova', hostEmail: 'elena@redfort.enterprise', checkInTime: '09:30 AM', expectedCheckout: '05:00 PM', badgeNumber: 'VIS-901', status: 'Checked-In', accessZone: 'Lobby & Conf Rooms', idType: 'Driver License', idNumber: 'DL-TX-8839210', vehiclePlate: 'TX-448-ZPA', ndaSigned: true, escortRequired: false },
  { id: 'VIS-302', name: 'Sophia Miller', company: 'Quantum Fiber Optics', hostEmployee: 'Michael Chen', hostEmail: 'mchen@redfort.enterprise', checkInTime: '11:15 AM', expectedCheckout: '03:30 PM', badgeNumber: 'VIS-902', status: 'Checked-In', accessZone: 'Engineering Floor 3', idType: 'Passport', idNumber: 'P-99238120', vehiclePlate: 'TX-912-KLM', ndaSigned: true, escortRequired: true },
  { id: 'VIS-303', name: 'David K. Reynolds', company: 'Cisco OT Hardware', hostEmployee: 'Stefan Meyer', hostEmail: 'stefan@redfort.enterprise', checkInTime: '01:00 PM', expectedCheckout: '06:00 PM', badgeNumber: 'VIS-903', status: 'Checked-In', accessZone: 'Data Center Escorted', idType: 'Government ID', idNumber: 'GOV-44109', vehiclePlate: 'CA-332-OPQ', ndaSigned: true, escortRequired: true },
  { id: 'VIS-304', name: 'Aaliyah Khan', company: 'Ernst & Young SOC2 Team', hostEmployee: 'Helena Vance', hostEmail: 'cso@redfort.enterprise', checkInTime: '02:00 PM', expectedCheckout: '04:30 PM', badgeNumber: 'VIS-904', status: 'Expected', accessZone: 'Executive Suite', idType: 'Passport', idNumber: 'P-88129301', vehiclePlate: 'TX-104-YTR', ndaSigned: true, escortRequired: false }
];

const INITIAL_CCTV: CCTVFeed[] = [
  { id: 'CAM-01', name: 'Main Lobby & Speedlanes', zone: 'North Entrance', resolution: '4K (3840x2160)', fps: 30, status: 'Online', aiOverlay: 'AI Face & Anti-Tailgating: Active', ptzSupport: true, preset: 'North Lobby Overview' },
  { id: 'CAM-02', name: 'Turnstiles 01-04 Optical Array', zone: 'North Lobby', resolution: '1440p (2560x1440)', fps: 60, status: 'Motion Detected', aiOverlay: 'LiDAR Height Profiler: Nominal', ptzSupport: true, preset: 'Turnstile Overhead' },
  { id: 'CAM-03', name: 'Loading Dock & Bay Barrier', zone: 'West Logistics', resolution: '4K Thermal / Optical', fps: 30, status: 'Online', aiOverlay: 'License Plate OCR: TX-448-ZPA', ptzSupport: true, preset: 'Dock Gate Ramp' },
  { id: 'CAM-04', name: 'Server Vault Mantrap Corridor', zone: 'Secure Core B', resolution: '4K Biometric Scanner', fps: 30, status: 'Online', aiOverlay: 'Two-Person Rule Verification: OK', ptzSupport: false, preset: 'Fixed Corridor' },
  { id: 'CAM-05', name: 'East Perimeter Fence & LiDAR Line', zone: 'East Outer Sector', resolution: '1080p Thermal Night Vision', fps: 30, status: 'Restricted Zone Incursion', aiOverlay: 'Thermal Tripwire Trigger: Sector 4', ptzSupport: true, preset: 'Perimeter Sweep' },
  { id: 'CAM-06', name: 'Executive Garage Barrier Gate', zone: 'South Garage', resolution: '4K Ultra-Low Light', fps: 30, status: 'Online', aiOverlay: 'RFID Tag Reader: Synchronized', ptzSupport: true, preset: 'Garage Boom Barrier' }
];

const INITIAL_DISPATCH: DispatchTicket[] = [
  { id: 'DSP-701', title: 'Investigate Tailgating Alert at Turnstile #4', priority: 'High', location: 'North Lobby Entrance', assignedOfficer: 'Officer Marcus Sterling', status: 'Investigating', timestamp: '13:46 UTC', description: 'Unregistered individual stepped through turnstile immediately behind badge swipe.' },
  { id: 'DSP-702', title: 'Perimeter Laser Tripwire Anomaly', priority: 'Critical', location: 'East Perimeter Fence Sector 4', assignedOfficer: 'Officer Jamal Wright', status: 'On Scene', timestamp: '13:40 UTC', description: 'LiDAR barrier flagged vegetation contact. Visual inspection underway.' },
  { id: 'DSP-703', title: 'VIP Vendor Escort to Substation 2', priority: 'Medium', location: 'Loading Dock Gate', assignedOfficer: 'Officer Sarah Chen', status: 'Dispatched', timestamp: '13:30 UTC', description: 'Escort Cisco hardware engineer David Reynolds for scheduled SCADA maintenance.' }
];

const INITIAL_KEYS: KeyLockerItem[] = [
  { id: 'KEY-01', slot: 1, keyName: 'Master Server Vault A/B Ring', facilityArea: 'Data Center Core', status: 'In Locker', holder: null, checkoutTime: null },
  { id: 'KEY-02', slot: 2, keyName: 'Roof Access & HVAC Chillers', facilityArea: 'Facilities Roof', status: 'Checked Out', holder: 'Stefan Meyer', checkoutTime: '08:45 AM' },
  { id: 'KEY-03', slot: 3, keyName: 'Emergency Elevator Manual Override', facilityArea: 'All Elevator Shafts', status: 'In Locker', holder: null, checkoutTime: null },
  { id: 'KEY-04', slot: 4, keyName: 'OT Substation Generator Core', facilityArea: 'Power Yard', status: 'Checked Out', holder: 'Officer Jamal Wright', checkoutTime: '11:20 AM' },
  { id: 'KEY-05', slot: 5, keyName: 'Executive Suite 801-810 Vault', facilityArea: 'Floor 8 Executive', status: 'In Locker', holder: null, checkoutTime: null },
  { id: 'KEY-06', slot: 6, keyName: 'Fire Hose & Emergency Valve Locker', facilityArea: 'All Zones', status: 'In Locker', holder: null, checkoutTime: null }
];

export type GuardNavTab = 'turnstiles' | 'cctv' | 'visitors' | 'dispatch' | 'handover';

interface GuardDashboardViewProps {
  initialNav?: GuardNavTab;
}

export default function GuardDashboardView({ initialNav = 'turnstiles' }: GuardDashboardViewProps) {
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState<GuardNavTab>(() => {
    if (pathname.includes('/cctv')) return 'cctv';
    if (pathname.includes('/visitors')) return 'visitors';
    if (pathname.includes('/dispatch')) return 'dispatch';
    if (pathname.includes('/handover')) return 'handover';
    return initialNav;
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [swipes, setSwipes] = useState<TurnstileSwipe[]>(INITIAL_SWIPES);
  const [visitors, setVisitors] = useState<Visitor[]>(INITIAL_VISITORS);
  const [cctvList, setCctvList] = useState<CCTVFeed[]>(INITIAL_CCTV);
  const [dispatchTickets, setDispatchTickets] = useState<DispatchTicket[]>(INITIAL_DISPATCH);
  const [keysList, setKeysList] = useState<KeyLockerItem[]>(INITIAL_KEYS);

  // Status & Control States
  const [feedPaused, setFeedPaused] = useState(false);
  const [musterActive, setMusterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [utcTime, setUtcTime] = useState('');

  // Modals
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const [selectedVisitorForBadge, setSelectedVisitorForBadge] = useState<Visitor | null>(null);
  const [selectedCameraForPTZ, setSelectedCameraForPTZ] = useState<CCTVFeed | null>(null);
  const [newDispatchModalOpen, setNewDispatchModalOpen] = useState(false);

  // New Visitor Form
  const [newVisitorForm, setNewVisitorForm] = useState({
    name: '',
    company: '',
    hostEmployee: '',
    hostEmail: '',
    accessZone: 'Lobby & Conf Rooms' as Visitor['accessZone'],
    idType: 'Driver License' as Visitor['idType'],
    idNumber: '',
    vehiclePlate: '',
    escortRequired: false
  });

  // New Dispatch Form
  const [newDispatchForm, setNewDispatchForm] = useState({
    title: '',
    priority: 'High' as DispatchTicket['priority'],
    location: '',
    assignedOfficer: 'Officer Marcus Sterling',
    description: ''
  });

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
    if (pathname.includes('/cctv')) setActiveNav('cctv');
    else if (pathname.includes('/visitors')) setActiveNav('visitors');
    else if (pathname.includes('/dispatch')) setActiveNav('dispatch');
    else if (pathname.includes('/handover')) setActiveNav('handover');
    else if (pathname === '/dashboard/guard' || pathname === '/dashboard/guard/turnstiles') setActiveNav('turnstiles');
    setMobileSidebarOpen(false);
  }, [pathname]);

  // Set Guard User Session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem('redfort_user');
      if (!existing || (!existing.includes('Guard') && !existing.includes('Field'))) {
        localStorage.setItem('redfort_user', JSON.stringify({
          name: 'Marcus Sterling',
          email: 'guard@redfort.enterprise',
          role: 'Security Guard / Field Officer'
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

  // Momentary Turnstile Release Action (5 seconds)
  const [unlockingDoor, setUnlockingDoor] = useState<string | null>(null);
  const handleMomentaryUnlock = (doorName: string) => {
    setUnlockingDoor(doorName);
    setActionNotice(`Momentary 5-Second Override Release granted for ${doorName}.`);
    setTimeout(() => {
      setUnlockingDoor(null);
    }, 5000);
  };

  // Handle New Visitor Check-In Submit
  const handleCreateVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisitorForm.name.trim() || !newVisitorForm.company.trim()) {
      alert('Please fill in visitor full name and company name.');
      return;
    }

    const newId = `VIS-${Math.floor(400 + Math.random() * 500)}`;
    const newBadge = `VIS-${Math.floor(910 + Math.random() * 90)}`;
    const now = new Date();
    const checkInTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newVisitor: Visitor = {
      id: newId,
      name: newVisitorForm.name,
      company: newVisitorForm.company,
      hostEmployee: newVisitorForm.hostEmployee || 'Reception Escort',
      hostEmail: newVisitorForm.hostEmail || 'reception@redfort.enterprise',
      checkInTime: checkInTime,
      expectedCheckout: '05:00 PM',
      badgeNumber: newBadge,
      status: 'Checked-In',
      accessZone: newVisitorForm.accessZone,
      idType: newVisitorForm.idType,
      idNumber: newVisitorForm.idNumber || 'VERIFIED-ID',
      vehiclePlate: newVisitorForm.vehiclePlate || 'N/A',
      ndaSigned: true,
      escortRequired: newVisitorForm.escortRequired
    };

    setVisitors([newVisitor, ...visitors]);
    setCheckInModalOpen(false);
    setSelectedVisitorForBadge(newVisitor);
    setNewVisitorForm({
      name: '',
      company: '',
      hostEmployee: '',
      hostEmail: '',
      accessZone: 'Lobby & Conf Rooms',
      idType: 'Driver License',
      idNumber: '',
      vehiclePlate: '',
      escortRequired: false
    });
    setActionNotice(`Visitor ${newVisitor.name} checked in. Badge ${newBadge} generated.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Handle Visitor Checkout
  const handleCheckoutVisitor = (id: string) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, status: 'Checked-Out' } : v));
    const visitorObj = visitors.find(v => v.id === id);
    setActionNotice(`Visitor ${visitorObj ? visitorObj.name : id} checked out. Badge revoked.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Handle New Dispatch Ticket
  const handleCreateDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `DSP-${Math.floor(710 + Math.random() * 90)}`;
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5) + ' UTC';

    const newTicket: DispatchTicket = {
      id: newId,
      title: newDispatchForm.title || 'Security Zone Check',
      priority: newDispatchForm.priority,
      location: newDispatchForm.location || 'North Perimeter',
      assignedOfficer: newDispatchForm.assignedOfficer,
      status: 'Dispatched',
      timestamp: timeStr,
      description: newDispatchForm.description || 'Routine field verification dispatch.'
    };

    setDispatchTickets([newTicket, ...dispatchTickets]);
    setNewDispatchModalOpen(false);
    setNewDispatchForm({
      title: '',
      priority: 'High',
      location: '',
      assignedOfficer: 'Officer Marcus Sterling',
      description: ''
    });
    setActionNotice(`Dispatch ticket ${newId} assigned to ${newTicket.assignedOfficer}.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Handle Key Check In / Out
  const handleToggleKeyCheckout = (keyId: string) => {
    setKeysList(prev => prev.map(k => {
      if (k.id === keyId) {
        if (k.status === 'In Locker') {
          return { ...k, status: 'Checked Out', holder: 'Officer Marcus Sterling', checkoutTime: 'Just Now' };
        } else {
          return { ...k, status: 'In Locker', holder: null, checkoutTime: null };
        }
      }
      return k;
    }));
  };

  // Navigation Items
  const NAV_ITEMS = [
    { id: 'turnstiles', label: 'Turnstiles & Gates', href: '/dashboard/guard/turnstiles', icon: Radio, badge: `${swipes.filter(s => s.status.includes('Denied') || s.status.includes('Tailgating')).length} Alert`, badgeColor: 'bg-[#EF4444] text-white' },
    { id: 'cctv', label: 'CCTV Surveillance', href: '/dashboard/guard/cctv', icon: Camera, badge: '6 Cams' },
    { id: 'visitors', label: 'Visitor Check-In', href: '/dashboard/guard/visitors', icon: UserCheck, badge: `${visitors.filter(v => v.status === 'Checked-In').length} Active` },
    { id: 'dispatch', label: 'Patrol & Dispatch', href: '/dashboard/guard/dispatch', icon: ShieldAlert, badge: `${dispatchTickets.filter(d => d.status !== 'Resolved').length} Open` },
    { id: 'handover', label: 'Shift & Key Locker', href: '/dashboard/guard/handover', icon: Key, badge: 'Shift 1' }
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

      {/* 1. Fixed Steady / Mobile Drawer Left Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 h-screen bg-[#0E1526] border-r border-[#1E293B] p-4 flex flex-col justify-between shrink-0 select-none transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        mobileSidebarOpen ? 'translate-x-0 shadow-2xl shadow-black/90' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        <div className="space-y-6">
          
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
            <Link 
              href="/" 
              onClick={() => setMobileSidebarOpen(false)}
              className="flex items-center space-x-2 px-1 hover:opacity-90 transition-opacity cursor-pointer group"
              title="Return to RedFort Home Page"
            >
              <Logo variant="full" theme="dark" size="sm" showSubtitle={false} />
              <span className="text-[10px] font-mono font-bold text-[#F5762E] bg-[#F5762E]/10 px-1.5 py-0.5 rounded border border-[#F5762E]/30">
                GUARD
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

          {/* Field Operations Menu */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
              Physical Operations
            </div>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = activeNav === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveNav(item.id as GuardNavTab);
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

          {/* Quick Gate Emergency Action */}
          <div className="space-y-2 pt-2 border-t border-[#1E293B]">
            <div className="px-2 text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
              Emergency Override
            </div>

            <button
              type="button"
              onClick={() => {
                setMusterActive(!musterActive);
                setActionNotice(musterActive ? 'Evacuation mode deactivated. Access gates returning to secure state.' : 'EMERGENCY MUSTER ACTIVATED: All turnstiles unlocked for evacuation.');
              }}
              className={`w-full px-3 py-2 rounded-lg border text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer whitespace-nowrap ${
                musterActive
                  ? 'bg-red-500/20 border-red-500 text-red-400'
                  : 'bg-[#151E33] border-[#1E293B] text-slate-200 hover:text-white hover:border-slate-700'
              }`}
            >
              <div className="flex items-center space-x-2 min-w-0 pr-2">
                <AlertTriangle className={`w-3.5 h-3.5 shrink-0 ${musterActive ? 'text-red-400 animate-pulse' : 'text-[#F5762E]'}`} />
                <span className="truncate">{musterActive ? 'MUSTER ACTIVE' : 'Evac Muster Mode'}</span>
              </div>
              <span className={`w-2 h-2 rounded-full shrink-0 ${musterActive ? 'bg-red-500 animate-ping' : 'bg-slate-600'}`}></span>
            </button>
          </div>

        </div>

        {/* Sidebar Footer: Guard Officer Profile & Logout */}
        <div className="pt-4 border-t border-[#1E293B] space-y-3">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#22C55E] to-[#4ADE80] text-slate-950 font-bold text-xs flex items-center justify-center font-mono ring-2 ring-[#22C55E]/30 shrink-0">
              MS
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-white truncate">Officer Marcus Sterling</div>
              <div className="text-[10px] text-[#22C55E] truncate font-medium">Lead Field Officer · Post 1</div>
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

      {/* 2. Main Field Operations Viewport */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 border-b border-[#1E293B] bg-[#0E1526]/95 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between shrink-0 z-20 gap-2 sm:gap-3 overflow-x-auto select-none">
          
          {/* Left: Mobile Toggle & Status */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-200 hover:text-white border border-[#1E293B] transition-colors shrink-0 cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            <h1 className="text-xs sm:text-sm font-bold text-white tracking-wide whitespace-nowrap shrink-0 flex items-center space-x-2">
              <Shield className="w-4 h-4 text-[#F5762E]" />
              <span className="hidden sm:inline">Field Operations & Access Control</span>
              <span className="sm:hidden">Guard Console</span>
            </h1>

            <span className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[11px] text-[#22C55E] font-medium whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span>Turnstiles Online (8/8)</span>
            </span>
          </div>

          {/* Center: Shift Schedule & UTC Clock */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            <div className="flex items-center space-x-2 bg-[#0B0F19] border border-[#1E293B] rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono">
              <Clock className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Shift 1 (06:00 - 18:00 UTC)</span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* New Visitor Check-In Button */}
            <button
              type="button"
              onClick={() => setCheckInModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Check-In Visitor</span>
              <span className="sm:hidden">Check-In</span>
            </button>

            {/* Quick Dispatch Action Button */}
            <button
              type="button"
              onClick={() => setNewDispatchModalOpen(true)}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] text-slate-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Dispatch Guard</span>
            </button>

            {/* Officer Avatar Badge */}
            <div 
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#22C55E] to-[#4ADE80] text-slate-950 font-bold text-xs flex items-center justify-center font-mono ring-2 ring-[#22C55E]/30 shrink-0 cursor-pointer"
              title="Officer Marcus Sterling (Lead Field Officer)"
            >
              MS
            </div>

          </div>

        </header>

        {/* Action Alert Banner */}
        {actionNotice && (
          <div className="bg-[#22C55E]/15 border-b border-[#22C55E]/30 px-4 sm:px-6 py-2 text-xs text-[#22C55E] flex items-center justify-between font-mono animate-fade-in">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{actionNotice}</span>
            </div>
            <button onClick={() => setActionNotice(null)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: LIVE TURNSTILES & GATE BADGE FEED */}
          {activeNav === 'turnstiles' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Field Operations KPI Ribbon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Total Swipes Today</span>
                    <Radio className="w-4 h-4 text-[#38BDF8]" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">3,492</div>
                  <div className="text-[11px] text-[#22C55E] font-medium">+142 in last hour · 97.8% Authorized</div>
                </div>

                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Access Denied / Exceptions</span>
                    <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                  </div>
                  <div className="text-2xl font-bold text-[#EF4444] font-mono">14</div>
                  <div className="text-[11px] text-[#EF4444] font-medium">4 Anti-Passback · 2 Expired Badges</div>
                </div>

                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Visitors on Campus</span>
                    <Users className="w-4 h-4 text-[#F5762E]" />
                  </div>
                  <div className="text-2xl font-bold text-[#F5762E] font-mono">{visitors.filter(v => v.status === 'Checked-In').length} Active</div>
                  <div className="text-[11px] text-slate-400 font-medium">1 Escorted in Data Center</div>
                </div>

                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Patrol Units on Duty</span>
                    <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <div className="text-2xl font-bold text-[#22C55E] font-mono">4 Officers</div>
                  <div className="text-[11px] text-[#22C55E] font-medium">GPS Patrol Trackers Online</div>
                </div>

              </div>

              {/* Instant Gate Zone Controls (Momentary 5s Release) */}
              <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-[#F5762E]" />
                      <span>Physical Access Control & Gate Overrides</span>
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      Trigger momentary 5-second optical turnstile release or force zone isolation
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">4 Controlled Access Zones</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                  
                  {[
                    { zone: 'North Lobby Turnstiles 1-4', status: 'Secured', doors: 'Speedlanes 01-04' },
                    { zone: 'Server Vault Mantrap B-12', status: 'Two-Factor Locked', doors: 'Mantrap Ingress 01' },
                    { zone: 'East Perimeter Vehicle Gate', status: 'Boom Arm Down', doors: 'Gate 01 & 02' },
                    { zone: 'West Logistics Loading Dock', status: 'Bay Barrier Closed', doors: 'Dock Door D-1' }
                  ].map((gate, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E293B] space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-white truncate">{gate.zone}</span>
                          <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                        </div>
                        <div className="text-[10px] text-[#64748B] mt-0.5">{gate.doors} &middot; {gate.status}</div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2 border-t border-[#1E293B]">
                        <button
                          type="button"
                          onClick={() => handleMomentaryUnlock(gate.zone)}
                          disabled={unlockingDoor === gate.zone}
                          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                            unlockingDoor === gate.zone
                              ? 'bg-[#22C55E] text-slate-950 animate-pulse'
                              : 'bg-[#151E33] hover:bg-[#1E293B] text-slate-200 hover:text-white border border-[#1E293B]'
                          }`}
                        >
                          {unlockingDoor === gate.zone ? (
                            <>
                              <Unlock className="w-3.5 h-3.5" />
                              <span>RELEASED (5s)</span>
                            </>
                          ) : (
                            <>
                              <Unlock className="w-3.5 h-3.5 text-[#22C55E]" />
                              <span>Momentary Unlock</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}

                </div>
              </div>

              {/* Real-time Badge Swipe Feed Table */}
              <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F2937] pb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <Radio className="w-4 h-4 text-[#22C55E] animate-pulse" />
                      <span>Live Turnstile Swipe Stream</span>
                    </h3>
                    <span className="text-xs font-mono text-slate-400">({swipes.length} Recent Swipes)</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter swipes by name, badge, door..."
                        className="pl-8 pr-3 py-1.5 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#F5762E] transition-colors w-48 sm:w-64"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setFeedPaused(!feedPaused)}
                      className="p-1.5 rounded-lg bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] text-slate-300 hover:text-white text-xs flex items-center space-x-1 cursor-pointer"
                      title={feedPaused ? 'Resume live feed' : 'Pause live feed'}
                    >
                      {feedPaused ? <Play className="w-3.5 h-3.5 text-[#22C55E]" /> : <Pause className="w-3.5 h-3.5 text-[#F5762E]" />}
                    </button>
                  </div>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#0B0F19] text-[#94A3B8] uppercase text-[10px] tracking-wider border-b border-[#1E293B]">
                      <tr>
                        <th className="py-2.5 px-3">Time</th>
                        <th className="py-2.5 px-3">Holder & Role</th>
                        <th className="py-2.5 px-3">Badge ID</th>
                        <th className="py-2.5 px-3">Door / Turnstile</th>
                        <th className="py-2.5 px-3">Biometric Score</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {swipes
                        .filter(s => !searchQuery || s.holderName.toLowerCase().includes(searchQuery.toLowerCase()) || s.badgeId.toLowerCase().includes(searchQuery.toLowerCase()) || s.door.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((swipe) => {
                          const isDenied = swipe.status.includes('Denied') || swipe.status.includes('Tailgating');
                          return (
                            <tr key={swipe.id} className="hover:bg-[#151E33]/60 transition-colors group">
                              <td className="py-3 px-3 font-mono text-slate-400 whitespace-nowrap">
                                {swipe.timestamp}
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                <div className="font-semibold text-white">{swipe.holderName}</div>
                                <div className="text-[10px] text-[#64748B]">{swipe.department} &middot; {swipe.role}</div>
                              </td>
                              <td className="py-3 px-3 font-mono text-xs text-slate-300 whitespace-nowrap">
                                {swipe.badgeId}
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                <div className="text-white">{swipe.door}</div>
                                <div className="text-[10px] text-[#64748B]">{swipe.zone}</div>
                              </td>
                              <td className="py-3 px-3 font-mono whitespace-nowrap">
                                <span className={`font-bold ${swipe.biometricScore >= 85 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                                  {swipe.biometricScore}%
                                </span>
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                <span className={`text-[10px] px-2 py-0.5 rounded font-semibold inline-flex items-center space-x-1 ${
                                  isDenied
                                    ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30'
                                    : 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30'
                                }`}>
                                  <span>{swipe.status}</span>
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: CCTV SURVEILLANCE MATRIX & PTZ CONTROLS */}
          {activeNav === 'cctv' && (
            <div className="space-y-6 animate-fade-in">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F2937] pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Camera className="w-4 h-4 text-[#38BDF8]" />
                    <span>Physical Security Surveillance Matrix (6 Live 4K AI Feeds)</span>
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Overlapping optical, LiDAR, and thermal cameras with automated bounding box telemetry
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] font-mono font-semibold flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                    <span>AI Stream Active</span>
                  </span>
                </div>
              </div>

              {/* 6-Camera Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cctvList.map((cam) => (
                  <div key={cam.id} className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-[#F5762E]/40 transition-colors">
                    
                    {/* Simulated Camera Video HUD */}
                    <div className="relative bg-black h-48 flex items-center justify-center overflow-hidden">
                      
                      {/* Grid overlay lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                      {/* Live HUD Header */}
                      <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-white bg-black/60 backdrop-blur-sm px-2 py-1 rounded border border-white/10 z-10">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                          <span className="font-bold">{cam.id} &middot; REC</span>
                        </div>
                        <span className="text-slate-400">{cam.fps} FPS &middot; {cam.resolution}</span>
                      </div>

                      {/* Simulated Camera Subject & Bounding Box */}
                      <div className="relative border-2 border-[#22C55E] w-36 h-28 rounded flex flex-col justify-between p-1.5 shadow-sm">
                        <span className="text-[9px] font-mono font-bold bg-[#22C55E] text-black px-1 rounded self-start">
                          PERSON: 99.4%
                        </span>
                        <div className="text-center font-mono text-[10px] text-slate-400">
                          {cam.preset}
                        </div>
                        <span className="text-[9px] font-mono text-white/70 self-end">
                          LiDAR Z: 1.84m
                        </span>
                      </div>

                      {/* Live AI Overlay Bottom Bar */}
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] font-mono bg-black/70 px-2 py-0.5 rounded text-[#38BDF8]">
                        <span>{cam.aiOverlay}</span>
                        <span className="text-slate-400">PTZ: {cam.ptzSupport ? 'READY' : 'FIXED'}</span>
                      </div>

                    </div>

                    {/* Camera Control Footer */}
                    <div className="p-3.5 bg-[#0E1526] space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">{cam.name}</div>
                          <div className="text-[10px] text-[#64748B]">{cam.zone}</div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          cam.status === 'Restricted Zone Incursion' ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40 animate-pulse' :
                          cam.status === 'Motion Detected' ? 'bg-[#F5762E]/20 text-[#F5762E]' :
                          'bg-[#22C55E]/15 text-[#22C55E]'
                        }`}>
                          {cam.status}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 pt-2 border-t border-[#1E293B]">
                        {cam.ptzSupport && (
                          <button
                            type="button"
                            onClick={() => setSelectedCameraForPTZ(cam)}
                            className="flex-1 py-1.5 px-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-200 hover:text-white text-xs font-semibold border border-[#1E293B] flex items-center justify-center space-x-1 cursor-pointer"
                          >
                            <SlidersHorizontal className="w-3.5 h-3.5 text-[#38BDF8]" />
                            <span>PTZ Controls</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setActionNotice(`2-Way Audio Intercom initiated for ${cam.name}.`)}
                          className="py-1.5 px-2.5 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-200 hover:text-white text-xs font-semibold border border-[#1E293B] flex items-center space-x-1 cursor-pointer"
                          title="Broadcast Audio Intercom"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-[#22C55E]" />
                          <span className="hidden sm:inline">Intercom</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: VISITOR CHECK-IN & BADGING KIOSK */}
          {activeNav === 'visitors' && (
            <div className="space-y-6 animate-fade-in">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F2937] pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-[#F5762E]" />
                    <span>Visitor Management & Electronic Badging Kiosk</span>
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Real-time guest registration, escort logging, and instant NFC visitor credential issuance
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setCheckInModalOpen(true)}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Check-In New Guest</span>
                  </button>
                </div>
              </div>

              {/* Visitor Table */}
              <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#0B0F19] text-[#94A3B8] uppercase text-[10px] tracking-wider border-b border-[#1E293B]">
                      <tr>
                        <th className="py-2.5 px-3">Badge / Guest Name</th>
                        <th className="py-2.5 px-3">Company</th>
                        <th className="py-2.5 px-3">Host Employee</th>
                        <th className="py-2.5 px-3">Check-In Time</th>
                        <th className="py-2.5 px-3">Access Zone</th>
                        <th className="py-2.5 px-3">ID Verified</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {visitors.map((v) => (
                        <tr key={v.id} className="hover:bg-[#151E33]/60 transition-colors">
                          <td className="py-3 px-3 whitespace-nowrap">
                            <div className="font-semibold text-white flex items-center space-x-2">
                              <span className="font-mono text-xs text-[#F5762E] bg-[#F5762E]/10 px-1.5 py-0.5 rounded border border-[#F5762E]/30">
                                {v.badgeNumber}
                              </span>
                              <span>{v.name}</span>
                            </div>
                            <div className="text-[10px] text-[#64748B] mt-0.5">ID: {v.id} &middot; Plate: {v.vehiclePlate}</div>
                          </td>
                          <td className="py-3 px-3 text-slate-200 whitespace-nowrap">{v.company}</td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <div className="text-white font-medium">{v.hostEmployee}</div>
                            <div className="text-[10px] text-[#64748B]">{v.hostEmail}</div>
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-300 whitespace-nowrap">{v.checkInTime}</td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="text-[10px] font-mono text-slate-300 bg-[#0B0F19] px-2 py-0.5 rounded border border-[#1E293B]">
                              {v.accessZone}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <div className="flex items-center space-x-1 text-[#22C55E] text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{v.idType}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                              v.status === 'Checked-In' ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30' :
                              v.status === 'Expected' ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30' :
                              'bg-slate-800 text-slate-400'
                            }`}>
                              {v.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right whitespace-nowrap space-x-2">
                            <button
                              type="button"
                              onClick={() => setSelectedVisitorForBadge(v)}
                              className="p-1.5 rounded bg-[#151E33] hover:bg-[#1E293B] text-slate-300 hover:text-white border border-[#1E293B] cursor-pointer inline-flex items-center space-x-1"
                              title="Print Visitor Badge Pass"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span className="text-[10px]">Badge</span>
                            </button>

                            {v.status === 'Checked-In' && (
                              <button
                                type="button"
                                onClick={() => handleCheckoutVisitor(v.id)}
                                className="px-2 py-1 rounded bg-[#EF4444]/15 hover:bg-[#EF4444] text-[#EF4444] hover:text-white border border-[#EF4444]/30 text-[10px] font-bold transition-colors cursor-pointer inline-flex items-center space-x-1"
                              >
                                <LogOut className="w-3 h-3" />
                                <span>Check-Out</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: PATROL & FIELD DISPATCH */}
          {activeNav === 'dispatch' && (
            <div className="space-y-6 animate-fade-in">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F2937] pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-[#EF4444]" />
                    <span>Field Patrol Task Queue & Incident Dispatch</span>
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Deploy physical officers to perimeter incursions, door alarms, and VIP escorts
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setNewDispatchModalOpen(true)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>New Dispatch Ticket</span>
                </button>
              </div>

              {/* Dispatch Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dispatchTickets.map((ticket) => (
                  <div key={ticket.id} className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 space-y-3 flex flex-col justify-between shadow-sm">
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#64748B]">{ticket.id} &middot; {ticket.timestamp}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          ticket.priority === 'Critical' ? 'bg-[#EF4444] text-white' :
                          ticket.priority === 'High' ? 'bg-[#F5762E] text-white' :
                          'bg-[#38BDF8]/20 text-[#38BDF8]'
                        }`}>
                          {ticket.priority} Priority
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white leading-snug">{ticket.title}</h4>
                      <p className="text-[11px] text-[#94A3B8] leading-relaxed">{ticket.description}</p>
                    </div>

                    <div className="pt-3 border-t border-[#1E293B] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#64748B]">Assigned:</span>
                        <span className="text-white font-medium">{ticket.assignedOfficer}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#64748B]">Location:</span>
                        <span className="text-slate-300 font-mono text-[11px]">{ticket.location}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 font-medium">
                          {ticket.status}
                        </span>

                        {ticket.status !== 'Resolved' && (
                          <button
                            type="button"
                            onClick={() => {
                              setDispatchTickets(prev => prev.map(t => t.id === ticket.id ? { ...t, status: 'Resolved' } : t));
                              setActionNotice(`Dispatch ${ticket.id} marked resolved by ${ticket.assignedOfficer}.`);
                            }}
                            className="px-2 py-1 rounded bg-[#22C55E]/15 hover:bg-[#22C55E] text-[#22C55E] hover:text-white text-[10px] font-bold transition-colors cursor-pointer"
                          >
                            Mark Resolved
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 5: SHIFT LOGBOOK & KEY LOCKER */}
          {activeNav === 'handover' && (
            <div className="space-y-6 animate-fade-in">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F2937] pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Key className="w-4 h-4 text-[#F5762E]" />
                    <span>Physical Key Locker & Shift Handover Console</span>
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Electronic master key cabinet tracking and guard post logbook entries
                  </p>
                </div>
              </div>

              {/* Key Locker Grid */}
              <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#1F2937] pb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Electronic Key Cabinet (Slot 01 - 06)</span>
                  <span className="text-xs text-[#22C55E] font-mono">All RFID Tags Monitored</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                  {keysList.map((k) => (
                    <div key={k.id} className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E293B] space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">Slot #{k.slot}: {k.keyName}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                            k.status === 'In Locker' ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-[#F5762E]/20 text-[#F5762E]'
                          }`}>
                            {k.status}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#64748B] mt-1">Area: {k.facilityArea}</div>
                        {k.holder && (
                          <div className="text-[10px] text-slate-300 font-mono mt-0.5">
                            Holder: {k.holder} ({k.checkoutTime})
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleKeyCheckout(k.id)}
                        className={`w-full py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                          k.status === 'In Locker'
                            ? 'bg-[#151E33] hover:bg-[#1E293B] border-[#1E293B] text-slate-200 hover:text-white'
                            : 'bg-[#22C55E]/20 border-[#22C55E]/40 text-[#22C55E]'
                        }`}
                      >
                        {k.status === 'In Locker' ? 'Check Out Keyring' : 'Return to Locker'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </main>

      </div>

      {/* MODAL 1: CHECK-IN NEW VISITOR */}
      {checkInModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-5 animate-fade-in">
            
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-[#F5762E]" />
                <h3 className="text-sm font-bold text-white">Check-In New Visitor & Issue Badge</h3>
              </div>
              <button onClick={() => setCheckInModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateVisitor} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#94A3B8] font-medium">Guest Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newVisitorForm.name}
                    onChange={(e) => setNewVisitorForm({ ...newVisitorForm, name: e.target.value })}
                    placeholder="e.g. Jonathan Vance"
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#94A3B8] font-medium">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={newVisitorForm.company}
                    onChange={(e) => setNewVisitorForm({ ...newVisitorForm, company: e.target.value })}
                    placeholder="e.g. Paladin Audit Corp"
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#94A3B8] font-medium">Host Employee Name</label>
                  <input
                    type="text"
                    value={newVisitorForm.hostEmployee}
                    onChange={(e) => setNewVisitorForm({ ...newVisitorForm, hostEmployee: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#94A3B8] font-medium">Host Email</label>
                  <input
                    type="email"
                    value={newVisitorForm.hostEmail}
                    onChange={(e) => setNewVisitorForm({ ...newVisitorForm, hostEmail: e.target.value })}
                    placeholder="host@redfort.enterprise"
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#94A3B8] font-medium">Access Zone</label>
                  <select
                    value={newVisitorForm.accessZone}
                    onChange={(e) => setNewVisitorForm({ ...newVisitorForm, accessZone: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                  >
                    <option value="Lobby & Conf Rooms">Lobby & Conf Rooms</option>
                    <option value="Engineering Floor 3">Engineering Floor 3</option>
                    <option value="Executive Suite">Executive Suite</option>
                    <option value="Data Center Escorted">Data Center Escorted</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#94A3B8] font-medium">ID Verification Type</label>
                  <select
                    value={newVisitorForm.idType}
                    onChange={(e) => setNewVisitorForm({ ...newVisitorForm, idType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                  >
                    <option value="Driver License">Driver License</option>
                    <option value="Passport">Passport</option>
                    <option value="Government ID">Government ID</option>
                    <option value="Corporate Badge">Corporate Badge</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#1E293B]">
                <button
                  type="button"
                  onClick={() => setCheckInModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-bold shadow-md cursor-pointer flex items-center space-x-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Issue NFC Visitor Badge</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: PRINT VISITOR BADGE PASS */}
      {selectedVisitorForBadge && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-4 animate-fade-in text-center">
            
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <span className="text-xs font-bold text-white">Visitor Badge Preview</span>
              <button onClick={() => setSelectedVisitorForBadge(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Badge Card Representation */}
            <div className="p-5 rounded-xl bg-white text-slate-950 border-4 border-[#F5762E] space-y-3 shadow-lg">
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2">
                <span className="font-bold text-xs tracking-wider text-[#F5762E] uppercase">REDFORT VISITOR</span>
                <span className="font-mono text-xs font-bold bg-slate-100 px-1.5 py-0.5 rounded">{selectedVisitorForBadge.badgeNumber}</span>
              </div>

              <div className="w-16 h-16 rounded-full bg-slate-900 text-white font-bold text-lg mx-auto flex items-center justify-center font-mono ring-4 ring-[#F5762E]/20">
                {selectedVisitorForBadge.name.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <h4 className="font-bold text-base text-slate-900">{selectedVisitorForBadge.name}</h4>
                <p className="text-xs text-slate-600 font-semibold">{selectedVisitorForBadge.company}</p>
              </div>

              <div className="bg-slate-50 p-2 rounded text-[10px] text-slate-700 space-y-1 text-left font-mono">
                <div>HOST: {selectedVisitorForBadge.hostEmployee}</div>
                <div>ZONE: {selectedVisitorForBadge.accessZone}</div>
                <div>VALID UNTIL: {selectedVisitorForBadge.expectedCheckout}</div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-center space-x-2 text-slate-500 text-[9px] font-mono">
                <QrCode className="w-6 h-6 text-slate-900" />
                <span>NFC-ENABLED &middot; SCAN AT TURNSTILE</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setActionNotice(`Visitor Badge ${selectedVisitorForBadge.badgeNumber} sent to thermal badge printer.`);
                  setSelectedVisitorForBadge(null);
                }}
                className="w-full py-2 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Physical Badge</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: PTZ CAMERA CONTROLLER */}
      {selectedCameraForPTZ && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 animate-fade-in">
            
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#38BDF8]" />
                <h3 className="text-sm font-bold text-white">PTZ Controls: {selectedCameraForPTZ.name}</h3>
              </div>
              <button onClick={() => setSelectedCameraForPTZ(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated PTZ Direction Pad */}
            <div className="p-6 bg-[#0B0F19] border border-[#1E293B] rounded-xl flex flex-col items-center justify-center space-y-3">
              
              <button
                type="button"
                onClick={() => setActionNotice(`PTZ Tilt UP: ${selectedCameraForPTZ.name}`)}
                className="w-12 h-10 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-200 font-bold text-xs flex items-center justify-center border border-[#1E293B] cursor-pointer"
              >
                &uarr;
              </button>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setActionNotice(`PTZ Pan LEFT: ${selectedCameraForPTZ.name}`)}
                  className="w-12 h-10 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-200 font-bold text-xs flex items-center justify-center border border-[#1E293B] cursor-pointer"
                >
                  &larr;
                </button>
                <div className="w-12 h-10 rounded-lg bg-[#F5762E]/20 text-[#F5762E] font-mono text-[10px] font-bold flex items-center justify-center border border-[#F5762E]/30">
                  PTZ
                </div>
                <button
                  type="button"
                  onClick={() => setActionNotice(`PTZ Pan RIGHT: ${selectedCameraForPTZ.name}`)}
                  className="w-12 h-10 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-200 font-bold text-xs flex items-center justify-center border border-[#1E293B] cursor-pointer"
                >
                  &rarr;
                </button>
              </div>

              <button
                type="button"
                onClick={() => setActionNotice(`PTZ Tilt DOWN: ${selectedCameraForPTZ.name}`)}
                className="w-12 h-10 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-200 font-bold text-xs flex items-center justify-center border border-[#1E293B] cursor-pointer"
              >
                &darr;
              </button>

            </div>

            {/* Presets */}
            <div className="space-y-2">
              <div className="text-xs text-[#94A3B8] font-medium">Jump to PTZ Preset:</div>
              <div className="grid grid-cols-2 gap-2">
                {['North Gate Overview', 'Turnstile Overhead', 'Perimeter Fence 4', 'Desk Reception'].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActionNotice(`Camera moved to Preset: ${preset}`)}
                    className="p-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-200 text-xs font-medium border border-[#1E293B] text-left truncate cursor-pointer"
                  >
                    Preset #{idx+1}: {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCameraForPTZ(null)}
                className="px-4 py-2 rounded-lg bg-[#F5762E] text-white text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 4: NEW DISPATCH TICKET */}
      {newDispatchModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 animate-fade-in">
            
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center space-x-2">
                <Send className="w-4 h-4 text-[#38BDF8]" />
                <h3 className="text-sm font-bold text-white">Dispatch Field Security Officer</h3>
              </div>
              <button onClick={() => setNewDispatchModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDispatch} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[#94A3B8] font-medium">Incident / Task Title *</label>
                <input
                  type="text"
                  required
                  value={newDispatchForm.title}
                  onChange={(e) => setNewDispatchForm({ ...newDispatchForm, title: e.target.value })}
                  placeholder="e.g. Investigate Tailgate Incursion"
                  className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#94A3B8] font-medium">Priority</label>
                  <select
                    value={newDispatchForm.priority}
                    onChange={(e) => setNewDispatchForm({ ...newDispatchForm, priority: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#94A3B8] font-medium">Location / Sector</label>
                  <input
                    type="text"
                    value={newDispatchForm.location}
                    onChange={(e) => setNewDispatchForm({ ...newDispatchForm, location: e.target.value })}
                    placeholder="e.g. Turnstile 04"
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#94A3B8] font-medium">Assign Officer</label>
                <select
                  value={newDispatchForm.assignedOfficer}
                  onChange={(e) => setNewDispatchForm({ ...newDispatchForm, assignedOfficer: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                >
                  <option value="Officer Marcus Sterling">Officer Marcus Sterling (Main Lobby)</option>
                  <option value="Officer Sarah Chen">Officer Sarah Chen (Roving Patrol)</option>
                  <option value="Officer Jamal Wright">Officer Jamal Wright (Perimeter Fence)</option>
                  <option value="Officer David Miller">Officer David Miller (Loading Dock)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#94A3B8] font-medium">Instructions / Description</label>
                <textarea
                  rows={3}
                  value={newDispatchForm.description}
                  onChange={(e) => setNewDispatchForm({ ...newDispatchForm, description: e.target.value })}
                  placeholder="Provide incident instructions for the assigned guard..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#1E293B]">
                <button
                  type="button"
                  onClick={() => setNewDispatchModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#38BDF8] hover:bg-[#7DD3FC] text-slate-950 text-xs font-bold shadow-md cursor-pointer"
                >
                  Dispatch Officer
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
