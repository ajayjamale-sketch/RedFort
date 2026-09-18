'use strict';
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  FileCheck2, 
  Hash, 
  Database, 
  Lock, 
  Scale, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  ExternalLink, 
  Copy, 
  Check, 
  RefreshCw, 
  Calendar, 
  FileText, 
  Eye, 
  Layers, 
  KeyRound, 
  Radio, 
  Shield, 
  UserCheck, 
  ArrowRight, 
  LogOut, 
  X, 
  Menu, 
  Sparkles,
  Server,
  Fingerprint,
  FileCode,
  ShieldAlert,
  ArrowUpRight,
  ChevronRight,
  SlidersHorizontal,
  FolderLock,
  Smartphone
} from 'lucide-react';
import Logo from '@/components/Logo';

export type AuditorNavTab = 'vault' | 'trail' | 'frameworks' | 'reports';

// --- DATA STRUCTURES ---

export interface EvidenceItem {
  id: string;
  title: string;
  frameworks: string[];
  controls: string[];
  category: 'Access Control' | 'Physical Security' | 'Encryption' | 'Incident Response' | 'Vulnerability Management';
  sourceSystem: string;
  collectedAt: string;
  cadence: string;
  sha256Hash: string;
  status: 'Verified' | 'Pending Review' | 'Flagged';
  campus: string;
  collectorAgent: string;
  fileSize: string;
  rawContent: string;
}

export interface AuditTrailEvent {
  blockHeight: number;
  timestamp: string;
  eventType: string;
  actor: string;
  actorRole: string;
  system: string;
  action: string;
  merkleLeaf: string;
  blockHash: string;
  verified: boolean;
}

export interface ControlItem {
  id: string;
  framework: string;
  code: string;
  title: string;
  description: string;
  status: 'Automated (Passing)' | 'Automated (Needs Review)' | 'Manual (Verified)';
  complianceScore: number;
  linkedEvidenceCount: number;
  lastTested: string;
  testFrequency: string;
}

// --- MOCK EVIDENCE VAULT DATA ---
export const INITIAL_EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: 'EVD-9041',
    title: 'AWS IAM Least Privilege & Zero-Trust Role Policies',
    frameworks: ['SOC 2 Type II', 'ISO 27001', 'NIST SP 800-53'],
    controls: ['SOC2-CC6.1', 'SOC2-CC6.3', 'ISO-A.9.2', 'NIST-AC-2'],
    category: 'Access Control',
    sourceSystem: 'AWS IAM & Okta SSO',
    collectedAt: '2026-09-18 19:30:14 UTC',
    cadence: 'Continuous (Every 1 hr)',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    status: 'Verified',
    campus: 'Global Cloud (US-East-1)',
    collectorAgent: 'AGENT-IAM-AUTO-01',
    fileSize: '48.2 KB',
    rawContent: JSON.stringify({
      version: '2026-09-18',
      statement: [
        { effect: 'Allow', action: ['kms:Decrypt', 's3:GetObject'], resource: 'arn:aws:s3:::redfort-secure-vault/*' },
        { effect: 'Deny', action: ['*'], condition: { Bool: { 'aws:MultiFactorAuthPresent': 'false' } } }
      ],
      mfaEnforcementRatio: '100.0%',
      rootAccountActiveKeys: 0,
      dormantAccounts30d: 0
    }, null, 2)
  },
  {
    id: 'EVD-9042',
    title: 'Turnstiles Anti-Tailgating & Badge Swipe Audit Log',
    frameworks: ['SOC 2 Type II', 'ISO 27001', 'NIST SP 800-53'],
    controls: ['SOC2-CC6.4', 'ISO-A.11.1', 'NIST-PE-3'],
    category: 'Physical Security',
    sourceSystem: 'RedFort Turnstile IoT Gate Controller v4.2',
    collectedAt: '2026-09-18 19:15:00 UTC',
    cadence: 'Continuous (Real-Time Stream)',
    sha256Hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    status: 'Verified',
    campus: 'Austin Global HQ',
    collectorAgent: 'AGENT-PHYS-GATEWAY-TX',
    fileSize: '124.6 KB',
    rawContent: JSON.stringify({
      auditInterval: '2026-09-18 00:00:00 - 19:00:00 UTC',
      totalSwipes: 1482,
      deniedAttempts: 4,
      tailgatingIncidentsDetected: 1,
      guardMusterOverrideCount: 0,
      biometricConfidenceAverage: '99.4%',
      allGatesNominal: true
    }, null, 2)
  },
  {
    id: 'EVD-9043',
    title: 'Electronic Key Locker Biometric Authorization Ledger',
    frameworks: ['ISO 27001', 'NIST SP 800-53', 'HIPAA'],
    controls: ['ISO-A.11.2', 'NIST-PE-3', 'HIPAA-164.312'],
    category: 'Physical Security',
    sourceSystem: 'SmartKey Master Locker Station Post-1',
    collectedAt: '2026-09-18 18:45:22 UTC',
    cadence: 'Daily Synchronized Snapshot',
    sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    status: 'Verified',
    campus: 'Austin Global HQ',
    collectorAgent: 'AGENT-KEY-VAULT-04',
    fileSize: '18.4 KB',
    rawContent: JSON.stringify({
      lockerId: 'LOCKER-TX-01',
      totalKeysTracked: 6,
      keysCurrentlyOut: 2,
      activeCheckouts: [
        { key: 'Master Server Cage Vault', officer: 'Officer Marcus Sterling', authMethod: 'FIDO2 + Biometric Palm', approvedBy: 'Helena Vance (CSO)' }
      ],
      unreturnedOverdueCount: 0,
      tamperSensorTrips: 0
    }, null, 2)
  },
  {
    id: 'EVD-9044',
    title: 'CCTV 4K AI Frame-Hash & 90-Day Retention Attestation',
    frameworks: ['SOC 2 Type II', 'ISO 27001', 'HIPAA'],
    controls: ['SOC2-CC6.6', 'ISO-A.11.1', 'HIPAA-164.312'],
    category: 'Physical Security',
    sourceSystem: 'Milestone XProtect / RedFort AI NVR Array',
    collectedAt: '2026-09-18 18:00:00 UTC',
    cadence: 'Hourly Verification',
    sha256Hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    status: 'Verified',
    campus: 'Frankfurt Edge Center',
    collectorAgent: 'AGENT-CCTV-VERIFIER-EU',
    fileSize: '82.1 KB',
    rawContent: JSON.stringify({
      nvrCluster: 'FRA-NVR-CL-01',
      camerasMonitored: 48,
      retentionPeriodGuaranteedDays: 90,
      actualRetentionDays: 94,
      frameIntegrityMerkleMatches: '100%',
      watermarkTamperAlerts: 0,
      storageEncryption: 'AES-256-XTS at Rest'
    }, null, 2)
  },
  {
    id: 'EVD-9045',
    title: 'AWS KMS & HSM Database Encryption Key 90-Day Rotation Proof',
    frameworks: ['SOC 2 Type II', 'ISO 27001', 'HIPAA', 'NIST SP 800-53'],
    controls: ['SOC2-CC6.6', 'SOC2-CC6.7', 'ISO-A.10.1', 'NIST-SC-12'],
    category: 'Encryption',
    sourceSystem: 'AWS KMS / FIPS 140-3 Hardware Security Module',
    collectedAt: '2026-09-18 17:10:00 UTC',
    cadence: 'Daily Audit',
    sha256Hash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    status: 'Verified',
    campus: 'Global Cloud Multi-Region',
    collectorAgent: 'AGENT-CRYPTO-AUDIT',
    fileSize: '34.9 KB',
    rawContent: JSON.stringify({
      kmsKeyId: 'arn:aws:kms:us-east-1:102938475610:key/redfort-customer-data-cmk',
      keySpec: 'SYMMETRIC_DEFAULT (AES-256-GCM)',
      automaticRotationEnabled: true,
      lastRotatedDate: '2026-08-15 03:12:44 UTC',
      nextScheduledRotation: '2026-11-15 03:12:44 UTC',
      fipsLevel: 'FIPS 140-3 Level 3'
    }, null, 2)
  },
  {
    id: 'EVD-9046',
    title: 'Automated SOAR Incident Runbook & MTTD/MTTR Performance',
    frameworks: ['SOC 2 Type II', 'ISO 27001', 'NIST SP 800-53'],
    controls: ['SOC2-CC7.2', 'SOC2-CC7.3', 'ISO-A.16.1', 'NIST-IR-4'],
    category: 'Incident Response',
    sourceSystem: 'RedFort SOAR Engine v3.8',
    collectedAt: '2026-09-18 16:30:19 UTC',
    cadence: 'Daily Aggregated Telemetry',
    sha256Hash: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    status: 'Verified',
    campus: 'Global GSOC',
    collectorAgent: 'AGENT-SOAR-METRICS',
    fileSize: '56.3 KB',
    rawContent: JSON.stringify({
      reportingWindow: '30 Days Rolling',
      totalIncidentsProcessed: 142,
      meanTimeToDetectMinutes: 1.8,
      meanTimeToRespondMinutes: 4.2,
      automatedContainmentRate: '88.4%',
      postIncidentReviewsCompleted: 142,
      complianceSlaBreaches: 0
    }, null, 2)
  },
  {
    id: 'EVD-9047',
    title: 'Quarterly External Penetration Test & Attestation of Remediation',
    frameworks: ['SOC 2 Type II', 'ISO 27001'],
    controls: ['SOC2-CC7.1', 'ISO-A.12.6', 'NIST-CA-8'],
    category: 'Vulnerability Management',
    sourceSystem: 'Bishop Fox / RedFort Security Engineering',
    collectedAt: '2026-09-01 09:00:00 UTC',
    cadence: 'Quarterly',
    sha256Hash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    status: 'Verified',
    campus: 'All Sites & Cloud Infrastructure',
    collectorAgent: 'MANUAL-AUDIT-SUBMISSION',
    fileSize: '2.4 MB (PDF Attestation)',
    rawContent: JSON.stringify({
      assessmentFirm: 'Bishop Fox Security Consulting',
      period: 'Q3 2026',
      criticalFindingsDiscovered: 0,
      highFindingsDiscovered: 2,
      highFindingsRemediatedWithin7Days: 2,
      retestStatus: 'All High Findings Verified Closed & Clean',
      attestationLetterSignedDate: '2026-09-01'
    }, null, 2)
  }
];

