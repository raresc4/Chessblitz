import React from "react";
import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [user, setUser] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center" style={{ backgroundColor: "#F5E1A4" }}> 
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-sm w-full p-8 border rounded-lg shadow-lg" style={{ backgroundColor: "#F5E1A4", borderColor: "#9E7B4F" }}>
          <h2 className="text-2xl font-bold text-center text-green-800" >Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-green-800" style={{ color: "#6F4F1A" }}>
                Username
              </label>
              <input
                type="text"
                id="username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full p-2 mt-2 border rounded-md"
                style={{ borderColor: "#9E7B4F", outlineColor: "#D4AF37" }}
                placeholder="Enter username"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-green-800" style={{ color: "#6F4F1A" }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-2 border rounded-md"
                style={{ borderColor: "#9E7B4F", outlineColor: "#D4AF37" }}
                placeholder="Enter password"
              />
            </div>

            <button type="submit" className="w-full p-2 bg-green-800 text-white" >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">Don't have an account? <span className="text-green-800 cursor-pointer" onClick={() => navigate("/register")}>Register</span></div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <ReactSVG
          src={require('../Assets/horse.svg').default}
          className="w-64 h-64"
        />
      </div>
    </div>
  );
}
