import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [name, setName] = useState("Stella Lounge");
  const [currency, setCurrency] = useState("TL");
  const [notify, setNotify] = useState(true);

  return (
    <div className="max-w-2xl space-y-8 animate-fade-up">
      <div>
        <h1 className="font-display text-3xl tracking-wide">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure your venue preferences.</p>
      </div>

      <div className="rounded-xl border border-[rgba(212,175,55,0.12)] bg-[#0d0d0d] p-6 space-y-5">
        <Field label="Venue Name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/60 border border-[rgba(212,175,55,0.15)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </Field>

        <Field label="Currency Symbol">
          <input
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full bg-black/60 border border-[rgba(212,175,55,0.15)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </Field>

        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="text-sm">Out-of-stock notifications</div>
            <div className="text-xs text-muted-foreground">Email alerts when an item runs out.</div>
          </div>
          <Toggle checked={notify} onChange={setNotify} />
        </div>
      </div>

      <button className="inline-flex items-center gap-2 bg-gold text-black px-5 py-2.5 rounded-md text-sm font-medium hover:bg-[#e8cf85] transition-colors">
        <Save className="h-4 w-4" /> Save changes
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        checked ? "bg-gold" : "bg-white/10"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-black shadow transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}
