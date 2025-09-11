import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    branchname: "",
    username: "",
    password: "",
  });
  const [msg, setMsg] = useState();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("xc", data.message);

        setMsg(data.message);
        setFormData({ branchname: "", username: "", password: "" }); // reset form
      } else {
        const errorData = await response.json();

        setMsg(errorData.detail || errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMsg(error.message || "Something went wrong!");
    }
  };
  return (
    <div className="max-w-sm mx-auto mt-52 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <p className="text-xl font-semiboldbold mb-2 text-center">
          sign into start your session
        </p>
        <form className="text-gray-600" onSubmit={handleSubmit}>
          <div className="  border mb-2">
            <input
              type="text"
              name="branchname"
              value={formData.branchname}
              placeholder="Branch Name"
              onChange={handleChange}
            />
          </div>

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
              Signup
            </button>
          </div>
        </form>

        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
};
export default SignupForm;
