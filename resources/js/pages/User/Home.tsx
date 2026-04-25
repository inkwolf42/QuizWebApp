import LabeldInput from '@/components/LabeledInput';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { FormEvent, SyntheticEvent } from 'react';


export default function Home({targetUrl}:{targetUrl:string}) {
    const { data, setData, post, processing, errors } = useForm({
        "name":""
    })


    function submit(e:SyntheticEvent){
        e.preventDefault();
        post(targetUrl);
    }

    return (
        <div className='page-default '>

            <h1 className='title title-big'>Home</h1>

            <div className='flex flex-col'>
                <h2 className='title text-2xl ml-4 mr-auto border-b-2'>About</h2>
                <p className='bubble bg-gray-50 mt-2'>
                    Lorem ipsum dolor, sit amet <Link className='cursor-text' href={"admin_login_page"}>consectetur</Link> adipisicing elit. Similique aperiam qui laborum deserunt molestiae autem blanditiis, voluptate nisi velit expedita obcaecati inventore aliquam architecto, repellat debitis optio. Commodi, doloribus quia!
                </p>
            </div>


            <div className='flex flex-col'>
                <h2 className='title text-2xl ml-4 mr-auto border-b-2'>About</h2>
                <p className='bubble bg-gray-50 mt-2'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quidem deserunt accusamus, voluptate voluptates recusandae deleniti laudantium. Earum tempora dolores distinctio commodi nesciunt eveniet vero debitis molestiae, a dolorem cupiditate.
                </p>
            </div>

            <form className='flex flex-col flex-1 items-center justify-center' onSubmit={submit}>
                <h1 className='title text-2xl mx-auto border-b-2'>
                    Login
                </h1>
                <div className='flex flex-col items-end gap-5 pt-7'>
                    <LabeldInput
                        name={'username'}
                        data={data.name}
                        OnChange={(v)=>{setData({'name':v})}}
                        label='Username '
                        error={errors.name}
                        />
                    <button className='bg-red-400 hover:bg-red-200 transition-colors p-1 rounded-sm font-bold uppercase text-white' type="submit" disabled={processing}>Login</button>
                </div>
            </form>
        </div>
    );
}
