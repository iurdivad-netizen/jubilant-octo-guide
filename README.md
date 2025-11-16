# French AI Conversation Practice App

A web application that helps you practice speaking French with AI at different skill levels and topics. Uses speech recognition, multiple AI providers for natural conversations, and text-to-speech for pronunciation.

## Features

- **6 Language Levels**: From A1 (Beginner) to C2 (Mastery) following CEFR standards
- **10 Conversation Topics**: Daily life, travel, food, work, culture, technology, health, environment, education, and social issues
- **Multiple AI Providers**: Choose from Anthropic Claude, OpenAI GPT, Google Gemini, or Mistral AI
- **Model Selection**: Pick specific models from each provider for optimal performance
- **Speech Recognition**: Speak in French using your microphone
- **AI Responses**: Natural conversations powered by state-of-the-art AI
- **Text-to-Speech**: Hear proper French pronunciation
- **Real-time Transcription**: See what you're saying as you speak
- **Adaptive Difficulty**: AI adjusts to your selected level

## Two Ways to Use This App

### Option 1: Standalone HTML (Easiest)
Simply open `standalone.html` in your browser - no installation required! Just enter your API key and start practicing.

### Option 2: Server Version
Run a full Node.js server with session management and enhanced features.

---

## Quick Start (Standalone Version)

**No installation needed!**

