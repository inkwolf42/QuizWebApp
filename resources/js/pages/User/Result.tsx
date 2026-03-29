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
  { letter: 'A+', minMark: 95, color: 'text-emerald-500' },
  { letter: 'A',  minMark: 85, color: 'text-green-500' },
  { letter: 'B',  minMark: 75, color: 'text-blue-500' },
  { letter: 'C',  minMark: 65, color: 'text-yellow-500' },
  { letter: 'D',  minMark: 50, color: 'text-orange-500' },
  { letter: 'F',  minMark: 0,  color: 'text-red-500' },
];

const getGrade = (score: number): GradeScale => {
  // Finds the first grade where the score is >= the minimum mark
  return GRADING_SCALE.find(grade => score >= grade.minMark)
         || GRADING_SCALE[GRADING_SCALE.length - 1]; // Fallback to 'F'
};


export default function Result({result}:{result:ResultIF}) {

    const scrore = Math.round(result.correct / (result.correct+result.worng+result.notAnswred))*100



    const grade = getGrade(scrore);

    return (
        <div className='flex justify-center items-center h-screen bg-gray-200'>
            <div className='bg-white shadow flex flex-col gap-2 p-10 rounded-2xl relative'>
                <h1 className='font-extrabold text-4xl uppercase tracking-widest mx-40 pb-7'>Result</h1>
                <ValueDisplayer label='Correct' value={result.correct}/>
                <ValueDisplayer label='Worng' value={result.worng}/>
                <ValueDisplayer label='Not Answerd' value={result.notAnswred}/>
                <ValueDisplayer label='Time' value={formatTime(result.time)}/>
                <ValueDisplayer label='Score' value={`${scrore}/100`}/>
                <div className=''>
                    <Link href={"/config"} className='button-default mx-auto bg-amber-100 hover:bg-amber-400 font-extrabold tracking-widest hover:text-white'>
                        CONFIG
                    </Link>
                </div>
                <h2 className={`opacity-50 text-[10rem] ${grade.color} font-extrabold absolute -top-10 right-10 rotate-12`}>{grade.letter}</h2>
            </div>
        </div>
    );
}
