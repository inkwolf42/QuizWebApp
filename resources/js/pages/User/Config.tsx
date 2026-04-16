import CategoryGridItem from '@/components/CategoryGridItm';
import LabeldInput from '@/components/LabeledInput';
import LogedIn from '@/layouts/LogedIn';
import { CategoryIF, UserIF } from '@/lib/responseIF';
import { Head, useForm } from '@inertiajs/react';
import { SyntheticEvent, useEffect, useState } from 'react';

export default function Config({Categories,targetUrl,user}:{user:UserIF,targetUrl:string,Categories:Array<CategoryIF>}) {
    const {data,setData,post,errors} = useForm({
        selectedCatigories:[] as Array<number>,
        questions:10,
        negative:false,
        limitedTime:-1
    });

    const [time,setTime] = useState({
        "hours":0,
        "minutes":10,
        "seconds":0,
    })

    const [first,setFirst] = useState(true)

    useEffect(()=>{
        if(first){
            setFirst(false)
            return
        }
        let value = time.hours*3600+time.minutes*60+time.seconds;
        setData("limitedTime",value)
    },[time])

    function onSelect(value:number){
        let d;
        if (data.selectedCatigories.includes(value)){
            d = data.selectedCatigories.filter((v,i)=>v!=value)
        }else{
            d = data.selectedCatigories
            d.push(value)
        }
        setData({
            ...data,
            selectedCatigories:d,
        })
    }

    function submit(e:SyntheticEvent){
        e.preventDefault()
        post(targetUrl,{
            onError:(errors)=>{
                console.error(errors);
            }
        })
    }



    return (
        <LogedIn title='CONFIG'>

            <form onSubmit={submit} className='grow flex flex-col gap-1 mt-7 mx-auto w-10/12 mb-30 '>

            <h2 className='title  text-3xl'>Categories</h2>
            <div className='grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 bg-gray-50 bubble grow max-h-[69vh] my-5 place-items-start gap-5 md:p-5 p-2  overflow-scroll'>

            {
                Categories.map(catgory => {
                    return <CategoryGridItem
                        key={catgory.id}
                        selected={data.selectedCatigories.includes(catgory.id)}
                        category={catgory}
                        onClick={onSelect}
                    />
                })
            }
            </div>

            <div className='flex flex-col gap-14 my-10'>


            <div className='text-2xl'>

            <LabeldInput
                name={'qestions'}
                label='Number of QUIZs :'
                type='number'
                data={data.questions}
                OnChange={(v)=>setData(prev=>({...prev,questions:Number.parseInt(v)}))}
                max={50}
                min={1}
                error={errors.questions}
                labelsize='flex-20'
            />
            </div>

            <label className='font-bold flex flex-row gap-8 '>
                <div  className='flex-2 text-2xl'>Negative System : </div>
                <div className='flex-1 '>
                    <input type="checkbox" className='h-8 aspect-square' checked={data.negative} onClick={()=>setData(prev=>({...prev,negative:!prev.negative}))} />

                </div>
            </label>

            <div className='flex flex-col gap-5'>
                <label className='font-bold flex flex-row gap-8 '>
                    <div  className='flex-2 text-2xl'>Limited Time : </div>
                    <div className='flex-1 '>
                        <input type="checkbox" className='h-8 aspect-square' checked={data.limitedTime!=-1} onClick={()=>setData(prev=>({...prev,limitedTime:prev.limitedTime==-1?10:-1}))} />
                    </div>
                </label>
                <div className={`flex flex-row gap-8 ${data.limitedTime==-1 && "hidden"}`}>
                <div className='md:flex-2 flex-1 '></div>
                <div className="flex-1">
                    <div className='flex gap-2 items-center bg-gray-200 shadow rounded-2xl w-fit p-2'>

                    <input
                        type="number"
                        min="0"
                        max="23"
                        className="w-16 bg-gray-100 shadow p-2 rounded"
                        onChange={(e) => setTime(prev=>({...prev,"hours": parseInt(e.target.value)}))}
                        value={time.hours}
                        />

                    :

                    <input
                        type="number"
                        min="0"
                        max="59"
                        className="w-16 bg-gray-100 shadow p-2 rounded"
                        onChange={(e) => setTime(prev=>({...prev,"minutes": parseInt(e.target.value)}))}
                        value={time.minutes}
                        />

                    :

                    <input
                        type="number"
                        min="0"
                        max="59"
                        className="w-16 bg-gray-100 shadow p-2 rounded"
                        onChange={(e) => setTime(prev=>({...prev,"seconds": parseInt(e.target.value)}))}
                        value={time.seconds}
                        />

                    </div>
                    </div>
                </div>
            </div>
            </div>

            <div className='flex flex-row justify-end items-center mb-10'>
                <button className='button-default bg-amber-100 hover:bg-amber-300 uppercase font-bold tracking-widest text-xl hover:text-white' type="submit">Start</button>
            </div>
            </form>
        </LogedIn>
    );
}
