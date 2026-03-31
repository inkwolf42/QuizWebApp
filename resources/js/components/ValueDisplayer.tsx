

export default function ValueDisplayer({label,value}:{
    label:string,
    value:any
}) {
    return <div className="flex flex-row justify-between items-center ">
                <h1 className="flex-1 title text-xl text-start">{label}</h1>
                <h2 className="flex-1  text-start text-xl ">{value}</h2>
            </div>

}
