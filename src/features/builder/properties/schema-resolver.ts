import type {
  BuilderComponentDefinition,
  ComponentSettingsSchemaField,
} from "@/types/api";
import type { PropertyFieldSchema } from "./schemas";

/** Maps backend registry keys to frontend React components */
export const COMPONENT_KEY_ALIASES: Record<string, string> = {
  "hero.basic": "hero.classic",
  "hero.classic": "hero.classic",
  "hero.centered": "hero.classic",
  "about.story": "about.timeline",
  "about.timeline": "about.timeline",
  "footer.simple": "footer.standard",
  "footer.standard": "footer.standard",
  "cta.banner": "cta.banner",
};

export function normalizeComponentKey(key: string): string {
  return COMPONENT_KEY_ALIASES[key] ?? key;
}

function inferFieldType(
  key: string,
  value: unknown,
  schemaField?: ComponentSettingsSchemaField,
): PropertyFieldSchema["type"] {
  if (schemaField?.type === "boolean") return "toggle";
  if (schemaField?.type === "integer" || schemaField?.type === "number") {
    return "number";
  }
  if (schemaField?.enum?.length) return "select";
  if (schemaField?.format === "uri" || schemaField?.format === "url") {
    return "url";
  }
  if (schemaField?.format === "color") return "color";

  const lower = key.toLowerCase();
  if (lower.includes("color") || lower.includes("colour")) return "color";
  if (
    lower.includes("image") ||
    lower.includes("photo") ||
    lower.includes("poster") ||
    lower.includes("thumbnail")
  ) {
    return "image";
  }
  if (lower.includes("video") || lower.includes("videourl")) return "url";
  if (
    lower.includes("href") ||
    lower.includes("url") ||
    lower.includes("link")
  ) {
    return "url";
  }
  if (
    lower.includes("body") ||
    lower.includes("description") ||
    lower.includes("subtitle") ||
    lower.includes("subheadline")
  ) {
    return "textarea";
  }
  if (typeof value === "boolean") return "toggle";
  if (typeof value === "number") return "number";
  if (Array.isArray(value)) return "textarea";
  if (typeof value === "object" && value !== null) return "textarea";
  return "text";
}

function schemaFieldToProperty(
  key: string,
  schemaField: ComponentSettingsSchemaField,
): PropertyFieldSchema {
  const type = inferFieldType(key, schemaField.default, schemaField);
  return {
    key,
    label: schemaField.title ?? humanizeKey(key),
    type,
    placeholder: schemaField.description,
    min: schemaField.minimum,
    max: schemaField.maximum,
    options: schemaField.enum?.map((value) => ({
      label: humanizeKey(value),
      value,
    })),
    group: "Settings",
  };
}

function defaultSettingsToFields(
  defaultSettings: Record<string, unknown>,
): PropertyFieldSchema[] {
  return Object.entries(defaultSettings).map(([key, value]) => ({
    key,
    label: humanizeKey(key),
    type: inferFieldType(key, value),
    group: "Content",
  }));
}

function settingsSchemaToFields(
  schema: Record<string, ComponentSettingsSchemaField>,
): PropertyFieldSchema[] {
  const fields: PropertyFieldSchema[] = [];

  for (const [key, field] of Object.entries(schema)) {
    if (field.type === "object" && field.properties) {
      for (const [childKey, childField] of Object.entries(field.properties)) {
        fields.push(schemaFieldToProperty(childKey, childField));
      }
      continue;
    }
    fields.push(schemaFieldToProperty(key, field));
  }

  return fields;
}

function humanizeKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export function resolvePropertySchemaFromComponent(
  component?: BuilderComponentDefinition | null,
  fallbackKey?: string,
): PropertyFieldSchema[] {
  if (!component) {
    return fallbackKey
      ? [
          {
            key: "headline",
            label: "Headline",
            type: "text",
            group: "Content",
          },
          {
            key: "subtitle",
            label: "Subtitle",
            type: "textarea",
            group: "Content",
          },
        ]
      : [];
  }

  if (
    component.settingsSchema &&
    Object.keys(component.settingsSchema).length
  ) {
    return settingsSchemaToFields(component.settingsSchema);
  }

  if (
    component.defaultSettings &&
    Object.keys(component.defaultSettings).length
  ) {
    return defaultSettingsToFields(component.defaultSettings);
  }

  return [
    { key: "headline", label: "Headline", type: "text", group: "Content" },
    { key: "subtitle", label: "Subtitle", type: "textarea", group: "Content" },
  ];
}

export function getComponentDefinition(
  registry: BuilderComponentDefinition[] | undefined,
  componentKey: string,
): BuilderComponentDefinition | undefined {
  if (!registry?.length) return undefined;
  const normalized = normalizeComponentKey(componentKey);
  return (
    registry.find((c) => c.key === componentKey) ??
    registry.find((c) => c.key === normalized)
  );
}
