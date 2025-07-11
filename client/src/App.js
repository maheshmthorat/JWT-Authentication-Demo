import { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);

  // Handle login and store JWT token
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", { username, password });
      localStorage.setItem("token", res.data.token); // Store token
      setMessage("Login Successful! JWT Stored.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login Failed");
    }
  };

  // Fetch user profile using JWT
  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No token found. Please login first.");
        return;
      }

      const res = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: token },
      });

      setProfile(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch profile");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>

      <h2>Profile</h2>
      <button onClick={getProfile}>Get Profile</button>
      {profile && (
        <div>
          <p>User ID: {profile.userId}</p>
          <p>Username: {profile.username}</p>
          <p>{profile.message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
