import PageLink from "@/components/PageLink";
import QuizAdminListItem from "@/components/QuizAdminListItem";
import AdminNavBar from "@/layouts/Adminlayout";
import LogedIn from "@/layouts/LogedIn";
import { Paginated, QuizAdminIF, QuizIF } from "@/lib/responseIF";
// import { route } from "@/types/global";
import { Link, router } from "@inertiajs/react";
import { Plus } from "lucide-react";

export default function Quizzes({page}:{page:Paginated<QuizAdminIF>}) {
    // console.log(page.data[0]);

    function deleteQuiz(quiz:QuizAdminIF){
        if(confirm(`Are you sure you want to delete "${quiz.question}"`)){
            router.delete(route("admin.dashboard.quiz.delete",quiz.id))
        }
    }

    return (
        <LogedIn title="Admin Dashboard" isAdmin>


        <div className="w-4/5 mx-auto py-5 flex flex-col gap-5">
            <Link
                href={route("admin.dashboard.quiz.create")}
                className="bg-amber-100 hover:bg-amber-300 cursor-pointer transition-colors rounded-2xl p-5 shadow fixed bottom-10 right-10"
            >
                <Plus/>
            </Link>

            <AdminNavBar page="quizzes"/>

            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 bubble bg-gray-100">
                    {
                        page.data.map(item=>(
                            <QuizAdminListItem
                                onDelete={()=>deleteQuiz(item)}
                                key={item.id}
                                quiz={item}
                            />
                        ))
                    }
                </div>
                <div className="flex justify-center items-center">
                    <div className="flex flex-row gap-5 relative">
                        <div className="flex flex-row gap-5 absolute right-0 -translate-x-15">
                            {page.current_page-1>1 && <PageLink label="1" url={page.first_page_url}/>}
                            {page.current_page-1>1 && <p>...</p>}
                            <PageLink label={page.current_page-1} url={page.prev_page_url}/>
                        </div>
                        <PageLink label={page.current_page} url={""}/>
                        <div className="flex flex-row gap-5 absolute left-0 translate-x-15">
                            <PageLink label={page.current_page+1} url={page.next_page_url}/>
                            {page.last_page-page.current_page>1 && <p>...</p>}
                            {page.last_page-page.current_page>1 && <PageLink label={page.last_page} url={page.last_page_url}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </LogedIn>
    );
}
