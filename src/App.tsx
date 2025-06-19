import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css'
import BaseLayout from "./layouts/BaseLayout";
import OverviewPage from "./pages/OverviewPage";

function App() {

  return (
    <>
  <Router>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<OverviewPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
