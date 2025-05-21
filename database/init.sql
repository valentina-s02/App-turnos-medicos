-- Crear tipo ENUM para tipo_usuario
CREATE TYPE tipo_usuario_enum AS ENUM ('medico', 'paciente');

-- Tabla de localizaciones
CREATE TABLE IF NOT EXISTS location (
    location_id SERIAL PRIMARY KEY,
    ciudad VARCHAR(100),
    provincia VARCHAR(100),
    pais VARCHAR(100)
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    mail VARCHAR(255) UNIQUE,
    age INTEGER,
    location INTEGER REFERENCES location(location_id),
    tipo_usuario tipo_usuario_enum,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de médicos
CREATE TABLE IF NOT EXISTS medicos (
    user_id INTEGER PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    especialidad VARCHAR(100),
    num_matricula INTEGER,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de pacientes
CREATE TABLE IF NOT EXISTS pacientes (
    user_id INTEGER PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    consultas_completadas INTEGER,
    obra_social VARCHAR(100),
    historial_clinico TEXT,
    peso NUMERIC(5,2),
    altura NUMERIC(5,2),
    grupo_sanguineo VARCHAR(5)
);

-- Tabla de estado de turnos
CREATE TABLE IF NOT EXISTS estado_turno (
    id_estado SERIAL PRIMARY KEY,
    estado VARCHAR(50) CHECK (estado IN ('pendiente', 'completado', 'cancelado'))
);

-- Tabla de turnos
CREATE TABLE IF NOT EXISTS turnos (
    id_turno SERIAL PRIMARY KEY,
    id_paciente INTEGER REFERENCES pacientes(user_id) ON DELETE CASCADE,
    id_medico INTEGER REFERENCES medicos(user_id) ON DELETE CASCADE,
    fecha_de_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_de_turno TIMESTAMP NOT NULL,
    estado INTEGER REFERENCES estado_turno(id_estado)
);