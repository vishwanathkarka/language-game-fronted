import Header from "@/util/header";
import { isAuthenticated } from "@/util/apicalls";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
    setUser(isAuthenticated().user);
  }, [router]);
  return (
    <>
      <Header />
      {user && (
        <div className=" text-whitelight m-0 flex flex-col  h-[100vh]  justify-center items-center">
          <div className="bg-secoundblack px-9 py-9 rounded  w-[95vw] md:w-[80vw] ">
            <div className="flex w-[10rem] h-[3rem] m-auto  justify-center items-center mb-5 gap-2 border-b-secoundblack border-[1px] shadow-md rounded-lg bg-primarycolor ">
          <h1 className=" text-white text-2xl text-center">{user.totalScore}</h1>
          <p className="text-lightblack">Points</p>
          </div>
            <div className="flex flex-wrap gap-4 bg-lightblack p-3 justify-center items-center rounded-xl relative">
             
              <div className="absolute right-2 top-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-pencil"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#ffffff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                </svg>
              </div>
              <Image
                src={user.photo.secure_url}
                width={70}
                height={70}
                alt="person"
                className="rounded-[50%] border-lightwg border-[2px]"
              />
              <div className="flex flex-col items-center items-center">
                <h6>{user.firstName + " " + user.lastName}</h6>
                <p className="text-[#717377] capitalize">{user.role}</p>
              </div>
            </div>
            <div className="m-5">
              <p className="text-[#717377] m-0 text-[0.9rem]"> Email</p>
              <p className="border-b-[#717377] border-b-[1px] pb-[2px] ">
                {" "}
                {user.email}
              </p>
              <p className="text-[#717377] m-0 text-[0.9rem]"> Gender</p>
              <p className="border-b-[#717377] border-b-[1px] pb-[2px] ">
                {" "}
                {user.gender}
              </p>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
