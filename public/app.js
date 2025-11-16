// API base URL
const API_URL = window.location.origin;

// Global state
let selectedLevel = null;
let selectedTopic = null;
let selectedProvider = null;
let selectedModel = null;
let availableProviders = [];
let sessionId = null;
let recognition = null;
let synthesis = window.speechSynthesis;
let isRecording = false;
let currentTranscript = '';
let lastAIResponse = '';

// Session persistence
const SESSION_STORAGE_KEY = 'french_tutor_server_session';
let conversationHistory = [];
let sessionStartTime = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', async () => {
    await loadConfig();
    setupEventListeners();
    setupSpeechRecognition();
    checkForSavedSession();
});

// Load levels and topics from server
async function loadConfig() {
    try {
        const response = await fetch(`${API_URL}/api/config`);
        const config = await response.json();

        renderLevels(config.levels);
        renderTopics(config.topics);

        if (config.providers && config.providers.length > 0) {
            availableProviders = config.providers;
            renderProviders(config.providers);
        } else {
            // Show error if no providers are available
            const providerContainer = document.getElementById('providerSelection');
            providerContainer.innerHTML = '<p class="error-message">No AI providers configured. Please add API keys to your .env file.</p>';
        }
    } catch (error) {
        console.error('Failed to load configuration:', error);
        showStatus('Failed to load configuration. Please refresh the page.', 'error');
    }
}

// Render level selection
function renderLevels(levels) {
    const container = document.getElementById('levelSelection');
    container.innerHTML = '';

    Object.entries(levels).forEach(([key, level]) => {
        const card = document.createElement('div');
        card.className = 'selection-card';
        card.dataset.value = key;
        card.innerHTML = `
            <h3>${level.name}</h3>
            <p>${level.description}</p>
        `;
        card.addEventListener('click', () => selectLevel(key, card));
        container.appendChild(card);
    });
}

// Render topic selection
function renderTopics(topics) {
    const container = document.getElementById('topicSelection');
    container.innerHTML = '';

    Object.entries(topics).forEach(([key, topic]) => {
        const card = document.createElement('div');
        card.className = 'selection-card';
        card.dataset.value = key;
        card.innerHTML = `
            <h3>${topic.name}</h3>
            <p>${topic.description}</p>
        `;
        card.addEventListener('click', () => selectTopic(key, card));
        container.appendChild(card);
    });
}

// Render provider selection
function renderProviders(providers) {
    const container = document.getElementById('providerSelection');
    container.innerHTML = '';

    providers.forEach(provider => {
        const card = document.createElement('div');
        card.className = 'selection-card';
        card.dataset.value = provider.id;
        card.innerHTML = `
            <h3>${provider.name}</h3>
            <p>${provider.models.length} models available</p>
        `;
        card.addEventListener('click', () => selectProvider(provider.id, card));
        container.appendChild(card);
    });
}

// Select level
function selectLevel(level, card) {
    selectedLevel = level;

    // Update UI
    document.querySelectorAll('#levelSelection .selection-card').forEach(c => {
        c.classList.remove('selected');
    });
    card.classList.add('selected');

    checkCanStart();
}

// Select topic
function selectTopic(topic, card) {
    selectedTopic = topic;

    // Update UI
    document.querySelectorAll('#topicSelection .selection-card').forEach(c => {
        c.classList.remove('selected');
    });
    card.classList.add('selected');

    checkCanStart();
}

// Select provider
function selectProvider(providerId, card) {
    selectedProvider = providerId;

    // Update UI
    document.querySelectorAll('#providerSelection .selection-card').forEach(c => {
        c.classList.remove('selected');
    });
    card.classList.add('selected');

    // Update model selection
    const provider = availableProviders.find(p => p.id === providerId);
    if (provider && provider.models.length > 0) {
        updateModelSelection(provider.models);
    }

    checkCanStart();
}

// Update model selection dropdown
function updateModelSelection(models) {
    const modelSelection = document.getElementById('modelSelection');
    const modelSelect = document.getElementById('modelSelect');

    modelSelect.innerHTML = '<option value="">Default Model</option>';

    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model.id;
        option.textContent = model.name;
        modelSelect.appendChild(option);
    });

    modelSelection.style.display = 'block';
}

