<template>
    <div>
        <div class="full-page text-center">
            <NuxtLink to="/history">
                <Button class="w-50">Historial</Button>
            </NuxtLink>
        </div>
        <WeatherForm @weather-data="handleWeatherData" @weather-error="handleWeatherError" />
        <WeatherResults v-if="weatherData || error" :weatherData="weatherData" :provider="selectedProvider" :error="error" @reset="resetForm" />

   
    </div>
</template>

<script setup>
import { ref } from 'vue';
import WeatherForm from '../components/weather/WeatherForm.vue';
import WeatherResults from '../components/weather/WeatherResults.vue';
import useWeatherStorage from '../composables/weather/useWeatherStorage';

const weatherData = ref(null);
const selectedProvider = ref('');
const error = ref('');
const STORAGE_KEY = 'successful_weather_queries';
const { saveQuery } = useWeatherStorage();


const handleWeatherData = (data, provider) => {
    weatherData.value = data;
    selectedProvider.value = provider;
    error.value = '';
    saveQuery(data, provider);

    // saveSuccessfulQuery(data, provider);

};

const handleWeatherError = (errorMessage) => {
    error.value = errorMessage;
    weatherData.value = null;
};

const saveSuccessfulQuery = (data, provider) => {
    // Obtener consultas existentes o inicializar un array vacío
    const existingQueries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    
    const newQuery = {
        data,
        provider
    };
    
    
    const updatedQueries = [newQuery, ...existingQueries];
    
    // Guardar en localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQueries));
};

</script>