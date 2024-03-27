import React from 'react'
import { cn } from '@/utils/cn'
import Image from 'next/image'
type Props = {};

export default function Weathericon(props: React.HTMLProps<HTMLDivElement> & {iconName:string}) {
  return (
    <div {...props} className={cn("relative h-20 w-20")}>
<Image width={100} height={100} alt="weathericon" src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`} className="absolute h-full w-full"/>


    </div>
  )
}
