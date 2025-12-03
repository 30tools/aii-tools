# Pollinations AI - Comprehensive Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Getting Started](#getting-started)
4. [API Documentation](#api-documentation)
5. [Integration Examples](#integration-examples)
6. [React Hooks](#react-hooks)
7. [MCP Server Integration](#mcp-server-integration)
8. [Use Cases & Projects](#use-cases--projects)
9. [Pricing & Authentication](#pricing--authentication)
10. [Community & Support](#community--support)

---

## Overview

**Pollinations.AI** is an open-source, community-driven platform that provides free access to cutting-edge artificial intelligence models for creative content generation. Based in Berlin, Germany, it powers over 500+ community projects with accessible text, image, and audio generation APIs.

### Mission
Democratize AI technology and make it accessible to everyone, focusing on:
- ✅ **Accessibility** - No signup required to get started
- 🔒 **Privacy** - No data storage, privacy-respecting
- 🤝 **Community** - Open-source and community-built
- 💰 **Free** - 100% free with unlimited usage

### Official Links
- **Website**: https://pollinations.ai
- **GitHub**: https://github.com/pollinations/pollinations
- **Text Generation**: https://text.pollinations.ai
- **Auth Dashboard**: https://auth.pollinations.ai
- **React Hooks**: https://react-hooks.pollinations.ai

---

## Key Features

### 🎨 Image Generation
- Advanced AI models including Stable Diffusion and Flux
- Multiple art styles and high-quality output
- Support for custom dimensions and seeds (reproducible images)
- Direct URL-based generation (no API keys required)

### 💬 Text Generation
- Large Language Models (LLMs) like Llama and Mistral
- Grammar checking and tone adjustment
- Style enhancement and text improvement
- Conversational AI interface

### 🎵 Audio Generation
- **Text-to-Speech (TTS)**: Convert text to natural-sounding speech
- **Speech-to-Text (STT)**: Transcribe audio to text
- Multiple voice options via `openai-audio` model
- Explore voices at [OpenAI.fm](https://www.openai.fm/)

### 🎬 Video Generation
- Create animated videos by combining images
- Transform 2D images into 3D videos

### 🔓 Open Source
- 100% open source - code, decisions, roadmap all public
- Community-built with 500+ projects using the APIs
- Supporter-funded to keep AI accessible

---

## Getting Started

### 1. Image Generation (Web Interface)
1. Visit https://pollinations.ai
2. Type your description in the text box
3. Click "Generate" and watch the magic happen!

### 2. Text Generation (Web Interface)
1. Visit https://text.pollinations.ai
2. Start chatting with the AI

### 3. Audio Generation
1. Use the `openai-audio` model with the API
2. Generate speech from text or transcribe audio to text
3. Explore voice options at https://www.openai.fm/

---

## API Documentation

### Image Generation API

#### Basic Usage
Generate images by using a simple URL with your prompt:

```
https://image.pollinations.ai/prompt/{your_prompt}
```

#### Examples

**Generate a red car:**
```
https://image.pollinations.ai/prompt/a_red_car
```

**Generate a Pollinations logo:**
```
https://pollinations.ai/p/pollinations_logo
```

**Generate a conceptual scene:**
```
https://pollinations.ai/p/conceptual_isometric_world_of_pollinations_ai_surreal_hyperrealistic_digital_garden
```

#### Parameters

Add parameters to control image generation:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `width` | Image width in pixels | `width=1024` |
| `height` | Image height in pixels | `height=768` |
| `seed` | Seed for reproducible images | `seed=42` |
| `model` | AI model to use | `model=flux` or `model=turbo` |

**Example with parameters:**
```
https://image.pollinations.ai/prompt/beautiful_sunset?width=1024&height=768&seed=42&model=flux
```

---

### Text Generation API

#### Basic Usage
```
https://text.pollinations.ai/{your_question}
```

#### Example
```
https://text.pollinations.ai/What%20is%20artificial%20intelligence?
```

**URL-encode your text** by replacing spaces with `%20` or `+`.

---

### Audio Generation API

#### Text-to-Speech

Generate audio from text with a specific voice:

```
https://text.pollinations.ai/{your_text}?model=openai-audio&voice={voice_name}
```

#### Example
```
https://text.pollinations.ai/Welcome%20to%20Pollinations?model=openai-audio&voice=nova
```

#### Available Voices
Explore all available voices at https://www.openai.fm/

---

## Integration Examples

### Python - Download Generated Image

```python
import requests

def download_image(prompt):
    url = f"https://pollinations.ai/p/{prompt}"
    response = requests.get(url)
    
    with open('generated_image.jpg', 'wb') as file:
        file.write(response.content)
    
    print('Image downloaded!')

# Usage
download_image("conceptual_isometric_world_of_pollinations_ai_surreal_hyperrealistic_digital_garden")
```

### JavaScript - Fetch Image

```javascript
async function generateImage(prompt) {
  const url = `https://image.pollinations.ai/prompt/${prompt}`;
  const response = await fetch(url);
  const blob = await response.blob();
  
  // Create image element
  const img = document.createElement('img');
  img.src = URL.createObjectURL(blob);
  document.body.appendChild(img);
}

// Usage
generateImage("a_beautiful_sunset_over_mountains");
```

### HTML - Direct Embed

Simply use the API URL as an image source:

```html
<img src="https://image.pollinations.ai/prompt/a_cute_cat_playing_with_yarn" 
     alt="AI Generated Cat">
```

### Python - Using pollinations.ai Library

```python
from pollinations import generate_image

# Generate image with parameters
image_url = generate_image(
    prompt="a beautiful landscape",
    width=1024,
    height=768,
    seed=42,
    model="flux"
)

print(f"Generated image: {image_url}")
```

---

## React Hooks

Pollinations provides official React hooks for seamless integration.

### Installation

```bash
npm install @pollinations/react
```

### Usage Example

```jsx
import React from 'react';
import { usePollinationsImage, usePollinationsText } from '@pollinations/react';
import ReactMarkdown from 'react-markdown';

const AIGeneratedContent = () => {
  // Generate image
  const imageUrl = usePollinationsImage(
    "Beautiful landscape of Paris with Eiffel Tower", 
    { 
      width: 800, 
      height: 600, 
      seed: 42 
    }
  );
  
  // Generate text
  const markdown = usePollinationsText(
    "Write a brief travel guide for Paris, including top attractions and local cuisine in markdown", 
    { seed: 42 }
  );

  return (
    <div>
      <h2>AI-Generated Travel Guide</h2>
      <img src={imageUrl} alt="AI Generated" />
      
      {markdown ? (
        <ReactMarkdown>{markdown}</ReactMarkdown>
      ) : (
        <p>Loading markdown content...</p>
      )}
    </div>
  );
};

export default AIGeneratedContent;
```

### Available Hooks

- `usePollinationsImage(prompt, options)` - Generate images
- `usePollinationsText(prompt, options)` - Generate text
- `usePollinationsAudio(text, options)` - Generate audio

For more details, check the [React Hooks Documentation](https://github.com/pollinations/pollinations/blob/main/pollinations-react/README.md).

---

## MCP Server Integration

Pollinations provides a Model Context Protocol (MCP) server that enables AI assistants like Claude to generate images and audio directly.

### Configuration

Add this to your MCP client configuration:

```json
{
  "mcpServers": {
    "pollinations": {
      "command": "npx",
      "args": ["@pollinations/model-context-protocol"]
    }
  }
}
```

### Run with NPX

No installation required:

```bash
npx @pollinations/model-context-protocol
```

### MCP Capabilities

AI assistants can:
- ✅ Generate images from text descriptions
- ✅ Create text-to-speech audio with various voice options
- ✅ Play audio responses through system speakers
- ✅ Access all Pollinations.AI models and services
- ✅ List available models, voices, and capabilities

### Community Alternatives

- **MCPollinations**: https://github.com/pinkpixel-dev/MCPollinations
- **Sequa MCP Server**: https://mcp.sequa.ai/v1/pollinations/contribute

---

## Use Cases & Projects

### Categories

#### 🎃 Hacktoberfest 2025
Open-source contributions and community projects during Hacktoberfest.

#### ✨ Vibe Coding
Creative coding and experimental projects using AI generation.

#### 🎨 Creative
- Digital art generation
- Design mockups and prototypes
- Illustration and concept art
- Marketing visuals

#### 🎲 Games
- Game asset generation
- Character design
- Environment creation
- Texture generation

#### 🛠️ Hack-&-Build
- Rapid prototyping
- MVP development
- Educational tools
- Experimental applications

#### 💬 Chat
- Chatbots with image generation
- Conversational AI with visual context
- Customer support bots

#### 🤖 Social Bots
- Twitter/X bots
- Discord bots
- Telegram bots

#### 📚 Learn
- Educational content generation
- Tutorial illustrations
- Learning materials

Over **500+ community projects** are currently using Pollinations.AI APIs!

---

## Pricing & Authentication

### Free Tier (No Authentication)
- ✅ **100% Free** - No credit card required
- ✅ **Unlimited usage** for basic needs
- ✅ **No signup required**
- ✅ **No API keys needed**
- ⚠️ Rate limits apply

### Authenticated Access
For higher performance and increased rate limits:

1. Visit https://auth.pollinations.ai
2. Create an account and manage API tokens
3. Configure referrer domains
4. Get enhanced rate limits

**Benefits:**
- 🚀 Higher performance
- 📈 Increased rate limits
- 🔐 Token management
- 🌐 Referrer domain configuration

### Support the Project

Pollinations is **supporter-funded** to keep AI accessible for everyone. You can support via:
- **Ko-Fi**: Support and get premium Discord roles
- Visit the "Tip Us" button on the website

---

## Community & Support

### Resources
- **GitHub**: https://github.com/pollinations/pollinations
- **Documentation**: https://pollinations.ai/docs
- **React Hooks Examples**: https://react-hooks.pollinations.ai
- **Discord**: Join for community support and premium roles
- **API Docs**: https://github.com/pollinations/pollinations/blob/main/APIDOCS.md

### Latest News

#### 🧠 Sequa AI Integration
Sequa.AI contextual knowledge engine now available! Provides AI assistants with deep, real-time understanding of codebases and documentation.
- Configure MCP: https://mcp.sequa.ai/v1/pollinations/contribute
- Learn more: https://sequa.ai

#### 🔐 Auth Dashboard
New authentication dashboard live at https://auth.pollinations.ai to manage API tokens and referrer domains.

#### 💲 Support Us
New "Tip Us" button available. Connect Discord to Ko-Fi for premium roles!

#### 🎵 Audio Generation
New text-to-speech and speech-to-text capabilities with `openai-audio` model.

### Contributing

Pollinations is **100% open source** - contributions are welcome!

- **Code**: Contribute to the codebase
- **Documentation**: Improve docs
- **Community**: Share projects and help others
- **Feedback**: Report issues and suggest features

### License

Pollinations.AI is open-source and community-driven. Check the [GitHub repository](https://github.com/pollinations/pollinations) for license details.

---

## Quick Reference

### Image Generation
```
https://image.pollinations.ai/prompt/{prompt}?width={w}&height={h}&seed={s}&model={m}
```

### Text Generation
```
https://text.pollinations.ai/{prompt}
```

### Audio Generation (TTS)
```
https://text.pollinations.ai/{text}?model=openai-audio&voice={voice}
```

### React Installation
```bash
npm install @pollinations/react
```

### MCP Server
```bash
npx @pollinations/model-context-protocol
```

---

## Architecture

Pollinations.AI is built with a modern, scalable architecture:
- **Frontend**: React-based web interface
- **Backend**: Distributed AI model serving
- **API**: RESTful API with simple URL-based access
- **Models**: Flux, Stable Diffusion, Llama, Mistral, OpenAI Audio
- **Infrastructure**: Open-source and community-maintained

For detailed architecture information, visit the [GitHub repository](https://github.com/pollinations/pollinations).

---

## Conclusion

Pollinations.AI is a powerful, free, and open-source platform for AI-powered content generation. Whether you're building a creative project, integrating AI into your application, or just experimenting with generative AI, Pollinations makes it easy and accessible for everyone.

**Get Started Today!**
- 🌐 Visit: https://pollinations.ai
- 💻 GitHub: https://github.com/pollinations/pollinations
- 📚 Explore: https://react-hooks.pollinations.ai

---

*Last Updated: December 2025*  
*Documentation compiled from official Pollinations.AI sources*
