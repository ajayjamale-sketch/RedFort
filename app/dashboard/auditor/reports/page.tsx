import type { Metadata } from 'next';
import AuditorDashboardView from '@/components/AuditorDashboardView';

export const metadata: Metadata = {
  title: 'Audit Binder Generator & Attestation Exporter | RedFort Auditor',
  description: 'Certified audit binder generation, Merkle manifests, and downloadable evidence workpapers.'
};

export default function AuditorReportsPage() {
  return <AuditorDashboardView initialTab="reports" />;
}
