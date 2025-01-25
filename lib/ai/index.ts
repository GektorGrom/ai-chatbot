import { openai } from '@ai-sdk/openai';
import { bedrock } from '@ai-sdk/amazon-bedrock';

import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';

import { customMiddleware } from './custom-middleware';

function getModel(apiIdentifier: string) {
  if (apiIdentifier.startsWith('anthropic')) {
    return bedrock(apiIdentifier);
  }
  return openai(apiIdentifier);
}

export const customModel = (apiIdentifier: string) => {
  return wrapLanguageModel({
    model: getModel(apiIdentifier),
    middleware: customMiddleware,
  });
};

export const imageGenerationModel = openai.image('dall-e-3');
