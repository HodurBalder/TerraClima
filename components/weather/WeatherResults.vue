<template>
    <div v-if="weatherData" class="mt-6 p-4 bg-card rounded-lg shadow-sm border">
        <h2 class="text-2xl font-bold mb-4">Resultados del Clima</h2>

        <div class="grid grid-cols-1 md:grid-cols-1 gap-4">

            <div class="bg-background p-6 rounded-lg border shadow-md">
                <h3 class="text-xl font-semibold mb-4 text-center">Nivel de Humedad</h3>
                <h4 class="text-xl font-semibold mb-4 text-center">{{ props.weatherData.date }}</h4>

                <div class="flex flex-col items-center justify-center">

                    <div :class="humidityIconClasses">
                        <DropletIcon :class="['h-12 w-12', humidityColorClass]" />
                    </div>


                    <div class="mt-4 text-center">
                        <span class="text-4xl font-bold" :class="humidityColorClass">
                            {{ weatherData.humidity || 'N/A' }}%
                        </span>
                    </div>

                    <!-- Mensaje de estado -->
                    <div class="mt-2 text-center">
                        <span :class="humidityColorClass">{{ props.weatherData.message }}</span>
                    </div>

                    <!-- Barra de progreso visual -->
                    <div class="w-full mt-6 bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                        <div class="h-4 rounded-full transition-all duration-500" :class="humidityBarColorClass"
                            :style="{ width: `${weatherData.humidity || 0}%` }">
                        </div>
                    </div>

                    <div class="flex justify-between w-full mt-1 text-xs text-gray-500">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                    </div>
                </div>
            </div>


            <!-- Proveedor -->
            <div class="col-span-1 md:col-span-2 text-right text-xs text-muted-foreground">
                Datos proporcionados por {{ providerName }}
            </div>
        </div>

    </div>

    <div v-else-if="error" class="mt-6 p-4 bg-destructive/10 text-destructive rounded-lg">
        <AlertTriangleIcon class="h-5 w-5 inline mr-2" />
        {{ error }}
    </div>

</template>

<script setup>
import { computed } from 'vue';
import { DropletIcon, AlertTriangleIcon } from 'lucide-vue-next';
const props = defineProps({
    weatherData: {
        type: Object,
        default: null
    },
    provider: {
        type: String,
        default: ''
    },
    error: {
        type: String,
        default: ''
    }
});

const providerName = computed(() => {
    return props.provider;
});


// Determinar nivel de humedad
const humidityLevel = computed(() => {
    console.log('aqui', props.weatherData);
    const humidity = props.weatherData.humidity || 0;

    if (humidity >= 50) return 'high';
    if (humidity >= 35) return 'medium';
    return 'low';
});

// Clases de color basadas en el nivel de humedad
const humidityColorClass = computed(() => {
    switch (humidityLevel.value) {
        case 'high':
            return 'text-green-600';
        case 'medium':
            return 'text-amber-500';
        case 'low':
            return 'text-red-600';
        default:
            return 'text-gray-500';
    }
});

// Clases para el ícono de humedad
const humidityIconClasses = computed(() => {
    const baseClasses = 'rounded-full p-4 flex items-center justify-center';

    switch (humidityLevel.value) {
        case 'high':
            return `${baseClasses} bg-green-100`;
        case 'medium':
            return `${baseClasses} bg-amber-100`;
        case 'low':
            return `${baseClasses} bg-red-100`;
        default:
            return `${baseClasses} bg-gray-100`;
    }
});

// Clases para la barra de progreso
const humidityBarColorClass = computed(() => {
    switch (humidityLevel.value) {
        case 'high':
            return 'bg-green-600';
        case 'medium':
            return 'bg-amber-500';
        case 'low':
            return 'bg-red-600';
        default:
            return 'bg-gray-500';
    }
});


</script>