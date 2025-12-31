import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header.jsx";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
