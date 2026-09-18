import type { Metadata } from 'next';
import AdminDashboardView from '@/components/AdminDashboardView';

export const metadata: Metadata = {
  title: 'Sensor & IoT Node Fleet Health | RedFort Admin',
  description: 'Physical sensor node diagnostics, latency tracking, firmware OTA updates, and heartbeat telemetry.'
};

export default function AdminNodesPage() {
  return <AdminDashboardView initialTab="nodes" />;
}
