import React from 'react';

// =============================================================================
// Delivery Type Enum
// =============================================================================

export enum DeliveryTypeOptions {
  HOME_DELIVERY = 'Home Delivery',
  PICKUP_FROM_PHARMACY = 'Pickup from Pharmacy',
  EXPRESS_DELIVERY = 'Express Delivery',
}

// =============================================================================
// Component Props Types
// =============================================================================

export interface HeaderProps {
  title: string;
  subtitle?: string;
}

export interface TabbedLayoutProps {
  tabs: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
    content: React.ReactNode;
  }>;
  defaultTab?: string;
}

export interface PrescriptionFormProps {
  onSubmit: (data: PrescriptionFormData) => Promise<void>;
  isSubmitting?: boolean;
}

// =============================================================================
// Data Types
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

export interface Prescription {
  id: string;
  prescription_id: string;
  signatureRx_id: string;
  patient_name: string;
  patient_dob: string;
  patient_address: string;
  medication: string;
  dosage: string;
  delivery_type: string;
  status: string;
  prescription_url: string;
  created_at: string;
  updated_at: string;
}

// =============================================================================
// Form Data Types
// =============================================================================

export interface PrescriptionFormData {
  patientName: string;
  dob: string;
  address: string;
  medication: string;
  dosage: string;
  deliveryType: DeliveryTypeOptions;
}

// =============================================================================
// API Response Types
// =============================================================================

export interface Error {
  success: false;
  message: string;
  error?: string;
}

export interface PrescriptionResponse {
  success: boolean;
  data?: {
    id: string;
    prescription_id: string;
    signatureRx_id: string;
    status: string;
    prescription_url: string;
    created_at: string;
    updated_at: string;
  };
  message: string;
}

export interface PrescriptionsResponse {
  success: boolean;
  data: Prescription[];
  message: string;
}

export interface MedicinesResponse {
  success: boolean;
  data: {
    meds: Medicine[];
    total: number;
  };
  message: string;
}

export interface PatientResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    dob: string;
    address: string;
  };
  message: string;
}