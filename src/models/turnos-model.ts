import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db-config';
import Paciente from './pacientes-model';
import Medico from './medicos-model';
import EstadoTurno from './estado-turnos-model';

// Interfaz para los atributos de turno
export interface TurnoAttributes {
  id_turno: number;
  id_paciente: number;
  id_medico: number;
  fecha_de_emision: Date;
  fecha_de_turno: Date;
  estado: number;
}

// Interfaz para la creación de turno
export interface TurnoCreationAttributes extends Optional<TurnoAttributes, 'id_turno' | 'fecha_de_emision'> {}

// Clase del modelo Turno
class Turno extends Model<TurnoAttributes, TurnoCreationAttributes> implements TurnoAttributes {
  public id_turno!: number;
  public id_paciente!: number;
  public id_medico!: number;
  public fecha_de_emision!: Date;
  public fecha_de_turno!: Date;
  public estado!: number;

  // Relaciones
  public readonly paciente?: Paciente;
  public readonly medico?: Medico;
  public readonly estadoTurno?: EstadoTurno;
}

// Inicialización del modelo
Turno.init({
  id_turno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pacientes',
      key: 'user_id'
    },
    onDelete: 'CASCADE'
  },
  id_medico: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'medicos',
      key: 'user_id'
    },
    onDelete: 'CASCADE'
  },
  fecha_de_emision: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fecha_de_turno: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'estado_turno',
      key: 'id_estado'
    }
  }
}, {
  tableName: 'turnos',
  sequelize,
  timestamps: false
});

export default Turno;