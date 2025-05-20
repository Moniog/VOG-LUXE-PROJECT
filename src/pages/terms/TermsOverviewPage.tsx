import { Link } from "react-router-dom";

const TermsOverviewPage = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms & Policies</h1>
      <ul className="space-y-4 text-lg">
        <li><Link to="/terms/shipping">Shipping Policy</Link></li>
        <li><Link to="/terms/returns">Return Policy</Link></li>
        <li><Link to="/terms/privacy">Privacy Policy</Link></li>
        <li><Link to="/terms/acceptance">Terms of Acceptance</Link></li>
        <li><Link to="/terms/user-content">User-Generated Content</Link></li>
        <li><Link to="/terms/termination">Termination</Link></li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default TermsOverviewPage;