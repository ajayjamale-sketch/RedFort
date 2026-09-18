'use strict';

import React from 'react';
import { Metadata } from 'next';
import EmployeePortalView from '@/components/EmployeePortalView';

export const metadata: Metadata = {
  title: 'Zone Clearance Permissions & Elevation | Employee Portal | RedFort',
  description: 'Review granted facility permissions and submit clearance elevation requests with manager sign-off.'
};

export default function PortalAccessPage() {
  return <EmployeePortalView initialTab="access" />;
}
