'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  Cpu, 
  Building2, 
  KeyRound, 
  Radio, 
  Search, 
  Bell, 
  ChevronDown, 
  Play, 
  Pause, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Unlock, 
  Camera, 
  Layers, 
  Server, 
  Zap, 
  ArrowRight, 
  Clock, 
  UserCheck, 
  ShieldCheck, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Check, 
  Filter,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  Menu,
  Scale,
  ShieldAlert,
  Smartphone
} from 'lucide-react';
import Logo from '@/components/Logo';

export interface Incident {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Investigating' | 'Resolved';
  time: string;
  door: string;
  user: string;
  host: string;
  ip: string;
  technique: string;
  description: string;
  timeline: { time: string; text: string; type: 'physical' | 'cyber' | 'system' }[];
  hostQuarantined: boolean;
  badgeRevoked: boolean;
  guardDispatched: boolean;
}

const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-8492',
    title: 'Data Center Door Forced + Simultaneous SSH Brute-Force',
    severity: 'Critical',
    status: 'Active',
    time: '2 mins ago',
    door: 'DC3-Vault-North',
    user: 'J. Vance (Badge #9102)',
    host: 'srv-db-core-01.corp',
    ip: '198.51.100.44',
    technique: 'Credential Brute-Force & DFO',
    description: 'A physical door-forced-open alarm coincided with a spike of 340 failed SSH root logins within 60 seconds.',
    timeline: [
      { time: '02:14:10 UTC', text: 'Badge swipe rejected at DC3-Vault-North (Unauthorized entry attempt)', type: 'physical' },
      { time: '02:14:18 UTC', text: 'Door Forced Open (DFO) sensor alarm triggered on Door #404', type: 'physical' },
      { time: '02:14:22 UTC', text: '340 failed root SSH logins detected on srv-db-core-01', type: 'cyber' },
      { time: '02:14:35 UTC', text: 'Cross-vector correlation engine linked physical breach with digital attack', type: 'system' }
    ],
    hostQuarantined: false,
    badgeRevoked: false,
    guardDispatched: false
  },
  {
    id: 'INC-8491',
    title: 'Unauthorized Modbus Sweep on SCADA Substation',
    severity: 'High',
    status: 'Investigating',
    time: '15 mins ago',
    door: 'Substation-West-Gate',
    user: 'Unregistered NFC Tag',
    host: 'plc-modbus-core.ot',
    ip: '10.240.12.8',
    technique: 'ICS Protocol Manipulation',
    description: 'Laser perimeter sensor tripwire triggered followed by unusual Port 502 Modbus queries.',
    timeline: [
      { time: '01:58:04 UTC', text: 'Perimeter laser tripwire broken at Substation Zone 4', type: 'physical' },
      { time: '02:00:12 UTC', text: 'Abnormal Modbus PLC payload detected on OT Switch 2', type: 'cyber' }
    ],
    hostQuarantined: false,
    badgeRevoked: false,
    guardDispatched: false
  },
  {
    id: 'INC-8490',
    title: 'Anti-Passback Violation + Cloud API Key Exfiltration',
    severity: 'High',
    status: 'Investigating',
    time: '35 mins ago',
    door: 'Turnstile-Main-Lobby',
    user: 'R. Davis (Badge #4481)',
    host: 'ws-rdavis-laptop',
    ip: '10.0.4.112',
    technique: 'Exfiltration Over Web Service',
    description: 'Badge swipe detected while user was already logged inside, followed by AWS IAM secret key exfiltration.',
    timeline: [
      { time: '01:42:15 UTC', text: 'Turnstile badge swipe failed anti-passback rule', type: 'physical' },
      { time: '01:44:00 UTC', text: 'High-volume egress traffic to external IP 203.0.113.88', type: 'cyber' }
    ],
    hostQuarantined: false,
    badgeRevoked: false,
    guardDispatched: false
  },
  {
    id: 'INC-8489',
    title: 'Off-Hours Executive Suite Access with Low Biometric Score',
    severity: 'Medium',
    status: 'Resolved',
    time: '1 hour ago',
    door: 'Exec-Suite-801',
    user: 'E. Sterling (Badge #1004)',
    host: 'exec-tablet-p04',
    ip: '10.0.8.4',
    technique: 'Off-Hours Access',
    description: 'Facial recognition match score (68%) below security threshold of 85%.',
    timeline: [
      { time: '01:10:20 UTC', text: 'Biometric confidence below baseline (68%)', type: 'physical' },
      { time: '01:12:00 UTC', text: 'Confidential repository folder accessed', type: 'cyber' }
    ],
    hostQuarantined: true,
    badgeRevoked: false,
    guardDispatched: false
  }
];

