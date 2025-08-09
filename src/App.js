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
    <div style={{ padding: "20px" }}>
      <h2>Student Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
        <br />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <h3>All Feedbacks</h3>
      <ul>
        {feedbacks.map((f, i) => (
          <li key={i}>
            <b>{f.name}</b>: {f.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
