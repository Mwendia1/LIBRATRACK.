import { useState } from "react";

export default function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:8000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Book added!");
      });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>➕ Add New Book</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="title"
          placeholder="Book Title"
          onChange={handleChange}
        />

        <input
          name="author"
          placeholder="Author"
          onChange={handleChange}
        />

        <button>Add</button>
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
