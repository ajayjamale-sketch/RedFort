'use strict';
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Server, 
  Cpu, 
  Database, 
  Layers, 
  Radio, 
  Shield, 
  Activity, 
  RefreshCw, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  ArrowRight, 
  Download, 
  ExternalLink, 
  Eye, 
  Copy, 
  Check, 
  LogOut, 
  X, 
  Menu, 
  Sparkles, 
  Wifi, 
  WifiOff, 
  Battery, 
  Terminal, 
  KeyRound, 
  UserCheck, 
  Scale, 
  ShieldCheck, 
  Fingerprint, 
  Zap, 
  ArrowUpRight, 
  Power, 
  Globe, 
  HardDrive, 
  BarChart3, 
  TrendingUp, 
  Lock, 
  Key, 
  FolderLock, 
  Settings,
  Flame,
  CheckSquare,
  ShieldAlert,
  Smartphone
} from 'lucide-react';
import Logo from '@/components/Logo';

export type AdminNavTab = 'fleet' | 'iam' | 'nodes' | 'telemetry' | 'edge';

// --- DATA STRUCTURES ---

export interface SensorNode {
  id: string;
  name: string;
  type: 'Turnstile Controller' | 'CCTV AI NVR' | 'LiDAR Perimeter' | 'Smart Lock Hub' | 'BACnet HVAC Gateway';
  campus: string;
  zone: string;
  ipAddress: string;
  macAddress: string;
  firmwareVersion: string;
  status: 'Online' | 'Warning' | 'Offline';
  latencyMs: number;
  batteryLevel: number | null; // null if hardwired PoE
  uptimePercent: number;
  lastHeartbeat: string;
  eventsPerMin: number;
}

export interface DirectoryUserSync {
  id: string;
  name: string;
  email: string;
  provider: 'Okta Universal Directory' | 'Microsoft Entra ID' | 'Google Workspace';
  dept: string;
  rolesAssigned: string[];
  mfaStatus: 'Enforced (FIDO2)' | 'Enforced (Authenticator)' | 'Pending Setup';
  syncStatus: 'Synchronized' | 'Pending Provision' | 'Revoked';
  lastSynced: string;
}

export interface ApiIngestPipeline {
  id: string;
  pipelineName: string;
  topic: string;
  eventsPerSec: number;
  p99LatencyMs: number;
  errorRate: number;
  consumerLag: number;
  status: 'Healthy' | 'Degraded' | 'Critical';
}

export interface EdgeCluster {
  id: string;
  name: string;
  region: string;
  nodesCount: number;
  cpuUtilization: number;
  memUtilization: number;
  hsmModuleStatus: 'FIPS 140-3 Active' | 'Degraded';
  version: string;
  status: 'Nominal' | 'Maintenance';
}

// --- MOCK SENSOR NODES DATA ---
export const INITIAL_SENSOR_NODES: SensorNode[] = [
  {
    id: 'NODE-TX-TRN-01',
    name: 'Turnstile Controller Post-1 (Main Lobby)',
    type: 'Turnstile Controller',
    campus: 'Austin Global HQ',
    zone: 'Zone-A Lobby',
    ipAddress: '10.240.12.101',
    macAddress: '00:1A:2B:3C:4D:5E',
    firmwareVersion: 'v4.8.2-LTS',
    status: 'Online',
    latencyMs: 1.4,
    batteryLevel: null,
    uptimePercent: 99.99,
    lastHeartbeat: '2s ago',
    eventsPerMin: 42
  },
  {
    id: 'NODE-TX-TRN-02',
    name: 'Turnstile Controller Post-2 (Executive Wing)',
    type: 'Turnstile Controller',
    campus: 'Austin Global HQ',
    zone: 'Zone-B Exec',
    ipAddress: '10.240.12.102',
    macAddress: '00:1A:2B:3C:4D:5F',
    firmwareVersion: 'v4.8.2-LTS',
    status: 'Online',
    latencyMs: 1.8,
    batteryLevel: null,
    uptimePercent: 100.0,
    lastHeartbeat: '1s ago',
    eventsPerMin: 18
  },
  {
    id: 'NODE-FRA-NVR-01',
    name: 'AI CCTV NVR Array (48 Streams)',
    type: 'CCTV AI NVR',
    campus: 'Frankfurt Edge Center',
    zone: 'Server Vault Level -2',
    ipAddress: '10.180.4.50',
    macAddress: '00:14:22:98:A1:BC',
    firmwareVersion: 'v5.1.0-AI',
    status: 'Online',
    latencyMs: 3.2,
    batteryLevel: null,
    uptimePercent: 99.98,
    lastHeartbeat: '3s ago',
    eventsPerMin: 240
  },
  {
    id: 'NODE-BLR-LDR-03',
    name: 'Perimeter LiDAR Scanner North Fence',
    type: 'LiDAR Perimeter',
    campus: 'Bengaluru R&D Facility',
    zone: 'Outer Perimeter Sector 4',
    ipAddress: '10.120.8.22',
    macAddress: '00:25:96:11:FE:33',
    firmwareVersion: 'v2.4.1',
    status: 'Warning',
    latencyMs: 18.4,
    batteryLevel: 94,
    uptimePercent: 99.82,
    lastHeartbeat: '8s ago',
    eventsPerMin: 6
  },
  {
    id: 'NODE-TX-SMK-04',
    name: 'SmartKey Master Locker Controller',
    type: 'Smart Lock Hub',
    campus: 'Austin Global HQ',
    zone: 'Security Guard Post 1',
    ipAddress: '10.240.14.88',
    macAddress: '00:30:65:AA:BB:CC',
    firmwareVersion: 'v3.2.0',
    status: 'Online',
    latencyMs: 2.1,
    batteryLevel: 98,
    uptimePercent: 100.0,
    lastHeartbeat: '4s ago',
    eventsPerMin: 3
  },
  {
    id: 'NODE-FRA-BAC-01',
    name: 'BACnet HVAC & Chiller Controller Gateway',
    type: 'BACnet HVAC Gateway',
    campus: 'Frankfurt Edge Center',
    zone: 'Central Mechanical Plant',
    ipAddress: '10.180.20.10',
    macAddress: '00:50:56:C0:00:08',
    firmwareVersion: 'v1.9.4',
    status: 'Online',
    latencyMs: 4.8,
    batteryLevel: null,
    uptimePercent: 99.95,
    lastHeartbeat: '5s ago',
    eventsPerMin: 12
  }
];

