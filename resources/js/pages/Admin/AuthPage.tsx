import LabeldInput from "@/components/LabeledInput";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function AuthPage({targetUrl}:{targetUrl:string}) {
    // const [confirmPassword,setConfirmPassword] = useState({
    //     value:"",
    //     error:""
    // })
    const {data,setData,post,errors} = useForm({
        name:"",
        password:"",
        credentials:""
    });

    function SetProperty(field:string,value:string){
        setData(prev=>({
            ...prev,
            [field]:value
        }))
    }

    function Submit(e:any) {
        e.preventDefault()
        // alert("nn")
        // if(data.password!==confirmPassword.value){
        //     setConfirmPassword(prev=>({...prev,error:"Passwords are not the same"}))
        //     return;
        // }
        post(targetUrl)
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={Submit} className="bubble bg-gray-50 p-5 max-w-3xl md:w-5/6 w-full mx-5 md:m-auto my-auto flex flex-col sm:gap-10 gap-15">
                <h1 className="title title-big">Login Page</h1>
                <div className="flex flex-col gap-5 md:mx-20 mx-5 ">

                <LabeldInput
                    name="name"
                    data={data.name}
                    OnChange={(value:string)=>SetProperty("name",value)}
                    label="Name : "
                    error={errors.name}
                    requierd
                    labelsize="flex-4"
                />
                <LabeldInput
                    name="password"
                    data={data.password}
                    OnChange={(value:string)=>SetProperty("password",value)}
                    label="Password : "
                    error={errors.password}
                    type="password"
                    requierd
                    labelsize="flex-4"
                />
                {/* <LabeldInput
                    name="confirm_password"
                    data={confirmPassword.value}
                    OnChange={(value:string)=>setConfirmPassword(prev=>({error:"",value:value}))}
                    label="Confirm Password : "
                    error={confirmPassword.error}
                    type="password"
                    requierd
                    labelsize="flex-3"
                /> */}
                </div>

                <div className="flex flex-col-reverse items-end">
                    <p
                        className="text-red-300 text-sm pt-2"
                    >{errors.credentials}</p>
                    <button className="button-default ml-auto bg-amber-200 hover:bg-amber-300 title text-xl hover:text-white" type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}
