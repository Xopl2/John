# John
An unpredictable AI chatbot with rotating unhinged personalities.
Built with React, Node.js/Express, and Ollama (local LLM).

## Tech Stack
- Frontend: React
- Backend: Node.js + Express
- AI: Ollama (Llama 3.1 8B)

## Personalities









john/
├── frontend/          # React app (what users see)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx      # message history display
│   │   │   ├── MessageInput.jsx    # text input + send button
│   │   │   ├── PersonalityBadge.jsx # shows current John mode
│   │   │   └── RerollButton.jsx    # spin a new personality
│   │   ├── personalities.js        # all of John's modes defined here
│   │   ├── App.jsx                 # root component, holds state
│   │   └── main.jsx                # entry point
│   └── package.json
│
└── backend/           # Express server (talks to Ollama)
    ├── index.js       # API routes
    ├── personalities.js  # system prompts (mirrored or shared)
    └── package.json
