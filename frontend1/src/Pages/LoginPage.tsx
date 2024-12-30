import React from "react";
import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Actions/user.ts";

export default function LoginPage() {
  const [user, setUser] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center" style={{ backgroundColor: "#50C878" }}> 
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-sm w-full p-8 border rounded-lg shadow-lg" style={{ backgroundColor: "#2C874E", borderColor: "#68A357" }}>
          <h2 className="text-2xl font-bold text-center" style={{color : "#F5F5F5"}}>Login</h2>
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
                style={{ borderColor: "#50C878", outlineColor: "#50C878", backgroundColor: "#50C878",
                  color : "#F5F5F5"
                 }}
                placeholder="Enter password"
              />
            </div>

            <button type="submit" className="w-full p-2" style={{ backgroundColor : "#50C878", color : "#FEFEFE" }} onClick={async (e) => {
              e.preventDefault();
              if (user === "" || password === "") {
                alert("Username or password cannot be empty");
                return;
              }

              try {
                loginUser(user, password).then((data) => {
                  switch (data) {
                    case "Error":
                      alert("Internal server error");
                      break;
                    case "200":
                      navigate("/profile");
                      break;
                    case "400" : 
                      alert("Invalid username or password");
                      break;
                    case "404" : 
                      alert("User not found");
                      break;
                    default:
                      alert("Unknown error");
                      break;
                  } 
                });
              } catch (error) {
                alert("An error occurred: " + error.message);
              }
            }}>
              Login
            </button>
          </form>

          <div className="mt-4 text-center" style={{color : "#F5F5F5"}}>Don't have an account? <span className="cursor-pointer" style={{color : "#F5F5F5"}} onClick={() => navigate("/register")}>Register</span></div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center hidden lg:flex">
        <ReactSVG
          src={require('../Assets/horse.svg').default}
          className="w-64 h-64"
        />
      </div>
    </div>
  );
}
