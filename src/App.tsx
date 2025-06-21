import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './context/userContext';
import BaseLayout from "./layouts/BaseLayout";
import OverviewPage from "./pages/OverviewPage";
import TourDetailPage from "./pages/TourDetailPage";
import LoginPage from "./pages/LoginPage";
import UserAccountPage from "./pages/UserAccountPage";

function App() {

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="tour/:slugAndId" element={<TourDetailPage />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/me" element={<UserAccountPage/>} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
