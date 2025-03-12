<template>
    <h3 class="text-xl font-semibold mb-4 text-center">Historial de Consultas</h3>
    <div class="full-page text-center">
        <NuxtLink to="/terra-clima">
            <Button class="w-50">Nueva Consulta</Button>
        </NuxtLink>
    </div>
    <div class="weather-history">
        <div v-if="queries.length === 0" class="no-history">
            No hay consultas guardadas
        </div>
        <ul v-else class="history-list">
            <li v-for="(query, index) in queries" :key="index" class="history-item">
                <div class="grid grid-cols-1 md:grid-cols-1 gap-4">

                    <div class="bg-background p-6 rounded-lg border shadow-md">
                        <h3 class="text-xl font-semibold mb-4 text-center">Nivel de Humedad</h3>
                        <h4 class="text-xl font-semibold mb-4 text-center">{{ formatDate(query.data.date) }}</h4>

                        <div class="flex flex-col items-center justify-center">

                            <div>
                                <DropletIcon :class="['h-12 w-12',]" />
                            </div>


                            <div class="mt-4 text-center">
                                <span class="text-4xl font-bold">
                                    {{ query.data.humidity || 'N/A' }}%
                                </span>
                            </div>

                            <!-- Mensaje de estado -->
                            <div class="mt-2 text-center">
                                <span>{{ query.data.message }}</span>
                            </div>

                        </div>
                    </div>


                    <!-- Proveedor -->
                    <div class="col-span-1 md:col-span-2 text-right text-xs text-muted-foreground">
                        Datos proporcionados por {{ query.provider }}
                    </div>
                </div>


            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useWeatherStorage from '../composables/weather/useWeatherStorage';

const { savedQueries, loadStoredQueries } = useWeatherStorage();
const queries = ref([]);

onMounted(() => {
    queries.value = loadStoredQueries();
    console.log('queries', queries.value[0]);
});


const emit = defineEmits(['load-weather']);

const loadWeatherData = (query) => {
    emit('load-weather', query.data, query.provider);
};

const formatDate = (value) => {
    if (!value) return '';

    const date = new Date(value);
    return date.toLocaleDateString('es-MX', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};
</script>

<style scoped>
.weather-history {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.history-list {
    list-style: none;
    padding: 0;
}

.history-item {
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 6px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.provider-badge {
    background-color: #e0f7fa;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.8em;
}

.history-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.temp {
    font-size: 1.2em;
    font-weight: bold;
}

.date {
    color: #666;
    font-size: 0.9em;
}

.load-btn {
    align-self: flex-end;
    padding: 5px 10px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.load-btn:hover {
    background-color: #0b7dda;
}

.no-history {
    color: #666;
    text-align: center;
    padding: 20px;
}
</style>