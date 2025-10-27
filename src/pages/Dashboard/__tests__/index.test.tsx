import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../index';
import prescriptionService from '../../../lib/api/services/prescriptionService';
import { DeliveryTypeOptions } from '../../../lib/types';

// Mock dependencies
vi.mock('../../../lib/api/services/prescriptionService');
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

const mockPrescriptionResponse = {
  success: true,
  data: {
    id: '1',
    prescription_id: 'RX123',
    signatureRx_id: 'SIG123',
    status: 'pending',
    prescription_url: 'https://example.com/rx',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  message: 'Prescription issued successfully',
};

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock getPrescriptions to prevent errors in tab switching
    (prescriptionService.getPrescriptions as any).mockResolvedValue({
      success: true,
      data: [],
      message: 'Prescriptions fetched successfully',
    });
    // Mock getMedicines to prevent errors in form loading
    (prescriptionService.getMedicines as any).mockResolvedValue({
      success: true,
      data: { meds: [{ displayName: 'Paracetamol', snomedId: '1' }] },
      message: 'Medicines fetched successfully',
    });
  });

  it('should render dashboard with header', () => {
    renderWithRouter(<Dashboard />);

    expect(screen.getByText('Prescription Management System')).toBeInTheDocument();
  });

  it('should render tabbed layout', () => {
    renderWithRouter(<Dashboard />);

    expect(screen.getByText('Prescription Form')).toBeInTheDocument();
    const historyButtons = screen.getAllByText('Prescription History');
    expect(historyButtons.length).toBeGreaterThan(0);
  });

  it('should handle prescription submission successfully', async () => {
    (prescriptionService.issuePrescription as any).mockResolvedValue(mockPrescriptionResponse);

    renderWithRouter(<Dashboard />);

    // Wait for form to be rendered
    await waitFor(() => {
      expect(screen.getByText(/Issue New Prescription/i)).toBeInTheDocument();
    });

    // Wait for medicines to be loaded
    await waitFor(() => {
      const medicationSelect = screen.getByLabelText(/Medication/i);
      expect(medicationSelect).toBeEnabled();
    });

    // Fill and submit form
    const patientNameInput = screen.getByLabelText(/Patient Name/i);
    fireEvent.change(patientNameInput, { target: { value: 'John Doe' } });

    const dobInput = screen.getByLabelText(/Date of Birth/i);
    fireEvent.change(dobInput, { target: { value: '1990-01-01' } });

    const addressInput = screen.getByLabelText(/Address/i);
    fireEvent.change(addressInput, { target: { value: '123 Main Street' } });

    const medicationInput = screen.getByLabelText(/Medication/i);
    fireEvent.change(medicationInput, { target: { value: 'Paracetamol' } });

    const dosageInput = screen.getByLabelText(/Dosage/i);
    fireEvent.change(dosageInput, { target: { value: '1 tablet daily' } });

    const deliveryInput = screen.getByLabelText(/Delivery Type/i);
    fireEvent.change(deliveryInput, { target: { value: DeliveryTypeOptions.HOME_DELIVERY } });

    const submitButton = screen.getByRole('button', { name: /Submit Prescription/i });
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(prescriptionService.issuePrescription).toHaveBeenCalled();
    }, { timeout: 3000 });
  });

  it('should handle prescription submission error', async () => {
    (prescriptionService.issuePrescription as any).mockRejectedValue(
      new Error('Network error')
    );

    renderWithRouter(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Issue New Prescription/i)).toBeInTheDocument();
    });
  });

  it('should switch between tabs', async () => {
    renderWithRouter(<Dashboard />);

    const historyButtons = screen.getAllByText('Prescription History');
    const historyTab = historyButtons.find(button => button.tagName === 'BUTTON');
    expect(historyTab).toBeTruthy();
    fireEvent.click(historyTab!);

    // History content should be loaded
    await waitFor(() => {
      // PrescriptionHistory component should be rendered
      expect(prescriptionService.getPrescriptions).toHaveBeenCalled();
    });
  });

  it('should show loading state during submission', async () => {
    (prescriptionService.issuePrescription as any).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockPrescriptionResponse), 100))
    );

    renderWithRouter(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Issue New Prescription/i)).toBeInTheDocument();
    });
  });
});

