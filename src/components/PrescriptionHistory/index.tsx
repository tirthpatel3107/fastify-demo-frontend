import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

// utils
import prescriptionService from '../../utils/apis/services/prescriptionService';
import type {
  Prescription,
} from '../../utils/interfaces';
import { DeliveryTypeOptions } from '../../utils/enums';
import { mapBackendToFrontendStatus } from '../../utils/constants/statusMapping';
import { ClipboardIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '../../utils/SVGIcons';

// Use centralized status mapping function
const mapStatus = mapBackendToFrontendStatus;

// Helper function to map delivery type
const mapDeliveryType = (
  deliveryType: string
): DeliveryTypeOptions | string => {
  switch (deliveryType) {
    case 'pickup':
      return DeliveryTypeOptions.PICKUP_FROM_PHARMACY;
    case 'delivery':
      return DeliveryTypeOptions.HOME_DELIVERY;
    default:
      return deliveryType;
  }
};

const PrescriptionHistory: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches prescription data from the API
   */
  const fetchPrescriptions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await prescriptionService.getPrescriptions(50, 0);
      if (response.success && response.data) {
        setPrescriptions(response.data);
        setLastUpdated(new Date());
      } else {
        setError('Failed to fetch prescriptions');
      }
    } catch (error) {
      console.error('Failed to fetch prescriptions:', error);
      setError('Failed to fetch prescriptions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className='w-4 h-4 text-yellow-500' />;
      case 'approved':
        return <CheckCircleIcon className='w-4 h-4 text-green-500' />;
      case 'rejected':
        return <XCircleIcon className='w-4 h-4 text-red-500' />;
      case 'delivered':
        return <CheckCircleIcon className='w-4 h-4 text-blue-500' />;
      default:
        return <ClockIcon className='w-4 h-4 text-gray-500' />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <div className='bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden'>
      {/* Header */}
      <div className='bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-xl font-bold text-white flex items-center'>
              <ClipboardIcon className='w-5 h-5 mr-2' />
              Prescription History
            </h2>
            <p className='text-emerald-100 text-sm mt-1'>
              View and manage all prescription records
            </p>
          </div>
          <div className='flex items-center space-x-3'>
            <span className='text-xs text-emerald-100 bg-emerald-700 bg-opacity-30 px-2 py-1 rounded-full'>
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <button
              onClick={fetchPrescriptions}
              disabled={isLoading}
              className='flex items-center space-x-2 px-3 py-1.5 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm'
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
              />
              <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className='p-6'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gradient-to-r from-gray-50 to-gray-100'>
              <tr>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Patient
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Medication
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Dosage
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Delivery
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Created
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {prescriptions.map(prescription => (
                <tr
                  key={prescription.id}
                  className='hover:bg-gray-50 transition-colors duration-150'
                >
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div>
                      <div className='text-sm font-medium text-gray-900'>
                        {prescription.patient_name}
                      </div>
                      <div className='text-sm text-gray-500'>
                        DOB:{' '}
                        {new Date(
                          prescription.patient_dob
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {prescription.medication}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {prescription.dosage}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {mapDeliveryType(prescription.delivery_type)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        mapStatus(prescription.status)
                      )}`}
                    >
                      {getStatusIcon(mapStatus(prescription.status))}
                      <span className='ml-1 capitalize'>
                        {mapStatus(prescription.status)}
                      </span>
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {formatDate(prescription.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {error && (
          <div className='text-center py-12'>
            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <XCircleIcon className='w-8 h-8 text-red-400' />
            </div>
            <p className='text-red-500 text-lg'>{error}</p>
            <button
              onClick={fetchPrescriptions}
              className='mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200'
            >
              Try Again
            </button>
          </div>
        )}

        {!error && prescriptions.length === 0 && !isLoading && (
          <div className='text-center py-12'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <ClipboardIcon className='w-8 h-8 text-gray-400' />
            </div>
            <p className='text-gray-500 text-lg'>No prescriptions found.</p>
            <p className='text-gray-400 text-sm mt-1'>
              Prescriptions will appear here once they are created.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionHistory;
