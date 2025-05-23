import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db-config';
import User from './users-model';

// Interfaz para los atributos de paciente
export interface PacienteAttributes {
  user_id: number;
  consultas_completadas?: number;
  obra_social?: string;
  historial_clinico?: string;
  peso?: number;
  altura?: number;
  grupo_sanguineo?: string;
}

// Interfaz para la creación de paciente
export interface PacienteCreationAttributes extends Optional<PacienteAttributes, 'consultas_completadas' | 'obra_social' | 'historial_clinico' | 'peso' | 'altura' | 'grupo_sanguineo'> {}

// Clase del modelo Paciente
class Paciente extends Model<PacienteAttributes, PacienteCreationAttributes> implements PacienteAttributes {
  public user_id!: number;
  public consultas_completadas?: number;
  public obra_social?: string;
  public historial_clinico?: string;
  public peso?: number;
  public altura?: number;
  public grupo_sanguineo?: string;

  // Relación con User
  public readonly user?: User;
}

// Inicialización del modelo
Paciente.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'user_id'
    },
    onDelete: 'CASCADE'
  },
  consultas_completadas: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  obra_social: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  historial_clinico: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  peso: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  altura: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  grupo_sanguineo: {
    type: DataTypes.STRING(5),
    allowNull: true
  }
}, {
  tableName: 'pacientes',
  sequelize,
  timestamps: false
});

export default Paciente;