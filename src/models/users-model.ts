import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db-config';

// Definimos el tipo de usuario como enum
export enum TipoUsuario {
  MEDICO = 'medico',
  PACIENTE = 'paciente'
}

// Interfaz para los atributos del usuario
export interface UserAttributes {
  user_id: number;
  first_name: string;
  last_name: string;
  mail: string;
  age: number;
  location?: number;
  tipo_usuario: TipoUsuario;
  created_at?: Date;
  last_update?: Date;
}

// Interfaz para la creación de usuario (omitiendo campos opcionales o autogenerados)
export interface UserCreationAttributes extends Optional<UserAttributes, 'user_id' | 'created_at' | 'last_update'> {}

// Clase del modelo User
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public user_id!: number;
  public first_name!: string;
  public last_name!: string;
  public mail!: string;
  public age!: number;
  public location?: number;
  public tipo_usuario!: TipoUsuario;
  
  // Timestamps
  public readonly created_at!: Date;
  public readonly last_update!: Date;
}

// Inicialización del modelo
User.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  mail: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  location: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'location',
      key: 'location_id'
    }
  },
  tipo_usuario: {
    type: DataTypes.ENUM('medico', 'paciente'),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  last_update: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',
  sequelize,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'last_update'
});

export default User;