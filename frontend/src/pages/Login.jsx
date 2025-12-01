import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    console.log(email,password)
    setEmail("");
    setPassword('');
  };

  return (
    <div
      style={{
        width: 350,
        margin: "100px auto",
        padding: 25,
        background: "white",
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        fontFamily: "Arial"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Login</h2>

      {isAuthenticated && (
        <p style={{ color: "green", textAlign: "center" }}>✅ Logged In!</p>
      )}

      {error && (
        <p style={{ color: "red", fontSize: 14, textAlign: "center" }}>{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 12,
            borderRadius: 6,
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 20,
            borderRadius: 6,
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 6,
            border: "none",
            background: "#ff4458",
            color: "white",
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
