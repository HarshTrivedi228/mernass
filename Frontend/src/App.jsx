import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Help from "./components/Help";
import ContactUs from "./components/Contact_Us";
import Transactions from "./components/Transactions";
import Schedules from "./components/Schedules";
import Users from "./components/Users";
import Settings from "./components/Settings";
import Sign_in from "./components/Sign_in";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Nested routes */}
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="schedules" element={<Schedules />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="sign-in" element={<Sign_in />} />

        <Route path="/register" element={<RegisterPage />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
