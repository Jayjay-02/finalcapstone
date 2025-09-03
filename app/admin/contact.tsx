// app/admin/contact.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

export default function AdminContact() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    alert(`Message sent to Jay Satoré:\n\n${message}`);
    setMessage('');
  };

  return (
    <div className="container py-5" style={{ minHeight: '100vh', background: '#f8f8f8' }}>
      <h2 className="fw-bold mb-4 text-center">Contact Jay Satoré</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-0 p-4">
            <h5 className="fw-semibold mb-3">Get in Touch</h5>
            <p>Email: <a href="mailto:jaysatore@example.com">jaysatore@example.com</a></p>
            <p>Phone: <a href="tel:+639123456789">+63 912 345 6789</a></p>

            <hr />

            <h6 className="fw-semibold mb-2">Send a Message</h6>
            <textarea
              className="form-control mb-3 rounded-0"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
            <button 
              className="btn btn-dark w-100 rounded-0 fw-semibold"
              onClick={handleSend}
              disabled={!message.trim()}
            >
              Send Message
            </button>

            <button 
              className="btn btn-link mt-3 p-0"
              onClick={() => router.back()}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
