import RadioChoiceListItem from '@/components/ChoiceListItem';
import QuizListItem from '@/components/QuizListItem';
import LogedIn from '@/layouts/LogedIn';
import { GameIF, QuizIF } from '@/lib/responseIF';
import { colors, formatTime } from '@/lib/utils';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowBigLeft, ArrowLeft, MenuIcon, MoveLeft, X } from 'lucide-react';
import { useEffect, useState } from 'react';


function getTime(startingTime:number,limitedTime:number){
    if(limitedTime<0)
        return Math.floor(Date.now()/1000)-startingTime;
    else{
        let value = startingTime+limitedTime-Math.floor(Date.now()/1000)
        if (value<0){
            router.get(route("quiz.finish"));
        }
        return value;
    }
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
    var count = 0;

    const current_quiz = game.quizez[current_index]

    const [time,setTime] = useState(getTime(game.startingTime,game.limitedTime));

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
            setTime(getTime(game.startingTime,game.limitedTime))
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

    //Mobile List Button
    const [show,setShow] = useState(false)


    return (
        <LogedIn title='QUIZ'>

        <div className='flex flex-row flex-1 max-h-[95%] items-start relative'>
            {
                <div
                className={`${show ? "translate-x-0" : "-translate-x-full"} transition-all  flex flex-col gap-2 overflow-y-scroll pb-16  px-4 shadow top-0 left-0 absolute bg-gray-50 w-full h-full`}>
                    <div>
                        <button
                            onClick={()=>setShow(false)}
                        className=' ml-3 my-2 p-2 bg-gray-200 rounded shadow'>
                            <ArrowLeft/>
                        </button>
                    </div>
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

            }
            <div className='sm:flex flex-col gap-1 lg:flex-1 flex-2 overflow-y-scroll pb-16 pt-7 h-full px-4 shadow hidden'>
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
            <div className='flex flex-col gap-3 flex-4 justify-between p-5 h-full '>
                <div className='flex flex-col gap-1 '>
                    <div className='flex  flex-col-reverse items-start justify-between items-center '>
                        <h1 className='font-bold text-2xl tracking-wide'>Q{current_index+1}. {current_quiz.question}</h1>
                        <div className='flex flex-row justify-end w-full'>
                            <button
                                onClick={()=>setShow(true)}
                                className='sm:hidden  p-2 bg-gray-100 rounded shadow'
                            >
                                <MenuIcon/>
                            </button>
                            <h2 className='font-extrabold ml-auto text-3xl'>{formatTime(time)}</h2>
                        </div>

                    </div>

                    <h2 className={`${colors[current_quiz.difficulty]} mb-5 border-2  p-1 rounded-lg uppercase text-white font-extrabold text-sm w-36 text-center`}>
                        {current_quiz.difficulty}
                    </h2>
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
                <div className='flex flex-row gap-5 '>
                    <div className='flex-1'>

                    {
                        prev!=-1 &&
                        (<button disabled={form.processing} onClick={(e)=>onSubmit(prev)} className='button-default-sm w-full bg-red-100 hover:bg-red-400 ' type="button">
                            Back
                        </button>)
                    }
                    </div>
                    <button
                        onClick={(e)=>onClear()}
                        className='button-default-sm flex-1 bg-gray-100  hover:bg-yellow-400' type="button">
                        Clear
                    </button>
                    {
                        next==-1 ?
                        (<button onClick={(e)=>confirm("Are you Sure of your answers?") ? onSubmit(-1,"quiz.finish") : null} className='button-default-sm flex-1 bg-green-100 hover:bg-green-400 ' type="button">
                            Submit
                        </button>)
                        :
                        (<button disabled={form.processing} onClick={(e)=>onSubmit(next)} className='button-default-sm flex-1 bg-green-100 hover:bg-green-400 ' type="button">
                            Next
                        </button>)
                    }
                </div>
            </div>
        </div>
        </LogedIn>
    );
}