// --- MOCK IMMUTABLE AUDIT TRAIL DATA ---
export const INITIAL_AUDIT_TRAIL: AuditTrailEvent[] = [
  {
    blockHeight: 894210,
    timestamp: '2026-09-18 19:30:14',
    eventType: 'EVIDENCE_ANCHOR',
    actor: 'AGENT-IAM-AUTO-01',
    actorRole: 'Automated Collector',
    system: 'AWS IAM Cloud Watcher',
    action: 'Anchor SHA-256 digest of IAM zero-trust policy EVD-9041 into ledger',
    merkleLeaf: '0x8f2a4c10e82937bb4510fa48d7c2e118921a9c80',
    blockHash: '0x3a9f029b4e12c4518a203948e71b2930485920a1bc8394817293847561029384',
    verified: true
  },
  {
    blockHeight: 894209,
    timestamp: '2026-09-18 19:15:00',
    eventType: 'PHYSICAL_ENTRY_SYNC',
    actor: 'AGENT-PHYS-GATEWAY-TX',
    actorRole: 'IoT Gate Collector',
    system: 'Austin Campus Turnstile Array',
    action: 'Commit hourly badge swipe batch (1,482 entries) with 0 tampering',
    merkleLeaf: '0x1b449f82ca11029384756a9b8c7d6e5f4a3b2c1d',
    blockHash: '0x9948271029384756102938475610293847561029384756102938475610293847',
    verified: true
  },
  {
    blockHeight: 894208,
    timestamp: '2026-09-18 18:45:22',
    eventType: 'KEY_VAULT_TRANSACTION',
    actor: 'Officer Marcus Sterling',
    actorRole: 'Field Officer #048',
    system: 'SmartKey Master Locker',
    action: 'Check out Server Vault Key with FIDO2 Biometric Palm Verification',
    merkleLeaf: '0x77c29a8341b09283746510293847561029384756',
    blockHash: '0x1029384756102938475610293847561029384756102938475610293847561029',
    verified: true
  },
  {
    blockHeight: 894207,
    timestamp: '2026-09-18 18:00:00',
    eventType: 'CCTV_HASH_BATCH',
    actor: 'AGENT-CCTV-VERIFIER-EU',
    actorRole: 'Cryptographic Engine',
    system: 'Frankfurt AI NVR Cluster',
    action: 'Publish video frame-hash Merkle Tree Root for 48 active 4K streams',
    merkleLeaf: '0x55d0192837465102938475610293847561029384',
    blockHash: '0x8475610293847561029384756102938475610293847561029384756102938475',
    verified: true
  },
  {
    blockHeight: 894206,
    timestamp: '2026-09-18 17:10:00',
    eventType: 'KMS_KEY_ROTATION',
    actor: 'AWS KMS HSM Core',
    actorRole: 'Cryptographic Subsystem',
    system: 'AWS KMS Multi-Region',
    action: 'Verify FIPS 140-3 Hardware Key Lifecycle and 90-day rotation proof',
    merkleLeaf: '0x44a9182736451029384756102938475610293847',
    blockHash: '0x7561029384756102938475610293847561029384756102938475610293847561',
    verified: true
  },
  {
    blockHeight: 894205,
    timestamp: '2026-09-18 16:30:19',
    eventType: 'SOAR_PLAYBOOK_EXEC',
    actor: 'SOAR Automation Daemon',
    actorRole: 'Security Orchestration',
    system: 'RedFort SOAR Engine',
    action: 'Execute automated quarantine on unauthorized edge endpoint in 1.4s',
    merkleLeaf: '0x33b8271635410293847561029384756102938475',
    blockHash: '0x6102938475610293847561029384756102938475610293847561029384756102',
    verified: true
  }
];

