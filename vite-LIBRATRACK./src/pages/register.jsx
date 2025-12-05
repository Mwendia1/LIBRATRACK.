import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to register");
        return res.json();
      })
      .then((data) => {
        alert(`User ${data.username} registered successfully!`);
        setForm({ username: "", password: "" });
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "250px" }}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
