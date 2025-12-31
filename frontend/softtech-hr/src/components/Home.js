import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Top Bar */}
      <div className="home-header">
        <span className="company-name">SoftTech Solution</span>

        <div className="right-section">
          <span className="clock">
            {time.toLocaleTimeString()}
          </span>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="container">
        <h2>HR Dashboard</h2>

        <div className="btn-group">
          <button onClick={() => navigate("/jobs")}>
            View All Jobs
          </button>

          <button onClick={() => navigate("/post-job")}>
            Post New Job
          </button>
        </div>
      </div>
    </>
  );
}
