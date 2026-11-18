import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
  const agent = await prisma.agent.findUnique({ where: { id: Number(params.id) } });
  if (!agent) return { title: 'Agent Not Found' };
  return { title: `${agent.name} – EstateHub Agent` };
};

export default async function AgentProfile({ params }: { params: { id: string } }) {
  const agent = await prisma.agent.findUnique({
    where: { id: Number(params.id) },
    include: { properties: true },
  });
  if (!agent) return <p>Agent not found.</p>;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <div className="flex items-center space-x-6">
        {agent.photoUrl && (
          <Image src={agent.photoUrl} alt={agent.name} width={150} height={150} className="rounded-full" />
        )}
        <div>
          <h1 className="text-3xl font-bold">{agent.name}</h1>
          <p className="text-gray-600">{agent.email}</p>
          <p className="text-gray-600">{agent.phone}</p>
        </div>
      </div>
      <h2 className="text-2xl font-semibold">Properties Managed</h2>
      {agent.properties.length ? (
        <ul className="list-disc pl-5 space-y-1">
          {agent.properties.map((p) => (
            <li key={p.id}>
              <Link href={`/property/${p.slug}`} className="text-primary hover:underline">{p.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No properties assigned.</p>
      )}
      <a href={`mailto:${agent.email}`} className="bg-primary text-white px-4 py-2 rounded inline-block mt-4">
        Contact {agent.name}
      </a>
    </div>
  );
}
