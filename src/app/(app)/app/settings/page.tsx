export default function SettingsPage() {
  return (
    <div className="surface-2 border-border rounded-[var(--radius-2xl)] border border-dashed p-10 text-center">
      <h1 className="type-heading-md font-medium">Workspace settings</h1>
      <p className="type-body-sm text-foreground-muted mt-2">
        Tenant and account settings will connect when the backend exposes
        configuration APIs.
      </p>
    </div>
  );
}
