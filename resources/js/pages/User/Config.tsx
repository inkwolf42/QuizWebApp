import CategoryGridItem from '@/components/CategoryGridItm';
import LabeldInput from '@/components/LabeledInput';
import LogedIn from '@/layouts/LogedIn';
import { CategoryIF, UserIF } from '@/lib/responseIF';
import { Head, useForm } from '@inertiajs/react';
import { SyntheticEvent } from 'react';

export default function Config({Categories,targetUrl,user}:{user:UserIF,targetUrl:string,Categories:Array<CategoryIF>}) {
    const {data,setData,post,errors} = useForm({
        selectedCatigories:[] as Array<number>,
        questions:10
    });


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

            <form onSubmit={submit} className='grow flex flex-col mt-7 w-2/3 mx-auto mb-30 '>

            <h2 className='title text-2xl'>Categories</h2>
            <div className='grid grid-cols-4 bg-gray-50 bubble grow max-h-[70vh] my-5 place-items-start gap-5 p-5  overflow-scroll'>

            {
                Categories.map(catgory => {
                    return <CategoryGridItem
                        id={catgory.id}
                        key={catgory.id}
                        selected={data.selectedCatigories.includes(catgory.id)}
                        name={catgory.name}
                        onClick={onSelect}
                    />
                })
            }
            </div>

            <div className='flex flex-row justify-between items-center'>

                <LabeldInput
                    name={'qestions'}
                    label='Number of QUIZs :'
                    type='number'
                    data={data.questions}
                    OnChange={(v)=>setData(prev=>({...prev,questions:Number.parseInt(v)}))}
                    max={20}
                    // min={5}
                    error={errors.questions}
                />

                <button className='button-default bg-amber-100 hover:bg-amber-300 uppercase font-bold tracking-widest text-xl hover:text-white' type="submit">Start</button>
            </div>
            </form>
        </LogedIn>
    );
}
