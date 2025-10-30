import { ToolContainer } from "@/components/tool-container";
import { LogoMakerClient } from "./logo-maker-client";

export default function LogoMakerPage() {
 return (
    <ToolContainer
      title="AI Logo Maker"
      description="Generate professional logos from text descriptions"
      category="design"
    >
      <LogoMakerClient />
    </ToolContainer>
  );
}