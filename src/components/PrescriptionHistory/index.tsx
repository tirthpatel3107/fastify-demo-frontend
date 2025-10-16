import React, { useState, useEffect } from 'react';
import { RefreshCw, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';

// Mock prescription data type
interface Prescription {
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

// Mock prescription data
const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    patientName: 'John Doe',
    dob: '1985-03-15',
    address: '123 Main St, City, State 12345',
    medication: 'Paracetamol 500mg',
    dosage: '1 tablet twice daily',
    deliveryType: 'Home Delivery',
    status: 'approved',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    dob: '1990-07-22',
    address: '456 Oak Ave, City, State 12345',
    medication: 'Ibuprofen 400mg',
    dosage: '1 tablet every 6 hours',
    deliveryType: 'Pickup from Pharmacy',
    status: 'pending',
    createdAt: '2024-01-16T09:15:00Z',
    updatedAt: '2024-01-16T09:15:00Z',
  },
  {
    id: '3',
    patientName: 'Bob Johnson',
    dob: '1978-11-08',
    address: '789 Pine St, City, State 12345',
    medication: 'Amoxicillin 250mg',
    dosage: '2 tablets three times daily',
    deliveryType: 'Express Delivery',
    status: 'delivered',
    createdAt: '2024-01-14T16:45:00Z',
    updatedAt: '2024-01-15T11:30:00Z',
  },
];

const PrescriptionHistory: React.FC = () => {
  const [prescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchPrescriptions = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, this would be an API call
      // const response = await prescriptionService.getPrescriptions();
      // setPrescriptions(response.data);

      // For now, we'll just update the last updated time
      setLastUpdated(new Date());
    } catch {
      // console.error('Failed to fetch prescriptions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className='w-4 h-4 text-yellow-500' />;
      case 'approved':
        return <CheckCircle className='w-4 h-4 text-green-500' />;
      case 'rejected':
        return <XCircle className='w-4 h-4 text-red-500' />;
      case 'delivered':
        return <CheckCircle className='w-4 h-4 text-blue-500' />;
      default:
        return <Clock className='w-4 h-4 text-gray-500' />;
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
    <div className='bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden'>
      {/* Header */}
      <div className='bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-2xl font-bold text-white flex items-center'>
              <svg className='w-6 h-6 mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
              </svg>
              Prescription History
            </h2>
            <p className='text-emerald-100 mt-1'>
              View and manage all prescription records
            </p>
          </div>
          <div className='flex items-center space-x-4'>
            <span className='text-sm text-emerald-100 bg-emerald-700 bg-opacity-30 px-3 py-1 rounded-full'>
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <button
              onClick={fetchPrescriptions}
              disabled={isLoading}
              className='flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
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
      <div className='p-8'>

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
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {prescriptions.map(prescription => (
                <tr key={prescription.id} className='hover:bg-gray-50 transition-colors duration-150'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div>
                    <div className='text-sm font-medium text-gray-900'>
                      {prescription.patientName}
                    </div>
                    <div className='text-sm text-gray-500'>
                      DOB: {new Date(prescription.dob).toLocaleDateString()}
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
                  {prescription.deliveryType}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      prescription.status
                    )}`}
                  >
                    {getStatusIcon(prescription.status)}
                    <span className='ml-1 capitalize'>
                      {prescription.status}
                    </span>
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {formatDate(prescription.createdAt)}
                </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <button className='text-indigo-600 hover:text-indigo-900 flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-indigo-50 transition-colors duration-200'>
                      <Eye className='w-4 h-4' />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {prescriptions.length === 0 && (
          <div className='text-center py-12'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
              </svg>
            </div>
            <p className='text-gray-500 text-lg'>No prescriptions found.</p>
            <p className='text-gray-400 text-sm mt-1'>Prescriptions will appear here once they are created.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionHistory;
