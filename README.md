# Backend Push & Mapas

Este proyecto es una API RESTful desarrollada con **Node.js**, **Express** y **PostgreSQL**, diseñada para integrarse con una aplicación Flutter educativa. Sus principales funcionalidades incluyen:

- ✅ Registro de usuarios y sus tokens de dispositivos
- ✅ Envío de notificaciones push mediante Firebase Cloud Messaging
- ✅ Gestión de objetos geográficos (puntos, rutas y polígonos)
- ✅ Pruebas de endpoints a través de Swagger UI

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js (v18 o superior)](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)
- Una cuenta activa en [Firebase Console](https://console.firebase.google.com/)

---

## Configuración del entorno

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu_usuario/backend_push_maps.git
cd backend_push_maps
npm install
```

### 2. Configurar el archivo .env
Copia el archivo de ejemplo y edítalo:

```bash
cp .env.example .env
```

Edita el archivo .env con tus variables de entorno:

```bash
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=push_maps
DB_PORT=5432
```

### 3. Crear base de datos y tablas en PostgreSQL
Abre la terminal y accede al cliente de PostgreSQL:

```bash
psql -U postgres
```

Ejecuta los siguientes comandos:

```bash
-- Crear base de datos
CREATE DATABASE push_maps;
\c push_maps

-- Crear tabla de usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de tokens
CREATE TABLE device_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_token UNIQUE (user_id, token)
);

-- Crear tabla de objetos geográficos
CREATE TABLE geo_objects (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('point', 'route', 'polygon')),
  coordinates JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Configurar Firebase
Para enviar notificaciones push, necesitas configurar Firebase:

- Ve a Firebase Console y selecciona tu proyecto.
- Haz clic en ⚙️ Configuración del proyecto > Cuentas de servicio.
- Haz clic en "Generar nueva clave privada".

Guarda el archivo como:

```bash
firebase/serviceAccountKey.json
firebase/uide-43a9f-firebase-adminsdk-fbsvc-34fab192ed.json
```
⚠️ Este archivo ya está en .gitignore, no debe subirse a ningún repositorio público.

### 5. Ejecutar el servidor
Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```
Si todo está correcto, verás algo como:

```bash
Conectado a PostgreSQL
Modelos sincronizados
Servidor escuchando en http://localhost:3000
```

### 6. Probar con Swagger
Abre tu navegador y visita:

- http://localhost:3000/api/docs

Ahí puedes probar todos los endpoints desde una interfaz gráfica.

Endpoints disponibles
| Método | Ruta                             | Descripción                              |
|--------|----------------------------------|------------------------------------------|
| POST   | `/api/users`                     | Crear usuario                            |
| GET    | `/api/users`                     | Listar usuarios                          |
| POST   | `/api/tokens`                    | Registrar token de dispositivo           |
| GET    | `/api/tokens/:userId`            | Obtener tokens por usuario               |
| POST   | `/api/notifications/send-one`    | Enviar notificación a un usuario         |
| POST   | `/api/notifications/send-many`   | Enviar notificación a varios usuarios    |
| POST   | `/api/geo`                       | Crear punto/ruta/polígono                |
| GET    | `/api/geo`                       | Listar objetos geográficos               |
| GET    | `/api/geo/:id`                   | Ver objeto geográfico específico         |
| PUT    | `/api/geo/:id`                   | Actualizar objeto geográfico             |
| DELETE | `/api/geo/:id`                   | Eliminar objeto geográfico               |



Pruebas recomendadas
Usar Swagger UI en: http://localhost:3000/api/docs

O bien usar Postman (puedo proporcionarte una colección si lo necesitas)

Estructura del proyecto

```bash
backend_push_maps/
├── firebase/
│   └── serviceAccountKey.json       ← Clave privada de Firebase
├── src/
│   ├── config/                      ← Configuración de DB y Firebase
│   ├── controllers/                 ← Lógica de endpoints
│   ├── models/                      ← Modelos Sequelize
│   ├── routes/                      ← Rutas de Express
│   ├── services/                    ← Lógica de negocio (notificaciones)
│   └── docs/                        ← Definición Swagger
├── .env                             ← Variables de entorno
├── .gitignore                       ← Archivos ignorados por Git
├── index.js                         ← Punto de entrada del servidor
```

### Autor
**Richard Armijos**  
Docente – Universidad Internacional del Ecuador  
Materia: *Programación Móvil en Flutter*  
Loja, Ecuador