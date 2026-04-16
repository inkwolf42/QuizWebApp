import { Filter } from "@/lib/responseIF";
import { textFormatter } from "@/lib/utils";
import { ArrowBigDown, ArrowBigUp, ArrowUp, Search } from "lucide-react";

export default function SearchBar({value,onChange,onButtonPreesed,orderByList}:{
    value:Filter,
    onChange:(param:string,value:string)=>void,
    onButtonPreesed:()=>void,
    orderByList:Array<string>
}) {
    return (
        <div className="flex sm:flex-row flex-col  sm:items-center items-end gap-5">
            <form
                onSubmit={e=>{
                    e.preventDefault();
                    onButtonPreesed();
                }}
            className="bg-gray-100 flex-1 p-3 w-full flex flex-row rounded-lg shadow gap-3 items-center">
                <Search className="aspect-square h-full"/>
                <input type="text" className="flex-1 outline-none" value={value.search??""} onChange={e=>onChange("search",e.target.value)} placeholder="Search ..."/>
                {/* <button type="submit" className="rounded bg-amber-300 hover:bg-amber-400 transition uppercase p-1 font-bold text-white">
                    Search
                </button> */}
            </form>
            <div className="bg-gray-100 p-3 rounded-lg shadow flex flex-row items-center gap-2">
                <select
                    className="border-2 border-gray-300 rounded p-2 "
                    onChange={e=>onChange("orderBy",e.target.value)}
                >
                    {
                        orderByList.map(value=>(
                            <option value={value} >{textFormatter(value)}</option>
                        ))
                    }
                </select>
                <button
                    onClick={()=>onChange("orderDirection",
                        value.orderDirection=="desc"?"asc":"desc"
                    )}
                    className="bg-gray-50 shadow p-1 h-full aspect-square rounded-md hover:bg-white"
                >
                    {
                        value.orderDirection=="desc"?
                        <ArrowBigUp/>:
                        <ArrowBigDown/>
                    }
                </button>
            </div>
        </div>
    );
}
