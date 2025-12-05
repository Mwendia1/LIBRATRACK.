import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const fetchBooks = async () => {
    const res = await axios.get("http://127.0.0.1:8000/books/");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8000/books/", { title, author });
    setTitle("");
    setAuthor("");
    fetchBooks();
  };

  const handleDeleteBook = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/books/${id}`);
    fetchBooks();
  };

  return (
    <div>
      <form onSubmit={handleAddBook} style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}{" "}
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
