import authReducer, {
  restoreAuth,
  logout,
  login,
  register,
  clearError,
} from '../authSlice';
import { UserRole } from '@/lib/types';

// Mock the API
jest.mock('@/lib/api/auth.api', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
  },
}));

describe('authSlice', () => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: UserRole.EMPLOYEE,
  };

  const mockAuthResponse = {
    user: mockUser,
    token: 'mock-jwt-token',
  };

  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('synchronous actions', () => {
    it('should handle restoreAuth', () => {
      const actual = authReducer(initialState, restoreAuth({
        user: mockUser,
        token: 'test-token',
      }));
      expect(actual.user).toEqual(mockUser);
      expect(actual.token).toBe('test-token');
      expect(actual.isAuthenticated).toBe(true);
    });

    it('should handle clearError', () => {
      const stateWithError = {
        ...initialState,
        error: 'Some error',
      };
      const actual = authReducer(stateWithError, clearError());
      expect(actual.error).toBeNull();
    });

    it('should handle logout', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser,
        token: 'token',
        isAuthenticated: true,
      };
      const actual = authReducer(stateWithUser, logout());
      expect(actual.user).toBeNull();
      expect(actual.token).toBeNull();
      expect(actual.isAuthenticated).toBe(false);
    });
  });

  describe('login async thunk', () => {
    it('should handle login.pending', () => {
      const action = { type: login.pending.type };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle login.fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: mockAuthResponse,
      };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe('mock-jwt-token');
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle login.rejected', () => {
      const action = {
        type: login.rejected.type,
        payload: 'Invalid credentials',
      };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Invalid credentials');
      expect(state.user).toBe(null);
      expect(state.token).toBe(null);
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('register async thunk', () => {
    it('should handle register.pending', () => {
      const action = { type: register.pending.type };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle register.fulfilled', () => {
      const action = {
        type: register.fulfilled.type,
        payload: mockAuthResponse,
      };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe('mock-jwt-token');
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle register.rejected', () => {
      const action = {
        type: register.rejected.type,
        payload: 'Email already exists',
      };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Email already exists');
    });
  });
});

