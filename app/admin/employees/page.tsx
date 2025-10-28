'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/store/hooks';
import { UserRole } from '@/lib/types';
import AppLayout from '@/components/layout/AppLayout';
import EmployeeList from '@/components/admin/EmployeeList';

export default function EmployeesPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

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
      <EmployeeList />
    </AppLayout>
  );
}

