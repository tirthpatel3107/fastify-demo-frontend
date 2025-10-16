import { AxiosInstance } from '../AxiosInstance';

// Prescription data types
export interface PrescriptionFormData {
  patientName: string;
  dob: string;
  address: string;
  medication: string;
  dosage: string;
  deliveryType: string;
}

export interface Prescription {
  id: string;
  patientName: string;
  dob: string;
  address: string;
  medication: string;
  dosage: string;
  deliveryType: string;
  status: 'pending' | 'approved' | 'rejected' | 'delivered';
  createdAt: string;
  updatedAt: string;
}

export interface PrescriptionResponse {
  success: boolean;
  data: Prescription;
  message: string;
}

export interface PrescriptionsResponse {
  success: boolean;
  data: Prescription[];
  message: string;
}

class PrescriptionService {
  private api: AxiosInstance;

  constructor() {
    this.api = new AxiosInstance();
  }

  // Create a new prescription
  async createPrescription(
    data: PrescriptionFormData
  ): Promise<PrescriptionResponse> {
    try {
      const response = await this.api.post('/prescriptions', data);
      return response.data;
    } catch (error) {
      console.error('Error creating prescription:', error);
      throw error;
    }
  }

  // Get all prescriptions
  async getPrescriptions(): Promise<PrescriptionsResponse> {
    try {
      const response = await this.api.get('/prescriptions');
      return response.data;
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      throw error;
    }
  }

  // Get prescription by ID
  async getPrescriptionById(id: string): Promise<PrescriptionResponse> {
    try {
      const response = await this.api.get(`/prescriptions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching prescription:', error);
      throw error;
    }
  }

  // Update prescription status
  async updatePrescriptionStatus(
    id: string,
    status: string
  ): Promise<PrescriptionResponse> {
    try {
      const response = await this.api.patch(`/prescriptions/${id}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating prescription status:', error);
      throw error;
    }
  }

  // Delete prescription
  async deletePrescription(
    id: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await this.api.delete(`/prescriptions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting prescription:', error);
      throw error;
    }
  }
}

export default new PrescriptionService();