// --- MOCK DIRECTORY SYNC DATA ---
export const INITIAL_DIRECTORY_USERS: DirectoryUserSync[] = [
  {
    id: 'USR-OKT-1001',
    name: 'Alex Mercer',
    email: 'analyst@redfort.enterprise',
    provider: 'Okta Universal Directory',
    dept: 'Global Security Operations',
    rolesAssigned: ['GSOC Lead Analyst', 'Incident Responder', 'Turnstile Monitor'],
    mfaStatus: 'Enforced (FIDO2)',
    syncStatus: 'Synchronized',
    lastSynced: '2 mins ago'
  },
  {
    id: 'USR-OKT-1002',
    name: 'Helena Vance',
    email: 'cso@redfort.enterprise',
    provider: 'Okta Universal Directory',
    dept: 'Executive Leadership',
    rolesAssigned: ['Chief Security Officer', 'All-Campus Physical SuperAdmin'],
    mfaStatus: 'Enforced (FIDO2)',
    syncStatus: 'Synchronized',
    lastSynced: '2 mins ago'
  },
  {
    id: 'USR-ENT-2003',
    name: 'Marcus Sterling',
    email: 'guard@redfort.enterprise',
    provider: 'Microsoft Entra ID',
    dept: 'Physical Security & Guard Force',
    rolesAssigned: ['Field Officer', 'Turnstile Gate Override', 'Key Locker Access'],
    mfaStatus: 'Enforced (Authenticator)',
    syncStatus: 'Synchronized',
    lastSynced: '5 mins ago'
  },
  {
    id: 'USR-OKT-3004',
    name: 'Evelyn Archer',
    email: 'auditor@redfort.enterprise',
    provider: 'Okta Universal Directory',
    dept: 'External Assurance (Deloitte)',
    rolesAssigned: ['Compliance Auditor Read-Only', 'Evidence Vault Inspector'],
    mfaStatus: 'Enforced (FIDO2)',
    syncStatus: 'Synchronized',
    lastSynced: '10 mins ago'
  },
  {
    id: 'USR-ENT-4005',
    name: 'Devon Vance',
    email: 'admin@redfort.enterprise',
    provider: 'Microsoft Entra ID',
    dept: 'Infrastructure & IAM DevOps',
    rolesAssigned: ['IT SuperAdmin', 'Kubernetes Cluster Admin', 'SCIM Integrator'],
    mfaStatus: 'Enforced (FIDO2)',
    syncStatus: 'Synchronized',
    lastSynced: 'Just now'
  }
];

