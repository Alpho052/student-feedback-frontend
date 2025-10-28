import { useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function FeedbackForm({ onSuccess }) {
  const [form, setForm] = useState({
    studentName: '',
    courseCode: '',
    comments: '',
    rating: 3
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'rating' ? parseInt(value) : value });
  };

  const validate = () => {
    const err = {};
    if (!form.studentName) err.studentName = 'Name is required';
    if (!form.courseCode) err.courseCode = 'Course code is required';
    if (form.rating < 1 || form.rating > 5) err.rating = 'Rating must be 1–5';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    try {
          await axios.post(`${API_URL}/api/feedback`, form);
      onSuccess();
      setForm({ studentName: '', courseCode: '', comments: '', rating: 3 });
      setErrors({});
    } catch (err) {
      alert('Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>
      <input name="studentName" placeholder="Student Name" value={form.studentName} onChange={handleChange} />
      {errors.studentName && <p className="error">{errors.studentName}</p>}

      <input name="courseCode" placeholder="Course Code" value={form.courseCode} onChange={handleChange} />
      {errors.courseCode && <p className="error">{errors.courseCode}</p>}

      <textarea name="comments" placeholder="Comments" value={form.comments} onChange={handleChange} rows="3" />

      <div style={{ margin: '10px 0' }}>
        <label>Rating: {form.rating} ★</label>
        <input type="range" name="rating" min="1" max="5" value={form.rating} onChange={handleChange} style={{ width: '100%' }} />
      </div>
      {errors.rating && <p className="error">{errors.rating}</p>}

      <button type="submit">Submit Feedback</button>
    </form>
  );
}