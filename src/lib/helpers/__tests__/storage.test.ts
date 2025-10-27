import { describe, it, expect, beforeEach } from 'vitest';
import {
  clearStorage,
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
  clearSessionStorage,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
} from '../storage';

describe('Storage Helpers', () => {
  beforeEach(() => {
    // Clear storage before each test
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('Local Storage', () => {
    it('should set and get value from localStorage', () => {
      const value = { name: 'Test', id: 1 };
      setLocalStorage('testKey', value);

      const result = getLocalStorage('testKey');
      expect(result).toEqual(value);
    });

    it('should remove value from localStorage', () => {
      setLocalStorage('testKey', 'testValue');
      removeLocalStorage('testKey');

      expect(getLocalStorage('testKey')).toBeNull();
    });

    it('should clear all localStorage', () => {
      setLocalStorage('key1', 'value1');
      setLocalStorage('key2', 'value2');
      clearLocalStorage();

      expect(getLocalStorage('key1')).toBeNull();
      expect(getLocalStorage('key2')).toBeNull();
    });

    it('should handle string values', () => {
      setLocalStorage('stringKey', 'stringValue');
      const result = getLocalStorage('stringKey');
      expect(result).toBe('stringValue');
    });

    it('should handle number values', () => {
      setLocalStorage('numberKey', 42);
      const result = getLocalStorage('numberKey');
      expect(result).toBe(42);
    });

    it('should handle boolean values', () => {
      setLocalStorage('boolKey', true);
      const result = getLocalStorage('boolKey');
      expect(result).toBe(true);
    });

    it('should return null for non-existent key', () => {
      const result = getLocalStorage('nonExistentKey');
      expect(result).toBeNull();
    });
  });

  describe('Session Storage', () => {
    it('should set and get value from sessionStorage', () => {
      const value = { name: 'Test', id: 1 };
      setSessionStorage('testKey', value);

      const result = getSessionStorage('testKey');
      expect(result).toEqual(value);
    });

    it('should remove value from sessionStorage', () => {
      setSessionStorage('testKey', 'testValue');
      removeSessionStorage('testKey');

      expect(getSessionStorage('testKey')).toBeNull();
    });

    it('should clear all sessionStorage', () => {
      setSessionStorage('key1', 'value1');
      setSessionStorage('key2', 'value2');
      clearSessionStorage();

      expect(getSessionStorage('key1')).toBeNull();
      expect(getSessionStorage('key2')).toBeNull();
    });

    it('should handle string values', () => {
      setSessionStorage('stringKey', 'stringValue');
      const result = getSessionStorage('stringKey');
      expect(result).toBe('stringValue');
    });

    it('should handle number values', () => {
      setSessionStorage('numberKey', 42);
      const result = getSessionStorage('numberKey');
      expect(result).toBe(42);
    });

    it('should handle boolean values', () => {
      setSessionStorage('boolKey', false);
      const result = getSessionStorage('boolKey');
      expect(result).toBe(false);
    });

    it('should return null for non-existent key', () => {
      const result = getSessionStorage('nonExistentKey');
      expect(result).toBeNull();
    });
  });

  describe('clearStorage', () => {
    it('should clear both localStorage and sessionStorage', () => {
      setLocalStorage('localKey', 'localValue');
      setSessionStorage('sessionKey', 'sessionValue');

      clearStorage();

      expect(getLocalStorage('localKey')).toBeNull();
      expect(getSessionStorage('sessionKey')).toBeNull();
    });
  });
});
