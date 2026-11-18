'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewBlogPost() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', content: '', excerpt: '', published: false });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setForm({ ...form, [target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let coverImageUrl = '';
      if (coverImage) {
        const fd = new FormData();
        fd.append('file', coverImage);
        fd.append('propertyId', '0');
        const imgRes = await fetch('/api/images/upload', { method: 'POST', body: fd });
        const imgData = await imgRes.json();
        coverImageUrl = imgData.url;
      }
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, coverImage: coverImageUrl }),
      });
      if (!res.ok) throw new Error('Failed to create post');
      router.push('/admin/blog');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">New Blog Post</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" placeholder="Post Title" value={form.title} onChange={handleChange} required className="input w-full" />
        <input name="excerpt" placeholder="Short excerpt" value={form.excerpt} onChange={handleChange} className="input w-full" />
        <textarea name="content" placeholder="Content (HTML or plain text)" value={form.content} onChange={handleChange} className="input w-full" rows={10} />
        <div>
          <label className="block text-sm font-medium mb-1">Cover Image</label>
          <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files?.[0] || null)} className="input w-full" />
        </div>
        <label className="flex items-center space-x-2">
          <input name="published" type="checkbox" checked={form.published} onChange={handleChange} />
          <span>Publish immediately</span>
        </label>
        <button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2 rounded">
          {loading ? 'Saving...' : 'Save Post'}
        </button>
      </form>
    </div>
  );
}
