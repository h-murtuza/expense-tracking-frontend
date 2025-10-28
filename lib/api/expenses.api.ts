import axiosInstance from './axios';
import {
  Expense,
  CreateExpenseDto,
  UpdateExpenseStatusDto,
  ExpenseFilters,
  Analytics,
} from '../types';

export const expensesApi = {
  getAll: async (filters?: ExpenseFilters): Promise<Expense[]> => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);

    const response = await axiosInstance.get(`/expenses?${params.toString()}`);
    return response.data;
  },

  getOne: async (id: string): Promise<Expense> => {
    const response = await axiosInstance.get(`/expenses/${id}`);
    return response.data;
  },

  create: async (data: CreateExpenseDto): Promise<Expense> => {
    const response = await axiosInstance.post('/expenses', data);
    return response.data;
  },

  updateStatus: async (
    id: string,
    data: UpdateExpenseStatusDto
  ): Promise<Expense> => {
    const response = await axiosInstance.patch(`/expenses/${id}/status`, data);
    return response.data;
  },

  getPending: async (): Promise<Expense[]> => {
    const response = await axiosInstance.get('/expenses/pending');
    return response.data;
  },

  getAnalytics: async (): Promise<Analytics> => {
    const response = await axiosInstance.get('/expenses/analytics');
    return response.data;
  },
};

