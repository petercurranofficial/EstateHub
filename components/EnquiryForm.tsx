import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EnquiryForm({ propertyId }: { propertyId: number }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, propertyId }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      // optional: clear form
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded bg-white shadow-sm">
      <h2 className="text-xl font-semibold">Enquire about this property</h2>
      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={form.email}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone number"
        value={form.phone}
        onChange={handleChange}
        className="input"
      />
      <textarea
        name="message"
        placeholder="Your message"
        value={form.message}
        onChange={handleChange}
        className="input"
        rows={4}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        {status === 'loading' ? 'Sending...' : 'Send Enquiry'}
      </button>
      {status === 'success' && <p className="text-green-600">Enquiry sent successfully.</p>}
      {status === 'error' && <p className="text-red-600">Failed to send enquiry.</p>}
    </form>
  );
}