// Check if we can start the conversation
function checkCanStart() {
    const startBtn = document.getElementById('startBtn');
    if (selectedLevel && selectedTopic && selectedProvider) {
        startBtn.disabled = false;
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('startBtn').addEventListener('click', startConversation);
    document.getElementById('endBtn').addEventListener('click', endConversation);
    document.getElementById('micBtn').addEventListener('click', toggleRecording);
    document.getElementById('sendBtn').addEventListener('click', sendMessage);
    document.getElementById('speakBtn').addEventListener('click', speakLastResponse);
}

// Setup speech recognition
function setupSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        showStatus('Speech recognition not supported in this browser. Please use Chrome.', 'error');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.lang = 'fr-FR';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        isRecording = true;
        updateMicButton();
        showStatus('Listening...', 'listening');
        document.getElementById('transcriptionText').textContent = 'Listening...';
        document.getElementById('interimText').textContent = '';
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        if (finalTranscript) {
            currentTranscript = finalTranscript;
            document.getElementById('transcriptionText').textContent = finalTranscript;
            document.getElementById('interimText').textContent = '';
            document.getElementById('sendBtn').disabled = false;
        } else {
            document.getElementById('interimText').textContent = interimTranscript;
        }
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        isRecording = false;
        updateMicButton();

        if (event.error === 'no-speech') {
            showStatus('No speech detected. Please try again.', 'error');
        } else {
            showStatus(`Error: ${event.error}`, 'error');
        }
    };

    recognition.onend = () => {
        isRecording = false;
        updateMicButton();
        if (!currentTranscript) {
            showStatus('Ready', 'ready');
        }
    };
}

// Toggle recording
function toggleRecording() {
    if (!recognition) {
        alert('Speech recognition not available');
        return;
    }

    if (isRecording) {
        recognition.stop();
    } else {
        currentTranscript = '';
        document.getElementById('sendBtn').disabled = true;
        recognition.start();
    }
}

// Update microphone button appearance
function updateMicButton() {
    const micBtn = document.getElementById('micBtn');
    if (isRecording) {
        micBtn.classList.add('recording');
    } else {
        micBtn.classList.remove('recording');
    }
}

// Start conversation
async function startConversation() {
    try {
        // Clear any previous session
        clearSavedSession();

        const modelSelect = document.getElementById('modelSelect');
        selectedModel = modelSelect.value || null;

        const response = await fetch(`${API_URL}/api/conversation/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                level: selectedLevel,
                topic: selectedTopic,
                provider: selectedProvider,
                model: selectedModel
            })
        });

        const data = await response.json();
        sessionId = data.sessionId;
        sessionStartTime = Date.now();
        conversationHistory = [];

        // Update UI
        document.getElementById('currentLevel').textContent = selectedLevel;
        document.getElementById('currentTopic').textContent = selectedTopic;

        // Switch screens
        document.getElementById('setupScreen').classList.remove('active');
        document.getElementById('conversationScreen').classList.add('active');

        // Add welcome message
        const welcomeMsg = 'Bonjour! Ready to practice French? Start speaking by clicking the microphone button!';
        addMessage('ai', welcomeMsg);
        conversationHistory.push({ role: 'assistant', content: welcomeMsg });

        showStatus('Conversation started. Click the microphone to speak.', 'ready');

        // Save initial session state
        saveSession();
    } catch (error) {
        console.error('Failed to start conversation:', error);
        showStatus('Failed to start conversation. Please try again.', 'error');
    }
}

// Send message to AI
async function sendMessage() {
    if (!currentTranscript || !sessionId) return;

    const userMessage = currentTranscript;
    currentTranscript = '';

    // Update UI
    addMessage('user', userMessage);
    conversationHistory.push({ role: 'user', content: userMessage });

    document.getElementById('transcriptionText').textContent = 'Click microphone to start speaking...';
    document.getElementById('sendBtn').disabled = true;
    showStatus('AI is thinking...', 'thinking');

    try {
        const response = await fetch(`${API_URL}/api/conversation/message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sessionId: sessionId,
                message: userMessage
            })
        });

        const data = await response.json();
        lastAIResponse = data.response;
        addMessage('ai', data.response);
        conversationHistory.push({ role: 'assistant', content: data.response });

        // Auto-save session after each message
        saveSession();

        // Automatically speak the AI response
        speakText(data.response);

        showStatus('Ready to continue. Click the microphone to speak.', 'ready');
    } catch (error) {
        console.error('Failed to send message:', error);
        showStatus('Failed to get response. Please try again.', 'error');
        // Remove the user message from history if the request failed
        conversationHistory.pop();
    }
}

// Add message to chat
function addMessage(role, text) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;

    messageDiv.appendChild(bubble);
    chatContainer.appendChild(messageDiv);

    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Speak text using text-to-speech
function speakText(text) {
    // Cancel any ongoing speech
    synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Try to find a French voice
    const voices = synthesis.getVoices();
    const frenchVoice = voices.find(voice => voice.lang.startsWith('fr'));
    if (frenchVoice) {
        utterance.voice = frenchVoice;
    }

    synthesis.speak(utterance);
}

