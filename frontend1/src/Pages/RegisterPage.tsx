import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { registerUser } from "../Actions/user.ts";
import { User } from "../Types/User.ts";

export default function RegisterPage() {
  const [user, setUser] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const navigate = useNavigate();
  
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: "#50C878" }}> 
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-sm w-full p-8 border rounded-lg shadow-lg" style={{ backgroundColor: "#2C874E", borderColor: "#68A357" }}>
            <h2 className="text-2xl font-bold text-center" style={{color : "#F5F5F5"} } >Register</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium" style={{ color: "#F5F5F5" }}>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="w-full p-2 mt-2 border rounded-md placeholder-gray-100"
                  style={{ borderColor: "#9E7B4F", outlineColor: "#D4AF37", backgroundColor: "#50C878", color : "#F5F5F5" }}
                  placeholder="Enter username"
                />
              </div>
  
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium" style={{ color: "#F5F5F5" }}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 mt-2 border rounded-md placeholder-gray-100"
                  style={{ borderColor: "#9E7B4F", outlineColor: "#D4AF37", backgroundColor: "#50C878", color : "#F5F5F5" }}
                  placeholder="Enter password"
                />
              </div>
  
              <button type="submit" className="w-full p-2 text-white" style={{ backgroundColor : "#50C878", color : "#FEFEFE" } }  onClick={async (e) => {
                e.preventDefault(); 
                if (user === "" || password === "") {
                  alert("Username or password cannot be empty");
                  return;
                }
                try {
                    registerUser(user, password).then((data) => {
                    if (data === true) {
                      navigate("/login");
                    } else {
                        alert("User registration failed : user already exists");
                    }});
                      } catch (error) {
                        alert("An error occurred: " + error.message);
                      } 
                      }}>
                Register
              </button>
            </form>
            <div className="mt-4 text-center" style={{color : "#F5F5F5"}}>Already have an account? <span className="cursor-pointer" style={{color : "#F5F5F5"}} onClick={() => navigate("/login")}>Login</span></div>
          </div>
        </div>
  
        <div className="flex-1 flex items-center justify-center hidden lg:flex">
          <ReactSVG
            src={require('../Assets/black-bishop.svg').default}
            className="w-64 h-64"
          />
        </div>
        
      </div>
    );
}