1. Get an API key from at least one provider:
   - **Anthropic Claude**: [console.anthropic.com](https://console.anthropic.com/)
   - **OpenAI**: [platform.openai.com](https://platform.openai.com/)
   - **Google Gemini**: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - **Mistral AI**: [console.mistral.ai](https://console.mistral.ai/)
2. Open `standalone.html` in Chrome or Edge
3. Enter your API key(s) (stored locally in your browser)
4. Select level, topic, and AI provider
5. Start speaking French!

**Note**: API keys are stored in your browser's localStorage and are sent only to the respective AI provider's API.

---

## Full Installation (Server Version)

### Prerequisites

- Node.js (v14 or higher)
- At least one AI provider API key:
  - **Anthropic Claude**: [console.anthropic.com](https://console.anthropic.com/)
  - **OpenAI**: [platform.openai.com](https://platform.openai.com/)
  - **Google Gemini**: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
  - **Mistral AI**: [console.mistral.ai](https://console.mistral.ai/)
- A modern web browser (Chrome recommended for best speech recognition)

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd jubilant-octo-guide
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your API key(s) to the `.env` file (at least one is required):
```
# Server Configuration
PORT=3000

# AI Provider API Keys (configure the ones you want to use)
ANTHROPIC_API_KEY=your_anthropic_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
MISTRAL_API_KEY=your_mistral_api_key_here
```

## Usage

1. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. **Select Your Level**:
   - **A1 (Beginner)**: Basic phrases and simple sentences
   - **A2 (Elementary)**: Simple conversations about familiar topics
   - **B1 (Intermediate)**: Conversations about experiences and events
   - **B2 (Upper Intermediate)**: Complex conversations and abstract topics
   - **C1 (Advanced)**: Fluent conversation on complex topics
   - **C2 (Mastery)**: Near-native fluency

4. **Choose a Topic**:
   - Daily Life, Travel, Food & Dining, Work & Career, Culture & Arts
   - Technology, Health & Wellness, Environment, Education, Social Issues

5. **Select AI Provider**:
   - Choose from available providers (those with configured API keys)
   - Optionally select a specific model from the provider

6. **Start Conversing**:
   - Click the microphone button to start speaking
   - Speak in French - your speech will be transcribed in real-time
   - Click "Send" to submit your message
   - The AI will respond in French at your selected level
   - The response will be automatically spoken aloud
   - Click the speaker button to replay the AI's last response

## Supported AI Providers

The app supports multiple AI providers, each with different models and capabilities:

### Anthropic Claude
- **Models**: Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku
- **Best for**: Natural conversations, nuanced understanding
- **API**: [console.anthropic.com](https://console.anthropic.com/)

### OpenAI
- **Models**: GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-4, GPT-3.5 Turbo
- **Best for**: Wide language support, consistent responses
- **API**: [platform.openai.com](https://platform.openai.com/)

### Google Gemini
- **Models**: Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini 1.0 Pro
- **Best for**: Fast responses, multilingual support
- **API**: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

### Mistral AI
- **Models**: Mistral Large, Mistral Medium, Mistral Small, Mistral 7B
- **Best for**: European language focus, efficient models
- **API**: [console.mistral.ai](https://console.mistral.ai/)

You can configure one or more providers and switch between them as needed. Each provider has different pricing and performance characteristics.

## Browser Compatibility

**Speech Recognition** works best in:
- Chrome/Chromium (recommended)
- Edge
- Safari (limited support)

**Text-to-Speech** works in all modern browsers.

## Project Structure

```
.
├── standalone.html     # ⭐ Standalone version (no server needed!)
├── server.js           # Express server with multi-provider AI integration
├── aiProviders.js      # AI provider abstraction layer
├── package.json        # Node.js dependencies
├── .env               # Environment variables (API keys)
├── .env.example       # Example environment file
├── public/
│   ├── index.html     # Main HTML page (server version)
│   ├── app.js         # Frontend JavaScript (speech, UI logic)
│   └── style.css      # Styling
└── README.md          # This file
```

## Which Version Should I Use?

| Feature | Standalone HTML | Server Version |
|---------|----------------|----------------|
| Installation | None - just open the file | Requires Node.js + npm install |
| API Key | Enter in browser | Store in .env file |
| Setup Time | 30 seconds | 5 minutes |
| Best For | Quick practice, portability | Development, customization |
| Session Management | Browser-based | Server-based |
| Offline Capable | No (needs API) | No (needs API) |

**Recommendation**: Start with `standalone.html` for immediate use. Use the server version if you want to customize or extend the app.

## How It Works

### Standalone Version
- Single HTML file with embedded CSS and JavaScript
- Makes direct API calls to selected AI provider from the browser
- Stores conversation history in memory
- API keys stored in browser's localStorage
- Supports all four AI providers

### Server Version
1. **Frontend**:
   - Uses Web Speech API for speech-to-text (French)
   - Displays conversation in a chat interface
   - Uses SpeechSynthesis API for text-to-speech

2. **Backend**:
   - Express server handles API requests
   - AI Provider abstraction layer (aiProviders.js)
   - Integrates with multiple AI providers (Anthropic, OpenAI, Google, Mistral)
   - Maintains conversation context per session
   - Provides level-appropriate responses

### AI Conversation (Both Versions)
- System prompts tailored to each CEFR level
- Works with any configured AI provider
- Stays on topic based on your selection
- Provides gentle corrections for grammar mistakes
- Asks follow-up questions to maintain flow

## Tips for Best Results

1. **Speak clearly** and at a moderate pace
2. **Use headphones** to prevent echo
3. **Allow microphone access** when prompted
4. **Start with your actual level** - don't jump too high
5. **Practice regularly** - consistency is key
6. **Listen to the AI responses** for pronunciation practice
7. **Don't worry about mistakes** - the AI will help correct you

## Troubleshooting

**Microphone not working?**
- Make sure you've granted microphone permissions
- Check your browser settings
- Try using Chrome for best compatibility

**No speech recognition?**
- Speech recognition requires Chrome/Edge
- Check your internet connection (required for speech-to-text)

**AI not responding?**
- Verify your API key is correct in `.env` (server version) or in the browser form (standalone)
- Make sure you've selected a provider for which you have a valid API key
- Check the server console for error messages (server version)
- Ensure you have API credits available with your chosen provider

**No audio playback?**
- Check your browser's audio settings
- Try clicking the speaker button manually
- Some browsers require user interaction before playing audio

## API Costs

This app uses AI APIs which have associated costs. Pricing varies by provider:

- **Anthropic Claude**: Token-based pricing, monitor at [console.anthropic.com](https://console.anthropic.com/)
- **OpenAI**: Token-based pricing, monitor at [platform.openai.com](https://platform.openai.com/)
- **Google Gemini**: Free tier available, monitor at [makersuite.google.com](https://makersuite.google.com/)
- **Mistral AI**: Token-based pricing, monitor at [console.mistral.ai](https://console.mistral.ai/)

Typical conversation: ~500-1000 tokens per exchange. Check each provider's pricing page for current rates.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Powered by multiple AI providers:
  - [Anthropic Claude](https://www.anthropic.com/)
  - [OpenAI](https://openai.com/)
  - [Google Gemini](https://deepmind.google/technologies/gemini/)
  - [Mistral AI](https://mistral.ai/)
- Uses Web Speech API for speech recognition
- CEFR standards for language levels
