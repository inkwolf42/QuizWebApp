import AdminNavBar from "@/layouts/Adminlayout";
import LogedIn from "@/layouts/LogedIn";

export default function Categories() {
    return (
        <LogedIn title="Admin Dashboard" isAdmin>
            <AdminNavBar page="categories"/>
        </LogedIn>
    );
}
