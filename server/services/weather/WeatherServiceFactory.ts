import { WeatherService } from './WeatherService';
import { WeatherAPIService } from './WeatherAPIService';
import { OpenMeteoService } from './OpenMeteoService';

export class WeatherServiceFactory {
  static createService(provider: string): WeatherService {
    switch (provider) {
      case 'weatherapi':
        return new WeatherAPIService();
      case 'open-meteo':
        return new OpenMeteoService();

      default:
        throw new Error(`Proveedor no soportado: ${provider}`);
    }
  }
}