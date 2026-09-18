'use strict';
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Layers, 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Users, 
  UserCheck, 
  Radio, 
  Scale, 
  Key, 
  Lock, 
  SlidersHorizontal, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
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
  BellRing, 
  Cpu, 
  Server, 
  Globe, 
  CheckSquare, 
  Zap, 
  Share2, 
  Fingerprint, 
  Settings, 
  HelpCircle,
  Play,
  Pause,
  AlertOctagon,
  KeyRound,
  Download,
  Flame,
  Power,
  Smartphone
} from 'lucide-react';
import Logo from '@/components/Logo';

export type GovernanceNavTab = 'hub' | 'tenants' | 'rbac' | 'escalations' | 'policies';

// --- DATA STRUCTURES ---

export interface TenantOrg {
  id: string;
  name: string;
  slug: string;
  parentOrg: string;
  region: 'North America' | 'EMEA (Europe)' | 'APAC' | 'LATAM';
  tier: 'Enterprise Platinum' | 'Mission Critical' | 'Standard Defense';
  status: 'Active' | 'Audit Mode' | 'Provisioning' | 'Suspended';
  campusesCount: number;
  zonesCount: number;
  activeUsers: number;
  userQuota: number;
  sensorNodes: number;
  nodeQuota: number;
  encryptionMode: 'BYOK Dedicated HSM' | 'RedFort Shared FIPS' | 'Dedicated FIPS Partition';
  primaryAdmin: string;
  createdDate: string;
}

export interface RbacRole {
  id: string;
  name: string;
  description: string;
  assignedUsersCount: number;
  isSystemRole: boolean;
  tier: 'Platform Root' | 'Operational' | 'Audit & Compliance' | 'Field Level';
  permissions: {
    physicalAccess: ('lockdown:execute' | 'gate:override' | 'badge:issue' | 'turnstile:diagnostics')[];
    videoSurveillance: ('cctv:live_stream' | 'cctv:ptz_control' | 'cctv:export_footage' | 'cctv:ai_analytics')[];
    incidentOps: ('incident:create' | 'incident:triage' | 'dispatch:officer' | 'sop:execute')[];
    iamDirectory: ('iam:scim_write' | 'iam:mfa_bypass' | 'iam:role_assign' | 'iam:key_rotate')[];
    complianceAudit: ('audit:read_vault' | 'audit:merkle_verify' | 'audit:export_binder' | 'audit:raw_logs')[];
    platformGovernance: ('tenant:provision' | 'tenant:destroy' | 'rbac:modify_policy' | 'escalation:edit_rules')[];
  };
}

export interface UserPermissionRecord {
  id: string;
  name: string;
  email: string;
  tenant: string;
  roleId: string;
  roleName: string;
  department: string;
  mfaMethod: 'FIDO2 Hardware Key' | 'Authenticator App' | 'SMS Backup (Restricted)';
  lastLogin: string;
  status: 'Active' | 'Locked' | 'Pending Activation';
  ipRestriction: string;
}

export interface EscalationRule {
  id: string;
  title: string;
  severity: 'Sev-0 (Catastrophic)' | 'Sev-1 (Critical)' | 'Sev-2 (High)' | 'Sev-3 (Moderate)';
  triggerCondition: string;
  unackTimeoutSec: number;
  actionTree: {
    tier1: string;
    tier2: string;
    tier3: string;
  };
  channels: ('SMS Broadcast' | 'PagerDuty' | 'Automated PA' | 'Mobile Push' | 'Radio Alert')[];
  status: 'Active' | 'Paused';
  lastTriggered: string | null;
  triggerCount24h: number;
}

export interface SecurityPolicyRule {
  id: string;
  category: 'Access Control' | 'Authentication' | 'Session & Geo' | 'Dual-Authorization';
  name: string;
  description: string;
  enforcement: 'Enforced (Strict)' | 'Warning / Audit' | 'Disabled';
  appliesTo: string;
  lastUpdated: string;
}

// --- INITIAL MOCK DATASETS ---

export const INITIAL_TENANTS: TenantOrg[] = [
  {
    id: 'TEN-NA-HQ',
    name: 'RedFort North America Holdings',
    slug: 'rf-na-holdings',
    parentOrg: 'RedFort Global Enterprise',
    region: 'North America',
    tier: 'Mission Critical',
    status: 'Active',
    campusesCount: 4,
    zonesCount: 38,
    activeUsers: 840,
    userQuota: 1000,
    sensorNodes: 142,
    nodeQuota: 200,
    encryptionMode: 'BYOK Dedicated HSM',
    primaryAdmin: 'victoria.sterling@redfort.enterprise',
    createdDate: '2024-01-15'
  },
  {
    id: 'TEN-EMEA-FIN',
    name: 'Zurich Financial Cyber-Physical Unit',
    slug: 'zurich-fin-ops',
    parentOrg: 'RedFort Global Enterprise',
    region: 'EMEA (Europe)',
    tier: 'Enterprise Platinum',
    status: 'Active',
    campusesCount: 2,
    zonesCount: 19,
    activeUsers: 420,
    userQuota: 500,
    sensorNodes: 86,
    nodeQuota: 100,
    encryptionMode: 'Dedicated FIPS Partition',
    primaryAdmin: 'marc.keller@zurich-sec.eu',
    createdDate: '2024-06-10'
  },
  {
    id: 'TEN-APAC-SEMI',
    name: 'Tokyo Fab & Cleanroom Defense Org',
    slug: 'tokyo-fab-defense',
    parentOrg: 'RedFort Global Enterprise',
    region: 'APAC',
    tier: 'Mission Critical',
    status: 'Active',
    campusesCount: 3,
    zonesCount: 44,
    activeUsers: 610,
    userQuota: 800,
    sensorNodes: 194,
    nodeQuota: 250,
    encryptionMode: 'BYOK Dedicated HSM',
    primaryAdmin: 'kenji.sato@tokyo-fab.jp',
    createdDate: '2024-09-01'
  },
  {
    id: 'TEN-LATAM-LOG',
    name: 'Panama Intermodal Logistics Hub',
    slug: 'panama-logistics',
    parentOrg: 'RedFort Global Enterprise',
    region: 'LATAM',
    tier: 'Standard Defense',
    status: 'Audit Mode',
    campusesCount: 1,
    zonesCount: 12,
    activeUsers: 180,
    userQuota: 300,
    sensorNodes: 48,
    nodeQuota: 80,
    encryptionMode: 'RedFort Shared FIPS',
    primaryAdmin: 'carlos.mendez@panama-ports.pa',
    createdDate: '2025-02-18'
  },
  {
    id: 'TEN-US-DEF',
    name: 'Northern Virginia R&D Aerospace Annex',
    slug: 'nova-aerospace',
    parentOrg: 'RedFort Global Enterprise',
    region: 'North America',
    tier: 'Mission Critical',
    status: 'Active',
    campusesCount: 2,
    zonesCount: 26,
    activeUsers: 290,
    userQuota: 400,
    sensorNodes: 112,
    nodeQuota: 150,
    encryptionMode: 'BYOK Dedicated HSM',
    primaryAdmin: 'rachel.adams@nova-aero.com',
    createdDate: '2025-04-02'
  }
];

