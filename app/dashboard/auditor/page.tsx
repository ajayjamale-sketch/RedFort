import type { Metadata } from 'next';
import AuditorDashboardView from '@/components/AuditorDashboardView';

export const metadata: Metadata = {
  title: 'Compliance Auditor & Evidence Vault | RedFort Enterprise',
  description: 'Continuous regulatory assurance, SOC 2 / ISO 27001 evidence vault, and immutable audit trail verifier.'
};

export default function AuditorPage() {
  return <AuditorDashboardView initialTab="vault" />;
}
