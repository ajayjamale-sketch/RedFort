import type { Metadata } from 'next';
import AdminDashboardView from '@/components/AdminDashboardView';

export const metadata: Metadata = {
  title: 'IT Administrator & Infrastructure Operations | RedFort Enterprise',
  description: 'Infrastructure fleet health, Okta & Entra ID directory sync, IoT sensor monitoring, and API ingest metrics.'
};

export default function AdminPage() {
  return <AdminDashboardView initialTab="fleet" />;
}