export const INITIAL_RBAC_ROLES: RbacRole[] = [
  {
    id: 'ROLE-SUPER-ADMIN',
    name: 'Platform Super Admin',
    description: 'Root access across all multi-tenant hierarchies, cryptographic key lifecycle, global policies, and RBAC governance.',
    assignedUsersCount: 3,
    isSystemRole: true,
    tier: 'Platform Root',
    permissions: {
      physicalAccess: ['lockdown:execute', 'gate:override', 'badge:issue', 'turnstile:diagnostics'],
      videoSurveillance: ['cctv:live_stream', 'cctv:ptz_control', 'cctv:export_footage', 'cctv:ai_analytics'],
      incidentOps: ['incident:create', 'incident:triage', 'dispatch:officer', 'sop:execute'],
      iamDirectory: ['iam:scim_write', 'iam:mfa_bypass', 'iam:role_assign', 'iam:key_rotate'],
      complianceAudit: ['audit:read_vault', 'audit:merkle_verify', 'audit:export_binder', 'audit:raw_logs'],
      platformGovernance: ['tenant:provision', 'tenant:destroy', 'rbac:modify_policy', 'escalation:edit_rules']
    }
  },
  {
    id: 'ROLE-GSOC-ANALYST',
    name: 'GSOC Security Analyst',
    description: 'Real-time alert triage, floorplan incident response, live turnstile diagnostics, and guard dispatch.',
    assignedUsersCount: 28,
    isSystemRole: true,
    tier: 'Operational',
    permissions: {
      physicalAccess: ['gate:override', 'turnstile:diagnostics'],
      videoSurveillance: ['cctv:live_stream', 'cctv:ptz_control', 'cctv:ai_analytics'],
      incidentOps: ['incident:create', 'incident:triage', 'dispatch:officer', 'sop:execute'],
      iamDirectory: [],
      complianceAudit: ['audit:read_vault'],
      platformGovernance: []
    }
  },
  {
    id: 'ROLE-CSO-EXEC',
    name: 'Chief Security Officer (CSO)',
    description: 'Executive campus posture analytics, board risk velocity reporting, cross-site threat intelligence, and policy sign-off.',
    assignedUsersCount: 6,
    isSystemRole: true,
    tier: 'Operational',
    permissions: {
      physicalAccess: ['lockdown:execute'],
      videoSurveillance: ['cctv:live_stream', 'cctv:ai_analytics'],
      incidentOps: ['incident:triage'],
      iamDirectory: [],
      complianceAudit: ['audit:read_vault', 'audit:export_binder'],
      platformGovernance: ['escalation:edit_rules']
    }
  },
  {
    id: 'ROLE-FIELD-GUARD',
    name: 'Security Guard / Field Officer',
    description: 'Physical gate turnstiles, visitor check-in/pass creation, perimeter camera grid, and incident handover logging.',
    assignedUsersCount: 74,
    isSystemRole: true,
    tier: 'Field Level',
    permissions: {
      physicalAccess: ['gate:override', 'badge:issue'],
      videoSurveillance: ['cctv:live_stream'],
      incidentOps: ['incident:create', 'dispatch:officer'],
      iamDirectory: [],
      complianceAudit: [],
      platformGovernance: []
    }
  },
  {
    id: 'ROLE-COMPLIANCE-AUDITOR',
    name: 'Compliance Auditor',
    description: 'Read-only evidence vault verification, Merkle audit trail proof validation, and SOC 2 / ISO 27001 binder compilation.',
    assignedUsersCount: 12,
    isSystemRole: true,
    tier: 'Audit & Compliance',
    permissions: {
      physicalAccess: [],
      videoSurveillance: [],
      incidentOps: [],
      iamDirectory: [],
      complianceAudit: ['audit:read_vault', 'audit:merkle_verify', 'audit:export_binder', 'audit:raw_logs'],
      platformGovernance: []
    }
  },
  {
    id: 'ROLE-IT-ADMIN',
    name: 'IT Infrastructure Administrator',
    description: 'SCIM directory sync, sensor node fleet diagnostics, Kafka telemetry, and edge Kubernetes cluster operations.',
    assignedUsersCount: 16,
    isSystemRole: true,
    tier: 'Operational',
    permissions: {
      physicalAccess: ['turnstile:diagnostics'],
      videoSurveillance: [],
      incidentOps: [],
      iamDirectory: ['iam:scim_write', 'iam:role_assign', 'iam:key_rotate'],
      complianceAudit: ['audit:read_vault'],
      platformGovernance: []
    }
  }
];

export const INITIAL_USER_PERMISSIONS: UserPermissionRecord[] = [
  {
    id: 'USR-GOV-001',
    name: 'Victoria Sterling',
    email: 'superadmin@redfort.enterprise',
    tenant: 'RedFort North America Holdings',
    roleId: 'ROLE-SUPER-ADMIN',
    roleName: 'Platform Super Admin',
    department: 'Platform Governance',
    mfaMethod: 'FIDO2 Hardware Key',
    lastLogin: '3 mins ago',
    status: 'Active',
    ipRestriction: 'Corporate HQ VPN (10.240.0.0/16)'
  },
  {
    id: 'USR-GSOC-014',
    name: 'Alex Mercer',
    email: 'analyst@redfort.enterprise',
    tenant: 'RedFort North America Holdings',
    roleId: 'ROLE-GSOC-ANALYST',
    roleName: 'GSOC Security Analyst',
    department: 'Global Security Ops',
    mfaMethod: 'FIDO2 Hardware Key',
    lastLogin: '12 mins ago',
    status: 'Active',
    ipRestriction: 'GSOC Dedicated Subnet'
  },
  {
    id: 'USR-CSO-002',
    name: 'Helena Vance',
    email: 'cso@redfort.enterprise',
    tenant: 'RedFort North America Holdings',
    roleId: 'ROLE-CSO-EXEC',
    roleName: 'Chief Security Officer (CSO)',
    department: 'Executive Leadership',
    mfaMethod: 'FIDO2 Hardware Key',
    lastLogin: '45 mins ago',
    status: 'Active',
    ipRestriction: 'Executive Zero-Trust Gateway'
  },
  {
    id: 'USR-GRD-102',
    name: 'Officer Marcus Sterling',
    email: 'guard@redfort.enterprise',
    tenant: 'RedFort North America Holdings',
    roleId: 'ROLE-FIELD-GUARD',
    roleName: 'Security Guard / Field Officer',
    department: 'Physical Security Division',
    mfaMethod: 'Authenticator App',
    lastLogin: '8 mins ago',
    status: 'Active',
    ipRestriction: 'Campus WiFi & MDM Cellular'
  },
  {
    id: 'USR-AUD-044',
    name: 'Evelyn Archer, CISA',
    email: 'auditor@redfort.enterprise',
    tenant: 'Zurich Financial Cyber-Physical Unit',
    roleId: 'ROLE-COMPLIANCE-AUDITOR',
    roleName: 'Compliance Auditor',
    department: 'Deloitte External Audit',
    mfaMethod: 'FIDO2 Hardware Key',
    lastLogin: '2 hours ago',
    status: 'Active',
    ipRestriction: 'Auditor Zero-Trust Tunnel'
  },
  {
    id: 'USR-ADM-088',
    name: 'Devon Vance',
    email: 'admin@redfort.enterprise',
    tenant: 'Tokyo Fab & Cleanroom Defense Org',
    roleId: 'ROLE-IT-ADMIN',
    roleName: 'IT Infrastructure Administrator',
    department: 'Infrastructure & IAM',
    mfaMethod: 'FIDO2 Hardware Key',
    lastLogin: '1 hour ago',
    status: 'Active',
    ipRestriction: 'Cloudflare Access Tunnel'
  }
];

