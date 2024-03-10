// ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from "next/link";
import { getCookie } from "../utils/myCookie";
import { useRouter } from 'next/router';

const ProfilePage = () => {

  const router = useRouter();
  const {  token, authUser } = useAuth();


  React.useEffect(() => {
    // console.log("token", token);
     const token = getCookie("token");

    if (!token) {
      router.push("/login");
    }
  }, []);



  return (
    <div className=" bg-gradient-to-r from-cyan-500 to-cyan-700 min-h-screen mx-auto px-4 py-8 select-none">
        <div className="text-sm px-8 breadcrumbs">
        <ul>
          <li><Link href="/dashboard">Dashboard</Link></li> 
          <li>Profile</li>
        </ul>
      </div>
      <div className='px-8 py-8'>

        <div className="card rounded bg-base-300">
          <div className='card-body'>
            <h1 className=" text-bold shadow-2xl bg-cyan-50 bg-opacity-65 rounded-lg  pt-4 mt-4 ml-4 pb-5 pr-5 pl-5 text-3xl  text-neutral font-semibold mb-6">PROFILE</h1>
            
          <p className="text-lg font-semibold mb-2">Company Name: {authUser?.companyName}</p>
          <p className="mb-2">Role: {authUser?.role}</p>
          <p className="mb-2">Email ID: {authUser?.email}</p>
          <p className="mb-2">Phone Number: {authUser?.phoneNumber}</p>
        </div>
        </div>
        <br /> <br />
      
      </div>
      </div>
  );
};

export default ProfilePage;