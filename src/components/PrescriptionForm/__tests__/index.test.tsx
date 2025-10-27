import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PrescriptionForm from '../index';
import prescriptionService from '../../../lib/api/services/prescriptionService';
import { DeliveryTypeOptions } from '../../../lib/types';

vi.mock('../../../lib/api/services/prescriptionService');
vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() },
}));
vi.mock('src/lib/constants', () => ({
  medicinesDummyData: [{
    snomedId: '1',
    displayName: 'Paracetamol 500mg',
    unlicensed: false,
    endorsements: {},
    prescribeByBrandOnly: false,
    type: 'vmp',
    bnfExactMatch: null,
    bnfMatches: null,
    applianceTypes: [],
  }],
}));

describe('PrescriptionForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (prescriptionService.getMedicines as any).mockResolvedValue({
      success: true,
      data: {
        meds: [{
          snomedId: '1',
          displayName: 'Paracetamol 500mg',
          unlicensed: false,
          endorsements: {},
          prescribeByBrandOnly: false,
          type: 'vmp',
          bnfExactMatch: null,
          bnfMatches: null,
          applianceTypes: [],
        }],
        total: 1,
      },
      message: 'Success',
    });
  });

  it('should render form fields', async () => {
    render(<PrescriptionForm onSubmit={mockOnSubmit} />);
    await waitFor(() => {
      expect(screen.getByLabelText(/Patient Name/i)).toBeInTheDocument();
    });
  });

  it('should submit valid form data', async () => {
    mockOnSubmit.mockResolvedValue(undefined);
    render(<PrescriptionForm onSubmit={mockOnSubmit} />);

    await waitFor(() => {
      expect(screen.getByText('Paracetamol 500mg')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Patient Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '123 Main Street' } });
    fireEvent.change(screen.getByLabelText(/Medication/i), { target: { value: 'Paracetamol 500mg' } });
    fireEvent.change(screen.getByLabelText(/Dosage/i), { target: { value: '1 tablet daily' } });
    fireEvent.change(screen.getByLabelText(/Delivery Type/i), { target: { value: DeliveryTypeOptions.HOME_DELIVERY } });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });
});