export const INITIAL_ESCALATION_RULES: EscalationRule[] = [
  {
    id: 'ESC-RULE-001',
    title: 'Severe Perimeter Breach / Unlocked High-Security Gate',
    severity: 'Sev-0 (Catastrophic)',
    triggerCondition: 'LiDAR boundary trip + Gate sensor forced open with no RFID badge swipe',
    unackTimeoutSec: 45,
    actionTree: {
      tier1: 'Auto-dispatch 2 nearest Field Officers & sound floorzone strobe',
      tier2: 'P90s: Page GSOC Incident Commander + push live CCTV stream to mobile units',
      tier3: 'P180s: Execute auto-lockdown on adjacent corridors & alert Law Enforcement'
    },
    channels: ['SMS Broadcast', 'PagerDuty', 'Automated PA', 'Radio Alert'],
    status: 'Active',
    lastTriggered: '18 hours ago',
    triggerCount24h: 1
  },
  {
    id: 'ESC-RULE-002',
    title: 'Cryptographic HSM Key Zeroization or Hardware Tamper',
    severity: 'Sev-0 (Catastrophic)',
    triggerCondition: 'FIPS 140-3 HSM module reports physical casing intrusion or voltage fault',
    unackTimeoutSec: 30,
    actionTree: {
      tier1: 'Instant alert to Lead IT Admin & CSO mobile pager with root crypto log snapshot',
      tier2: 'P60s: Freeze all SCIM provisioning & turnstile certificate issuance',
      tier3: 'P120s: Trigger offline cryptographic cold-vault failover sequence'
    },
    channels: ['PagerDuty', 'SMS Broadcast'],
    status: 'Active',
    lastTriggered: null,
    triggerCount24h: 0
  },
  {
    id: 'ESC-RULE-003',
    title: 'Executive Floor Tailgating / Access Denial Repeat (>3x)',
    severity: 'Sev-1 (Critical)',
    triggerCondition: 'Vision AI detects 2+ individuals passing single badge swipe in Suite 400',
    unackTimeoutSec: 60,
    actionTree: {
      tier1: 'Push live CCTV capture to Executive Security Guard tablet & turnstile monitor',
      tier2: 'P90s: Page GSOC Analyst to flag turnstile badge for immediate review',
      tier3: 'P180s: Disable badge auto-entry and require manual biometric clearance'
    },
    channels: ['Mobile Push', 'Radio Alert'],
    status: 'Active',
    lastTriggered: '4 hours ago',
    triggerCount24h: 3
  },
  {
    id: 'ESC-RULE-004',
    title: 'Continuous Compliance Evidence Drift (SOC 2 / ISO 27001)',
    severity: 'Sev-2 (High)',
    triggerCondition: 'Automated policy validator detects unencrypted sensor telemetry or open port',
    unackTimeoutSec: 900, // 15 mins
    actionTree: {
      tier1: 'Create High-Priority Jira/ServiceNow remediation ticket assigned to DevOps',
      tier2: 'P30m: Email compliance notification to Lead Auditor & Platform Super Admin',
      tier3: 'P2h: Quarantine offending sensor node from production Kafka pipeline'
    },
    channels: ['PagerDuty', 'Mobile Push'],
    status: 'Active',
    lastTriggered: '1 day ago',
    triggerCount24h: 2
  }
];

export const INITIAL_SECURITY_POLICIES: SecurityPolicyRule[] = [
  {
    id: 'POL-MFA-01',
    category: 'Authentication',
    name: 'Mandatory FIDO2 WebAuthn for Super Admin & IT Admin',
    description: 'Enforces hardware security keys (YubiKey / Titan) for all root platform actions and disables SMS/TOTP fallbacks.',
    enforcement: 'Enforced (Strict)',
    appliesTo: 'Super Admin, IT Admin, CSO roles',
    lastUpdated: '2026-03-01'
  },
  {
    id: 'POL-DUAL-AUTH-02',
    category: 'Dual-Authorization',
    name: 'Four-Eyes Approval for Campus-Wide Emergency Lockdown',
    description: 'Requires a secondary confirmation from CSO or GSOC Lead within 30 seconds before activating full physical lockdown.',
    enforcement: 'Enforced (Strict)',
    appliesTo: 'All Campus Turnstile & Gate Hubs',
    lastUpdated: '2026-02-15'
  },
  {
    id: 'POL-GEO-03',
    category: 'Session & Geo',
    name: 'Strict Geo-Fencing & Corporate IP CIDR Allowlisting',
    description: 'Blocks console authentication attempts originating from non-approved global zones or anonymized VPN proxies.',
    enforcement: 'Enforced (Strict)',
    appliesTo: 'All 6 Dashboard Consoles',
    lastUpdated: '2026-01-20'
  },
  {
    id: 'POL-TTL-04',
    category: 'Access Control',
    name: 'Automated Session Inactivity Termination (15 Minutes)',
    description: 'Revokes active JWT bearer tokens after 15 minutes of idle cursor/keyboard activity across all operator workstations.',
    enforcement: 'Enforced (Strict)',
    appliesTo: 'All Active Web & Mobile Sessions',
    lastUpdated: '2026-02-28'
  },
  {
    id: 'POL-MERKLE-05',
    category: 'Access Control',
    name: 'Immutable Merkle Log Checksum Verification Schedule',
    description: 'Runs continuous SHA-256 cryptographic proof checks every 60 seconds against the external immutable ledger.',
    enforcement: 'Enforced (Strict)',
    appliesTo: 'Global Audit Trail & Turnstile Logs',
    lastUpdated: '2026-03-10'
  }
];

interface GovernanceDashboardViewProps {
  initialTab?: GovernanceNavTab;
}

