import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser, deleteUser } from "../features/profileSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    dispatch(fetchUser());
     
  }, [dispatch]);
 

  useEffect(() => {
    if (user)
      setFormData({
       
        name: user.name,
        email: user.email,
        bio: user.bio || "",
        age: user.age || "",
        gender: user.gender || "",
      });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateUser({ id: user._id, updatedData: formData }));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      dispatch(deleteUser(user._id));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user found</p>;

 
  



  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Profile</h1>

      <div style={styles.formGroup}>
        <label htmlFor="name" style={styles.label}>
          Name:
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          placeholder="Your full name"
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="email" style={styles.label}>
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          placeholder="Your email address"
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="age" style={styles.label}>
          Age:
        </label>
        <input
          id="age"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          style={styles.input}
          placeholder="Your age"
          min={0}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="gender" style={styles.label}>
          Gender:
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          style={styles.select}
          required
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="bio" style={styles.label}>
          Bio:
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Write something about yourself..."
          rows="4"
        />
      </div>

      <div style={styles.buttonContainer}>
        <button
          onClick={handleUpdate}
          style={styles.updateButton}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = styles.updateButtonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = styles.updateButton.backgroundColor)
          }
        >
          Update Profile
        </button>
        <button
          onClick={handleDelete}
          style={styles.deleteButton}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = styles.deleteButtonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = styles.deleteButton.backgroundColor)
          }
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
};

const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      textAlign: "center",
      color: "#333",
      marginBottom: "25px",
      fontWeight: "700",
      fontSize: "2rem",
    },
    formGroup: {
      marginBottom: "15px",
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "6px",
      fontWeight: "600",
      color: "#555",
      fontSize: "1rem",
    },
    input: {
      padding: "10px 15px",
      fontSize: "1rem",
      borderRadius: "6px",
      border: "1.5px solid #ccc",
      outline: "none",
      transition: "border-color 0.3s",
    },
    inputFocus: {
      borderColor: "#ff4d6d",
      boxShadow: "0 0 8px rgba(255, 77, 109, 0.3)",
    },
    textarea: {
      minHeight: "70px",
      padding: "10px 15px",
      fontSize: "1rem",
      borderRadius: "6px",
      border: "1.5px solid #ccc",
      resize: "vertical",
      outline: "none",
      transition: "border-color 0.3s",
    },
    select: {
      padding: "10px 15px",
      fontSize: "1rem",
      borderRadius: "6px",
      border: "1.5px solid #ccc",
      outline: "none",
      transition: "border-color 0.3s",
      backgroundColor: "#fff",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "30px",
      gap: "15px",
    },
    updateButton: {
      padding: "12px 30px",
      backgroundColor: "#ff4d6d",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "1rem",
      transition: "background-color 0.3s",
    },
    updateButtonHover: {
      backgroundColor: "#e94360",
    },
    deleteButton: {
      padding: "12px 30px",
      backgroundColor: "#ff6b6b",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "1rem",
      transition: "background-color 0.3s",
    },
    deleteButtonHover: {
      backgroundColor: "#d94848",
    },
  };


export default ProfilePage;
