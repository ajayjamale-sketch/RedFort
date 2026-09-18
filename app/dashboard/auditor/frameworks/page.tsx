import type { Metadata } from 'next';
import AuditorDashboardView from '@/components/AuditorDashboardView';

export const metadata: Metadata = {
  title: 'Regulatory Frameworks & Control Matrix | RedFort Auditor',
  description: 'Real-time continuous compliance scoring for SOC 2 Type II, ISO/IEC 27001, NIST SP 800-53, and HIPAA.'
};

export default function AuditorFrameworksPage() {
  return <AuditorDashboardView initialTab="frameworks" />;
}
