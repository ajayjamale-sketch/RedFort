'use strict';
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductModulePage from '@/components/ProductModulePage';
import { PRODUCT_MODULES } from '@/lib/siteData';

export const metadata: Metadata = {
  title: 'Emergency Alerts & Notifications | RedFort Enterprise Security',
  description: 'Alerts for incidents, unauthorized access, cyber threats, and emergencies; multi-level escalation workflows; and instant emergency broadcast.'
};

export default function EmergencyAlertsPage() {
  const module = PRODUCT_MODULES.find((m) => m.slug === 'emergency-alerts');
  if (!module) notFound();
  return <ProductModulePage module={module} />;
}
