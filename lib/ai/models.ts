import { openai } from '@ai-sdk/openai';
import { fireworks } from '@ai-sdk/fireworks';
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';

export const DEFAULT_CHAT_MODEL: string = 'chat-model-small';

// function getModel(apiIdentifier: string) {
//   if (apiIdentifier.startsWith('anthropic')) {
//     return bedrock(apiIdentifier);
//   }
//   return openai(apiIdentifier);
// }
export const myProvider = customProvider({
  languageModels: {
    'chat-model-small': openai('gpt-4o-mini'),
    'chat-model-large': openai('gpt-4o'),
    'chat-model-reasoning': wrapLanguageModel({
      model: fireworks('accounts/fireworks/models/deepseek-r1'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'title-model': openai('gpt-4-turbo'),
    'block-model': openai('gpt-4o-mini'),
  },
  imageModels: {
    'small-model': openai.image('dall-e-3'),
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'gpt-4o',
    name: 'GPT 4o',
    description: 'For complex, multi-step tasks',
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT 4o mini',
    description: 'Small model for fast, lightweight tasks',
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
  {
    id: 'chat-model-small',
    name: 'Small model',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'chat-model-large',
    name: 'Large model',
    description: 'Large model for complex, multi-step tasks',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Reasoning model',
    description: 'Uses advanced reasoning',
  },
  }
] as const ;

export const DEFAULT_MODEL_NAME: string = 'gpt-4o';
