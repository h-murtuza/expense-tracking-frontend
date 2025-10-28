'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import ExpenseList from '@/components/expenses/ExpenseList';
import { useAppSelector } from '@/lib/store/hooks';

export default function ExpensesPage() {
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
      <ExpenseList />
    </AppLayout>
  );
}

