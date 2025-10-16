import React, { useState } from 'react';
import PrescriptionForm from '../../components/PrescriptionForm';
import PrescriptionHistory from '../../components/PrescriptionHistory';
import Header from '../../components/Common/Header';
// import prescriptionService from '../../utils/apis/services/prescriptionService';
import type { PrescriptionFormData } from '../../utils/apis/services/prescriptionService';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePrescriptionSubmit = async (_data: PrescriptionFormData) => {
    setIsSubmitting(true);
    try {
      // Uncomment the line below when you have a real API endpoint
      // await prescriptionService.createPrescription(data);

      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // console.log('Prescription submitted:', data);
      toast.success('Prescription submitted successfully!');
    } catch (error) {
      // console.error('Failed to submit prescription:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      {/* Header */}
      <Header title='Prescription Management System' />

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='space-y-8'>
          {/* Prescription Form */}
          <PrescriptionForm
            onSubmit={handlePrescriptionSubmit}
            isSubmitting={isSubmitting}
          />

          {/* Prescription History */}
          <PrescriptionHistory />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
