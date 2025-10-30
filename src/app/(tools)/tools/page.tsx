import { ToolsGrid } from "@/components/home/tools-grid";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AllToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All AI Tools</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our extensive collection of 100+ AI-powered tools designed to enhance your productivity, creativity, and more.
          </p>
        </div>
        <ToolsGrid />
      </main>
      <Footer />
    </div>
  );
}