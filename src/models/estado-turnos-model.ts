import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db-config';

// Enum para los estados de turno
export enum EstadoTurnoEnum {
  PENDIENTE = 'pendiente',
  COMPLETADO = 'completado',
  CANCELADO = 'cancelado'
}

// Interfaz para los atributos de estado de turno
export interface EstadoTurnoAttributes {
  id_estado: number;
  estado: EstadoTurnoEnum;
}

// Interfaz para la creación de estado de turno
export interface EstadoTurnoCreationAttributes extends Optional<EstadoTurnoAttributes, 'id_estado'> {}

// Clase del modelo EstadoTurno
class EstadoTurno extends Model<EstadoTurnoAttributes, EstadoTurnoCreationAttributes> implements EstadoTurnoAttributes {
  public id_estado!: number;
  public estado!: EstadoTurnoEnum;
}

// Inicialización del modelo
EstadoTurno.init({
  id_estado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'completado', 'cancelado'),
    allowNull: false
  }
}, {
  tableName: 'estado_turno',
  sequelize,
  timestamps: false
});

export default EstadoTurno;