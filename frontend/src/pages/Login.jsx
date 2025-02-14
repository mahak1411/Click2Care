import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", age: "", gender: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const url = isLogin ? "https://click2care.onrender.com/api/auth/login" : "https://click2care.onrender.com/api/auth/register";
    const requestBody = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      console.log(data.token)
      // Store token and user data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("patientId", JSON.stringify(data.user.id))

      navigate("/symptom");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 mt-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-green-600 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter your age"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">Gender</label>
                <select
                  name="gender"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded transition-all">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
