import React, { useState } from 'react';
import toast from 'react-hot-toast';

// icons
import { FileTextIcon, HistoryIcon } from '../../components/Common/SVGIcons';

// components
import PrescriptionForm from '../../components/PrescriptionForm';
import PrescriptionHistory from '../../components/PrescriptionHistory';
import Header from '../../components/Common/Header';
import TabbedLayout from '../../components/Common/TabbedLayout';

// utils
import prescriptionService from '../../lib/api/services/prescriptionService';
import type {
  PrescriptionFormData,
  PrescriptionResponse,
} from 'src/lib/types';

const Dashboard: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePrescriptionSubmit = async (data: PrescriptionFormData) => {
    setIsSubmitting(true);
    try {
      const response: PrescriptionResponse =
        await prescriptionService.issuePrescription(data);

      if (response.success) {
        toast.success(
          `Prescription issued successfully! ID: ${response.data?.prescription_id!}`
        );
      } else {
        throw new Error(response.message || 'Failed to issue prescription');
      }
    } catch (error: any) {
      toast.error(
        `${error.message}` || 'Failed to submit prescription. Please try again.'
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
      icon: <FileTextIcon className='w-5 h-5' />,
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
      icon: <HistoryIcon className='w-5 h-5' />,
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
