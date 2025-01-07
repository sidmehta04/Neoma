import React, { useState } from "react";
import { supabase } from "../../lib/superbase";
import { useNavigate } from "react-router-dom";

const AuthPages = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const checkEmailExists = async (email) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", email)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      return !!data;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Check if email exists
      const emailExists = await checkEmailExists(email);

      if (!emailExists) {
        setMessage("Email not found. Please sign up first.");
        setIsLogin(false); // Switch to signup form
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: window.location.origin + "/home",
        },
      });

      if (error) throw error;
      setMessage("Check your email for the magic link!");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(email);

      if (emailExists) {
        setMessage("This email is already registered. Please login instead.");
        setIsLogin(true);
        setLoading(false);
        return;
      }

      // Store user details in localStorage for later use
      localStorage.setItem(
        "pendingUserDetails",
        JSON.stringify({
          email,
          first_name: firstName,
          last_name: lastName,
          phone,
        })
      );

      // Send magic link
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/complete-signup`,
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
          },
        },
      });

      if (authError) throw authError;
      setMessage("Check your email for the magic link!");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSwitch = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setEmail("");
    if (!isLogin) {
      setFirstName("");
      setLastName("");
      setPhone("");
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Logo and illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Neoma Capital</h1>
          <p className="text-white text-xl">
            Invest in your future with confidence
          </p>
        </div>
        <div className="text-white text-sm">
          © {new Date().getFullYear()} Neoma Capital. All rights reserved.
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo for mobile view */}
          <div className="lg:hidden text-center">
            <h1 className="text-3xl font-bold text-blue-600">Neoma Capital</h1>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? "Sign in to access your account"
                : "Get started with Neoma Capital"}
            </p>
          </div>

          <form
            onSubmit={isLogin ? handleLogin : handleSignUp}
            className="space-y-6"
          >
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {message && (
              <div
                className={`text-sm text-center ${
                  message.includes("error") ||
                  message.includes("not found") ||
                  message.includes("already registered")
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {loading
                ? "Loading..."
                : isLogin
                ? "Send Magic Link"
                : "Create Account"}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={handleFormSwitch}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
