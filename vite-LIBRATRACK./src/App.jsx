import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import Members from "./pages/Members";
import Borrow from "./pages/Borrow";
import register from "./pages/register";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/members" element={<Members />} />
        <Route path="/borrow" element={<Borrow />} />
      </Routes>
    </BrowserRouter>
  );
}
