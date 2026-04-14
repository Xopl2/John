import { useEffect, useRef } from "react"

function ChatWindow({ messages }) {
  const bottomRef = useRef(null)

  // Auto scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div style={{
      flex: 1, overflowY: "auto", padding: "24px 32px",
      display: "flex", flexDirection: "column", gap: 6,
      scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent"
    }}>
      {messages.map((msg, i) => (
        <div key={i} style={{
          display: "flex", flexDirection: "column",
          alignItems: msg.role === "user" ? "flex-end" : "flex-start",
          marginBottom: 8,
        }}>
          <div style={{
            fontSize: 11, fontFamily: "monospace",
            color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em",
            padding: "0 4px", marginBottom: 3
          }}>
            {msg.role === "user" ? "you" : "john"}
          </div>

          {/* Typing indicator */}
          {msg.content === "..." ? (
            <div style={{
              padding: "12px 16px",
              background: "rgba(255,255,255,0.07)",
              border: "0.5px solid rgba(255,255,255,0.12)",
              borderRadius: 18, borderBottomLeftRadius: 4,
              backdropFilter: "blur(12px)",
              display: "flex", gap: 5, alignItems: "center"
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(200,150,255,0.7)", display: "inline-block", animation: "johnDot 1.2s infinite", animationDelay: "0s" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(200,150,255,0.7)", display: "inline-block", animation: "johnDot 1.2s infinite", animationDelay: "0.2s" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(200,150,255,0.7)", display: "inline-block", animation: "johnDot 1.2s infinite", animationDelay: "0.4s" }} />
            </div>
          ) : (
            <div style={{
              maxWidth: "75%", padding: "10px 15px",
              fontSize: 14, lineHeight: 1.65, borderRadius: 18,
              borderBottomRightRadius: msg.role === "user" ? 4 : 18,
              borderBottomLeftRadius: msg.role === "user" ? 18 : 4,
              background: msg.role === "user"
                ? "rgba(150,80,255,0.25)"
                : "rgba(255,255,255,0.07)",
              border: msg.role === "user"
                ? "0.5px solid rgba(180,120,255,0.35)"
                : "0.5px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)"
            }}>
              {msg.content}
            </div>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

export default ChatWindow