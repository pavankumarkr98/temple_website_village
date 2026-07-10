import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

import TempleWebsite from "./Pavan/LandingPage";




export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Protected Routes */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/LandingPage" replace />} />
        
        {/* Home page - shows list of topics */}
        <Route path="/LandingPage" element={<TempleWebsite />} />
        </Route>
        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