// --- MOCK API INGEST PIPELINES ---
export const INITIAL_API_PIPELINES: ApiIngestPipeline[] = [
  {
    id: 'PIPE-KAFKA-01',
    pipelineName: 'IoT Turnstile Telemetry Stream',
    topic: 'redfort.telemetry.turnstiles.v1',
    eventsPerSec: 18450,
    p99LatencyMs: 4.2,
    errorRate: 0.001,
    consumerLag: 12,
    status: 'Healthy'
  },
  {
    id: 'PIPE-KAFKA-02',
    pipelineName: 'AI CCTV Object Detection Stream',
    topic: 'redfort.telemetry.cctv.ai-objects.v2',
    eventsPerSec: 24800,
    p99LatencyMs: 8.6,
    errorRate: 0.003,
    consumerLag: 45,
    status: 'Healthy'
  },
  {
    id: 'PIPE-WEBHOOK-03',
    pipelineName: 'Okta SCIM 2.0 Identity Webhook',
    topic: 'redfort.iam.scim.events.v1',
    eventsPerSec: 120,
    p99LatencyMs: 22.4,
    errorRate: 0.0,
    consumerLag: 0,
    status: 'Healthy'
  },
  {
    id: 'PIPE-KAFKA-04',
    pipelineName: 'LiDAR & Radar Perimeter Telemetry',
    topic: 'redfort.telemetry.perimeter.lidar.v1',
    eventsPerSec: 4600,
    p99LatencyMs: 6.1,
    errorRate: 0.002,
    consumerLag: 8,
    status: 'Healthy'
  }
];

// --- MOCK EDGE CLUSTERS ---
export const INITIAL_EDGE_CLUSTERS: EdgeCluster[] = [
  {
    id: 'CL-US-EAST',
    name: 'Austin Primary Edge Cluster (K8s)',
    region: 'us-east-tx',
    nodesCount: 16,
    cpuUtilization: 38.4,
    memUtilization: 52.1,
    hsmModuleStatus: 'FIPS 140-3 Active',
    version: 'v1.30.2-k8s',
    status: 'Nominal'
  },
  {
    id: 'CL-EU-CENTRAL',
    name: 'Frankfurt Low-Latency Gateway (K8s)',
    region: 'eu-central-de',
    nodesCount: 12,
    cpuUtilization: 44.2,
    memUtilization: 61.8,
    hsmModuleStatus: 'FIPS 140-3 Active',
    version: 'v1.30.2-k8s',
    status: 'Nominal'
  },
  {
    id: 'CL-APAC-SOUTH',
    name: 'Singapore APAC Regional Hub (K8s)',
    region: 'ap-southeast-sg',
    nodesCount: 8,
    cpuUtilization: 31.9,
    memUtilization: 46.5,
    hsmModuleStatus: 'FIPS 140-3 Active',
    version: 'v1.30.2-k8s',
    status: 'Nominal'
  }
];

interface AdminDashboardViewProps {
  initialTab?: AdminNavTab;
}

