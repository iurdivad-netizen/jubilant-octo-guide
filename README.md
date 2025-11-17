# French Voice Tutor

A standalone web application that helps you practice speaking French with AI through structured courses, conversation scenarios, and voice-based interaction. Uses speech recognition, AI-powered conversation, and text-to-speech for an immersive learning experience.

## Features

### Learning Modes
- **48 Structured Lessons**: 6 complete courses (A1-C2) with 8 lessons each, following CEFR standards
- **7 Conversation Scenarios**: Casual conversation, restaurant ordering, travel planning, professional meetings, grammar focus, debate & discussion, and free topic
- **6 Language Levels**: From A1 (Beginner) to C2 (Mastery) with adaptive difficulty

### Voice & Interaction
- **Speech Recognition**: Speak in French using your microphone with real-time transcription
- **Text-to-Speech**: Hear proper French pronunciation with level-adjusted speech rates
- **Auto-Send Option**: Automatically send messages after speech recognition
- **Pronunciation Guide**: Word-level pronunciation feedback and assessment

### AI-Powered Learning
- **AI Tutor**: Natural conversations powered by Perplexity AI
- **Intelligent Feedback System**:
  - Pronunciation corrections and guidance
  - Grammar corrections with explanations
  - Alternative phrase suggestions
  - Topic conversation prompts
- **Customizable Feedback**: Choose between Minimal, Normal, or Detailed feedback with Encouraging, Neutral, or Strict correction tones

### Translation & Support
- **Three Translation Modes**: Always show, on-demand, or off
- **French-to-English Translations**: Toggle translations for any AI response

### Customization
- **7 Themes**: Light, Dark, Ocean Blue, Sunset Warm, Forest Cool, Purple Elegance, and High Contrast
- **Voice Settings**: Adjustable speech rate, pitch, and volume
- **Auto-Play Responses**: Optional automatic playback of AI messages

### Session Management
- **Session Persistence**: Auto-save and resume sessions
- **Export/Import**: Download and restore complete sessions with conversation history
- **Progress Tracking**: Session timer and message count
- **Course Progression**: Navigate through lessons sequentially with "Next Lesson" feature

## Quick Start

**No installation needed!**

