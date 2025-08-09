import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "https://fastapi-react-sqllite-student-feedback.onrender.com";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/feedback`);
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/feedback`, {
        name,
        email,
        message,
      });
      setName("");
      setEmail("");
      setMessage("");
      fetchFeedbacks();
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.heading}>Student Feedback Form</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <textarea
            style={{ ...styles.input, height: "100px", resize: "none" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            required
          />
          <button style={styles.button} type="submit">
            Submit Feedback
          </button>
        </form>
      </div>

      <div style={styles.feedbackCard}>
        <h3 style={styles.heading}>All Feedbacks</h3>
        {feedbacks.length === 0 ? (
          <p style={{ color: "#ccc" }}>No feedback yet. Be the first!</p>
        ) : (
          <ul style={styles.feedbackList}>
            {feedbacks.map((f, i) => (
              <li key={i} style={styles.feedbackItem}>
                <b style={{ color: "#fff" }}>{f.name}</b>
                <p style={{ margin: "5px 0", color: "#ddd" }}>{f.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
    background: "linear-gradient(to bottom, #0d1b2a, #1b263b)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  formCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
    width: "100%",
    maxWidth: "400px",
    backdropFilter: "blur(5px)",
  },
  feedbackCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
    width: "100%",
    maxWidth: "600px",
    backdropFilter: "blur(5px)",
  },
  heading: {
    marginBottom: "15px",
    color: "#ffffff",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "5px",
    fontSize: "14px",
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    outline: "none",
  },
  button: {
    padding: "10px",
    backgroundColor: "#1f6feb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  feedbackList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  feedbackItem: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
};

export default App;
