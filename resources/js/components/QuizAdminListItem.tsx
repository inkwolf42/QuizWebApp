import { QuizAdminIF, QuizIF } from "@/lib/responseIF";
import { colors } from "@/lib/utils";
import { Link } from "@inertiajs/react";



export default function QuizAdminListItem({quiz,onDelete}:{quiz:QuizAdminIF,onDelete:()=>void}) {
    return (
        <div className="bubble p-2 bg-amber-50 flex flex-row">
            <Link href={route('admin.dashboard.quiz',quiz.id)} className="flex-1">{quiz.question}</Link>
            <div className="flex flex-row justify-between w-80 items-center">
                <h2 className={`font-extrabold`}>{quiz.category!=null?quiz.category.name:"None"}</h2>
                <h2 className={`${colors[quiz.difficulty]} border-2  p-1 rounded-lg uppercase text-white font-extrabold text-sm w-28 text-center`}>{quiz.difficulty}</h2>
                <button onClick={onDelete} className="bg-red-300 hover:bg-red-600 cursor-pointer p-1 rounded-lg text-white font-bold">Delete</button>
            </div>
        </div>
    );
}
