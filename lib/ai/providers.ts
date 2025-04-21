import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import {isTestEnvironment} from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import {openai} from "@ai-sdk/openai";
import {createAmazonBedrock} from "@ai-sdk/amazon-bedrock";

const bedrock = createAmazonBedrock({
  bedrockOptions: {
    region: process.env.AWS_REGION,
  }
});
export const myProvider = isTestEnvironment
  ? customProvider({
    languageModels: {
      'chat-model': chatModel,
      'chat-model-reasoning': reasoningModel,
      'title-model': titleModel,
      'artifact-model': artifactModel,
    },
  })
  : customProvider({
    languageModels: {
      'anthropic.claude-3-5-haiku-20241022-v1:0': bedrock('anthropic.claude-3-5-haiku-20241022-v1:0'),
      'anthropic.claude-3-5-sonnet-20241022-v2:0': bedrock('anthropic.claude-3-5-sonnet-20241022-v2:0'),
      'chat-model-small': openai('gpt-4.1-mini'),
      'chat-model-large': openai('gpt-4.1'),
      'chat-model-reasoning': wrapLanguageModel({
        model: openai('o1'),
        middleware: extractReasoningMiddleware({tagName: 'think', separator: 'break\n'}),
      }),
      'title-model': openai('gpt-4.1-mini'),
      'artifact-model': openai('gpt-4.1-mini'),
    },
    imageModels: {
      'small-model': openai.image('dall-e-2'),
      'large-model': openai.image('dall-e-3'),
    },
  });

