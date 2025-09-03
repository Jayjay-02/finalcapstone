import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface Group {
  id: number;
  name: string;
  topic: string;
  notes: string;
  meeting: string;
}

interface ChatMessage {
  sender: string;
  text: string;
  timestamp: string;
}

export default function StudentCollaborate() {
  const [group, setGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const studentName = localStorage.getItem("studentName") || "Anonymous";

  // Load group details from stored documents/groups
  useEffect(() => {
    const docs = JSON.parse(localStorage.getItem("documents") || "[]");
    const groups = JSON.parse(localStorage.getItem("groups") || "[]");

    if (docs.length > 0) {
      const g = groups.find((g: any) => g.id === docs[0].id) || {
        id: docs[0].id,
        name: docs[0].file.split(".")[0],
        topic: docs[0].title,
        notes: "",
        meeting: ""
      };
      setGroup(g);
    }
  }, []);

  // Load chat messages for this group
  useEffect(() => {
    if (!group) return;
    const storedChats = JSON.parse(localStorage.getItem("teamChats") || "{}");
    setMessages(storedChats[group.id] || []);
  }, [group]);

  // Listen for changes from other tabs/windows to sync messages live
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "teamChats" && group) {
        const updatedChats = JSON.parse(e.newValue || "{}");
        setMessages(updatedChats[group.id] || []);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [group]);

  // Send a new message
  const handleSend = () => {
    if (!newMessage.trim() || !group) return;

    const newMsg: ChatMessage = {
      sender: studentName,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    const chats = JSON.parse(localStorage.getItem("teamChats") || "{}");
    const groupMessages = chats[group.id] || [];
    const updatedMessages = [...groupMessages, newMsg];
    chats[group.id] = updatedMessages;

    localStorage.setItem("teamChats", JSON.stringify(chats));
    setMessages(updatedMessages);
    setNewMessage("");
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Left Panel: Adviser Notes + Docs */}
        <div className="col-md-5">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-body">
              <h3 className="fw-bold mb-3">📑 Project Details</h3>
              {group ? (
                <>
                  <p><strong>Group:</strong> {group.name}</p>
                  <p><strong>Topic:</strong> {group.topic}</p>
                  <p><strong>Adviser Notes:</strong> {group.notes || "No feedback yet"}</p>
                  <p><strong>Next Meeting:</strong> {group.meeting || "Not scheduled"}</p>
                  <button className="btn btn-success w-100 mt-3">📤 Upload New Document</button>
                </>
              ) : (
                <p className="text-muted">No group data available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Live Chat */}
        <div className="col-md-7">
          <div className="card shadow-lg border-0 h-100 d-flex flex-column">
            <div className="card-body d-flex flex-column">
              <h3 className="fw-bold mb-3">💬 Team Chat</h3>
              <div
                className="border rounded p-3 mb-3 flex-grow-1 overflow-auto"
                style={{ maxHeight: "350px", backgroundColor: "#f9f9f9" }}
              >
                {messages.length === 0 ? (
                  <p className="text-muted">No messages yet.</p>
                ) : (
                  messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                      <strong>{msg.sender}:</strong> {msg.text}
                      <div className="small text-muted">{msg.timestamp}</div>
                    </div>
                  ))
                )}
              </div>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button className="btn btn-primary" onClick={handleSend}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
