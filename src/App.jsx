import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
      <nav className="app__nav">
        <Link to="/">Home</Link>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          External
        </a>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
