# React + Vite

Aplicación web para gestionar una colección de vinos utilizando React y Supabase.

## Configuración

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configura las variables de entorno en el archivo `.env`:
   - `VITE_SUPABASE_URL`: URL de tu proyecto Supabase
   - `VITE_SUPABASE_ANON_KEY`: Llave anónima de tu proyecto Supabase

3. Instala las dependencias:
   ```bash
   npm install
   ```

## Funcionalidades

- Listado completo de vinos
- Búsqueda por nombre, bodega o región
- Formulario de contacto
- Suscripción a newsletter

## Tecnologías utilizadas

- React
- Vite
- Supabase
- Material-UI
- React Router

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`
