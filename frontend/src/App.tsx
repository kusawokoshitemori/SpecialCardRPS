import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import PageA from "./components/PageA.tsx";

export default function App() {
  return (
    <div>
      <p>test</p>
      <Router>
        <nav>
          {/* Linkコンポーネントを使用してページ遷移 */}
          <Link to="/pageA">Go to Page A</Link>
        </nav>

        <Routes>
          <Route path="/pageA" element={<PageA key="pageA" />} />
        </Routes>
      </Router>
    </div>
  );
}
