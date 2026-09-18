'use strict';

import React from 'react';
import { Metadata } from 'next';
import GovernanceDashboardView from '@/components/GovernanceDashboardView';

export const metadata: Metadata = {
  title: 'Super Admin Console | RedFort Physical Security AI',
  description: 'Enterprise platform governance, multi-tenant hierarchy, RBAC user permissions matrix, and incident escalation rules.'
};

export default function SuperAdminDashboardPage() {
  return <GovernanceDashboardView initialTab="hub" />;
}
