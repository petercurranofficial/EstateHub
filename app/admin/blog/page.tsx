'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch('/api/blog');
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const togglePublish = async (id: number, published: boolean) => {
    await fetch(`/api/blog/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !published }),
    });
    fetchPosts();
  };

  const deletePost = async (id: number) => {
    if (!confirm('Delete this blog post?')) return;
    await fetch(`/api/blog/${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Blog</h1>
        <Link href="/admin/blog/new" className="bg-primary text-white px-4 py-2 rounded">+ New Post</Link>
      </div>
      {loading ? <p>Loading...</p> : (
        <table className="w-full text-sm bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Published</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p: any) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{p.title}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-3">{new Date(p.createdAt).toLocaleDateString()}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => togglePublish(p.id, p.published)} className="text-blue-600 hover:underline text-xs">
                    {p.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <Link href={`/admin/blog/${p.id}/edit`} className="text-green-600 hover:underline text-xs">Edit</Link>
                  <button onClick={() => deletePost(p.id)} className="text-red-600 hover:underline text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
