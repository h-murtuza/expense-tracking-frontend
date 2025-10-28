'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import { useAppSelector } from '@/lib/store/hooks';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppLayout>
      <AnalyticsDashboard />
    </AppLayout>
  );
}

