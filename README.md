# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

📌 TerraClima - Nuxt App
📖 Descripción

Esta es una aplicación desarrollada con Nuxt, utilizando MongoDB como base de datos y otras tecnologías modernas para el backend y frontend.



## Setup

🚀 Instalación y configuración

Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local.

1️⃣ Clonar el repositorio

git clone https://github.com/HodurBalder/TerraClima.git
cd TerraClima

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```



 Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:
# Configuración de MongoDB
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/miBaseDeDatos

# Clave de API para el clima
API_KEY_WEATHER=<TU_CLAVE_WEATHER_API>

Nota: Asegúrate de reemplazar <TU_CLAVE_WEATHER_API> y la URL de MongoDB con tus valores reales.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
