'use strict';

import React from 'react';
import { Metadata } from 'next';
import EmployeePortalView from '@/components/EmployeePortalView';

export const metadata: Metadata = {
  title: 'Emergency Evacuation & Safety Hub | Employee Portal | RedFort',
  description: 'Instant emergency muster check-in, real-time safety confirmation, and campus assembly zone routing.'
};

export default function PortalSafetyPage() {
  return <EmployeePortalView initialTab="safety" />;
}
