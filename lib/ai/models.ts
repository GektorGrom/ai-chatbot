// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'gpt-4o',
    label: 'GPT 4o',
    apiIdentifier: 'gpt-4o',
    description: 'For complex, multi-step tasks',
  },
  {
    id: 'gpt-4o-mini',
    label: 'GPT 4o mini',
    apiIdentifier: 'gpt-4o-mini',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'anthropic.claude-3-5-haiku-20241022-v1:0',
    label: 'Haiku 3.5',
    apiIdentifier: 'anthropic.claude-3-5-haiku-20241022-v1:0',
    description: 'For complex, multi-step tasks',
  },
  {
    id: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
    label: 'Sonnet 3.5',
    apiIdentifier: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
    description: 'For complex, multi-step tasks',
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'gpt-4o';
