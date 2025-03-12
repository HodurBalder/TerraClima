import { WeatherService } from './WeatherService';

export class OpenMeteoService implements WeatherService {

  async getWeather(latitude: number, longitude: number, date: string) {
    console.log('getWeather', latitude, longitude, date);
    // Construir la URL de la API
    const url = `http://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${date}&end_date=${date}&hourly=relative_humidity_2m`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'Error al obtener los datos del clima');
      }

      const humidity = data.hourly.relative_humidity_2m[0];

      const message = this.getSurvivalMessage(humidity);
      const dateTemp = new Date(date);
      dateTemp.setFullYear(dateTemp.getFullYear() + 62);
      const dateApocalypse = dateTemp.toISOString().split('T')[0];

      return {
        humidity: `${humidity}`,
        message,
        date: dateApocalypse,
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