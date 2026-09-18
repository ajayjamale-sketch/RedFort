'use strict';
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductModulePage from '@/components/ProductModulePage';
import { PRODUCT_MODULES } from '@/lib/siteData';

export const metadata: Metadata = {
  title: 'Security Analytics & Intelligence | RedFort Enterprise Security',
  description: 'Dashboards for security posture, incident trends, risk exposure, response time, compliance scores, and historical data for strategic planning.'
};

export default function SecurityAnalyticsPage() {
  const module = PRODUCT_MODULES.find((m) => m.slug === 'security-analytics');
  if (!module) notFound();
  return <ProductModulePage module={module} />;
}
