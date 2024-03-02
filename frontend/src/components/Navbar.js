import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";
const Navbar = ({ setToken, token }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="px-2 pt-4 block md:hidden bg-blue-600">
        <div className="flex justify-between border-b-2 pb-2">
          <div className="flex gap-4 text-3xl">Jigyaasu</div>
          {token && (
            <>
              <button
                className="max-w-none flex shadow-sm px-3 py-2 font-semibold text-sm bg-blue-500 text-white rounded shadow-sm"
                onClick={() => {
                  navigate("/additem");
                }}
              >
                Host
                {/* <span className="px-2">
                                    <marquee scrolldelay={30} className="w-20 text-red-500 bg-blue-400 rounded-xl" direction="left">Workshop    Symposium Seminars</marquee>
                                </span> */}
              </button>
            </>
          )}
          <div
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            class="space-y-2"
          >
            <span class="block w-8 h-0.5 bg-gray-600"></span>
            <span class="block w-8 h-0.5 bg-gray-600"></span>
            <span class="block w-5 h-0.5 bg-gray-600"></span>
          </div>
        </div>
        {isOpen && (
          <div className="text-center flex flex-col">
            {token ? (
              <>
                <button
                  className="px-2 py-1 font-semibold text-sm text-gray-500 hover:text-blue-500 text-white rounded shadow-sm"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </button>
                <button
                  className="px-2 py-1 font-semibold text-sm text-gray-500 hover:text-blue-500 text-white rounded shadow-sm"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  Dashboard
                </button>
                <button
                  className="px-2 py-1 font-semibold text-sm text-red-500 hover:text-red-800 text-white rounded shadow-sm"
                  onClick={() => {
                    setToken("");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-2 py-1 font-semibold text-sm text-white rounded shadow-sm"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign In
                </button>
                <button
                  className="px-2 py-1 font-semibold text-sm text-white rounded shadow-sm"
                  onClick={() => {
                    navigate("/aboutus");
                  }}
                >
                  About Us
                </button>

                <button
                  className="px-2 py-1 font-semibold text-sm bg-blue-500 text-white rounded shadow-sm"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </button>
              </>
            )}
          </div>
        )}
        {token && <Searchbar token={token} setToken={setToken} />}
      </nav>

      <nav className="flex justify-end pr-20 px-2 py-4 hidden md:flex bg-blue-00">
        <div className="flex justify-end items-center w-full gap-4">
          {token ? (
            <>
              <div className="flex items-center justify-between w-full">
                <div class=" ml-8 w-10 h-14 bg-[#676ECC] text-indigo-950 rounded-full">
                  <p class="font-serif font-extrabold text-5xl">Amal</p>
                </div>
                <div className="flex gap-5">

                
                <button
                className=" bg-gradient-to-r from-[#565dc5] to-[#7074fd] max-w-none flex shadow-sm px-2 py-1 font-semibold text-xl bg-blue-500 text-white rounded"
                onClick={() => {
                  navigate("/additem");
                }}
              >
                Host an event
              </button>
              <button
                className="px-2 py-1 font-semibold text-base text-slate-900  shadow-sm"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </button>
              <button
                className="px-2 py-1 font-semibold text-base text-slate-900 rounded shadow-sm"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Dashboard
              </button>
              <button
                className="px-2 py-1 font-semibold text-base text-red-500 rounded shadow-sm"
                onClick={() => {
                  setToken("");
                }}
              >
                Logout
              </button>
              </div>
              </div>

             
            </>
          ) : (
            <>
              <button
                className="px-2 py-1 font-semibold text-base text-[#676ecc]  "
                onClick={() => {
                  navigate("/aboutus");
                }}
              >
               Amal
              </button>
              <button
                className="px-2 py-1 font-semibold text-base text-[#676ecc] "
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                className="px-2 py-1 font-semibold text-base bg-[#676ecc] text-white rounded shadow-sm"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>
      {token && (
        <div className="flex justify-around shadow-md px-2 py-2 bg-gray-100 ">
          <a
            className="text-blue-700 hover:text-blue-500 mt-2 font-semibold"
            href="/"
          >
            Home
          </a>
          <a
            className="text-blue-700 hover:text-blue-500 mt-2 font-semibold"
            href="/workshops"
          >
            Workshops
          </a>
          <div className="hidden md:flex">
            <Searchbar token={token} setToken={setToken} />
          </div>
          <a
            className="text-blue-700 hover:text-blue-500 mt-2 font-semibold"
            href="/seminars"
          >
            Seminars
          </a>
          <a
            className="text-blue-700 hover:text-blue-500 mt-2 font-semibold"
            href="/symposium"
          >
            Symposium
          </a>
        </div>
      )}

      {/* <nav class="bg-white  fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
  <div class="max-w-screen-xl flex flex-wrap items-center  justify-end mx-auto p-4">
  
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>
      <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
      </li>
    </ul>
  </div>
  </div>
</nav> */}
    </>
  );
};

export default Navbar;
