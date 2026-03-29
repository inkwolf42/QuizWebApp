
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
}

export default function LabeldInput(params:LabeledInputParams) {
    return <div>
        <div
            className="flex flex-row items-center justify-center gap-7"
        >
            <label className="font-bold" htmlFor={params.name}>{params.label ?? params.name}</label>
            <input
                className="border-b-2 bg-gray-50 shadow focus:bg-gray-100 focus:border-amber-400 transition-all outline-none p-1 rounded-t-sm"
            required={params.requierd??true} min={params.min??0} max={params.max??999} type={params.type ?? "text"} name={params.name} id={params.name} value={params.data} onChange={(e)=>params.OnChange(e.target.value)}/>
        </div>
        {params.error && <p
            className="text-red-300 text-sm pt-2 "
        >{params.error}</p>}

    </div>
}
