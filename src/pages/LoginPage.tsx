import React, { useState, type FormEvent } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Linkedin,
  Facebook,
  Twitter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen font-jost bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4 dark:text-slate-50">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between text-white bg-blue-600 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
            alt="Team Collaboration"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/800x900/4338CA/FFFFFF?text=KerjaMail";
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">KerjaMail</span>
            </div>
          </div>
          <div className="relative z-10 mt-12">
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Streamline Your Workflow,
              <br />
              One Email at a Time.
            </h1>
            <p className="text-lg opacity-80">
              The all-in-one platform for your domain and email management
              needs.
            </p>
          </div>
          <div className="relative z-10 mt-12 text-sm opacity-70">
            Copyright © {new Date().getFullYear()} KerjaMail. All rights
            reserved.
          </div>
        </div>

        <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Sign In
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    defaultValue="john.doe@kerjamail.co"
                    className="w-full pl-10 pr-4 py-3 border-b-2 border-slate-200 dark:border-slate-600 bg-transparent focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    defaultValue="password123"
                    className="w-full pl-10 pr-10 py-3 border-b-2 border-slate-200 dark:border-slate-600 bg-transparent focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Sign In
              </button>
            </form>
            <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
              <p>
                Don't have an account?{" "}
                <a
                  href="#"
                  className="font-semibold text-blue-600 hover:text-blue-800"
                >
                  Sign Up
                </a>
              </p>
            </div>
            <div className="mt-12 flex justify-center items-center gap-6">
              <a
                href="#"
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
