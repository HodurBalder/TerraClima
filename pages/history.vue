<template>
    <div>

        <WeatherHistory @load-weather="loadFromHistory" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import WeatherHistory from '../components/weather/WeatherHistory.vue';
import useWeatherStorage from '../composables/weather/useWeatherStorage';


</script>