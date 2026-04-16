import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface LabeledInputParams{
    name:string;
    data:string|number;
    OnChange:(value:string)=>void;

    type?:string;
    label?:string;
    error?:string;
    requierd?:boolean;
    min?:number;
    max?:number;
    labelsize?:string;
    placeHolder?:string;
}

export default function LabeldInput(params:LabeledInputParams) {

    const [show,setShow] = useState(false)

    return <div>
        <div
            className="flex md:flex-row flex-col md:items-center  gap-7 "
        >
            <label className={`font-bold ${params.labelsize!=null && params.labelsize}`} htmlFor={params.name}>{params.label ?? params.name}</label>
            <div
                className="relative  flex-10"
            >
            <input
                className="border-b-2 bg-gray-100 shadow focus:bg-gray-200 focus:border-amber-400 transition-all outline-none p-1 rounded-t-sm w-full"
                required={params.requierd??true}
                min={params.min??0}
                max={params.max??999}
                type={params.type=="password"?(show?"text":"password"):(params.type ?? "text")}
                name={params.name}
                id={params.name}
                value={params.data}
                placeholder={params.placeHolder??""}
                onChange={(e)=>params.OnChange(e.target.value)}
            />
            {params.type=="password" && <button
                onClick={()=>setShow(prev=>!prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
                {!show?(<EyeOff size={18}/>):(<Eye size={18}/>)}
            </button>}
            </div>
        </div>
        <p
            className="error pt-2"
        >{params.error}</p>

    </div>
}
