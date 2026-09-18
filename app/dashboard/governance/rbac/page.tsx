'use strict';

import React from 'react';
import { Metadata } from 'next';
import GovernanceDashboardView from '@/components/GovernanceDashboardView';

export const metadata: Metadata = {
  title: 'RBAC Matrix & User Permissions | Super Admin | RedFort',
  description: 'Role-based access control definitions, security capability domain matrices, and fine-grained user scope management.'
};

export default function GovernanceRbacPage() {
  return <GovernanceDashboardView initialTab="rbac" />;
}
