import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/authSlice";
import "./Signup.css";



const Signup = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    bio: "",
    hobby: [String],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        hobbies: formData.hobbies.split(",").map((hobby) => hobby.trim()),
      };
     

      const resultAction = await dispatch(signupUser(payload));
      if (signupUser.fulfilled.match(resultAction)) {
        alert("Signup successful!");

      }
      
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error.message || error}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label><br />

        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label><br />

        <label>
          Password
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label><br />

        <label>
          Age
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </label><br />

        <label>
          Gender
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label><br />

        <label>
          Bio
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            placeholder="Write something about yourself..."
          />
        </label><br />

        <label>
          Hobbies (comma separated)
          <input type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} />
        </label><br />

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
