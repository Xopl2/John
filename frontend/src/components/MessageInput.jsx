import { useState } from "react"

function MessageInput({ onSend }) {
  const [value, setValue] = useState("")

  function handleSend() {
    if (!value.trim()) return
    onSend(value)
    setValue("")
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSend()
  }

  return (
    <div style={{
      padding: "14px 20px 18px",
      display: "flex", gap: 10, alignItems: "center",
      background: "none", backdropFilter: "none",
      borderTop: "none"
    }}>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Talk to John..."
        style={{
          flex: 1, height: 44, padding: "0 16px",
          background: "rgba(255,255,255,0.07)",
          border: "0.5px solid rgba(255,255,255,0.13)",
          borderRadius: 22, fontSize: 14,
          fontFamily: "'Syne', sans-serif",
          color: "rgba(255,255,255,0.9)",
          outline: "none"
        }}
      />
      <button onClick={handleSend} style={{
        width: 44, height: 44, borderRadius: "50%",
        background: "rgba(150,80,255,0.35)",
        border: "0.5px solid rgba(180,120,255,0.5)",
        color: "rgba(255,255,255,0.8)", fontSize: 16,
        cursor: "pointer", display: "flex",
        alignItems: "center", justifyContent: "center"
      }}>↑</button>
    </div>
  )
}

export default MessageInput