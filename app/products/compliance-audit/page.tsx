'use strict';
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductModulePage from '@/components/ProductModulePage';
import { PRODUCT_MODULES } from '@/lib/siteData';

export const metadata: Metadata = {
  title: 'Compliance & Audit Management | RedFort Enterprise Security',
  description: 'Manages compliance requirements and audits; findings generate corrective actions; and audit reports support regulatory inspection.'
};

export default function ComplianceAuditPage() {
  const module = PRODUCT_MODULES.find((m) => m.slug === 'compliance-audit');
  if (!module) notFound();
  return <ProductModulePage module={module} />;
}