const LIVE_EVENTS = [
  { id: '1', time: '12:45:18', type: 'Cyber', source: 'srv-db-core-01', text: 'Failed SSH root login attempt (340 req/min)', status: 'Critical' },
  { id: '2', time: '12:45:10', type: 'Physical', source: 'Door-404', text: 'Door Forced Open (DFO) alert at DC3 Vault', status: 'Critical' },
  { id: '3', time: '12:44:55', type: 'Identity', source: 'Okta IDP', text: 'Privilege escalation requested for DBA account', status: 'High' },
  { id: '4', time: '12:44:40', type: 'Cyber', source: 'EDR-Agent', text: 'Encoded PowerShell command execution detected', status: 'High' },
  { id: '5', time: '12:44:12', type: 'Physical', source: 'CAM-02', text: 'Unidentified individual lingering at perimeter', status: 'Medium' },
  { id: '6', time: '12:43:50', type: 'System', source: 'Kafka Queue', text: 'Telemetry throughput steady at 14,850 EPS', status: 'Info' },
  { id: '7', time: '12:43:20', type: 'Physical', source: 'Gate-01', text: 'Badge swipe approved for M. Chen (#3391)', status: 'Info' }
];

export default function SteadyDashboard() {
  const [activeNav, setActiveNav] = useState<'incidents' | 'stream' | 'cctv' | 'soar' | 'mitre'>('incidents');
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [selectedId, setSelectedId] = useState<string>('INC-8492');
  const [streamFilter, setStreamFilter] = useState<'All' | 'Cyber' | 'Physical' | 'Critical'>('All');
  const [streamPaused, setStreamPaused] = useState(false);
  const [lockdownActive, setLockdownActive] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem('redfort_user');
      if (!existing) {
        localStorage.setItem('redfort_user', JSON.stringify({
          name: 'Alex Mercer',
          email: 'analyst@redfort.enterprise',
          role: 'Security Analyst (GSOC)'
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

  // CRUD Modal States
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  
  // Create / Edit Form Fields
  const [formData, setFormData] = useState({
    title: '',
    severity: 'High' as 'Critical' | 'High' | 'Medium' | 'Low',
    door: '',
    user: '',
    host: '',
    ip: '',
    description: '',
    technique: ''
  });

  const selectedIncident = incidents.find(i => i.id === selectedId) || incidents[0] || null;

  // [C] Create New Incident Handler
  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `INC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newIncident: Incident = {
      id: newId,
      title: formData.title,
      severity: formData.severity,
      status: 'Active',
      time: 'Just now',
      door: formData.door || 'Zone-A-Entry',
      user: formData.user || 'Unknown Subject',
      host: formData.host || 'srv-edge-node-01',
      ip: formData.ip || '192.168.1.100',
      technique: formData.technique || 'Anomalous Activity',
      description: formData.description,
      timeline: [
        { time: 'Just now', text: `Incident ${newId} logged into GSOC Queue`, type: 'system' }
      ],
      hostQuarantined: false,
      badgeRevoked: false,
      guardDispatched: false
    };

    setIncidents([newIncident, ...incidents]);
    setSelectedId(newId);
    setCreateModalOpen(false);
    setFormData({ title: '', severity: 'High', door: '', user: '', host: '', ip: '', description: '', technique: '' });
    setActionNotice(`Incident ${newId} created successfully.`);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // [U] Update Incident Details
  const handleUpdateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIncident) return;

    setIncidents(prev => prev.map(inc => {
      if (inc.id === selectedIncident.id) {
        return {
          ...inc,
          title: formData.title || inc.title,
          severity: formData.severity,
          door: formData.door || inc.door,
          user: formData.user || inc.user,
          host: formData.host || inc.host,
          ip: formData.ip || inc.ip,
          description: formData.description || inc.description,
          technique: formData.technique || inc.technique
        };
      }
      return inc;
    }));

    setEditModalOpen(false);
    setActionNotice(`Incident ${selectedIncident.id} updated.`);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // [D] Delete Incident
  const handleDeleteIncident = (id: string) => {
    if (confirm(`Are you sure you want to dismiss and delete incident ${id}?`)) {
      const remaining = incidents.filter(i => i.id !== id);
      setIncidents(remaining);
      if (remaining.length > 0) {
        setSelectedId(remaining[0].id);
      }
      setActionNotice(`Incident ${id} deleted.`);
      setTimeout(() => setActionNotice(null), 3500);
    }
  };

  // Open Edit Modal with Pre-populated data
  const openEditModal = () => {
    if (!selectedIncident) return;
    setFormData({
      title: selectedIncident.title,
      severity: selectedIncident.severity,
      door: selectedIncident.door,
      user: selectedIncident.user,
      host: selectedIncident.host,
      ip: selectedIncident.ip,
      description: selectedIncident.description,
      technique: selectedIncident.technique
    });
    setEditModalOpen(true);
  };

  // SOAR Actions
  const handleSoarAction = (action: 'quarantine' | 'revoke' | 'dispatch' | 'resolve') => {
    if (!selectedIncident) return;
    setIncidents(prev => prev.map(inc => {
      if (inc.id === selectedIncident.id) {
        if (action === 'quarantine') return { ...inc, hostQuarantined: true };
        if (action === 'revoke') return { ...inc, badgeRevoked: true };
        if (action === 'dispatch') return { ...inc, guardDispatched: true };
        if (action === 'resolve') return { ...inc, status: 'Resolved' };
      }
      return inc;
    }));

    if (action === 'quarantine') setActionNotice(`Host ${selectedIncident.host} isolated from network.`);
    if (action === 'revoke') setActionNotice(`Access Badge for ${selectedIncident.user} revoked.`);
    if (action === 'dispatch') setActionNotice(`Field Security Guard dispatched to ${selectedIncident.door}.`);
    if (action === 'resolve') setActionNotice(`Incident ${selectedIncident.id} resolved.`);

    setTimeout(() => setActionNotice(null), 3500);
  };

  const filteredIncidents = incidents.filter(i => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return i.title.toLowerCase().includes(q) || i.id.toLowerCase().includes(q) || i.door.toLowerCase().includes(q) || i.host.toLowerCase().includes(q);
  });

  const filteredEvents = LIVE_EVENTS.filter(e => {
    if (streamFilter === 'All') return true;
    if (streamFilter === 'Cyber') return e.type === 'Cyber';
    if (streamFilter === 'Physical') return e.type === 'Physical';
    if (streamFilter === 'Critical') return e.status === 'Critical';
    return true;
  });

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
                GSOC
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

          {/* Operations Menu */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
              Operations Menu
            </div>

            {[
              { id: 'incidents', label: 'Incident Triage', icon: Shield, badge: incidents.filter(i => i.status !== 'Resolved').length },
              { id: 'stream', label: 'Live Telemetry', icon: Radio },
              { id: 'cctv', label: 'Perimeter & CCTV', icon: Camera },
              { id: 'soar', label: 'SOAR Runbooks', icon: Zap },
              { id: 'mitre', label: 'MITRE Matrix', icon: Layers }
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id as any);
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
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap ${
                      isSelected ? 'bg-black/20 text-white font-bold' : 'bg-[#EF4444] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Security Control */}
          <div className="space-y-2 pt-3 border-t border-[#1E293B]">
            <div className="px-2 text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
              Perimeter Security
            </div>

            <button
              onClick={() => {
                setLockdownActive(!lockdownActive);
                setActionNotice(lockdownActive ? 'Facility lockdown cleared. Normal badge access restored.' : 'Emergency lockdown initiated across all doors.');
              }}
              className={`w-full px-3 py-2 rounded-lg border text-xs font-medium flex items-center justify-between transition-colors cursor-pointer whitespace-nowrap ${
                lockdownActive 
                  ? 'bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444]' 
                  : 'bg-[#0B0F19] border-[#1E293B] text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2 min-w-0 pr-2">
                {lockdownActive ? <Lock className="w-3.5 h-3.5 text-[#EF4444] shrink-0" /> : <Unlock className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />}
                <span className="truncate">{lockdownActive ? 'Lockdown Active' : 'Facility Nominal'}</span>
              </div>
              <span className={`w-2 h-2 rounded-full shrink-0 ${lockdownActive ? 'bg-[#EF4444] animate-ping' : 'bg-[#22C55E]'}`}></span>
            </button>
          </div>

        </div>

        {/* Sidebar Bottom: Cluster Info + Logout Button */}
        <div className="pt-4 border-t border-[#1E293B] text-xs space-y-3">
          <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
            <span>Cluster: <strong className="text-white font-mono">US-EAST-1</strong></span>
            <span className="text-[#22C55E]">FIPS 140-3</span>
          </div>

          {/* Dedicated Logout Button */}
          <Link 
            href="/login"
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/30 text-[#EF4444] text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </Link>
        </div>

      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 h-screen flex flex-col overflow-hidden min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 border-b border-[#1E293B] bg-[#0E1526] px-3 sm:px-6 flex items-center justify-between shrink-0 z-20 gap-2">
          
          {/* Left: Mobile Toggle & Breadcrumb Status */}
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

            <span className="text-xs text-slate-300 font-medium whitespace-nowrap">
              <span className="hidden sm:inline">GSOC Operations Console</span>
              <span className="sm:hidden">GSOC Console</span>
            </span>
            <span className="text-[#334155] hidden sm:inline">/</span>
            <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[10px] sm:text-[11px] text-[#22C55E] font-medium whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span>Telemetry Active</span>
            </span>
          </div>

          {/* Center Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-4 lg:mx-6">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search incidents, hosts, IPs, doors..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#F5762E] transition-colors"
              />
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* [C] Create Incident Action Button */}
            <button
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Create Incident</span>
              <span className="sm:hidden">Create</span>
            </button>

            {/* User Avatar */}
            <div className="w-7 h-7 rounded-full bg-[#F5762E] text-white font-semibold text-xs flex items-center justify-center font-mono shrink-0">
              AM
            </div>

          </div>

        </header>

        {/* Scrollable Main Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Action Success Alert Notification */}
          {actionNotice && (
            <div className="p-3.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-xs text-[#22C55E] flex items-center justify-between shadow-sm animate-fade-in">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="font-medium">{actionNotice}</span>
              </div>
              <button onClick={() => setActionNotice(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Metric Cards Top Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Active Threats</span>
                <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
              </div>
              <div className="text-2xl font-bold text-white">{incidents.filter(i => i.status !== 'Resolved').length}</div>
              <div className="text-[11px] text-[#EF4444] font-medium">
                {incidents.filter(i => i.severity === 'Critical').length} Critical · {incidents.filter(i => i.severity === 'High').length} High
              </div>
            </div>

            <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Ingest Pipeline</span>
                <Cpu className="w-4 h-4 text-[#38BDF8]" />
              </div>
              <div className="text-2xl font-bold text-white">14.8k <span className="text-xs text-slate-400 font-normal">EPS</span></div>
              <div className="text-[11px] text-[#22C55E] font-medium">42ms Ingestion Latency</div>
            </div>

            <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Mean Time Detect</span>
                <Clock className="w-4 h-4 text-[#F5762E]" />
              </div>
              <div className="text-2xl font-bold text-white">3.8 <span className="text-xs text-slate-400 font-normal">min</span></div>
              <div className="text-[11px] text-[#22C55E] font-medium">-18% vs baseline</div>
            </div>

            <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Physical Sensors</span>
                <Camera className="w-4 h-4 text-[#22C55E]" />
              </div>
              <div className="text-2xl font-bold text-[#22C55E]">99.8%</div>
              <div className="text-[11px] text-slate-400 font-medium">142 Cam / 88 Doors Online</div>
            </div>

          </div>

          {/* Tab 1: Incident Triage & Investigation (Full Working CRUD) */}
          {activeNav === 'incidents' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Incidents List */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold text-white">
                    Incident Queue ({filteredIncidents.length})
                  </span>
                  <button
                    onClick={() => setCreateModalOpen(true)}
                    className="text-xs text-[#F5762E] hover:underline flex items-center space-x-1 font-medium cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Incident</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {filteredIncidents.map(inc => {
                    const isSelected = inc.id === selectedId;
                    return (
                      <div
                        key={inc.id}
                        onClick={() => setSelectedId(inc.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-[#151E33] border-[#F5762E] shadow-sm' 
                            : 'bg-[#0E1526] border-[#1E293B] hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-xs text-white">{inc.id}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              inc.severity === 'Critical' ? 'bg-[#EF4444]/15 text-[#EF4444]' :
                              inc.severity === 'High' ? 'bg-[#F59E0B]/15 text-[#F59E0B]' :
                              'bg-[#3B82F6]/15 text-[#3B82F6]'
                            }`}>
                              {inc.severity}
                            </span>
                            <span className={`text-[10px] ${inc.status === 'Resolved' ? 'text-[#22C55E]' : 'text-slate-400'}`}>
                              · {inc.status}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">{inc.time}</span>
                        </div>

                        <h4 className="text-xs font-medium text-slate-200 line-clamp-1 leading-snug mb-1">
                          {inc.title}
                        </h4>

                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-[#1E293B]/60">
                          <span className="truncate max-w-[150px]">{inc.door}</span>
                          <span className="text-[#38BDF8] truncate max-w-[140px]">{inc.host}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Selected Incident Deep Dive */}
              {selectedIncident ? (
                <div className="lg:col-span-7 bg-[#0E1526] border border-[#1E293B] rounded-xl p-5 space-y-5">
                  
                  {/* Header with Edit and Delete Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-[#1E293B]">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-[#F5762E]">{selectedIncident.id}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-xs text-[#22C55E] font-medium">{selectedIncident.status}</span>
                      </div>
                      <h3 className="text-base font-bold text-white">
                        {selectedIncident.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {selectedIncident.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      {/* [U] Edit Button */}
                      <button
                        onClick={openEditModal}
                        className="p-1.5 rounded-lg bg-[#0B0F19] hover:bg-[#151E33] border border-[#1E293B] text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit Incident"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* [D] Delete Button */}
                      <button
                        onClick={() => handleDeleteIncident(selectedIncident.id)}
                        className="p-1.5 rounded-lg bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/30 text-[#EF4444] transition-colors cursor-pointer"
                        title="Delete Incident"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Vectors Comparison Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-lg bg-[#0B0F19] border border-[#1E293B] space-y-2">
                      <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#F5762E]">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Physical Security Vector</span>
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div className="flex justify-between">
                          <span>Access Point:</span>
                          <span className="text-white font-medium">{selectedIncident.door}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cardholder:</span>
                          <span className="text-white font-medium">{selectedIncident.user}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#0B0F19] border border-[#1E293B] space-y-2">
                      <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#38BDF8]">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Cyber Telemetry Vector</span>
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div className="flex justify-between">
                          <span>Target Host:</span>
                          <span className="text-white font-medium">{selectedIncident.host}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Source IP:</span>
                          <span className="text-white font-medium">{selectedIncident.ip}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chronological Sequence */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-slate-300">Incident Sequence</div>
                    <div className="p-3 rounded-lg bg-[#0B0F19] border border-[#1E293B] space-y-2 text-xs">
                      {selectedIncident.timeline.map((step, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5">
                          <span className="text-slate-500 font-mono text-[11px] shrink-0 mt-0.5">{step.time}</span>
                          <span className="text-slate-300 leading-relaxed">{step.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive SOAR Actions */}
                  <div className="space-y-2 pt-3 border-t border-[#1E293B]">
                    <div className="text-xs font-semibold text-slate-300">Automated SOAR Actions</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      
                      <button
                        onClick={() => handleSoarAction('quarantine')}
                        disabled={selectedIncident.hostQuarantined}
                        className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors cursor-pointer ${
                          selectedIncident.hostQuarantined
                            ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]'
                            : 'bg-[#0B0F19] border-[#1E293B] hover:border-[#EF4444] text-slate-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Server className="w-3.5 h-3.5 text-[#EF4444]" />
                          <span>Quarantine Host</span>
                        </div>
                        {selectedIncident.hostQuarantined ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <span className="text-[11px] text-[#EF4444] font-semibold">Execute</span>}
                      </button>

                      <button
                        onClick={() => handleSoarAction('revoke')}
                        disabled={selectedIncident.badgeRevoked}
                        className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors cursor-pointer ${
                          selectedIncident.badgeRevoked
                            ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]'
                            : 'bg-[#0B0F19] border-[#1E293B] hover:border-[#F5762E] text-slate-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <KeyRound className="w-3.5 h-3.5 text-[#F5762E]" />
                          <span>Revoke Badge</span>
                        </div>
                        {selectedIncident.badgeRevoked ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <span className="text-[11px] text-[#F5762E] font-semibold">Execute</span>}
                      </button>

                      <button
                        onClick={() => handleSoarAction('dispatch')}
                        disabled={selectedIncident.guardDispatched}
                        className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors cursor-pointer ${
                          selectedIncident.guardDispatched
                            ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]'
                            : 'bg-[#0B0F19] border-[#1E293B] hover:border-[#38BDF8] text-slate-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <UserCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                          <span>Dispatch Guard</span>
                        </div>
                        {selectedIncident.guardDispatched ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <span className="text-[11px] text-[#38BDF8] font-semibold">Dispatch</span>}
                      </button>

                      <button
                        onClick={() => handleSoarAction('resolve')}
                        className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors cursor-pointer ${
                          selectedIncident.status === 'Resolved'
                            ? 'bg-[#22C55E]/15 border-[#22C55E] text-[#22C55E]'
                            : 'bg-[#0B0F19] border-[#1E293B] hover:border-[#22C55E] text-slate-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                          <span>Resolve & Close</span>
                        </div>
                        <span className="text-[11px] text-[#22C55E] font-semibold">
                          {selectedIncident.status === 'Resolved' ? 'Closed' : 'Sign Off'}
                        </span>
                      </button>

                    </div>
                  </div>

                </div>
              ) : (
                <div className="lg:col-span-7 bg-[#0E1526] border border-[#1E293B] rounded-xl p-12 text-center text-slate-400 text-xs">
                  No active incidents selected.
                </div>
              )}

            </div>
          )}

          {/* Tab 2: Live Stream */}
          {activeNav === 'stream' && (
            <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E293B] pb-3">
                <div>
                  <h3 className="text-sm font-semibold text-white">Live Event Stream</h3>
                  <p className="text-xs text-slate-400">Real-time telemetry from enterprise firewalls, sensors, and PACS</p>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex bg-[#0B0F19] p-1 rounded-lg border border-[#1E293B] text-xs">
                    {(['All', 'Cyber', 'Physical', 'Critical'] as const).map(opt => (
                      <button
                        key={opt}
                        onClick={() => setStreamFilter(opt)}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                          streamFilter === opt ? 'bg-[#F5762E] text-white font-medium' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStreamPaused(!streamPaused)}
                    className="p-1.5 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-slate-400 hover:text-white cursor-pointer"
                  >
                    {streamPaused ? <Play className="w-4 h-4 text-[#22C55E]" /> : <Pause className="w-4 h-4 text-[#F5762E]" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {filteredEvents.map(ev => (
                  <div key={ev.id} className="p-3 rounded-lg bg-[#0B0F19] border border-[#1E293B] flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <span className="text-slate-500 font-mono text-[11px]">{ev.time}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        ev.type === 'Cyber' ? 'bg-[#38BDF8]/10 text-[#38BDF8]' :
                        ev.type === 'Physical' ? 'bg-[#F5762E]/10 text-[#F5762E]' : 'bg-[#A855F7]/10 text-[#A855F7]'
                      }`}>{ev.type}</span>
                      <span className="text-slate-200">{ev.text}</span>
                    </div>
                    <span className="text-slate-400 text-[11px] font-mono">{ev.source}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: CCTV Matrix */}
          {activeNav === 'cctv' && (
            <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-5 space-y-4">
              <div className="border-b border-[#1E293B] pb-3">
                <h3 className="text-sm font-semibold text-white">Perimeter CCTV Matrix</h3>
                <p className="text-xs text-slate-400">Live surveillance video streams and access checkpoint status</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'DC3 Server Vault North', status: 'Motion Detected', alert: true },
                  { name: 'Main Lobby Turnstiles 1-4', status: 'Live Feed · 30 FPS', alert: false },
                  { name: 'Substation 7B Perimeter', status: 'Thermal Sensor OK', alert: false },
                  { name: 'Loading Dock Barrier Gate', status: 'Secure & Nominal', alert: false }
                ].map((c, i) => (
                  <div key={i} className="rounded-xl border border-[#1E293B] bg-[#0B0F19] p-3 aspect-video flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-white truncate">{c.name}</span>
                      <span className={`w-2 h-2 rounded-full ${c.alert ? 'bg-[#EF4444] animate-pulse' : 'bg-[#22C55E]'}`}></span>
                    </div>
                    <div className="text-center text-slate-500 text-xs font-mono">
                      [CAM-0{i+1} Stream]
                    </div>
                    <div className="text-[11px] text-slate-400 flex justify-between">
                      <span className={c.alert ? 'text-[#EF4444] font-medium' : 'text-slate-400'}>{c.status}</span>
                      <span className="text-slate-500">1080p</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: SOAR Runbooks */}
          {activeNav === 'soar' && (
            <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-5 space-y-4">
              <div className="border-b border-[#1E293B] pb-3">
                <h3 className="text-sm font-semibold text-white">SOAR Automated Playbooks</h3>
                <p className="text-xs text-slate-400">Pre-configured automated containment and isolation workflows</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {[
                  { title: 'Playbook #101: Credential Brute-Force & VLAN Isolation', trigger: 'SSH/RDP Spikes > 200 req/min', status: 'Active & Enforcing', runs: '142 runs today' },
                  { title: 'Playbook #102: Physical Door Forced Open Lockdown', trigger: 'DFO Sensor Tripwire Active', status: 'Active & Enforcing', runs: '3 runs today' },
                  { title: 'Playbook #103: Anti-Passback IAM Revocation', trigger: 'Simultaneous Multi-Door Swipes', status: 'Active & Enforcing', runs: '12 runs today' },
                  { title: 'Playbook #104: Ransomware Lateral Movement Halt', trigger: 'High-Velocity File Encryption Pattern', status: 'Armed (Standby)', runs: '0 runs today' }
                ].map((p, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0B0F19] border border-[#1E293B] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-[#F5762E]" />
                        <span className="font-semibold text-white">{p.title}</span>
                      </div>
                      <span className="text-[10px] text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full font-medium">
                        {p.status}
                      </span>
                    </div>
                    <div className="text-slate-400 text-xs">Trigger: {p.trigger}</div>
                    <div className="text-[11px] text-slate-500 pt-1 border-t border-[#1E293B] flex justify-between">
                      <span>Execution: Autonomous</span>
                      <span>{p.runs}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: MITRE Matrix */}
          {activeNav === 'mitre' && (
            <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-5 space-y-4">
              <div className="border-b border-[#1E293B] pb-3">
                <h3 className="text-sm font-semibold text-white">MITRE ATT&CK Threat Mapping</h3>
                <p className="text-xs text-slate-400">Enterprise adversary tactics and current detection posture</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {[
                  { tactic: 'Initial Access', tech: 'T1078 Valid Accounts', active: true },
                  { tactic: 'Execution', tech: 'T1059 Command Script', active: false },
                  { tactic: 'Persistence', tech: 'T1136 Create Account', active: false },
                  { tactic: 'Privilege Escalation', tech: 'T1068 Exploitation', active: true },
                  { tactic: 'Defense Evasion', tech: 'T1562 Impair Defenses', active: true },
                  { tactic: 'Credential Access', tech: 'T1110 Brute Force', active: true },
                  { tactic: 'Discovery', tech: 'T1046 Network Scan', active: true },
                  { tactic: 'Exfiltration', tech: 'T1567 Web Service Exfil', active: true }
                ].map((m, idx) => (
                  <div key={idx} className={`p-3.5 rounded-lg border ${m.active ? 'bg-[#F5762E]/10 border-[#F5762E]/30' : 'bg-[#0B0F19] border-[#1E293B]'}`}>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">{m.tactic}</div>
                    <div className="text-white font-medium mt-1">{m.tech}</div>
                    <div className={`text-[10px] font-medium mt-2 ${m.active ? 'text-[#F5762E]' : 'text-slate-500'}`}>
                      {m.active ? '● Active Detection' : '○ No Threats'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

      </div>

      {/* 3. [C] Create Incident Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Plus className="w-4 h-4 text-[#F5762E]" />
                <span>Log New Correlated Incident</span>
              </h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateIncident} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Incident Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Unauthorized Server Room Badge Swipe + Port Scan"
                  className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-300 font-medium">Severity</label>
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-300 font-medium">Access Door ID</label>
                  <input
                    type="text"
                    value={formData.door}
                    onChange={(e) => setFormData({ ...formData, door: e.target.value })}
                    placeholder="e.g. DC3-North-Vault"
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-300 font-medium">Subject / Cardholder</label>
                  <input
                    type="text"
                    value={formData.user}
                    onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                    placeholder="e.g. Unknown NFC / Badge #9102"
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-300 font-medium">Target Host / IP</label>
                  <input
                    type="text"
                    value={formData.host}
                    onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                    placeholder="e.g. srv-db-core-01"
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Incident Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide incident details, telemetry context, and observed anomalies..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#0B0F19] text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-semibold shadow-sm"
                >
                  Create Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. [U] Edit Incident Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Edit3 className="w-4 h-4 text-[#F5762E]" />
                <span>Edit Incident {selectedIncident?.id}</span>
              </h3>
              <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateIncident} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Incident Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-300 font-medium">Severity</label>
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-300 font-medium">Access Door ID</label>
                  <input
                    type="text"
                    value={formData.door}
                    onChange={(e) => setFormData({ ...formData, door: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-medium">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-white focus:outline-none focus:border-[#F5762E]"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#0B0F19] text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-semibold shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
