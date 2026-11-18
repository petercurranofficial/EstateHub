'use client';
import { useEffect, useState } from 'react';

const SETTING_KEYS = [
  { key: 'companyName', label: 'Company Name' },
  { key: 'contactEmail', label: 'Contact Email' },
  { key: 'contactPhone', label: 'Contact Phone' },
  { key: 'address', label: 'Address' },
  { key: 'facebookUrl', label: 'Facebook URL' },
  { key: 'twitterUrl', label: 'Twitter URL' },
  { key: 'instagramUrl', label: 'Instagram URL' },
  { key: 'linkedinUrl', label: 'LinkedIn URL' },
  { key: 'footerText', label: 'Footer Text' },
  { key: 'seoTitle', label: 'Default SEO Title' },
  { key: 'seoDescription', label: 'Default SEO Description' },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/settings').then(r => r.json()).then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <p>Loading settings...</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Website Settings</h1>
      {saved && <p className="text-green-600">Settings saved successfully.</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        {SETTING_KEYS.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type="text"
              value={settings[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className="input w-full"
            />
          </div>
        ))}
        <button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
