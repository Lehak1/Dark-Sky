import React from 'react'
import { cn } from '@/utils/cn'


export default function Container(props:React.HTMLProps<HTMLDivElement>) {
    return (
        <div 
        {...props}
        className={cn("w-full flex py-4 shadow-sm bg-slate-100 ",props.className)}/>
      )
    }


  