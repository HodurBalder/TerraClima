<template>
    <div>
        <form @submit="onSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Campo Proveedor -->
                <FormField v-slot="{ componentField }" name="weatherProvider">
                    <FormItem>
                        <FormLabel>Proveedor del Clima</FormLabel>
                        <Select v-bind="componentField"
                            @update:modelValue="form.setFieldValue('weatherProvider', $event)" class="w-full">
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="Selecciona un proveedor" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="open-meteo">OpenMeteo</SelectItem>
                                <SelectItem value="weatherapi">WeatherAPI</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <!-- Campo Fecha -->
                <FormField v-slot="{ componentField }" name="date">
                    <FormItem class="flex flex-col">
                        <FormLabel class="pt-2">Selecciona una fecha</FormLabel>
                        <Popover>
                            <PopoverTrigger as-child>
                                <Button variant="outline"
                                    :class="cn('w-full justify-start text-left font-normal', !selectedDate && 'text-muted-foreground')">
                                    <CalendarIcon class="mr-2 h-4 w-4" />
                                    {{ selectedDate ? df.format(selectedDate.toDate(getLocalTimeZone())) : "Selecciona una fecha" }}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-auto p-0">
                                <Calendar v-model="selectedDate" @update:modelValue="updateDate" initial-focus />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <!-- Campo Latitud -->
                <FormField v-slot="{ componentField }" name="latitude">
                    <FormItem>
                        <FormLabel>Latitud</FormLabel>
                        <FormControl>
                            <Input type="number" step="0.0000001" placeholder="Latitud" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <!-- Campo Longitud -->
                <FormField v-slot="{ componentField }" name="longitude">
                    <FormItem>
                        <FormLabel>Longitud</FormLabel>
                        <FormControl>
                            <Input type="number" step="0.0000001" placeholder="Longitud" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>

            <Button type="submit" class="mt-4 w-full" :disabled="isSubmitting">
                <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
                {{ isSubmitting ? 'Consultando...' : 'Escanear el Clima' }}
            </Button>
        </form>


    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-vue-next'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { WeatherServiceFactory } from '../server/services/weather/WeatherServiceFactory'

const df = new DateFormatter("es-MX", { dateStyle: "long" });
const isSubmitting = ref(false);
const emit = defineEmits(['weather-data', 'weather-error']);
const selectedDate = ref(null);

/** Esquema de validación con Zod */
const formSchema = toTypedSchema(
    z.object({
        latitude: z
            .number()
            .min(-90, "Latitud inválida")
            .max(90, "Latitud inválida"),
        longitude: z
            .number()
            .min(-180, "Longitud inválida")
            .max(180, "Longitud inválida"),
        date: z
            .string()
            .refine((val) => !isNaN(Date.parse(val)), {
                message: "Fecha inválida",
            })
            .refine((val) => new Date(val) <= new Date(), {
                message: "La fecha no puede ser futura",
            }),
        weatherProvider: z
            .string()
            .min(1, "Debes seleccionar un proveedor")

    })
);

/** Obtener geolocalización automática */
onMounted(() => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                form.setFieldValue("latitude", position.coords.latitude);
                form.setFieldValue("longitude", position.coords.longitude);
            },
            (error) => console.error("Error obteniendo la ubicación", error)
        );
    }
});

const form = useForm({
    validationSchema: formSchema,
})

const updateDate = (newDate) => {
    selectedDate.value = newDate;
    form.setFieldValue("date", newDate.toString());
}


const onSubmit = form.handleSubmit(async (values) => {
    console.log('Form enviado', values)
    isSubmitting.value = true;
    try {
        const service = WeatherServiceFactory.createService(values.weatherProvider);
        const weatherData = await service.getWeather(values.latitude, values.longitude, values.date);
        console.log('Success - datos del clima', weatherData);
        emit('weather-data', weatherData, values.weatherProvider);


    } catch (error) {
        emit('weather-error', error.message || 'Error al obtener datos del clima');
        console.error('Error:', error.message);

    } finally {
        isSubmitting.value = false;
    }
})

</script>