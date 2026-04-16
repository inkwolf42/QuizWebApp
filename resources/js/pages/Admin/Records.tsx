import PageLink from "@/components/PageLink";
import SearchBar from "@/components/SearchBar";
import AdminNavBar from "@/layouts/AdminNavBar";
import LogedIn from "@/layouts/LogedIn";
import { getIcon } from "@/lib/iconList";
import { Filter, Paginated, RecordIF } from "@/lib/responseIF";
import { formatTime, secondsToDateTime } from "@/lib/utils";
import { categories } from "@/routes/admin/dashboard";
import { router } from "@inertiajs/react";
import { Check, Link, Plus, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Records({recordes,filters,orderByList}:{recordes:Paginated<RecordIF>,
    filters:Filter,
    orderByList:Array<string>
}) {
    const [filtersObj,setFilters] = useState({
        orderDirection:filters.orderDirection ??"desc",
        orderBy:filters.orderBy ?? orderByList[0],
        search:filters.search ?? ""
    });

    const isFirstRender = useRef(true);

    console.log(recordes);


    useEffect(()=>{
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        Filter()
    },[filtersObj])

    function Filter() {
        router.get(route("admin.dashboard.records"),filtersObj,{
            preserveState:true,
            replace:true
        });
    }

    return (
        <LogedIn title="Admin Dashboard" isAdmin>
            <div className="sm:w-4/5 mx-3 sm:mx-auto py-5 flex flex-col gap-5">
            <AdminNavBar page="records"/>
            <SearchBar
                value={filtersObj}
                onChange={(param,value)=>setFilters(prev=>({...prev,[param]:value}))}
                onButtonPreesed={Filter}
                orderByList={orderByList}
            />
                <div className="flex flex-col gap-y-2 rounded-xl overflow-clip bg-gray-100 ">
                    <div className={`bg-gray-100 flex flex-row items-center text-lg font-bold justify-between py-2 px-5`}>
                        <h1 className="flex-1" >User Name</h1>
                        <h2 className="flex-1 text-center">Negative Sys</h2>
                        <h2 className="flex-1 text-center">Duration</h2>
                        <h2 className="flex-1 text-end">Score</h2>
                    </div>
                    {
                        recordes.data.map((recorde,i)=>(
                            <div className={`${i%2!=0?"bg-gray-100":"bg-gray-200"} flex flex-row items-center justify-between py-2 px-5`}>
                                <div className="flex flex-col flex-1">
                                    <h1 className="text-lg font-bold">{recorde.user_name}</h1>
                                    <h3 className="opacity-60 ">{recorde.starting_time}</h3>
                                </div>
                                <div className="flex-1 flex justify-center items-center">{
                                    recorde.negative?<Check color="green"/>:<X color="red"/>
                                }</div>
                                <h2 className="font-bold flex-1 text-center">{recorde.time}</h2>
                                <h2 className="font-bold flex-1 text-end">{recorde.score} / 100</h2>
                            </div>
                        ))
                    }
                </div>
                <div className="flex justify-center items-center">
                    <div className="flex flex-row gap-5 relative">
                        <div className="flex flex-row gap-5 absolute right-0 -translate-x-15">
                            {recordes.current_page-1>1 && <PageLink label="1" url={recordes.first_page_url}/>}
                            {recordes.current_page-1>1 && <p>...</p>}
                            <PageLink label={recordes.current_page-1} url={recordes.prev_page_url}/>
                        </div>
                        <PageLink label={recordes.current_page} url={""}/>
                        <div className="flex flex-row gap-5 absolute left-0 translate-x-15">
                            <PageLink label={recordes.current_page+1} url={recordes.next_page_url}/>
                            {recordes.last_page-recordes.current_page>1 && <p>...</p>}
                            {recordes.last_page-recordes.current_page>1 && <PageLink label={recordes.last_page} url={recordes.last_page_url}/>}
                        </div>
                    </div>
                </div>
            </div>
        </LogedIn>

    );
}
