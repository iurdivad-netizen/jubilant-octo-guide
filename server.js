require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AIProviderFactory = require('./aiProviders');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize AI Provider Factory
const aiFactory = new AIProviderFactory();

// French learning levels and their characteristics
const LEVELS = {
  A1: {
    name: 'Beginner (A1)',
    description: 'Basic phrases and simple sentences',
    instructions: 'Use very simple vocabulary, present tense primarily, short sentences. Speak slowly and clearly. Use common everyday expressions.'
  },
  A2: {
    name: 'Elementary (A2)',
    description: 'Simple conversations about familiar topics',
    instructions: 'Use simple vocabulary and common phrases. Include past and future tenses occasionally. Keep sentences relatively short but can be slightly more complex.'
  },
  B1: {
    name: 'Intermediate (B1)',
    description: 'Conversations about experiences and events',
    instructions: 'Use intermediate vocabulary. Mix various tenses. Discuss opinions and experiences. Use some idiomatic expressions.'
  },
  B2: {
    name: 'Upper Intermediate (B2)',
    description: 'Complex conversations and abstract topics',
    instructions: 'Use advanced vocabulary and complex sentence structures. Discuss abstract topics. Use subjunctive mood and various tenses appropriately.'
  },
  C1: {
    name: 'Advanced (C1)',
    description: 'Fluent conversation on complex topics',
    instructions: 'Use sophisticated vocabulary and complex grammatical structures. Discuss nuanced topics. Use idiomatic expressions and cultural references.'
  },
  C2: {
    name: 'Mastery (C2)',
    description: 'Near-native fluency',
    instructions: 'Use native-like expressions, subtle nuances, literary references, and complex rhetorical devices. Speak naturally about any topic.'
  }
};

// Conversation topics
const TOPICS = {
  daily_life: {
    name: 'Daily Life',
    description: 'Everyday activities, routines, hobbies'
  },
  travel: {
    name: 'Travel',
    description: 'Trips, tourism, cultural experiences'
  },
  food: {
    name: 'Food & Dining',
    description: 'Cuisine, restaurants, cooking'
  },
  work: {
    name: 'Work & Career',
    description: 'Professional life, jobs, business'
  },
  culture: {
    name: 'Culture & Arts',
    description: 'Movies, books, music, art'
  },
  technology: {
    name: 'Technology',
    description: 'Digital life, innovation, science'
  },
  health: {
    name: 'Health & Wellness',
    description: 'Fitness, medicine, wellbeing'
  },
  environment: {
    name: 'Environment',
    description: 'Nature, climate, sustainability'
  },
  education: {
    name: 'Education',
    description: 'Learning, schools, knowledge'
  },
  social: {
    name: 'Social Issues',
    description: 'Society, current events, politics'
  }
};

// Store conversation history per session (in production, use proper session management)
const conversations = new Map();

// Endpoint to get available levels, topics, and AI providers
app.get('/api/config', (req, res) => {
  res.json({
    levels: LEVELS,
    topics: TOPICS,
    providers: aiFactory.getAvailableProviders()
  });
});

// Endpoint to start a new conversation
app.post('/api/conversation/start', (req, res) => {
  const { level, topic, provider, model } = req.body;
  const sessionId = Date.now().toString();

  // Default to anthropic if not specified or if provider not available
  const selectedProvider = provider && aiFactory.getAvailableProviders().some(p => p.id === provider)
    ? provider
    : (aiFactory.getAvailableProviders()[0]?.id || 'anthropic');

  conversations.set(sessionId, {
    level,
    topic,
    provider: selectedProvider,
    model: model || null, // null means use default model for provider
    messages: []
  });

  res.json({ sessionId, provider: selectedProvider });
});

// Endpoint to send a message and get AI response
app.post('/api/conversation/message', async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    if (!conversations.has(sessionId)) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const session = conversations.get(sessionId);
    const level = LEVELS[session.level];
    const topic = TOPICS[session.topic];

    // Add user message to history
    session.messages.push({
      role: 'user',
      content: message
    });

    // Build system prompt
    const systemPrompt = `You are a French conversation partner helping someone practice French at the ${level.name} level.

Topic: ${topic.name} - ${topic.description}

Instructions for your responses:
- ${level.instructions}
- Always respond in French
- Be encouraging and patient
- If the user makes grammar mistakes, gently correct them in a natural way
- Ask follow-up questions to keep the conversation flowing
- Stay on the topic of ${topic.name} as much as possible
- Keep responses conversational and natural (2-4 sentences typically)
- Adapt to the user's level - if they seem to struggle, simplify; if they're doing well, challenge them slightly

Remember: You are having a natural conversation in French. Be friendly and engaging!`;

    // Get AI provider and generate response
    const provider = aiFactory.getProvider(session.provider);
    const aiMessage = await provider.generateResponse(
      systemPrompt,
      session.messages,
      session.model
    );

    // Add AI response to history
    session.messages.push({
      role: 'assistant',
      content: aiMessage
    });

    res.json({
      response: aiMessage,
      messageCount: session.messages.length / 2
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get AI response', details: error.message });
  }
});

// Endpoint to get conversation history
app.get('/api/conversation/:sessionId', (req, res) => {
  const { sessionId } = req.params;

  if (!conversations.has(sessionId)) {
    return res.status(404).json({ error: 'Session not found' });
  }

  res.json(conversations.get(sessionId));
});

// Endpoint to end a conversation
app.delete('/api/conversation/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  conversations.delete(sessionId);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`French AI Conversation App running on http://localhost:${port}`);
});
