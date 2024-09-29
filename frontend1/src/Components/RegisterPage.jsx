import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs'
import axios from "axios";

export default function RegisterPage() {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [salt,setSalt] = useState(Number);
    const [next, setNext] = useState(true);


    const user = process.env.REACT_APP_USERNAME;
    const pass = process.env.REACT_APP_PASSWORD;

    const navigate = useNavigate();
    useEffect(() => {
        setSalt(bcrypt.genSaltSync(10));
        console.log(user + '\n' + pass);
    },[]);
    return (
        <div class="font-[sans-serif] bg-white md:h-screen">
      <div class="grid md:grid-cols-2 items-center gap-8 h-full">
        <div class="max-md:order-1 p-4">
          <img src="https://readymadeui.com/signin-image.webp" class="lg:max-w-[85%] w-full h-full object-contain block mx-auto" alt="login-image" />
        </div>

        <div class="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
          <form class="max-w-lg w-full mx-auto">
            <div class="mb-12">
              <h3 class="text-3xl font-bold text-yellow-400">Create an account</h3>
            </div>

            <div>
              <label class="text-white text-xs block mb-2">Username</label>
              <div class="relative flex items-center">
                <input name="name" type="text" required class="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            <div class="mt-8">
              <label class="text-white text-xs block mb-2">Email</label>
              <div class="relative flex items-center">
                <input name="email" type="text" required class="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div class="mt-8">
              <label class="text-white text-xs block mb-2">Password</label>
              <div class="relative flex items-center">
                <input name="password" type="password" required class="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>

            <div class="mt-12">
              <button type="button" class="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-transparent bg-yellow-400 hover:bg-yellow-500 focus:outline-none" onClick={() => {
                if(username.includes(' ')){
                    alert("Username cannot contain spaces");
                    setNext(false);
                    return;
                }
                if(username.includes('@')){
                    alert("Username cannot contain '@'");
                    setNext(false);
                    return;
                }
                if(username === ''){
                    alert("Username cannot be empty");
                    setNext(false);
                    return;
                }
                if(!email.includes('@') || !email.includes('.')){
                    alert("Email must contain '@' and '.'");
                    setNext(false);
                    return;
                }
                if(password.length < 8 && (!password.includes('@') || !password.includes('.') || !password.includes('!') || !password.includes('#') || !password.includes('$') || !password.includes('%') || !password.includes('^') || !password.includes('&') || !password.includes('*'))){
                    alert("Password must be at least 8 characters long and contain at least one of the following: '@', '.', '!', '#', '$', '%', '^', '&', '*'");
                    setNext(false);
                    return;
                }
                const hashedPassword = bcrypt.hashSync(password,salt);
                if(next) {
                (async () => {
                    try {
                        const { data: response } = await axios.get("http://localhost:8080/crud/getUser/" + username,{},{
                            auth : {
                                "username" : user,
                                "password" : pass
                            }
                        }
                        ); 
                        const { code : responseCode } = response;
                        if(responseCode === 200){
                            alert("Username already exists");
                            setNext(false);
                            return;
                        }
                        if(responseCode === 500) {
                            alert("Internal server error");
                            setNext(false);
                            return;
                        }
                    } catch (error) {
                        console.error(error);
                        setNext(false);
                        alert("An error occurred while registering the user");
                        return;
                    }
                })(); 
            }
            if(next) {
                (async () => {
                    try {
                        const { data : response2 } = await axios.get("http://localhost:8080/crud/getUser/" + email,{},{
                            auth : {
                                "username" : user,
                                "password" : pass
                            }
                        }
                        );
                        const { code : responseCode2 } = response2;
                        if(responseCode2 === 200){
                            alert("Email already exists");
                            setNext(false);
                            return;
                        }
                        if(responseCode2 === 500) {
                            alert("Internal server error1");
                            setNext(false);
                            return;
                        }
                    } catch (error) {
                        console.error(error);
                        setNext(false);
                        alert("An error occurred while registering the user2");
                        return;
                    }
                })();
            }
            if(next) {
                (async () => {
                    try {
                   const { data : response3 } = await axios.post("http://localhost:8080/crud/insertUser",{
                    "id" : "",
                    "email" : email,
                    "username" : username,
                    "password" : hashedPassword
                   },{
                    auth : {
                    "username" : user,
                    "password" : pass
                }}
            )
            const { code : responseCode3 } = response3;
            if(responseCode3 === 200){
                alert("User registered successfully");
                navigate("/login");
                return;
            }
            if(responseCode3 === 500) {
                alert("Internal server error2");
                const { message :  resp } = response3;
                alert(resp);
                return;
            }
            if(responseCode3 == 404) {
                alert("User could not be registered");
                return;
            }
        } catch (error) {
                    console.error(error);
                    alert("An error occurred while registering the user3");
                    return;
            }
                }
            )();
        }
              }}>
                Register
              </button>
              <p class="text-sm text-white mt-8">Already have an account? <a href="/login" class="text-yellow-400 font-semibold hover:underline ml-1">Login here</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
}