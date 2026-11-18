export const metadata = {
  title: 'About Us – EstateHub',
  description: 'Learn more about EstateHub, our mission, and the team.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">About EstateHub</h1>
      <p className="text-lg text-gray-700">
        EstateHub is a premium real‑estate platform dedicated to helping buyers, renters, and investors find their ideal properties across India. Our mission is to provide a seamless, trustworthy experience powered by modern technology and expert local knowledge.
      </p>
      <h2 className="text-2xl font-semibold mt-8">Why Choose Us?</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Extensive property database covering major cities and towns.</li>
        <li>Transparent listings with verified photos and detailed specs.</li>
        <li>Experienced agents and dedicated support.</li>
        <li>Secure, hassle‑free enquiry process.</li>
      </ul>
    </div>
  );
}
