// =============================================================================
// Status Mapping Constants
// =============================================================================

export const STATUS_MAPPING = {
  // Backend to Frontend status mapping
  BACKEND_TO_FRONTEND: {
    'Pending': 'pending',
    'Sent': 'approved', 
    'Delivered': 'delivered',
    'Failed': 'rejected'
  },
  
  // Frontend to Backend status mapping (reverse)
  FRONTEND_TO_BACKEND: {
    'pending': 'Pending',
    'approved': 'Sent',
    'delivered': 'Delivered', 
    'rejected': 'Failed'
  }
} as const;

// Type-safe status mapping function
export const mapBackendToFrontendStatus = (status: string): 'pending' | 'approved' | 'delivered' | 'rejected' => {
  return STATUS_MAPPING.BACKEND_TO_FRONTEND[status as keyof typeof STATUS_MAPPING.BACKEND_TO_FRONTEND] || 'pending';
};

// Type-safe reverse status mapping function
export const mapFrontendToBackendStatus = (status: string): 'Pending' | 'Sent' | 'Delivered' | 'Failed' => {
  return STATUS_MAPPING.FRONTEND_TO_BACKEND[status as keyof typeof STATUS_MAPPING.FRONTEND_TO_BACKEND] || 'Pending';
};
