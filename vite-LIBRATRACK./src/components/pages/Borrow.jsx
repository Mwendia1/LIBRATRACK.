import { useState, useEffect } from "react";

export default function Borrow() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    book_id: "",
    member_id: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/books")
      .then((r) => r.json())
      .then((data) => setBooks(data));

    fetch("http://localhost:8000/members")
      .then((r) => r.json())
      .then((data) => setMembers(data));
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:8000/borrow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then(() => {
      alert("Book borrowed!");
    });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔄 Borrow Book</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          name="book_id"
          value={form.book_id}
          onChange={handleChange}
        >
          <option value="">Select Book</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>

        <select
          name="member_id"
          value={form.member_id}
          onChange={handleChange}
        >
          <option value="">Select Member</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <button>Borrow</button>
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
