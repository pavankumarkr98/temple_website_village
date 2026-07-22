import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

import {TempleWebsite} from "./Pavan/LandingPage";




export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Protected Routes */}
        <Route element={<AppLayout />}>        
        {/* Home page - shows list of topics */}
        <Route path="/" element={<TempleWebsite />} />
        </Route>
        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
