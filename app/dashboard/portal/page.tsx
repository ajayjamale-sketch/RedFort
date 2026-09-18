'use strict';

import React from 'react';
import { Metadata } from 'next';
import EmployeePortalView from '@/components/EmployeePortalView';

export const metadata: Metadata = {
  title: 'Employee & Contractor Self-Service Portal | RedFort',
  description: 'Digital mobile badge credentials, guest visitor pass invitations, emergency I Am Safe check-in, and zone clearance management.'
};

export default function EmployeePortalPage() {
  return <EmployeePortalView initialTab="badge" />;
}
