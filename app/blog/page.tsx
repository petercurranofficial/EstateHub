import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Blog – EstateHub',
  description: 'Read the latest real estate news and tips from EstateHub.',
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">No blog posts yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={400}
                  height={220}
                  className="object-cover w-full h-44"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">{post.title}</Link>
                </h2>
                {post.excerpt && <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>}
                <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
                <Link href={`/blog/${post.slug}`} className="mt-3 inline-block text-primary hover:underline text-sm">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
