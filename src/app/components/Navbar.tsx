'use client'
import axios from 'axios'; 
import { use, useState } from 'react';
import React from 'react'
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";
import Searchbox from './Searchbox';
import { error } from 'console';
type Props = {}

export default function Navbar({}: Props) {

  const [city,setCity]=useState("");
  const [error,setError]=useState("");
  const[suggestions,setSuggestions]=useState<string[]>([]);
//storing array of suggestions
  const[showsuggestions,setShowsuggestions]=useState(false);

//one is storing suggestions , one is showing

async function handleInputchange(value:string){
  setCity(value);
  if(value.length >= 3){
try{
const response=await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
const suggestions=response.data.list.map((item:any) => item.name);
setSuggestions(suggestions);
setError('');
setShowsuggestions(true);


}
catch(error){
setSuggestions([]);
setShowsuggestions(false);
}

}
else{
  setSuggestions([]);
setShowsuggestions(false);
}
}

function handleSuggestionClick(value:string){
  setCity(value);
  setShowsuggestions(false);
}

function handleSubmitSearch(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(suggestions.length == 0){
    setError("Location not Found");
  }
  else{
    setError("");
    setShowsuggestions(false);
  }
}







  return (
    <nav className='shadow-sm bg-gray-200 top-0 left-0 z-50 sticky text-gray-700 h-16'>
    <div className='h-[80px] flex flex-row px-3 mx-auto max-w-7xl w-full justify-between items-center'>
      <p className="flex items-center justify-center gap-2">
      <h2 className='px-2 py-2 text-3xl'>weather </h2>
      <IoSunny className='text-yellow-300 text-3xl'/>
    </p>
    <section className='flex gap-2 items-center'>
    <FaLocationCrosshairs />
   <FaLocationDot />
   <h1>India</h1>
<div className="relative">



   <Searchbox value={city} onChange={(e) =>handleInputchange(e.target.value)} onSubmit={handleSubmitSearch}
   />
   <SuggestionBox
            showSuggestions={false} {...{
              showsuggestions,
              suggestions,
              handleSuggestionClick,
              error
            }} />
   </div>
    </section>
    </div>
    </nav>
  )
}

function SuggestionBox({
showSuggestions,
suggestions,
handleSuggestionClick,
error
}:{
  showSuggestions:boolean;
suggestions:string[];
handleSuggestionClick:(item:string) => void;
error:string;
}){

  return(
    <>
    {((showSuggestions && suggestions.length>1) || error) && (
  <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
{error && suggestions.length< 1 && (
  <li className="text-red-500 p-1">{error}</li>
  )}
{suggestions.map((item,i) =>(
<li key={i}
onClick={() => handleSuggestionClick(item)}
  className="cursor-pointer p-1 rounded hover:bg-gray-200">
{item}</li>
))}
  </ul>
  )}
  </>
  );
}  
