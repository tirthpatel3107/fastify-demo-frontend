import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PrescriptionHistory from '../index';
import prescriptionService from '../../../lib/api/services/prescriptionService';

// Mock the prescription service
vi.mock('../../../lib/api/services/prescriptionService');

const mockPrescriptions = [
  {
    id: '1',
    prescription_id: 'RX123',
    signatureRx_id: 'SIG123',
    patient_name: 'John Doe',
    patient_dob: '1990-01-01',
    patient_address: '123 Main St',
    medication: 'Paracetamol',
    dosage: '1 tablet daily',
    delivery_type: 'delivery',
    status: 'Pending',
    prescription_url: 'https://example.com/rx1',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    prescription_id: 'RX456',
    signatureRx_id: 'SIG456',
    patient_name: 'Jane Smith',
    patient_dob: '1985-05-20',
    patient_address: '456 Oak Ave',
    medication: 'Ibuprofen',
    dosage: '2 tablets twice daily',
    delivery_type: 'pickup',
    status: 'Sent',
    prescription_url: 'https://example.com/rx2',
    created_at: '2024-01-14T14:30:00Z',
    updated_at: '2024-01-14T15:00:00Z',
  },
];

describe('PrescriptionHistory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render prescription history table', async () => {
    (prescriptionService.getPrescriptions as any).mockResolvedValue({
      success: true,
      data: mockPrescriptions,
      message: 'Prescriptions fetched successfully',
    });

    render(<PrescriptionHistory />);

    await waitFor(() => {
      expect(screen.getByText('Prescription History')).toBeInTheDocument();
    });
  });

  it('should load prescriptions on mount', async () => {
    (prescriptionService.getPrescriptions as any).mockResolvedValue({
      success: true,
      data: mockPrescriptions,
      message: 'Prescriptions fetched successfully',
    });

    render(<PrescriptionHistory />);

    await waitFor(() => {
      expect(prescriptionService.getPrescriptions).toHaveBeenCalledWith(50, 0);
    });
  });

  it('should display prescription data in table', async () => {
    (prescriptionService.getPrescriptions as any).mockResolvedValue({
      success: true,
      data: mockPrescriptions,
      message: 'Prescriptions fetched successfully',
    });

    render(<PrescriptionHistory />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Paracetamol')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Ibuprofen')).toBeInTheDocument();
    });
  });

  it('should display empty state when no prescriptions', async () => {
    (prescriptionService.getPrescriptions as any).mockResolvedValue({
      success: true,
      data: [],
      message: 'Prescriptions fetched successfully',
    });

    render(<PrescriptionHistory />);

    await waitFor(() => {
      expect(screen.getByText('No prescriptions found.')).toBeInTheDocument();
    });
  });

  it('should handle error state', async () => {
    (prescriptionService.getPrescriptions as any).mockRejectedValue(
      new Error('Network error')
    );

    render(<PrescriptionHistory />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch prescriptions/i)).toBeInTheDocument();
    });

    // Find the specific "Try Again" button in the error section (not the header refresh button)
    const tryAgainButtons = screen.getAllByText(/Try Again/i);
    const errorTryAgainButton = tryAgainButtons.find(button => 
      button.className.includes('bg-red-600')
    );
    expect(errorTryAgainButton).toBeInTheDocument();
  });

  it('should refresh data when refresh button is clicked', async () => {
    (prescriptionService.getPrescriptions as any).mockResolvedValue({
      success: true,
      data: mockPrescriptions,
      message: 'Prescriptions fetched successfully',
    });

    render(<PrescriptionHistory />);

    await waitFor(() => {
      expect(prescriptionService.getPrescriptions).toHaveBeenCalledTimes(1);
    });

    const refreshButton = screen.getByText(/Refresh/i);
    fireEvent.click(refreshButton);

    await waitFor(() => {
      expect(prescriptionService.getPrescriptions).toHaveBeenCalledTimes(2);
    });
  });

  it('should show loading state while fetching', async () => {
    (prescriptionService.getPrescriptions as any).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({
        success: true,
        data: [],
        message: 'Prescriptions fetched successfully',
      }), 100))
    );

    render(<PrescriptionHistory />);

    expect(screen.getByText(/Refreshing.../i)).toBeInTheDocument();
  });

  it('should map delivery types correctly', async () => {
    (prescriptionService.getPrescriptions as any).mockResolvedValue({
      success: true,
      data: mockPrescriptions,
      message: 'Prescriptions fetched successfully',
    });

    render(<PrescriptionHistory />);

    await waitFor(() => {
      expect(screen.getByText('Home Delivery')).toBeInTheDocument();
      expect(screen.getByText('Pickup from Pharmacy')).toBeInTheDocument();
    });
  });

  it('should display formatted dates', async () => {
    (prescriptionService.getPrescriptions as any).mockResolvedValue({
      success: true,
      data: [mockPrescriptions[0]],
      message: 'Prescriptions fetched successfully',
    });

    render(<PrescriptionHistory />);

    await waitFor(() => {
      // Check that date is displayed (format may vary)
      expect(screen.getByText(/Jan/i)).toBeInTheDocument();
    });
  });

  it('should show status with correct styling', async () => {
    (prescriptionService.getPrescriptions as any).mockResolvedValue({
      success: true,
      data: mockPrescriptions,
      message: 'Prescriptions fetched successfully',
    });

    render(<PrescriptionHistory />);

    await waitFor(() => {
      // Should show status badges
      expect(screen.getByText('pending')).toBeInTheDocument();
      expect(screen.getByText('approved')).toBeInTheDocument();
    });
  });

  it('should handle refresh button disabled state', async () => {
    (prescriptionService.getPrescriptions as any).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({
        success: true,
        data: mockPrescriptions,
        message: 'Prescriptions fetched successfully',
      }), 100))
    );

    render(<PrescriptionHistory />);

    // Find the button element (not the span)
    const refreshButton = screen.getByRole('button', { name: /Refresh/i });
    
    // Button should be disabled while loading
    expect(refreshButton).toBeDisabled();
  });
});

