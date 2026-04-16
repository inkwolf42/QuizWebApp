import LabeldInput from "@/components/LabeledInput";
import AdminNavBar from "@/layouts/AdminNavBar";
import LogedIn from "@/layouts/LogedIn";
import { useForm } from "@inertiajs/react";

export default function ProfilePage({name}:{name:string}) {
    const {data,setData,errors,post} = useForm({
        "name":name,
        "old_password":"",
        "password":"",
        "password_confirmation":"",
    });

    const SetProperty = (property:string,value:string)=>setData(prev=>({...prev,[property]:value}))

    function onSubmit(e:any){
        e.preventDefault();
        post(route("admin.dashboard.profile"))
    }

    return (
        <LogedIn title="Admin Dashboard" isAdmin>
            <div className="w-4/5 mx-auto py-5 flex flex-col gap-5">
            <AdminNavBar page="profile"/>

            <form className="flex flex-col mt-10 mb-20 gap-5 md:mx-30" onSubmit={onSubmit}>
                <h1 className="title title-big mb-10">Profile Details</h1>
                <LabeldInput
                    requierd
                    labelsize="flex-4"
                    data={data.name}
                    placeHolder={name}
                    name="name"
                    error={errors.name}
                    label="Name :"
                    OnChange={value=>SetProperty("name",value)}
                />
                <LabeldInput
                    requierd
                    labelsize="flex-4"
                    type="password"
                    name="old_password"
                    data={data.old_password}
                    error={errors.old_password}
                    label="Old Password :"
                    OnChange={value=>SetProperty("old_password",value)}
                />
                <LabeldInput
                    requierd
                    labelsize="flex-4"
                    type="password"
                    name="password"
                    data={data.password}
                    error={errors.password}
                    label="Password :"
                    OnChange={value=>SetProperty("password",value)}
                />
                <LabeldInput
                    requierd
                    labelsize="flex-4"
                    type="password"
                    name="password_confirmation"
                    data={data.password_confirmation}
                    error={errors.password_confirmation}
                    label="Password Confirmation :"
                    OnChange={value=>SetProperty("password_confirmation",value)}
                />
                <button type="submit" className="ml-auto w-full p-4 rounded-xl hover:text-white transition-colors bg-amber-200 hover:bg-amber-300 font-bold">Submit</button>

            </form>

            </div>
        </LogedIn>
    );
}
