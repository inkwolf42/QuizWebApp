import { router } from "@inertiajs/react";
import { PropsWithChildren } from "react";


export default function LogedIn({children,title,isAdmin=false}:PropsWithChildren<{
    title:string,
    isAdmin?:boolean
}>) {

    function onLogout(){
        if(isAdmin){
            router.post("/admin_logout")
        }else{
            router.post("/user_logout")
        }
    }

    return(
        <div className='h-dvh w-screen flex flex-col'>
            <header className='bg-gray-50 px-5 py-2 shadow-md flex flex-row justify-between items-center '>
                <h1 className='font-extrabold text-4xl tracking-wider uppercase'>
                    {title}
                </h1>
                <button onClick={onLogout} className="bg-red-400 hover:bg-red-200 transition-colors p-1 rounded-sm font-bold uppercase text-white">
                    Log Out
                </button>
            </header>
            {children}
        </div>
    )
}
