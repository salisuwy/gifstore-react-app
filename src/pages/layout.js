import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./dashboard";
import Login from "./login";
import Register from "./register";
import NotFound from "./notfound";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import useData from "../hooks/use-data";
import Viewer from "./viewer";

const Layout = () => {
  const { user } = useData();

  return (
    <BrowserRouter>
      <Navbar />
      <div className="mx-auto min-h-[80vh] max-w-7xl px-2 lg:px-8">
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Navigate to="/dashboard" />} />
              <Route path="/register" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/dashboard" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          <Route path="/viewer/:itemId" element={<Viewer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Layout;
