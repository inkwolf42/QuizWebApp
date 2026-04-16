import { Link, router } from "@inertiajs/react";
import { PropsWithChildren } from "react";


export default function AdminNavBar({page}:{
    page:'quizzes'|'categories'|'profile'|'records',
}) {

    function onLogout(){
        router.post("/admin_logout")
    }

    return(
        <div className="flex flex-row gap-10 overflow-x-scroll py-5">
            <Link href={page!="quizzes" ? route("admin.dashboard") : "#"} className={`title text-2xl ${page=="quizzes"?"text-black" : "text-blue-200 hover:text-blue-400"}`}>Quizzes</Link>
            <Link href={page!="categories" ? route("admin.dashboard.categories") : "#"} className={`title text-2xl ${page=="categories"?"text-black" : "text-blue-200 hover:text-blue-400"}`}>Categories</Link>
            <Link href={page!="records" ? route("admin.dashboard.records") : "#"} className={`title text-2xl ${page=="records"?"text-black" : "text-blue-200 hover:text-blue-400"}`}>Records</Link>
            <Link href={page!="profile" ? route("admin.dashboard.profile") : "#"} className={`title text-2xl ${page=="profile"?"text-black" : "text-blue-200 hover:text-blue-400"}`}>Profile</Link>
        </div>
    )
}
