'use strict';

import React from 'react';
import { Metadata } from 'next';
import EmployeePortalView from '@/components/EmployeePortalView';

export const metadata: Metadata = {
  title: 'Employee Self-Service Portal | RedFort Physical Security AI',
  description: 'Digital mobile badge credentials, guest visitor pass invitations, emergency I Am Safe check-in, and zone clearance management.'
};

export default function EmployeeDashboardAliasPage() {
  return <EmployeePortalView initialTab="badge" />;
}
