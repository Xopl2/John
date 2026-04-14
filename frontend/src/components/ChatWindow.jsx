function ChatWindow({ messages }) {
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
          animation: "fadeUp 0.2s ease"
        }}>
          <div style={{
            fontSize: 11, fontFamily: "monospace",
            color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em",
            padding: "0 4px", marginBottom: 3
          }}>
            {msg.role === "user" ? "you" : "john"}
          </div>
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
        </div>
      ))}
    </div>
  )
}

export default ChatWindow