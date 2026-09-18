import type { Metadata } from 'next';
import AuditorDashboardView from '@/components/AuditorDashboardView';

export const metadata: Metadata = {
  title: 'Automated Evidence Vault | RedFort Auditor',
  description: 'Searchable repository of continuous automated compliance artifacts and SHA-256 checksums.'
};

export default function AuditorEvidencePage() {
  return <AuditorDashboardView initialTab="vault" />;
}
