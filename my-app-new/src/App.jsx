import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer_Pages from "./Components/Customer_Master/Customer_Pages";
import Item_Pages from "./Components/Item_Master/Item_Pages";
import { ToastContainer } from "react-toastify";
import SignupForm from "./Pages/SignupForm";
import LoginForm from "./Pages/LoginForm";
import OtpLogin from "./Pages/OtpLogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<OtpLogin />} />
          <Route path="/" element={<Customer_Pages />} />
          <Route path="/customer_master" element={<Customer_Pages />} />
          <Route path="/item_master" element={<Item_Pages />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
export default App;
