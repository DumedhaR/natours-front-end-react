import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css'
import BaseLayout from "./layouts/BaseLayout";
import OverviewPage from "./pages/OverviewPage";
import TourDetailPage from "./pages/TourDetailPage";

function App() {

  return (
    <>
  <Router>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="tour/:slugAndId" element={<TourDetailPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
