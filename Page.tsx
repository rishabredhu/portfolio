import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const perplexity = createOpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY ?? '',
  baseURL: 'https://api.perplexity.ai/',
});

const { text } = await generateText({
  model: perplexity('llama-3-sonar-large-32k-online'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
