'use strict';
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductModulePage from '@/components/ProductModulePage';
import { PRODUCT_MODULES } from '@/lib/siteData';

export const metadata: Metadata = {
  title: 'SOC Dashboard | RedFort Enterprise Security',
  description: 'Centralized, real-time view of every security event, active threats, incidents, alarms, and live asset health across digital and physical perimeters.'
};

export default function SocDashboardPage() {
  const module = PRODUCT_MODULES.find((m) => m.slug === 'soc-dashboard');
  if (!module) notFound();
  return <ProductModulePage module={module} />;
}
