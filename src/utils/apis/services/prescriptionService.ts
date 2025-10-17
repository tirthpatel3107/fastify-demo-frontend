import axiosInstance from '../AxiosInstance';
import { PRESCRIPTION_API_ROUTE } from '../routes/serverApiRoutes';
import type {
  MedicinesResponse,
  PatientResponse,
  PrescriptionFormData,
  PrescriptionResponse,
  PrescriptionsResponse,
} from '../../interfaces';

class PrescriptionService {
  private api = axiosInstance;

  // Get available medicines for dropdown
  async getMedicines(): Promise<MedicinesResponse> {
    try {
      const response = await this.api.get(PRESCRIPTION_API_ROUTE.MEDICINES);
      return response.data;
    } catch (error) {
      console.error('Error fetching medicines:', error);
      throw error;
    }
  }

  // Get mock patient data for testing
  async getMockPatient(): Promise<PatientResponse> {
    try {
      const response = await this.api.get(PRESCRIPTION_API_ROUTE.MOCK_PATIENT);
      return response.data;
    } catch (error) {
      console.error('Error fetching mock patient:', error);
      throw error;
    }
  }

  // Issue a new prescription
  async issuePrescription(
    data: PrescriptionFormData
  ): Promise<PrescriptionResponse> {
    try {
      const response = await this.api.post(PRESCRIPTION_API_ROUTE.ISSUE, data);
      return response.data;
    } catch (error) {
      console.error('Error issuing prescription:', error);
      throw error;
    }
  }

  // Get prescription status by ID
  async getPrescriptionStatus(id: string): Promise<PrescriptionResponse> {
    try {
      const response = await this.api.get(
        `${PRESCRIPTION_API_ROUTE.STATUS}/${id}/status`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching prescription status:', error);
      throw error;
    }
  }

  // Legacy methods for backward compatibility
  async createPrescription(
    data: PrescriptionFormData
  ): Promise<PrescriptionResponse> {
    return this.issuePrescription(data);
  }

  // Get all prescriptions
  async getPrescriptions(
    limit: number = 10,
    skip: number = 0
  ): Promise<PrescriptionsResponse> {
    try {
      const response = await this.api.get(PRESCRIPTION_API_ROUTE.ALL, {
        params: { limit, skip },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      throw error;
    }
  }

  // Get prescription by ID (not implemented in backend yet)
  async getPrescriptionById(_id: string): Promise<PrescriptionResponse> {
    try {
      // This endpoint doesn't exist in the backend yet
      throw new Error('Get prescription by ID endpoint not implemented');
    } catch (error) {
      console.error('Error fetching prescription:', error);
      throw error;
    }
  }

  // Update prescription status (not implemented in backend yet)
  async updatePrescriptionStatus(
    _id: string,
    _status: string
  ): Promise<PrescriptionResponse> {
    try {
      // This endpoint doesn't exist in the backend yet
      throw new Error('Update prescription status endpoint not implemented');
    } catch (error) {
      console.error('Error updating prescription status:', error);
      throw error;
    }
  }

  // Delete prescription (not implemented in backend yet)
  async deletePrescription(
    _id: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // This endpoint doesn't exist in the backend yet
      throw new Error('Delete prescription endpoint not implemented');
    } catch (error) {
      console.error('Error deleting prescription:', error);
      throw error;
    }
  }
}

export default new PrescriptionService();
