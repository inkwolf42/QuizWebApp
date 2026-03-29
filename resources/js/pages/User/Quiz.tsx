import RadioChoiceListItem from '@/components/ChoiceListItem';
import QuizListItem from '@/components/QuizListItem';
import LogedIn from '@/layouts/LogedIn';
import { GameIF, QuizIF } from '@/lib/responseIF';
import { formatTime } from '@/lib/utils';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';


function getTime(startingTime:number){
    return Math.floor(Date.now()/1000)-startingTime;
}



export default function Quiz(
    {
        game,
        current_index,
        next,
        prev,
        targetUrl
    }:{
        game:GameIF,
        current_index:number,
        next:number,
        prev:number,
        targetUrl:string
    },
) {


    const current_quiz = game.quizez[current_index]

    const [time,setTime] = useState(getTime(game.startingTime));

    const form = useForm({
        choices:current_quiz.choices.map((choice)=>choice.selected),
        next:"",
        next_arg:-1,
        final:false
    });

    useEffect(()=>{
        if(form.data.final){
            form.post(targetUrl,{
                onSuccess:()=>form.reset(),
                preserveScroll:false,
                preserveState:false
            })
        }
    },[form.data])

    useEffect(()=>{
        const timer = setInterval(()=>{
            setTime(getTime(game.startingTime))
        },500)

        return () => clearInterval(timer)
    },[])


    function onSelectOne(value:number){
        form.setData((prev)=>{
            return{
                ...prev,
                choices:prev.choices.map((c,i)=>i==value)
            }
        })
    }
    function onSelectMultiple(value:number){
        form.setData((prev)=>{
            prev.choices[value] = !prev.choices[value]
            return prev;
        })
    }
    function onClear(){
        form.setData((prev)=>{
            return{
                ...prev,
                choices:prev.choices.map((c)=>false)
            }
        })
    }
    function onSubmit(nextArg:number = -1,nextUrl:string = "quiz"){
        form.setData(prev=>({...prev,next:nextUrl,next_arg:nextArg,final:true}))
    }


    return (
        <LogedIn title='QUIZ'>

        <div className='flex flex-row flex-1 max-h-[90%]'>
            <div className='flex flex-col gap-1 flex-1 overflow-y-scroll pb-16 pt-7 px-4 shadow'>
                {
                    game.quizez.map((v,i)=>{
                        return <QuizListItem
                            key={i}
                            index={i}
                            quiz={v}
                            curreent_index={current_index}
                            processing={form.processing}
                            onClick={onSubmit}
                        />
                    })
                }
            </div>
            <div className='flex flex-col gap-3 flex-4 justify-between p-5 '>
                <div className='flex flex-col gap-10 '>
                    <div className='flex flex-row justify-between items-center'>
                        <h1 className='font-bold text-2xl tracking-wide'>Q{current_index+1}. {current_quiz.question}</h1>
                        <h2>{formatTime(time)}</h2>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <h1 className='font-semibold text-lg'>Answers :</h1>
                        {
                            current_quiz.choices?.map((v,i)=>(
                                <RadioChoiceListItem
                                    key={i}
                                    index={i}
                                    choice={v}
                                    selected={form.data.choices[i]}
                                    onChange={current_quiz.has_multi_answer?onSelectMultiple:onSelectOne}
                                    type={current_quiz.has_multi_answer?"checkbox":"radio"}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className='flex flex-row justify-between items-stretch '>
                    <div>

                    {
                        prev!=-1 &&
                        (<button disabled={form.processing} onClick={(e)=>onSubmit(prev)} className='button-default bg-red-100 hover:bg-red-400 ' type="button">
                            Back
                        </button>)
                    }
                    </div>
                    <div className='flex flex-row gap-5'>
                        <button
                            onClick={(e)=>onClear()}
                            className='button-default bg-gray-100  hover:bg-yellow-400' type="button">
                            Clear
                        </button>
                        {
                            next==-1 ?
                            (<button onClick={(e)=>onSubmit(-1,"quiz.finish")} className='button-default bg-green-100 hover:bg-green-400 ' type="button">
                                Submit
                            </button>)
                            :
                            (<button disabled={form.processing} onClick={(e)=>onSubmit(next)} className='button-default bg-green-100 hover:bg-green-400 ' type="button">
                                Next
                            </button>)
                        }
                    </div>
                </div>
            </div>
        </div>
        </LogedIn>
    );
}
