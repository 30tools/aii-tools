import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      content: "30tools has revolutionized my content creation workflow. The AI paraphraser and tweet generator save me hours every day!",
      rating: 5
    },
    {
      name: "Mark Chen",
      role: "Software Developer",
      content: "The code explainer and regex generator are incredibly helpful. Finally, AI tools that actually understand what developers need.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Marketing Manager",
      content: "I use the LinkedIn post formatter and headline generator daily. They've significantly improved my engagement rates.",
      rating: 5
    },
    {
      name: "Alex Rodriguez",
      role: "Student",
      content: "The study tools like flashcard maker and notes summarizer have made my learning so much more efficient. Love it!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Thousands
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our users say about their experience with 30tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg mb-4">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}