export default function AdminDashboardView({ initialTab = 'fleet' }: AdminDashboardViewProps) {
  const [activeNav, setActiveNav] = useState<AdminNavTab>(initialTab);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Sensor Nodes States
  const [sensorNodes, setSensorNodes] = useState<SensorNode[]>(INITIAL_SENSOR_NODES);
  const [nodeSearch, setNodeSearch] = useState('');
  const [nodeTypeFilter, setNodeTypeFilter] = useState('All');
  const [selectedNode, setSelectedNode] = useState<SensorNode | null>(null);

  // Directory Sync States
  const [directoryUsers] = useState<DirectoryUserSync[]>(INITIAL_DIRECTORY_USERS);
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Diagnostics Modal State
  const [diagnosticsModalOpen, setDiagnosticsModalOpen] = useState(false);
  const [diagnosticsLog, setDiagnosticsLog] = useState<string[]>([]);
  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false);

  // Filtered Sensor Nodes
  const filteredNodes = useMemo(() => {
    return sensorNodes.filter(node => {
      const matchSearch = 
        node.name.toLowerCase().includes(nodeSearch.toLowerCase()) ||
        node.id.toLowerCase().includes(nodeSearch.toLowerCase()) ||
        node.ipAddress.includes(nodeSearch) ||
        node.campus.toLowerCase().includes(nodeSearch.toLowerCase());
      
      const matchType = nodeTypeFilter === 'All' || node.type === nodeTypeFilter;
      return matchSearch && matchType;
    });
  }, [sensorNodes, nodeSearch, nodeTypeFilter]);

  // Execute SCIM Sync Action
  const handleTriggerScimSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncModalOpen(false);
      setActionNotice('SCIM 2.0 Directory Sync completed. 5 accounts updated with zero drift.');
      setTimeout(() => setActionNotice(null), 4000);
    }, 1800);
  };

  // Run Node Diagnostics Tool
  const handleRunDiagnostics = (node: SensorNode) => {
    setSelectedNode(node);
    setDiagnosticsModalOpen(true);
    setDiagnosticsRunning(true);
    setDiagnosticsLog([
      `[${new Date().toISOString()}] Initiating ICMP echo ping to ${node.ipAddress}...`,
      `[${new Date().toISOString()}] Response from ${node.ipAddress}: bytes=32 time=${node.latencyMs}ms TTL=64`,
      `[${new Date().toISOString()}] TLS 1.3 Handshake verified with Node Certificate SHA-256`,
      `[${new Date().toISOString()}] Firmware ${node.firmwareVersion} integrity check: VALID (Zero CVEs)`,
      `[${new Date().toISOString()}] Telemetry loopback: ${node.eventsPerMin} events/min. Sensor Nominal.`
    ]);
    setTimeout(() => {
      setDiagnosticsRunning(false);
    }, 1200);
  };

  // Reboot Node Remote Handler
  const handleRebootNode = (nodeId: string) => {
    setSensorNodes(prev => prev.map(n => {
      if (n.id === nodeId) {
        return { ...n, status: 'Online', lastHeartbeat: 'Just Now', latencyMs: 1.2 };
      }
      return n;
    }));
    setDiagnosticsModalOpen(false);
    setActionNotice(`Reboot signal sent to node ${nodeId}. Heartbeat re-established.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Logout Handler
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('redfort_user');
      window.dispatchEvent(new Event('redfort_auth_change'));
    }
  };

  // Navigation Items
  const NAV_ITEMS = [
    { id: 'fleet', label: 'Fleet Overview', href: '/dashboard/admin', icon: HardDrive, badge: '99.99%', badgeColor: 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30' },
    { id: 'iam', label: 'Directory Sync', href: '/dashboard/admin/iam', icon: KeyRound, badge: 'Okta/Entra' },
    { id: 'nodes', label: 'Sensor Nodes', href: '/dashboard/admin/nodes', icon: Wifi, badge: `${sensorNodes.length} Online` },
    { id: 'telemetry', label: 'API Ingest', href: '/dashboard/admin/telemetry', icon: Activity, badge: '48K/s' },
    { id: 'edge', label: 'Edge Fleet', href: '/dashboard/admin/edge', icon: Server, badge: '3 Clusters' }
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

      {/* 1. Left Steady Fixed / Mobile Drawer Sidebar */}
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
                ADMIN
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

          {/* Infrastructure Navigation Menu */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
              Infrastructure & IAM
            </div>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = activeNav === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveNav(item.id as AdminNavTab);
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

          {/* Quick Action: Trigger SCIM Delta Sync */}
          <div className="space-y-2 pt-2 border-t border-[#1E293B]">
            <div className="px-2 text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
              Directory Operations
            </div>

            <button
              type="button"
              onClick={() => {
                setSyncModalOpen(true);
                setMobileSidebarOpen(false);
              }}
              className="w-full px-3 py-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] hover:border-[#38BDF8]/50 text-slate-200 hover:text-white text-xs font-medium flex items-center justify-between transition-colors cursor-pointer whitespace-nowrap"
            >
              <div className="flex items-center space-x-2 min-w-0 pr-2">
                <RefreshCw className="w-3.5 h-3.5 shrink-0 text-[#38BDF8]" />
                <span className="truncate">Force Directory Sync</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            </button>
          </div>

        </div>

        {/* Sidebar Footer: IT Administrator Profile & Logout */}
        <div className="pt-4 border-t border-[#1E293B] space-y-3">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#38BDF8] to-[#60A5FA] text-slate-950 font-bold text-xs flex items-center justify-center font-mono ring-2 ring-[#38BDF8]/30 shrink-0">
              DV
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-white truncate">Devon Vance, Lead DevOps</div>
              <div className="text-[10px] text-[#38BDF8] truncate font-medium">Infrastructure & IAM · Cloud</div>
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

      {/* 2. Main Administration Viewport */}
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
              <Server className="w-4 h-4 text-[#F5762E]" />
              <span className="hidden sm:inline">Infrastructure & IAM Operations</span>
              <span className="sm:hidden">IT Admin Console</span>
            </h1>

            <span className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[11px] text-[#22C55E] font-medium whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span>All Gateways Nominal</span>
            </span>
          </div>

          {/* Right: Actions & Live Ingest Metrics */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-lg bg-[#151E33] border border-[#1E293B] text-xs font-mono">
              <span className="text-slate-400">Global Ingest:</span>
              <span className="text-[#38BDF8] font-bold">47,970 evt/s</span>
              <Activity className="w-3.5 h-3.5 text-[#22C55E] animate-pulse" />
            </div>

            <button
              type="button"
              onClick={() => {
                setSyncModalOpen(true);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync Okta/Entra</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveNav('nodes')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] text-slate-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <Wifi className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="hidden sm:inline">Node Health</span>
            </button>
          </div>

        </header>

        {/* Action Notice Banner */}
        {actionNotice && (
          <div className="bg-[#F5762E]/20 border-b border-[#F5762E]/40 px-4 py-2 flex items-center justify-between text-xs text-white shrink-0 animate-in fade-in duration-200">
            <div className="flex items-center space-x-2 font-mono">
              <Sparkles className="w-4 h-4 text-[#F5762E]" />
              <span>{actionNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setActionNotice(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Scrollable Tab Content Container */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 bg-[#0B0F19]">

          {/* ========================================================= */}
          {/* TAB 1: FLEET OVERVIEW & GLOBAL INFRASTRUCTURE HEALTH       */}
          {/* ========================================================= */}
          {activeNav === 'fleet' && (
            <div className="space-y-6">
              
              {/* Top Banner KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-3 sm:p-4 space-y-1">
                  <div className="text-[10px] sm:text-xs font-medium text-slate-400">Fleet Global Uptime (30d)</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white">99.992%</div>
                  <div className="text-[10px] text-[#22C55E] flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>SLA 99.99% Met</span>
                  </div>
                </div>

                <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-3 sm:p-4 space-y-1">
                  <div className="text-[10px] sm:text-xs font-medium text-slate-400">Active Sensor Nodes</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#22C55E]">142 / 142</div>
                  <div className="text-[10px] text-slate-400">Zero offline hardware trips</div>
                </div>

                <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-3 sm:p-4 space-y-1">
                  <div className="text-[10px] sm:text-xs font-medium text-slate-400">Directory Accounts (SCIM)</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#38BDF8]">1,840 Active</div>
                  <div className="text-[10px] text-[#22C55E]">100% MFA Enforced</div>
                </div>

                <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-3 sm:p-4 space-y-1">
                  <div className="text-[10px] sm:text-xs font-medium text-slate-400">Kafka Streaming P99</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#F5762E]">6.4 ms</div>
                  <div className="text-[10px] text-slate-400">Throughput: 48K msgs/sec</div>
                </div>
              </div>

              {/* Quick Infrastructure Health & Active Gateways Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Edge Kubernetes Clusters Panel */}
                <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-4 sm:p-5 space-y-4 shadow-lg">
                  <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                    <div className="flex items-center space-x-2">
                      <Server className="w-4 h-4 text-[#F5762E]" />
                      <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                        Edge Kubernetes Clusters
                      </h2>
                    </div>
                    <span className="text-[11px] font-mono text-[#22C55E]">3 of 3 Nominal</span>
                  </div>

                  <div className="space-y-3">
                    {INITIAL_EDGE_CLUSTERS.map((cluster) => (
                      <div key={cluster.id} className="bg-[#151E33] border border-[#1E293B] rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-white text-xs">{cluster.name}</div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] font-bold">
                            {cluster.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-300">
                          <div>
                            <span className="text-slate-500">Nodes:</span> {cluster.nodesCount}
                          </div>
                          <div>
                            <span className="text-slate-500">CPU:</span> {cluster.cpuUtilization}%
                          </div>
                          <div>
                            <span className="text-slate-500">Memory:</span> {cluster.memUtilization}%
                          </div>
                        </div>

                        <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/50">
                          <span>HSM Module: <strong className="text-[#38BDF8]">{cluster.hsmModuleStatus}</strong></span>
                          <span>{cluster.version}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-Time Directory & SCIM Sync Status */}
                <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-4 sm:p-5 space-y-4 shadow-lg">
                  <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                    <div className="flex items-center space-x-2">
                      <KeyRound className="w-4 h-4 text-[#38BDF8]" />
                      <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                        Directory Providers & Sync Telemetry
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSyncModalOpen(true)}
                      className="text-xs text-[#38BDF8] hover:underline font-semibold flex items-center space-x-1"
                    >
                      <span>Force Sync</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-[#151E33] border border-[#1E293B] rounded-lg p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center font-bold text-xs text-[#38BDF8]">
                          OK
                        </div>
                        <div>
                          <div className="font-semibold text-white">Okta Universal Directory</div>
                          <div className="text-[10px] text-slate-400 font-mono">SCIM 2.0 Webhook Push · Last sync: 2m ago</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#22C55E] font-bold bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/30">
                        Connected
                      </span>
                    </div>

                    <div className="bg-[#151E33] border border-[#1E293B] rounded-lg p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-[#818CF8]/10 border border-[#818CF8]/30 flex items-center justify-center font-bold text-xs text-[#818CF8]">
                          MS
                        </div>
                        <div>
                          <div className="font-semibold text-white">Microsoft Entra ID (Azure AD)</div>
                          <div className="text-[10px] text-slate-400 font-mono">Graph API Continuous Sync · Last sync: 5m ago</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#22C55E] font-bold bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/30">
                        Connected
                      </span>
                    </div>

                    <div className="bg-[#151E33] border border-[#1E293B] rounded-lg p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-[#F5762E]/10 border border-[#F5762E]/30 flex items-center justify-center font-bold text-xs text-[#F5762E]">
                          GW
                        </div>
                        <div>
                          <div className="font-semibold text-white">Google Workspace SSO</div>
                          <div className="text-[10px] text-slate-400 font-mono">SAML 2.0 Identity Provider · Last sync: 12m ago</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#22C55E] font-bold bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/30">
                        Connected
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: OKTA & ENTRA ID DIRECTORY SYNC & IAM               */}
          {/* ========================================================= */}
          {activeNav === 'iam' && (
            <div className="space-y-6">
              
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-4 sm:p-6 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30">
                      <KeyRound className="w-6 h-6 text-[#38BDF8]" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white">
                        Directory Sync & Identity Access Management (SCIM 2.0)
                      </h2>
                      <p className="text-xs text-slate-400">
                        Real-time user provisioning, role-based access control (RBAC), and FIDO2 MFA enforcement.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSyncModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center space-x-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Run Delta Sync</span>
                  </button>
                </div>

                {/* Directory Users Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#151E33]/70 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1E293B]">
                      <tr>
                        <th className="py-2.5 px-4">User & Department</th>
                        <th className="py-2.5 px-3">Identity Provider</th>
                        <th className="py-2.5 px-3">Assigned RBAC Roles</th>
                        <th className="py-2.5 px-3">MFA Posture</th>
                        <th className="py-2.5 px-3">Sync Status</th>
                        <th className="py-2.5 px-4 text-right">Last Synchronized</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {directoryUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-[#151E33]/40 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-semibold text-white">{user.name}</div>
                            <div className="text-[11px] font-mono text-slate-400">{user.email}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{user.dept}</div>
                          </td>

                          <td className="py-3 px-3">
                            <span className="text-[11px] text-slate-200 font-medium">
                              {user.provider}
                            </span>
                          </td>

                          <td className="py-3 px-3">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {user.rolesAssigned.map((role, idx) => (
                                <span key={idx} className="text-[9px] font-mono bg-[#151E33] text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                                  {role}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="py-3 px-3">
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{user.mfaStatus}</span>
                            </span>
                          </td>

                          <td className="py-3 px-3">
                            <span className="text-[10px] font-mono font-bold text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded border border-[#38BDF8]/30">
                              {user.syncStatus}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-400">
                            {user.lastSynced}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: SENSOR NODE HEALTH & IOT FLEET                     */}
          {/* ========================================================= */}
          {activeNav === 'nodes' && (
            <div className="space-y-6">
              
              {/* Filter Toolbar */}
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-lg">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={nodeSearch}
                    onChange={(e) => setNodeSearch(e.target.value)}
                    placeholder="Search by node ID, name, IP address, or campus..."
                    className="w-full bg-[#151E33] border border-[#1E293B] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F5762E]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center space-x-1 bg-[#151E33] border border-[#1E293B] rounded-lg px-2.5 py-1.5 text-xs">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={nodeTypeFilter}
                      onChange={(e) => setNodeTypeFilter(e.target.value)}
                      className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="All" className="bg-[#0E1526]">All Node Types</option>
                      <option value="Turnstile Controller" className="bg-[#0E1526]">Turnstiles</option>
                      <option value="CCTV AI NVR" className="bg-[#0E1526]">CCTV NVRs</option>
                      <option value="LiDAR Perimeter" className="bg-[#0E1526]">LiDAR Scanners</option>
                      <option value="Smart Lock Hub" className="bg-[#0E1526]">Smart Locks</option>
                      <option value="BACnet HVAC Gateway" className="bg-[#0E1526]">BACnet Gateways</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setNodeSearch('');
                      setNodeTypeFilter('All');
                    }}
                    className="p-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-400 hover:text-white border border-[#1E293B] text-xs transition-colors cursor-pointer"
                    title="Reset Filters"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sensor Nodes Table */}
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl overflow-hidden shadow-lg">
                <div className="px-4 py-3 border-b border-[#1E293B] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4 text-[#22C55E]" />
                    <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Physical Sensor Nodes ({filteredNodes.length} Active Devices)
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Continuous Heartbeat Active
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#151E33]/70 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1E293B]">
                      <tr>
                        <th className="py-2.5 px-4">Node ID & Name</th>
                        <th className="py-2.5 px-3">Type & Location</th>
                        <th className="py-2.5 px-3">IP & MAC Address</th>
                        <th className="py-2.5 px-3">Firmware</th>
                        <th className="py-2.5 px-3">Latency & Power</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-4 text-right">Diagnostics</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {filteredNodes.map((node) => (
                        <tr key={node.id} className="hover:bg-[#151E33]/40 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-semibold text-white">{node.name}</div>
                            <div className="text-[10px] font-mono text-[#38BDF8] font-bold mt-0.5">{node.id}</div>
                          </td>

                          <td className="py-3 px-3">
                            <div className="text-slate-200 font-medium">{node.type}</div>
                            <div className="text-[10px] text-slate-400">{node.campus} · {node.zone}</div>
                          </td>

                          <td className="py-3 px-3 font-mono text-[11px]">
                            <div className="text-white">{node.ipAddress}</div>
                            <div className="text-[10px] text-slate-500">{node.macAddress}</div>
                          </td>

                          <td className="py-3 px-3 font-mono text-[11px] text-slate-300">
                            {node.firmwareVersion}
                          </td>

                          <td className="py-3 px-3 font-mono text-[11px]">
                            <div className="text-white">{node.latencyMs} ms</div>
                            <div className="text-[10px] text-slate-400">
                              {node.batteryLevel !== null ? `Battery: ${node.batteryLevel}%` : 'PoE (Hardwired)'}
                            </div>
                          </td>

                          <td className="py-3 px-3">
                            <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                              node.status === 'Online'
                                ? 'bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]'
                                : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${node.status === 'Online' ? 'bg-[#22C55E]' : 'bg-amber-400'}`}></span>
                              <span>{node.status}</span>
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleRunDiagnostics(node)}
                              className="px-2.5 py-1.5 rounded bg-[#151E33] hover:bg-[#F5762E] text-slate-200 hover:text-white text-[11px] font-semibold transition-colors cursor-pointer inline-flex items-center space-x-1"
                            >
                              <Terminal className="w-3.5 h-3.5" />
                              <span>Test Node</span>
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

          {/* ========================================================= */}
          {/* TAB 4: API INGEST & KAFKA STREAMING METRICS               */}
          {/* ========================================================= */}
          {activeNav === 'telemetry' && (
            <div className="space-y-6">
              
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-4 sm:p-6 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-[#F5762E]/10 border border-[#F5762E]/30">
                      <Activity className="w-6 h-6 text-[#F5762E]" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white">
                        API Ingest & Kafka Event Telemetry Pipelines
                      </h2>
                      <p className="text-xs text-slate-400">
                        Real-time message throughput, consumer lag monitoring, and P99 latency SLA analytics.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-1 rounded-lg border border-[#22C55E]/30">
                      47.97K events/sec
                    </span>
                  </div>
                </div>

                {/* Kafka Pipelines Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#151E33]/70 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1E293B]">
                      <tr>
                        <th className="py-2.5 px-4">Pipeline & Topic Name</th>
                        <th className="py-2.5 px-3">Throughput (Evt/s)</th>
                        <th className="py-2.5 px-3">P99 Latency</th>
                        <th className="py-2.5 px-3">Error Rate</th>
                        <th className="py-2.5 px-3">Consumer Lag</th>
                        <th className="py-2.5 px-4 text-right">Pipeline Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {INITIAL_API_PIPELINES.map((pipe) => (
                        <tr key={pipe.id} className="hover:bg-[#151E33]/40 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-semibold text-white">{pipe.pipelineName}</div>
                            <div className="text-[10px] font-mono text-[#38BDF8] mt-0.5">{pipe.topic}</div>
                          </td>

                          <td className="py-3 px-3 font-mono text-[11px] font-bold text-white">
                            {pipe.eventsPerSec.toLocaleString()} /s
                          </td>

                          <td className="py-3 px-3 font-mono text-[11px] text-[#22C55E]">
                            {pipe.p99LatencyMs} ms
                          </td>

                          <td className="py-3 px-3 font-mono text-[11px] text-slate-300">
                            {pipe.errorRate}%
                          </td>

                          <td className="py-3 px-3 font-mono text-[11px] text-slate-300">
                            {pipe.consumerLag} msgs
                          </td>

                          <td className="py-3 px-4 text-right">
                            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{pipe.status}</span>
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

          {/* ========================================================= */}
          {/* TAB 5: EDGE GATEWAYS & KUBERNETES FLEET                   */}
          {/* ========================================================= */}
          {activeNav === 'edge' && (
            <div className="space-y-6">
              
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-4 sm:p-6 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30">
                      <Server className="w-6 h-6 text-[#22C55E]" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white">
                        Multi-Campus Edge Gateways & HSM Cryptographic Modules
                      </h2>
                      <p className="text-xs text-slate-400">
                        Kubernetes edge pods, hardware security module key isolation, and offline failover clustering.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActionNotice('OTA Firmware fleet check initiated across all 3 clusters.');
                      setTimeout(() => setActionNotice(null), 3500);
                    }}
                    className="px-4 py-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] text-slate-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer flex items-center space-x-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Check OTA Updates</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {INITIAL_EDGE_CLUSTERS.map((cl) => (
                    <div key={cl.id} className="bg-[#151E33] border border-[#1E293B] rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-white text-sm">{cl.name}</div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
                          {cl.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs font-mono text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Cluster ID:</span>
                          <span className="text-white">{cl.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Region:</span>
                          <span className="text-[#38BDF8]">{cl.region}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Active Pods:</span>
                          <span>{cl.nodesCount * 8} pods</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">HSM Module:</span>
                          <span className="text-[#22C55E]">{cl.hsmModuleStatus}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>CPU: {cl.cpuUtilization}%</span>
                        <span>Memory: {cl.memUtilization}%</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: SCIM DIRECTORY DELTA SYNC MODAL                  */}
      {/* ========================================================= */}
      {syncModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            
            <div className="px-5 py-4 border-b border-[#1E293B] flex items-center justify-between bg-[#151E33]/60">
              <div className="flex items-center space-x-2">
                <KeyRound className="w-5 h-5 text-[#38BDF8]" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Execute SCIM 2.0 Directory Sync
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSyncModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E293B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <p className="text-slate-300 leading-relaxed">
                This operation will pull all identity deltas from <strong>Okta Universal Directory</strong> and <strong>Microsoft Entra ID</strong>, reconciling access control policies and turnstile badge permissions.
              </p>

              <div className="bg-[#151E33] p-3 rounded-lg border border-[#1E293B] space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pending Delta Events:</span>
                  <span className="text-white">0 changes (In-Sync)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">FIDO2 Posture Audit:</span>
                  <span className="text-[#22C55E]">100% Valid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Endpoints:</span>
                  <span className="text-slate-200">142 Edge Sensor Gateways</span>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-[#1E293B] bg-[#151E33]/40 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setSyncModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleTriggerScimSync}
                disabled={isSyncing}
                className="px-4 py-1.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center space-x-1.5 disabled:opacity-50"
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Synchronizing Providers...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Start Synchronization</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: SENSOR NODE DIAGNOSTICS & TEST MODAL             */}
      {/* ========================================================= */}
      {diagnosticsModalOpen && selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
            
            <div className="px-5 py-4 border-b border-[#1E293B] flex items-center justify-between bg-[#151E33]/60">
              <div className="flex items-center space-x-2.5">
                <Terminal className="w-5 h-5 text-[#22C55E]" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Hardware Node Diagnostics: {selectedNode.id}
                  </h3>
                  <div className="text-[11px] font-mono text-slate-400">
                    {selectedNode.name} · {selectedNode.ipAddress}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDiagnosticsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E293B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              
              {/* Terminal Console View */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                  <span>Diagnostic Command Output:</span>
                  {diagnosticsRunning && <span className="text-[#38BDF8] animate-pulse">Running telemetry probes...</span>}
                </div>
                <div className="p-3.5 rounded-xl bg-black/80 border border-[#1E293B] font-mono text-[11px] text-[#22C55E] space-y-1 max-h-48 overflow-y-auto">
                  {diagnosticsLog.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              </div>

              {/* Node Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#151E33] p-3 rounded-xl border border-[#1E293B] text-[11px] font-mono">
                <div>
                  <span className="text-slate-500">MAC Address:</span>
                  <div className="text-white mt-0.5">{selectedNode.macAddress}</div>
                </div>
                <div>
                  <span className="text-slate-500">Firmware:</span>
                  <div className="text-white mt-0.5">{selectedNode.firmwareVersion}</div>
                </div>
                <div>
                  <span className="text-slate-500">Uptime:</span>
                  <div className="text-[#22C55E] mt-0.5">{selectedNode.uptimePercent}%</div>
                </div>
                <div>
                  <span className="text-slate-500">Telemetry:</span>
                  <div className="text-[#38BDF8] mt-0.5">{selectedNode.eventsPerMin} evt/min</div>
                </div>
              </div>

            </div>

            <div className="px-5 py-3 border-t border-[#1E293B] bg-[#151E33]/40 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleRebootNode(selectedNode.id)}
                className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/30 text-xs font-semibold transition-colors cursor-pointer flex items-center space-x-1.5"
              >
                <Power className="w-3.5 h-3.5" />
                <span>Remote Reboot Node</span>
              </button>

              <button
                type="button"
                onClick={() => setDiagnosticsModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
