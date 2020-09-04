import { Weather } from "../Type/Types";

const API_KEY = '78f0192e7212dcab6fea345f9592db02'

export function getWeather<Weather>(array: [number, number]) {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${array[0]}&lon=${array[1]}&appid=${API_KEY}&units=metric&lang=pt_br`)
    .then(res => res.json())
    .then(data => (data))
  }
