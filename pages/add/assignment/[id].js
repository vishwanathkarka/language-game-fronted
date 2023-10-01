import Header from "@/util/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getData, postDataJson, isAuthenticated } from "@/util/apicalls";
function Assignment() {
    const router = useRouter();
  const [userData, setUserData] = useState({
    title: "",
    description: "",
    language: router.query.id,
    questions:[]
  });
  const [title,setTitle] = useState("")
  const [languagesList, setLanguagesList] = useState()
  useEffect( () => {
       
    
    
    if (!isAuthenticated() || !isAuthenticated().user.role == "admin") {
      router.push("/login");
    }

    const languages = async() =>{

    const result = await getData(
        `/languagelist`,
        isAuthenticated().token
      );
      setLanguagesList(result.languages)
    }

    languages()

  
  }, [router]);
  console.log("languagesList"+JSON.stringify(languagesList))
  const [questions, setQuestions] = useState([]);
  const[description,setDescription] = useState()
  const[question,setQuestion] = useState()
 
  const [display, setDisplay] = useState();
  const [newQuestion, setNewQuestion] =  useState();
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
 
  const [newCorrectOptionIndex, setNewCorrectOptionIndex] = useState(0);
  console.log(newOptions)

  const addingQuestion = (el) =>{
    el.preventDefault()
let options =[]
    newOptions.map((op,indx)=>{
        newCorrectOptionIndex == indx ? options.push({title:op,isAns:true}):options.push({title:op,isAns:false})
    })
    let questionData = {
       "que": newQuestion,
        // "que":el,
        "options":options
    }
  
    let aa = [...questions]
    aa.push(questionData)
 setQuestions(aa)
console.log("questions"+JSON.stringify(questions))
setNewQuestion('');
setNewOptions(['', '', '', '']);
setNewCorrectOptionIndex(0);

  }
  
  const questionSubmit = async(el) =>{
el.preventDefault();
let aa = {...userData}
aa.title = title
aa.title = title
console.log("title"+title)
aa.description = description
aa.questions.push(...questions)
// console.log("userData"+JSON.stringify(userData))
setUserData(aa)
console.log("userData"+JSON.stringify(userData))
const result = await postDataJson(
    `/addexam`,userData,
    isAuthenticated().token
  );
  }
  return (
    <>
      <Header />
      <div className="min-h-[90vh] flex justify-center my-6 ">
      <form
        action=""
        className="w-[35rem]  min-h-[50vh]   bg-secoundblack rounded-xl m-2 p-[1rem]" onSubmit={questionSubmit} 
      >
        <input
          type="text"
          class="block w-full py-1.5 pl-7 pr-20 border-[1.5px]   border-lightblack my-2  bg-secoundblack   rounded-md  mb-6  text-white"
          placeholder="title"
          onChange={(e) =>  setTitle(e.target.value)}
         
        ></input>
        <input
          type="text"
          class="block w-full py-1.5 pl-7 pr-20 border-[1.5px]   border-lightblack my-2  bg-secoundblack   rounded-md  mb-6  text-white"
          placeholder="description"
          onChange={(e) =>  setDescription(e.target.value)}
         
        ></input>
        <select
          name=""
          id=""
          className="block w-full py-1.5 pl-7 pr-20 border-[1.5px]   border-lightblack my-2  bg-secoundblack   rounded-md  mb-6  text-white"
        >
         {languagesList && languagesList.map((language)=>(
        
            <option value="" key ={language._id}  selected = {language._id == router.query.id?true:false } >{language.title} </option>

         ))
         
         }
        </select>

        {questions &&
          questions.map((el, index) => (
           <div key={index} className=" bg-[#1A1E23] m-3 p-8 rounded-lg ">

              <h1 className=" text-whitelight text-[1.2rem]">{`Q: ${
                index + 1
              } -  ${el.que}`}</h1>
              {el.options.map((option) => (
                <>
                  <div className="flex  items-center">
                    <p1 className="text-[#717377]">{option.title}</p1>
                  
                      {option.isAns ? <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checks" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#009988" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M7 12l5 5l10 -10" />
  <path d="M2 12l5 5m5 -5l5 -5" />
</svg>: ""}
                    
                  </div>
                </>
              ))}
            </div>
          ))}

{/* {questions &&questions.map((question, index) => (
        <div key={index}>
          <h3>{`Question ${index + 1}: ${question.questionText}`}</h3>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li
                key={optionIndex}
                style={{
                  fontWeight:
                    optionIndex === question.correctOptionIndex ? 'bold' : 'normal',
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ))} */}
{
<div >
        <input
          type="text"
          class="block w-full py-1.5 pl-7 pr-20 border-[1.5px]   border-lightblack my-2  bg-secoundblack   rounded-md  mb-6  text-white"
          placeholder="Question title" 
          value = {newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        ></input>

        
        {/* <div className="flex gap-3 "> */}
          <div className="flex items-center flex-col justify-center gap-5">


{
          newOptions.map((option,optionIndex)=>(
            
          <div className="flex justify-center items-center gap-4" key={optionIndex}>
            <input
              type="text"
              class="block  py-1.5 pl-7 pr-20 border-[1.5px]   border-lightblack my-2  bg-secoundblack   rounded-md    text-white"
              placeholder="Option 1"
              value = {option}
             onChange={(e) => {
                const updatedOptions = [...newOptions];
                updatedOptions[optionIndex] = e.target.value;
                setNewOptions(updatedOptions);
              }}
            ></input>

            <div>
            <input
              type="radio"
              name="correctOption"
              className="h-4 w-4 mr-2"
              //   checked={optionIndex === newCorrectOptionIndex}
                 onChange={() => setNewCorrectOptionIndex(optionIndex) }
            />
            <label className="text-blacktext text-[1rem]" >Correct</label>
            </div>
            
            </div>
            
          ))
}
<button className=" border-[1.5px]  py-1.5 px-2 rounded-md text  border-lightblack my-2  text-blacktext " onClick={addingQuestion}>Add Questions</button>
     </div>
     </div>
}
<button className="block w-full py-1.5 pl-7 pr-20 border-[1.5px]   border-lightblack my-2  bg-primarycolor   rounded-md  mb-6  text-white" type="submit">Submit</button>
      </form>
      </div>
    </>
  );
}

export default Assignment;
