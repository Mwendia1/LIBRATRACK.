import { useState } from "react";

export default function AddBook({ onBookAdded }) {
  const [form, setForm] = useState({ title: "", author: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add book");
        return res.json();
      })
      .then((data) => {
        alert(`Book "${data.title}" added!`);
        setForm({ title: "", author: "" });
        if (onBookAdded) onBookAdded(data); // optional callback to refresh book list
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding book. Check console.");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>➕ Add New Book</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "250px",
  },
};
