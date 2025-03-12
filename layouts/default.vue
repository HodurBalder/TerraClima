<template>
    <div class="layout">
        <header>
            <div class="header-content">

                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline">
                            <Icon icon="radix-icons:moon"
                                class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Icon icon="radix-icons:sun"
                                class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span class="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem @click="colorMode.preference = 'light'">
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="colorMode.preference = 'dark'">
                            Dark
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div class="flex flex-col">
                    <h1>TerraClima - Sobrevivir al Futuro</h1>
                    <h2>{{ formattedDate }}</h2>
                </div>

                <Button variant="outline">Login</Button>

            </div>
        </header>

        <main>
            <div class="content">
                <NuxtPage />
            </div>
        </main>

        <footer>
            <p>Aplicación Post-Apocalíptica by Adrian Rodriguez</p>
        </footer>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { Button } from '@/components/ui/button'
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
    import { Icon } from '@iconify/vue'

    const colorMode = useColorMode()
    const formattedDate = ref('')

    onMounted(() => {
        const currentDate = new Date();
        const futureYear = currentDate.getFullYear() + 62;
        currentDate.setFullYear(futureYear);

        const options = { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        };
        
        
        formattedDate.value = currentDate.toLocaleDateString('es-ES', options);
    });
</script>

<style scoped>
    .layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        /* Asegura que la altura de la página sea al menos 100vh */
        transition: background 0.3s ease;
    }


    header {
        padding: 20px;
        text-align: center;
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        flex-grow: 1;
    }

    footer {
        text-align: center;
        padding: 10px;
        background-color: #d63737;
        margin-top: auto;
    }
</style>