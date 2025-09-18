import { useState } from "react";

const OtpLogin = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      console.log(step);
      const res = await fetch("http://127.0.0.1:8000/SendOTP/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("your otp:" + data.otp);
        setStep(2);
      }
    } else {
      console.log("username:", username, otp);
      const res = await fetch("http://127.0.0.1:8000/VerifyOTP/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, otp }),
      });
      const data = await res.json();
      console.log("Raw response:", data);

      if (res.ok) {
        alert("otp is successful ");
        setStep(1);
      } else {
        alert(data.otp || "OTP Expired or invalid");
        setOtp("");
        setStep(1);
      }
    }
  };
  return (
    <div className="max-w-sm mx-auto mt-52 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <p className="text-xl font-semiboldbold mb-2 text-center">
          OTP LOGIN FORM
        </p>

        <form className="text-gray-600" onSubmit={handleSubmit}>
          {step === 1 ? (
            <>
              <div className="  border  mb-2">
                <input
                  type="text"
                  name="username"
                  value={username}
                  placeholder="User Name"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="w-auto">
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  type="submit"
                >
                  send otp
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="  border  mb-2">
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  placeholder="enter otp "
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <div className="w-auto">
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  type="submit"
                >
                  verify otp
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default OtpLogin;
