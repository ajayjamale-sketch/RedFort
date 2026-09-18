'use strict';

import React from 'react';
import { Metadata } from 'next';
import GovernanceDashboardView from '@/components/GovernanceDashboardView';

export const metadata: Metadata = {
  title: 'Platform Governance & Super Admin | RedFort Physical Security AI',
  description: 'Enterprise multi-tenant hierarchy, RBAC user permissions matrix, automated incident escalation trees, and platform security guardrails.'
};

export default function GovernanceDashboardPage() {
  return <GovernanceDashboardView initialTab="hub" />;
}
