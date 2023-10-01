import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/util/header";
import { getData,postDataJson, isAuthenticated } from "@/util/apicalls";
import Loading from "@/util/loading";

function Id() {
const router = useRouter();
  const [data, setData] = useState();
  const [inputData,setInputData] = useState()
  useEffect(() => {
    const List = async () => {
      const result = await getData(
        `/assignment/${router.query.id}`,
        isAuthenticated().token
      );

      setData(result);
    };
    List();


    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);


  const handleInput = (name) => (el) => {
    // el.preventDefault();
    setInputData({ ...inputData, [name]: el.target.value });
    let finalData =[];
    inputData && Object.keys(inputData).forEach((key)=>{
        const value = inputData[key];
        finalData.push({questionId:key,userAns:value})
        // console.log("key "+key+" value"+value)
    })

    console.log(finalData)
    console.log(name+" -- "+ el.target.value);
  };

  const handleSubmit = (el) =>{
    el.preventDefault();
    console.log("Hanlde submit");
    let finalData =[];
    inputData&& Object.keys(inputData).forEach((key)=>{
        const value = inputData[key];
        finalData.push({questionId:key,userAns:value})
        // console.log("key "+key+" value"+value)
    })
    console.log(finalData)
    const submitAns = async () => {
        const result = await postDataJson(
          `/adduserans`, {examId:router.query.id,ques:finalData},
          isAuthenticated().token
        );
  console.log(result);
  if(result.success){
    router.push(`/ans/${result.ansUser._id}`);
  }
        // setData(result);
      };
      submitAns();
  }

  console.log(inputData);
  return (
    <>
      <Header />
      <div className=" min-h-[95vh]">
        {data && (
          <h1 className="text-center text-white text-[1.7rem] my-4">
            {data.assignments.title}
          </h1>
        )}
        <form  onSubmit={handleSubmit}  >
        {data &&
        (
          data.assignments.questions.map((el, indx) => (
            <>
              <div className=" bg-secoundblack m-3 p-8 rounded-lg ">
                
                  <h2 className=" text-whitelight text-[1.2rem]">
                    {" "}
                    {`Q${indx + 1}: ${el.que}`}
                  </h2>
                  <div>
                    {data &&
        ( el.options.map((option) => (
                      <>
                        <div className="flex  items-center gap-3">
                          <input
                            type="radio"
                            className="border-[#717377] h-4 w-4 bg-secoundblack  text-secoundblack border-[1px]"
                            value={option._id}
                            
                            name={el._id}
                            id={el._id}
                            onChange={handleInput(el._id)}
                            
                          />
                          <label
                            class="form-check-label text-[#717377]"
                            for={el._id}
                          >
                            {option.title}
                          </label>
                        </div>
                      </>
                    )))}
                  </div>
               
              </div>
            </>
          )))}
          
        {!data && <Loading />}
        <button className=" bg-primarycolor text-white p-2 rounded-lg mx-4 mb-9" type="submit">
          Submit
        </button>
        </form>
      </div>
    </>
  );
}

export default Id;
