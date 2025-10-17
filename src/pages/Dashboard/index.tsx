import React, { useState } from 'react';
import { FileText, History } from 'lucide-react';
import toast from 'react-hot-toast';

// components
import PrescriptionForm from '../../components/PrescriptionForm';
import PrescriptionHistory from '../../components/PrescriptionHistory';
import Header from '../../components/Common/Header';
import TabbedLayout from '../../components/Common/TabbedLayout';

// utils
import prescriptionService from '../../utils/apis/services/prescriptionService';
import type { PrescriptionFormData } from '../../utils/apis/services/prescriptionService';

/**
 * Dashboard component - Main application interface with tabbed layout
 * Provides prescription management functionality with elegant UI
 */
const Dashboard: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles prescription form submission
   * @param data - Prescription form data
   */
  const handlePrescriptionSubmit = async (data: PrescriptionFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting prescription:', data);
      const response = await prescriptionService.issuePrescription(data);

      if (response.success) {
        console.log('Prescription issued successfully:', response.data);
        toast.success(
          `Prescription issued successfully! ID: ${response.data.prescription_id}`
        );
      } else {
        throw new Error(response.message || 'Failed to issue prescription');
      }
    } catch (error: any) {
      console.error('Failed to submit prescription:', error);
      toast.error(
        error.message || 'Failed to submit prescription. Please try again.'
      );
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define tabs for the tabbed layout
  const tabs = [
    {
      id: 'form',
      label: 'Prescription Form',
      icon: <FileText className='w-5 h-5' />,
      content: (
        <PrescriptionForm
          onSubmit={handlePrescriptionSubmit}
          isSubmitting={isSubmitting}
        />
      ),
    },
    {
      id: 'history',
      label: 'Prescription History',
      icon: <History className='w-5 h-5' />,
      content: <PrescriptionHistory />,
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      {/* Header */}
      <Header title='Prescription Management System' />

      {/* Main Content with Full Width */}
      <main className='w-full'>
        <TabbedLayout tabs={tabs} defaultTab='form' />
      </main>
    </div>
  );
};

export default Dashboard;
