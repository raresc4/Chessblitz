import React, { PropsWithChildren } from "react";
import { HeaderProps } from "../Types/HeaderProps.ts";
import { logoutUser } from "../Actions/user.ts";
import { useNavigate } from "react-router-dom";

export default function Header(props: PropsWithChildren<HeaderProps>) {

    const [username, setUsername] = React.useState<string | null>("");

    const navigate = useNavigate();

    React.useEffect(() => {
        setUsername(props.username);
    }, [props.username]);


    return (
        <>
            <header className='flex shadow-lg py-4 px-4 sm:px-10 font-[sans-serif] min-h-[70px] tracking-wide relative z-50'
            style={{ backgroundColor: "#2C874E" }}>
      <div className='flex flex-wrap items-center justify-between gap-4 w-full'>

        <div id="collapseMenu"
          className='max-lg:hidden lg:!block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>
          <button id="toggleClose" className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"></path>
            </svg>
          </button>

          <ul
            className='lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
            <li className='mb-6 hidden max-lg:block'>
              <a href="javascript:void(0)"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36' />
              </a>
            </li>
            <li className='max-lg:border-b max-lg:py-3 px-3'>
              <a
                className='text-[#F5F5F5] block font-semibold text-[15px]'>Home</a>
            </li>
            <li className='max-lg:border-b max-lg:py-3 px-3'><a 
              className='text-[#F5F5F5] block font-semibold text-[15px]'>Team</a>
            </li>
            <li className='max-lg:border-b max-lg:py-3 px-3'><a
              className='text-[#F5F5F5] block font-semibold text-[15px]'>Feature</a>
            </li>
          </ul>

          
        </div>


        {/* Title */}
    <div
      className="text-white text-2xl font-bold 
        lg:absolute lg:left-0 lg:right-0 lg:flex lg:justify-center lg:items-center 
        max-lg:flex max-lg:justify-start"
    >
      <h1>ChessBlitz</h1>
    </div>

        <div className='flex items-center ml-auto space-x-6'>
          <button
            className='px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]' onClick={(e) => {
                e.preventDefault();
                logoutUser().then((data) => {
                    if(data) {
                        setUsername(null);
                        navigate('/login');
                    } else {
                        alert("Error logging out");
                    }
                });
            } }>Log
            out</button>

          <button id="toggleOpen" className='lg:hidden'>
            <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
        </>
    );
}