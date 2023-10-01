// import React,{useState,useEffect} from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { postDataForm, getData, isAuthenticated } from "../util/apicalls";
import { useRouter } from "next/router";
import Loading from "@/util/loadingPage";
import Header from "@/util/header";
var FormData = require("form-data");

const Signup = () => {
  const router = useRouter();
  const [isloading,setloading]= useState(false)
  // for sending imag
  const [img, setImg] = useState(null);
  // destructuring data
  const userInput = {
    firstName: "",
    password: "",
    lastName: "",
    email: "",
    role: "",
    gender:""
  };
  const [userData, setUserData] = useState(userInput);
  // for the fetching department form api
  const {
    firstName,
    password,
    lastName,
    role,
    email,
    gender,
  } = userData;



 

  let bodyFormData = new FormData();


  const handleInput = (name) => (el) => {
    if (name != "photo") {
      setUserData({ ...userData, [name]: el.target.value });
      console.log(el.target.value);
      bodyFormData.append(name, el.target.value);
    } else {
      setImg(el.target.files[0]);
    }
  };


  const handleSubmit = async (el) => {
    el.preventDefault();
    console.log(JSON.stringify(userData));
    console.log(userData);
    bodyFormData.append("data", JSON.stringify(userData));
    bodyFormData.append("photo", img);
    setloading(true)
    const data = await postDataForm("/signup", bodyFormData,isAuthenticated().token);
    if(data.success == true){
      router.push("/login")
    }
    setloading(false)
    bodyFormData.delete("[0]data");
    bodyFormData.delete("[0]photo");
    console.log(bodyFormData)
    setImg(null);
    bodyFormData = new FormData();
    ()=>setUserData( ...userData,{firstName: " ",
    password: " ",
    lastName: " ",
    email: " ",
    role: " ",
  
  })
    console.log(userData);
  };
  return (
    <>
    <Header/>
      <div className=" flex  justify-center align-middle  bg-slate-50 text-whitelight   ">
      { !isloading&&  <form
          className="w-[35rem]   my-9 mx-9 rounded-md  bg-secoundblack p-[1rem] border-[#717377] border-[1px] px-4 shadow-xl"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          <h2 className="text-center text-white">Create new account <span className="text-primarycolor">&#x2022;</span></h2>
          <input
            type="text"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 bg-secoundblack text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-[#717377] focus:ring-[#717377] sm:text-sm sm:leading-6  my-4"
            placeholder="First Name"
            onChange={handleInput("firstName")}
            value={firstName}

          />
          <input
            type="text"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset bg-secoundblack ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-indigo-600 sm:text-sm sm:leading-6  my-4"
            placeholder="Last Name"
            onChange={handleInput("lastName")}
            value={lastName}
          />
        
          <div className=" w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 bg-secoundblack ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4 flex items-center gap-2">
 <input type="radio" name="gender" value="male"  className="" onClick={handleInput("gender")}   />
      <label htmlFor="male" >Male</label>
      <input type="radio" name="gender" value="female" onClick={handleInput("gender")}  />
      <label htmlFor="female">Female</label>
</div>
        
          <input
            type="email"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 bg-secoundblack ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            placeholder="youremail@gmail.com"
            onChange={handleInput("email")}
            value={email}
          />

          <input
            type="file"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 
             file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 
            text-gray-900 ring-1 bg-secoundblack  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            placeholder="youremail@gmail.com"
            multiple
            onChange={handleInput("photo")}
          />

         

        
        
          <input
            type="password"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 bg-secoundblack ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
            placeholder="*************"
            onChange={handleInput("password")}
            value={password}
          />
       
        
      
        
          <button
            className="block w-full font-bold bg-primarycolor rounded-md border-0 py-1.5 pl-7 pr-20  my-4 "
            type="submit"
          >
           Create account
          </button>
        </form>
}
{
  isloading&& <Loading/>
}
      </div>
    </>
  );
};
export default Signup;
