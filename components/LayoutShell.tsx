'use strict';
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = pathname === '/login' || pathname === '/register' || pathname.startsWith('/dashboard');

  return (
    <>
      {!isStandalone && <Navbar />}
      <main className="flex-1 w-full">{children}</main>
      {!isStandalone && <Footer />}
      <ScrollToTop />
    </>
  );
}
