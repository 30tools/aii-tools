import { CheckCircle, Zap, Shield, Smartphone } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in seconds with our optimized AI models and efficient processing."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is never stored. All processing happens in real-time and is immediately discarded."
    },
    {
      icon: CheckCircle,
      title: "No Account Required",
      description: "Start using any tool instantly without signing up or providing personal information."
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "All tools work perfectly on mobile devices with responsive design and touch optimization."
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose 30tools?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We&apos;ve built the most user-friendly AI tools platform with your needs in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}