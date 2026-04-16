import { QuizAdminIF, QuizIF } from "@/lib/responseIF";
import { colors } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { ArrowUpLeftFromCircleIcon, Info, Pen, Trash } from "lucide-react";
import { useState } from "react";



export default function QuizAdminListItem({quiz,onDelete,onEdit}:{quiz:QuizAdminIF,onDelete:()=>void,onEdit:()=>void}) {
    const [expand,setExpand] = useState (false);
    return (
        <div className="rounded-2xl shadow gap-5 px-5 py-2 bg-white flex md:flex-row flex-col md:items-center">
            <Link href={route('admin.dashboard.quiz',quiz.id)} className="flex-1  line-clamp-2">{quiz.question}</Link>
            <div className={`flex flex-row items-center gap-5`}>
                <h2 className={`font-extrabold md:w-30 w-15 text-sm md:text-lg mr-5`}>{quiz.category!=null?quiz.category.name:"None"}</h2>
                <h2 className={`${colors[quiz.difficulty]} border-2  p-1 rounded-lg uppercase text-white font-extrabold md:w-24 w-16 md:text-sm text-xs flex items-center justify-center`}>{quiz.difficulty}</h2>
                <div className="flex-1"/>
                <button onClick={onEdit} className="bg-blue-300 hover:bg-blue-600 cursor-pointer rounded-lg text-white font-bold uppercase p-2 aspect-square">
                    <Pen/>
                </button>
                <button onClick={onDelete} className="bg-red-300 hover:bg-red-600 cursor-pointer rounded-lg text-white font-bold uppercase p-2 aspect-square">
                    <Trash/>
                </button>
            </div>
            {/* <button onClick={()=>setExpand(prev=>!prev)} className="bg-gray-300 md:hidden flex hover:bg-gray-600 cursor-pointer rounded-lg text-white font-bold uppercase p-2 aspect-square">
                {
                    !expand?
                    <Info/>:
                    <ArrowUpLeftFromCircleIcon/>
                }
            </button> */}
        </div>
    );
}
