'use strict';
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductModulePage from '@/components/ProductModulePage';
import { PRODUCT_MODULES } from '@/lib/siteData';

export const metadata: Metadata = {
  title: 'Incident Response Management | RedFort Enterprise Security',
  description: 'Create, assign, investigate, and resolve incidents; evidence collection, root-cause analysis, corrective actions, and configurable escalation.'
};

export default function IncidentResponsePage() {
  const module = PRODUCT_MODULES.find((m) => m.slug === 'incident-response');
  if (!module) notFound();
  return <ProductModulePage module={module} />;
}
