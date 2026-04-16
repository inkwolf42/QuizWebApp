import IconPicker from "@/components/IconSelector";
import LabeldInput from "@/components/LabeledInput";
import LogedIn from "@/layouts/LogedIn";
import { getIcon, getIconValue, iconValue } from "@/lib/iconList";
import { CategoryIF } from "@/lib/responseIF";
import { getContrastColor, getOpositContrastColor } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { HexColorPicker } from "react-colorful";

export default function CategoryEdit({category}:{category:CategoryIF}) {
    const {data,setData,errors,put} = useForm({
        "name":category.name,
        "icon":category.icon,
        "color":category.color,
    });



    const SetProperty = (property:string,value:string)=>setData(prev=>({...prev,[property]:value}))

    function onSubmit(e:any){
        e.preventDefault();
        put(route("admin.dashboard.categories.update",category.id))
    }

    return (
            <LogedIn title="Category Create" isAdmin>
                <div className="flex flex-col items-stretch mt-10 p-5 w-3/4 mx-auto gap-12 ">
                    <header className="mb-10">
                        <button onClick={()=>window.history.back()} className="">
                            <ArrowLeft size={48} color="gray" className="shadow rounded-2xl hover:bg-amber-300 transition-colors"/>
                        </button>
                        <h1 className="title title-big  ">Categoryy Details</h1>
                    </header>
                    <form className="flex flex-col text-2xl gap-10 transition-all" onSubmit={onSubmit}>
                        <LabeldInput
                            name="name"
                            data={data.name}
                            OnChange={(value:string)=>SetProperty("name",value)}
                            label="Name : "
                            error={errors.name}
                            requierd
                            labelsize="flex-10"
                        />
                        <div className="flex md:flex-row flex-col gap-5">
                            <label htmlFor="icon-selector" className="flex-1 font-bold ">Icon : </label>
                            <div className="flex-1">
                                <IconPicker
                                    value={getIconValue(data.icon)}
                                    onChange={(value:iconValue)=>SetProperty("icon",value.name)}
                                />
                            </div>
                        </div>
                        <div className="flex md:flex-row flex-col-reverse md:items-start items-center gap-5">
                            <div className="flex-1 flex flex-row gap-5 font-bold ">
                                <label >Color :</label>
                                <h3 className={`bg-${getContrastColor(data.color)} transition-colors border w-36 text-center h-fit p-1 rounded`} style={{ color: data.color }}>{data.color}</h3>
                            </div>
                            <HexColorPicker color={data.color} onChange={(value)=>SetProperty("color",value)} />
                        </div>
                        <div className="flex flex-row justify-end">
                            <button type="submit" className="button-default bg-amber-100 hover:bg-amber-300 font-bold">Submit</button>

                        </div>
                    </form>
                </div>
            </LogedIn>
    );
}
