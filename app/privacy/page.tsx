export const metadata = {
  title: 'Privacy Policy – EstateHub',
  description: 'EstateHub privacy policy and data protection details.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        This is a placeholder privacy policy. Replace with your actual legal text.
      </p>
      <p className="text-gray-700 mb-2">
        We collect personal data to facilitate property enquiries and improve our services. Your data is stored securely and never shared with third parties without consent.
      </p>
      <p className="text-gray-700 mb-2">
        For any questions regarding your data, contact us at <a href="mailto:privacy@estatehub.com" className="text-primary hover:underline">privacy@estatehub.com</a>.
      </p>
    </div>
  );
}
