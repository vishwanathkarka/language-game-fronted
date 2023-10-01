import Header from "@/util/header";
import Link from "next/link";
import { getData, isAuthenticated } from "@/util/apicalls";
import { useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import Loading from "@/util/loading";

const Dashboard = () => {
  const [languages, setLanguages] = useState()
  const router = useRouter();

  
  useEffect(() => {
   const languagesList = async () =>{
    const result = await getData(
      `/languagelist`,
      isAuthenticated().token
    );

    setLanguages(result.languages)
    console.log(languages);
   }
   languagesList()

    if (!isAuthenticated()) {
      router.push("/login");
    }
   
  }, [router]);
  
  console.log(languages);
  // settingarragement && console.log("RESSS"+  settingarragement[0].noOfCol)
  return (
    <>
      <Header />
      <div className="h-[95vh] p-6">
        {/* <div className='bg-gradient-to-b from-gradent1_1 to-gradent1_2 h-[10rem] w-[10rem]'>
<p></p>
</div> */}
<h1 className=" text-whitelight mb-3 lg:mb-9 text-center">Choose Language You Wanted to Learn</h1>
 <div className="flex gap-1 lg:gap-9  flex-wrap items-center justify-center">
 {/* {languages && isAuthenticated().user.role == "user" &&  */}
 {languages && isAuthenticated().user.role == "user" && 
  languages.map((el,index)=> (
    <>
          <Link href={`/assignments/${el._id} `} className="no-underline min-w-[10rem]">
            <div className={ `bg-secoundblack  h-[20vh] min-w-[10rem] shadow-[#06060669] shadow-md rounded-3xl flex flex-col justify-center items-center `}>
              <div>
       
              </div>
              <h1 className={`text-[#FFC0A3] text-md`}>{el.title}</h1>
              {/* <p className=" text-lightblack">{index}</p> */}
            </div>
          </Link>
          
    
      </>
  ))

  
 
}

{languages && isAuthenticated().user.role == "admin" && 
  languages.map((el,index)=> (
    <>
          <Link href={`/assignments/${el._id} `} className="no-underline min-w-[10rem]">
            <div className={ `bg-secoundblack  h-[20vh] min-w-[10rem] shadow-[#06060669] shadow-md rounded-3xl flex flex-col justify-center items-center `}>
              <div>
       
              </div>
              <h1 className={`text-[#FFC0A3] text-md`}>{el.title}</h1>
              {/* <p className=" text-lightblack">{index}</p> */}
            </div>
          </Link>

         
          
    
      </>
  ))
}
{
languages && isAuthenticated().user.role == "admin" &&  ( <Link href="add/language" className="no-underline min-w-[10rem]">
            <div className={ `bg-[#FFC0A3] h-[20vh] min-w-[10rem] shadow-[#06060669] shadow-md rounded-3xl flex flex-col justify-center items-center `}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 5l0 14" />
  <path d="M5 12l14 0" />
</svg>

              <h1 className={`text-white text-md`}>Add</h1>
              {/* <p className=" text-lightblack">{index}</p> */}
            </div>
          </Link>
 )
}

</div>
{
  !languages &&  <Loading/>
}
      </div>
    </>
  );
};
export default Dashboard;
