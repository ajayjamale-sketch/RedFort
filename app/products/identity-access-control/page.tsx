'use strict';
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductModulePage from '@/components/ProductModulePage';
import { PRODUCT_MODULES } from '@/lib/siteData';

export const metadata: Metadata = {
  title: 'Identity & Access Control | RedFort Enterprise Security',
  description: 'Manages employee/contractor identities, assigns access by department and security level, and logs all entry/exit activity with immutable audit trails.'
};

export default function IdentityAccessControlPage() {
  const module = PRODUCT_MODULES.find((m) => m.slug === 'identity-access-control');
  if (!module) notFound();
  return <ProductModulePage module={module} />;
}
