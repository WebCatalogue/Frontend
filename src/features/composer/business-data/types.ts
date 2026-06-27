export type BusinessDataType =
  | "cafe-menu"
  | "gym-memberships"
  | "salon-services"
  | "restaurant-categories"
  | "team-members"
  | "testimonials"
  | "gallery"
  | "pricing"
  | "faqs"
  | "events";

export interface BusinessDataField {
  key: string;
  label: string;
  type: "text" | "number" | "image" | "url" | "textarea";
  required?: boolean;
}

export interface BusinessDataSource {
  id: BusinessDataType;
  name: string;
  description: string;
  icon: string;
  /** Backend endpoint pattern — consumed when API ships */
  apiEndpoint: string;
  fields: BusinessDataField[];
  industries: string[];
}

export interface BusinessDataRecord {
  id: string;
  [key: string]: unknown;
}
