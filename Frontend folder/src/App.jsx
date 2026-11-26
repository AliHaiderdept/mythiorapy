import Hero from "./pages/Hero";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analytics";
import Information from "./pages/Information";
import Quiz from "./components/Quiz";
import Login from "./components/Login";
import Register from "./components/Register";
import Navigations from "./components/Navigations";
import History from "./pages/History";
import { AuthProvider } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";
import Assesments from "./pages/Assesments";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { useLocation } from "react-router-dom";
import "./pages/MentalHealth.css";
import "./pages/PageTheme.css";
import "./pages/GlobalTheme.css";


const routes = {
  "/": <Hero/>,
  "/dashboard": <Dashboard />,
  "/information": <Information />,
  "/analysis": <Analysis />,
  "/analytics": <Analysis />,
  "/navigations": <Navigations />,
  "/history": <History />,
  "/assessments": <Assesments />,
  "/assesments": <Assesments />,
  "/reports": <Reports />,
  "/settings": <Settings />,
  "/quiz": <Quiz />,
  "/login": <Login />,
  "/register": <Register />,

};

function App() {
  const { pathname } = useLocation();
  const currentPage = routes[pathname] || <Hero />;

  return (
    <AuthProvider>
      <div className="relative min-h-full isolate">
        <div className="relative z-10 min-h-screen">
          <Navigations />
          {currentPage}
        </div>
        <AuthModal />
      </div>
    </AuthProvider>
  );
}

export default App;
