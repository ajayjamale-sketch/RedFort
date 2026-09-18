'use strict';

import React from 'react';
import { Metadata } from 'next';
import GovernanceDashboardView from '@/components/GovernanceDashboardView';

export const metadata: Metadata = {
  title: 'Incident Escalation Rules & SLA Engine | Super Admin | RedFort',
  description: 'Automated multi-tier SLA escalation trees, unacknowledged timeout rules, and multi-channel emergency broadcast orchestration.'
};

export default function GovernanceEscalationsPage() {
  return <GovernanceDashboardView initialTab="escalations" />;
}
