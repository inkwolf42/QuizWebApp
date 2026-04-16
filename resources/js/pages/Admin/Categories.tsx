import PageLink from "@/components/PageLink";
import SearchBar from "@/components/SearchBar";
import AdminNavBar from "@/layouts/AdminNavBar";
import LogedIn from "@/layouts/LogedIn";
import { getIcon } from "@/lib/iconList";
import { CategoryIF, Paginated, Filter } from "@/lib/responseIF";
import { Link, router } from "@inertiajs/react";
import { Pen, Plus, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Categories({categories,filters,orderByList}:{
    categories:Paginated<CategoryIF>,
    filters:Filter,
    orderByList:Array<string>
}) {

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
        router.get(route("admin.dashboard.categories"),filtersObj,{
            preserveState:true,
            replace:true
        });
    }

    return (
        <LogedIn title="Admin Dashboard" isAdmin>
            <div className="sm:w-4/5 mx-3 sm:mx-auto py-5 flex flex-col gap-5">
            <AdminNavBar page="categories"/>
                <Link
                    href={route("admin.dashboard.categories.create")}
                    className="bg-amber-100 hover:bg-amber-300 cursor-pointer transition-colors rounded-2xl p-5 shadow fixed md:bottom-10 bottom-5 md:right-10 right-5"
                >
                    <Plus/>
                </Link>
                <SearchBar
                    value={filtersObj}
                    onChange={(param,value)=>setFilters(prev=>({...prev,[param]:value}))}
                    onButtonPreesed={Filter}
                    orderByList={orderByList}
                />
                <div className="flex flex-col gap-y-2 bubble bg-gray-100 ">
                    {
                        categories.data.map(category=>{
                            let Icon = category.icon!=null?getIcon(category.icon):getIcon("help-circle")
                            return(<div
                            key={category.id}
                            className="flex sm:flex-row flex-col gap-5 px-5 sm:items-center items-end shadow py-2 rounded max-w-full">
                            <div className="flex flex-row gap-5 w-full">
                                <Icon size={40}
                                color="white"
                                    style={{backgroundColor:category.color}}
                                    className="p-2 rounded-lg aspect-square min-w-10"
                                />
                            <h2 className="text-lg font-semibold flex-1 truncate">
                                {category.name}
                            </h2>
                            </div>

                            <div className="flex flex-row gap-5 w-full">
                                <h2 className="text-lg font-semibold mr-auto flex flex-row gap-2 ">
                                    <p className="sm:hidden ">
                                        quizzes :
                                    </p>
                                    {category.quizzes_count}
                                </h2>
                                <Link
                                    href={route("admin.dashboard.categories.edit",category.id)}
                                    className="bg-blue-200 transition-colors hover:bg-blue-300 hover:text-white p-1 rounded-lg font-extrabold text-center">
                                        <Pen/>
                                    </Link>
                                <button type="button"
                                    onClick={()=>router.delete(route("admin.dashboard.categories.delete",category.id))}
                                    className="bg-red-200 transition-colors hover:bg-red-300 hover:text-white p-1 rounded-lg font-extrabold ">
                                        <Trash/>
                                    </button>
                            </div>
                        </div>)})
                    }
                </div>
                <div className="flex justify-center items-center">
                    <div className="flex flex-row gap-5 relative">
                        <div className="flex flex-row gap-5 absolute right-0 -translate-x-15">
                            {categories.current_page-1>1 && <PageLink label="1" url={categories.first_page_url}/>}
                            {categories.current_page-1>1 && <p>...</p>}
                            <PageLink label={categories.current_page-1} url={categories.prev_page_url}/>
                        </div>
                        <PageLink label={categories.current_page} url={""}/>
                        <div className="flex flex-row gap-5 absolute left-0 translate-x-15">
                            <PageLink label={categories.current_page+1} url={categories.next_page_url}/>
                            {categories.last_page-categories.current_page>1 && <p>...</p>}
                            {categories.last_page-categories.current_page>1 && <PageLink label={categories.last_page} url={categories.last_page_url}/>}
                        </div>
                    </div>
                </div>
            </div>
        </LogedIn>
    );
}
