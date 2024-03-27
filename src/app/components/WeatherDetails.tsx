import React from 'react'
import Container from './Container'
import Weathericon from './Weathericon'
import { getDayornight } from '@/utils/getDayornight'
import Features, { weatherdetailprops } from './Features'
import { convertktoC } from '@/utils/convertktoC'


export interface WeatherDetailsProps extends weatherdetailprops {
Weathericon:string;
date:string;
day:string;
temp:number;
feels_like:number;
temp_min:number;
temp_max:number;
description:string;

}


export default function WeatherDetails(props: WeatherDetailsProps) {
  return (
  <Container>
   <section className='flex gap-4 items-center px-4 py-2'>
<div className='flex flex-col gap-1 items-center'>
    <Weathericon iconName={props.Weathericon}/>
    <p>{props.date}</p>
    <p>{props.day}</p>
</div>
<div className='flex flex-col px-4'>
<span>{convertktoC(props.temp ?? 0)}°</span>

<p className='text-xs spaxe-x-1 whitespace-nowrap'>
<span>Feels like</span>
    <span>{convertktoC(props.feels_like ?? 0)}°</span>
  </p>
    <span>{props.description?? 0}</span>
</div>
   </section>

   <section className='overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10'>
<Features {...props}/>
   </section>
  </Container>
  )
}