'use strict';

import React from 'react';
import { Metadata } from 'next';
import EmployeePortalView from '@/components/EmployeePortalView';

export const metadata: Metadata = {
  title: 'Digital Mobile Badge | Employee Portal | RedFort',
  description: 'Cryptographic contactless NFC and rotating dynamic QR credentials for turnstile and high-security facility access.'
};

export default function PortalBadgePage() {
  return <EmployeePortalView initialTab="badge" />;
}
