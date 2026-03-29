

export default function ValueDisplayer({label,value}:{
    label:string,
    value:any
}) {
    return <div className='flex flex-row justify-between'>
            <p>{label} : </p>
            <p>{value}</p>
        </div>

}
