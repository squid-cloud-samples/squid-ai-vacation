export type PackingItem = {
    id: string;
    item: string;
    imageUrl?: string;
    content: string;
    date: Date; // for now until Date works on ai functions
    done: boolean;
}

export type OneDayForecast = {
  maxtemp_c: number; // ex 30.4;
  maxtemp_f: number; // ex 86.8;
  mintemp_c: number; // ex 20.5;
  mintemp_f: number; // ex 68.9;
  avgtemp_c: number; // ex 25.1;
  avgtemp_f: number; // ex 77.2;
  maxwind_mph: number; // ex 10.3;
  maxwind_kph: number; // ex 16.6;
  totalprecip_mm: number; // ex 5.01;
  totalprecip_in: number; // ex 0.2;
  avgvis_km: number; // ex 8.8;
  avgvis_miles: number; // ex 5;
  avghumidity: number; // ex 75;
  condition: {
    text: string; // ex 'Moderate or heavy rain shower';
    icon: string; // ex '//cdn.weatherapi.com/weather/64x64/day/356.png';
    code: number; // ex 1243;
  };
  uv: number; // ex 6;
}

export type ResponseBody = {
  forecast: {
    forecastday: [
      {
        date: string;
        date_epoch: 1717200000;
        day: OneDayForecast;
        astro: {};
        hour: [
          {
            time_epoch: number; // ex 1717218000
            time: string; // ex '2024-06-01 00:00'
            temp_c: number; // ex 22.1
            temp_f: number; // ex 71.8
            is_day: number; // ex 0
            condition: {
              text: string; // ex 'Patchy rain possible'
              icon: string; // ex '//cdn.weatherapi.com/weather/64x64/night/176.png'
              code: number; // ex 1063
            };
            wind_mph: number; // ex 6.9
            wind_kph: number; // ex 11.1
            wind_degree: number; //ex 142
            wind_dir: string; // ex 'SE'
            pressure_mb: number; // ex 1014
            pressure_in: number; // ex 29.95;
            precip_mm: number; // ex 5.01;
            precip_in: number; // ex 0.2;
            humidity: number; // ex 88;
            cloud: number; // ex 29;
            feelslike_c: number; // ex 24.1;
            feelslike_f: number; // ex 75.4;
            windchill_c: number; // ex 22.1;
            windchill_f: number; // ex 71.8;
            heatindex_c: number; // ex 24.1;
            heatindex_f: number; // ex 75.4;
            dewpoint_c: number; // ex 19.8;
            dewpoint_f: number; // ex 67.7;
            will_it_rain: number; // ex 0;
            chance_of_rain: number; // ex 65;
            will_it_snow: number; // ex 0;
            chance_of_snow: number; // ex 0;
            vis_km: number; // ex 9.3;
            vis_miles: number; // ex 5;
            gust_mph: number; // ex 14.2;
            gust_kph: number; // ex 22.8;
            uv: number; // ex 1;
          },
        ];
      },
    ];
  };
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string; // ex 'America/Chicago'
    localtime_epoch: number;
    localtime: string; // ex '2024-05-13 13:27';
  };
}