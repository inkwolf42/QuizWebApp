import LabeldInput from "@/components/LabeledInput";
import ValueDisplayer from "@/components/ValueDisplayer";
import LogedIn from "@/layouts/LogedIn";
import { CategoryIF, ChoiceAdminCreateIF, ChoiceAdminIF, QuizAdminIF } from "@/lib/responseIF";
import { colors, colorsWithHover, diffRotaion } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { ArrowLeft, Check, X } from "lucide-react";
import { useState } from "react";


export default function CreatePage({categories}:{categories:Array<CategoryIF>}) {

    const [newChoice,setNewChoice] = useState("");

    const form = useForm({
        "category_id":-1,
        "question":"10+15=?",
        "difficulty":"easy",
        "has_multi_answer":false,
        "choices":[
            {
                answer:"5",
                is_correct:false
            },{
                answer:"15",
                is_correct:false
            },{
                answer:"25",
                is_correct:true
            },{
                answer:"35",
                is_correct:false
            }
        ] as Array<ChoiceAdminCreateIF>
    })

    const quiz = form.data
    console.log(form.errors);


    function onSubmit(e:any) {
        e.preventDefault()
        form.post(route("admin.dashboard.quiz.store"))
    }

    return (
        <LogedIn title="QuizPage" isAdmin>
            <div className="flex flex-col items-stretch mt-10 p-5 md:w-3/4 mx-5 md:mx-auto gap-12 ">
            <header className=" mb-10">
                <button onClick={()=>window.history.back()} className="">
                    <ArrowLeft size={48} color="gray" className="shadow rounded-2xl hover:bg-amber-300 transition-colors"/>
                </button>
                <h1 className="title title-big  ">Quiz Details</h1>
            </header>
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
                <div className="flex md:flex-row flex-col gap-5">
                    <label htmlFor="question" className="flex-1 font-bold text-2xl">Question : </label>
                    <div className="flex-1 flex flex-col items-stretch">
                        <input type="text" name="question" id="question" value={quiz.question} onChange={(e)=>form.setData(prev=>({...prev,question:e.target.value}))}
                            className="border-b-2 bg-gray-100 shadow focus:bg-gray-200 focus:border-amber-400 transition-all outline-none p-1 rounded-t-sm "
                        />
                        <p className="h-7 error">{form.errors.question}</p>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-5">
                    <label htmlFor="category" className="flex-1 font-bold text-2xl">Category : </label>
                    <div className="flex-1 ml-auto">
                        <select name="category" defaultValue={quiz.category_id} id="category" onChange={(e)=>form.setData(prev=>({...prev,category_id:parseInt(e.target.value)}))}
                            className="border-b-2 bg-gray-100 shadow focus:bg-gray-200 focus:border-amber-400 transition-all outline-none p-1 w-52">
                            <option value={-1} >None</option>
                            {
                                categories.map(cat=>{
                                    return (<option value={cat.id} key={cat.id}>{cat.name}</option>)
                                })
                            }
                        </select>
                        <p className="h-7 error">{form.errors.category_id}</p>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-5 bg-amber justify-start items-start">
                    <div className="flex-1 flex flex-col">
                        <h1 className="font-bold text-2xl">Difficulty:</h1>
                        <p className={`h-7 error ${!form.errors.difficulty&&"md:flex hidden"}`}>{form.errors.difficulty}</p>
                    </div>
                    <div className="flex-1 flex flex-col justify-start h-full ml-auto">
                        <button
                            type="button"
                            onClick={()=>form.setData(prev=>({...prev,difficulty:diffRotaion[prev.difficulty]}))}
                            className={`${colorsWithHover[quiz.difficulty]} transition-colors  border-2  p-1 rounded-lg uppercase text-white font-extrabold text-sm w-36 text-center`}
                        >
                            {quiz.difficulty}
                        </button>

                    </div>
                </div>
                <label className="flex flex-row gap-4 mt-5 md:m-0">
                    <div className="flex-1">
                        <p className="font-bold text-2xl">Has Multi Answer :</p>
                        <p className="h-7 error">{form.errors.has_multi_answer}</p>
                    </div>
                    <div className="md:flex-1 ">
                        <input className="scale-200" type="checkbox" checked={quiz.has_multi_answer} onChange={()=>form.setData(prev=>({...prev,has_multi_answer:!prev.has_multi_answer}))} />

                    </div>
                </label>
                <h2 className="title text-3xl mt-5">Choices : </h2>
                <p className="h-7 error">{form.errors.choices}</p>
                <div className="flex md:flex-row flex-col gap-x-10 gap-2 ">
                        <label htmlFor="choice-new" className=" font-bold text-xl">New Choice : </label>
                        <input
                            className="border-b-2 bg-gray-100 shadow focus:bg-gray-200 focus:border-amber-400 transition-all outline-none p-1 rounded-t-sm flex-1 h-10"
                        type="text" name="choice-new" id="choice-new" value={newChoice} onChange={e=>setNewChoice(e.target.value)}/>

                        <button className="button-default bg-green-200 hover:bg-green-300 ml-auto transition-colors uppercase tracking-wider font-bold hover:text-white" type="button"
                            onClick={()=>{
                                if(quiz.choices.filter(choice=>choice.answer==newChoice).length!=0){
                                    alert(`the Choice ${newChoice} is already added!`)
                                    return
                                }
                                form.setData(prev=>({...prev,choices:[...prev.choices,{
                                    "answer":newChoice,
                                    "is_correct":false
                                }]}))
                                setNewChoice("");
                            }}
                        > ADD</button>
                </div>
                <div className="flex flex-col  overflow-clip font-semibold rounded-t-2xl shadow">
                    <div className="flex flex-row py-3 bg-gray-300">
                        <h1 className="w-25 text-center">Is correct</h1>
                        <h1>Choice</h1>
                    </div>
                    {
                        form.data.choices.map((choice,i)=>{
                            return(
                                <div className={`flex flex-row items-center py-3 pr-8 bg-gray-${100+(i%2)*100}`} key={i}>
                                    <input className="w-25 h-8 " type="checkbox"  id={`${choice.answer}${i}`} checked={choice.is_correct} onChange={()=>{
                                        form.setData(prev=>({
                                            ...prev,
                                            choices:prev.choices.map(choicearr=>{
                                                if (choicearr.answer==choice.answer) {
                                                    choicearr.is_correct = !choicearr.is_correct
                                                }
                                                return choicearr
                                    })}))}} />
                                    <div className=" flex-1">
                                        <label htmlFor={`${choice.answer}${i}`}>{choice.answer}</label>
                                        <p className="error">{form.errors[`choices.${i}.answer`]}</p>
                                    </div>
                                    <button type="button"
                                        onClick={()=>form.setData(prev=>({...prev,choices:prev.choices.filter(c=>c.answer!=choice.answer)}))}
                                    className="ml-auto py-2 px-4 rounded-xl uppercase bg-red-200 hover:bg-red-300 hover:text-white shadow transition-colors flex justify-center items-center cursor-pointer text-sm">Delete</button>
                                </div>
                            )
                        })
                    }
                </div>

                <button type="submit" className="button-default ml-auto bg-amber-200 hover:bg-amber-300 transition-colors uppercase tracking-wider font-bold hover:text-white">Submit</button>
            </form>


            </div>

        </LogedIn>
    );
}
