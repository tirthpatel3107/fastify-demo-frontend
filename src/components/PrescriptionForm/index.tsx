import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

// utils
import prescriptionService from '../../lib/api/services/prescriptionService';
import type { Medicine, PrescriptionFormProps } from '../../lib/types';
import { DeliveryTypeOptions } from '../../lib/types';
import { medicinesDummyData } from 'src/lib/constants';
import { PlusIcon, CheckIcon } from '../../components/Common/SVGIcons';

// Validation schema using Zod for type-safe form validation
const prescriptionSchema = z.object({
  patientName: z.string().min(2, 'Patient name must be at least 2 characters'),
  dob: z.string().min(1, 'Date of birth is required'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  medication: z.string().min(1, 'Select a medication'),
  dosage: z.string().min(1, 'Dosage is required'),
  deliveryType: z.nativeEnum(DeliveryTypeOptions, {
    message: 'Select a delivery type',
  }),
});

// Infer TypeScript type from Zod schema
type PrescriptionFormData = z.infer<typeof prescriptionSchema>;

// Available delivery type options for the form
const deliveryTypeOptions = Object.values(DeliveryTypeOptions);

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({
  onSubmit,
  isSubmitting = false,
}) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loadingMedicines, setLoadingMedicines] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PrescriptionFormData>({
    resolver: zodResolver(prescriptionSchema),
  });

  // Load medicines from API on component mount
  useEffect(() => {
    const loadMedicines = async () => {
      try {
        setLoadingMedicines(true);
        const response = await prescriptionService.getMedicines();
        if (response.success) {
          setMedicines(response.data.meds);
        }
      } catch (error) {
        toast.error('Failed to load medicines. Using default list.');

        // Fallback to default medicines if API fails
        setMedicines(medicinesDummyData);
      } finally {
        setLoadingMedicines(false);
      }
    };

    loadMedicines();
  }, []);

  const handleFormSubmit = async (data: PrescriptionFormData) => {
    try {
      await onSubmit(data);
      reset();
      toast.success('Prescription submitted successfully!');
    } catch {
      toast.error('Failed to submit prescription. Please try again.');
    }
  };

  return (
    <div className='bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden'>
      {/* Header */}
      <div className='bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4'>
        <h2 className='text-xl font-bold text-white flex items-center'>
          <PlusIcon className='w-5 h-5 mr-2' />
          Issue New Prescription
        </h2>
        <p className='text-indigo-100 text-sm mt-1'>
          Fill out the form below to create a new prescription for your patient
        </p>
      </div>

      {/* Form Content */}
      <div className='p-6'>
        <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Patient Name */}
            <div>
              <label
                htmlFor='patientName'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Patient Name*
              </label>
              <input
                {...register('patientName')}
                type='text'
                id='patientName'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200'
                placeholder='Enter patient name'
              />
              {errors.patientName && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.patientName.message}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label
                htmlFor='dob'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Date of Birth*
              </label>
              <input
                {...register('dob')}
                type='date'
                id='dob'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200'
              />
              {errors.dob && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.dob.message}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor='address'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Address*
            </label>
            <textarea
              {...register('address')}
              id='address'
              rows={3}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none'
              placeholder='Enter patient address'
            />
            {errors.address && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.address.message}
              </p>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Medication */}
            <div>
              <label
                htmlFor='medication'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Medication*
              </label>
              <select
                {...register('medication')}
                id='medication'
                disabled={loadingMedicines}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed'
              >
                <option value=''>
                  {loadingMedicines
                    ? 'Loading medicines...'
                    : 'Select medication'}
                </option>
                {medicines.map(med => (
                  <option key={med.snomedId} value={med.displayName}>
                    {med.displayName}
                  </option>
                ))}
              </select>
              {errors.medication && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.medication.message}
                </p>
              )}
            </div>

            {/* Dosage */}
            <div>
              <label
                htmlFor='dosage'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Dosage*
              </label>
              <input
                {...register('dosage')}
                type='text'
                id='dosage'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200'
                placeholder='e.g., 1 tablet twice daily'
              />
              {errors.dosage && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.dosage.message}
                </p>
              )}
            </div>

            {/* Delivery Type */}
            <div>
              <label
                htmlFor='deliveryType'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Delivery Type*
              </label>
              <select
                {...register('deliveryType')}
                id='deliveryType'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200'
              >
                <option value=''>Select delivery type</option>
                {deliveryTypeOptions.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.deliveryType && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.deliveryType.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex justify-end pt-6 border-t border-gray-100'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] shadow-lg'
            >
              {isSubmitting ? (
                <>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <CheckIcon className='w-5 h-5 mr-2' />
                  Submit Prescription
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionForm;
