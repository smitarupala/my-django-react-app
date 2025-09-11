import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();

        localStorage.setItem("access ", data.access);
        localStorage.setItem("refresh", data.refresh);

        toast.success(data.message || "login successfully !");
        setFormData({ username: "", password: "" });
        navigate("/Customer_Master");
      } else {
        const errData = await res.json();
        toast.error(errData.detail[0] || "invalid crede....");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-52 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <p className="text-xl font-semiboldbold mb-2 text-center">
          sign into start your session
        </p>
        <form className="text-gray-600" onSubmit={handleSubmit}>
          <div className="  border  mb-2">
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="User Name"
              onChange={handleChange}
            />
          </div>

          <div className="  border  mb-2">
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <div className="w-auto">
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
