import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out:", localStorage.getItem("token"));
    localStorage.removeItem("token");
    navigate("/login");
    console.log("Redirected to login page");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 20px",
        backgroundColor: "#1d4ed8",
        color: "#ffffff",
        height: "48px"
      }}
    >
      {/* Company Name */}
      <h1
        style={{
          margin: 0,
          fontSize: "16px",
          fontWeight: "600",
          letterSpacing: "0.5px"
        }}
      >
        SoftTech Solution
      </h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          padding: "4px 10px",
          fontSize: "12px",
          border: "none",
          borderRadius: "4px",
          backgroundColor: "#ef4444",
          color: "#ffffff",
          cursor: "pointer",
          fontWeight: "500"
        }}
      >
        Logout
      </button>
    </header>
  );
}
