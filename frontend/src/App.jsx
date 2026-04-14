import { useState } from "react"
import Aurora from "./components/Aurora"
import MessageInput from "./components/MessageInput"
import ChatWindow from "./components/ChatWindow"

function App() {
  // ── State ──────────────────────────────────────────────
  const [messages, setMessages] = useState([])
  const [started, setStarted] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [personality, setPersonality] = useState("Victorian Ghost")

  // ── Handlers ───────────────────────────────────────────
  async function handleSend(message) {
    if (!message.trim()) return
    if (!started) setStarted(true)

    // Add user message
    const newMessages = [...messages, { role: "user", content: message }]
    setMessages(newMessages)

    // Add a typing indicator
    setMessages([...newMessages, { role: "john", content: "..." }])

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, personality })
      })

      const data = await response.json()

      // Replace typing indicator with real response
      setMessages([...newMessages, { role: "john", content: data.reply }])

    } catch (err) {
      setMessages([...newMessages, { role: "john", content: "John has left the building. Try again." }])
    }
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", background: "#04000f", overflow: "hidden", fontFamily: "'Syne', sans-serif" }}>

      {/* ── Aurora Background ────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Aurora
          colorStops={["#3b0aab", "#7c3aed", "#0ea5e9"]}
          amplitude={1.2}
          blend={0.6}
          speed={0.5}
        />
      </div>

      {/* ── Sidebar Overlay (click outside to close) ─────── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: "absolute", inset: 0, zIndex: 2, background: "transparent" }}
        />
      )}

      {/* ── Sidebar ──────────────────────────────────────── */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, zIndex: 3,
        width: sidebarOpen ? "240px" : "0px",
        overflow: "hidden", transition: "width 0.3s ease",
        background: "rgba(8,2,20,0.75)", backdropFilter: "blur(24px)",
        borderRight: "0.5px solid rgba(255,255,255,0.08)",
        display: "flex", flexDirection: "column"
      }}>
        {/* Sidebar header */}
        <div style={{ padding: "18px 16px 12px", borderBottom: "0.5px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>John</span>
          {/* New chat button */}
          <div onClick={() => { setStarted(false); setMessages([]) }} style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 16 }}>+</div>
        </div>

        {/* Recent chats label */}
        <div style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px 16px 6px", whiteSpace: "nowrap" }}>Recent</div>

        {/* Chat history list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "4px 8px" }}>
          {["What is a PDF", "Help me with Excel", "Is soup sentient", "My feelings about Tuesdays", "Why does Wi-Fi exist"].map((item, i) => (
            <div key={i} style={{ padding: "8px 10px", borderRadius: 8, fontSize: 13, color: "rgba(255,255,255,0.45)", cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "monospace" }}>{item}</div>
          ))}
        </div>

        {/* User info footer */}
        <div style={{ padding: "12px 16px", borderTop: "0.5px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "0.5px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "monospace" }}>QL</div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>quentin</span>
        </div>
      </div>

      {/* ── Main UI ──────────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, display: "flex", flexDirection: "column" }}>

        {/* ── Topbar ───────────────────────────────────────── */}
        <div style={{ height: 52, padding: "0 16px", borderBottom: "0.5px solid rgba(255,255,255,0.08)", background: "rgba(4,0,15,0.4)", backdropFilter: "blur(24px)", display: "flex", alignItems: "center", gap: 12, flexShrink: 0, zIndex: 4, position: "relative" }}>
          {/* Hamburger - opens/closes sidebar */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: 15, cursor: "pointer" }}
          >☰</button>
          {/* John name - opens personality drawer. Only visible after first message */}
          <span
            onClick={() => setDrawerOpen(!drawerOpen)}
            style={{ fontSize: 15, fontWeight: 500, color: started ? "rgba(255,255,255,0.85)" : "transparent", cursor: "pointer", transition: "color 0.3s ease" }}
          >John</span>
          {/* Active mode badge - only visible after first message */}
          <span style={{
            marginLeft: "auto", fontSize: 10, fontFamily: "monospace",
            color: started ? "rgba(255,255,255,0.35)" : "transparent",
            letterSpacing: "0.04em", padding: "4px 10px", borderRadius: 20,
            border: `0.5px solid ${started ? "rgba(255,255,255,0.12)" : "transparent"}`,
            transition: "all 0.3s ease"
          }}>
            Mode Active
          </span>
        </div>

        {/* ── Greeting Screen (before first message) ───────── */}
        {!started && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: 150, gap: 10 }}>
            {/* Big John title - clicking opens personality drawer */}
            <div
              onClick={() => setDrawerOpen(!drawerOpen)}
              style={{ fontFamily: "'Instrument Serif', serif", fontSize: 150, color: "white", fontStyle: "italic", cursor: "pointer", letterSpacing: "-0.02em", textShadow: "0 0 30px rgba(180,100,255,0.7), 0 0 60px rgba(100,180,255,0.35)" }}
            >John</div>
            <div style={{ fontSize: 12, fontFamily: "monospace", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>expect the unexpected</div>
          </div>
        )}

        {/* ── Chat Window (after first message) ────────────── */}
        {started && <ChatWindow messages={messages} />}

        {/* ── Personality Drawer (floats above input) ──────── */}
        {/* Opens when clicking John on greeting screen or in topbar */}
        <div style={{
          position: "absolute",
          bottom: "76px",
          left: 0,
          right: 0,
          zIndex: 5,
          background: "rgba(4,0,15,0.6)", backdropFilter: "blur(24px)",
          borderTop: drawerOpen ? "0.5px solid rgba(255,255,255,0.08)" : "none",
          maxHeight: drawerOpen ? "120px" : "0px",
          overflow: "hidden", transition: "max-height 0.3s ease",
          padding: drawerOpen ? "14px 24px" : "0 24px"
        }}>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>John's current mode</div>
          {/* Personality chips - click to select */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {["Victorian Ghost", "Life Coach", "Big Soup Agent", "Roaster", "Confident Expert", "Yes-And Bot"].map((p, i) => (
              <div
                key={i}
                onClick={() => setPersonality(p)}
                style={{
                  fontSize: 11, fontFamily: "monospace", padding: "5px 12px", borderRadius: 20,
                  cursor: "pointer", transition: "all 0.15s",
                  background: personality === p ? "rgba(150,80,255,0.25)" : "transparent",
                  border: personality === p ? "0.5px solid rgba(180,120,255,0.6)" : "0.5px solid rgba(255,255,255,0.12)",
                  color: personality === p ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)"
                }}
              >{p}</div>
            ))}
          </div>
        </div>

        {/* ── Message Input ─────────────────────────────────── */}
        {/* Centered + narrow before first message, full width at bottom after */}
        <div style={{
          position: started ? "relative" : "absolute",
          bottom: started ? "auto" : "40%",
          left: started ? "auto" : "50%",
          transform: started ? "none" : "translateX(-50%)",
          width: started ? "100%" : "min(560px, 90%)",
          transition: "all 0.4s ease",
          zIndex: 2
        }}>
          <MessageInput onSend={handleSend} />
        </div>

      </div>

    </div>
  )
}

export default App