import axiosInstance from './axios';
import { User } from '../types';

export const usersApi = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get('/auth/users');
    return response.data;
  },
};

