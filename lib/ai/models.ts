import { openai } from '@ai-sdk/openai';
import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';

import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
const bedrock = createAmazonBedrock({
  bedrockOptions: {
    region: process.env.AWS_REGION,
  }
});

export const DEFAULT_CHAT_MODEL: string = 'chat-model-large';
export const myProvider = customProvider({
  languageModels: {
    'anthropic.claude-3-5-haiku-20241022-v1:0': bedrock('anthropic.claude-3-5-haiku-20241022-v1:0'),
    'anthropic.claude-3-5-sonnet-20241022-v2:0': bedrock('anthropic.claude-3-5-sonnet-20241022-v2:0'),
    'chat-model-small': openai('gpt-4o-mini'),
    'chat-model-large': openai('gpt-4.5-preview-2025-02-27'),
    'chat-model-reasoning': wrapLanguageModel({
      model: openai('o1-preview'),
      middleware: extractReasoningMiddleware({ tagName: 'think', separator: 'break\n' }),
    }),
    'title-model': openai('gpt-4-turbo'),
    'artifact-model': openai('gpt-4o-mini'),
  },
  imageModels: {
    'small-model': openai.image('dall-e-2'),
    'large-model': openai.image('dall-e-3'),
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'Chat model',
    description: 'Primary model for all-purpose chat',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Reasoning model',
    description: 'Uses advanced reasoning',
  },
  {
    id: 'anthropic.claude-3-5-haiku-20241022-v1:0',
    name: 'Haiku 3.5',
    description: 'For complex, multi-step tasks',
  },
  {
    id: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
    name: 'Sonnet 3.5',
    description: 'For complex, multi-step tasks',
  },
];
