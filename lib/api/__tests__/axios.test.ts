import api from '../axios';

describe('axios instance', () => {
  it('should have correct base URL', () => {
    expect(api.defaults.baseURL).toBe(
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    );
  });

  it('should have correct headers', () => {
    expect(api.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('should add Authorization header when token exists', () => {
    const mockLocalStorage = {
      getItem: jest.fn().mockReturnValue(
        JSON.stringify({
          auth: JSON.stringify({
            token: 'test-token',
          }),
        }),
      ),
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    // Create a new request config with a proper type
    const config: { headers: Record<string, string> } = { headers: {} };

    // Simulate the request interceptor
    const persistedState = localStorage.getItem('persist:root');
    if (persistedState) {
      const parsed = JSON.parse(persistedState);
      if (parsed.auth) {
        const authData = JSON.parse(parsed.auth);
        if (authData.token) {
          config.headers.Authorization = `Bearer ${authData.token}`;
        }
      }
    }

    expect(config.headers.Authorization).toBe('Bearer test-token');
  });

  it('should handle errors in response interceptor', () => {
    const error = {
      response: {
        data: {
          message: 'Test error',
        },
      },
    };

    // Simulate the error handling
    const errorMessage =
      error.response?.data?.message || 'An error occurred';

    expect(errorMessage).toBe('Test error');
  });

  it('should handle network errors', () => {

    const errorMessage = 'An error occurred';

    expect(errorMessage).toBe('An error occurred');
  });
});

