import { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  const loadFeedback = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/feedback`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this feedback?')) return;
    try {
      await axios.delete(`${API_URL}/api/feedback/${id}`);
      loadFeedback();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div>
      <h2>All Feedback</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        feedbacks.map(f => (
          <div key={f.id} className="feedback-item">
            <strong>{f.studentName}</strong> — {f.courseCode}
            <p>Rating: {'★'.repeat(f.rating)} ({f.rating}/5)</p>
            <p><em>{f.comments || 'No comments'}</em></p>
            <button className="delete" onClick={() => handleDelete(f.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}