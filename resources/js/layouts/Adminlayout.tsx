import { Link, router } from "@inertiajs/react";
import { PropsWithChildren } from "react";


export default function AdminNavBar({page}:{
    page:'quizzes'|'categories'|'profile',
}) {

    function onLogout(){
        router.post("/admin_logout")
    }

    return(
        <div className="flex flex-row gap-10">
            <Link className={`title text-2xl ${page=="quizzes"?"text-black" : "text-blue-200 hover:text-blue-400"}`}>Quizzes</Link>
            <Link className={`title text-2xl ${page=="categories"?"text-black" : "text-blue-200 hover:text-blue-400"}`}>Categories</Link>
            <Link className={`title text-2xl ${page=="profile"?"text-black" : "text-blue-200 hover:text-blue-400"}`}>Profile</Link>
        </div>
    )
}
