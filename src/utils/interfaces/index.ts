// =============================================================================
// API Response Interfaces
// =============================================================================

import { DeliveryTypeOptions } from '../enums';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface Error {
  message: string[];
  statusCode: number;
}

// =============================================================================
// Medicine Interfaces
// =============================================================================

export interface Medicine {
  snomedId: string;
  displayName: string;
  unlicensed: boolean;
  endorsements: Record<string, any>;
  prescribeByBrandOnly: boolean;
  type: string;
  bnfExactMatch: any;
  bnfMatches: any;
  applianceTypes: any[];
}

export interface MedicinesResponse {
  success: boolean;
  data: {
    meds: Medicine[];
    total: number;
  };
  message: string;
}

// =============================================================================
// Patient Interfaces
// =============================================================================

export interface Patient {
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone: string;
  birth_day: string;
  birth_month: string;
  birth_year: string;
  address_ln1: string;
  address_ln2: string;
  city: string;
  post_code: string;
  country: string;
  client_ref_id: string;
}

export interface PatientResponse {
  success: boolean;
  data: Patient;
  message: string;
}

// =============================================================================
// Prescription Interfaces
// =============================================================================

export interface PrescriptionFormData {
  patientName: string;
  dob: string;
  address: string;
  medication: string;
  dosage: string;
  deliveryType: DeliveryTypeOptions;
}

export interface Prescription {
  prescription_id: any;
  id: string;
  patient_name: string;
  patient_dob: string;
  patient_address: string;
  medication: string;
  dosage: string;
  delivery_type: 'pickup' | 'delivery';
  doctor_id: string;
  payload: any;
  status: 'Pending' | 'Sent' | 'Delivered' | 'Failed';
  created_at: string;
  updated_at: string;
}

export interface PrescriptionResponse {
  success: boolean;
  data: Prescription;
  message: string;
}

export interface PrescriptionsResponse {
  success: boolean;
  data: Prescription[];
  message: string;
}

// =============================================================================
// Component Interfaces
// =============================================================================

export interface HeaderProps {
  title: string;
  subtitle?: string;
}

export interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export interface TabbedLayoutProps {
  tabs: Tab[];
  defaultTab?: string;
}

export interface PrescriptionFormProps {
  onSubmit: (data: PrescriptionFormData) => Promise<void>;
  isSubmitting?: boolean;
}

// =============================================================================
// Status Mapping Types
// =============================================================================

export type PrescriptionStatus = 'Pending' | 'Sent' | 'Delivered' | 'Failed';
export type MappedPrescriptionStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'delivered';
export type DeliveryType = 'pickup' | 'delivery';
export type MappedDeliveryType = DeliveryTypeOptions.PICKUP_FROM_PHARMACY | DeliveryTypeOptions.HOME_DELIVERY;


// =============================================================================
// Utility Types
// =============================================================================

export type PrescriptionStatusMapping = {
  [K in PrescriptionStatus]: MappedPrescriptionStatus;
};

export type DeliveryTypeMapping = {
  [K in DeliveryType]: MappedDeliveryType;
};
