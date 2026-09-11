import { CorridorStation } from '../types';

export const CORRIDOR_STATIONS: CorridorStation[] = [
  {
    id: "st-1",
    station: "Anand Vihar, Delhi",
    state: "Delhi NCR",
    lat: 28.6469,
    lon: 77.3160,
    pm25: 382,
    pm10: 512,
    no2: 74,
    wind_speed: 1.4,
    wind_dir: 295,
    status: 'Critical'
  },
  {
    id: "st-2",
    station: "Civil Lines, Jalandhar",
    state: "Punjab",
    lat: 31.3256,
    lon: 75.5792,
    pm25: 215,
    pm10: 310,
    no2: 45,
    wind_speed: 3.2,
    wind_dir: 310,
    status: 'Severe'
  },
  {
    id: "st-3",
    station: "Sector 62, Noida",
    state: "Uttar Pradesh",
    lat: 28.6258,
    lon: 77.3648,
    pm25: 340,
    pm10: 460,
    no2: 68,
    wind_speed: 1.2,
    wind_dir: 290,
    status: 'Critical'
  },
  {
    id: "st-4",
    station: "Rohtak Central, Rohtak",
    state: "Haryana",
    lat: 28.8955,
    lon: 76.6066,
    pm25: 290,
    pm10: 410,
    no2: 52,
    wind_speed: 2.1,
    wind_dir: 305,
    status: 'Severe'
  },
  {
    id: "st-5",
    station: "Industrial Zone, Durgapur",
    state: "West Bengal",
    lat: 23.5204,
    lon: 87.3119,
    pm25: 195,
    pm10: 280,
    no2: 61,
    wind_speed: 2.5,
    wind_dir: 140,
    status: 'Moderate'
  }
];