// Speak last AI response
function speakLastResponse() {
    if (lastAIResponse) {
        speakText(lastAIResponse);
    }
}

// End conversation
async function endConversation() {
    if (sessionId) {
        try {
            await fetch(`${API_URL}/api/conversation/${sessionId}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Failed to end conversation:', error);
        }
    }

    // Clear saved session when explicitly ending
    clearSavedSession();

    // Reset state
    sessionId = null;
    lastAIResponse = '';
    currentTranscript = '';
    conversationHistory = [];
    sessionStartTime = null;

    // Clear chat
    document.getElementById('chatContainer').innerHTML = '';

    // Switch screens
    document.getElementById('conversationScreen').classList.remove('active');
    document.getElementById('setupScreen').classList.add('active');

    showStatus('', 'ready');
}

// Show status message
function showStatus(message, type = 'ready') {
    const statusText = document.getElementById('statusText');
    statusText.textContent = message;
    statusText.className = type;
}

// Load voices when they're ready
if (synthesis.onvoiceschanged !== undefined) {
    synthesis.onvoiceschanged = () => {
        synthesis.getVoices();
    };
}

// ===== SESSION PERSISTENCE =====
function saveSession() {
    if (!sessionId || !sessionStartTime || conversationHistory.length === 0) {
        return; // Don't save empty sessions
    }

    const sessionData = {
        selectedLevel,
        selectedTopic,
        selectedProvider,
        selectedModel,
        sessionId,
        conversationHistory,
        sessionStartTime,
        lastAIResponse,
        savedAt: Date.now()
    };

    try {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
        console.log('Session saved successfully');
    } catch (error) {
        console.error('Failed to save session:', error);
    }
}

function loadSession() {
    try {
        const stored = localStorage.getItem(SESSION_STORAGE_KEY);
        if (!stored) return null;

        const sessionData = JSON.parse(stored);
        console.log('Loaded session:', sessionData);
        return sessionData;
    } catch (error) {
        console.error('Failed to load session:', error);
        return null;
    }
}

function clearSavedSession() {
    try {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        console.log('Saved session cleared');
    } catch (error) {
        console.error('Failed to clear session:', error);
    }
}

function checkForSavedSession() {
    const savedSession = loadSession();
    if (!savedSession) return;

    // Calculate how long ago the session was saved
    const timeSince = Date.now() - savedSession.savedAt;
    const hoursSince = Math.floor(timeSince / (1000 * 60 * 60));
    const minutesSince = Math.floor(timeSince / (1000 * 60));

    let timeText = '';
    if (hoursSince > 0) {
        timeText = `${hoursSince} hour${hoursSince > 1 ? 's' : ''} ago`;
    } else {
        timeText = `${minutesSince} minute${minutesSince > 1 ? 's' : ''} ago`;
    }

    // Show resume dialog
    const resumeMessage = `Found a saved session from ${timeText}:\n\n` +
        `Level: ${savedSession.selectedLevel}\n` +
        `Topic: ${savedSession.selectedTopic}\n` +
        `Provider: ${savedSession.selectedProvider}\n` +
        `Messages: ${savedSession.conversationHistory.length}\n\n` +
        `Would you like to resume where you left off?`;

    if (confirm(resumeMessage)) {
        restoreSession(savedSession);
    } else {
        // User declined, offer to clear the saved session
        if (confirm('Would you like to clear the saved session?')) {
            clearSavedSession();
        }
    }
}

function restoreSession(sessionData) {
    try {
        // Restore state
        selectedLevel = sessionData.selectedLevel;
        selectedTopic = sessionData.selectedTopic;
        selectedProvider = sessionData.selectedProvider;
        selectedModel = sessionData.selectedModel;
        sessionId = sessionData.sessionId;
        conversationHistory = sessionData.conversationHistory;
        sessionStartTime = sessionData.sessionStartTime;
        lastAIResponse = sessionData.lastAIResponse;

        // Update UI
        document.getElementById('currentLevel').textContent = selectedLevel;
        document.getElementById('currentTopic').textContent = selectedTopic;

        // Switch screens
        document.getElementById('setupScreen').classList.remove('active');
        document.getElementById('conversationScreen').classList.add('active');

        // Restore chat messages
        const chatContainer = document.getElementById('chatContainer');
        chatContainer.innerHTML = '';

        conversationHistory.forEach((msg) => {
            addMessage(msg.role === 'user' ? 'user' : 'ai', msg.content);
        });

        showStatus('Session restored. Click microphone to continue.', 'ready');
        console.log('Session restored successfully');
    } catch (error) {
        console.error('Failed to restore session:', error);
        alert('Failed to restore session. Starting fresh.');
        clearSavedSession();
    }
}
