import FeedbackForm from '../components/FeedbackForm.jsx';     // ← .jsx
import FeedbackList from '../components/FeedbackList.jsx';     // ← .jsx
import Footer from '../components/Footer.jsx';                 // ← .jsx

export default function Dashboard() {
  const refresh = () => window.location.reload();

  return (
    <div className="container">
      <h1>Feedback Dashboard</h1>
      <FeedbackForm onSuccess={refresh} />
      <FeedbackList />
      <Footer />
    </div>
  );
}