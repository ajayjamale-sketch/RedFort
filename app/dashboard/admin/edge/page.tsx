import type { Metadata } from 'next';
import AdminDashboardView from '@/components/AdminDashboardView';

export const metadata: Metadata = {
  title: 'Edge Gateways & Kubernetes Clusters | RedFort Admin',
  description: 'Multi-campus edge clusters, Kubernetes pods, and HSM cryptographic hardware security modules.'
};

export default function AdminEdgePage() {
  return <AdminDashboardView initialTab="edge" />;
}
