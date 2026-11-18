import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Image from 'next/image';

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} – EstateHub Blog`,
    description: post.excerpt || post.content.slice(0, 150),
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
};

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, published: true },
  });
  if (!post) notFound();

  // Article structured data
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    image: post.coverImage || '',
    description: post.excerpt || '',
  };

  return (
    <article className="max-w-3xl mx-auto py-8 space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {post.coverImage && (
        <Image src={post.coverImage} alt={post.title} width={800} height={400} className="rounded w-full object-cover" />
      )}
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
      <div
        className="prose prose-lg max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
