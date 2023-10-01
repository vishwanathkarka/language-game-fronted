import Header from '@/util/header'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getData,postDataJson, isAuthenticated } from "@/util/apicalls";
 function Language() {
    const router = useRouter();
    const[inputData,setInputData] = useState({})
    useEffect(() => {
       
    
    
        if (!isAuthenticated() || !isAuthenticated().user.role == "admin") {
          router.push("/login");
        }
      }, [router]);

      const handleInput = (name) => (el) => {
    
          setInputData({ ...inputData, [name]: el.target.value });
        
      };

      const submitHandle = async(el)=>{
        el.preventDefault();
        const result = await postDataJson(
            `/addlanguage`,inputData,
            isAuthenticated().token
          );
      }
  return (
    <>
    <Header/>
    <div className='h-[95vh] flex justify-center items-center'>

<div className='w-[35rem]  min-h-[50vh]   bg-secoundblack rounded-xl m-2 p-[1rem]'>
<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-language border-white border-[1px] rounded-sm text-center m-auto mt-8 " width="72" height="72" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 5h7" />
  <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
  <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
  <path d="M12 20l4 -9l4 9" />
  <path d="M19.1 18h-6.2" />
</svg>
<h1 className='text-white text-[1.5rem] my-6 text-center' >Enter the Language name</h1>
<form  onSubmit={submitHandle}>
<input type="text" class="block w-full py-1.5 pl-7 pr-20 border-[1.5px]   border-lightblack my-2  bg-secoundblack   rounded-md  mb-6  text-white" placeholder="Enter language name" onChange={handleInput("title")}></input>
<button className='block w-full py-1.5 pl-7 pr-20 border-[1.5px]   border-lightblack my-2   bg-primarycolor   rounded-md   text-white' type="submit" >Add+</button>
</form>
</div>

    </div>
    </>
  )
}
export default Language;
