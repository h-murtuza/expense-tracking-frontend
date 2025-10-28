import axiosInstance from './axios';
import { LoginDto, RegisterDto, AuthResponse } from '../types';

export const authApi = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  },
};

