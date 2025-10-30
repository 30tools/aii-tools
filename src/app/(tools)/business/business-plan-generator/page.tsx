import { ToolContainer } from "@/components/tool-container";
import { BusinessPlanGeneratorClient } from "./business-plan-generator-client";

export default function BusinessPlanGeneratorPage() {
  return (
    <ToolContainer
      title="Business Plan Generator"
      description="Create comprehensive business plans with financial projections"
      category="business"
    >
      <BusinessPlanGeneratorClient />
    </ToolContainer>
  );
}