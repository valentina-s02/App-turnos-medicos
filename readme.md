# API REST de Biblioteca con TypeScript, Node.js, Express y PostgreSQL

Esta es una API REST sencilla que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una base de datos de libros en PostgreSQL. La aplicación está construida con TypeScript para mayor seguridad de tipos y mantenibilidad del código.

## Requisitos previos
- Docker
- Docker Compose

## Configuración y ejecución

1. Clona este repositorio:
```bash
git clone <url-repositorio>
cd biblioteca-api
```

2. Inicia los contenedores con Docker Compose:
```bash
docker-compose up -d
```

Esto creará dos contenedores:
- `biblioteca_db`: Base de datos PostgreSQL
- `biblioteca_api`: Servidor Node.js con Express

3. La API estará disponible en: http://localhost:3000

## Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/libros | Obtener todos los libros |
| GET | /api/libros/:id | Obtener un libro por ID |
| POST | /api/libros | Crear un nuevo libro |
| PUT | /api/libros/:id | Actualizar un libro existente |
| DELETE | /api/libros/:id | Eliminar un libro |

## Estructura del proyecto

```
biblioteca-api/
├── src/
│   ├── controllers/        # Controladores de la aplicación
│   ├── models/             # Modelos de datos
│   ├── routes/             # Rutas de la API
│   ├── config/             # Configuración (base de datos, etc.)
│   ├── types/              # Definiciones de tipos TypeScript
│   └── app.ts              # Punto de entrada de la aplicación
├── dist/                   # Código JavaScript compilado
├── database/
│   └── init.sql            # Script inicial de la base de datos
├── Dockerfile              # Configuración para el contenedor de la API
├── docker-compose.yml      # Configuración de Docker Compose
├── tsconfig.json           # Configuración de TypeScript
└── package.json            # Dependencias de Node.js
```

## Ejemplo de uso con cURL

### Obtener todos los libros
```bash
curl -X GET http://localhost:3000/api/libros
```

### Obtener un libro por ID
```bash
curl -X GET http://localhost:3000/api/libros/1
```

### Crear un nuevo libro
```bash
curl -X POST http://localhost:3000/api/libros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Don Quijote de la Mancha",
    "autor": "Miguel de Cervantes",
    "isbn": "978-8420412146",
    "editorial": "Cátedra",
    "anio_publicacion": 1605,
    "numero_paginas": 1250,
    "genero": "Novela"
  }'
```

### Actualizar un libro
```bash
curl -X PUT http://localhost:3000/api/libros/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Cien años de soledad (Edición conmemorativa)",
    "editorial": "Penguin Random House"
  }'
```

### Eliminar un libro
```bash
curl -X DELETE http://localhost:3000/api/libros/2
```

## Desarrollo local

Si deseas desarrollar localmente sin Docker:

```bash
# Instalar dependencias
npm install

# Compilar TypeScript
npm run build

# Ejecutar en modo desarrollo con recarga automática
npm run dev

# Ejecutar la versión compilada
npm start
```

## Detener los contenedores
```bash
docker-compose down
```

Para eliminar también los volúmenes (borrará los datos persistentes):
```bash
docker-compose down -v
```
