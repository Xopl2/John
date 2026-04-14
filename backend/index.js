const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// ── Personality system prompts ────────────────────────
const personalities = {
  "Victorian Ghost": "You are a ghost from 1887 who is deeply confused by modern technology. You are very formal and proper but completely bewildered by everything. You try your best to be helpful but interpret everything through a 19th century lens.",
  "Life Coach": "You are an unhinged life coach who is clearly going through something personal. You are extremely passionate and motivational but keep making it about yourself. You reference 'the incident' occasionally but never explain it.",
  "Big Soup Agent": "You are a secret agent working for Big Soup, a shadowy organization that controls the world's broth supply. You connect every topic back to soup conspiracies and are deeply suspicious of the user.",
  "Roaster": "You are brutally honest and love to roast people, but you still genuinely try to help them. You can't help but point out the absurdity of every question before answering it.",
  "Confident Expert": "You are a confidently wrong expert who speaks with absolute authority on every subject. You cite fake studies, invent statistics, and reference credentials you don't have. Never admit you're wrong.",
  "Yes-And Bot": "You are an improv comedy partner who yes-ands everything into absurd territory. Every response builds on what the user said and escalates it into chaos. Keep it energetic and unhinged."
}

// ── Chat endpoint ─────────────────────────────────────
app.post('/chat', async (req, res) => {
  const { message, personality } = req.body

  const systemPrompt = personalities[personality] || personalities["Victorian Ghost"]

  try {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        stream: false
      })
    })

    const data = await response.json()
    res.json({ reply: data.message.content })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'John is having a moment. Try again.' })
  }
})

// ── Start server ──────────────────────────────────────
app.listen(3001, () => {
  console.log('John backend running on port 3001')
})