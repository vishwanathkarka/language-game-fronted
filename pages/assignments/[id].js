import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/util/header";
import { getData, isAuthenticated } from "@/util/apicalls";

function Id() {
const router = useRouter();
    const[assignments,setAssignments] = useState();
    const [isAdmin,setIsAdmin] = useState(false);
    useEffect(() => {
        const AssignmentList = async () =>{
         const result = await getData(
           `/assignments/${router.query.id}`,
           isAuthenticated().token
         );
     
         setAssignments(result            )
       
        }
        AssignmentList()
     
         if (!isAuthenticated()) {
           router.push("/login");
         }
         if(isAuthenticated().user.role == "admin" ){
            setIsAdmin(true);
         }
       }, [router]);

       console.log(assignments);
return (
    <>
     <Header/>
     <div>
        <div className="  min-h-[80vh]  bg-secoundblack mx-4 py-3 px-3 rounded-lg my-5">
            <h1 className="text-white mb-6 text-xl text-center">Assignment List</h1>
            {
                assignments && assignments.assignments.map((el) =>(
                    <>
                    <Link href={`/exam/${el._id}`} className=" relative h-[2rem] w-[2rem] " key = {el._id}>
                        <div className=" absolute right-1">
                            <Link href="">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1A1E23" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
  <path d="M13.5 6.5l4 4" />
</svg>
</Link>
                        </div>
                    <div className="text-white bg-[#343a46b6] border-[rgba(246,247,249,.05)] border-[1px] rounded-lg w-[20rem] text-center p-4">{el.title}</div>
                    </Link>
                    </>
                ))
                
                

            }
            {
                assignments && assignments.assignments.length == 0 ? (<h1 className="text-[#717377] m-8 text-center text-[1.5rem]"> No Result Found</h1>) : ""
            }

            {
              isAdmin&&  (
                    <>
                    <Link href={`/add/assignment/${router.query.id}`}>
                     <div className="text-white mt-7  bg-[#1A1E23] border-[rgba(246,247,249,.05)] border-[1px] rounded-lg w-[20rem] text-center p-4"> Add assignments</div>
                     </Link>
                    </>
                )
            }
            
         </div>
         </div>
    </>
)


}

export default Id;