import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { testConnection } from './config/db-config';
import librosRoutes from './routes/libros-routes';

// Tipos para el manejo de errores
interface AppError extends Error {
  status?: number;
}

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Probar conexión a la base de datos
testConnection();

// Ruta base
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Bienvenido a la API de Biblioteca',
    endpoints: {
      libros: '/api/libros'
    }
  });
});

// Rutas de la API
app.use('/api/libros', librosRoutes);

// Middleware para manejar rutas no existentes
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    success: false, 
    message: 'Ruta no encontrada' 
  });
});

// Middleware para manejar errores
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({ 
    success: false, 
    message: 'Error en el servidor', 
    error: err.message 
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Para manejo adecuado de tipos en TypeScript para exports
export default app;
