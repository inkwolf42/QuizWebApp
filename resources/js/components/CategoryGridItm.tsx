import { getIcon } from "@/lib/iconList"
import { CategoryIF } from "@/lib/responseIF"

interface CategoryItemParams{
    category:CategoryIF
    onClick:(value:number)=>void
    selected:boolean
}


export default function CategoryGridItem(data:CategoryItemParams){
    const Icon = getIcon(data.category.icon);
    return <button
                type='button'
                onClick={()=>data.onClick(data.category.id)}
                className={`w-full ${data.selected && "bg-green-400"} bubble flex flex-col gap-2 cursor-pointer `}
                >
                <div className="aspect-square w-full rounded-2xl"
                style={{ backgroundColor: data.category.color }}
                >
                    <Icon color="white" className="w-full h-full md:p-7 p-2"/>
                </div>
                <p className="font-semibold md:text-lg text-sm capitalize truncate min-w-0">{data.category.name}</p>
            </button>
}
