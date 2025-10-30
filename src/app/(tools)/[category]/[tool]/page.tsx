import { notFound } from "next/navigation";
import { ToolContainer } from "@/components/tool-container";
import toolsData from "@/lib/tools.json";
import * as LucideIcons from "lucide-react";

interface IconProps {
  name: string;
  className?: string;
}

function DynamicIcon({ name, className = "h-6 w-6" }: IconProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[name];
  return IconComponent ? <IconComponent className={className} /> : <LucideIcons.Sparkles className={className} />;
}

interface Params {
  category: string;
  tool: string;
}

// Dynamic tool page that loads based on tools.json
export default function DynamicToolPage({ params }: { params: Params }) {
  const { category, tool } = params;
  
  // Find the tool in our tools data
  const toolData = toolsData.tools.find(t => t.id === tool);
  
  if (!toolData || toolData.category !== category) {
    notFound();
  }

  // For now, render a placeholder - in a real implementation, you would have specific components for each tool
  return (
    <ToolContainer
      title={toolData.title}
      description={toolData.description}
      icon={toolData.icon}
    >
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-blue-600 dark:text-blue-400 text-2xl">
                <DynamicIcon name={toolData.icon} className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{toolData.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">{toolData.description}</p>
            
            <div className="max-w-md mx-auto bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                This tool is coming soon! We're working on implementing {toolData.title}. 
                Check back later or explore our other tools.
              </p>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {toolData.features?.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <p className="ml-3 text-gray-600 dark:text-gray-300 text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}

// Generate static params for all tools to ensure they're pre-built
export async function generateStaticParams() {
  return toolsData.tools.map(tool => ({
    category: tool.category,
    tool: tool.id,
  }));
}