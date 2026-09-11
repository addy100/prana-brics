import { CorridorStation } from '../types';

export async function fetchLiveStationTelemetry(station: CorridorStation): Promise<CorridorStation> {
  try {
    const aqUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${station.lat}&longitude=${station.lon}&current=pm2_5,pm10,nitrogen_dioxide,sulphur_dioxide,us_aqi&timezone=auto`;
    const wxUrl = `https://api.open-meteo.com/v1/forecast?latitude=${station.lat}&longitude=${station.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m&timezone=auto`;

    const [aqRes, wxRes] = await Promise.all([
      fetch(aqUrl).then(r => r.json()),
      fetch(wxUrl).then(r => r.json())
    ]);

    if (aqRes && aqRes.current) {
      if (aqRes.current.pm2_5 != null) station.pm25 = Math.round(aqRes.current.pm2_5);
      if (aqRes.current.pm10 != null) station.pm10 = Math.round(aqRes.current.pm10);
      if (aqRes.current.nitrogen_dioxide != null) station.no2 = Math.round(aqRes.current.nitrogen_dioxide);
    }

    if (wxRes && wxRes.current) {
      const speed = wxRes.current.wind_speed_10m || 2.1;
      const dir = wxRes.current.wind_direction_10m || 300;
      station.wind_speed = parseFloat(speed.toFixed(1));
      station.wind_dir = Math.round(dir);
    }

    if (station.pm25 > 120) station.status = 'Critical';
    else if (station.pm25 > 80) station.status = 'Severe';
    else if (station.pm25 > 40) station.status = 'Moderate';
    else station.status = 'Good';

    return station;
  } catch (err) {
    console.warn(`[PRANA Real-Time API] Telemetry fetch fallback for ${station.station}:`, err);
    return station;
  }
}
