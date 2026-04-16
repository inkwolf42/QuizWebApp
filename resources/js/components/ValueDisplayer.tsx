

export default function ValueDisplayer({label,value,end}:{
    label:string,
    value:any,
    end?:boolean
}) {
    return <div className="flex flex-row justify-between items-center z-30 ">
                <h1 className="flex-1 title text-xl text-start">{label}</h1>
                <h2 className={`flex-1 ${end?"text-end":"text-start"} text-xl `}>{value}</h2>
            </div>

}
