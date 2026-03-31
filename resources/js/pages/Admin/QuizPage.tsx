import ValueDisplayer from "@/components/ValueDisplayer";
import LogedIn from "@/layouts/LogedIn";
import { ChoiceAdminIF, ChoiceIF, QuizAdminIF } from "@/lib/responseIF";
import { colors } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { ArrowLeft, Check, Pen, Pin, PinIcon, X } from "lucide-react";

export default function QuizPage({quiz}:{quiz:QuizAdminIF}) {
    console.log(quiz);

    return (
        <LogedIn title="QuizPage" isAdmin>
            <div className="flex flex-col items-stretch mt-10 p-5 w-3/4 mx-auto gap-12 ">
            <header className="relative mb-10">
                <button onClick={()=>window.history.back()} className="absolute left-0 top-1/2 -translate-y-1/2">
                    <ArrowLeft size={48} color="gray" className="shadow rounded-2xl hover:bg-amber-300 transition-colors"/>
                </button>
                <h1 className="title title-big  ">Quiz Details :</h1>
                <Link href={route("admin.dashboard.quiz.edit",quiz.id)} className="absolute right-0 top-1/2 -translate-y-1/2">
                    <Pen size={48} color="gray" className="p-2 shadow rounded-2xl hover:bg-amber-300 transition-colors"/>
                </Link>
            </header>
                <ValueDisplayer label="Question :" value={`${quiz.question}?`}/>
                <ValueDisplayer label="Category :" value={quiz.category?quiz.category.name:"None"}/>
                <div className="flex flex-row justify-start items-center ">
                    <h1 className="flex-1 title text-xl text-start">Difficulty :</h1>
                    <div className="flex-1">
                    <h2 className={`${colors[quiz.difficulty]}  border-2  p-1 rounded-lg uppercase text-white font-extrabold text-sm w-36 text-center`}>
                        {quiz.difficulty}
                    </h2>
                    </div>
                </div>
                <ValueDisplayer label="Has Multiple Answers :" value={quiz.has_multi_answer?"Yes":"No"}/>
                <h2 className="title text-3xl">Choices : </h2>
                <div className="flex flex-col gap-5">

                {
                    quiz.choices.map(choice=>{

                        return <div className={`flex flex-row items-center gap-5 mx-5 ${choice.is_correct?"text-green-500":"text-red-500"}`}>
                            {
                                choice.is_correct?
                                (<Check/>):
                                (<X/>)
                            }
                            <p className="capitalize text-xl">
                                {choice.answer}
                            </p>
                        </div>
                    }
                    )
                }
                </div>

            </div>

        </LogedIn>
    );
}
