import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLocalStorage } from '../../storage';
import { LOCAL_STORAGE } from '../../constants/auth';

// Mock the dependencies
vi.mock('../../storage');
vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn(),
}));

const mockGetLocalStorage = vi.mocked(getLocalStorage);

describe('Token Checker Utils - Simple Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('decodeJwtToken', () => {
    it('should return null when no token is stored', async () => {
      mockGetLocalStorage.mockReturnValue(null);

      const { decodeJwtToken } = await import('../tokenChecker');
      const result = decodeJwtToken();

      expect(result).toBeNull();
      expect(mockGetLocalStorage).toHaveBeenCalledWith(LOCAL_STORAGE.TOKEN);
    });

    it('should decode and return JWT payload when token exists', async () => {
      const mockToken = 'mock.jwt.token';
      const mockPayload = { sub: '123', exp: 1234567890 };

      mockGetLocalStorage.mockReturnValue(mockToken);

      // Mock jwtDecode
      const { jwtDecode } = await import('jwt-decode');
      vi.mocked(jwtDecode).mockReturnValue(mockPayload);

      const { decodeJwtToken } = await import('../tokenChecker');
      const result = decodeJwtToken();

      expect(result).toEqual(mockPayload);
      expect(mockGetLocalStorage).toHaveBeenCalledWith(LOCAL_STORAGE.TOKEN);
      expect(jwtDecode).toHaveBeenCalledWith(mockToken);
    });
  });

  describe('isTokenExpired', () => {
    it('should return true when token is expired', async () => {
      const expiredTime = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
      const mockPayload = { exp: expiredTime };

      mockGetLocalStorage.mockReturnValue('mock.token');

      // Mock jwtDecode to return expired payload
      const { jwtDecode } = await import('jwt-decode');
      vi.mocked(jwtDecode).mockReturnValue(mockPayload);

      const { isTokenExpired } = await import('../tokenChecker');
      const result = isTokenExpired();

      expect(result).toBe(true);
    });

    it('should return false when token is not expired', async () => {
      const futureTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      const mockPayload = { exp: futureTime };

      mockGetLocalStorage.mockReturnValue('mock.token');

      // Mock jwtDecode to return valid payload
      const { jwtDecode } = await import('jwt-decode');
      vi.mocked(jwtDecode).mockReturnValue(mockPayload);

      const { isTokenExpired } = await import('../tokenChecker');
      const result = isTokenExpired();

      expect(result).toBe(false);
    });

    it('should return false when no token exists', async () => {
      mockGetLocalStorage.mockReturnValue(null);

      const { isTokenExpired } = await import('../tokenChecker');
      const result = isTokenExpired();

      expect(result).toBe(false);
    });
  });
});
