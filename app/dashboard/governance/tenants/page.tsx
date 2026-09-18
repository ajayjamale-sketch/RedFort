'use strict';

import React from 'react';
import { Metadata } from 'next';
import GovernanceDashboardView from '@/components/GovernanceDashboardView';

export const metadata: Metadata = {
  title: 'Multi-Tenant Hierarchy & Quotas | Super Admin | RedFort',
  description: 'Enterprise subsidiary entity tree, isolated campus networks, resource quotas, and dedicated HSM cryptographic partitions.'
};

export default function GovernanceTenantsPage() {
  return <GovernanceDashboardView initialTab="tenants" />;
}
