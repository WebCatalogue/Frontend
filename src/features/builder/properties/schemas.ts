export type PropertyFieldType =
  | "text"
  | "textarea"
  | "url"
  | "number"
  | "select"
  | "toggle"
  | "image"
  | "color";

export interface PropertyFieldSchema {
  key: string;
  label: string;
  type: PropertyFieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  group?: string;
}

export const COMPONENT_PROPERTY_SCHEMAS: Record<string, PropertyFieldSchema[]> =
  {
    "hero.basic": [
      { key: "headline", label: "Title", type: "text", group: "Content" },
      {
        key: "subtitle",
        label: "Subtitle",
        type: "textarea",
        group: "Content",
      },
      {
        key: "ctaLabel",
        label: "Primary button",
        type: "text",
        group: "Buttons",
      },
      { key: "ctaHref", label: "Primary link", type: "url", group: "Buttons" },
      {
        key: "alignment",
        label: "Alignment",
        type: "select",
        group: "Layout",
        options: [
          { label: "Center", value: "center" },
          { label: "Left", value: "left" },
        ],
      },
      {
        key: "height",
        label: "Height",
        type: "select",
        group: "Layout",
        options: [
          { label: "Standard", value: "standard" },
          { label: "Tall", value: "tall" },
          { label: "Full screen", value: "fullscreen" },
        ],
      },
      {
        key: "animation",
        label: "Animation",
        type: "select",
        group: "Motion",
        options: [
          { label: "Fade up", value: "fade-up" },
          { label: "None", value: "none" },
        ],
      },
      {
        key: "image",
        label: "Background image",
        type: "image",
        group: "Media",
      },
    ],
    "hero.split": [
      { key: "headline", label: "Title", type: "text", group: "Content" },
      {
        key: "subtitle",
        label: "Subtitle",
        type: "textarea",
        group: "Content",
      },
      {
        key: "ctaLabel",
        label: "Primary button",
        type: "text",
        group: "Buttons",
      },
      { key: "ctaHref", label: "Primary link", type: "url", group: "Buttons" },
      {
        key: "secondaryCtaLabel",
        label: "Secondary button",
        type: "text",
        group: "Buttons",
      },
      { key: "image", label: "Hero image", type: "image", group: "Media" },
      {
        key: "alignment",
        label: "Image position",
        type: "select",
        group: "Layout",
        options: [
          { label: "Image right", value: "right" },
          { label: "Image left", value: "left" },
        ],
      },
    ],
    "gallery.grid": [
      {
        key: "columns",
        label: "Columns",
        type: "select",
        group: "Layout",
        options: [
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
        ],
      },
      {
        key: "gap",
        label: "Gap (px)",
        type: "number",
        min: 0,
        max: 48,
        group: "Layout",
      },
      {
        key: "lightbox",
        label: "Enable lightbox",
        type: "toggle",
        group: "Behaviour",
      },
      {
        key: "rounded",
        label: "Rounded corners",
        type: "toggle",
        group: "Style",
      },
      {
        key: "lazyLoad",
        label: "Lazy loading",
        type: "toggle",
        group: "Performance",
      },
    ],
    "about.story": [
      { key: "title", label: "Title", type: "text", group: "Content" },
      { key: "body", label: "Body", type: "textarea", group: "Content" },
      { key: "image", label: "Image", type: "image", group: "Media" },
    ],
    "cta.banner": [
      { key: "headline", label: "Headline", type: "text", group: "Content" },
      {
        key: "subtitle",
        label: "Subtitle",
        type: "textarea",
        group: "Content",
      },
      {
        key: "ctaLabel",
        label: "Button label",
        type: "text",
        group: "Buttons",
      },
      { key: "ctaHref", label: "Button link", type: "url", group: "Buttons" },
    ],
    "faq.accordion": [
      { key: "title", label: "Section title", type: "text", group: "Content" },
    ],
    "contact.map": [
      { key: "title", label: "Title", type: "text", group: "Content" },
      { key: "address", label: "Address", type: "textarea", group: "Content" },
      { key: "phone", label: "Phone", type: "text", group: "Content" },
      { key: "email", label: "Email", type: "text", group: "Content" },
    ],
  };

export function getPropertySchema(componentKey: string): PropertyFieldSchema[] {
  return (
    COMPONENT_PROPERTY_SCHEMAS[componentKey] ?? [
      { key: "headline", label: "Headline", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
    ]
  );
}
