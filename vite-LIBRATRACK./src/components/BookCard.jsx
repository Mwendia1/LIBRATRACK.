export default function BookCard({ book }) {
  return (
    <div style={styles.card}>
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Status: {book.is_borrowed ? "Borrowed" : "Available"}</p>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
  },
};
