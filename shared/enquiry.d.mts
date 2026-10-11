export type EnquiryPayload = {
  name: string;
  email: string;
  organisation: string;
  phone: string;
  type: string;
  message: string;
  website: string;
  consent: boolean;
};
export const ENQUIRY_TYPES: string[];
export function normalizeEnquiry(input: unknown): EnquiryPayload;
export function validateEnquiry(input: unknown): Record<string, string>;
export function formatEnquiry(input: unknown): string;