// --- MOCK REGULATORY FRAMEWORKS & CONTROLS ---
export const INITIAL_CONTROLS: ControlItem[] = [
  {
    id: 'CTRL-SOC2-CC6.1',
    framework: 'SOC 2 Type II',
    code: 'CC6.1',
    title: 'Logical Access & Multi-Factor Authentication',
    description: 'The entity implements logical access security software, infrastructure, and architectures over protected information assets.',
    status: 'Automated (Passing)',
    complianceScore: 100,
    linkedEvidenceCount: 8,
    lastTested: '12 mins ago',
    testFrequency: 'Continuous (Hourly)'
  },
  {
    id: 'CTRL-SOC2-CC6.4',
    framework: 'SOC 2 Type II',
    code: 'CC6.4',
    title: 'Physical Access Restrictions to Secure Facilities',
    description: 'Physical access to facilities housing protected information assets is restricted to authorized personnel with biometric/card badges.',
    status: 'Automated (Passing)',
    complianceScore: 100,
    linkedEvidenceCount: 6,
    lastTested: '15 mins ago',
    testFrequency: 'Continuous (Real-Time)'
  },
  {
    id: 'CTRL-SOC2-CC6.6',
    framework: 'SOC 2 Type II',
    code: 'CC6.6',
    title: 'Data Transmission & Storage Encryption',
    description: 'Data at rest in databases, backups, and data in transit across public networks are protected with industry-standard cryptographic algorithms.',
    status: 'Automated (Passing)',
    complianceScore: 100,
    linkedEvidenceCount: 5,
    lastTested: '45 mins ago',
    testFrequency: 'Continuous (Daily)'
  },
  {
    id: 'CTRL-SOC2-CC7.2',
    framework: 'SOC 2 Type II',
    code: 'CC7.2',
    title: 'Security Incident Detection & Monitoring',
    description: 'The entity monitors system components and physical security infrastructure for anomalies and security incidents using automated telemetry.',
    status: 'Automated (Passing)',
    complianceScore: 99.4,
    linkedEvidenceCount: 7,
    lastTested: '1 hour ago',
    testFrequency: 'Continuous (Hourly)'
  },
  {
    id: 'CTRL-ISO-A.9.2',
    framework: 'ISO/IEC 27001:2022',
    code: 'A.9.2',
    title: 'User Access Provisioning & Revocation',
    description: 'A formal user registration and de-registration process is implemented to enable assignment of access rights.',
    status: 'Automated (Passing)',
    complianceScore: 100,
    linkedEvidenceCount: 4,
    lastTested: '30 mins ago',
    testFrequency: 'Continuous (Hourly)'
  },
  {
    id: 'CTRL-ISO-A.11.1',
    framework: 'ISO/IEC 27001:2022',
    code: 'A.11.1',
    title: 'Physical Security Perimeter & Entry Controls',
    description: 'Security perimeters and controlled turnstile entry points protect areas that contain sensitive information and information processing facilities.',
    status: 'Automated (Passing)',
    complianceScore: 100,
    linkedEvidenceCount: 9,
    lastTested: '10 mins ago',
    testFrequency: 'Continuous (Real-Time)'
  },
  {
    id: 'CTRL-NIST-AC-2',
    framework: 'NIST SP 800-53 Rev. 5',
    code: 'AC-2',
    title: 'Account Management & Automated Inactivity Lock',
    description: 'Identifies and manages system accounts, establishes group accounts, and disables accounts after periods of inactivity.',
    status: 'Automated (Passing)',
    complianceScore: 98.8,
    linkedEvidenceCount: 6,
    lastTested: '2 hours ago',
    testFrequency: 'Continuous (Daily)'
  },
  {
    id: 'CTRL-HIPAA-164.312',
    framework: 'HIPAA Security Rule',
    code: '§ 164.312',
    title: 'Technical Safeguards & Immutable Audit Controls',
    description: 'Implement hardware, software, and procedural mechanisms that record and examine activity in information systems containing electronic protected health info.',
    status: 'Automated (Passing)',
    complianceScore: 100,
    linkedEvidenceCount: 5,
    lastTested: '25 mins ago',
    testFrequency: 'Continuous (Hourly)'
  }
];

interface AuditorDashboardViewProps {
  initialTab?: AuditorNavTab;
}

