import ValueDisplayer from '@/components/ValueDisplayer';
import { ResultIF } from '@/lib/responseIF';
import { formatTime } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';

interface GradeScale {
  letter: string;
  minMark: number;
  color: string; // Tailwind text or bg color
}

export const GRADING_SCALE: GradeScale[] = [
  { letter: 'A+', minMark: 95, color: 'emerald-500' },
  { letter: 'A',  minMark: 85, color: 'green-500' },
  { letter: 'B',  minMark: 75, color: 'blue-500' },
  { letter: 'C',  minMark: 65, color: 'yellow-500' },
  { letter: 'D',  minMark: 50, color: 'orange-500' },
  { letter: 'F',  minMark: 0,  color: 'red-500' },
];

const getGrade = (score: number): GradeScale => {
  // Finds the first grade where the score is >= the minimum mark
  return GRADING_SCALE.find(grade => score >= grade.minMark)
         || GRADING_SCALE[GRADING_SCALE.length - 1]; // Fallback to 'F'
};


export default function Result({result}:{result:ResultIF}) {



    const grade = getGrade(result.score);

    return (
        <div className='flex justify-center items-center h-screen bg-gray-200'>
            <div className='bg-white shadow flex flex-col gap-2 max-w-3xl w-9/12 py-10 md:px-20 px-5 rounded-2xl relative font-bold'>
                <h1 className='font-extrabold md:text-6xl text-5xl uppercase tracking-widest mx-auto my-15 pb-7 z-30'>Result</h1>
                <ValueDisplayer end label='Time' value={formatTime(result.time)}/>
                <ValueDisplayer end label='Score' value={`${result.score}/100`}/>
                <div className='text-green-400 mt-5'>
                    <ValueDisplayer end label='Correct' value={result.correct}/>
                </div>
                <div className='text-red-400'>
                    <ValueDisplayer end label='Worng' value={result.worng}/>
                </div>
                <div className='text-gray-400 mb-2'>
                    <ValueDisplayer end label='Not Answerd' value={result.notAnswred}/>
                </div>
                <div className='z-30'>
                    <Link href={"/config"} className='button-default mx-auto bg-amber-100 hover:bg-amber-400 font-extrabold tracking-widest hover:text-white'>
                        CONFIG
                    </Link>
                </div>
                <div className={`opacity-50 md:text-[8rem] text-9xl text-${grade.color} md:border-20 border-5 border-${grade.color}  rounded-full md:w-60 w-30 md:h-60 h-30 flex justify-center items-center font-extrabold absolute top-5 z-10 right-5 rotate-12`}>{grade.letter}</div>
            </div>
        </div>
    );
}
