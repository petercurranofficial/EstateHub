export const metadata = {
  title: 'Terms and Conditions – EstateHub',
  description: 'Read the terms and conditions of using EstateHub.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="text-gray-700 mb-4">
        By using EstateHub, you agree to the following terms. This is a placeholder – replace with your actual legal terms before launch.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of the Website</h2>
      <p className="text-gray-700 mb-4">
        You may use this website for lawful purposes related to property search and enquiry. Misuse of this service is prohibited.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">2. Property Listings</h2>
      <p className="text-gray-700 mb-4">
        We strive to keep all listings accurate and up to date, but we do not guarantee the availability or accuracy of any listing.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Enquiries</h2>
      <p className="text-gray-700 mb-4">
        When submitting an enquiry, you consent to being contacted by an EstateHub agent.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
      <p className="text-gray-700">
        EstateHub is not liable for any damages arising from use of this website.
      </p>
    </div>
  );
}
