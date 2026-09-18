import type { Metadata } from 'next';
import AuditorDashboardView from '@/components/AuditorDashboardView';

export const metadata: Metadata = {
  title: 'Immutable Audit Trail & Cryptographic Verifier | RedFort Auditor',
  description: 'Cryptographic ledger of system events, Merkle root validation, and zero-tampering verification.'
};

export default function AuditorTrailPage() {
  return <AuditorDashboardView initialTab="trail" />;
}
