import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css'
import BaseLayout from "./layouts/BaseLayout";
import HomePage from "./pages/HomePage";

function App() {

  return (
    <>
  <Router>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
