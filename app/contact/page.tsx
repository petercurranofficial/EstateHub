import EnquiryForm from '@/components/EnquiryForm';

export const metadata = {
  title: 'Contact Us – EstateHub',
  description: 'Get in touch with EstateHub for any questions or support.',
};

export default function ContactPage() {
  // The generic contact form will submit an enquiry with propertyId = 0 (placeholder)
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6 text-gray-700">
        Have a question or need assistance? Fill out the form below and we’ll get back to you shortly.
      </p>
      {/* Re‑use EnquiryForm but with a hidden propertyId of 0 */}
      <EnquiryForm propertyId={0} />
    </div>
  );
}
