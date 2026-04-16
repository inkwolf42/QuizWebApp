import PageLink from "@/components/PageLink";
import QuizAdminListItem from "@/components/QuizAdminListItem";
import SearchBar from "@/components/SearchBar";
import AdminNavBar from "@/layouts/AdminNavBar";
import LogedIn from "@/layouts/LogedIn";
import { Filter, Paginated, QuizAdminIF, QuizIF } from "@/lib/responseIF";
import { Link, router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Quizzes({page,filters,orderByList}:{page:Paginated<QuizAdminIF>,
    filters:Filter,
    orderByList:Array<string>}) {

    const [filtersObj,setFilters] = useState({
        orderDirection:filters.orderDirection ??"desc",
        orderBy:filters.orderBy ?? orderByList[0],
        search:filters.search ?? ""
    });

    const isFirstRender = useRef(true);

    useEffect(()=>{
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        Filter()
    },[filtersObj])

    function Filter() {
        router.get(route("admin.dashboard"),filtersObj,{
            preserveState:true,
            replace:true
        });
    }
    function deleteQuiz(quiz:QuizAdminIF){
        if(confirm(`Are you sure you want to delete "${quiz.question}"`)){
            router.delete(route("admin.dashboard.quiz.delete",quiz.id))
        }
    }

    function editQuiz(quiz:QuizAdminIF){
        router.get(route("admin.dashboard.quiz.edit",quiz.id))
    }

    return (
        <LogedIn title="Admin Dashboard" isAdmin>


        <div className="sm:w-4/5 mx-3 sm:mx-auto py-5 flex flex-col gap-5">
            <Link
                href={route("admin.dashboard.quiz.create")}
                className="bg-amber-100 hover:bg-amber-300 cursor-pointer transition-colors rounded-2xl p-5 shadow fixed md:bottom-10 bottom-5 md:right-10 right-5"
            >
                <Plus/>
            </Link>

            <AdminNavBar page="quizzes"/>
            <SearchBar
                value={filtersObj}
                onChange={(param,value)=>setFilters(prev=>({...prev,[param]:value}))}
                onButtonPreesed={Filter}
                orderByList={orderByList}
            />
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 bubble bg-gray-100">
                    {
                        page.data.map(item=>(
                            <QuizAdminListItem
                                onEdit={()=>editQuiz(item)}
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
