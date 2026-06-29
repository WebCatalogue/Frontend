export interface EnquiryFormValues {
  businessName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface EnquiryFormErrors {
  businessName?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export function getEnquiryFormValues(form: HTMLFormElement): EnquiryFormValues {
  const data = new FormData(form);
  return {
    businessName: String(data.get("businessName") ?? "").trim(),
    contactName: String(data.get("contactName") ?? "").trim(),
    contactEmail: String(data.get("contactEmail") ?? "").trim(),
    contactPhone: String(data.get("contactPhone") ?? "").trim(),
  };
}

export function validateEnquiryForm(
  values: EnquiryFormValues,
): EnquiryFormErrors | null {
  const errors: EnquiryFormErrors = {};

  if (!values.businessName) {
    errors.businessName = "Business name is required.";
  }

  if (!values.contactName) {
    errors.contactName = "Your name is required.";
  }

  if (!values.contactEmail) {
    errors.contactEmail = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contactEmail)) {
    errors.contactEmail = "Enter a valid email address.";
  }

  if (!values.contactPhone) {
    errors.contactPhone = "Phone number is required.";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}
