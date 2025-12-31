import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 5)
      newErrors.password = "Password must be at least 5 characters";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      setErrors({ api: err.response?.data?.error || "Login failed" });
    }
  };

  return (
    <div className="container">
      <header>SoftTech Solution</header>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {errors.api && <div className="error">{errors.api}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}

        <input
          type="password"
          name="password"
          placeholder="Password (min 5 chars)"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
