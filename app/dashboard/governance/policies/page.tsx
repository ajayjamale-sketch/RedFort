'use strict';

import React from 'react';
import { Metadata } from 'next';
import GovernanceDashboardView from '@/components/GovernanceDashboardView';

export const metadata: Metadata = {
  title: 'Global Security Policies & Dual-Auth | Super Admin | RedFort',
  description: 'Enforce platform-wide authentication guardrails, four-eyes dual-authorization approval policies, and session TTL rules.'
};

export default function GovernancePoliciesPage() {
  return <GovernanceDashboardView initialTab="policies" />;
}
