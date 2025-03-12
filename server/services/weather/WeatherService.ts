export interface WeatherService {
    getWeather(latitude: number, longitude: number, date: string): Promise<{
        humidity: string;
        message: string;
        date: string;
    }>;
}