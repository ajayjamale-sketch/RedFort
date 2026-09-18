'use strict';

import React from 'react';
import { Metadata } from 'next';
import EmployeePortalView from '@/components/EmployeePortalView';

export const metadata: Metadata = {
  title: 'Guest Visitor Pass Invitations | Employee Portal | RedFort',
  description: 'Pre-register guests, interview candidates, and vendors with automated digital QR passes and NDA clearance.'
};

export default function PortalVisitorsPage() {
  return <EmployeePortalView initialTab="visitors" />;
}
