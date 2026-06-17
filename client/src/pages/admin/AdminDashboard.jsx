import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <div className="dashboard-cards">
        <Link to="/admin/users" className="dashboard-card">
          Manage Users
        </Link>

        <Link to="/admin/posts" className="dashboard-card">
          Manage Posts
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
