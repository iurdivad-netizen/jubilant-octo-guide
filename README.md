# French AI Conversation Practice App

A web application that helps you practice speaking French with AI at different skill levels and topics. Uses speech recognition, Claude AI for natural conversations, and text-to-speech for pronunciation.

## Features

- **6 Language Levels**: From A1 (Beginner) to C2 (Mastery) following CEFR standards
- **10 Conversation Topics**: Daily life, travel, food, work, culture, technology, health, environment, education, and social issues
- **Speech Recognition**: Speak in French using your microphone
- **AI Responses**: Natural conversations powered by Claude AI
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

1. Get your Anthropic API key from [console.anthropic.com](https://console.anthropic.com/)
2. Open `standalone.html` in Chrome or Edge
3. Enter your API key (stored locally in your browser)
4. Select level and topic
5. Start speaking French!

**Note**: The API key is stored in your browser's localStorage and never sent anywhere except directly to Anthropic's API.

---

## Full Installation (Server Version)

### Prerequisites

- Node.js (v14 or higher)
- An Anthropic API key ([Get one here](https://console.anthropic.com/))
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

4. Add your Anthropic API key to the `.env` file:
```
ANTHROPIC_API_KEY=your_api_key_here
PORT=3000
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

5. **Start Conversing**:
   - Click the microphone button to start speaking
   - Speak in French - your speech will be transcribed in real-time
   - Click "Send" to submit your message
   - The AI will respond in French at your selected level
   - The response will be automatically spoken aloud
   - Click the speaker button to replay the AI's last response

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
├── server.js           # Express server with Claude AI integration
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
- Makes direct API calls to Anthropic from the browser
- Stores conversation history in memory
- API key stored in browser's localStorage

### Server Version
1. **Frontend**:
   - Uses Web Speech API for speech-to-text (French)
   - Displays conversation in a chat interface
   - Uses SpeechSynthesis API for text-to-speech

2. **Backend**:
   - Express server handles API requests
   - Integrates with Claude AI (Anthropic)
   - Maintains conversation context per session
   - Provides level-appropriate responses

### AI Conversation (Both Versions)
- System prompts tailored to each CEFR level
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
- Verify your Anthropic API key is correct in `.env`
- Check the server console for error messages
- Ensure you have API credits available

**No audio playback?**
- Check your browser's audio settings
- Try clicking the speaker button manually
- Some browsers require user interaction before playing audio

## API Costs

This app uses the Claude API which has associated costs:
- Charges are based on tokens processed
- Typical conversation: ~500-1000 tokens per exchange
- Monitor your usage at [Anthropic Console](https://console.anthropic.com/)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Powered by [Anthropic's Claude AI](https://www.anthropic.com/)
- Uses Web Speech API for speech recognition
- CEFR standards for language levels
