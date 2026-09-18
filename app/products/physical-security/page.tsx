'use strict';
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductModulePage from '@/components/ProductModulePage';
import { PRODUCT_MODULES } from '@/lib/siteData';

export const metadata: Metadata = {
  title: 'Physical Security Management | RedFort Enterprise Security',
  description: 'Manages buildings, entry points, CCTV systems, alarms, and checkpoints; monitors visitor access; and records and investigates physical incidents.'
};

export default function PhysicalSecurityPage() {
  const module = PRODUCT_MODULES.find((m) => m.slug === 'physical-security');
  if (!module) notFound();
  return <ProductModulePage module={module} />;
}
