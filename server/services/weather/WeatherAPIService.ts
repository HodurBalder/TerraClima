import { WeatherService } from './WeatherService';
import { useRuntimeConfig } from '#imports';

export class WeatherAPIService implements WeatherService {
  private apiKey: string;

  constructor() {
    // Cargar la API Key desde runtimeConfig
    const config = useRuntimeConfig();
    this.apiKey = config.public.apiKeyWeatherApi || '';

    
    if (!this.apiKey) {
      console.log('config', config);
      throw new Error('API Key de WeatherAPI no configurada.');
    }
  }

  async getWeather(latitude: number, longitude: number, date: string) {
    console.log('getWeather', this.apiKey, latitude, longitude, date);
    const url = `http://api.weatherapi.com/v1/history.json?key=${this.apiKey}&q=${latitude},${longitude}&dt=${date}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'Error al obtener los datos del clima');
      }

      const humidity = data.forecast.forecastday[0].day.avghumidity;

      const message = this.getSurvivalMessage(humidity);

      return {
        humidity: `${humidity}`,
        message,
        date,
      };
    } catch (error) {
      throw new Error(`Error al conectarse a WeatherAPI: ${error.message}`);
    }
  }

  private getSurvivalMessage(humidity: number): string {
    if (humidity > 50) {
      return 'Condiciones normales. La humedad es adecuada para el cultivo.';
    } else {
      return 'Peligro. La humedad es demasiado baja para el cultivo.';
    }
  }
}