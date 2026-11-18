'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AgentsClient() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      const res = await fetch('/api/agents');
      const data = await res.json();
      setAgents(data);
      setLoading(false);
    };
    fetchAgents();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Our Agents</h1>
      {loading ? (
        <p>Loading agents...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Link href={`/agents/${agent.id}`} key={agent.id} className="block border rounded overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="p-4 text-center">
                {agent.photoUrl ? (
                  <Image src={agent.photoUrl} alt={agent.name} width={150} height={150} className="rounded-full mx-auto" />
                ) : (
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto"></div>
                )}
                <h3 className="mt-2 text-xl font-semibold">{agent.name}</h3>
                <p className="text-sm text-gray-600">{agent.email}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
