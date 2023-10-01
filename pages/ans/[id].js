import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/util/header";
import { getData, isAuthenticated } from "@/util/apicalls";

function Id() {
  const router = useRouter();
  const [data, setData] = useState();
  const [inputData, setInputData] = useState();
  const [points,setPoints] = useState(0)
  useEffect(() => {
    const List = async () => {
      const result = await getData(
        `/userans/${router.query.id}`,
        isAuthenticated().token
      );
      console.log(router.query.id);
      setData(result);
    };
    router.query.id&& List();

    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  const pointsCal = ()=>{
    setPoints(points+1)
  }
  console.log(data);
  const handleInput = (name) => (el) => {
    // el.preventDefault();
    setInputData({ ...inputData, [name]: el.target.value });

    console.log(name + " -- " + el.target.value);
  };
  console.log(points)
//   const checkValue = (userData, question) => {

//     console.log("USEERRR"+userData)
//     userData && userData.map((user) => {
//       question.map((el, indx) => {
       
        
            
//             // if(user.questionId == el._id){
//           (
//             <>
//           <div className=" bg-secoundblack m-3 p-8 rounded-lg ">
//             <h2 className=" text-whitelight text-[1.2rem]">
             
//               {`Q${indx + 1}: ${el.que} ${points}`}
//             </h2>
//             <div>
//               {data &&
//                 el.options.map((option) => (
//                   <>
//                     <div className="flex  items-center gap-3">
//                       <h2 class="form-check-label text-[#717377]" for={el._id}>
//                         {option.title }
//                       </h2>
//                     </div>
//                   </>
//                 ))}
//             </div>
//           </div>
//         </>
//            )
//         // }
    
//     // }
        
//     }
//       );
//     })
    
//     ;



//   };

  const handleSubmit = (el) => {
    el.preventDefault();
    console.log("Hanlde submit");
    let finalData = [];
    inputData &&
      Object.keys(inputData).forEach((key) => {
        const value = inputData[key];
        finalData.push({ questionId: value, userAns: value });
        // console.log("key "+key+" value"+value)
      });
    console.log(finalData);
    const submitAns = async () => {
      const result = await postDataJson(
        `/adduserans`,
        { examId: router.query.id, ques: finalData },
        isAuthenticated().token
      );

      console.log(result);
      if (result.success) {
        router.push(`/ans/${result.ansUser._id}`);
      }
      // setData(result);
    };
    submitAns();
  };
//   data && console.log("ABC" + JSON.stringify(data.ans.ques));
  console.log(inputData);
  return (
    <>
      <Header />
      <div>
        {data && (
          <h1 className="text-center text-white text-[1.7rem] my-4">
            {/* {data.ans.examId} */}
          </h1>
        )}
        <form onSubmit={handleSubmit}>
          {/* {checkValue()} */}

          {/* {data &&

checkValue(data.ans.ques
    ,data.ans.examId.questions) */}


    { data && (

        data.ans.ques.map((user) => (
             <div key={user.questionId}>

            {data.ans.examId.questions.map((el, indx) => 
            {
              if(user.questionId == el._id){ 
              
                return(
                  <>
                <div className=" bg-secoundblack m-3 p-8 rounded-lg " key ={el._id}>
                  <h2 className=" text-whitelight text-[1.2rem]">
                   
                    {`Q${indx + 1}: ${el.que} ${points}`}
                  </h2>
                  <div>
                   
                    {
                    
                    data &&
                      el.options.map((option) => {
                        if(user.userAns == option._id){
                            if(option.isAns){
                            // ()=>  pointsCal()
                                // setPoints(()=>{points + 1});
                            //    ()=>{ setPoints(points+1)}
                            // let pointsNo = points+1
                        //   ()=>{ setPoints(() => points + 1) }
                        //  ()=>{   setPoints(pointsNo)}
                        //  setPoints((points) => points + 1) ;
                        //  setPoints((points) => points + 1);
                            // points++;
                               
                            return(
                        <>
                          <div className="flex  items-center gap-3" key ={el._id}>
                            <h2 class="form-check-label text-[#717377]" for={el._id}>
                              {option.title}
                              
                                   </h2>
                                   <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21"><rect id="Rectangle_16" data-name="Rectangle 16" width="27" height="21" rx="8" fill="rgba(23,142,113,0.4)"></rect><path id="Icon_feather-check" data-name="Icon feather-check" d="M17.806,9,9.689,16.5,6,13.091" transform="translate(2.096 -2.25)" fill="none" stroke="#1a8e72" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path></svg>
                       
                          </div>
                        </>
                            )
                            }
                            else{
                                return(
                                    <>
                                      <div className="flex  items-center gap-3">
                                        <h2 class="form-check-label text-[#717377]" for={el._id}>
                                          {option.title}
                                          
                                               </h2>
                                               <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21"><rect id="Rectangle_16" data-name="Rectangle 16" width="27" height="21" rx="8" fill="rgba(230,189,197,0.4)"></rect><path id="Path_28" data-name="Path 28" d="M11.09,97.725a.994.994,0,0,0,0-1.492,1.227,1.227,0,0,0-1.628,0L5.678,99.7,1.89,96.237a1.227,1.227,0,0,0-1.628,0,.994.994,0,0,0,0,1.492L4.05,101.2.265,104.667a.994.994,0,0,0,0,1.492,1.227,1.227,0,0,0,1.628,0l3.784-3.471,3.788,3.467a1.227,1.227,0,0,0,1.628,0,.994.994,0,0,0,0-1.492L7.305,101.2Z" transform="translate(7.822 -90.696)" fill="#ea8b9e"></path></svg>
                                   
                                      </div>
                                    </>
                                        )
                            }
                        }
                        else{
                            return(
                                <>
                                  <div className="flex  items-center gap-3">
                                    <h2 class="form-check-label text-[#717377]" for={el._id}>
                                      {option.title}
                                    </h2>
                                  </div>
                                </>
                                    )  
                        }
              })}

              {/* { console.log(points)} */}

                  </div>
                </div>
              </>
                 )
                } 
                      }
              // }
          
          // }
              
        //   }
            )}
            </div>
        ))
    )
    // }
            // data.ans.examId.questions.map((el, indx) => (
            //   // { if(userdata.questionId == el._id){
            //   //     console.log("JKLFLGLGG");
            //   // }}
            //   <>
            //     <div className=" bg-secoundblack m-3 p-8 rounded-lg ">
            //       <h2 className=" text-whitelight text-[1.2rem]">
            //         {" "}
            //         {`Q${indx + 1}: ${el.que}`}
            //       </h2>
            //       <div>
            //         {data &&
            //           el.options.map((option) => (
            //             <>
            //               <div className="flex  items-center gap-3">
            //                 <h2
            //                   class="form-check-label text-[#717377]"
            //                   for={el._id}
            //                 >
            //                   {option.title}
            //                 </h2>
            //               </div>
            //             </>
            //           ))}
            //       </div>
            //     </div>
            //   </>
            // ))}
          }
          {/* {!data && <Loading />} */}
        </form>
      </div>
    </>
  );
}

export default Id;