export default function AuditorDashboardView({ initialTab = 'vault' }: AuditorDashboardViewProps) {
  const [activeNav, setActiveNav] = useState<AuditorNavTab>(initialTab);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Filter States for Evidence Vault
  const [evidenceItems] = useState<EvidenceItem[]>(INITIAL_EVIDENCE_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFrameworkFilter, setSelectedFrameworkFilter] = useState<string>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedCampusFilter, setSelectedCampusFilter] = useState<string>('All');

  // Inspector Modal State
  const [inspectingEvidence, setInspectingEvidence] = useState<EvidenceItem | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  // Cryptographic Verifier State
  const [verifierInputHash, setVerifierInputHash] = useState(
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  );
  const [verificationResult, setVerificationResult] = useState<{
    valid: boolean;
    block: number;
    merkleRoot: string;
    proofChain: string[];
    timestamp: string;
  } | null>({
    valid: true,
    block: 894210,
    merkleRoot: '0x9948271029384756102938475610293847561029384756102938475610293847',
    proofChain: [
      'Leaf 0x8f2a4c10 (Evidence EVD-9041)',
      'Intermediate Node 0x7c91a029',
      'Merkle Sub-Tree Root 0x3a9f029b',
      'Anchored Block Hash #894210 (Immutable)'
    ],
    timestamp: '2026-09-18 19:30:14 UTC'
  });
  const [isSimulatingTamper, setIsSimulatingTamper] = useState(false);

  // Audit Binder Generation Modal
  const [binderModalOpen, setBinderModalOpen] = useState(false);
  const [binderScopeFramework, setBinderScopeFramework] = useState('All Frameworks (SOC 2, ISO 27001, NIST)');
  const [binderAuditFirm, setBinderAuditFirm] = useState('Deloitte & Touche LLP');
  const [binderGenerating, setBinderGenerating] = useState(false);
  const [binderGeneratedBundle, setBinderGeneratedBundle] = useState<{
    packageId: string;
    filename: string;
    size: string;
    merkleManifest: string;
    timestamp: string;
  } | null>(null);

  // Filter Evidence items
  const filteredEvidence = useMemo(() => {
    return evidenceItems.filter(item => {
      const matchSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sourceSystem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.controls.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchFramework = selectedFrameworkFilter === 'All' || item.frameworks.includes(selectedFrameworkFilter);
      const matchCategory = selectedCategoryFilter === 'All' || item.category === selectedCategoryFilter;
      const matchCampus = selectedCampusFilter === 'All' || item.campus.includes(selectedCampusFilter);

      return matchSearch && matchFramework && matchCategory && matchCampus;
    });
  }, [evidenceItems, searchQuery, selectedFrameworkFilter, selectedCategoryFilter, selectedCampusFilter]);

  // Run Merkle Hash Verification
  const handleVerifyHash = (customHash?: string) => {
    const hashToTest = customHash || verifierInputHash;
    if (!hashToTest.trim()) return;

    if (isSimulatingTamper) {
      setVerificationResult({
        valid: false,
        block: 894210,
        merkleRoot: 'MISMATCH - 0x0000000000000000000000000000000000000000000000000000000000000000',
        proofChain: [
          'Leaf Modified (1 Bit Altered)',
          'Intermediate Node Checksum Invalidation',
          'Merkle Root Failure (Cryptographic Signature Rejected)'
        ],
        timestamp: 'Just now'
      });
      setActionNotice('CRYPTO ALERT: Hash verification failed! Simulated tampering detected.');
    } else {
      setVerificationResult({
        valid: true,
        block: 894210,
        merkleRoot: '0x9948271029384756102938475610293847561029384756102938475610293847',
        proofChain: [
          `Leaf Hash ${hashToTest.slice(0, 10)}... (Verified)`,
          'Intermediate Node 0x7c91a029 (Matched)',
          'Merkle Sub-Tree Root 0x3a9f029b (Anchored)',
          'Ledger Cryptographic Block #894210 (100% Immutable)'
        ],
        timestamp: 'Just now'
      });
      setActionNotice('Cryptographic proof valid. Immutability verified against Merkle root.');
    }
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Copy Hash Helper
  const handleCopyHash = (text: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  // Generate Binder Helper
  const handleGenerateBinder = () => {
    setBinderGenerating(true);
    setTimeout(() => {
      setBinderGenerating(false);
      const pkgId = `AUD-PKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setBinderGeneratedBundle({
        packageId: pkgId,
        filename: `RedFort_Continuous_Audit_Binder_Q3_2026_${pkgId}.zip`,
        size: '14.8 MB',
        merkleManifest: '0xfa89c01289475610293847561029384756102938475610293847561029384756',
        timestamp: new Date().toISOString()
      });
      setActionNotice(`Audit Binder ${pkgId} certified and packaged with Merkle proof manifest.`);
      setTimeout(() => setActionNotice(null), 4000);
    }, 1800);
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
    { id: 'vault', label: 'Evidence Vault', href: '/dashboard/auditor/evidence', icon: FolderLock, badge: `${evidenceItems.length} Items`, badgeColor: 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30' },
    { id: 'trail', label: 'Audit Ledger', href: '/dashboard/auditor/trail', icon: Hash, badge: 'Live' },
    { id: 'frameworks', label: 'Frameworks', href: '/dashboard/auditor/frameworks', icon: Scale, badge: '4 Stds' },
    { id: 'reports', label: 'Audit Binder', href: '/dashboard/auditor/reports', icon: Download, badge: 'Ready' }
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
                AUDITOR
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

          {/* Regulatory Navigation Menu */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
              Regulatory Assurance
            </div>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = activeNav === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveNav(item.id as AuditorNavTab);
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

          {/* Quick Action: Generate Signed Audit Binder */}
          <div className="space-y-2 pt-2 border-t border-[#1E293B]">
            <div className="px-2 text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
              Attestation Export
            </div>

            <button
              type="button"
              onClick={() => {
                setBinderModalOpen(true);
                setMobileSidebarOpen(false);
              }}
              className="w-full px-3 py-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] hover:border-[#818CF8]/50 text-slate-200 hover:text-white text-xs font-medium flex items-center justify-between transition-colors cursor-pointer whitespace-nowrap"
            >
              <div className="flex items-center space-x-2 min-w-0 pr-2">
                <Download className="w-3.5 h-3.5 shrink-0 text-[#818CF8]" />
                <span className="truncate">Generate Binder</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            </button>
          </div>

        </div>

        {/* Sidebar Footer: Auditor Profile & Logout */}
        <div className="pt-4 border-t border-[#1E293B] space-y-3">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#818CF8] to-[#C084FC] text-slate-950 font-bold text-xs flex items-center justify-center font-mono ring-2 ring-[#818CF8]/30 shrink-0">
              EA
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-white truncate">Evelyn Archer, CISA</div>
              <div className="text-[10px] text-[#818CF8] truncate font-medium">Lead Auditor · Deloitte</div>
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

      {/* 2. Main Regulatory Viewport */}
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
              <ShieldCheck className="w-4 h-4 text-[#818CF8]" />
              <span className="hidden sm:inline">Compliance & Continuous Audit Vault</span>
              <span className="sm:hidden">Auditor Console</span>
            </h1>

            <span className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[11px] text-[#22C55E] font-medium whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span>Ledger Synchronized</span>
            </span>
          </div>

          {/* Right: Quick Verification Metrics & Live Hash Check */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-lg bg-[#151E33] border border-[#1E293B] text-xs font-mono">
              <span className="text-slate-400">Merkle Root:</span>
              <span className="text-[#818CF8] font-bold">0x9948...3847</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
            </div>

            <button
              type="button"
              onClick={() => setActiveNav('trail')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#818CF8] hover:bg-[#6366F1] text-white text-xs font-semibold shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <Fingerprint className="w-3.5 h-3.5" />
              <span>Verify Hashes</span>
            </button>

            <button
              type="button"
              onClick={() => setBinderModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] text-slate-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-[#818CF8]" />
              <span className="hidden sm:inline">Export Package</span>
            </button>
          </div>

        </header>

        {/* Action Notice Banner */}
        {actionNotice && (
          <div className="bg-[#818CF8]/20 border-b border-[#818CF8]/40 px-4 py-2 flex items-center justify-between text-xs text-white shrink-0 animate-in fade-in duration-200">
            <div className="flex items-center space-x-2 font-mono">
              <Sparkles className="w-4 h-4 text-[#818CF8]" />
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
          {/* TAB 1: EVIDENCE VAULT & AUTOMATED ARTIFACTS               */}
          {/* ========================================================= */}
          {activeNav === 'vault' && (
            <div className="space-y-6">
              
              {/* Top Banner KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-3 sm:p-4 space-y-1">
                  <div className="text-[10px] sm:text-xs font-medium text-slate-400">Total Evidence Artifacts</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white">482</div>
                  <div className="text-[10px] text-[#22C55E] flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>100% Cryptographically Anchored</span>
                  </div>
                </div>

                <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-3 sm:p-4 space-y-1">
                  <div className="text-[10px] sm:text-xs font-medium text-slate-400">Continuous Auto-Collectors</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#818CF8]">24 / 24</div>
                  <div className="text-[10px] text-slate-400">Sync cadence: Hourly & Real-Time</div>
                </div>

                <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-3 sm:p-4 space-y-1">
                  <div className="text-[10px] sm:text-xs font-medium text-slate-400">SOC 2 Controls Mapped</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#22C55E]">64 / 64 (100%)</div>
                  <div className="text-[10px] text-[#22C55E]">Clean opinion ready</div>
                </div>

                <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-3 sm:p-4 space-y-1">
                  <div className="text-[10px] sm:text-xs font-medium text-slate-400">ISO 27001 Controls</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#38BDF8]">114 / 114 (100%)</div>
                  <div className="text-[10px] text-slate-400">Annex A verification verified</div>
                </div>
              </div>

              {/* Filter & Search Toolbar */}
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by artifact title, ID, control (e.g. CC6.1, A.11.1), or system..."
                    className="w-full bg-[#151E33] border border-[#1E293B] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#818CF8]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center space-x-1 bg-[#151E33] border border-[#1E293B] rounded-lg px-2.5 py-1.5 text-xs">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={selectedFrameworkFilter}
                      onChange={(e) => setSelectedFrameworkFilter(e.target.value)}
                      className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="All" className="bg-[#0E1526]">All Frameworks</option>
                      <option value="SOC 2 Type II" className="bg-[#0E1526]">SOC 2 Type II</option>
                      <option value="ISO 27001" className="bg-[#0E1526]">ISO 27001</option>
                      <option value="NIST SP 800-53" className="bg-[#0E1526]">NIST SP 800-53</option>
                      <option value="HIPAA" className="bg-[#0E1526]">HIPAA</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-1 bg-[#151E33] border border-[#1E293B] rounded-lg px-2.5 py-1.5 text-xs">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={selectedCategoryFilter}
                      onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                      className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="All" className="bg-[#0E1526]">All Categories</option>
                      <option value="Access Control" className="bg-[#0E1526]">Access Control</option>
                      <option value="Physical Security" className="bg-[#0E1526]">Physical Security</option>
                      <option value="Encryption" className="bg-[#0E1526]">Encryption</option>
                      <option value="Incident Response" className="bg-[#0E1526]">Incident Response</option>
                      <option value="Vulnerability Management" className="bg-[#0E1526]">Vulnerability Mgmt</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedFrameworkFilter('All');
                      setSelectedCategoryFilter('All');
                      setSelectedCampusFilter('All');
                    }}
                    className="p-2 rounded-lg bg-[#151E33] hover:bg-[#1E293B] text-slate-400 hover:text-white border border-[#1E293B] text-xs transition-colors cursor-pointer"
                    title="Reset Filters"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Evidence Artifacts Table */}
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl overflow-hidden shadow-lg">
                <div className="px-4 py-3 border-b border-[#1E293B] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FolderLock className="w-4 h-4 text-[#818CF8]" />
                    <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Immutable Evidence Repository ({filteredEvidence.length} Matching Items)
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Auto-Anchored Every 60s
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#151E33]/70 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1E293B]">
                      <tr>
                        <th className="py-2.5 px-4">Artifact ID & Title</th>
                        <th className="py-2.5 px-3">Frameworks & Controls</th>
                        <th className="py-2.5 px-3">Source & Scope</th>
                        <th className="py-2.5 px-3">Collection Cadence</th>
                        <th className="py-2.5 px-3">SHA-256 Checksum</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {filteredEvidence.map((item) => (
                        <tr key={item.id} className="hover:bg-[#151E33]/40 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-start space-x-2">
                              <FileCode className="w-4 h-4 text-[#818CF8] shrink-0 mt-0.5" />
                              <div>
                                <div className="font-semibold text-white hover:text-[#818CF8] transition-colors cursor-pointer" onClick={() => setInspectingEvidence(item)}>
                                  {item.title}
                                </div>
                                <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-2 mt-0.5">
                                  <span className="text-[#818CF8] font-bold">{item.id}</span>
                                  <span>·</span>
                                  <span>{item.fileSize}</span>
                                  <span>·</span>
                                  <span>{item.category}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-3">
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {item.controls.slice(0, 3).map((ctrl, i) => (
                                <span key={i} className="text-[9px] font-mono bg-[#1E293B] text-slate-200 px-1.5 py-0.5 rounded border border-slate-700">
                                  {ctrl}
                                </span>
                              ))}
                              {item.controls.length > 3 && (
                                <span className="text-[9px] font-mono text-slate-400">+{item.controls.length - 3}</span>
                              )}
                            </div>
                          </td>

                          <td className="py-3 px-3">
                            <div className="text-white font-medium">{item.sourceSystem}</div>
                            <div className="text-[10px] text-slate-400">{item.campus}</div>
                          </td>

                          <td className="py-3 px-3 font-mono text-[11px]">
                            <div className="text-slate-300">{item.cadence}</div>
                            <div className="text-[10px] text-slate-400">{item.collectedAt}</div>
                          </td>

                          <td className="py-3 px-3 font-mono text-[11px]">
                            <button
                              type="button"
                              onClick={() => {
                                setVerifierInputHash(item.sha256Hash);
                                setActiveNav('trail');
                                handleVerifyHash(item.sha256Hash);
                              }}
                              className="text-left font-mono text-[#818CF8] hover:underline flex items-center space-x-1 group"
                              title="Click to verify this SHA-256 hash in Immutable Audit Trail"
                            >
                              <span>{item.sha256Hash.slice(0, 8)}...{item.sha256Hash.slice(-6)}</span>
                              <ExternalLink className="w-3 h-3 text-[#818CF8] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          </td>

                          <td className="py-3 px-3">
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Verified</span>
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setInspectingEvidence(item)}
                              className="px-2.5 py-1.5 rounded bg-[#151E33] hover:bg-[#818CF8] text-slate-200 hover:text-white text-[11px] font-semibold transition-colors cursor-pointer inline-flex items-center space-x-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Inspect</span>
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
          {/* TAB 2: IMMUTABLE AUDIT TRAIL & MERKLE TREE VERIFIER       */}
          {/* ========================================================= */}
          {activeNav === 'trail' && (
            <div className="space-y-6">
              
              {/* Interactive Cryptographic Hash Verifier Tool */}
              <div className="bg-[#0E1526] border border-[#818CF8]/40 rounded-xl p-4 sm:p-6 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E293B] pb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-lg bg-[#818CF8]/10 border border-[#818CF8]/30">
                      <Fingerprint className="w-5 h-5 text-[#818CF8]" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-white">
                        Merkle Root & SHA-256 Ledger Immutability Verifier
                      </h2>
                      <p className="text-xs text-slate-400">
                        Cryptographically prove that an evidence artifact or audit log has not been tampered with since creation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSimulatingTamper(!isSimulatingTamper);
                        setActionNotice(isSimulatingTamper ? 'Normal cryptographic mode restored.' : 'SIMULATION MODE: Injecting 1-bit tampering payload to demonstrate instant detection.');
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                        isSimulatingTamper
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-[#151E33] border-[#1E293B] text-slate-300 hover:text-white'
                      }`}
                    >
                      <AlertTriangle className={`w-3.5 h-3.5 ${isSimulatingTamper ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
                      <span>{isSimulatingTamper ? 'Tamper Simulation: ON' : 'Simulate 1-Bit Tamper'}</span>
                    </button>
                  </div>
                </div>

                {/* Input Field for Hash */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span>Input SHA-256 Artifact / Block Checksum:</span>
                    <span className="text-[10px] font-mono text-slate-400">Standard 256-Bit Hexadecimal Digest</span>
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      value={verifierInputHash}
                      onChange={(e) => setVerifierInputHash(e.target.value)}
                      placeholder="Paste 64-character SHA-256 hash (e.g. e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b...)"
                      className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-lg px-3 py-2 font-mono text-xs text-white focus:outline-none focus:border-[#818CF8]"
                    />
                    <button
                      type="button"
                      onClick={() => handleVerifyHash()}
                      className="px-4 py-2 rounded-lg bg-[#818CF8] hover:bg-[#6366F1] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Run Proof Check</span>
                    </button>
                  </div>
                </div>

                {/* Verification Results Panel */}
                {verificationResult && (
                  <div className={`p-4 rounded-xl border ${
                    verificationResult.valid
                      ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-slate-200'
                      : 'bg-[#EF4444]/10 border-[#EF4444]/40 text-red-200'
                  }`}>
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                      <div className="flex items-center space-x-2">
                        {verificationResult.valid ? (
                          <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                        )}
                        <span className={`text-xs sm:text-sm font-bold ${
                          verificationResult.valid ? 'text-[#22C55E]' : 'text-[#EF4444]'
                        }`}>
                          {verificationResult.valid
                            ? 'IMMUTABILITY PROVEN: Valid Cryptographic Proof (Merkle Root Matched)'
                            : 'TAMPER ALERT: Cryptographic Proof Failed (Root Hash Invalidation)'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        Evaluated {verificationResult.timestamp}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Anchored Merkle Root:</div>
                        <div className="text-white break-all mt-0.5 bg-black/30 p-2 rounded border border-white/5">
                          {verificationResult.merkleRoot}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Proof Verification Chain:</div>
                        <div className="space-y-1 mt-0.5 bg-black/30 p-2 rounded border border-white/5">
                          {verificationResult.proofChain.map((step, idx) => (
                            <div key={idx} className="flex items-center space-x-1 text-[11px]">
                              <ChevronRight className="w-3 h-3 text-[#818CF8]" />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Immutable Audit Trail Ledger */}
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl overflow-hidden shadow-lg space-y-0">
                <div className="px-4 py-3 border-b border-[#1E293B] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-[#818CF8]" />
                    <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Immutable Ledger Entries (Block Height #894,205 — #894,210)
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono text-[#22C55E] flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping"></span>
                    <span>Consensus Synchronized</span>
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#151E33]/70 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1E293B]">
                      <tr>
                        <th className="py-2.5 px-4">Block #</th>
                        <th className="py-2.5 px-3">Timestamp (UTC)</th>
                        <th className="py-2.5 px-3">Event Type</th>
                        <th className="py-2.5 px-3">Actor / Subsystem</th>
                        <th className="py-2.5 px-4">Audit Action & Proof Detail</th>
                        <th className="py-2.5 px-3">Merkle Leaf</th>
                        <th className="py-2.5 px-4 text-right">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {INITIAL_AUDIT_TRAIL.map((evt) => (
                        <tr key={evt.blockHeight} className="hover:bg-[#151E33]/40 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-[#818CF8]">
                            #{evt.blockHeight}
                          </td>

                          <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                            {evt.timestamp}
                          </td>

                          <td className="py-3 px-3">
                            <span className="text-[10px] font-mono font-bold bg-[#1E293B] text-slate-200 px-2 py-0.5 rounded border border-slate-700">
                              {evt.eventType}
                            </span>
                          </td>

                          <td className="py-3 px-3">
                            <div className="font-semibold text-white">{evt.actor}</div>
                            <div className="text-[10px] text-slate-400">{evt.actorRole}</div>
                          </td>

                          <td className="py-3 px-4 max-w-sm">
                            <div className="text-slate-200 font-medium">{evt.action}</div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                              System: {evt.system}
                            </div>
                          </td>

                          <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                            {evt.merkleLeaf.slice(0, 10)}...
                          </td>

                          <td className="py-3 px-4 text-right">
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Anchored</span>
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
          {/* TAB 3: REGULATORY FRAMEWORKS & CONTROL MATRIX             */}
          {/* ========================================================= */}
          {activeNav === 'frameworks' && (
            <div className="space-y-6">
              
              {/* Framework Compliance Score Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">SOC 2 Type II</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">100% Passing</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">99.4%</div>
                  <div className="w-full bg-[#151E33] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#22C55E] h-full rounded-full w-[99.4%]"></div>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between">
                    <span>64 of 64 Controls Tested</span>
                    <span>Next Audit: Nov 2026</span>
                  </div>
                </div>

                <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">ISO/IEC 27001</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">Certified</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">99.8%</div>
                  <div className="w-full bg-[#151E33] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#38BDF8] h-full rounded-full w-[99.8%]"></div>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between">
                    <span>114 of 114 Controls Tested</span>
                    <span>Next Audit: Oct 2026</span>
                  </div>
                </div>

                <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">NIST SP 800-53</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">Compliant</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">98.2%</div>
                  <div className="w-full bg-[#151E33] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#818CF8] h-full rounded-full w-[98.2%]"></div>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between">
                    <span>168 of 172 Controls Tested</span>
                    <span>Next Audit: Dec 2026</span>
                  </div>
                </div>

                <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">HIPAA Security</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30">Verified</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">100.0%</div>
                  <div className="w-full bg-[#151E33] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#F5762E] h-full rounded-full w-full"></div>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between">
                    <span>42 of 42 Controls Tested</span>
                    <span>Next Audit: Aug 2026</span>
                  </div>
                </div>

              </div>

              {/* Controls Mapping Matrix Table */}
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl overflow-hidden shadow-lg">
                <div className="px-4 py-3 border-b border-[#1E293B] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Scale className="w-4 h-4 text-[#818CF8]" />
                    <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Regulatory Control Mapping & Continuous Testing Matrix
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    8 Key Controls Monitored Live
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#151E33]/70 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-[#1E293B]">
                      <tr>
                        <th className="py-2.5 px-4">Framework & Code</th>
                        <th className="py-2.5 px-3">Control Title & Requirement</th>
                        <th className="py-2.5 px-3">Automated Test Cadence</th>
                        <th className="py-2.5 px-3">Linked Evidence</th>
                        <th className="py-2.5 px-3">Score</th>
                        <th className="py-2.5 px-4 text-right">Testing Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                      {INITIAL_CONTROLS.map((ctrl) => (
                        <tr key={ctrl.id} className="hover:bg-[#151E33]/40 transition-colors">
                          <td className="py-3 px-4">
                            <span className="text-xs font-mono font-bold text-[#818CF8] bg-[#818CF8]/10 px-2 py-0.5 rounded border border-[#818CF8]/30">
                              {ctrl.code}
                            </span>
                            <div className="text-[10px] text-slate-400 mt-1">{ctrl.framework}</div>
                          </td>

                          <td className="py-3 px-3 max-w-md">
                            <div className="font-semibold text-white">{ctrl.title}</div>
                            <div className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                              {ctrl.description}
                            </div>
                          </td>

                          <td className="py-3 px-3 font-mono text-[11px]">
                            <div className="text-slate-200">{ctrl.testFrequency}</div>
                            <div className="text-[10px] text-slate-500">Last: {ctrl.lastTested}</div>
                          </td>

                          <td className="py-3 px-3">
                            <span className="text-xs font-mono font-bold text-white bg-[#151E33] px-2 py-0.5 rounded border border-[#1E293B]">
                              {ctrl.linkedEvidenceCount} Artifacts
                            </span>
                          </td>

                          <td className="py-3 px-3 font-mono font-bold text-[#22C55E]">
                            {ctrl.complianceScore}%
                          </td>

                          <td className="py-3 px-4 text-right">
                            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{ctrl.status}</span>
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
          {/* TAB 4: AUDIT BINDER GENERATOR & EXPORT PACKETS            */}
          {/* ========================================================= */}
          {activeNav === 'reports' && (
            <div className="space-y-6">
              
              <div className="bg-[#0E1526] border border-[#1E293B] rounded-xl p-4 sm:p-6 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-[#818CF8]/10 border border-[#818CF8]/30">
                      <Download className="w-6 h-6 text-[#818CF8]" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white">
                        Certified Continuous Audit Binder Generator
                      </h2>
                      <p className="text-xs text-slate-400">
                        Export cryptographically signed evidence packets, Merkle tree manifests, and control testing workpapers.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGenerateBinder}
                    disabled={binderGenerating}
                    className="px-5 py-2.5 rounded-lg bg-[#818CF8] hover:bg-[#6366F1] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {binderGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Compiling Cryptographic Binder...</span>
                      </>
                    ) : (
                      <>
                        <FolderLock className="w-4 h-4" />
                        <span>Compile & Certify Binder (Q3 2026)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Configuration Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#151E33] border border-[#1E293B] rounded-xl p-4 space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Auditing Firm / Recipient:</label>
                    <select
                      value={binderAuditFirm}
                      onChange={(e) => setBinderAuditFirm(e.target.value)}
                      className="w-full bg-[#0E1526] border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#818CF8] cursor-pointer"
                    >
                      <option value="Deloitte & Touche LLP">Deloitte & Touche LLP</option>
                      <option value="Ernst & Young (EY)">Ernst & Young (EY)</option>
                      <option value="PwC Assurance">PwC Assurance</option>
                      <option value="KPMG Advisory">KPMG Advisory</option>
                      <option value="Schellman Compliance">Schellman & Company</option>
                      <option value="Coalfire Systems">Coalfire Systems</option>
                    </select>
                  </div>

                  <div className="bg-[#151E33] border border-[#1E293B] rounded-xl p-4 space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Framework Coverage:</label>
                    <select
                      value={binderScopeFramework}
                      onChange={(e) => setBinderScopeFramework(e.target.value)}
                      className="w-full bg-[#0E1526] border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#818CF8] cursor-pointer"
                    >
                      <option value="All Frameworks (SOC 2, ISO 27001, NIST)">Full Package (SOC 2, ISO 27001, NIST, HIPAA)</option>
                      <option value="SOC 2 Type II Only">SOC 2 Type II (Security & Availability)</option>
                      <option value="ISO/IEC 27001 Only">ISO/IEC 27001:2022 ISMS</option>
                      <option value="NIST SP 800-53 Only">NIST SP 800-53 Federal Scope</option>
                    </select>
                  </div>

                  <div className="bg-[#151E33] border border-[#1E293B] rounded-xl p-4 space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Audit Period Scope:</label>
                    <div className="px-3 py-2 rounded-lg bg-[#0E1526] border border-[#1E293B] text-xs font-mono text-white flex items-center justify-between">
                      <span>2026-07-01 to 2026-09-30 (Q3)</span>
                      <Calendar className="w-3.5 h-3.5 text-[#818CF8]" />
                    </div>
                  </div>
                </div>

                {/* Generated Bundle Presentation Card */}
                {binderGeneratedBundle && (
                  <div className="bg-[#22C55E]/10 border border-[#22C55E]/40 rounded-xl p-4 sm:p-5 space-y-4 animate-in fade-in duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#22C55E]/20">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                        <div>
                          <span className="text-sm font-bold text-white">
                            Certified Audit Binder Ready for Distribution
                          </span>
                          <div className="text-xs text-[#22C55E] font-mono">
                            Package ID: {binderGeneratedBundle.packageId} · {binderGeneratedBundle.size}
                          </div>
                        </div>
                      </div>

                      <a
                        href="#download"
                        onClick={(e) => {
                          e.preventDefault();
                          setActionNotice(`Downloading ${binderGeneratedBundle.filename}...`);
                          setTimeout(() => setActionNotice(null), 3500);
                        }}
                        className="px-4 py-2 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Certified ZIP Bundle</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Filename:</span>
                        <div className="text-white mt-0.5">{binderGeneratedBundle.filename}</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Merkle Package Signature:</span>
                        <div className="text-[#818CF8] mt-0.5 break-all">{binderGeneratedBundle.merkleManifest}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Previous Historical Audit Packages */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Historical Audit Evidence Archives
                  </h3>
                  
                  <div className="space-y-2">
                    {[
                      { id: 'AUD-PKT-849102', period: 'Q2 2026 (Apr - Jun)', firm: 'Deloitte & Touche LLP', size: '13.4 MB', status: 'Clean Opinion (Audited)', date: '2026-07-02' },
                      { id: 'AUD-PKT-719384', period: 'Q1 2026 (Jan - Mar)', firm: 'Schellman Compliance', size: '12.9 MB', status: 'SOC 2 Type II Issued', date: '2026-04-05' },
                      { id: 'AUD-PKT-602918', period: 'Q4 2025 (Oct - Dec)', firm: 'Ernst & Young (EY)', size: '14.1 MB', status: 'ISO 27001 Re-Certified', date: '2026-01-08' }
                    ].map((pkg) => (
                      <div key={pkg.id} className="bg-[#151E33] border border-[#1E293B] rounded-lg p-3 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-[#818CF8] shrink-0" />
                          <div>
                            <div className="font-semibold text-white">{pkg.period} — {pkg.firm}</div>
                            <div className="text-[10px] font-mono text-slate-400">
                              ID: {pkg.id} · {pkg.size} · Archived on {pkg.date}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className="text-[10px] font-mono font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/20">
                            {pkg.status}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setActionNotice(`Downloading archive ${pkg.id}...`);
                              setTimeout(() => setActionNotice(null), 3000);
                            }}
                            className="p-1.5 rounded bg-[#0E1526] hover:bg-[#1E293B] text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Download Archive"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: EVIDENCE ARTIFACT RAW CONTENT INSPECTOR          */}
      {/* ========================================================= */}
      {inspectingEvidence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-[#1E293B] flex items-center justify-between bg-[#151E33]/60">
              <div className="flex items-center space-x-2.5">
                <FileCode className="w-5 h-5 text-[#818CF8]" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Evidence Artifact Inspector: {inspectingEvidence.id}
                  </h3>
                  <div className="text-[11px] font-mono text-slate-400">
                    {inspectingEvidence.title}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInspectingEvidence(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E293B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#151E33] p-3.5 rounded-xl border border-[#1E293B]">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Source System</div>
                  <div className="text-white font-semibold mt-0.5">{inspectingEvidence.sourceSystem}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Collector Agent</div>
                  <div className="text-[#818CF8] font-mono font-semibold mt-0.5">{inspectingEvidence.collectorAgent}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Collection Cadence</div>
                  <div className="text-slate-200 mt-0.5">{inspectingEvidence.cadence}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Campus / Region</div>
                  <div className="text-slate-200 mt-0.5">{inspectingEvidence.campus}</div>
                </div>
              </div>

              {/* SHA-256 Checksum Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-300">SHA-256 Cryptographic Checksum:</span>
                  <button
                    type="button"
                    onClick={() => handleCopyHash(inspectingEvidence.sha256Hash)}
                    className="text-[#818CF8] hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedHash ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedHash ? 'Copied!' : 'Copy Hash'}</span>
                  </button>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-[#1E293B] font-mono text-[11px] text-slate-200 break-all select-all">
                  {inspectingEvidence.sha256Hash}
                </div>
              </div>

              {/* Raw JSON / Evidence Dump */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-slate-300">
                  Raw Configuration & Execution Payload:
                </div>
                <pre className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E293B] text-[11px] font-mono text-[#38BDF8] overflow-x-auto max-h-60 leading-relaxed">
                  {inspectingEvidence.rawContent}
                </pre>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-[#1E293B] bg-[#151E33]/40 flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#22C55E] flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified in Merkle Block #894210</span>
              </span>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setVerifierInputHash(inspectingEvidence.sha256Hash);
                    setInspectingEvidence(null);
                    setActiveNav('trail');
                    handleVerifyHash(inspectingEvidence.sha256Hash);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#818CF8] hover:bg-[#6366F1] text-white text-xs font-bold transition-all cursor-pointer flex items-center space-x-1"
                >
                  <Fingerprint className="w-3.5 h-3.5" />
                  <span>Verify in Ledger</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInspectingEvidence(null)}
                  className="px-3 py-1.5 rounded-lg bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: GENERATE AUDIT BINDER MODAL                      */}
      {/* ========================================================= */}
      {binderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0E1526] border border-[#1E293B] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden space-y-0">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-[#1E293B] flex items-center justify-between bg-[#151E33]/60">
              <div className="flex items-center space-x-2">
                <FolderLock className="w-5 h-5 text-[#818CF8]" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Export Continuous Audit Binder
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setBinderModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E293B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <div className="p-5 space-y-4 text-xs">
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Auditing Firm / Lead Partner:</label>
                <select
                  value={binderAuditFirm}
                  onChange={(e) => setBinderAuditFirm(e.target.value)}
                  className="w-full bg-[#151E33] border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#818CF8] cursor-pointer"
                >
                  <option value="Deloitte & Touche LLP">Deloitte & Touche LLP (Evelyn Archer, Lead)</option>
                  <option value="Ernst & Young (EY)">Ernst & Young (EY)</option>
                  <option value="PwC Assurance">PwC Assurance</option>
                  <option value="Schellman Compliance">Schellman & Company</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Framework Scope:</label>
                <select
                  value={binderScopeFramework}
                  onChange={(e) => setBinderScopeFramework(e.target.value)}
                  className="w-full bg-[#151E33] border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#818CF8] cursor-pointer"
                >
                  <option value="All Frameworks (SOC 2, ISO 27001, NIST)">Full Package (SOC 2, ISO 27001, NIST, HIPAA)</option>
                  <option value="SOC 2 Type II Only">SOC 2 Type II Only</option>
                  <option value="ISO/IEC 27001 Only">ISO/IEC 27001 Only</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-[#818CF8]/10 border border-[#818CF8]/30 text-slate-300 space-y-1 text-[11px]">
                <div className="font-bold text-[#818CF8] flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cryptographic Integrity Guarantee</span>
                </div>
                <p>
                  This bundle includes an embedded SHA-256 Merkle Manifest and digital signature verifying zero tampering across all 482 evidence artifacts.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-[#1E293B] bg-[#151E33]/40 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setBinderModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-[#151E33] hover:bg-[#1E293B] border border-[#1E293B] text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setBinderModalOpen(false);
                  setActiveNav('reports');
                  handleGenerateBinder();
                }}
                className="px-4 py-1.5 rounded-lg bg-[#818CF8] hover:bg-[#6366F1] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Compile & Download</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
