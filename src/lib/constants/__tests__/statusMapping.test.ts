import { describe, it, expect } from 'vitest';
import {
  mapBackendToFrontendStatus,
  mapFrontendToBackendStatus,
  STATUS_MAPPING,
} from '../statusMapping';

describe('Status Mapping', () => {
  describe('STATUS_MAPPING constant', () => {
    it('should have correct backend to frontend mapping', () => {
      expect(STATUS_MAPPING.BACKEND_TO_FRONTEND).toEqual({
        'Pending': 'pending',
        'Sent': 'approved',
        'Delivered': 'delivered',
        'Failed': 'rejected',
      });
    });

    it('should have correct frontend to backend mapping', () => {
      expect(STATUS_MAPPING.FRONTEND_TO_BACKEND).toEqual({
        'pending': 'Pending',
        'approved': 'Sent',
        'delivered': 'Delivered',
        'rejected': 'Failed',
      });
    });
  });

  describe('mapBackendToFrontendStatus', () => {
    it('should map "Pending" to "pending"', () => {
      expect(mapBackendToFrontendStatus('Pending')).toBe('pending');
    });

    it('should map "Sent" to "approved"', () => {
      expect(mapBackendToFrontendStatus('Sent')).toBe('approved');
    });

    it('should map "Delivered" to "delivered"', () => {
      expect(mapBackendToFrontendStatus('Delivered')).toBe('delivered');
    });

    it('should map "Failed" to "rejected"', () => {
      expect(mapBackendToFrontendStatus('Failed')).toBe('rejected');
    });

    it('should default to "pending" for unknown status', () => {
      expect(mapBackendToFrontendStatus('Unknown')).toBe('pending');
      expect(mapBackendToFrontendStatus('')).toBe('pending');
    });
  });

  describe('mapFrontendToBackendStatus', () => {
    it('should map "pending" to "Pending"', () => {
      expect(mapFrontendToBackendStatus('pending')).toBe('Pending');
    });

    it('should map "approved" to "Sent"', () => {
      expect(mapFrontendToBackendStatus('approved')).toBe('Sent');
    });

    it('should map "delivered" to "Delivered"', () => {
      expect(mapFrontendToBackendStatus('delivered')).toBe('Delivered');
    });

    it('should map "rejected" to "Failed"', () => {
      expect(mapFrontendToBackendStatus('rejected')).toBe('Failed');
    });

    it('should default to "Pending" for unknown status', () => {
      expect(mapFrontendToBackendStatus('Unknown')).toBe('Pending');
      expect(mapFrontendToBackendStatus('')).toBe('Pending');
    });
  });

  describe('Round-trip mapping', () => {
    it('should maintain consistency for all statuses', () => {
      const backendStatuses = ['Pending', 'Sent', 'Delivered', 'Failed'];
      
      backendStatuses.forEach((backendStatus) => {
        const frontendStatus = mapBackendToFrontendStatus(backendStatus);
        const backToBackend = mapFrontendToBackendStatus(frontendStatus);
        expect(backToBackend).toBe(backendStatus);
      });
    });
  });
});

