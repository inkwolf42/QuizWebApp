import { Link } from "@inertiajs/react";

export default function PageLink({label,url}:{label:string|number,url?:string}) {
    return url!=null && (
        <Link href={url} className={`${url!="" && "text-blue-400 underline"} `}>
            {label}
        </Link>
    );
}
