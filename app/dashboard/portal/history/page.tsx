'use strict';

import React from 'react';
import { Metadata } from 'next';
import EmployeePortalView from '@/components/EmployeePortalView';

export const metadata: Metadata = {
  title: 'Turnstile & Badge Activity Log | Employee Portal | RedFort',
  description: 'Personal immutable audit history of physical turnstile swipes, mobile NFC taps, and gate access events.'
};

export default function PortalHistoryPage() {
  return <EmployeePortalView initialTab="history" />;
}
