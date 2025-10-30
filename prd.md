seo friendly (primary focus on seo) nextjs 14 app router project with
full shadcn
use openai api key in env file and create all tools listed in tools.md file.
it must rank #1 on google, bing for all tools listed in tools.md file.
create a central tools.json file for managing all tools data. with categories url title description, status` and icon.
use route groups for each tool under (tools) folder. like (creativity)/startup-idea-generator, (tools)/chatgpt-chatbot, (text)/summarizer etc.
never make page.tsx or layout.tsx a client component. create separate client components for interactivity. in modular and best dev practices approach.
use vercel ai sdk for openai api calls.
use server actions instead of api routes for better performance.

keep the ui dam simple, clean, intutive, sleek and minimalistic yet modern and elegant. less colors add mode toggler for dark and light mode. use stackauth for authentication.
everything must be typescript and modula and structured wellly organized.
generate all files only when asked. do not generate unnecessary files.

read and follow seo.md for seo best practices strictly.
create the main page very good containing all tools with proper categories and links to each tool page.
create proper meta tags for each page for better seo.
create all pages req. for adsence and other monetization strategies.
ensure fast loading times and optimized performance for better seo rankings.
ensure mobile responsiveness and cross-browser compatibility.
implement structured data (schema.org) for better search engine understanding.
implement sitemap.xml and robots.txt for better indexing by search engines.
implement analytics to track user behavior and improve seo strategies.
ensure accessibility standards are met for better user experience and seo.

add adsence = <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1828915420581549"
     crossorigin="anonymous"></script>

     <meta name="google-adsense-account" content="ca-pub-1828915420581549">


# Product Requirements Document (PRD)
## Project Overview
The goal of this project is to develop a SEO-friendly Next.js 14 application utilizing the App Router. The application will feature a variety of AI-powered tools, each accessible through dedicated routes. The project will leverage the OpenAI API for AI functionalities and will be designed with a focus on SEO to achieve high rankings on search engines like Google and Bing.

## Key Features
1. **SEO Optimization**: Implement best practices for SEO to ensure high visibility on search engines.
2. **AI-Powered Tools**: Integrate multiple AI tools as specified in the tools  document. Each tool will have its own route and functionality.
3. **Centralized Tool Management**: Create a `tools.json` file to manage all tool data, including categories, URLs, titles, descriptions, statuses, and icons.
4. **Route Groups**: Organize tools into route groups based on their categories for better structure and navigation.
5. **Client Components**: Separate client components for interactivity, ensuring that `page.tsx` and `layout.tsx` remain server components.
6. **TypeScript Integration**: Ensure the entire project is developed using TypeScript for type safety and maintainability.
7. **Modular Design**: Follow modular design principles to keep the codebase organized and scalable.
8. **Authentication**: Utilize StackAuth for user authentication within the application.
9. **UI/UX Design**: Keep the UI simple, clean, intuitive, sleek, and minimalistic while maintaining a modern and elegant aesthetic. Include a mode toggler for dark and light modes.

