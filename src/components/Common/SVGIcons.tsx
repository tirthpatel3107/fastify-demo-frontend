import React from 'react';

interface SVGIconProps {
  className?: string;
  size?: number;
}

// Plus Icon (Add/Create)
export const PlusIcon: React.FC<SVGIconProps> = ({
  className = 'w-5 h-5',
  size,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
    />
  </svg>
);

// Check Icon (Success/Confirm)
export const CheckIcon: React.FC<SVGIconProps> = ({
  className = 'w-5 h-5',
  size,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M5 13l4 4L19 7'
    />
  </svg>
);

// Document Icon (Prescription/File)
export const DocumentIcon: React.FC<SVGIconProps> = ({
  className = 'w-5 h-5',
  size,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    />
  </svg>
);

// Clipboard Icon (Prescription History)
export const ClipboardIcon: React.FC<SVGIconProps> = ({
  className = 'w-5 h-5',
  size,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
    />
  </svg>
);

// Loading Spinner Icon
export const LoadingSpinnerIcon: React.FC<SVGIconProps> = ({
  className = 'animate-spin h-5 w-5',
  size,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
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
    />
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    />
  </svg>
);

// Clock Icon (Pending/Waiting)
export const ClockIcon: React.FC<SVGIconProps> = ({
  className = 'w-4 h-4',
  size,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <circle cx='12' cy='12' r='10' />
    <polyline points='12,6 12,12 16,14' />
  </svg>
);

// Check Circle Icon (Success/Approved)
export const CheckCircleIcon: React.FC<SVGIconProps> = ({
  className = 'w-4 h-4',
  size,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
    <polyline points='22,4 12,14.01 9,11.01' />
  </svg>
);

// X Circle Icon (Error/Rejected)
export const XCircleIcon: React.FC<SVGIconProps> = ({
  className = 'w-4 h-4',
  size,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <circle cx='12' cy='12' r='10' />
    <line x1='15' y1='9' x2='9' y2='15' />
    <line x1='9' y1='9' x2='15' y2='15' />
  </svg>
);

// User Icon (Profile/Avatar)
export const UserIcon: React.FC<SVGIconProps> = ({
  className = 'w-5 h-5',
  size,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
    <circle cx='12' cy='7' r='4' />
  </svg>
);

// LogOut Icon (Sign Out)
export const LogOutIcon: React.FC<SVGIconProps> = ({
  className = 'w-4 h-4',
  size,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
    <polyline points='16,17 21,12 16,7' />
    <line x1='21' y1='12' x2='9' y2='12' />
  </svg>
);

// ChevronDown Icon (Dropdown)
export const ChevronDownIcon: React.FC<SVGIconProps> = ({
  className = 'w-4 h-4',
  size,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <polyline points='6,9 12,15 18,9' />
  </svg>
);

// Refresh Icon (Reload/Update)
export const RefreshIcon: React.FC<SVGIconProps> = ({
  className = 'w-4 h-4',
  size,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <polyline points='23,4 23,10 17,10' />
    <polyline points='1,20 1,14 7,14' />
    <path d='M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15' />
  </svg>
);

// FileText Icon (Document/Form)
export const FileTextIcon: React.FC<SVGIconProps> = ({
  className = 'w-5 h-5',
  size,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
    <polyline points='14,2 14,8 20,8' />
    <line x1='16' y1='13' x2='8' y2='13' />
    <line x1='16' y1='17' x2='8' y2='17' />
    <polyline points='10,9 9,9 8,9' />
  </svg>
);

// History Icon (Timeline/Records)
export const HistoryIcon: React.FC<SVGIconProps> = ({
  className = 'w-5 h-5',
  size,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <circle cx='12' cy='12' r='10' />
    <polyline points='12,6 12,12 16,14' />
  </svg>
);
