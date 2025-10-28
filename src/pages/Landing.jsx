import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="container">
      <h1>Welcome to Student Feedback App</h1>
      <p>
        This app helps students share their thoughts on courses at Limkokwing University.
        Your feedback improves teaching and learning.
      </p>
      <p>
        <strong>How to use:</strong> Click below to submit or view feedback. No login required!
      </p>
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <Link to="/dashboard">
          <button style={{ fontSize: '1.2em', padding: '15px 30px' }}>
            Go to Feedback Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}