export default function GovernanceDashboardView({ initialTab = 'hub' }: GovernanceDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<GovernanceNavTab>(initialTab);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // States
  const [tenants, setTenants] = useState<TenantOrg[]>(INITIAL_TENANTS);
  const [roles, setRoles] = useState<RbacRole[]>(INITIAL_RBAC_ROLES);
  const [users, setUsers] = useState<UserPermissionRecord[]>(INITIAL_USER_PERMISSIONS);
  const [escalationRules, setEscalationRules] = useState<EscalationRule[]>(INITIAL_ESCALATION_RULES);
  const [policies, setPolicies] = useState<SecurityPolicyRule[]>(INITIAL_SECURITY_POLICIES);

  // Filter States
  const [tenantSearch, setTenantSearch] = useState('');
  const [tenantRegionFilter, setTenantRegionFilter] = useState('All');
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('All');

  // Modals
  const [isProvisionTenantModalOpen, setIsProvisionTenantModalOpen] = useState(false);
  const [newTenantData, setNewTenantData] = useState({
    name: '',
    slug: '',
    region: 'North America' as TenantOrg['region'],
    tier: 'Mission Critical' as TenantOrg['tier'],
    nodeQuota: 150,
    userQuota: 500,
    adminEmail: '',
    encryptionMode: 'BYOK Dedicated HSM' as TenantOrg['encryptionMode']
  });

  const [selectedUserForEdit, setSelectedUserForEdit] = useState<UserPermissionRecord | null>(null);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  const [isEscalationSimulatorOpen, setIsEscalationSimulatorOpen] = useState(false);
  const [simulatedRule, setSimulatedRule] = useState<EscalationRule | null>(null);
  const [simStep, setSimStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered Tenants
  const filteredTenants = useMemo(() => {
    return tenants.filter(t => {
      const matchSearch = t.name.toLowerCase().includes(tenantSearch.toLowerCase()) || 
                          t.id.toLowerCase().includes(tenantSearch.toLowerCase()) ||
                          t.primaryAdmin.toLowerCase().includes(tenantSearch.toLowerCase());
      const matchRegion = tenantRegionFilter === 'All' || t.region === tenantRegionFilter;
      return matchSearch && matchRegion;
    });
  }, [tenants, tenantSearch, tenantRegionFilter]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
                          u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
                          u.tenant.toLowerCase().includes(userSearch.toLowerCase());
      const matchRole = userRoleFilter === 'All' || u.roleName === userRoleFilter;
      return matchSearch && matchRole;
    });
  }, [users, userSearch, userRoleFilter]);

  // Tenant Creation Handler
  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenantData.name || !newTenantData.adminEmail) return;

    const newOrg: TenantOrg = {
      id: `TEN-${newTenantData.region.substring(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      name: newTenantData.name,
      slug: newTenantData.slug || newTenantData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      parentOrg: 'RedFort Global Enterprise',
      region: newTenantData.region,
      tier: newTenantData.tier,
      status: 'Active',
      campusesCount: 1,
      zonesCount: 8,
      activeUsers: 1,
      userQuota: newTenantData.userQuota,
      sensorNodes: 12,
      nodeQuota: newTenantData.nodeQuota,
      encryptionMode: newTenantData.encryptionMode,
      primaryAdmin: newTenantData.adminEmail,
      createdDate: '2026-03-18'
    };

    setTenants([newOrg, ...tenants]);
    setIsProvisionTenantModalOpen(false);
    setNewTenantData({
      name: '',
      slug: '',
      region: 'North America',
      tier: 'Mission Critical',
      nodeQuota: 150,
      userQuota: 500,
      adminEmail: '',
      encryptionMode: 'BYOK Dedicated HSM'
    });
  };

  // User Scope Update Handler
  const handleUpdateUserScope = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForEdit) return;

    setUsers(users.map(u => u.id === selectedUserForEdit.id ? selectedUserForEdit : u));
    setIsEditUserModalOpen(false);
    setSelectedUserForEdit(null);
  };

  // Escalation Simulation Trigger
  const runEscalationSimulation = (rule: EscalationRule) => {
    setSimulatedRule(rule);
    setSimStep(1);
    setIsSimulating(true);
    setIsEscalationSimulatorOpen(true);

    setTimeout(() => setSimStep(2), 2000);
    setTimeout(() => setSimStep(3), 4500);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
    }, 7000);
  };

  // KPI Calculations
  const totalCampuses = tenants.reduce((acc, t) => acc + t.campusesCount, 0);
  const totalUsers = tenants.reduce((acc, t) => acc + t.activeUsers, 0);
  const totalNodes = tenants.reduce((acc, t) => acc + t.sensorNodes, 0);

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
              <ShieldAlert className="w-3 h-3" />
              <span>Platform Super Admin</span>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden lg:inline">Global Governance & RBAC Hierarchy</span>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-full bg-[#151E33] border border-[#1E293B] text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span>Multi-Tenant Root: <strong>Nominal</strong></span>
          </div>

          <button
            type="button"
            onClick={() => setIsProvisionTenantModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Provision Tenant</span>
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
                Governance Consoles
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('hub');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'hub' 
                    ? 'bg-[#F5762E] text-white shadow-sm font-semibold' 
                    : 'text-slate-300 hover:bg-[#151E33] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <Activity className="w-4 h-4 shrink-0" />
                  <span className="truncate">Governance Hub</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                  activeTab === 'hub' ? 'bg-white/20 text-white' : 'bg-[#1E293B] text-slate-400'
                }`}>
                  5 Orgs
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('tenants');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'tenants' 
                    ? 'bg-[#F5762E] text-white shadow-sm font-semibold' 
                    : 'text-slate-300 hover:bg-[#151E33] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span className="truncate">Tenant Hierarchy</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                  activeTab === 'tenants' ? 'bg-white/20 text-white' : 'bg-[#1E293B] text-slate-400'
                }`}>
                  Tree
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('rbac');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'rbac' 
                    ? 'bg-[#F5762E] text-white shadow-sm font-semibold' 
                    : 'text-slate-300 hover:bg-[#151E33] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <Users className="w-4 h-4 shrink-0" />
                  <span className="truncate">RBAC & Permissions</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                  activeTab === 'rbac' ? 'bg-white/20 text-white' : 'bg-[#1E293B] text-slate-400'
                }`}>
                  6 Roles
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('escalations');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'escalations' 
                    ? 'bg-[#F5762E] text-white shadow-sm font-semibold' 
                    : 'text-slate-300 hover:bg-[#151E33] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <Flame className="w-4 h-4 shrink-0" />
                  <span className="truncate">Escalation Rules</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                  activeTab === 'escalations' ? 'bg-white/20 text-white' : 'bg-[#1E293B] text-slate-400'
                }`}>
                  4 Rules
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('policies');
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'policies' 
                    ? 'bg-[#F5762E] text-white shadow-sm font-semibold' 
                    : 'text-slate-300 hover:bg-[#151E33] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span className="truncate">Global Policies</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                  activeTab === 'policies' ? 'bg-white/20 text-white' : 'bg-[#1E293B] text-slate-400'
                }`}>
                  5 Active
                </span>
              </button>
            </div>

            {/* Quick Actions Card */}
            <div className="p-3 rounded-xl bg-[#111827] border border-[#1E293B] space-y-2">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Four-Eyes Dual Auth</span>
                <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Emergency campus lockdown and root key revocation require dual sign-off.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('policies')}
                  className="w-full py-1 px-2 rounded bg-[#1E293B] hover:bg-[#2A374A] text-slate-300 text-[11px] font-mono flex items-center justify-center space-x-1 transition-colors"
                >
                  <ShieldCheck className="w-3 h-3 text-[#22C55E]" />
                  <span>Verify Policy Guards</span>
                </button>
              </div>
            </div>

        </div>

          {/* Footer User Profile */}
          <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#F5762E] text-white font-bold text-xs flex items-center justify-center shrink-0">
                VS
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate">Victoria Sterling</div>
                <div className="text-[10px] text-slate-400 truncate">Chief Governance Officer</div>
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">

          {/* --- TAB 1: GOVERNANCE HUB --- */}
          {activeTab === 'hub' && (
            <div className="space-y-6">
              
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2.5">
                    <Activity className="w-6 h-6 text-[#F5762E]" />
                    <span>Global Platform Governance</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Multi-tenant organization oversight, global authorization guardrails, and incident escalation controls.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="px-3 py-1.5 rounded-lg bg-[#111827] border border-[#1E293B] text-xs font-mono text-slate-300 flex items-center space-x-2">
                    <span className="text-slate-500">Root Node:</span>
                    <span className="text-white font-semibold">US-EAST-VAULT-01</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('tenants')}
                    className="px-3 py-1.5 rounded-lg bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] text-xs text-white font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>View Hierarchy</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                
                <div className="p-4 rounded-xl bg-[#0E1526] border border-[#1E293B] space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Active Tenant Orgs</span>
                    <Building2 className="w-4 h-4 text-[#38BDF8]" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">5</div>
                  <div className="text-[11px] text-[#22C55E] flex items-center space-x-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>100% Isolated Partitions</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0E1526] border border-[#1E293B] space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Aggregate Campuses</span>
                    <Globe className="w-4 h-4 text-[#F5762E]" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">{totalCampuses}</div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Across 4 Global Regions
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0E1526] border border-[#1E293B] space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Managed IAM Users</span>
                    <Users className="w-4 h-4 text-[#818CF8]" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">{totalUsers.toLocaleString()}</div>
                  <div className="text-[11px] text-[#22C55E] flex items-center space-x-1 font-mono">
                    <ShieldCheck className="w-3 h-3" />
                    <span>99.4% FIDO2 MFA Enforced</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0E1526] border border-[#1E293B] space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>IoT Sensor Fleet</span>
                    <Cpu className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">{totalNodes}</div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Turnstiles, CCTV, LiDAR
                  </div>
                </div>

              </div>

              {/* Multi-Tenant Quick Status Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left 2 Cols: Tenant Roster */}
                <div className="lg:col-span-2 bg-[#0E1526] border border-[#1E293B] rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                        <Layers className="w-4 h-4 text-[#F5762E]" />
                        <span>Tenant Fleet Overview</span>
                      </h2>
                      <p className="text-xs text-slate-400">Resource quotas and HSM isolation mode per operating unit</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('tenants')}
                      className="text-xs text-[#F5762E] hover:text-[#FF9A5A] font-semibold flex items-center space-x-1"
                    >
                      <span>Full Management</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tenants.slice(0, 4).map((tenant) => (
                      <div key={tenant.id} className="p-3.5 rounded-lg bg-[#111827] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-white truncate">{tenant.name}</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#1E293B] text-slate-300">
                              {tenant.region}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono flex items-center space-x-3">
                            <span>ID: {tenant.id}</span>
                            <span>•</span>
                            <span>{tenant.campusesCount} Campuses</span>
                            <span>•</span>
                            <span className="text-[#38BDF8]">{tenant.encryptionMode}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 shrink-0">
                          <div className="text-right">
                            <div className="text-xs font-mono font-semibold text-white">
                              {tenant.activeUsers} / {tenant.userQuota}
                            </div>
                            <div className="text-[10px] text-slate-500">Users Allocated</div>
                          </div>
                          <div className="w-20 bg-[#1E293B] h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#F5762E] h-full rounded-full"
                              style={{ width: `${Math.min(100, (tenant.activeUsers / tenant.userQuota) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Col: High-Privilege Audit Feed */}
                <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                        <Fingerprint className="w-4 h-4 text-[#818CF8]" />
                        <span>Root Privilege Audit</span>
                      </h2>
                      <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                    </div>
                    <p className="text-xs text-slate-400">Real-time immutable log of Super Admin & IAM role changes</p>
                  </div>

                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="p-2.5 rounded bg-[#111827] border border-[#1E293B] space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#38BDF8] font-semibold">RBAC_ROLE_ELEVATE</span>
                        <span className="text-slate-500">2 mins ago</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">User Devon Vance assigned IT-ADMIN scope for Tokyo Fab.</p>
                      <div className="text-[10px] text-slate-500">Signer: Victoria Sterling (FIDO2 Dual-Key)</div>
                    </div>

                    <div className="p-2.5 rounded bg-[#111827] border border-[#1E293B] space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#22C55E] font-semibold">TENANT_QUOTA_ADJUST</span>
                        <span className="text-slate-500">14 mins ago</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">Austin Global HQ sensor node quota increased from 150 to 200.</p>
                      <div className="text-[10px] text-slate-500">Signer: Helena Vance (CSO Approval)</div>
                    </div>

                    <div className="p-2.5 rounded bg-[#111827] border border-[#1E293B] space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#F5762E] font-semibold">ESCALATION_TREE_TEST</span>
                        <span className="text-slate-500">1 hour ago</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">Sev-0 Perimeter Breach automated failover test completed successfully.</p>
                      <div className="text-[10px] text-slate-500">Trigger: SLA Simulator Node</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('policies')}
                    className="w-full py-2 px-3 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-300 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#F5762E]" />
                    <span>View Policy Compliance</span>
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* --- TAB 2: TENANT HIERARCHY --- */}
          {activeTab === 'tenants' && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2.5">
                    <Building2 className="w-6 h-6 text-[#F5762E]" />
                    <span>Multi-Tenant Organizational Hierarchy</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Manage isolated enterprise subsidiaries, campus networks, facility zones, and resource quotas.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsProvisionTenantModalOpen(true)}
                  className="px-3.5 py-2 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Provision New Tenant</span>
                </button>
              </div>

              {/* Hierarchy Tree Visualization Card */}
              <div className="p-4 rounded-xl bg-[#0E1526] border border-[#1E293B] space-y-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-[#38BDF8]" />
                  <span>Global Entity Tree & Data Boundaries</span>
                </div>
                
                <div className="p-3 bg-[#111827] rounded-lg border border-[#1E293B] font-mono text-xs text-slate-300 overflow-x-auto">
                  <div className="text-[#F5762E] font-bold">🏢 RedFort Global Enterprise (Root Org: ORG-ROOT-001)</div>
                  <div className="pl-6 pt-1 text-slate-400">├── 🌐 North America Ops (TEN-NA-HQ) → Austin Global HQ (4 Campuses, 38 Zones) [BYOK HSM]</div>
                  <div className="pl-6 pt-1 text-slate-400">├── 🌐 EMEA Financial Sec (TEN-EMEA-FIN) → Zurich Vault Facility (2 Campuses, 19 Zones) [Dedicated FIPS]</div>
                  <div className="pl-6 pt-1 text-slate-400">├── 🌐 APAC Semiconductor Hub (TEN-APAC-SEMI) → Tokyo Fab Cleanroom (3 Campuses, 44 Zones) [BYOK HSM]</div>
                  <div className="pl-6 pt-1 text-slate-400">└── 🌐 LATAM Logistics Core (TEN-LATAM-LOG) → Panama Port Complex (1 Campus, 12 Zones) [RedFort Shared]</div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={tenantSearch}
                    onChange={(e) => setTenantSearch(e.target.value)}
                    placeholder="Search tenants by name, ID, or primary admin..."
                    className="w-full pl-9 pr-4 py-2 bg-[#0E1526] border border-[#1E293B] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F5762E]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    value={tenantRegionFilter}
                    onChange={(e) => setTenantRegionFilter(e.target.value)}
                    className="bg-[#0E1526] border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#F5762E]"
                  >
                    <option value="All">All Regions</option>
                    <option value="North America">North America</option>
                    <option value="EMEA (Europe)">EMEA (Europe)</option>
                    <option value="APAC">APAC</option>
                    <option value="LATAM">LATAM</option>
                  </select>
                </div>
              </div>

              {/* Tenant Table */}
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#111827] text-slate-400 font-mono text-[11px] border-b border-[#1E293B] uppercase">
                      <tr>
                        <th className="py-3 px-4">Tenant Org & ID</th>
                        <th className="py-3 px-4">Region & Tier</th>
                        <th className="py-3 px-4">Hierarchy</th>
                        <th className="py-3 px-4">User Quota</th>
                        <th className="py-3 px-4">Sensor Nodes</th>
                        <th className="py-3 px-4">HSM Encryption</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {filteredTenants.map((t) => (
                        <tr key={t.id} className="hover:bg-[#111827]/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{t.name}</div>
                            <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                              <span>{t.id}</span>
                              <button 
                                type="button"
                                onClick={() => handleCopy(t.id, t.id)}
                                className="text-slate-500 hover:text-white"
                              >
                                {copiedId === t.id ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-slate-200">{t.region}</div>
                            <div className="text-[10px] text-[#38BDF8] font-mono">{t.tier}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            <div className="text-white">{t.campusesCount} Campuses</div>
                            <div className="text-[10px] text-slate-400">{t.zonesCount} Zones</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            <div className="text-white font-semibold">{t.activeUsers} / {t.userQuota}</div>
                            <div className="w-24 bg-[#1E293B] h-1.5 rounded-full mt-1 overflow-hidden">
                              <div 
                                className="bg-[#F5762E] h-full rounded-full"
                                style={{ width: `${Math.min(100, (t.activeUsers / t.userQuota) * 100)}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            <div className="text-white font-semibold">{t.sensorNodes} / {t.nodeQuota}</div>
                            <div className="w-24 bg-[#1E293B] h-1.5 rounded-full mt-1 overflow-hidden">
                              <div 
                                className="bg-[#22C55E] h-full rounded-full"
                                style={{ width: `${Math.min(100, (t.sensorNodes / t.nodeQuota) * 100)}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1E293B] text-[#38BDF8] border border-[#38BDF8]/30">
                              {t.encryptionMode}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setUserSearch(t.name);
                                setActiveTab('rbac');
                              }}
                              className="px-2 py-1 rounded bg-[#151E33] hover:bg-[#1E293B] text-slate-300 hover:text-white text-[11px] font-mono transition-colors"
                            >
                              Manage Users
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

          {/* --- TAB 3: RBAC & PERMISSIONS --- */}
          {activeTab === 'rbac' && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2.5">
                    <Users className="w-6 h-6 text-[#F5762E]" />
                    <span>Role-Based Access Control (RBAC) & Scope Matrix</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Define enterprise roles, inspect fine-grained permissions, and manage operator scopes.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="px-3 py-1 rounded-lg bg-[#111827] border border-[#1E293B] text-xs font-mono text-slate-300">
                    <span>6 System Roles Defined</span>
                  </div>
                </div>
              </div>

              {/* RBAC Capabilities Matrix Table */}
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                      <KeyRound className="w-4 h-4 text-[#F5762E]" />
                      <span>Security Capability Domains Matrix</span>
                    </h2>
                    <p className="text-xs text-slate-400">Granular operation permissions granted per enterprise role</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#111827] text-slate-400 text-[11px] border-b border-[#1E293B]">
                      <tr>
                        <th className="py-2.5 px-3">Role Name</th>
                        <th className="py-2.5 px-3">Physical Gates</th>
                        <th className="py-2.5 px-3">Video / CCTV</th>
                        <th className="py-2.5 px-3">Incident Ops</th>
                        <th className="py-2.5 px-3">SCIM Directory</th>
                        <th className="py-2.5 px-3">Audit Vault</th>
                        <th className="py-2.5 px-3">Platform Gov</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {roles.map((r) => (
                        <tr key={r.id} className="hover:bg-[#111827]/60 transition-colors">
                          <td className="py-3 px-3">
                            <div className="font-bold text-white font-sans">{r.name}</div>
                            <div className="text-[10px] text-slate-500">{r.tier} • {r.assignedUsersCount} Users</div>
                          </td>
                          <td className="py-3 px-3">
                            {r.permissions.physicalAccess.length > 0 ? (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">
                                {r.permissions.physicalAccess.length} Grants
                              </span>
                            ) : (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            {r.permissions.videoSurveillance.length > 0 ? (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
                                {r.permissions.videoSurveillance.length} Grants
                              </span>
                            ) : (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            {r.permissions.incidentOps.length > 0 ? (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-[#F5762E]/10 text-[#F5762E] border border-[#F5762E]/30">
                                {r.permissions.incidentOps.length} Grants
                              </span>
                            ) : (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            {r.permissions.iamDirectory.length > 0 ? (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-[#818CF8]/10 text-[#818CF8] border border-[#818CF8]/30">
                                {r.permissions.iamDirectory.length} Grants
                              </span>
                            ) : (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            {r.permissions.complianceAudit.length > 0 ? (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">
                                {r.permissions.complianceAudit.length} Grants
                              </span>
                            ) : (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            {r.permissions.platformGovernance.length > 0 ? (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/30">
                                {r.permissions.platformGovernance.length} Grants
                              </span>
                            ) : (
                              <span className="text-slate-600">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* User Directory & Role Assignment Roster */}
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                      <UserCheck className="w-4 h-4 text-[#38BDF8]" />
                      <span>User Role Assignment & Scope Directory</span>
                    </h2>
                    <p className="text-xs text-slate-400">Search and edit active console permissions and MFA enforcement</p>
                  </div>

                  {/* Search and Filter */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search by name, email..."
                      className="px-3 py-1.5 bg-[#111827] border border-[#1E293B] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F5762E]"
                    />
                    <select
                      value={userRoleFilter}
                      onChange={(e) => setUserRoleFilter(e.target.value)}
                      className="bg-[#111827] border border-[#1E293B] rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-[#F5762E]"
                    >
                      <option value="All">All Roles</option>
                      <option value="Platform Super Admin">Platform Super Admin</option>
                      <option value="GSOC Security Analyst">GSOC Security Analyst</option>
                      <option value="Chief Security Officer (CSO)">CSO Executive</option>
                      <option value="Security Guard / Field Officer">Field Officer</option>
                      <option value="Compliance Auditor">Compliance Auditor</option>
                      <option value="IT Infrastructure Administrator">IT Admin</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#111827] text-slate-400 font-mono text-[11px] border-b border-[#1E293B] uppercase">
                      <tr>
                        <th className="py-2.5 px-3">User & Email</th>
                        <th className="py-2.5 px-3">Assigned Role</th>
                        <th className="py-2.5 px-3">Tenant Organization</th>
                        <th className="py-2.5 px-3">MFA Method</th>
                        <th className="py-2.5 px-3">IP Restriction</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-[#111827]/60 transition-colors">
                          <td className="py-3 px-3">
                            <div className="font-semibold text-white">{u.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                              u.roleName.includes('Super Admin') 
                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                                : u.roleName.includes('Analyst')
                                  ? 'bg-[#F5762E]/10 text-[#F5762E] border border-[#F5762E]/30'
                                  : u.roleName.includes('CSO')
                                    ? 'bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30'
                                    : u.roleName.includes('Guard')
                                      ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30'
                                      : 'bg-[#818CF8]/10 text-[#818CF8] border border-[#818CF8]/30'
                            }`}>
                              {u.roleName}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">
                            {u.tenant}
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center space-x-1 text-[#22C55E] font-mono text-[11px]">
                              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                              <span>{u.mfaMethod}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-slate-400 font-mono text-[10px]">
                            {u.ipRestriction}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedUserForEdit(u);
                                setIsEditUserModalOpen(true);
                              }}
                              className="p-1.5 rounded bg-[#151E33] hover:bg-[#1E293B] text-slate-300 hover:text-white transition-colors"
                              title="Edit User Scope"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
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

          {/* --- TAB 4: ESCALATION RULES --- */}
          {activeTab === 'escalations' && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2.5">
                    <Flame className="w-6 h-6 text-[#F5762E]" />
                    <span>Incident Escalation & SLA Automation Engine</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Multi-tier failover trees, time-to-acknowledge timeouts, and multi-channel emergency broadcast rules.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => runEscalationSimulation(escalationRules[0])}
                    className="px-3.5 py-2 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Simulate Escalation Tree</span>
                  </button>
                </div>
              </div>

              {/* Active Rules List */}
              <div className="space-y-4">
                {escalationRules.map((rule) => (
                  <div key={rule.id} className="p-5 rounded-xl bg-[#0E1526] border border-[#1E293B] space-y-4">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E293B] pb-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            rule.severity.includes('Sev-0') 
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' 
                              : rule.severity.includes('Sev-1')
                                ? 'bg-[#F5762E]/10 text-[#F5762E] border border-[#F5762E]/30'
                                : 'bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30'
                          }`}>
                            {rule.severity}
                          </span>
                          <h3 className="text-sm font-bold text-white">{rule.title}</h3>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">
                          Trigger: {rule.triggerCondition} (Unacknowledged Timeout: <strong>{rule.unackTimeoutSec}s</strong>)
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => runEscalationSimulation(rule)}
                          className="px-2.5 py-1 rounded bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] text-slate-200 text-xs font-mono flex items-center space-x-1 transition-colors cursor-pointer"
                        >
                          <Play className="w-3 h-3 text-[#22C55E]" />
                          <span>Test SLA</span>
                        </button>
                      </div>
                    </div>

                    {/* Multi-Tier Tree */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                      
                      <div className="p-3 rounded-lg bg-[#111827] border border-[#1E293B] space-y-1">
                        <div className="text-[#38BDF8] font-semibold text-[11px] flex items-center space-x-1">
                          <span>Tier 1 (Instant Trigger)</span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{rule.actionTree.tier1}</p>
                      </div>

                      <div className="p-3 rounded-lg bg-[#111827] border border-[#1E293B] space-y-1">
                        <div className="text-[#F5762E] font-semibold text-[11px] flex items-center space-x-1">
                          <span>Tier 2 (Timeout Warning)</span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{rule.actionTree.tier2}</p>
                      </div>

                      <div className="p-3 rounded-lg bg-[#111827] border border-[#1E293B] space-y-1">
                        <div className="text-rose-400 font-semibold text-[11px] flex items-center space-x-1">
                          <span>Tier 3 (Executive Failover)</span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{rule.actionTree.tier3}</p>
                      </div>

                    </div>

                    {/* Channels */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                      <div className="flex items-center space-x-2">
                        <span>Paging Channels:</span>
                        {rule.channels.map((ch, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded bg-[#151E33] text-slate-300 text-[10px]">
                            {ch}
                          </span>
                        ))}
                      </div>
                      <div>
                        Triggers 24h: <strong className="text-white">{rule.triggerCount24h}</strong>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* --- TAB 5: GLOBAL POLICIES --- */}
          {activeTab === 'policies' && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2.5">
                    <Lock className="w-6 h-6 text-[#F5762E]" />
                    <span>Global Platform Security & Dual-Auth Policies</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Enforce platform-wide authentication guardrails, dual-authorization approval policies, and session TTL rules.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="px-3 py-1.5 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-mono font-semibold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Zero Policy Violations</span>
                  </div>
                </div>
              </div>

              {/* Policy Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {policies.map((pol) => (
                  <div key={pol.id} className="p-5 rounded-xl bg-[#0E1526] border border-[#1E293B] space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1E293B] text-[#38BDF8]">
                          {pol.category}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 font-semibold">
                          {pol.enforcement}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{pol.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{pol.description}</p>
                    </div>

                    <div className="pt-3 border-t border-[#1E293B] flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>Scope: {pol.appliesTo}</span>
                      <span>Verified Today</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </main>
      </div>

      {/* --- MODAL 1: PROVISION TENANT MODAL --- */}
      {isProvisionTenantModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-[#F5762E]" />
                <h3 className="text-base font-bold text-white">Provision Enterprise Tenant</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsProvisionTenantModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTenant} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Tenant Organization Name</label>
                <input
                  type="text"
                  required
                  value={newTenantData.name}
                  onChange={(e) => setNewTenantData({ ...newTenantData, name: e.target.value })}
                  placeholder="e.g. Frankfurt Financial Data Center Core"
                  className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Region</label>
                  <select
                    value={newTenantData.region}
                    onChange={(e) => setNewTenantData({ ...newTenantData, region: e.target.value as TenantOrg['region'] })}
                    className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                  >
                    <option value="North America">North America</option>
                    <option value="EMEA (Europe)">EMEA (Europe)</option>
                    <option value="APAC">APAC</option>
                    <option value="LATAM">LATAM</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Tier</label>
                  <select
                    value={newTenantData.tier}
                    onChange={(e) => setNewTenantData({ ...newTenantData, tier: e.target.value as TenantOrg['tier'] })}
                    className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                  >
                    <option value="Mission Critical">Mission Critical</option>
                    <option value="Enterprise Platinum">Enterprise Platinum</option>
                    <option value="Standard Defense">Standard Defense</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Sensor Node Quota</label>
                  <input
                    type="number"
                    value={newTenantData.nodeQuota}
                    onChange={(e) => setNewTenantData({ ...newTenantData, nodeQuota: parseInt(e.target.value) || 50 })}
                    className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white font-mono focus:outline-none focus:border-[#F5762E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">User Seat Quota</label>
                  <input
                    type="number"
                    value={newTenantData.userQuota}
                    onChange={(e) => setNewTenantData({ ...newTenantData, userQuota: parseInt(e.target.value) || 100 })}
                    className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white font-mono focus:outline-none focus:border-[#F5762E]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Primary Tenant Admin Email</label>
                <input
                  type="email"
                  required
                  value={newTenantData.adminEmail}
                  onChange={(e) => setNewTenantData({ ...newTenantData, adminEmail: e.target.value })}
                  placeholder="admin@subsidiary.enterprise"
                  className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Cryptographic HSM Isolation Mode</label>
                <select
                  value={newTenantData.encryptionMode}
                  onChange={(e) => setNewTenantData({ ...newTenantData, encryptionMode: e.target.value as TenantOrg['encryptionMode'] })}
                  className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                >
                  <option value="BYOK Dedicated HSM">BYOK Dedicated HSM (Hardware Isolation)</option>
                  <option value="Dedicated FIPS Partition">Dedicated FIPS Partition</option>
                  <option value="RedFort Shared FIPS">RedFort Shared FIPS Partition</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsProvisionTenantModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-semibold flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Provision Tenant Partition</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: EDIT USER SCOPE MODAL --- */}
      {isEditUserModalOpen && selectedUserForEdit && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-[#38BDF8]" />
                <h3 className="text-base font-bold text-white">Edit User Scope & Role</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsEditUserModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateUserScope} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400">User Name & Email</label>
                <div className="text-sm font-semibold text-white">{selectedUserForEdit.name}</div>
                <div className="text-slate-400 font-mono">{selectedUserForEdit.email}</div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Assigned Enterprise Role</label>
                <select
                  value={selectedUserForEdit.roleName}
                  onChange={(e) => setSelectedUserForEdit({ ...selectedUserForEdit, roleName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                >
                  <option value="Platform Super Admin">Platform Super Admin</option>
                  <option value="GSOC Security Analyst">GSOC Security Analyst</option>
                  <option value="Chief Security Officer (CSO)">Chief Security Officer (CSO)</option>
                  <option value="Security Guard / Field Officer">Security Guard / Field Officer</option>
                  <option value="Compliance Auditor">Compliance Auditor</option>
                  <option value="IT Infrastructure Administrator">IT Infrastructure Administrator</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">MFA Enforcement Method</label>
                <select
                  value={selectedUserForEdit.mfaMethod}
                  onChange={(e) => setSelectedUserForEdit({ ...selectedUserForEdit, mfaMethod: e.target.value as UserPermissionRecord['mfaMethod'] })}
                  className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#F5762E]"
                >
                  <option value="FIDO2 Hardware Key">FIDO2 Hardware Key (Strict)</option>
                  <option value="Authenticator App">Authenticator App (TOTP)</option>
                  <option value="SMS Backup (Restricted)">SMS Backup (Restricted)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">IP Allowlist Restriction</label>
                <input
                  type="text"
                  value={selectedUserForEdit.ipRestriction}
                  onChange={(e) => setSelectedUserForEdit({ ...selectedUserForEdit, ipRestriction: e.target.value })}
                  className="w-full px-3 py-2 bg-[#111827] border border-[#1E293B] rounded-lg text-white font-mono focus:outline-none focus:border-[#F5762E]"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditUserModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#38BDF8] hover:bg-[#0284C7] text-white font-semibold flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Role & Scope</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: ESCALATION SIMULATOR MODAL --- */}
      {isEscalationSimulatorOpen && simulatedRule && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-[#F5762E]" />
                <h3 className="text-base font-bold text-white">Escalation SLA Simulator</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsEscalationSimulatorOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#111827] rounded-lg border border-[#1E293B]">
                <div className="text-[#F5762E] font-bold">{simulatedRule.title}</div>
                <div className="text-slate-400 text-[11px] mt-1">Simulated Trigger: {simulatedRule.triggerCondition}</div>
              </div>

              {/* Step Sequence */}
              <div className="space-y-2">
                <div className={`p-3 rounded-lg border transition-all ${
                  simStep >= 1 ? 'bg-[#151E33] border-[#38BDF8] text-white' : 'bg-[#111827] border-[#1E293B] text-slate-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#38BDF8]">Step 1: Incident Ingest (T=0s)</span>
                    {simStep >= 1 && <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />}
                  </div>
                  <p className="text-[11px] mt-1">{simulatedRule.actionTree.tier1}</p>
                </div>

                <div className={`p-3 rounded-lg border transition-all ${
                  simStep >= 2 ? 'bg-[#151E33] border-[#F5762E] text-white' : 'bg-[#111827] border-[#1E293B] text-slate-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#F5762E]">Step 2: Timeout Breach (T={simulatedRule.unackTimeoutSec}s)</span>
                    {simStep >= 2 && <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />}
                  </div>
                  <p className="text-[11px] mt-1">{simulatedRule.actionTree.tier2}</p>
                </div>

                <div className={`p-3 rounded-lg border transition-all ${
                  simStep >= 3 ? 'bg-[#151E33] border-rose-500 text-white' : 'bg-[#111827] border-[#1E293B] text-slate-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-400">Step 3: Executive Failover (T={simulatedRule.unackTimeoutSec * 2}s)</span>
                    {simStep >= 3 && <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />}
                  </div>
                  <p className="text-[11px] mt-1">{simulatedRule.actionTree.tier3}</p>
                </div>
              </div>

              {isSimulating ? (
                <div className="p-3 bg-[#111827] rounded-lg border border-[#38BDF8]/40 text-center text-[#38BDF8] flex items-center justify-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Simulating real-time dispatch timeline...</span>
                </div>
              ) : (
                <div className="p-3 bg-[#22C55E]/10 rounded-lg border border-[#22C55E]/30 text-center text-[#22C55E] flex items-center justify-center space-x-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Escalation Rule SLA Verified — 100% Delivery Rate</span>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEscalationSimulatorOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#F5762E] text-white font-semibold cursor-pointer"
                >
                  Close Simulator
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
