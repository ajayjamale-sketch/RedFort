import type { Metadata } from 'next';
import AdminDashboardView from '@/components/AdminDashboardView';

export const metadata: Metadata = {
  title: 'Directory Sync & IAM Operations | RedFort Admin',
  description: 'Okta Universal Directory and Microsoft Entra ID SCIM 2.0 real-time synchronization.'
};

export default function AdminIamPage() {
  return <AdminDashboardView initialTab="iam" />;
}