1. Get a Perplexity API key at [perplexity.ai/settings/api](https://www.perplexity.ai/settings/api)
2. Open `standalone.html` in Chrome or Edge (recommended for best speech recognition)
3. Enter your API key (stored locally in your browser)
4. Choose your learning mode:
   - **Structured Course**: Select from 6 complete courses (A1-C2) with 8 lessons each
   - **Scenario Practice**: Pick a CEFR level and conversation scenario
   - **Resume Session**: Continue from where you left off
5. Start speaking French!

**Note**: Your API key is stored securely in your browser's localStorage and is only sent to Perplexity's API.

## Usage

### Three Learning Modes

**Mode 1: Structured Courses** (Recommended)
- Choose from 6 complete courses aligned with CEFR levels (A1-C2)
- Each course contains 8 progressive lessons
- Topics include greetings, numbers, daily routines, travel, career, debates, and more
- Click the info (ⓘ) button to preview all lessons in a course
- Use "Next Lesson" to progress sequentially through the course

**Mode 2: Scenario Practice**
1. **Select Your Level**:
   - **A1 (Beginner)**: Basic phrases and simple sentences
   - **A2 (Elementary)**: Simple conversations about familiar topics
   - **B1 (Intermediate)**: Conversations about experiences and events
   - **B2 (Upper Intermediate)**: Complex conversations and abstract topics
   - **C1 (Advanced)**: Fluent conversation on complex topics
   - **C2 (Mastery)**: Near-native fluency

2. **Choose a Scenario**:
   - **Casual Conversation**: Natural, everyday French chat
   - **Restaurant Ordering**: Real-world dining scenario
   - **Travel Planning**: Booking and travel discussions
   - **Professional Meeting**: Business French practice
   - **Grammar Focus**: Concentrated grammar practice
   - **Debate & Discussion**: Opinion-based conversations
   - **Free Topic**: Choose any subject

**Mode 3: Resume Session**
- Continue from your last saved session
- All conversation history and settings are preserved

### During Practice

1. **Speaking**:
   - Click the microphone button to start recording
   - Speak in French - watch real-time transcription (if enabled)
   - Click "Send" or enable auto-send to submit your message

2. **AI Response**:
   - The AI tutor responds in French at your selected level
   - Responses are automatically spoken aloud (if enabled)
   - Click the speaker button to replay any response
   - Toggle translation to see English version

3. **Learning Feedback**:
   - View pronunciation guidance for better accent
   - See grammar corrections with explanations
   - Discover alternative phrases and expressions
   - Get conversation topic suggestions

4. **Customization**:
   - Adjust speech rate, pitch, and volume in settings
   - Change feedback level (Minimal/Normal/Detailed)
   - Set correction tone (Encouraging/Neutral/Strict)
   - Switch themes for comfortable viewing

## AI Provider

The app uses **Perplexity AI** to power natural French conversations:

### Perplexity AI
- **Default Model**: Sonar Pro
- **Best for**: Natural language understanding, conversational AI, French language tutoring
- **API Key**: Get yours at [perplexity.ai/settings/api](https://www.perplexity.ai/settings/api)
- **Features**: Real-time responses, context-aware conversations, adaptive to learner level

## Browser Compatibility

**Speech Recognition** works best in:
- Chrome/Chromium (recommended)
- Edge
- Safari (limited support)

**Text-to-Speech** works in all modern browsers.

## How It Works

- **Single HTML File**: All code, CSS, and JavaScript embedded in `standalone.html`
- **Direct API Calls**: Communicates with Perplexity AI API directly from the browser
- **Local Storage**: Stores conversation history, API key, and settings in browser's localStorage
- **Web Speech API**: Speech-to-text for French language input (fr-FR)
- **Speech Synthesis API**: Text-to-speech with adjustable rate, pitch, and volume
- **CEFR-Aligned System Prompts**: Tailored prompts for each language level (A1-C2)
- **Structured Curriculum**: 48 lessons organized into 6 progressive courses
- **Intelligent Feedback**: Four-part feedback system (pronunciation, grammar, alternatives, topics)
- **Translation Integration**: On-demand French-to-English translations
- **Session Management**: Auto-save, export, import, and resume functionality
- **Responsive Design**: Works on desktop and mobile browsers
- **No Server Required**: Runs entirely in the browser with no backend needed

## Tips for Best Results

1. **Start with Structured Courses**: Follow the lesson progression for systematic learning
2. **Speak clearly** and at a moderate pace for accurate speech recognition
3. **Use headphones** to prevent echo and improve audio quality
4. **Allow microphone access** when prompted by your browser
5. **Choose the right level**: Start with your actual level, not aspirational - the AI adapts to you
6. **Enable auto-play responses**: Learn proper pronunciation by hearing native-like speech
7. **Use the feedback panel**: Review pronunciation, grammar, and alternative expressions
8. **Adjust feedback settings**: Start with "Detailed" feedback and "Encouraging" tone
9. **Toggle translations**: Use on-demand translations when needed, but try without first
10. **Practice regularly**: Consistency builds fluency - even 10-15 minutes daily helps
11. **Export your sessions**: Save your progress and review past conversations
12. **Don't worry about mistakes**: The AI provides constructive feedback to help you improve
13. **Experiment with themes**: Find a comfortable visual setting for extended practice

## Troubleshooting

**Microphone not working?**
- Make sure you've granted microphone permissions in your browser
- Check your browser settings and system audio input
- Try using Chrome or Edge for best compatibility
- Verify your microphone works in other applications

**No speech recognition?**
- Speech recognition requires Chrome or Edge browser
- Check your internet connection (required for Web Speech API)
- Ensure you're using French speech (the app is set to fr-FR)
- Try refreshing the page and granting permissions again

**AI not responding?**
- Verify your Perplexity API key is correct
- Check the browser console (F12) for error messages
- Ensure you have API credits available in your Perplexity account
- Verify you're connected to the internet
- Try a different browser or clear your browser cache

**No audio playback?**
- Check your browser's audio settings and system volume
- Try clicking the speaker button manually to replay
- Some browsers require user interaction before playing audio
- Disable auto-play if it's causing issues (check settings panel)

**Session not saving?**
- Ensure localStorage is enabled in your browser
- Check that you're not in private/incognito mode
- Clear your browser cache if localStorage is full
- Try exporting your session as a backup

**Translation not working?**
- Check your translation mode setting (Always/On-Demand/Off)
- Translations require the AI to provide them in responses
- Try toggling the translation button for specific messages

**Course/Lesson not loading?**
- Refresh the page and select the course again
- Clear your localStorage and restart: check browser settings
- Verify `standalone.html` is the latest version

## API Costs

This app uses the Perplexity AI API which has associated costs:

- **Perplexity AI**: Token-based pricing, monitor usage at [perplexity.ai/settings/api](https://www.perplexity.ai/settings/api)
- **Typical Usage**: ~500-1,500 tokens per conversation exchange (depending on lesson complexity and feedback level)
- **Cost Control**: Use "Minimal" feedback setting to reduce token usage
- **Monitoring**: Check your API dashboard regularly to track usage and costs

Check Perplexity's pricing page for current rates and available plans. Consider their subscription options for heavy usage.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Course Structure

The app includes **48 structured lessons** organized into **6 complete courses**:

### A1 Complete Course (Beginner - 8 Lessons)
Greetings & Introductions • Numbers & Colors • Family & Friends • Food & Drinks • Daily Routines • Shopping Basics • Directions • Weather & Seasons

### A2 Complete Course (Elementary - 8 Lessons)
Past Experiences • Making Plans • Describing People • At the Doctor • Comparing Things • Telling Stories • Hobbies & Interests • Expressing Opinions

### B1 Complete Course (Intermediate - 8 Lessons)
Travel Experiences • Career & Ambitions • Environmental Issues • French Culture • Making Arguments • Media & News • Relationships • Hypothetical Situations

### B2 Complete Course (Upper Intermediate - 8 Lessons)
Abstract Concepts • Subjunctive Mood • Social Issues • Arts & Literature • Technology & Innovation • Psychology & Behavior • Global Politics • Complex Narratives

### C1 Complete Course (Advanced - 8 Lessons)
Idiomatic Mastery • Philosophical Discourse • French History • Rhetorical Techniques • Contemporary Literature • Sociolinguistics • Ethics & Morality • Cultural Critique

### C2 Complete Course (Mastery - 8 Lessons)
Literary Style • Poetic Language • Francophone Diversity • Intellectual Debate • Classical References • Nuanced Discourse • Cultural Authority • Native-Level Mastery

Each lesson includes detailed objectives, context-specific scenarios, starter prompts, and key vocabulary.

## Acknowledgments

- Powered by [Perplexity AI](https://www.perplexity.ai/) for natural language understanding
- Uses Web Speech API for speech recognition (fr-FR)
- Uses Speech Synthesis API for text-to-speech
- Built following [CEFR standards](https://www.coe.int/en/web/common-european-framework-reference-languages) for language levels
- Designed for standalone, browser-based learning with no server required
