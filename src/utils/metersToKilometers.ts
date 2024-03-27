export function metersToKilometers(input:number):string{
    const convert = input/1000;
    return `${convert.toFixed(0)}km`;
}