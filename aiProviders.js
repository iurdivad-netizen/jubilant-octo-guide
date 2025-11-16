const Anthropic = require('@anthropic-ai/sdk');
const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * AI Provider Factory
 * Supports multiple AI providers: Anthropic Claude, OpenAI, Google Gemini, Mistral, Perplexity
 */
class AIProviderFactory {
  constructor() {
    this.providers = {};
    this.initializeProviders();
  }

  initializeProviders() {
    // Initialize Anthropic Claude
    if (process.env.ANTHROPIC_API_KEY) {
      this.providers.anthropic = new AnthropicProvider(process.env.ANTHROPIC_API_KEY);
    }

    // Initialize OpenAI
    if (process.env.OPENAI_API_KEY) {
      this.providers.openai = new OpenAIProvider(process.env.OPENAI_API_KEY);
    }

    // Initialize Google Gemini
    if (process.env.GOOGLE_API_KEY) {
      this.providers.google = new GoogleProvider(process.env.GOOGLE_API_KEY);
    }

    // Initialize Mistral (via OpenAI-compatible API)
    if (process.env.MISTRAL_API_KEY) {
      this.providers.mistral = new MistralProvider(process.env.MISTRAL_API_KEY);
    }

    // Initialize Perplexity (via OpenAI-compatible API)
    if (process.env.PERPLEXITY_API_KEY) {
      this.providers.perplexity = new PerplexityProvider(process.env.PERPLEXITY_API_KEY);
    }
  }

  getProvider(providerName) {
    const provider = this.providers[providerName.toLowerCase()];
    if (!provider) {
      throw new Error(`Provider '${providerName}' not available. Check API key configuration.`);
    }
    return provider;
  }

  getAvailableProviders() {
    return Object.keys(this.providers).map(key => ({
      id: key,
      name: this.providers[key].getName(),
      models: this.providers[key].getAvailableModels()
    }));
  }
}

/**
 * Base Provider Class
 */
class BaseProvider {
  async generateResponse(systemPrompt, messages, model) {
    throw new Error('generateResponse must be implemented by subclass');
  }

  getName() {
    throw new Error('getName must be implemented by subclass');
  }

  getAvailableModels() {
    throw new Error('getAvailableModels must be implemented by subclass');
  }

  getDefaultModel() {
    const models = this.getAvailableModels();
    return models.length > 0 ? models[0].id : null;
  }
}

/**
 * Anthropic Claude Provider
 */
class AnthropicProvider extends BaseProvider {
  constructor(apiKey) {
    super();
    this.client = new Anthropic({ apiKey });
  }

  getName() {
    return 'Anthropic Claude';
  }

  getAvailableModels() {
    return [
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet' },
      { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku' },
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus' },
      { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet' },
      { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku' }
    ];
  }

  async generateResponse(systemPrompt, messages, model) {
    const response = await this.client.messages.create({
      model: model || this.getDefaultModel(),
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages
    });

    return response.content[0].text;
  }
}

/**
 * OpenAI Provider
 */
class OpenAIProvider extends BaseProvider {
  constructor(apiKey) {
    super();
    this.client = new OpenAI({ apiKey });
  }

  getName() {
    return 'OpenAI';
  }

  getAvailableModels() {
    return [
      { id: 'gpt-4o', name: 'GPT-4o' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
      { id: 'gpt-4', name: 'GPT-4' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }
    ];
  }

  async generateResponse(systemPrompt, messages, model) {
    // Convert messages to OpenAI format
    const openaiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const response = await this.client.chat.completions.create({
      model: model || this.getDefaultModel(),
      max_tokens: 1024,
      messages: openaiMessages
    });

    return response.choices[0].message.content;
  }
}

/**
 * Google Gemini Provider
 */
class GoogleProvider extends BaseProvider {
  constructor(apiKey) {
    super();
    this.client = new GoogleGenerativeAI(apiKey);
  }

  getName() {
    return 'Google Gemini';
  }

  getAvailableModels() {
    return [
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
      { id: 'gemini-1.0-pro', name: 'Gemini 1.0 Pro' }
    ];
  }

  async generateResponse(systemPrompt, messages, model) {
    const genModel = this.client.getGenerativeModel({
      model: model || this.getDefaultModel()
    });

    // Convert messages to Gemini format
    const history = [];
    for (let i = 0; i < messages.length - 1; i++) {
      history.push({
        role: messages[i].role === 'user' ? 'user' : 'model',
        parts: [{ text: messages[i].content }]
      });
    }

    const chat = genModel.startChat({
      history: history,
      systemInstruction: systemPrompt,
      generationConfig: {
        maxOutputTokens: 1024,
      }
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;

    return response.text();
  }
}

/**
 * Mistral AI Provider (using OpenAI-compatible API)
 */
class MistralProvider extends BaseProvider {
  constructor(apiKey) {
    super();
    this.client = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://api.mistral.ai/v1'
    });
  }

  getName() {
    return 'Mistral AI';
  }

  getAvailableModels() {
    return [
      { id: 'mistral-large-latest', name: 'Mistral Large' },
      { id: 'mistral-medium-latest', name: 'Mistral Medium' },
      { id: 'mistral-small-latest', name: 'Mistral Small' },
      { id: 'open-mistral-7b', name: 'Mistral 7B' }
    ];
  }

  async generateResponse(systemPrompt, messages, model) {
    // Convert messages to OpenAI format (Mistral is OpenAI-compatible)
    const mistralMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const response = await this.client.chat.completions.create({
      model: model || this.getDefaultModel(),
      max_tokens: 1024,
      messages: mistralMessages
    });

    return response.choices[0].message.content;
  }
}

/**
 * Perplexity AI Provider (using OpenAI-compatible API)
 */
class PerplexityProvider extends BaseProvider {
  constructor(apiKey) {
    super();
    this.client = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://api.perplexity.ai'
    });
  }

  getName() {
    return 'Perplexity AI';
  }

  getAvailableModels() {
    return [
      { id: 'llama-3.1-sonar-large-128k-online', name: 'Sonar Large Online' },
      { id: 'llama-3.1-sonar-small-128k-online', name: 'Sonar Small Online' },
      { id: 'llama-3.1-sonar-large-128k-chat', name: 'Sonar Large Chat' },
      { id: 'llama-3.1-sonar-small-128k-chat', name: 'Sonar Small Chat' }
    ];
  }

  async generateResponse(systemPrompt, messages, model) {
    // Convert messages to OpenAI format (Perplexity is OpenAI-compatible)
    const perplexityMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const response = await this.client.chat.completions.create({
      model: model || this.getDefaultModel(),
      max_tokens: 1024,
      messages: perplexityMessages
    });

    return response.choices[0].message.content;
  }
}

module.exports = AIProviderFactory;
