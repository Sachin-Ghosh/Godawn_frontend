// components/Navbar.tsx
import React from "react";
import Link from "next/link";
// import { useAuth } from "@/context/AuthContext";
// import { PiUser } from "react-icons/pi";

const Navbar = () => {
  //   const { token, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 z-50 fixed top-0 left-0 w-full">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">Godawn</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/login">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signUp">
                Sign Up
              </Link>
            </li>
            <li>
            <Link href="/dashboard">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/invoice">
                Invoice
              </Link>
            </li>
            <li>
              <Link href="/inventory">
                Inventory
              </Link>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
