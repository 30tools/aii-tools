import { ToolContainer } from "@/components/tool-container";
import { HashtagGeneratorClient } from "./hashtag-generator-client";

export default function HashtagGeneratorPage() {
  return (
    <ToolContainer
      title="Hashtag Generator"
      description="Generate relevant hashtags for social media posts"
      category="social"
    >
      <HashtagGeneratorClient />
    </ToolContainer>
  );
}