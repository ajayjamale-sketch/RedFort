'use strict';
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductModulePage from '@/components/ProductModulePage';
import { PRODUCT_MODULES } from '@/lib/siteData';

export const metadata: Metadata = {
  title: 'Cyber Threat Monitoring | RedFort Enterprise Security',
  description: 'Collects security events from enterprise systems, classifies threats by severity/category, and correlates incidents across multiple data sources.'
};

export default function CyberThreatMonitoringPage() {
  const module = PRODUCT_MODULES.find((m) => m.slug === 'cyber-threat-monitoring');
  if (!module) notFound();
  return <ProductModulePage module={module} />;
}
