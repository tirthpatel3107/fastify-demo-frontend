import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PRESCRIPTION_API_ROUTE } from '../../routes/serverApiRoutes';
import type { PrescriptionFormData } from '../../../types';
import { DeliveryTypeOptions } from '../../../types';

// Mock AxiosInstance
const mockAxiosInstance = {
  get: vi.fn(),
  post: vi.fn(),
};

vi.mock('../../AxiosInstance', () => ({
  default: mockAxiosInstance,
}));

describe('PrescriptionService - Simple Tests', () => {
  let prescriptionService: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    // Import the service after mocking
    const serviceModule = await import('../prescriptionService');
    prescriptionService = serviceModule.default;
  });

  describe('getMedicines', () => {
    it('should fetch medicines successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            meds: [
              {
                snomedId: '1',
                displayName: 'Paracetamol 500mg',
                unlicensed: false,
                endorsements: {},
                prescribeByBrandOnly: false,
                type: 'vmp',
                bnfExactMatch: null,
                bnfMatches: null,
                applianceTypes: [],
              },
            ],
            total: 1,
          },
          message: 'Medicines fetched successfully',
        },
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await prescriptionService.getMedicines();

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        PRESCRIPTION_API_ROUTE.MEDICINES
      );
    });

    it('should handle API errors', async () => {
      const error = new Error('Network error');
      mockAxiosInstance.get.mockRejectedValue(error);

      await expect(prescriptionService.getMedicines()).rejects.toThrow(
        'Network error'
      );
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        PRESCRIPTION_API_ROUTE.MEDICINES
      );
    });
  });

  describe('getMockPatient', () => {
    it('should fetch mock patient successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            dob: '1985-03-15',
            address: '123 Main St, New York, NY 10001',
          },
          message: 'Mock patient fetched successfully',
        },
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await prescriptionService.getMockPatient();

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        PRESCRIPTION_API_ROUTE.MOCK_PATIENT
      );
    });

    it('should handle API errors', async () => {
      const error = new Error('Network error');
      mockAxiosInstance.get.mockRejectedValue(error);

      await expect(prescriptionService.getMockPatient()).rejects.toThrow(
        'Network error'
      );
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        PRESCRIPTION_API_ROUTE.MOCK_PATIENT
      );
    });
  });

  describe('issuePrescription', () => {
    it('should issue prescription successfully', async () => {
      const prescriptionData: PrescriptionFormData = {
        patientName: 'John Doe',
        dob: '1985-03-15',
        address: '123 Main St, New York, NY 10001',
        medication: 'Paracetamol 500mg',
        dosage: '1 tablet twice daily',
        deliveryType: DeliveryTypeOptions.HOME_DELIVERY,
      };

      const mockResponse = {
        data: {
          success: true,
          data: {
            id: '1',
            prescription_id: 'RX123456',
            signatureRx_id: 'SIG123',
            status: 'pending',
            prescription_url: 'https://example.com/prescription/1',
            created_at: '2024-01-15T10:30:00Z',
            updated_at: '2024-01-15T10:30:00Z',
          },
          message: 'Prescription issued successfully',
        },
      };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result =
        await prescriptionService.issuePrescription(prescriptionData);

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        PRESCRIPTION_API_ROUTE.ISSUE,
        prescriptionData
      );
    });

    it('should handle API errors', async () => {
      const prescriptionData: PrescriptionFormData = {
        patientName: 'John Doe',
        dob: '1985-03-15',
        address: '123 Main St, New York, NY 10001',
        medication: 'Paracetamol 500mg',
        dosage: '1 tablet twice daily',
        deliveryType: DeliveryTypeOptions.HOME_DELIVERY,
      };

      const error = new Error('Validation error');
      mockAxiosInstance.post.mockRejectedValue(error);

      await expect(
        prescriptionService.issuePrescription(prescriptionData)
      ).rejects.toThrow('Validation error');
    });
  });

  describe('getPrescriptionStatus', () => {
    it('should fetch prescription status successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            id: '1',
            prescription_id: 'RX123456',
            signatureRx_id: 'SIG123',
            status: 'completed',
            prescription_url: 'https://example.com/prescription/1',
            created_at: '2024-01-15T10:30:00Z',
            updated_at: '2024-01-15T11:30:00Z',
          },
          message: 'Prescription status fetched successfully',
        },
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await prescriptionService.getPrescriptionStatus('1');

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `${PRESCRIPTION_API_ROUTE.STATUS}/1/status`
      );
    });

    it('should handle API errors', async () => {
      const error = new Error('Network error');
      mockAxiosInstance.get.mockRejectedValue(error);

      await expect(prescriptionService.getPrescriptionStatus('1')).rejects.toThrow(
        'Network error'
      );
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        `${PRESCRIPTION_API_ROUTE.STATUS}/1/status`
      );
    });
  });

  describe('createPrescription (legacy method)', () => {
    it('should call issuePrescription internally', async () => {
      const prescriptionData: PrescriptionFormData = {
        patientName: 'John Doe',
        dob: '1985-03-15',
        address: '123 Main St, New York, NY 10001',
        medication: 'Paracetamol 500mg',
        dosage: '1 tablet twice daily',
        deliveryType: DeliveryTypeOptions.HOME_DELIVERY,
      };

      const mockResponse = {
        data: {
          success: true,
          data: {
            id: '1',
            prescription_id: 'RX123456',
            signatureRx_id: 'SIG123',
            status: 'pending',
            prescription_url: 'https://example.com/prescription/1',
            created_at: '2024-01-15T10:30:00Z',
            updated_at: '2024-01-15T10:30:00Z',
          },
          message: 'Prescription issued successfully',
        },
      };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await prescriptionService.createPrescription(prescriptionData);

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        PRESCRIPTION_API_ROUTE.ISSUE,
        prescriptionData
      );
    });
  });

  describe('getPrescriptions', () => {
    it('should fetch prescriptions successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [
            {
              id: '1',
              prescription_id: 'RX123456',
              signatureRx_id: 'SIG123',
              patient_name: 'John Doe',
              patient_dob: '1985-03-15',
              patient_address: '123 Main St, New York, NY 10001',
              medication: 'Paracetamol 500mg',
              dosage: '1 tablet twice daily',
              delivery_type: 'Home Delivery',
              status: 'pending',
              prescription_url: 'https://example.com/prescription/1',
              created_at: '2024-01-15T10:30:00Z',
              updated_at: '2024-01-15T10:30:00Z',
            },
          ],
          message: 'Prescriptions fetched successfully',
        },
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await prescriptionService.getPrescriptions();

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        PRESCRIPTION_API_ROUTE.ALL,
        { params: { limit: 10, skip: 0 } }
      );
    });

    it('should fetch prescriptions with custom limit and skip', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [],
          message: 'Prescriptions fetched successfully',
        },
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await prescriptionService.getPrescriptions(5, 10);

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        PRESCRIPTION_API_ROUTE.ALL,
        { params: { limit: 5, skip: 10 } }
      );
    });

    it('should handle API errors', async () => {
      const error = new Error('Network error');
      mockAxiosInstance.get.mockRejectedValue(error);

      await expect(prescriptionService.getPrescriptions()).rejects.toThrow(
        'Network error'
      );
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        PRESCRIPTION_API_ROUTE.ALL,
        { params: { limit: 10, skip: 0 } }
      );
    });
  });

  describe('getPrescriptionById (not implemented)', () => {
    it('should throw error for unimplemented method', async () => {
      await expect(prescriptionService.getPrescriptionById('1')).rejects.toThrow(
        'Get prescription by ID endpoint not implemented'
      );
    });
  });

  describe('updatePrescriptionStatus (not implemented)', () => {
    it('should throw error for unimplemented method', async () => {
      await expect(
        prescriptionService.updatePrescriptionStatus('1', 'completed')
      ).rejects.toThrow('Update prescription status endpoint not implemented');
    });
  });

  describe('deletePrescription (not implemented)', () => {
    it('should throw error for unimplemented method', async () => {
      await expect(prescriptionService.deletePrescription('1')).rejects.toThrow(
        'Delete prescription endpoint not implemented'
      );
    });
  });
});
