import type { Metadata } from 'next';
import AdminDashboardView from '@/components/AdminDashboardView';

export const metadata: Metadata = {
  title: 'API Ingest & Kafka Telemetry | RedFort Admin',
  description: 'Real-time telemetry event streaming throughput, P99 latency tracking, and error budgeting.'
};

export default function AdminTelemetryPage() {
  return <AdminDashboardView initialTab="telemetry" />;
}
