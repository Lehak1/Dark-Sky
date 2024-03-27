import React from 'react'
import { FaSearch } from "react-icons/fa";
import { cn } from '@/utils/cn';
type Props = {
    className?:string;
value:string;
onChange:React.ChangeEventHandler<HTMLInputElement> | undefined;
onSubmit:React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function Searchbox(props: Props) {
  return (
    <div >
        <form onSubmit={props.onSubmit}
        className={cn("flex relative items-center justify-center h-10",props.className)}>
        <input type="text" 
        onChange={props.onChange}
        value={props.value}
        placeholder='search location' className="w-[230px] h-full"/>
       
        <button className='bg-blue-600 text-white h-full w-9'>
        <FaSearch className='text-xl' />
        </button>
        
        </form>
    </div>
  )
}