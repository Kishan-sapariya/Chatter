import React, { useState } from "react";
import { Eye, EyeOff, Loader2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length > 6)
      return toast.error("Password must of atleast 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    const success = validateForm();

    if (success === true) login(formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center rounded-md p-6 sm:p-0">
      <div className="min-w-full sm:w-[70%] sm:p-36">
        <div className="flex flex-col gap-3 mb-4 sm:mb-10 justify-center items-center">
          <div
            className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
          >
            <MessageSquare className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-center text-purple-200">
              Welcome Back
            </h1>
            <h1 className="text-xs sm:text-xl text-center font-semibold">
              Login into your account
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <label className="input input-bordered min-w-[90%] sm:min-w-[60%] flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow w-full"
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>
          <label className="input input-bordered min-w-[90%] sm:min-w-[60%] flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="grow w-full"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {showPassword ? (
              <Eye onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <EyeOff onClick={() => setShowPassword(!showPassword)} />
            )}
          </label>
          <button
            type="submit"
            className="btn sm:w-[60%] w-[90%]"
            onClick={handleSubmit}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              "Login"
            )}
          </button>
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-[15px] sm:text-xl">Don't have an account?</h1>
          <span>
            <Link
              to="/signup"
              className="btn btn-link p-[2px] text-[15px] sm:text-xl"
            >
              Create account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
