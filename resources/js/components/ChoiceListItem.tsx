import { ChoiceIF } from "@/lib/responseIF";




export default function ChoiceListItem({choice,selected,index,onChange,type}:{
    choice:ChoiceIF,
    index:number,
    selected:boolean,
    onChange:(value:any)=>void,
    type:"radio"|"checkbox"
}) {
    return <label className="flex flex-row gap-4 cursor-pointer" >
        <input type={type} name="answer" value={index} checked={selected} onChange={(e)=>onChange(e.target.value)}/>
        <span>{choice.answer}</span>
    </label>

}
