'use server';

import { generateText } from 'ai';
import { openai } from '@/lib/ai';

export async function summarizeNotes(notes: string): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Summarize these study notes into key points:

${notes}

Create a well-organized summary with:
- Main topics and subtopics
- Key concepts and definitions
- Important facts and figures
- Bullet points for easy review
- Clear structure for studying

Make it study-friendly and easy to review.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error summarizing notes:', error);
    return { success: false, error: 'Failed to summarize notes' };
  }
}

export async function createFlashcards(content: string): Promise<{ success: true; result: Array<{question: string, answer: string}> } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Create flashcards from this content:

${content}

Generate 8-12 flashcards in JSON format:
[
  {"question": "Question here", "answer": "Answer here"},
  {"question": "Question here", "answer": "Answer here"}
]

Make questions:
- Clear and specific
- Testing key concepts
- Varying difficulty levels
- Good for memorization
- Comprehensive coverage`,
    });

    try {
      const flashcards = JSON.parse(result);
      return { success: true, result: flashcards };
    } catch {
      // Fallback parsing
      const lines = result.split('\n').filter(line => line.includes('"question"') || line.includes('"answer"'));
      const flashcards = [];
      for (let i = 0; i < lines.length; i += 2) {
        if (lines[i] && lines[i + 1]) {
          const question = lines[i].split(':')[1]?.trim().replace(/[",]/g, '') || '';
          const answer = lines[i + 1].split(':')[1]?.trim().replace(/[",]/g, '') || '';
          flashcards.push({ question, answer });
        }
      }
      return { success: true, result: flashcards };
    }
  } catch (error) {
    console.error('Error creating flashcards:', error);
    return { success: false, error: 'Failed to create flashcards' };
  }
}

export async function explainSimply(concept: string, ageLevel: number = 10): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Explain "${concept}" as if you're talking to a ${ageLevel}-year-old.

Use:
- Simple, everyday language
- Relatable examples and analogies
- Short sentences
- Fun comparisons
- Easy-to-understand concepts
- Engaging and friendly tone

Make it clear, fun, and memorable!`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error explaining simply:', error);
    return { success: false, error: 'Failed to explain concept' };
  }
}

export async function generateQuiz(content: string, questionCount: number = 5): Promise<{ success: true; result: Array<{question: string, options: string[], correct: number, explanation: string}> } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Create a ${questionCount}-question multiple choice quiz from this content:

${content}

Format as JSON array:
[
  {
    "question": "Question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "explanation": "Why this answer is correct"
  }
]

Requirements:
- Test key concepts
- 4 options per question
- Clear, unambiguous questions
- Plausible distractors
- Good explanations`,
    });

    try {
      const quiz = JSON.parse(result);
      return { success: true, result: quiz };
    } catch {
      // Fallback: create simple quiz structure
      const questions = [
        {
          question: "What is the main topic of the provided content?",
          options: ["Option A", "Option B", "Option C", "Option D"],
          correct: 0,
          explanation: "This is the primary focus of the material."
        }
      ];
      return { success: true, result: questions };
    }
  } catch (error) {
    console.error('Error generating quiz:', error);
    return { success: false, error: 'Failed to generate quiz' };
  }
}

export async function createStudyPlan(syllabus: string, timeframe: string): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Create a detailed study plan for this syllabus over ${timeframe}:

${syllabus}

Include:
- Weekly breakdown
- Daily study goals
- Time allocation for each topic
- Review sessions
- Practice/assessment periods
- Buffer time for difficult topics
- Progress milestones

Make it realistic and achievable within the ${timeframe} timeframe.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error creating study plan:', error);
    return { success: false, error: 'Failed to create study plan' };
  }
}