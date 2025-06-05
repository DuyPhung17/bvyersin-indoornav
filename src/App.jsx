import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import GuidePage from "./pages/GuidePage";
import "./App.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GITHUB_PAGES_REPO_NAME = "bvyersin-indoornav";
const basename = import.meta.env.DEV ? "/" : `/${GITHUB_PAGES_REPO_NAME}/`;

function App() {
  return (
    <Router basename={basename}>
      <div className="app-container">
        <Routes>
          {/* URL sẽ có dạng /?start=qr1 */}
          <Route path="/" element={<GuidePage />} />
          {/* Redirect các path không hợp lệ về trang chủ */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
