import { QuizIF } from "@/lib/responseIF";
import { Link } from "@inertiajs/react";




export default function QuizListItem({quiz,index,curreent_index,processing,onClick}:{quiz:QuizIF,index:number,curreent_index:number,
    processing:boolean,onClick:(Id:number)=>void
}) {
    return <button
        disabled={processing} onClick={(e)=>onClick(index)}
    className={`flex flex-row p-4 shadow rounded-lg items-center gap-3 transition-colors ${index==curreent_index ? "bg-green-400" : "hover:bg-green-100"} `}>
            <div className={`rounded-full min-h-4 min-w-4 ${quiz.attampted?"bg-yellow-400":"bg-red-300"}`}></div>
            <h2 className="truncate">{index+1}. {quiz.question}</h2>
        </button>

}
