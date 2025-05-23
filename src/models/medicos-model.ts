import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db-config';
import User from './users-model';

// Interfaz para los atributos de médico
export interface MedicoAttributes {
  user_id: number;
  especialidad: string;
  num_matricula: number;
  activo: boolean;
}

// Interfaz para la creación de médico
export interface MedicoCreationAttributes extends Optional<MedicoAttributes, 'activo'> {}

// Clase del modelo Medico
class Medico extends Model<MedicoAttributes, MedicoCreationAttributes> implements MedicoAttributes {
  public user_id!: number;
  public especialidad!: string;
  public num_matricula!: number;
  public activo!: boolean;

  // Relación con User
  public readonly user?: User;
}

// Inicialización del modelo
Medico.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'user_id'
    },
    onDelete: 'CASCADE'
  },
  especialidad: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  num_matricula: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'medicos',
  sequelize,
  timestamps: false
});

export default Medico;