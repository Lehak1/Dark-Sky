'use client';
import Image from "next/image";import Navbar from "./components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from 'date-fns';
import { convertktoC } from "@/utils/convertktoC";
import axios from "axios";
import Container from "./components/Container";
import Weathericon from "./components/Weathericon";
import { getDayornight } from "@/utils/getDayornight";
import Features from "./components/Features";
import WeatherDetails from "./components/WeatherDetails";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import { fromUnixTime } from 'date-fns';
interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainWeatherInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface WindInfo {
  speed: number;
  deg: number;
  gust: number;
}

interface CloudsInfo {
  all: number;
}

interface SysInfo {
  pod: string;
}

interface ForecastData {
  dt: number;
  main: MainWeatherInfo;
  weather: Weather[];
  clouds: CloudsInfo;
  wind: WindInfo;
  visibility: number;
  pop: number;
  sys: SysInfo;
  dt_txt: string;
}

interface CityInfo {
  id: number;
  name: string;
  coord: {
      lat: number;
      lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastData[];
  city: CityInfo;
}


export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherForecast>({
    queryKey: ["repoData"],
    
    queryFn:async () =>
    {
      const {data}=await axios.get(
       `https://api.openweathermap.org/data/2.5/forecast?q=Faridabad&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
      );
      
    return data;

  }
});
const firstData=data?.list[0];

console.log("data",data)

const uniqueDates = [
  ...new Set(
    data?.list.map(
      (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
    )
  )
];

const firstDataForEachDate = uniqueDates.map((date) => {
  return data?.list.find((entry) => {
    const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
    const entryTime = new Date(entry.dt * 1000).getHours();
    return entryDate === date && entryTime >= 6;
  });
});

  if (isLoading) 
  return(
<div className="flex items-center min-h-screen justify-center">
 <p className="animate-bounce">Loading...</p>
 </div>
  );
  if (error) return 'An error has occurred: ' + error.message
  return (
    <div className="flex flex-col gap-4 min-h-screen ">
   <Navbar />
   <main className="px-3  mx-auto flex flex-col gap-9  w-full  pb-10 pt-4 ">
<section className="space-y-4">
  <div className="space-y-2">
<h2 className="flex flex-row gap-1 py-5 px-5 text-2xl">
  <p> {format(parseISO(firstData?.dt_txt ?? ""),"EEEE")}</p>
<p>({format(parseISO(firstData?.dt_txt ?? ""),"dd.MM.yyyy")})</p>
</h2>
  </div>

<Container className=" gap-10 px-6 items-center">
<div className="flex flex-col px-4">
<span className="text-5xl">
{convertktoC(firstData?.main.temp ?? 0)}°
</span>
<p className="text-xs space-x-1 whitespace-nowrap">
  <span>Feels like </span>
 <span>{convertktoC(firstData?.main.feels_like ?? 0)}°</span>
</p>
<p>
<span>{convertktoC(firstData?.main.temp_min ?? 0)}°↓{" "}</span>
<span>{" "}{convertktoC(firstData?.main.temp_max ?? 0)} °↑</span>
</p>
</div>
<div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
{data?.list.map((d,index) =>(
  <div key={index} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
    <p className="whitespace-nowrap">
      {format(parseISO(d.dt_txt),"h:m a")}
    </p>
  <Weathericon iconName={getDayornight(d.weather[0].icon,d.dt_txt)}  />

    <p>
    {convertktoC(d?.main.temp ?? 0)}°
      </p>
</div>
))}
</div>
</Container>
<div className="flex gap-4 py-3">
<Container className="px-4 w-fit justify-center items-center flex-col" > 
<p>{firstData?.weather[0].description ?? ""}</p>
<Weathericon iconName={getDayornight(firstData?.weather[0].icon ?? "",firstData?.dt_txt ?? "")}/>
</Container>
<Container className="bg-amber-200 gap-6 px-6 overflow-x-auto">
<Features humidity={`${firstData?.main.humidity}%`} visability={`${firstData?.visibility ?? ""}`} airPressure={`${firstData?.main.pressure}hpa`} sunrise={`${data?.city.sunrise}`} sunset={`${data?.city.sunset}`} windSpeed={`${firstData?.wind.speed}`} />
</Container>
  </div>

</section>
<section className="flex w-full flex-col gap-4  ">
  <p className="text-2xl">Forecast (7 Days)</p>
  {firstDataForEachDate.map((d,i) =>(
    <WeatherDetails key={i}
    description={d?.weather[0].description ?? ""}
    Weathericon={d?.weather[0].icon ?? "01d"}
    date={d?.dt_txt ? format(parseISO(d.dt_txt), "dd.MM") : ""}
    day={d?.dt_txt ? format(parseISO(d.dt_txt), "EEEE") : ""}
    
feels_like={d?.main.feels_like ?? 0}
                  temp={d?.main.temp ?? 0}
                  temp_max={d?.main.temp_max ?? 0}
                  temp_min={d?.main.temp_min ?? 0}
                  airPressure={`${d?.main.pressure} hPa `}
                  humidity={`${d?.main.humidity}% `}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise ?? 1702517657),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(data?.city.sunset ?? 1702517657),
                    "H:mm"
                  )}
                  visability={`${metersToKilometers(d?.visibility ?? 10000)} `}
                  windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
    
    />
  ))}
  
</section>

   </main>
    </div>
  );
}


