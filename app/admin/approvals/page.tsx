'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import ApprovalQueue from '@/components/admin/ApprovalQueue';
import { useAppSelector } from '@/lib/store/hooks';
import { UserRole } from '@/lib/types';

export default function ApprovalsPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== UserRole.ADMIN) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== UserRole.ADMIN) {
    return null;
  }

  return (
    <AppLayout>
      <ApprovalQueue />
    </AppLayout>
  );
}

