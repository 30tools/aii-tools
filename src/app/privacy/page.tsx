import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy - 30tools | How We Protect Your Data",
  description: "Read our privacy policy to understand how 30tools protects your data and privacy while using our free AI tools. No data storage, maximum privacy.",
  keywords: ["privacy policy", "data protection", "30tools privacy", "AI tools privacy"],
  alternates: {
    canonical: "https://ai-tools.30tools.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 1, 2025</p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Welcome to 30tools ("we," "our," or "us"). This Privacy Policy explains how we collect, use, 
                and protect information when you use our AI tools platform at 30tools.com.
              </p>
              <p>
                We are committed to protecting your privacy and ensuring transparency about our data practices. 
                This policy describes our minimal data collection approach and your rights regarding any information we may process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Do NOT Collect</h2>
              <p>Unlike many other platforms, 30tools is designed with privacy in mind:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We do not require user registration or accounts</li>
                <li>We do not store the text or content you submit to our AI tools</li>
                <li>We do not collect personal information like names, emails, or phone numbers</li>
                <li>We do not use cookies for tracking or personalization</li>
                <li>We do not share your data with third parties for marketing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Information We May Collect</h2>
              <p>We may collect minimal, non-personal information to improve our services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Usage Analytics:</strong> Page views, tool usage patterns, and general traffic data</li>
                <li><strong>Technical Information:</strong> Browser type, device type, and IP address (anonymized)</li>
                <li><strong>Performance Data:</strong> Error logs and performance metrics to improve our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. How We Process Your Content</h2>
              <p>When you use our AI tools:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your input is sent to AI service providers (like OpenAI) for processing</li>
                <li>Content is processed in real-time and immediately discarded</li>
                <li>We do not store, log, or retain any of your input or output content</li>
                <li>Each session is independent with no memory of previous interactions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>OpenAI:</strong> For AI processing (subject to OpenAI's privacy policy)</li>
                <li><strong>Vercel:</strong> For hosting and analytics</li>
                <li><strong>Google AdSense:</strong> For advertising (subject to Google's privacy policy)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
              <p>
                We implement appropriate security measures to protect against unauthorized access, 
                alteration, disclosure, or destruction of information. All communications with our 
                servers are encrypted using HTTPS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
              <p>Since we don't store personal data, most data rights don't apply. However, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use our services without providing personal information</li>
                <li>Contact us about any privacy concerns</li>
                <li>Request information about our data practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
              <p>
                Our services are not directed to children under 13. We do not knowingly collect 
                personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any 
                changes by posting the new policy on this page with an updated "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: privacy@30tools.com</li>
                <li>Website: https://30tools.com/contact</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}