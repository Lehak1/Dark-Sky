export function getDayornight(
iconName:string,
dateTimeString:string
):string{
const hours=new Date(dateTimeString).getHours();
const isdaytime = hours >= 6 && hours < 18;
return isdaytime ? iconName.replace(/.$/,"d") :  iconName.replace(/.$/,"n") ;
}
