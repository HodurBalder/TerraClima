<template>
    <div>
        <WeatherForm @weather-data="handleWeatherData" @weather-error="handleWeatherError" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import WeatherForm from '../components/weather/WeatherForm.vue';
const weatherData = ref(null);
const selectedProvider = ref('');
const error = ref('');

const handleWeatherData = (data, provider) => {
    weatherData.value = data;
    selectedProvider.value = provider;
    error.value = '';
};

const handleWeatherError = (errorMessage) => {
    error.value = errorMessage;
    weatherData.value = null;
};


</script>