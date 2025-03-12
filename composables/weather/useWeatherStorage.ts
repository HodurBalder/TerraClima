import { ref } from 'vue';

export default function useWeatherStorage() {
    const STORAGE_KEY = 'successful_weather_queries';
    const savedQueries = ref([]);
    
    // Cargar consultas
    const loadStoredQueries = () => {
        if (process.client) {
            savedQueries.value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        }
        return savedQueries.value;
    };
    
    // Guardar una consulta
    const saveQuery = (data, provider) => {
        if (process.client) {
            const existingQueries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            
            const newQuery = {
                data,
                provider
            };
            
            const updatedQueries = [newQuery, ...existingQueries].slice(0, 10);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQueries));
            
            // Actualizar el ref
            savedQueries.value = updatedQueries;
        }
    };
    
    return {
        savedQueries,
        loadStoredQueries,
        saveQuery
    };
}