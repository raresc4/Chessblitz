import React from "react";
import axios from "axios";
import { useState } from "react";
import { verifyUsername } from "../Functions/VerifyUsername";

export default function LoginPage() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [next, setNext] = useState(true);

    return (
        <>
        <div class="font-[sans-serif] bg-white md:h-screen">
      <div class="grid md:grid-cols-2 items-center gap-8 h-full">
        <div class="max-md:order-1 p-4">
          <img src="https://readymadeui.com/signin-image.webp" class="lg:max-w-[85%] w-full h-full object-contain block mx-auto" alt="login-image" />
        </div>

        <div class="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
          <form class="max-w-lg w-full mx-auto">
            <div class="mb-12">
              <h3 class="text-3xl font-bold text-yellow-400">Login into your account</h3>
            </div>

            <div>
              <label class="text-white text-xs block mb-2">Enter username or email</label>
              <div class="relative flex items-center">
                <input name="name" type="text" required class="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none" placeholder="Enter username or email" 
                onChange={(e) => setUser(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            <div class="mt-8">
              <label class="text-white text-xs block mb-2">Password</label>
              <div class="relative flex items-center">
                <input name="password" type="password" required class="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none" placeholder="Enter password" 
                onChange={(e) => setPassword(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>

            <div class="mt-12">
              <button type="button" class="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-transparent bg-yellow-400 hover:bg-yellow-500 focus:outline-none" onClick={() => {
                (async () => {
                    try {
                        const { data : response } = axios.get("http://localhost:8080/crud/getUser/" + user,{},{
                          auth: {
                              username : process.env.REACT_APP_USERNAME,
                              password : process.env.REACT_APP_PASSWORD
                          }
                        });
                        const { code : responseCode } = response;
                        if(responseCode === 404) {
                            setNext(false);
                            alert("User not found");
                            return;
                        }
                        if(responseCode === 500) {
                            setNext(false);
                            alert("Server error0");
                            return;
                        }
                    } catch (error) {
                        console.log(error);
                        setNext(false);
                        alert("Server error1");
                        return;
                    }
                })();
                if(next) {
                (async () => {
                    try {
                        const { data : response } = await axios.post("http://localhost:8080/crud/verifyUser",
                            verifyUsername(user) ? {
                                id : "",
                                email: "",
                                username: user,
                                password: password
                            } : {
                                id : "",
                                email: user,
                                username: "",
                                password: password
                            },
                            {
                                auth: {
                                    username : process.env.REACT_APP_USERNAME,
                                    password : process.env.REACT_APP_PASSWORD
                                }
                            }
                        );
                        const { code : responseCode } = response;
                        if(responseCode === 404) {
                            setNext(false);
                            alert("Incorrect password");
                            return;
                        }
                        if(responseCode === 500) {
                            setNext(false);
                            alert("Server error2");
                            return;
                        }
                        alert("Login successful");
                    } catch (error) {
                        console.log(error);
                        setNext(false);
                        alert("Server error3");
                        return;
                    }
                })();
            }
              }}>
                Login
              </button>
              <p class="text-sm text-white mt-8">Don't have an account? <a href="/register" class="text-yellow-400 font-semibold hover:underline ml-1">Register here</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
        </>
    );
}