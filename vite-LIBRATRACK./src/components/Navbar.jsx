import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>📚 LibraTrack</h2>

      <div style={styles.links}>
        <Link to="/">Books</Link>
        <Link to="/add">Add Book</Link>
        <Link to="/members">Members</Link>
        <Link to="/borrow">Borrow</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 25px",
    background: "#222",
    color: "white",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
};
